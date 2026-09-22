import { createClient } from '@sanity/client';
import { services as localServices, projects as localProjects } from './data.js';
import { serviceDetails as localDetails } from './service-details.js';
import { serviceFaqs as localFaqs } from './service-faqs.js';

export const sanityClient = createClient({
  projectId: 'cygey76w', dataset: 'production', apiVersion: '2025-02-19',
  perspective: 'published', useCdn: false, timeout: 15000,
});

const query = `{
  "services": *[_type == "portfolioService"],
  "posts": *[_type == "blogPost" && defined(slug.current) && defined(publishedAt)] | order(publishedAt desc),
  "pages": *[_type == "sitePage"],
  "projects": *[_type == "project"] | order(_createdAt asc),
  "homePage": *[_type == "homePage" && _id == "homePage"][0],
  "blogPage": *[_type == "blogPage" && _id == "blogPage"][0],
  "aboutPage": *[_type == "aboutPage" && _id == "aboutPage"][0],
  "siteSettings": *[_type == "siteSettings" && _id == "siteSettings"][0]
}`;

const emptyContent = { services: [], posts: [], pages: [], projects: [], homePage: null, blogPage: null, aboutPage: null, siteSettings: null };
let all;
try {
  all = await sanityClient.fetch(query);
} catch (error) {
  if (process.env.CF_PAGES === '1') throw error;
  console.warn(`Sanity content could not be loaded; building with local content. ${error.message}`);
  all = emptyContent;
}

const text = (value, fallback) => typeof value === 'string' && value.trim() ? value : fallback;
const arr = (value, fallback) => Array.isArray(value) && value.length > 0 ? value : fallback;

// ── Services ──
const existingServices = localServices.map(local => {
  const matches = all.services.filter(doc => doc.route === local.slug);
  if (matches.length > 1) throw new Error(`Duplicate Sanity route: ${local.slug}`);
  const doc = matches[0];
  if (!doc) return {
    ...local,
    seoTitle: local.name,
    seoDescription: local.summary,
    detail: localDetails[local.slug] || {},
    faqs: [localDetails[local.slug]?.faq, ...(localFaqs[local.slug] || [])].filter(Boolean),
  };

  const ld = localDetails[local.slug] || {};
  const lf = localFaqs[local.slug] || [];

  const cmsDeliverables = arr(doc.deliverables, null);
  const items = cmsDeliverables ? cmsDeliverables.map(d => d.title) : local.items;
  const deliverableDescs = cmsDeliverables ? cmsDeliverables.map(d => d.description) : (ld.deliverables || []);

  const cmsFaqs = arr(doc.faqs, null);
  const faqs = cmsFaqs
    ? cmsFaqs.map(f => [f.question, f.answer])
    : [ld.faq, ...lf].filter(Boolean);

  return {
    ...local,
    name: text(doc.name, local.name),
    summary: text(doc.summary, local.summary),
    body: text(doc.body, local.body),
    items,
    seoTitle: text(doc.seoTitle, text(doc.name, local.name)),
    seoDescription: text(doc.seoDescription, text(doc.summary, local.summary)),
    detail: {
      headline: text(doc.headline, ld.headline),
      fit: text(doc.fit, ld.fit),
      outcome: text(doc.outcome, ld.outcome),
      measure: text(doc.measure, ld.measure),
      graph: text(doc.graphLabel, ld.graph),
      deliverables: deliverableDescs,
      steps: arr(doc.steps, ld.steps || []),
    },
    faqs,
  };
});

const extraServices = all.services.filter(doc => doc.route && !localServices.some(local => local.slug === doc.route)).map(doc => ({
  slug: doc.route,
  isCustom: true,
  name: text(doc.name, doc.route),
  summary: text(doc.summary, ''),
  body: text(doc.body, ''),
  items: arr(doc.deliverables, []).map(item => item.title).filter(Boolean),
  seoTitle: text(doc.seoTitle, text(doc.name, doc.route)),
  seoDescription: text(doc.seoDescription, text(doc.summary, '')),
  detail: {
    headline: text(doc.headline, ''),
    fit: text(doc.fit, ''),
    outcome: text(doc.outcome, ''),
    measure: text(doc.measure, ''),
    graph: text(doc.graphLabel, ''),
    deliverables: arr(doc.deliverables, []).map(item => item.description || ''),
    steps: arr(doc.steps, []),
  },
  faqs: arr(doc.faqs, []).map(item => [item.question, item.answer]).filter(([question, answer]) => question && answer),
}));

const serviceRoutes = [...existingServices, ...extraServices].map(service => service.slug);
if (new Set(serviceRoutes).size !== serviceRoutes.length) throw new Error('Duplicate Sanity service URL slug');
export const services = [...existingServices, ...extraServices];

export const posts = (all.posts || []).filter(post => post.slug?.current && post.title && post.body?.length);
const postSlugs = posts.map(post => post.slug.current);
if (new Set(postSlugs).size !== postSlugs.length) throw new Error('Duplicate Sanity blog URL slug');

export const pages = Object.fromEntries((all.pages || []).filter(page => ['contact', 'audit', 'privacy', 'terms'].includes(page.route)).map(page => [page.route, page]));
if (Object.keys(pages).length !== (all.pages || []).filter(page => ['contact', 'audit', 'privacy', 'terms'].includes(page.route)).length) {
  throw new Error('Duplicate Sanity page route');
}

// ── Projects ──
export const projects = (() => {
  if (!all.projects || all.projects.length === 0) return localProjects;
  return all.projects.map(doc => {
    const local = localProjects.find(p => p.slug === doc.slug);
    return {
      slug: doc.slug || '',
      name: text(doc.name, local?.name || ''),
      domain: text(doc.domain, local?.domain || ''),
      industry: text(doc.industry, local?.industry || ''),
      symbol: text(doc.symbol, local?.symbol || ''),
      color: text(doc.color, local?.color || 'mint'),
      description: text(doc.description, ''),
    };
  });
})();

// ── Singletons (raw — templates apply their own fallbacks) ──
export const homePage = all.homePage || {};
export const blogPage = all.blogPage || {};
export const aboutPage = all.aboutPage || {};
export const siteSettings = all.siteSettings || {};

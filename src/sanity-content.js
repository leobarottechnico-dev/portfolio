import { createClient } from '@sanity/client';
import { services as localServices } from './data.js';

export const sanityClient = createClient({
  projectId: 'cygey76w', dataset: 'production', apiVersion: '2025-02-19',
  perspective: 'published', useCdn: false, timeout: 15000,
});

// Public, published content only. A failed CMS request fails the build so a
// network outage cannot silently replace edited content on the live website.
const documents = await sanityClient.fetch('*[_type == "portfolioService"]');
const text = (value, fallback) => typeof value === 'string' && value.trim() ? value : fallback;
function overrides(local, type) {
  return local.map(item => {
    const matches = documents.filter(doc => doc._type === type && doc.route === item.slug);
    if (matches.length > 1) throw new Error(`Duplicate Sanity route: ${item.slug}`);
    const doc = matches[0];
    if (!doc) return item;
    return {
      ...item,
      name: text(doc.name, item.name),
      ...(type === 'portfolioService' ? {
        summary: text(doc.summary, item.summary), body: text(doc.body, item.body),
        seoTitle: text(doc.seoTitle, item.name), seoDescription: text(doc.seoDescription, text(doc.summary, item.summary)),
      } : { industry: text(doc.industry, item.industry) }),
    };
  });
}
export const services = overrides(localServices, 'portfolioService');

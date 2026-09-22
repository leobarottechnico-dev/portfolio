import { defineConfig, defineType, defineField } from 'sanity';
import { structureTool } from 'sanity/structure';
import { Dashboard } from './Dashboard.jsx';

const projectColors = ['mint', 'gold', 'coral', 'sky'];
const singletonTypes = ['homePage', 'aboutPage', 'blogPage', 'siteSettings'];

const route = defineField({ name: 'route', title: 'URL slug', type: 'string', group: 'content', validation: r => r.required().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, { name: 'URL slug' }), description: 'For example: local-seo. Creates /services/local-seo/. Use a unique slug for each service.' });
const str = (name, title, opts = {}) => defineField({ name, title, type: 'string', ...opts });
const txt = (name, title, opts = {}) => defineField({ name, title, type: 'text', rows: 3, ...opts });
const qaPair = { type: 'object', fields: [str('question', 'Question'), txt('answer', 'Answer')], preview: { select: { title: 'question' } } };
const titleDesc = { type: 'object', fields: [str('title', 'Title'), txt('description', 'Description')], preview: { select: { title: 'title' } } };

export default defineConfig({
  name: 'rankwithleo', title: 'RankwithLeo content', projectId: 'cygey76w', dataset: 'production',
  tools: [{ name: 'dashboard', title: 'Dashboard', component: Dashboard }],
  document: {
    newDocumentOptions: (prev) => prev.filter(item => !singletonTypes.includes(item.templateId)),
  },
  plugins: [structureTool({
    title: 'Content',
    structure: S => S.list().title('RankwithLeo').items([
      S.documentTypeListItem('blogPost').title('Blog Posts'),
      S.documentTypeListItem('portfolioService').title('Service Pages'),
      S.documentTypeListItem('sitePage').title('Other Pages'),
      S.documentTypeListItem('project').title('Projects'),
      S.divider(),
      S.listItem().title('Homepage').id('homePage').child(S.document().schemaType('homePage').documentId('homePage')),
      S.listItem().title('Blog Page').id('blogPage').child(S.document().schemaType('blogPage').documentId('blogPage')),
      S.listItem().title('About Page').id('aboutPage').child(S.document().schemaType('aboutPage').documentId('aboutPage')),
      S.listItem().title('Site Settings').id('siteSettings').child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.listItem().title('SEO review').child(S.documentList().title('Missing SEO fields').schemaType('portfolioService').filter('_type == "portfolioService" && (!defined(seoTitle) || seoTitle == "" || !defined(seoDescription) || seoDescription == "")')),
    ]),
  })],
  schema: {
    types: [
      defineType({
        name: 'sitePage', title: 'Other Page', type: 'document',
        preview: { select: { title: 'title', subtitle: 'route' } },
        fields: [
          defineField({ name: 'route', title: 'Page', type: 'string', options: { list: ['contact', 'audit', 'privacy', 'terms'] }, validation: r => r.required(), description: 'Choose the existing page to edit. Use only one document per page.' }),
          str('title', 'Page title', { validation: r => r.required() }),
          txt('intro', 'Introduction', { description: 'Used on the contact and audit pages, and optionally on legal pages.' }),
          defineField({ name: 'body', title: 'Page body', type: 'array', of: [{ type: 'block', styles: [{ title: 'Normal', value: 'normal' }, { title: 'Heading 2', value: 'h2' }, { title: 'Heading 3', value: 'h3' }], marks: { annotations: [{ name: 'link', type: 'object', title: 'Link', fields: [str('href', 'URL', { validation: r => r.required() })] }] } }], description: 'Used instead of the placeholder text on privacy and terms pages. For contact/audit, appears above the form.' }),
          str('seoTitle', 'SEO title', { description: 'Optional. Defaults to the page title.' }),
          txt('seoDescription', 'SEO description'),
        ],
      }),
      defineType({
        name: 'blogPost', title: 'Blog Post', type: 'document',
        groups: [
          { name: 'content', title: 'Article', default: true },
          { name: 'seo', title: 'SEO' },
        ],
        preview: { select: { title: 'title', subtitle: 'publishedAt', media: 'coverImage' } },
        fields: [
          str('title', 'Title', { group: 'content', validation: r => r.required() }),
          defineField({ name: 'slug', title: 'URL slug', type: 'slug', group: 'content', options: { source: 'title', maxLength: 96 }, validation: r => r.required(), description: 'Generates /blog/your-slug/. Changing it after publication changes the URL.' }),
          txt('excerpt', 'Summary', { group: 'content', validation: r => r.required().max(240), description: 'Shown on the blog listing and used as the default search description.' }),
          str('category', 'Topic', { group: 'content', description: 'Optional label, such as Agentic SEO or Local SEO.' }),
          defineField({ name: 'publishedAt', title: 'Publish date', type: 'datetime', group: 'content', initialValue: () => new Date().toISOString(), validation: r => r.required() }),
          defineField({ name: 'coverImage', title: 'Cover image', type: 'image', group: 'content', options: { hotspot: true }, fields: [str('alt', 'Alternative text', { validation: r => r.required(), description: 'Describe the image for readers using assistive technology.' })] }),
          defineField({ name: 'body', title: 'Article body', type: 'array', group: 'content', validation: r => r.required().min(1), of: [
            { type: 'block', styles: [{ title: 'Normal', value: 'normal' }, { title: 'Heading 2', value: 'h2' }, { title: 'Heading 3', value: 'h3' }, { title: 'Quote', value: 'blockquote' }], marks: { decorators: [{ title: 'Bold', value: 'strong' }, { title: 'Italic', value: 'em' }, { title: 'Code', value: 'code' }], annotations: [{ name: 'link', type: 'object', title: 'Link', fields: [str('href', 'URL', { validation: r => r.required() })] }] } },
            { type: 'image', options: { hotspot: true }, fields: [str('alt', 'Alternative text', { validation: r => r.required() }), txt('caption', 'Caption')] },
          ] }),
          str('seoTitle', 'SEO title', { group: 'seo', description: 'Optional. Defaults to the article title.' }),
          txt('seoDescription', 'SEO description', { group: 'seo', description: 'Optional. Defaults to the summary.' }),
        ],
      }),
      defineType({
        name: 'blogPage', title: 'Blog Page', type: 'document',
        fields: [
          str('heading', 'Main heading'),
          str('highlight', 'Highlighted heading line'),
          txt('intro', 'Introduction'),
          txt('seoDescription', 'SEO description'),
        ],
      }),

      // ── Service Page ──
      defineType({
        name: 'portfolioService', title: 'Service Page', type: 'document',
        groups: [
          { name: 'content', title: 'Content', default: true },
          { name: 'detail', title: 'Detail Page' },
          { name: 'faqs', title: 'FAQs' },
          { name: 'seo', title: 'SEO' },
        ],
        preview: {
          select: { title: 'name', route: 'route' },
          prepare: ({ title, route }) => ({ title: title || (route ? `Untitled: ${route}` : 'New service page'), subtitle: route ? `/services/${route}/` : 'Choose a website page' }),
        },
        fields: [
          route,
          str('name', 'Service name', { group: 'content', validation: r => r.required() }),
          txt('summary', 'Listing summary', { group: 'content', validation: r => r.required(), description: 'Used on the homepage and services listing.' }),
          txt('body', 'Service introduction', { group: 'content', validation: r => r.required(), description: 'Opening paragraph on the detail page.' }),

          str('headline', 'Detail headline', { group: 'detail', description: 'Accent headline below the service name.' }),
          txt('fit', 'Who is this for', { group: 'detail', description: 'Ideal client description.' }),
          txt('outcome', 'Expected outcome', { group: 'detail' }),
          txt('measure', 'How we measure progress', { group: 'detail' }),
          str('graphLabel', 'Graph label', { group: 'detail', description: 'Label on the illustrative graph.' }),
          defineField({ name: 'deliverables', title: 'Deliverables', type: 'array', group: 'detail', description: 'What we can work on — title and description pairs.', of: [titleDesc] }),
          defineField({ name: 'steps', title: 'Process steps', type: 'array', group: 'detail', description: 'How the work happens — ordered steps.', of: [{ type: 'string' }] }),

          defineField({ name: 'faqs', title: 'FAQs', type: 'array', group: 'faqs', description: 'All FAQ pairs for this service page.', of: [qaPair] }),

          str('seoTitle', 'SEO title', { group: 'seo', description: 'Browser/search title. RankwithLeo appended automatically. Empty = service name.' }),
          txt('seoDescription', 'SEO description', { group: 'seo', description: 'Concise page summary. Empty = listing summary.' }),
        ],
      }),

      // ── Project ──
      defineType({
        name: 'project', title: 'Project', type: 'document',
        preview: { select: { title: 'name', subtitle: 'industry' } },
        fields: [
          str('slug', 'URL slug', { validation: r => r.required().regex(/^[a-z0-9-]+$/, { name: 'slug', invert: false }), description: 'Lowercase letters, numbers and hyphens. Becomes /work/your-slug/.' }),
          str('name', 'Client name', { validation: r => r.required() }),
          str('domain', 'Website domain', { description: 'e.g. example.com.au — no https://' }),
          str('industry', 'Industry'),
          str('symbol', 'Monogram', { description: 'Short letters for the card (e.g. AP).', validation: r => r.max(3) }),
          defineField({ name: 'color', title: 'Card colour', type: 'string', options: { list: projectColors } }),
          txt('description', 'Project description', { description: 'Overview shown on the project page. Empty = default placeholder.' }),
        ],
      }),

      // ── Home Page (singleton) ──
      defineType({
        name: 'homePage', title: 'Home Page', type: 'document',
        groups: [
          { name: 'hero', title: 'Hero', default: true },
          { name: 'sections', title: 'Sections' },
          { name: 'faqs', title: 'FAQs' },
          { name: 'closing', title: 'Closing' },
        ],
        fields: [
          str('heroTitle', 'Hero title', { group: 'hero', description: 'Use | for a line break.' }),
          txt('heroSubtitle', 'Hero subtitle', { group: 'hero' }),
          defineField({ name: 'chapters', title: 'Cinematic chapter lines', type: 'array', group: 'hero', description: 'Text during the cinematic scroll. Use | for line breaks.', of: [{ type: 'string' }] }),

          str('workHeading', 'Work section heading', { group: 'sections', description: 'Use | for a line break.' }),
          str('workSubtext', 'Work section subtext', { group: 'sections' }),
          str('servicesHeading', 'Services heading', { group: 'sections', description: 'Use | for a line break.' }),
          txt('servicesSubtext', 'Services subtext', { group: 'sections' }),
          str('processHeading', 'Process heading', { group: 'sections', description: 'Use | for a line break.' }),
          str('processSubtext', 'Process subtext', { group: 'sections' }),
          defineField({ name: 'processSteps', title: 'Process steps', type: 'array', group: 'sections', of: [titleDesc] }),
          str('aboutHeading', 'About block heading', { group: 'sections', description: 'Use | for a line break.' }),
          txt('aboutIntro', 'About intro', { group: 'sections' }),
          txt('aboutBody', 'About body', { group: 'sections' }),
          str('blogHeading', 'Latest posts heading', { group: 'sections', description: 'Shown only once blog posts are published. Use | for a line break.' }),
          txt('blogSubtext', 'Latest posts subtext', { group: 'sections' }),

          defineField({ name: 'faqs', title: 'Homepage FAQs', type: 'array', group: 'faqs', of: [qaPair] }),

          str('closingHandwriting', 'Handwriting text', { group: 'closing' }),
          str('closingHeading', 'Closing heading', { group: 'closing', description: 'Use | for a line break.' }),
        ],
      }),

      // ── About Page (singleton) ──
      defineType({
        name: 'aboutPage', title: 'About Page', type: 'document',
        groups: [
          { name: 'hero', title: 'Hero', default: true },
          { name: 'outcomes', title: 'Outcomes' },
          { name: 'working', title: 'Working Together' },
          { name: 'closing', title: 'Closing' },
          { name: 'seo', title: 'SEO' },
        ],
        fields: [
          defineField({ name: 'heroLines', title: 'Hero headline lines', type: 'array', group: 'hero', description: 'Each line of the hero. Use **double asterisks** for bold.', of: [{ type: 'string' }] }),
          txt('intro', 'Intro paragraph', { group: 'hero' }),

          str('outcomesHeading', 'Outcomes heading', { group: 'outcomes' }),
          str('outcomesSubtext', 'Outcomes subtext', { group: 'outcomes' }),
          defineField({ name: 'outcomes', title: 'Outcome cards', type: 'array', group: 'outcomes', description: 'Use **double asterisks** for bold in titles.', of: [titleDesc] }),

          str('workingHeading', 'Working heading', { group: 'working', description: 'Use **double asterisks** for bold.' }),
          defineField({ name: 'workingParagraphs', title: 'Working paragraphs', type: 'array', group: 'working', of: [{ type: 'text', rows: 3 }] }),

          str('closeHeading', 'Closing heading', { group: 'closing' }),
          str('closeSubtext', 'Closing subtext', { group: 'closing' }),

          str('seoTitle', 'SEO title', { group: 'seo' }),
          txt('seoDescription', 'SEO description', { group: 'seo' }),
        ],
      }),

      // ── Site Settings (singleton) ──
      defineType({
        name: 'siteSettings', title: 'Site Settings', type: 'document',
        fields: [
          str('siteName', 'Site name', { description: 'Appended to page titles.' }),
          str('defaultDescription', 'Default meta description'),
          str('footerTagline', 'Footer tagline'),
          defineField({
            name: 'primaryCta', title: 'Primary CTA', type: 'object',
            fields: [str('label', 'Label'), str('url', 'URL')],
          }),
          defineField({
            name: 'secondaryCta', title: 'Secondary CTA', type: 'object',
            fields: [str('label', 'Label'), str('url', 'URL')],
          }),
        ],
      }),
    ],
  },
});

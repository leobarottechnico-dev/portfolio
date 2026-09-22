import { mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'cygey76w',
  dataset: 'production',
  apiVersion: '2025-02-19',
  perspective: 'published',
  useCdn: false,
  timeout: 15000,
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

const output = fileURLToPath(new URL('../src/generated/sanity-content.json', import.meta.url));
const content = await client.fetch(query);
await mkdir(fileURLToPath(new URL('../src/generated/', import.meta.url)), { recursive: true });
await writeFile(output, `${JSON.stringify(content)}\n`);
console.log(`Synced Sanity content: ${content.posts?.length ?? 0} published post(s).`);

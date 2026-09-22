import React from 'react';

export function Dashboard() {
  return <main style={{maxWidth:1000,margin:'0 auto',padding:'48px 28px',lineHeight:1.6}}>
    <h1 style={{fontSize:'clamp(28px,4vw,44px)',lineHeight:1.15}}>Your RankwithLeo content workspace</h1>
    <p>Edit your website content, service pages, projects and page copy here. Design and layout stay in Astro.</p>
    <p><a href="/structure">Open content editor →</a></p>
    <section style={{borderTop:'1px solid #8886',marginTop:36,paddingTop:24}}>
      <h2>What you can edit</h2>
      <dl>
        <dt><strong>Blog Posts</strong></dt>
        <dd>Create articles with a URL slug, summary, optional cover image, rich-text body and SEO fields. Publish a post to add it to the blog.</dd>
        <dt><strong>Service Pages</strong></dt>
        <dd>Edit the existing services or add a new service with a unique URL slug. You can change the listing summary, introduction, detail sections, FAQs and SEO fields.</dd>
        <dt><strong>Other Pages</strong></dt>
        <dd>Edit the contact, audit, privacy and terms page copy. The contact and audit forms still prepare a local brief only; editing their copy does not connect a submission service.</dd>
        <dt><strong>Projects</strong></dt>
        <dd>Client name, industry, website domain, card colour and project description. New projects can be added here.</dd>
        <dt><strong>Homepage</strong></dt>
        <dd>Hero title and subtitle, cinematic chapter lines, section headings, latest-posts copy, process steps, FAQs and closing copy.</dd>
        <dt><strong>Blog Page</strong></dt>
        <dd>Blog listing heading, introduction and search description.</dd>
        <dt><strong>About Page</strong></dt>
        <dd>Hero headlines, intro, outcome cards, working-together text and closing copy.</dd>
        <dt><strong>Site Settings</strong></dt>
        <dd>Site name, default meta description, footer tagline and CTA button labels and URLs.</dd>
        <dt><strong>SEO review</strong></dt>
        <dd>Find service documents without a custom SEO title or description.</dd>
      </dl>
    </section>
    <section style={{borderTop:'1px solid #8886',marginTop:36,paddingTop:24}}>
      <h2>From an edit to your website</h2>
      <ol>
        <li>Open the document and edit the fields you want to change.</li>
        <li>Publish the document. Drafts do not appear on the website.</li>
        <li>Rebuild the Astro site to pick up published content. A Sanity webhook can trigger the Cloudflare Pages build automatically once configured.</li>
      </ol>
      <p><strong>Formatting conventions:</strong> Use <code>|</code> for line breaks in headings. Use <code>**double asterisks**</code> for bold text in About page fields.</p>
    </section>
    <section style={{borderTop:'1px solid #8886',marginTop:36,paddingTop:24}}>
      <h2>Fallback behaviour</h2>
      <p>Every field has a local fallback in the Astro codebase. If a Sanity field is empty, the website uses the default copy from the code. This means partial edits are safe — you only need to fill in what you want to change.</p>
    </section>
  </main>;
}

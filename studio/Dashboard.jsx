import React from 'react';

export function Dashboard() {
  return <main style={{maxWidth:1000,margin:'0 auto',padding:'48px 28px',lineHeight:1.6}}>
    <h1 style={{fontSize:'clamp(28px,4vw,44px)',lineHeight:1.15}}>Your RankwithLeo content workspace</h1>
    <p>Edit your service content and SEO metadata here. Your website design stays in Astro.</p>
    <p><a href="/structure">Open content editor →</a></p>
    <section style={{borderTop:'1px solid #8886',marginTop:36,paddingTop:24}}>
      <h2>What you can edit now</h2>
      <dl>
        <dt><strong>Service Pages → Content</strong></dt><dd>Service name, listing summary and opening paragraph for each existing service.</dd>
        <dt><strong>Service Pages → SEO</strong></dt><dd>Optional search title and description. Empty fields use the service name and summary.</dd>
        <dt><strong>SEO review</strong></dt><dd>Find documents without a custom SEO title or description. These are optional improvements, not errors or a ranking score.</dd>
      </dl>
    </section>
    <section style={{borderTop:'1px solid #8886',marginTop:36,paddingTop:24}}>
      <h2>From an edit to your website</h2>
      <ol><li>Open the service document. Keep one document per website page.</li><li>Edit Content or SEO, then review the required fields.</li><li>Publish the approved document in Sanity. Drafts do not appear on the website.</li><li>Rebuild the connected Astro site to use the published copy.</li></ol>
      <p><strong>Publishing setup is still pending.</strong> The local integration has not been deployed and no automatic Cloudflare rebuild webhook is configured.</p>
    </section>
    <section style={{borderTop:'1px solid #8886',marginTop:36,paddingTop:24}}>
      <h2>Still managed in code</h2>
      <p>Homepage hero, About copy, detailed service sections, FAQs, images, global settings and CTAs. Antons project entries remain unchanged and outside this editor.</p>
      <p>Media management, blog posts and visual page preview are not connected yet.</p>
    </section>
  </main>;
}

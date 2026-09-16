import { defineConfig, defineType, defineField } from 'sanity';
import { structureTool } from 'sanity/structure';
import { Dashboard } from './Dashboard.jsx';

const serviceRoutes = ['agentic-seo', 'local-seo', 'website-content', 'custom-websites', 'business-automation', 'basic-app-development', 'growth-support'];
const route = values => defineField({name:'route',title:'Website page',type:'string',group:'content',options:{list:values},validation:r=>r.required(),description:'Choose an existing page. Only one document per page. This does not create a new URL.'});
const field = (name, title, type='string') => defineField({name,title,type,group:'content',validation:r=>r.required()});
export default defineConfig({
  name:'rankwithleo', title:'RankwithLeo content', projectId:'cygey76w', dataset:'production',
  tools:[{name:'dashboard',title:'Dashboard',component:Dashboard}],
  plugins:[structureTool({title:'Content',structure:S=>S.list().title('RankwithLeo').items([
    S.documentTypeListItem('portfolioService').title('Service Pages'),
    S.listItem().title('Browse by service').child(S.list().title('Website services').items(serviceRoutes.map(slug=>
      S.listItem().id(slug).title(slug.split('-').map(word=>word==='seo'?'SEO':word[0].toUpperCase()+word.slice(1)).join(' '))
        .child(S.documentList().title(slug).schemaType('portfolioService').filter('_type == "portfolioService" && route == $route').params({route:slug}))
    ))),
    S.divider(),
    S.listItem().title('SEO review').child(S.documentList().title('Optional SEO fields to review').schemaType('portfolioService').filter('_type == "portfolioService" && (!defined(seoTitle) || seoTitle == "" || !defined(seoDescription) || seoDescription == "")')),
  ])})],
  schema:{types:[
    defineType({name:'portfolioService',title:'Service Page',type:'document',groups:[{name:'content',title:'Content',default:true},{name:'seo',title:'SEO'}],preview:{select:{title:'name',route:'route'},prepare:({title,route})=>({title:title || (route ? `Untitled: ${route}` : 'New service page'),subtitle:route ? `/services/${route}/` : 'Choose a website page'})},fields:[
      route(serviceRoutes), field('name','Service name'), field('summary','Listing and SEO description','text'), field('body','Service introduction','text'),
      defineField({name:'seoTitle',title:'SEO title (optional)',type:'string',group:'seo',description:'The browser/search title. RankwithLeo is appended automatically. Leave empty to use the service name.'}),
      defineField({name:'seoDescription',title:'SEO description (optional)',type:'text',group:'seo',description:'A concise, accurate page summary. Leave empty to use the listing summary. Search engines may choose a different snippet.'}),
    ]}),
  ]},
});

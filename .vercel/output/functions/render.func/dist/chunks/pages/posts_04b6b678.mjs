import { d as createAstro, e as createComponent, r as renderTemplate, m as maybeRenderHead, h as renderComponent } from '../astro_2fab05a7.mjs';
import { g as getCollection, $ as $$PostCard, a as $$ViewTransitions, b as $$Layout } from './index_30827417.mjs';
/* empty css                           */import '../astro-assets-services_c7027916.mjs';

const $$Astro$1 = createAstro();
const $$AllPosts = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$AllPosts;
  const publishedPostEntries = await getCollection("posts");
  return renderTemplate`${maybeRenderHead()}<div><div class="text-2xl text-neutral-200">Writings</div><div class="py-3"></div><div class="flex max-w-xl flex-col gap-2">${publishedPostEntries.length !== 0 ? publishedPostEntries.map((post) => {
    return renderTemplate`${renderComponent($$result, "PostCard", $$PostCard, { "title": post.data.title, "date": post.data.date, "slug": post.slug, "isDraft": post.data.isDraft })}`;
  }) : renderTemplate`<div>Coming soon...</div>`}</div></div>`;
}, "/Users/m/Developer/website/src/components/posts/AllPosts.astro", void 0);

const $$Astro = createAstro();
const $$Posts = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Posts;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "jingxiangmo.com - posts" }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "ViewTransitions", $$ViewTransitions, {})}${renderComponent($$result2, "AllPosts", $$AllPosts, {})}` })}`;
}, "/Users/m/Developer/website/src/pages/posts.astro", void 0);

const $$file = "/Users/m/Developer/website/src/pages/posts.astro";
const $$url = "/posts";

export { $$Posts as default, $$file as file, $$url as url };

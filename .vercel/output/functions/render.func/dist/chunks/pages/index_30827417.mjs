import { d as createAstro, e as createComponent, r as renderTemplate, m as maybeRenderHead, g as addAttribute, h as renderComponent, F as Fragment, i as renderHead, j as renderSlot, A as AstroError, k as UnknownContentCollectionError, l as renderUniqueStylesheet, n as renderScriptElement, o as createHeadAndContent, u as unescapeHTML } from '../astro_2fab05a7.mjs';
/* empty css                           */import { p as prependForwardSlash } from '../astro-assets-services_c7027916.mjs';

const personalData = {
  email: "jingxiangmo@gmail.com"
};

const getBaseRouteName = (pathname) => {
  const matchTrailingSlash = /\w+\/$/;
  if (matchTrailingSlash.test(pathname))
    return pathname.slice(0, -1);
  return pathname;
};

const $$Astro$9 = createAstro();
const $$Header = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$9, $$props, $$slots);
  Astro2.self = $$Header;
  const currentRoute = Astro2.url.pathname;
  const routes = [
    {
      name: "Home",
      path: "/"
    },
    {
      name: "Projects",
      path: "/projects"
    },
    {
      name: "Writings",
      path: "/posts"
    }
  ];
  return renderTemplate`${maybeRenderHead()}<div><a${addAttribute(`mailto:${personalData.email}`, "href")} class="hover:text-neutral-100">${personalData.email}</a><div class="py-1"></div><div class="flex max-w-xl gap-2">${routes.map((route, idx) => {
    if (idx === routes.length - 1) {
      return renderTemplate`<a${addAttribute(route.path, "href")}${addAttribute({
        ["hover:text-neutral-100"]: true,
        ["text-neutral-100"]: getBaseRouteName(currentRoute) === route.path
      }, "class:list")}>${route.name}</a>`;
    }
    return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`<a${addAttribute(route.path, "href")}${addAttribute({
      ["hover:text-neutral-100"]: true,
      ["text-neutral-100"]: getBaseRouteName(currentRoute) === route.path
    }, "class:list")}>${route.name}</a><div>/</div>` })}`;
  })}</div></div>`;
}, "/Users/m/Developer/website/src/components/shared/Header.astro", void 0);

const $$Astro$8 = createAstro();
const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$8, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"><head><meta charset="UTF-8"><meta name="description" content="Jingxiang Mo's projects in software, hardware, design, and research."><meta name="viewport" content="width=device-width"><link rel="icon" href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💫</text></svg>"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head><body class="container mx-auto bg-neutral-900 p-8 text-sm text-neutral-400">${renderComponent($$result, "Header", $$Header, {})}<div class="py-4"></div>${renderSlot($$result, $$slots["default"])}</body></html>`;
}, "/Users/m/Developer/website/src/layouts/Layout.astro", void 0);

const $$Astro$7 = createAstro();
const $$ViewTransitions = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$ViewTransitions;
  const { fallback = "animate" } = Astro2.props;
  return renderTemplate`<meta name="astro-view-transitions-enabled" content="true"><meta name="astro-view-transitions-fallback"${addAttribute(fallback, "content")}>`;
}, "/Users/m/Developer/website/node_modules/.pnpm/astro@3.3.0/node_modules/astro/components/ViewTransitions.astro", void 0);

const $$Astro$6 = createAstro();
const $$Socials = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Socials;
  const socials = [
    {
      name: "GitHub",
      link: "https://github.com/jingxiangmo"
    },
    {
      name: "Twitter",
      link: "https://twitter.com/jingxiangmo"
    }
    // {
    //   name: "LinkedIn",
    //   link: "https://www.linkedin.com/in/itsjoeoui/",
    // },
  ];
  return renderTemplate`${maybeRenderHead()}<div class="flex gap-2">${socials.map((social, idx) => {
    if (idx !== socials.length - 1) {
      return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`<a${addAttribute(social.link, "href")} target="_blank" class="hover:text-neutral-100">${social.name}</a><div>/</div>` })}`;
    } else {
      return renderTemplate`<a${addAttribute(social.link, "href")} class="hover:text-neutral-100" target="_blank">${social.name}</a>`;
    }
  })}</div>`;
}, "/Users/m/Developer/website/src/components/shared/Socials.astro", void 0);

const $$Astro$5 = createAstro();
const $$Contact = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Contact;
  return renderTemplate`${maybeRenderHead()}<div><div class="text-xl text-neutral-200">Get in touch</div><div class="py-2"></div><div>
You can reach me at
<a${addAttribute(`mailto:${personalData.email}`, "href")} class="text-orange-400 hover:text-neutral-100">${personalData.email}</a>, or use any of the social links below!
</div><div class="py-1"></div>${renderComponent($$result, "Socials", $$Socials, {})}</div>`;
}, "/Users/m/Developer/website/src/components/shared/Contact.astro", void 0);

const projectsData = [
  {
    name: "Flojoy Robotics",
    desc: "A visual programming software for controlling industrial robotic arms with high precision, trajectory control, and server connectivity. ",
    link: "https://flojoy.ai",
    tags: [],
    img_link: "flojoy_robot.png"
  },
  {
    name: "AlphaScript AI",
    desc: "On-premise, privacy-centric medical transcription and summarization software for doctors. Local server architecture and local LLM inference.",
    link: "",
    tags: ["", ""],
    img_link: "alphascript.png"
  },
  {
    name: "VizArt Air Drawing",
    desc: "An awards winning game based on drawing with computer vision. Captures joint coordinates and uses vector algorithms for gesture recognition.",
    link: "https://vizart.tech/create",
    tags: ["", ""],
    img_link: "vizart.png"
  },
  {
    name: "E-commerce Platform @ Qubit (Coveo)",
    desc: "Engineered features at Coveo Qubit for live database editing, automating processes, and DAG workflow for the Qubit e-commerce platform.",
    link: "https://www.coveo.com/en/qubit",
    tags: ["", ""],
    img_link: "qubit.png"
  },
  {
    name: "Streamline PoS",
    desc: "Point of Sale (PoS) platform for restaurants, expediting customer ordering while bolstering financial tracking and efficiency.",
    link: "https://customer-ofour.web.app/",
    tags: ["", ""],
    img_link: "streamline.png"
  },
  {
    name: "Cooperative & Intelligent Swarm Robotics Research",
    desc: "Developed a robot to research AI-driven robotics cooperations and intelligent swarms.",
    link: "",
    tags: ["", ""],
    img_link: "swarm_robotics.png"
  },
  {
    name: "McGill Projects Community",
    desc: "Founder and maintainer for a community of people building cool projects with 500+ members.",
    link: "https://discord.com/invite/hjNnKAymPf",
    tags: ["", ""],
    img_link: "mcgill_projects.png"
  },
  {
    name: "Pharmascience Market Intelligence System",
    desc: "A cutting-edge market intelligence platform for Pharmascience. Designed to integrate internal and external data into one application for analyzing market predictions and product performance.",
    link: "",
    tags: ["", ""],
    img_link: "pharmascience.png"
  },
  {
    name: "MUS Website",
    desc: "Designed and created the website for McGill University's Management Undergraduate Society.",
    link: "https://www.musmcgill.com/",
    tags: ["", ""],
    img_link: "mus.png"
  },
  {
    name: "Cache Optimized Template Matching Algorithm",
    desc: "Cache optimized template matching algorithm implementation in MIPS Assembly Language.",
    link: "",
    tags: ["", ""],
    img_link: "mips.png"
  },
  {
    name: "Email Secretary",
    desc: "Developed to help non-native English speakers. GPT-3 aided drafting and text refinement for email communication.",
    link: "https://github.com/jingxiangmo/email-secretary",
    tags: ["", ""],
    img_link: "email.png"
  }
];

const $$Astro$4 = createAstro();
const $$HomeProjectCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$HomeProjectCard;
  const { proj } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(proj.link, "href")} target="_blank" class="max-w-xl rounded-md border border-neutral-800 p-4 transition hover:bg-neutral-800"><div class="text-md flex items-center gap-1 text-neutral-300">${proj.name}</div><div class="py-1"></div><div class="text-sm text-neutral-400">${proj.desc}</div></a>`;
}, "/Users/m/Developer/website/src/components/home/HomeProjectCard.astro", void 0);

const $$Astro$3 = createAstro();
const $$LatestProjects = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$LatestProjects;
  return renderTemplate`${maybeRenderHead()}<div><div class="flex max-w-xl items-center"><div class="text-xl text-neutral-200">Notable projects </div><div class="grow"></div><a href="/projects" class="hover:text-neutral-100">View all</a></div><div class="py-2"></div><div class="flex flex-col gap-2">${projectsData.slice(0, 3).map((proj, _) => {
    return renderTemplate`${renderComponent($$result, "ProjectCard", $$HomeProjectCard, { "proj": proj })}`;
  })}</div></div>`;
}, "/Users/m/Developer/website/src/components/home/LatestProjects.astro", void 0);

function createCollectionToGlobResultMap({
  globResult,
  contentDir
}) {
  const collectionToGlobResultMap = {};
  for (const key in globResult) {
    const keyRelativeToContentDir = key.replace(new RegExp(`^${contentDir}`), "");
    const segments = keyRelativeToContentDir.split("/");
    if (segments.length <= 1)
      continue;
    const collection = segments[0];
    collectionToGlobResultMap[collection] ??= {};
    collectionToGlobResultMap[collection][key] = globResult[key];
  }
  return collectionToGlobResultMap;
}
const cacheEntriesByCollection = /* @__PURE__ */ new Map();
function createGetCollection({
  contentCollectionToEntryMap,
  dataCollectionToEntryMap,
  getRenderEntryImport
}) {
  return async function getCollection(collection, filter) {
    let type;
    if (collection in contentCollectionToEntryMap) {
      type = "content";
    } else if (collection in dataCollectionToEntryMap) {
      type = "data";
    } else {
      console.warn(
        `The collection **${collection}** does not exist or is empty. Ensure a collection directory with this name exists.`
      );
      return;
    }
    const lazyImports = Object.values(
      type === "content" ? contentCollectionToEntryMap[collection] : dataCollectionToEntryMap[collection]
    );
    let entries = [];
    if (cacheEntriesByCollection.has(collection)) {
      entries = [...cacheEntriesByCollection.get(collection)];
    } else {
      entries = await Promise.all(
        lazyImports.map(async (lazyImport) => {
          const entry = await lazyImport();
          return type === "content" ? {
            id: entry.id,
            slug: entry.slug,
            body: entry.body,
            collection: entry.collection,
            data: entry.data,
            async render() {
              return render({
                collection: entry.collection,
                id: entry.id,
                renderEntryImport: await getRenderEntryImport(collection, entry.slug)
              });
            }
          } : {
            id: entry.id,
            collection: entry.collection,
            data: entry.data
          };
        })
      );
      cacheEntriesByCollection.set(collection, entries);
    }
    if (typeof filter === "function") {
      return entries.filter(filter);
    } else {
      return entries;
    }
  };
}
async function render({
  collection,
  id,
  renderEntryImport
}) {
  const UnexpectedRenderError = new AstroError({
    ...UnknownContentCollectionError,
    message: `Unexpected error while rendering ${String(collection)} \u2192 ${String(id)}.`
  });
  if (typeof renderEntryImport !== "function")
    throw UnexpectedRenderError;
  const baseMod = await renderEntryImport();
  if (baseMod == null || typeof baseMod !== "object")
    throw UnexpectedRenderError;
  const { default: defaultMod } = baseMod;
  if (isPropagatedAssetsModule(defaultMod)) {
    const { collectedStyles, collectedLinks, collectedScripts, getMod } = defaultMod;
    if (typeof getMod !== "function")
      throw UnexpectedRenderError;
    const propagationMod = await getMod();
    if (propagationMod == null || typeof propagationMod !== "object")
      throw UnexpectedRenderError;
    const Content = createComponent({
      factory(result, baseProps, slots) {
        let styles = "", links = "", scripts = "";
        if (Array.isArray(collectedStyles)) {
          styles = collectedStyles.map((style) => {
            return renderUniqueStylesheet(result, {
              type: "inline",
              content: style
            });
          }).join("");
        }
        if (Array.isArray(collectedLinks)) {
          links = collectedLinks.map((link) => {
            return renderUniqueStylesheet(result, {
              type: "external",
              src: prependForwardSlash(link)
            });
          }).join("");
        }
        if (Array.isArray(collectedScripts)) {
          scripts = collectedScripts.map((script) => renderScriptElement(script)).join("");
        }
        let props = baseProps;
        if (id.endsWith("mdx")) {
          props = {
            components: propagationMod.components ?? {},
            ...baseProps
          };
        }
        return createHeadAndContent(
          unescapeHTML(styles + links + scripts),
          renderTemplate`${renderComponent(
            result,
            "Content",
            propagationMod.Content,
            props,
            slots
          )}`
        );
      },
      propagation: "self"
    });
    return {
      Content,
      headings: propagationMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: propagationMod.frontmatter ?? {}
    };
  } else if (baseMod.Content && typeof baseMod.Content === "function") {
    return {
      Content: baseMod.Content,
      headings: baseMod.getHeadings?.() ?? [],
      remarkPluginFrontmatter: baseMod.frontmatter ?? {}
    };
  } else {
    throw UnexpectedRenderError;
  }
}
function isPropagatedAssetsModule(module) {
  return typeof module === "object" && module != null && "__astroPropagation" in module;
}

// astro-head-inject

const contentDir = '/src/content/';

const contentEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/posts/hello world.md": () => import('../hello world_78450613.mjs')

});
const contentCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: contentEntryGlob,
	contentDir,
});

const dataEntryGlob = /* #__PURE__ */ Object.assign({

});
const dataCollectionToEntryMap = createCollectionToGlobResultMap({
	globResult: dataEntryGlob,
	contentDir,
});
createCollectionToGlobResultMap({
	globResult: { ...contentEntryGlob, ...dataEntryGlob },
	contentDir,
});

let lookupMap = {};
lookupMap = {"posts":{"type":"content","entries":{"hello-world":"/src/content/posts/hello world.md"}}};

function createGlobLookup(glob) {
	return async (collection, lookupId) => {
		const filePath = lookupMap[collection]?.entries[lookupId];

		if (!filePath) return undefined;
		return glob[collection][filePath];
	};
}

const renderEntryGlob = /* #__PURE__ */ Object.assign({"/src/content/posts/hello world.md": () => import('../hello world_50a6bfa8.mjs')

});
const collectionToRenderEntryMap = createCollectionToGlobResultMap({
	globResult: renderEntryGlob,
	contentDir,
});

const getCollection = createGetCollection({
	contentCollectionToEntryMap,
	dataCollectionToEntryMap,
	getRenderEntryImport: createGlobLookup(collectionToRenderEntryMap),
});

const $$Astro$2 = createAstro();
const $$PostCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$PostCard;
  const { title, slug, date, isDraft } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(`/posts/${slug}`, "href")} class="rounded-md border border-neutral-800 p-4 transition hover:bg-neutral-800"><div class="text-md flex flex-col gap-1 sm:flex-row sm:items-center"><div class="text-neutral-300">${title}</div><div class="sm:grow"></div><div class="flex">${isDraft && renderTemplate`<div class="order-2 px-2 text-sm text-neutral-500 sm:order-1">
Draft
</div>`}<div class="order-1 sm:order-2">${date.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</div></div></div></a>`;
}, "/Users/m/Developer/website/src/components/shared/PostCard.astro", void 0);

const $$Astro$1 = createAstro();
const $$LatestPosts = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$LatestPosts;
  const publishedPostEntries = await getCollection("posts", ({ data }) => {
    return data.isDraft !== true;
  });
  return renderTemplate`${maybeRenderHead()}<div><div class="flex max-w-xl items-center"><div class="text-xl text-neutral-200">Latest posts</div><div class="grow"></div><a href="/posts" class="hover:text-neutral-100">View all</a></div><div class="py-2"></div><div class="flex max-w-xl flex-col dfs gap-2">${publishedPostEntries.length !== 0 ? publishedPostEntries.slice(0, 2).map((post) => {
    return renderTemplate`${renderComponent($$result, "PostCard", $$PostCard, { "title": post.data.title, "date": post.data.date, "slug": post.slug, "isDraft": post.data.isDraft })}`;
  }) : renderTemplate`<div>Coming soon...</div>`}</div></div>`;
}, "/Users/m/Developer/website/src/components/home/LatestPosts.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "jingxiangmo.com - home" }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "ViewTransitions", $$ViewTransitions, {})}${maybeRenderHead()}<div class="text-2xl text-neutral-100">Projects in Software, Hardware, Design, and Research</div><div class="py-4"></div><div class="max-w-xl leading-relaxed space-y-1.5"><div class="mb-2"> I currently work on the future of automation at <a class="text-orange-400 hover:text-neutral-100" href="https://zeroth.sh" target="_blank">Zeroth</a>.

      I'm also a technical lead at <a class="text-orange-400 hover:text-neutral-100" href="https://flojoy.ai" target="_blank">Flojoy</a>, building a visual programming system for engineers and scientists
      to simplify data acquisition, instrument control, and industrial automation.
</div><div class="max-w-xl leading-relaxed space-y-1.5">
I'm a student at <a class="text-orange-400 hover:text-neutral-100" href="https://mcgill.ca" target="_blank">McGill University</a>, specializing in applied robotics and applied machine learning.

      Previously, I worked at
<a class="text-orange-400 hover:text-neutral-100" href="https://qubit.com/" target="_blank">Qubit</a> as a software product engineer on the search, recommendations, and personalization platform.
</div><div class="max-w-xl leading-relaxed space-y-1.5">
Other interests: Psychology, ultramarathons, history, physics, bouldering, chess, backpacking, photography.
</div></div><div class="py-4"></div>${renderComponent($$result2, "LatestPosts", $$LatestPosts, {})}<div class="py-4"></div>${renderComponent($$result2, "ProjectList", $$LatestProjects, {})}<div class="py-4"></div>${renderComponent($$result2, "Contact", $$Contact, {})}` })}`;
}, "/Users/m/Developer/website/src/pages/index.astro", void 0);

const $$file = "/Users/m/Developer/website/src/pages/index.astro";
const $$url = "";

const index = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$PostCard as $, $$ViewTransitions as a, $$Layout as b, $$Contact as c, getCollection as g, index as i, projectsData as p };

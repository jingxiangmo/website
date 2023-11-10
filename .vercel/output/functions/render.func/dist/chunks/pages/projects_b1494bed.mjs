import { d as createAstro, e as createComponent, r as renderTemplate, h as renderComponent, u as unescapeHTML, F as Fragment, m as maybeRenderHead, g as addAttribute } from '../astro_2fab05a7.mjs';
import { p as projectsData, a as $$ViewTransitions, b as $$Layout } from './index_30827417.mjs';
import crypto from 'node:crypto';
import objectHash from 'object-hash';
import fs from 'node:fs';
import path, { parse, join, relative, extname, resolve } from 'node:path';
import util from 'node:util';
import potrace from 'potrace';
import findCacheDir from 'find-cache-dir';
import { fileURLToPath } from 'node:url';

// To strip off params when checking for file on disk.
const paramPattern = /\?.*/;

/**
 * getSrcPath allows the use of `src` attributes relative to either the public folder or project root.
 *
 * It first checks to see if the src is a file relative to the project root.
 * If the file isn't found, it will look in the public folder.
 * Finally, if it still can't be found, the original input will be returned.
 */
async function getSrcPath(src) {
  const { default: astroViteConfigs } = await import(
    '../astroViteConfigs_f0b0c92e.mjs'
  );

  // If this is already resolved to a file, return it.
  if (fs.existsSync(src.replace(paramPattern, ""))) return src;

  const rootPath = path.join(astroViteConfigs.rootDir, src);
  const rootTest = rootPath.replace(paramPattern, "");
  if (fs.existsSync(rootTest)) return rootPath;

  const publicPath = path.join(astroViteConfigs.publicDir, src);
  const publicTest = publicPath.replace(paramPattern, "");
  if (fs.existsSync(publicTest)) return publicPath;

  // Fallback
  return src;
}

// @ts-check

async function getSrcset(
  src,
  base,
  breakpoints,
  format,
  options
) {
  options = {
    format,
    w: breakpoints,
    ...options,
  };

  const keys = Object.keys(options);

  const params = keys.length
    ? keys
        .map((key) =>
          Array.isArray(options[key])
            ? `&${key}=${options[key].join(";")}`
            : `&${key}=${options[key]}`
        )
        .join("")
    : "";

  const id = `${src}?${params.slice(1)}`;

  const fullPath = await getSrcPath(id);

  const { default: load } = await import('../load_96a661f6.mjs');

  // @ts-ignore
  const srcset = (await load(fullPath, base)).slice(16, -1);

  return srcset;
}

// @ts-check

const colours = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  dim: "\x1b[2m",
  underscore: "\x1b[4m",
  blink: "\x1b[5m",
  reverse: "\x1b[7m",
  hidden: "\x1b[8m",

  fg: {
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
  },

  bg: {
    black: "\x1b[40m",
    red: "\x1b[41m",
    green: "\x1b[42m",
    yellow: "\x1b[43m",
    blue: "\x1b[44m",
    magenta: "\x1b[45m",
    cyan: "\x1b[46m",
    white: "\x1b[47m",
  },
};

function printWarning({
  key = "",
  type = "",
  message = "",
  element = "",
}) {
  const flag =
    colours.bright + colours.fg.cyan + "[astro-imagetools]" + colours.reset;

  const keyLog = key
    ? " " + colours.bg.yellow + ` ${key} ` + colours.reset
    : "";

  const messageLog =
    colours.fg.yellow +
    (message ||
      (!element
        ? `is not a valid ${type} Config Option`
        : `can't be defined inside attributes.${element}`)) +
    colours.reset;

  console.log(flag + keyLog, messageLog);
}

// @ts-check

function getBreakpoints(breakpoints, imageWidth) {
  if (Array.isArray(breakpoints)) {
    return breakpoints.sort((a, b) => a - b);
  }

  const { count, minWidth = 320 } = breakpoints || {};

  const maxWidth = (() => {
    if (breakpoints?.maxWidth) return breakpoints.maxWidth;

    if (imageWidth > 3840) {
      printWarning({
        message:
          "The width of the source image is greater than 3840px. The generated breakpoints will be capped at 3840px. If you need breakpoints larger than this, please pass the maxWidth option to the breakpoints property.",
      });

      return 3840;
    }

    return imageWidth;
  })();

  const breakPoints = [];

  const diff = maxWidth - minWidth;

  const n =
    count ||
    (maxWidth <= 400
      ? 1
      : maxWidth <= 640
      ? 2
      : maxWidth <= 800
      ? 3
      : maxWidth <= 1024
      ? 4
      : maxWidth <= 1280
      ? 5
      : maxWidth <= 1440
      ? 6
      : maxWidth <= 1920
      ? 7
      : maxWidth <= 2560
      ? 8
      : maxWidth <= 2880
      ? 9
      : maxWidth <= 3840
      ? 10
      : 11);

  let currentWidth = minWidth;

  n > 1 && breakPoints.push(currentWidth);

  let steps = 0;

  for (let i = 1; i < n; i++) {
    steps += i;
  }

  const pixelsPerStep = diff / steps;

  for (let i = 1; i < n - 1; i++) {
    const next = pixelsPerStep * (n - i) + currentWidth;

    breakPoints.push(Math.round(next));

    currentWidth = next;
  }

  breakPoints.push(maxWidth);

  return [...new Set(breakPoints)];
}

// @ts-check

function getConfigOptions(
  imageWidth,
  imagesizes,
  breakpoints,
  format,
  imageFormat,
  fallbackFormat,
  includeSourceFormat
) {
  const formats = [
    ...new Set(
      [format, includeSourceFormat && imageFormat]
        .flat()
        .filter((f) => f && f !== fallbackFormat)
    ),
    fallbackFormat,
  ];

  const requiredBreakpoints = getBreakpoints(breakpoints, imageWidth);

  imagesizes =
    typeof imagesizes === "string"
      ? imagesizes
      : imagesizes(requiredBreakpoints);

  return {
    formats,
    imagesizes,
    requiredBreakpoints,
  };
}

// @ts-check

function filterConfigs(
  type,
  configs,
  supportedConfigs,
  { warn = true } = {}
) {
  const clonedConfigs = { ...configs };

  const requiredConfigs = [];

  type !== "Global" && requiredConfigs.push("src");

  ["Img", "Picture"].includes(type) && requiredConfigs.push("alt");

  requiredConfigs.forEach((key) => {
    if (typeof clonedConfigs[key] === "undefined") {
      throw new Error(`The "${key}" property is required by ${type}`);
    }
  });

  Object.keys(clonedConfigs).forEach((key) => {
    if (!supportedConfigs.includes(key)) {
      if (warn) {
        if (key !== "class") {
          printWarning({ key, type });
        } else if (!onlyAstroClass(clonedConfigs[key])) {
          printWarning({
            message: `Do not provide a "class" directly to ${type}.  Instead, use attributes: https://astro-imagetools-docs.vercel.app/en/components/${type}#attributes`,
          });
        }
      }

      delete clonedConfigs[key];
    }
  });

  return clonedConfigs;
}

/**
 * Checks if the `class` attribute string is only an astro-generated scoped style class.
 */
function onlyAstroClass(classAttr) {
  const astroClassPattern = /^astro-[0-9A-Z]{8}$/;
  return astroClassPattern.test(classAttr);
}

// @ts-check

const FindUpModule = await import('../index_9f92597d.mjs'),
  findUp = FindUpModule.findUp || FindUpModule.default;

// Sharp related checks
const sharp = await (async () => {
  try {
    if (await import('sharp')) {
      return true;
    }
  } catch (error) {
    return false;
  }
})();

const supportedImageTypes = [
  "avif",
  "jpeg",
  "jpg",
  "png",
  "webp",
  ...(sharp ? ["heic", "heif", "tiff", "gif"] : ["jxl", "wp2"]),
];

// prettier-ignore
const supportedConfigs = [
  "src", "alt", "tag", "content", "sizes", "preload", "loading", "decoding", "attributes",
  "layout", "placeholder", "breakpoints", "objectFit", "objectPosition", "backgroundSize",
  "backgroundPosition", "format", "fallbackFormat", "includeSourceFormat", "formatOptions",
  "fadeInTransition", "artDirectives", "flip", "flop", "invert", "flatten", "normalize",
  "grayscale", "hue", "saturation", "brightness", "w", "h", "ar", "width", "height", "aspect",
  "background", "tint", "blur", "median", "rotate", "quality", "fit", "kernel", "position",
  "cacheDir", "assetFileNames",
];

const configFile = await findUp([
  "astro-imagetools.config.js",
  "astro-imagetools.config.mjs",
]);

const configFunction = configFile
  ? await import(configFile).catch(async () => await import("/" + configFile))
  : null;

const rawGlobalConfigOptions = configFunction?.default ?? {};

const NonGlobalConfigOptions = ["src", "alt", "content"];

const GlobalConfigs = supportedConfigs.filter(
  (key) => !NonGlobalConfigOptions.includes(key)
);

const GlobalConfigOptions = filterConfigs(
  "Global",
  rawGlobalConfigOptions,
  GlobalConfigs
);

// CWD
const cwd = process.cwd().split(path.sep).join(path.posix.sep);

const { cacheDir } = GlobalConfigOptions;

// FS Cache related checks
const fsCachePath =
  (cacheDir
    ? cwd + cacheDir
    : findCacheDir({
        name: "astro-imagetools",
      })) + "/";

fs.existsSync(fsCachePath) || fs.mkdirSync(fsCachePath, { recursive: true });

// @ts-check


async function getFallbackImage(
  src,
  placeholder,
  image,
  format,
  formatOptions,
  rest
) {
  const base = null;

  switch (placeholder) {
    case "blurred": {
      const dataUri = await getSrcset(src, base, [20], format, {
        inline: true,
        ...rest,
        ...formatOptions[format],
      });

      return dataUri;
    }
    case "tracedSVG": {
      const { function: fn, options } = formatOptions.tracedSVG;

      const traceSVG = util.promisify(potrace[fn]);

      const imageBuffer = sharp
        ? await image.toBuffer()
        : Buffer.from(
            (await image.encode(`image/${format === "jpg" ? "jpeg" : format}`))
              .data
          );

      const tracedSVG = await traceSVG(imageBuffer, options);

      return `data:image/svg+xml;utf8,${tracedSVG}`;
    }
    case "dominantColor": {
      if (sharp) {
        var { r, g, b } = (await image.stats()).dominant;
      } else {
        [r, g, b] = image.color;
      }

      const svg = `<svg xmlns="http://www.w3.org/2000/svg" style="background: rgb(${r},${g},${b})"></svg>`;

      return `data:image/svg+xml;utf8,${svg}`;
    }
    default:
      return null;
  }
}

// @ts-check

async function getImageSources(
  src,
  base,
  image,
  format,
  imageWidth,
  imagesizes,
  breakpoints,
  placeholder,
  imageFormat,
  formatOptions,
  fallbackFormat,
  includeSourceFormat,
  rest
) {
  const calculatedConfigs = getConfigOptions(
    imageWidth,
    imagesizes,
    breakpoints,
    format,
    imageFormat,
    fallbackFormat,
    includeSourceFormat
  );

  const { formats, requiredBreakpoints } = calculatedConfigs;

  imagesizes = calculatedConfigs.imagesizes;

  const maxWidth = requiredBreakpoints[requiredBreakpoints.length - 1];
  const sliceLength = -(maxWidth.toString().length + 2);

  const sources = await Promise.all(
    formats.map(async (format) => {
      const srcset = await getSrcset(src, base, requiredBreakpoints, format, {
        ...rest,
        ...formatOptions[format],
      });

      const srcsets = srcset.split(", ");
      const srcObject =
        format === fallbackFormat
          ? { src: srcsets[srcsets.length - 1].slice(0, sliceLength) }
          : {};

      return {
        ...srcObject,
        format,
        srcset,
      };
    })
  );

  const sizes = {
    width: maxWidth,
    height: Math.round(maxWidth / rest.aspect),
  };

  const fallback = await getFallbackImage(
    src,
    placeholder,
    image,
    fallbackFormat,
    formatOptions,
    rest
  );

  return { sources, sizes, fallback, imagesizes };
}

// @ts-check

function throwErrorIfUnsupported(src, ext) {
  if (!ext && typeof ext !== "string") {
    throw new Error(`Failed to load ${src}; Invalid image format`);
  }

  if (ext && !supportedImageTypes.includes(ext.toLowerCase())) {
    throw new Error(
      `Failed to load ${src}; Invalid image format ${ext} or the format is not supported by astro-imagetools`
    );
  }
}

// @ts-check

const { fileTypeFromBuffer } = await import('file-type');

async function getResolvedSrc(src) {
  const token = crypto.createHash("md5").update(src).digest("hex");

  let filepath = fsCachePath + token;

  const fileExists = (() => {
    for (const type of supportedImageTypes) {
      const fileExists = fs.existsSync(filepath + `.${type}`);

      if (fileExists) {
        filepath += `.${type}`;

        return true;
      }
    }
  })();

  if (!fileExists) {
    const buffer = Buffer.from(await (await fetch(src)).arrayBuffer());

    const { ext } = (await fileTypeFromBuffer(buffer)) || {};

    throwErrorIfUnsupported(src, ext);

    filepath += `.${ext}`;

    fs.writeFileSync(filepath, buffer);
  }

  const base = /^https?:/.test(src)
    ? parse(new URL(src).pathname).name
    : undefined;

  src = join("/", relative(cwd, filepath));

  return { src, base };
}

// @ts-check

const { getImageDetails } = await (sharp
  ? import('../imagetools_850e670a.mjs')
  : import('../codecs_a48cc0e1.mjs'));

async function getProcessedImage(src, transformConfigs) {
  throwErrorIfUnsupported(src, extname(src).slice(1));

  let base;

  if (src.match("(http://|https://|data:image/).*")) {
    ({ src, base } = await getResolvedSrc(src));
  } else {
    const {
      default: { isSsrBuild },
    } = await import('../astroViteConfigs_f0b0c92e.mjs');

    if (isSsrBuild) {
      const filename = fileURLToPath(import.meta.url);

      const assetPath = resolve(filename, "../../client") + src;

      src = "/" + relative(cwd, assetPath);
    }
  }

  const {
    w,
    h,
    ar,
    width = w,
    height = h,
    aspect = ar,
    ...rest
  } = transformConfigs;

  const path = src.replace(/\\/g, `/`);

  // console.log(await getSrcPath(src), width, height, aspect);

  const { image, imageWidth, imageHeight, imageFormat } = await getImageDetails(
    await getSrcPath(src),
    width,
    height,
    aspect
  );

  // console.log(image, imageWidth, imageHeight, imageFormat);

  return {
    path,
    base,
    rest,
    image,
    imageWidth,
    imageHeight,
    imageFormat,
  };
}

// @ts-check

async function getArtDirectedImages(
  artDirectives = [],
  placeholder,
  format,
  imagesizes,
  breakpoints,
  fallbackFormat,
  includeSourceFormat,
  formatOptions,
  rest
) {
  const images = await Promise.all(
    artDirectives.map(
      async ({
        src,
        media,
        sizes: directiveImagesizes,
        placeholder: directivePlaceholder,
        breakpoints: directiveBreakpoints,
        objectFit,
        objectPosition,
        backgroundSize,
        backgroundPosition,
        format: directiveFormat,
        fallbackFormat: directiveFallbackFormat,
        includeSourceFormat: directiveIncludeSourceFormat,
        formatOptions: directiveFormatOptions = {},
        ...configOptions
      }) => {
        const {
          path,
          base,
          rest: rest2,
          image,
          imageWidth,
          imageHeight,
          imageFormat,
        } = await getProcessedImage(src, configOptions);

        rest2.aspect = `${imageWidth / imageHeight}`;

        const calculatedConfigs = getConfigOptions(
          imageWidth,
          directiveImagesizes || imagesizes,
          directiveBreakpoints || breakpoints,
          directiveFormat || format,
          imageFormat,
          directiveFallbackFormat || fallbackFormat,
          directiveIncludeSourceFormat || includeSourceFormat
        );

        const { formats, requiredBreakpoints } = calculatedConfigs;

        imagesizes = calculatedConfigs.imagesizes;

        const maxWidth = requiredBreakpoints[requiredBreakpoints.length - 1];

        const sources = await Promise.all(
          formats.map(async (format) => {
            const srcset = await getSrcset(
              path,
              base,
              requiredBreakpoints,
              format,
              {
                ...rest,
                ...rest2,
                ...formatOptions[format],
                ...directiveFormatOptions[format],
              }
            );

            return {
              format,
              srcset,
            };
          })
        );

        const sizes = {
          width: maxWidth,
          height: Math.round(maxWidth / rest2.aspect),
        };

        const object = {
          fit: objectFit,
          position: objectPosition,
        };

        const fallback = await getFallbackImage(
          path,
          directivePlaceholder || placeholder,
          image,
          imageFormat,
          { ...formatOptions, ...directiveFormatOptions },
          { ...rest, ...rest2 }
        );

        return {
          media,
          sources,
          sizes,
          object,
          fallback,
          imagesizes,
        };
      }
    )
  );

  return images;
}

// @ts-check

const imagesData = new Map();

async function getImage ({
  src,
  type,
  sizes: imagesizes,
  format,
  breakpoints,
  placeholder,
  fallbackFormat,
  includeSourceFormat,
  formatOptions,
  artDirectives,
  transformConfigs,
}) {
  const args = Array.from(arguments);

  const hash = objectHash(args);

  if (imagesData.has(hash)) {
    return imagesData.get(hash);
  }

  const start = performance.now();

  const { path, base, rest, image, imageWidth, imageHeight, imageFormat } =
    await getProcessedImage(src, transformConfigs);

  src = path;

  rest.aspect = `${imageWidth / imageHeight}`;

  if (!fallbackFormat) {
    fallbackFormat = imageFormat;
  }

  const [mainImage, artDirectedImages] = await Promise.all([
    getImageSources(
      src,
      base,
      image,
      format,
      imageWidth,
      imagesizes,
      breakpoints,
      placeholder,
      imageFormat,
      formatOptions,
      fallbackFormat,
      includeSourceFormat,
      rest
    ),
    getArtDirectedImages(
      artDirectives,
      placeholder,
      format,
      imagesizes,
      breakpoints,
      fallbackFormat,
      includeSourceFormat,
      formatOptions,
      rest
    ),
  ]);

  const images = [...artDirectedImages, mainImage];

  const uuid = crypto.randomBytes(4).toString("hex").toUpperCase();

  const returnObject = {
    uuid,
    images,
  };

  imagesData.set(hash, returnObject);

  const end = performance.now();

  console.log(
    `Responsive Image sets generated for ${type} at ${args[0].src} in ${
      end - start
    }ms`
  );

  return returnObject;
}

// @ts-check


function getAttributesString({
  attributes,
  element = "",
  excludeArray = [],
}) {
  const attributesString = Object.keys(attributes)
    .filter((key) => {
      if (excludeArray.includes(key)) {
        printWarning({
          key,
          element,
        });

        return false;
      }

      return true;
    })
    .map((key) => `${key}="${attributes[key]}"`)
    .join(" ");

  return attributesString;
}

// @ts-check


function getImgElement({
  src,
  alt,
  sizes,
  style,
  srcset,
  loading,
  decoding,
  imagesizes,
  fadeInTransition,
  layoutStyles,
  imgAttributes,
  imgClassName = "",
}) {
  const {
    class: customClasses = "",
    style: customInlineStyles = "",
    onload: customOnload = "",
    ...restImgAttributes
  } = imgAttributes;

  const attributesString = getAttributesString({
    attributes: restImgAttributes,
    element: "img",
    excludeArray: [
      "src",
      "alt",
      "srcset",
      "sizes",
      "width",
      "height",
      "loading",
      "decoding",
    ],
  });

  const classAttribute = ["astro-imagetools-img", imgClassName, customClasses]
    .join(" ")
    .trim();

  const styleAttribute = [
    "display: inline-block; overflow: hidden; vertical-align: middle;",
    customInlineStyles + (customInlineStyles.endsWith(";") ? "" : ";"),
    layoutStyles,
  ]
    .join(" ")
    .trim();

  const onloadAttribute = [
    !imgClassName && style
      ? fadeInTransition
        ? `parentElement.style.setProperty('--z-index', 1); parentElement.style.setProperty('--opacity', 0);`
        : `parentElement.style.backgroundImage = 'unset';`
      : "",
    customOnload,
  ]
    .join(" ")
    .trim();

  const imgElement = `<img
    ${attributesString}
    src="${src}"
    ${typeof alt === "string" ? `alt="${alt}"` : ""}
    srcset="${srcset}"
    sizes="${imagesizes}"
    width="${sizes.width}"
    height="${sizes.height}"
    ${loading ? `loading="${loading}"` : ""}
    ${decoding ? `decoding="${decoding}"` : ""}
    class="${classAttribute}"
    style="${styleAttribute}"
    onload="${onloadAttribute}"
  />`;

  return imgElement;
}

// @ts-check

function getLinkElement({
  images = [],
  preload = "",
  imagesizes = "",
  linkAttributes,
}) {
  const imagesrcset =
    preload &&
    images[images.length - 1]?.sources.find(
      ({ format: fmt }) => fmt === preload
    )?.srcset;

  const attributesString = getAttributesString({
    element: "link",
    attributes: linkAttributes,
    excludeArray: ["as", "rel", "imagesizes", "imagesrcset"],
  });

  const linkElement =
    preload && images.length
      ? `<link
        ${attributesString}
        as="image"
        rel="preload"
        imagesizes="${imagesizes}"
        imagesrcset="${imagesrcset}"
      />`
      : "";

  return linkElement;
}

// @ts-check

function getStyleElement({
  styleAttributes,
  backgroundStyles = "",
}) {
  const attributesString = getAttributesString({
    attributes: styleAttributes,
  });

  const styleElement = `<style ${attributesString}>${backgroundStyles}</style>`;

  return styleElement;
}

// @ts-check

function getLayoutStyles({
  layout = null,
  isBackgroundImage = false,
}) {
  return isBackgroundImage
    ? "width: 100%; height: 100%;"
    : layout === "fill"
    ? `width: 100%; height: 100%;`
    : layout === "fullWidth"
    ? `width: 100%; height: auto;`
    : layout === "fixed"
    ? ""
    : "max-width: 100%; height: auto;";
}

// @ts-check

const GlobalOnlyProperties = ["cacheDir", "assetFileNames"];

const NonGlobalSupportedConfigs = supportedConfigs.filter(
  (key) => !GlobalOnlyProperties.includes(key)
);

const NonProperties = {
  Img: [
    "tag",
    "content",
    "backgroundSize",
    "backgroundPosition",
    "fallbackFormat",
    "includeSourceFormat",
    "fadeInTransition",
    "artDirectives",
  ],
  Picture: ["tag", "content", "backgroundSize", "backgroundPosition"],
  BackgroundImage: [
    "alt",
    "loading",
    "decoding",
    "layout",
    "objectFit",
    "objectPosition",
    "fadeInTransition",
  ],
  BackgroundPicture: ["alt", "backgroundSize", "backgroundPosition"],
};

const ImgProperties = NonGlobalSupportedConfigs.filter(
    (key) => !NonProperties.Img.includes(key)
  ),
  PictureProperties = NonGlobalSupportedConfigs.filter(
    (key) => !NonProperties.Picture.includes(key)
  ),
  BackgroundImageProperties = NonGlobalSupportedConfigs.filter(
    (key) => !NonProperties.BackgroundImage.includes(key)
  ),
  BackgroundPictureProperties = NonGlobalSupportedConfigs.filter(
    (key) => !NonProperties.BackgroundPicture.includes(key)
  );

const SupportedProperties = {
  Img: ImgProperties,
  Picture: PictureProperties,
  BackgroundImage: BackgroundImageProperties,
  BackgroundPicture: BackgroundPictureProperties,
};

function getFilteredProps(type, props) {
  const filteredGlobalConfigs = filterConfigs(
    "Global",
    GlobalConfigOptions,
    SupportedProperties[type],
    { warn: false }
  );

  const { search, searchParams } = new URL(props.src, "file://");

  props.src = props.src.replace(search, "");

  const paramOptions = Object.fromEntries(searchParams);

  const filteredLocalProps = filterConfigs(
    type,
    {
      ...paramOptions,
      ...props,
    },
    SupportedProperties[type]
  );

  const resolvedProps = {
    ...filteredGlobalConfigs,
    ...filteredLocalProps,
  };

  const {
    src,
    alt,
    tag = "section",
    content = "",
    sizes = function (breakpoints) {
      const maxWidth = breakpoints[breakpoints.length - 1];
      return `(min-width: ${maxWidth}px) ${maxWidth}px, 100vw`;
    },
    preload,
    loading = preload ? "eager" : "lazy",
    decoding = "async",
    attributes = {},
    layout = "constrained",
    placeholder = "blurred",
    breakpoints,
    objectFit = "cover",
    objectPosition = "50% 50%",
    backgroundSize = "cover",
    backgroundPosition = "50% 50%",
    format = type === "Img" ? undefined : ["avif", "webp"],
    fallbackFormat,
    includeSourceFormat = true,
    formatOptions = {
      tracedSVG: {
        function: "trace",
      },
    },
    fadeInTransition = true,
    artDirectives,
    ...transformConfigs
  } = resolvedProps;

  // prettier-ignore
  const allProps = {
    src, alt, tag, content, sizes, preload, loading, decoding, attributes, layout, placeholder,
    breakpoints, objectFit, objectPosition, backgroundSize, backgroundPosition, format,
    fallbackFormat, includeSourceFormat, formatOptions, fadeInTransition, artDirectives,
    ...transformConfigs,
  };

  const filteredProps = filterConfigs(
    type,
    allProps,
    SupportedProperties[type],
    { warn: false }
  );

  return {
    filteredProps,
    transformConfigs,
  };
}

// @ts-check

function getBackgroundStyles(
  images,
  className,
  objectFit,
  objectPosition,
  fadeInTransition,
  { isImg = false, isBackgroundPicture = false, containerClassName = "" } = {}
) {
  const sourcesWithFallback = images.filter(({ fallback }) => fallback);

  if (sourcesWithFallback.length === 0) return "";

  const staticStyles = !fadeInTransition
    ? ""
    : `
    ${
      isBackgroundPicture
        ? `
            .${containerClassName} * {
              z-index: 1;
              position: relative;
            }
          `
        : ""
    }

    .${className} {
      --opacity: 1;
      --z-index: 0;
    }

    ${
      !isBackgroundPicture
        ? `
            .${className} img {
              z-index: 1;
              position: relative;
            }
          `
        : ""
    }

    .${className}::after {
      inset: 0;
      content: "";
      left: 0;
      width: 100%;
      height: 100%;
      position: absolute;
      pointer-events: none;
      transition: opacity ${
        typeof fadeInTransition !== "object"
          ? "1s"
          : (() => {
              const {
                delay = "0s",
                duration = "1s",
                timingFunction = "ease",
              } = fadeInTransition;

              return `${duration} ${timingFunction} ${delay}`;
            })()
      };
      opacity: var(--opacity);
      z-index: var(--z-index);
    }
  `;

  const dynamicStyles = images
    .map(({ media, fallback, object }) => {
      const elementSelector = className + (!isImg ? " img" : ""),
        backgroundElementSelector =
          className + (fadeInTransition ? "::after" : "");

      const style = `
        .${elementSelector} {
          object-fit: ${object?.fit || objectFit};
          object-position: ${object?.position || objectPosition};
        }

        .${backgroundElementSelector} {
          background-size: ${object?.fit || objectFit};
          background-image: url("${encodeURI(fallback)}");
          background-position: ${object?.position || objectPosition};
        }
      `;

      return media ? `@media ${media} { ${style} }` : style;
    })
    .reverse();

  const backgroundStyles = [staticStyles, ...dynamicStyles].join("");

  return backgroundStyles;
}

// @ts-check

async function renderImg(props) {
  const type = "Img";

  const { filteredProps, transformConfigs } = getFilteredProps(type, props);

  const {
    src,
    alt,
    sizes,
    preload,
    loading,
    decoding,
    attributes,
    layout,
    breakpoints,
    placeholder,
    objectFit,
    objectPosition,
    format,
    formatOptions,
  } = filteredProps;

  const artDirectives = [],
    fallbackFormat = format,
    fadeInTransition = false,
    includeSourceFormat = false;

  const {
    img: imgAttributes = {},
    link: linkAttributes = {},
    style: styleAttributes = {},
  } = attributes;

  const { uuid, images } = await getImage({
    src,
    type,
    sizes,
    format,
    breakpoints,
    placeholder,
    artDirectives,
    fallbackFormat,
    includeSourceFormat,
    formatOptions,
    transformConfigs,
  });

  const className = `astro-imagetools-img-${uuid}`;

  const { imagesizes } = images[images.length - 1];

  const backgroundStyles = getBackgroundStyles(
    images,
    className,
    objectFit,
    objectPosition,
    fadeInTransition,
    { isImg: true }
  );

  const style = getStyleElement({ styleAttributes, backgroundStyles });

  const link = getLinkElement({ images, preload, imagesizes, linkAttributes });

  const layoutStyles = getLayoutStyles({ layout });

  const sources = images.flatMap(({ sources, sizes, imagesizes }) =>
    sources.map(({ src, srcset }) =>
      getImgElement({
        src,
        alt,
        sizes,
        style,
        srcset,
        loading,
        decoding,
        imagesizes,
        fadeInTransition,
        layoutStyles,
        imgAttributes,
        imgClassName: className,
      })
    )
  );

  const [img] = sources;

  return { link, style, img };
}

const $$Astro$7 = createAstro();
const $$Img = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$7, $$props, $$slots);
  Astro2.self = $$Img;
  const { link, style, img } = await renderImg(Astro2.props);
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(link + style + img)}` })}`;
}, "/Users/m/Developer/website/node_modules/.pnpm/astro-imagetools@0.9.0_astro@3.3.0/node_modules/astro-imagetools/components/Img.astro", void 0);

// @ts-check

function getPictureElement({
  sources,
  className,
  layoutStyles,
  pictureAttributes,
  isBackgroundPicture = false,
}) {
  const {
    class: customClasses = "",
    style: customInlineStyles = "",
    ...restPictureAttributes
  } = pictureAttributes;

  const attributesString = getAttributesString({
    attributes: restPictureAttributes,
  });

  const classAttribute = ["astro-imagetools-picture", className, customClasses]
    .join(" ")
    .trim();

  const styleAttribute = [
    isBackgroundPicture
      ? `position: absolute; z-index: 0; width: 100%; height: 100%; display: inline-block;`
      : `position: relative; display: inline-block;`,
    customInlineStyles + (customInlineStyles.endsWith(";") ? "" : ";"),
    layoutStyles,
  ]
    .join(" ")
    .trim();

  const pictureElement = `<picture
    ${attributesString}
    class="${classAttribute}"
    style="${styleAttribute}"
    >${sources.join("\n")}
  </picture>`;

  return pictureElement;
}

// @ts-check

async function renderPicture(props) {
  const type = "Picture";

  const { filteredProps, transformConfigs } = getFilteredProps(type, props);

  const {
    src,
    alt,
    sizes,
    preload,
    loading,
    decoding,
    attributes,
    layout,
    placeholder,
    breakpoints,
    objectFit,
    objectPosition,
    format,
    fallbackFormat,
    includeSourceFormat,
    formatOptions,
    fadeInTransition,
    artDirectives,
  } = filteredProps;

  const {
    img: imgAttributes = {},
    link: linkAttributes = {},
    style: styleAttributes = {},
    picture: pictureAttributes = {},
  } = attributes;

  const { uuid, images } = await getImage({
    src,
    type,
    sizes,
    format,
    breakpoints,
    placeholder,
    fallbackFormat,
    includeSourceFormat,
    formatOptions,
    artDirectives,
    transformConfigs,
  });

  const className = `astro-imagetools-picture-${uuid}`;

  const { imagesizes } = images[images.length - 1];

  const backgroundStyles = getBackgroundStyles(
    images,
    className,
    objectFit,
    objectPosition,
    fadeInTransition
  );

  const style = getStyleElement({ styleAttributes, backgroundStyles });

  const link = getLinkElement({ images, preload, imagesizes, linkAttributes });

  const layoutStyles = getLayoutStyles({ layout });

  const sources = images.flatMap(({ media, sources, sizes, imagesizes }) =>
    sources.map(({ format, src, srcset }) =>
      src
        ? getImgElement({
            src,
            alt,
            sizes,
            style,
            srcset,
            loading,
            decoding,
            imagesizes,
            fadeInTransition,
            layoutStyles,
            imgAttributes,
          })
        : `<source
            srcset="${srcset}"
            sizes="${imagesizes}"
            width="${sizes.width}"
            height="${sizes.height}"
            type="${`image/${format}`}"
            ${media ? `media="${media}"` : ""}
          />`
    )
  );

  const picture = getPictureElement({
    sources,
    className,
    layoutStyles,
    pictureAttributes,
  });

  return { link, style, picture };
}

const $$Astro$6 = createAstro();
const $$Picture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$6, $$props, $$slots);
  Astro2.self = $$Picture;
  const { link, style, picture } = await renderPicture(Astro2.props);
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(link + style + picture)}` })}`;
}, "/Users/m/Developer/website/node_modules/.pnpm/astro-imagetools@0.9.0_astro@3.3.0/node_modules/astro-imagetools/components/Picture.astro", void 0);

// @ts-check

function getContainerElement({
  tag,
  content,
  className = "",
  containerAttributes,
  isBackgroundPicture = false,
  containerClassName = "",
}) {
  const {
    class: customClasses = "",
    style: customInlineStyles = "",
    ...restContainerAttributes
  } = containerAttributes;

  const attributesString = getAttributesString({
    attributes: restContainerAttributes,
  });

  const classAttribute = [
    isBackgroundPicture
      ? "astro-imagetools-background-picture"
      : "astro-imagetools-background-image",
    isBackgroundPicture ? containerClassName : className,
    customClasses,
  ]
    .join(" ")
    .trim();

  const styleAttribute = [
    isBackgroundPicture ? "position: relative;" : "",
    customInlineStyles + (customInlineStyles.endsWith(";") ? "" : ";"),
  ]
    .join(" ")
    .trim();

  const containerElement = `<${tag}
    ${attributesString}
    class="${classAttribute}"
    style="${styleAttribute}"
  >
    ${content}
  </${tag}>`;

  return containerElement;
}

// @ts-check

async function renderBackgroundImage(props) {
  const type = "BackgroundImage";

  const { filteredProps, transformConfigs } = getFilteredProps(type, props);

  const {
    src,
    tag,
    content,
    preload,
    attributes,
    placeholder,
    breakpoints,
    backgroundSize,
    backgroundPosition,
    format,
    fallbackFormat,
    includeSourceFormat,
    formatOptions,
    artDirectives,
  } = filteredProps;

  const {
    link: linkAttributes = {},
    style: styleAttributes = {},
    container: containerAttributes = {},
  } = attributes;

  const sizes = "";

  const { uuid, images } = await getImage({
    src,
    type,
    sizes,
    format,
    breakpoints,
    placeholder,
    artDirectives,
    fallbackFormat,
    includeSourceFormat,
    formatOptions,
    transformConfigs,
  });

  const className = `astro-imagetools-background-image-${uuid}`;

  const { imagesizes } = images[images.length - 1];

  const link = getLinkElement({ images, preload, imagesizes, linkAttributes });

  const backgroundImageStylesArray = images.map(({ media, sources }) => {
    const uuid = crypto.randomBytes(4).toString("hex").toUpperCase();

    const fallbackUrlCustomVariable = `--astro-imagetools-background-image-fallback-url${uuid}`;

    const newSources = {};

    sources.forEach(({ src, format, srcset }) => {
      const sources = srcset
        .split(", ")
        .map((source) => [
          source.slice(0, source.lastIndexOf(" ")),
          source.slice(source.lastIndexOf(" ") + 1, -1),
        ]);

      sources.forEach(([path, width]) => {
        if (!newSources[width]) {
          newSources[width] = [];
        }

        newSources[width].push({ src, format, path });
      });
    });

    const widths = Object.keys(newSources)
      .map((width) => parseInt(width))
      .reverse();

    const maxWidth = Math.max(...widths);

    const styles = widths
      .map((width) => {
        const sources = newSources[width];

        const styles = sources
          .map(
            ({ format, path }, i) =>
              `
                ${i !== sources.length - 1 ? `.${format} ` : ""}.${className} {
                  background-repeat: no-repeat;
                  background-image: url(${path}),
                    var(${fallbackUrlCustomVariable});
                  background-size: ${backgroundSize};
                  background-position: ${backgroundPosition};
                }
              `
          )
          .reverse()
          .join("");

        return width === maxWidth
          ? styles
          : `
              @media screen and (max-width: ${width}px) {
                ${styles}
              }
            `;
      })
      .join("");

    return {
      fallbackUrlCustomVariable,
      styles: media
        ? `
            @media ${media} {
              ${styles}
            }
          `
        : styles,
    };
  });

  const containerStyles = `
    .${className} {
      position: relative;
      ${images
        .map(({ fallback }, i) => {
          const fallbackUrlCustomVariable =
            backgroundImageStylesArray[i].fallbackUrlCustomVariable;

          return `${fallbackUrlCustomVariable}: url("${encodeURI(fallback)}");`;
        })
        .join("\n")}
    }
  `;

  const backgroundStyles =
    backgroundImageStylesArray.map(({ styles }) => styles).join("\n") +
    containerStyles;

  const style = getStyleElement({ styleAttributes, backgroundStyles });

  const htmlElement = getContainerElement({
    tag,
    content,
    className,
    containerAttributes,
  });

  return { link, style, htmlElement };
}

const $$Astro$5 = createAstro();
const $$BackgroundImage = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$BackgroundImage;
  const content = await Astro2.slots.render("default");
  const { link, style, htmlElement } = await renderBackgroundImage({
    content,
    ...Astro2.props
  });
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(link + style + htmlElement)}` })}`;
}, "/Users/m/Developer/website/node_modules/.pnpm/astro-imagetools@0.9.0_astro@3.3.0/node_modules/astro-imagetools/components/BackgroundImage.astro", void 0);

// @ts-check

async function renderBackgroundPicture(props) {
  const type = "BackgroundPicture";

  const { filteredProps, transformConfigs } = getFilteredProps(type, props);

  const {
    src,
    tag,
    content,
    sizes,
    preload,
    loading,
    decoding,
    attributes,
    placeholder,
    breakpoints,
    objectFit,
    objectPosition,
    format,
    fallbackFormat,
    includeSourceFormat,
    formatOptions,
    fadeInTransition,
    artDirectives,
  } = filteredProps;

  const {
    img: imgAttributes = {},
    link: linkAttributes = {},
    style: styleAttributes = {},
    picture: pictureAttributes = {},
    container: containerAttributes = {},
  } = attributes;

  const { uuid, images } = await getImage({
    src,
    type,
    sizes,
    format,
    breakpoints,
    placeholder,
    artDirectives,
    fallbackFormat,
    includeSourceFormat,
    formatOptions,
    transformConfigs,
  });

  const className = `astro-imagetools-picture-${uuid}`,
    containerClassName = `astro-imagetools-background-picture-${uuid}`;

  const { imagesizes } = images[images.length - 1];

  const backgroundStyles = getBackgroundStyles(
    images,
    className,
    objectFit,
    objectPosition,
    fadeInTransition,
    { isBackgroundPicture: true, containerClassName }
  );

  const style = getStyleElement({ styleAttributes, backgroundStyles });

  const link = getLinkElement({ images, preload, imagesizes, linkAttributes });

  const layoutStyles = getLayoutStyles({ isBackgroundImage: true });

  // Background Images shouldn't convey important information
  const alt = "";

  const sources = images.flatMap(({ media, sources, sizes, imagesizes }) =>
    sources.map(({ format, src, srcset }) =>
      src
        ? getImgElement({
            src,
            alt,
            sizes,
            style,
            srcset,
            loading,
            decoding,
            imagesizes,
            fadeInTransition,
            layoutStyles,
            imgAttributes,
          })
        : `<source
            srcset="${srcset}"
            sizes="${imagesizes}"
            width="${sizes.width}"
            height="${sizes.height}"
            type="${`image/${format}`}"
            ${media ? `media="${media}"` : ""}
          />`
    )
  );

  const picture = getPictureElement({
    sources,
    className,
    layoutStyles,
    pictureAttributes,
    isBackgroundPicture: true,
  });

  const htmlElement = getContainerElement({
    tag,
    content: picture + content,
    containerAttributes,
    isBackgroundPicture: true,
    containerClassName,
  });

  return { link, style, htmlElement };
}

const $$Astro$4 = createAstro();
const $$BackgroundPicture = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$BackgroundPicture;
  const content = await Astro2.slots.render("default");
  const { link, style, htmlElement } = await renderBackgroundPicture({
    content,
    ...Astro2.props
  });
  return renderTemplate`${renderComponent($$result, "Fragment", Fragment, {}, { "default": ($$result2) => renderTemplate`${unescapeHTML(link + style + htmlElement)}` })}`;
}, "/Users/m/Developer/website/node_modules/.pnpm/astro-imagetools@0.9.0_astro@3.3.0/node_modules/astro-imagetools/components/BackgroundPicture.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(raw || cooked.slice()) }));
var _a;
const $$Astro$3 = createAstro();
const $$ImageSupportDetection = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$ImageSupportDetection;
  return renderTemplate(_a || (_a = __template(['<!-- prettier-ignore --><script>\nconst{classList:e}=document.documentElement,A=e.add.bind(e);A("jpeg");A("png");const g=(B,d)=>{const a=new Image;a.src=`data:image/${B};base64,${d}`,a.onload=A(B)};g("webp","UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==");g("avif","AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=");\n<\/script>'], ['<!-- prettier-ignore --><script>\nconst{classList:e}=document.documentElement,A=e.add.bind(e);A("jpeg");A("png");const g=(B,d)=>{const a=new Image;a.src=\\`data:image/\\${B};base64,\\${d}\\`,a.onload=A(B)};g("webp","UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==");g("avif","AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgANogQEAwgMg8f8D///8WfhwB8+ErK42A=");\n<\/script>'])));
}, "/Users/m/Developer/website/node_modules/.pnpm/astro-imagetools@0.9.0_astro@3.3.0/node_modules/astro-imagetools/components/ImageSupportDetection.astro", void 0);

const $$Astro$2 = createAstro();
const $$ProjectCard = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ProjectCard;
  const { proj } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(proj.link, "href")} target="_blank" class="max-w-xl rounded-md border border-neutral-800 p-4 transition hover:bg-neutral-800"><!--LINK PATH: public/images -->${renderComponent($$result, "Img", $$Img, { "src": `public/images/${proj.img_link}`, "alt": proj.name })}<div class="py-2"></div><div class="text-md text-xl flex items-center gap-1 text-neutral-300">${proj.name}</div><div class="py-1"></div><div class="text-sm text-neutral-400">${proj.desc}</div></a>`;
}, "/Users/m/Developer/website/src/components/projects/ProjectCard.astro", void 0);

const $$Astro$1 = createAstro();
const $$ProjectList = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$ProjectList;
  return renderTemplate`${maybeRenderHead()}<div><div class="text-2xl text-neutral-200">Projects</div><div class="py-2"></div><div class="flex flex-col gap-5">${projectsData.map((proj, _) => {
    return renderTemplate`${renderComponent($$result, "ProjectCard", $$ProjectCard, { "proj": proj })}`;
  })}</div></div>`;
}, "/Users/m/Developer/website/src/components/projects/ProjectList.astro", void 0);

const $$Astro = createAstro();
const $$Projects = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Projects;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "jingxiangmo.com - projects" }, { "default": ($$result2) => renderTemplate`${renderComponent($$result2, "ViewTransitions", $$ViewTransitions, {})}${renderComponent($$result2, "ProjectList", $$ProjectList, {})}` })}`;
}, "/Users/m/Developer/website/src/pages/projects.astro", void 0);

const $$file = "/Users/m/Developer/website/src/pages/projects.astro";
const $$url = "/projects";

const projects = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Projects,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { sharp as a, fsCachePath as f, getSrcPath as g, projects as p, supportedImageTypes as s };

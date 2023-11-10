import path, { resolve } from 'node:path';
import objectHash from 'object-hash';
import fs from 'node:fs';
import 'node:stream';
import { fileURLToPath } from 'node:url';
import { f as fsCachePath, s as supportedImageTypes, g as getSrcPath, a as sharp } from './pages/projects_b1494bed.mjs';
import 'node:crypto';
import './astro_2fab05a7.mjs';
import './pages/index_30827417.mjs';
/* empty css                          */import './astro-assets-services_c7027916.mjs';
import 'node:util';
import 'potrace';
import 'find-cache-dir';

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const intToChar = new Uint8Array(64); // 64 possible chars.
const charToInt = new Uint8Array(128); // z is 122 in ASCII
for (let i = 0; i < chars.length; i++) {
    const c = chars.charCodeAt(i);
    intToChar[i] = c;
    charToInt[c] = i;
}

// @ts-check

async function getCachedBuffer(hash, image) {
  const cacheFilePath = fsCachePath + hash;

  if (fs.existsSync(cacheFilePath)) {
    return fs.promises.readFile(cacheFilePath);
  }

  const buffer = await image.clone().toBuffer();

  await fs.promises.writeFile(cacheFilePath, buffer);

  return buffer;
}

// @ts-check

if (!globalThis.astroImageToolsStore)
  globalThis.astroImageToolsStore = new Map();

const store = globalThis.astroImageToolsStore;

const filename = fileURLToPath(import.meta.url);

resolve(filename, "../../astroViteConfigs.js");

// @ts-check

function getConfigOptions(config, ext, imageWidth) {
  const { w, width = w, format = ext, base64, raw, inline, ...rest } = config;

  const imageFormat = format === "jpeg" ? "jpg" : format;

  const widths = width
    ? width.split(";").map((w) => parseInt(w))
    : [imageWidth];

  const extension = format === "jpg" ? "jpeg" : format;
  const type = `image/${extension}`;

  const options = {
    format: imageFormat,
    ...rest,
  };

  return {
    type,
    widths,
    options,
    extension,
    raw: typeof raw === "string",
    inline: typeof base64 === "string" || typeof inline === "string",
  };
}

function getAssetPath(base, assetFileNames, ext, width, hash) {
  const regexExecArray = /(?<=\[hash:)\d+(?=\])/g.exec(assetFileNames),
    hashLength = regexExecArray ? regexExecArray[0] : 8,
    extname = `.${ext}`,
    name = base;

  width = width + "w";
  hash = hash.slice(0, hashLength);

  const assetPath = assetFileNames
    .replace("[name]", name)
    .replace("[width]", width)
    .replace(regexExecArray ? `[hash:${hashLength}]` : "[hash]", hash)
    .replace("[ext]", ext)
    .replace("[extname]", extname);

  return assetPath;
}

// @ts-check

const { getLoadedImage, getTransformedImage } = await (sharp
  ? import('./imagetools_336545a0.mjs')
  : import('./codecs_728e8866.mjs'));

async function load(id) {
  try {
    var fileURL = new URL(`file://${id}`);
  } catch (error) {
    return null;
  }

  const { search, searchParams } = fileURL;

  id = id.replace(search, "");

  const ext = path.extname(id).slice(1);

  if (!supportedImageTypes.includes(ext)) return null;

  const { default: astroViteConfigs } = await import(
    // @ts-ignore
    './astroViteConfigs_f0b0c92e.mjs'
  );

  const { environment, projectBase, assetFileNames } = astroViteConfigs;

  const src = await getSrcPath(id);

  const rootRelativePosixSrc = path.posix.normalize(
    path.relative("", src).split(path.sep).join(path.posix.sep)
  );

  const getHash = (width) =>
    objectHash(
      { width, options, rootRelativePosixSrc },
      // @ts-ignore
      { algorithm: "sha256" }
    );

  const base =
    typeof arguments[1] === "string"
      ? arguments[1]
      : path.basename(src, path.extname(src));

  const config = Object.fromEntries(searchParams);

  const { image: loadedImage, width: imageWidth } =
    store.get(src) || store.set(src, await getLoadedImage(src, ext)).get(src);

  const { type, widths, options, extension, raw, inline } = getConfigOptions(
    config,
    ext,
    imageWidth
  );

  if (raw) {
    const testConfig = { ...config };

    delete testConfig.raw;
    delete testConfig.inline;
    delete testConfig.base64;

    if (Object.keys(testConfig).length > 0) {
      throw new Error(
        "If raw is set, no other options can be set except inline and base64"
      );
    }
  }

  if (inline) {
    if (widths.length > 1) {
      throw new Error(
        `The base64 or inline parameter can't be used with multiple widths`
      );
    }

    const [width] = widths;

    const hash = getHash(width);

    if (store.has(hash)) {
      return `export default "${store.get(hash)}"`;
    } else {
      const config = { width, ...options };

      const { image, buffer } = raw
        ? {
            image: sharp ? loadedImage : null,
            buffer: !sharp ? loadedImage.data : null,
          }
        : await getTransformedImage({
            src,
            image: loadedImage,
            config,
            type,
          });

      const dataUri = `data:${type};base64,${(
        buffer || (await getCachedBuffer(hash, image))
      ).toString("base64")}`;

      store.set(hash, dataUri);

      return `export default "${dataUri}"`;
    }
  } else {
    const sources = await Promise.all(
      widths.map(async (width) => {
        const hash = getHash(width);

        const assetPath = getAssetPath(
          base,
          assetFileNames,
          extension,
          width,
          hash
        );

        if (!store.has(assetPath)) {
          const config = { width, ...options };

          const { image, buffer } = raw
            ? {
                image: sharp && loadedImage,
                buffer: !sharp && loadedImage.data,
              }
            : await getTransformedImage({
                src,
                image: loadedImage,
                config,
                type,
              });

          const imageObject = { hash, type, image, buffer };

          store.set(assetPath, imageObject);
        }

        const modulePath =
          environment === "dev" ? assetPath : projectBase + assetPath;

        return { width, modulePath };
      })
    );

    const srcset =
      sources.length > 1
        ? sources
            .map(({ width, modulePath }) => `${modulePath} ${width}w`)
            .join(", ")
        : sources[0].modulePath;

    return `export default "${srcset}"`;
  }
}

export { load as default };

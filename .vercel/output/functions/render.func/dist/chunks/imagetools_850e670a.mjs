import { l as loadImage, a as applyTransforms, g as generateTransforms, b as builtins } from './index_c94e9f18.mjs';
import 'sharp';
import 'crypto';

// @ts-check

async function getImageDetails(path, width, height, aspect) {
  const loadedImage = loadImage(path);

  if (aspect && !width && !height) {
    if (!width && !height) {
      ({ width } = await loadedImage.metadata());
    }

    if (width) {
      height = width / aspect;
    }

    if (height) {
      width = height * aspect;
    }
  }

  const { image, metadata } = await applyTransforms(
    generateTransforms({ width, height }, builtins).transforms,
    loadedImage
  );

  const {
    width: imageWidth,
    height: imageHeight,
    format: imageFormat,
  } = metadata;

  return { image, imageWidth, imageHeight, imageFormat };
}

export { getImageDetails };

import { l as loadImage, g as generateTransforms, b as builtins, a as applyTransforms } from './index_c94e9f18.mjs';
import 'sharp';
import 'crypto';

// @ts-check

const getLoadedImage = async (src) => {
  const image = loadImage(src);

  const { width } = await image.metadata();

  return { image, width };
};

const getTransformedImage = async ({ image, config }) => {
  const { transforms } = generateTransforms(config, builtins);

  const { image: encodedImage } = await applyTransforms(
    transforms,
    image.clone()
  );

  return { image: encodedImage, buffer: null };
};

export { getLoadedImage, getTransformedImage };

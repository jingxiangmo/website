import sharp from 'sharp';
import 'crypto';

const METADATA = Symbol('image metadata');
function setMetadata(image, key, value) {
    image[METADATA] && (image[METADATA][key] = value);
}
function getMetadata(image, key) {
    var _a;
    return (_a = image[METADATA]) === null || _a === void 0 ? void 0 : _a[key];
}

const getBackground = ({ background }, image) => {
    if (typeof background !== 'string' || !background.length)
        return;
    setMetadata(image, 'background', background);
    return background;
};

const blur = (config, ctx) => {
    let blur = undefined;
    blur = config.blur ? parseFloat(config.blur) : undefined;
    blur || (blur = config.blur === 'true');
    blur || (blur = config.blur === '');
    if (!blur)
        return;
    return function blurTransform(image) {
        setMetadata(image, 'blur', blur);
        return image.blur(blur);
    };
};

const fitValues = ['cover', 'contain', 'fill', 'inside', 'outside'];
const getFit = (config, image) => {
    let fit = undefined;
    if (config.fit && fitValues.includes(config.fit)) {
        fit = config.fit;
    }
    else {
        fit = Object.keys(config).find((k) => fitValues.includes(k) && config[k] === '');
    }
    if (!fit)
        return;
    setMetadata(image, 'fit', fit);
    return fit;
};

const flatten = (config, ctx) => {
    if (config.flatten !== '' && config.flatten !== 'true')
        return;
    return function flattenTransform(image) {
        setMetadata(image, 'flatten', true);
        return image.flatten({
            background: getBackground(config, image)
        });
    };
};

const flip = ({ flip }, ctx) => {
    if (flip !== '' && flip !== 'true')
        return;
    return function flipTransform(image) {
        setMetadata(image, 'flip', true);
        return image.flip();
    };
};

const flop = ({ flop }, ctx) => {
    if (flop !== '' && flop !== 'true')
        return;
    return function flopTransform(image) {
        setMetadata(image, 'flop', true);
        return image.flop();
    };
};

const getQuality = ({ quality: _quality }, image) => {
    const quality = _quality && parseInt(_quality);
    if (!quality)
        return;
    setMetadata(image, 'quality', quality);
    return quality;
};

const getProgressive = ({ progressive }, image) => {
    if (progressive !== '' && progressive !== 'true')
        return;
    setMetadata(image, 'progressive', true);
    return true;
};

const formatValues = ['avif', 'jpg', 'jpeg', 'png', 'heif', 'heic', 'webp', 'tiff'];
const format = (config, ctx) => {
    let format = undefined;
    if (config.format && formatValues.includes(config.format)) {
        format = config.format;
    }
    else {
        format = Object.keys(config).find((k) => formatValues.includes(k) && config[k] === '');
    }
    if (!format)
        return;
    return function formatTransform(image) {
        setMetadata(image, 'format', format);
        //@ts-ignore
        return image.toFormat(format, {
            quality: getQuality(config, image),
            progressive: getProgressive(config, image)
        });
    };
};

const grayscale = ({ grayscale }) => {
    if (grayscale !== '' && grayscale !== 'true')
        return;
    return function grayscaleTransform(image) {
        setMetadata(image, 'grayscale', true);
        return image.grayscale();
    };
};

const hsb = (config) => {
    const hue = config.hue && parseInt(config.hue);
    const saturation = config.saturation && parseFloat(config.saturation);
    const brightness = config.brightness && parseFloat(config.brightness);
    if (!hue && !saturation && !brightness)
        return;
    return function hsbTransform(image) {
        setMetadata(image, 'hue', hue);
        setMetadata(image, 'saturation', saturation);
        setMetadata(image, 'brightness', brightness);
        return image.modulate({
            hue: hue || 0,
            saturation: saturation || 1,
            brightness: brightness || 1
        });
    };
};

const invert = ({ invert }) => {
    if (invert !== '' && invert !== 'true')
        return;
    return function invertTransform(image) {
        setMetadata(image, 'invert', true);
        return image.negate();
    };
};

const kernelValues = ['nearest', 'cubic', 'mitchell', 'lanczos2', 'lanczos3'];
const getKernel = ({ kernel }, image) => {
    if (kernel && kernelValues.includes(kernel)) {
        setMetadata(image, 'kernel', kernel);
        return kernel;
    }
};

const median = (config) => {
    const median = config.median ? parseInt(config.median) : undefined;
    if (!median)
        return;
    return function medianTransform(image) {
        setMetadata(image, 'median', median);
        return image.median(median);
    };
};

const normalize = ({ normalize }) => {
    if (normalize !== '' && normalize !== 'true')
        return;
    return function normalizeTransform(image) {
        setMetadata(image, 'normalize', true);
        return image.normalize();
    };
};

const positionValues = [
    'top',
    'right top',
    'right',
    'right bottom',
    'bottom',
    'left bottom',
    'left',
    'left top',
    'north',
    'northeast',
    'east',
    'southeast',
    'south',
    'southwest',
    'west',
    'northwest',
    'center',
    'centre',
    'entropy',
    'attention'
];
const positionShorthands = [
    'top',
    'right top',
    'right',
    'right bottom',
    'bottom',
    'left bottom',
    'left',
    'left top'
];
const getPosition = (config, image) => {
    let position = undefined;
    if (config.position && positionValues.includes(config.position)) {
        position = config.position;
    }
    else {
        position = Object.keys(config).find((k) => positionShorthands.includes(k) && config[k] === '');
    }
    if (!position)
        return;
    setMetadata(image, 'position', position);
    return position;
};

/**
 * This function parses a user provided aspect-ratio string into a float.
 * Valid syntaxes are `16:9` or `1.777`
 * @param aspect
 * @returns
 */
function parseAspect(aspect) {
    const parts = aspect.split(':');
    let aspectRatio;
    if (parts.length === 1) {
        // the string was a float
        aspectRatio = parseFloat(parts[0]);
    }
    else if (parts.length === 2) {
        // the string was a colon delimited aspect ratio
        const [width, height] = parts.map((str) => parseInt(str));
        if (!width || !height)
            return undefined;
        aspectRatio = width / height;
    }
    if (!aspectRatio || aspectRatio <= 0)
        return undefined;
    return aspectRatio;
}
const resize = (config) => {
    const width = parseInt(config.width || config.w || '');
    const height = parseInt(config.height || config.h || '');
    const aspect = parseAspect(config.aspect || config.ar || '');
    if (!width && !height && !aspect)
        return;
    return function resizeTransform(image) {
        // calculate finalWidth & finalHeight
        const originalWidth = getMetadata(image, 'width');
        const originalHeight = getMetadata(image, 'height');
        const originalAspect = originalWidth / originalHeight;
        let finalWidth = width, finalHeight = height;
        if (aspect && !width && !height) {
            // only aspect was given, need to calculate which dimension to crop
            if (aspect > originalAspect) {
                finalHeight = originalWidth / aspect;
                finalWidth = originalWidth;
            }
            else {
                finalHeight = originalHeight;
                finalWidth = originalHeight / aspect;
            }
        }
        else if (!height) {
            // only width was provided, need to calculate height
            finalHeight = width / (aspect || originalAspect);
        }
        else if (!width) {
            /* only height was provided, need to calculate width */
            finalWidth = height * (aspect || originalAspect);
        }
        setMetadata(image, 'height', finalHeight);
        setMetadata(image, 'width', finalWidth);
        setMetadata(image, 'aspect', aspect || originalAspect);
        return image.resize({
            width: Math.round(finalWidth) || undefined,
            height: Math.round(finalHeight) || undefined,
            fit: getFit(config, image),
            position: getPosition(config, image),
            kernel: getKernel(config, image),
            background: getBackground(config, image)
        });
    };
};

const rotate = (config) => {
    const rotate = config.rotate && parseInt(config.rotate);
    if (!rotate)
        return;
    return function rotateTransform(image) {
        setMetadata(image, 'rotate', rotate);
        return image.rotate(rotate, {
            background: getBackground(config, image)
        });
    };
};

const tint = ({ tint }) => {
    if (typeof tint !== 'string' || !tint.length)
        return;
    return function tintTransform(image) {
        setMetadata(image, 'tint', '#' + tint);
        return image.tint('#' + tint);
    };
};

const builtins = [
    blur,
    flatten,
    flip,
    flop,
    format,
    grayscale,
    hsb,
    invert,
    median,
    normalize,
    resize,
    rotate,
    tint
];

function loadImage(path) {
    return sharp(path);
}

function generateTransforms(config, factories) {
    const transforms = [];
    const parametersUsed = new Set();
    const warnings = [];
    const context = {
        useParam: (k) => parametersUsed.add(k),
        warn: (m) => warnings.push(m)
    };
    for (const directive of factories) {
        const transform = directive(config, context);
        if (typeof transform === 'function')
            transforms.push(transform);
    }
    return {
        transforms,
        parametersUsed,
        warnings
    };
}

async function applyTransforms(transforms, image, removeMetadata = true) {
    image[METADATA] = await image.metadata();
    if (removeMetadata) {
        // delete the private metadata
        delete image[METADATA].exif;
        delete image[METADATA].iptc;
        delete image[METADATA].xmp;
        delete image[METADATA].tifftagPhotoshop;
        delete image[METADATA].icc;
    }
    else {
        image.withMetadata();
    }
    for (const transform of transforms) {
        image = await transform(image);
    }
    return {
        image,
        metadata: image[METADATA]
    };
}

export { applyTransforms as a, builtins as b, generateTransforms as g, loadImage as l };

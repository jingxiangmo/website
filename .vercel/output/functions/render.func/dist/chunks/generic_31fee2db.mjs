export { renderers } from '../renderers.mjs';
export { onRequest } from '../_empty-middleware.mjs';
import 'react';
import 'react-dom/server';
import './astro_2fab05a7.mjs';

const page = () => import('./pages/generic_a2df4532.mjs').then(n => n.a);

export { page };

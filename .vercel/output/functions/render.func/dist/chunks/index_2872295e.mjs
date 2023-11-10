export { renderers } from '../renderers.mjs';
export { onRequest } from '../_empty-middleware.mjs';
import 'react';
import 'react-dom/server';
import './astro_2fab05a7.mjs';

const page = () => import('./pages/index_30827417.mjs').then(n => n.i);

export { page };

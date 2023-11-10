export { renderers } from '../renderers.mjs';
export { onRequest } from '../_empty-middleware.mjs';
import 'react';
import 'react-dom/server';
import './astro_2fab05a7.mjs';

const page = () => import('./pages/projects_b1494bed.mjs').then(n => n.p);

export { page };

/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

import { createRoot } from 'react-dom/client';

export const replaceHydrateFunction = () => (element, container) => {
  const root = createRoot(container);
  root.render(element);
};

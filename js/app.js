/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint-env browser */

import Items from './collections/items';
import AppView from './views/appView';

const items = new Items();
new AppView({
  el: document.querySelector('app'),
  collection: items,
});

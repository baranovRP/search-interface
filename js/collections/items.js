/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint-env browser */

import Backbone from 'backbone';

import Item from '../models/item';

export default class Items extends Backbone.Collection {

  constructor(options) {
    super(options);
    this.model = Item;
  }

  parse(data) {
    this.data = data;
    return data.Search;
  }
}

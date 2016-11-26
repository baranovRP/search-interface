/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint-env browser */

import Backbone from 'backbone';

import Item from '../models/item';

export default class Items extends Backbone.Collection {

  constructor(options) {
    super(options);
    this.model = Item;
    this.apiEndpoint = 'http://www.omdbapi.com';
    this.page = 0;
  }

  parse(data) {
    this.data = data;
    return data.Search;
  }
}

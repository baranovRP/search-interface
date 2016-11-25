/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint-env browser */

import $ from 'jquery';
import sortable from 'jquery-ui-bundle';
import _ from 'underscore';
import Backbone from 'backbone';

import ItemView from './itemView';

export default class ItemsView extends Backbone.View {

  constructor(options) {
    super(Object.assign(
      {
        tagName: 'ul',
        className: 'result-items',
        events: {},
      },
      options
    ));
  }

  render() {
    this.collection.forEach((item) => {
      const itemView = new ItemView({ model: item });
      this.$el.append(itemView.render().el);
    });
    return this;
  }
}

/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint-env browser */

import $ from 'jquery';
import sortable from 'jquery-ui-bundle';
import Backbone from 'backbone';

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
    this.$el.html('<li class="loading  invisible">Loading...</li>');
    return this;
  }
}

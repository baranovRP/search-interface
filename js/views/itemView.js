/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint-env browser */

import $ from 'jquery';
import sortable from 'jquery-ui-bundle';
import _ from 'underscore';
import Backbone from 'backbone';

export default class ItemView extends Backbone.View {

  constructor(options) {
    super(Object.assign(
      {
        tagName: 'li',
        className: 'result-item',
        events: {},
      },
      options
    ));
    this.template = _.template($('#result-template').html());
  }

  render() {
    this.$el.empty();
    this.defaultPoster();
    this.$el.html(this.template(this.model.toJSON()));
    return this;
  }

  defaultPoster() {
    if (this.model.get('Poster') === 'N/A') {
      this.model.set({ Poster: 'http://placeholder.pics/svg/300x450' });
    }
  }
}

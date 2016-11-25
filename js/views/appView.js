/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint-env browser */

import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import ItemsView from './itemsView';

let scrollTimeout;

export default class AppView extends Backbone.View {

  constructor(options) {
    super(Object.assign(
      {
        events: {
          'click .search_button': 'fetchData',
          'scroll .search-result': 'checkScroll',
          keypress: 'sendRequest',
        },
      },
      options
    ));

    this.collection.on('update', () => this.render());

    this.$input = this.$('.input_name');
    this.$result = this.$('.search-result');
    this.$loading = this.$('.loading');
    this.$apiEndpoint = 'http://www.omdbapi.com';

    this.render();
  }

  render() {
    if (this.collection.length) {
      const itemsView = new ItemsView({ collection: this.collection });
      this.$result.append(itemsView.render().el);
    }
  }

  fetchData() {
    this.$result.empty();
    this.$loading.removeClass('invisible');
    this.$input._val = this.$input.val();
    if (this.$input._val === '') {
      return;
    }
    this.collection.url = `${this.$apiEndpoint}/?type=movie&s=${this.$input._val}`;
    // this.collection.fetch();
    this.collection.fetch().then(() => this.$loading.addClass('invisible'));
    this.clearInputFields();
  }

  sendRequest(e) {
    if (e.keyCode !== 13) return;
    this.fetchData();
  }

  clearInputFields() {
    this.$input.val('');
  }

  checkScroll(e) {
    console.log(e);
    e.preventDefault();
    const delayMs = 100;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(this.preloadEl(), delayMs);
  }

  preloadEl() {
    console.log('preloadEl');
  }
}

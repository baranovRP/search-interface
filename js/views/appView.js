/* eslint no-use-before-define: ["error", { "functions": false }] */
/* eslint no-global-assign: "warn" */
/* eslint-env browser */

import $ from 'jquery';
import _ from 'underscore';
import Backbone from 'backbone';

import ItemView from './itemView';
import ItemsView from './itemsView';

const limit = 100;
let scrollTimeout;

export default class AppView extends Backbone.View {

  constructor(options) {
    super(Object.assign(
      {
        events: {
          'click .search_button': 'sendRequest',
          keypress: 'sendRequest',
        },
      },
      options
    ));

    this.collection.on('update', () => this.addBundle());
    this.itemsView = new ItemsView({ collection: this.collection });

    this.$input = this.$('.input_name');
    this.$result = this.$('.search-result');

    this.render();
    this.$result.on('scroll', _.bind(this.checkScroll, this));
    this.shift = this.$result.prop('scrollHeight') - this.$result.prop('scrollTop');
  }

  render() {
    const $last = this.$result.children('.loading');
    this.itemsView.render().$el.insertBefore($last);
  }

  addBundle() {
    const self = this;
    if (this.collection.length) {
      this.collection.forEach((item) => {
        const itemView = new ItemView({ model: item });
        self.itemsView.$el.append(itemView.render().$el);
      });
    }
  }

  fetchData() {
    const $loading = this.$result.children('.loading');
    const self = this;
    if (this.collection.isLoading) return;
    if (!this.collection.query && !this.$input.val()) return;
    if (this.$input.val() !== '') this.collection.query = this.$input.val();
    this.$input.val('');

    $loading.removeClass('invisible');
    this.collection.isLoading = true;

    this.collection.url = `${this.collection.apiEndpoint}/?type=movie&s=${this.collection.query}&page=${this.collection.page}`;
    this.collection.fetch().then(() => {
      console.log('total: ' + self.collection.data.totalResults);
      if (self.collection.data.Error) {
        $loading.text(`${self.collection.data.Error}`);
        $loading.addClass('error');
        self.collection.isLoading = true;
      } else {
        self.collection.isLoading = false;
        if (self.isMoviesPresent(self.collection.data)) self.collection.page++;
        $loading.addClass('invisible');
        if (self.isMoviesPresent(self.collection.data) && self.uploadIfRequired()) self.fetchData();
      }
    });
  }

  sendRequest(e) {
    if (e.type !== 'click' && e.keyCode !== 13) return;
    if (this.collection.length) {
      const length = this.collection.length;
      for (let i = length - 1; i + 1 > 0; i--) {
        this.collection.at(i).destroy();
      }
    }
    this.collection.page = 1;
    if (this.collection.query) this.collection.query = '';
    this.$result.children('.loading').addClass('invisible');
    this.$result.children('.loading').text('Loading...');
    this.$result.children('.result-items').empty();
    this.collection.isLoading = false;
    this.fetchData();
  }

  checkScroll(e) {
    e.preventDefault();
    const delayMs = 100;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(this.preloadEl(), delayMs);
  }

  preloadEl() {
    const data = this.collection.data;
    console.log('collection.isLoading: '
      + this.collection.isLoading
      + ', page: ' + this.collection.page);
    if (data.Error
      || this.collection.isLoading
      || !this.isMoviesPresent(data)
      || this.isFetchNotRequired()) return;
    this.fetchData();
  }

  isFetchNotRequired() {
    const scrollHeight = this.$result.prop('scrollHeight') - this.shift;
    return (scrollHeight - 50) > this.$result.prop('scrollTop');
  }

  isMoviesPresent(data) {
    const shownPosters = document.querySelector('.result-items').childElementCount;
    return data.totalResults > shownPosters
      && this.collection.page < limit;
  }

  uploadIfRequired() {
    return this.$result.prop('scrollHeight') <= this.$result.prop('clientHeight');
  }
}

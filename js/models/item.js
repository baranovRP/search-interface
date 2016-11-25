/* eslint no-use-before-define: ['error', { 'functions': false }] */
/* eslint no-global-assign: 'warn' */
/* eslint-env browser */

import Backbone from 'backbone';

export default class Item extends Backbone.Model {

  defaults() {
    return {
      Title: 'no titles',
      Year: '0000',
      imdbID: 'tt000000',
      Type: 'none',
      Poster: '',
    };
  }

  initialize() {
    this.on('invalid', (model, error) => {
      console.log(error);
    });
  }
}

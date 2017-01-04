import Ember from 'ember';

/* global d3 */

export default Ember.Helper.helper(([value]) => d3.format('.0%')(value));
import Ember from 'ember';

export default Ember.Helper.helper(([value]) => value ? Math.round(value).toLocaleString() : 'NaN');
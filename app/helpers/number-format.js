import Ember from 'ember';

export default Ember.Helper.helper(([value]) => value ? value.toLocaleString() : 'NaN');
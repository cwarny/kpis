import Ember from 'ember';

const { computed, get, getProperties, setProperties } = Ember;
const { oneWay } = computed;

/* global d3 */

export default Ember.Component.extend({
	tagName: 'path',
	attributeBindings: ['d'],

	d: computed('cell', function() {
		let cell = get(this, 'cell');
		return cell ? `M${cell.join('L')}Z` : null;
	}),

	mouseEnter() {
		get(this, 'onhighlight')(get(this, 'cell.data.model'));
	},

	mouseLeave() {
		get(this, 'ondehighlight')(get(this, 'cell.data.model'));
	}
});
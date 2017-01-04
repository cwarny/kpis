import Ember from 'ember';

const { computed, get, getProperties, setProperties } = Ember;
const { oneWay } = computed;

/* global d3 */

export default Ember.Component.extend({
	tagName: 'path',
	attributeBindings: ['d', 'fill', 'style'],
	classNames: ['country'],
	classNameBindings: ['highlighted'],

	highlighted: oneWay('country.highlighted'),
	selected: oneWay('country.selected'),
	color: oneWay('country.color'),
	code: oneWay('country.code'),

	fill: computed('selected', 'color', function() {
		if (get(this, 'selected')) return get(this, 'color');
		return '#cccccc';
	}),

	style: computed('code', function() {
		if (get(this, 'code')) return 'cursor:pointer';
		return 'cursor:no-drop';
	}),

	mouseEnter() {
		get(this, 'onhighlight')(get(this, 'country'));
	},

	mouseLeave() {
		get(this, 'ondehighlight')(get(this, 'country'));
	},

	click() {
		if (get(this, 'code')) {
			if (get(this, 'selected')) {
				get(this, 'ondeselect')(get(this, 'country'));
			} else {
				get(this, 'onselect')(get(this, 'country'));
			}
		}
	}
});
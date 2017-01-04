import Ember from 'ember';

const { computed, get, getProperties, setProperties } = Ember;
const { oneWay } = computed;

/* global d3 */

export default Ember.Component.extend({
	tagName: 'span',
	classNames: ['tag'],
	classNameBindings: ['highlighted'],
	attributeBindings: ['style'],

	color: oneWay('country.color'),
	highlighted: oneWay('country.highlighted'),

	style: computed(function() {
		return `background-color:${get(this,'color')}`;
	}),

	mouseEnter() {
		get(this, 'onhighlight')(get(this, 'country'));
	},

	mouseLeave() {
		get(this, 'ondehighlight')(get(this, 'country'));
	}
});
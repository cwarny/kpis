import Ember from 'ember';

const { computed } = Ember;

export default Ember.Component.extend({
	classNames: ['btn-group'],
	classNameBindings: ['buttonSize'],
	attributeBindings: ['data-toggle'],
	size: 'sm',
	buttonSize: computed('size', function() {
		return `btn-group-${this.get('size')}`;
	}),
	'data-toggle': 'buttons'
});
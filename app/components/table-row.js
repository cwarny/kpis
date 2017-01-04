import Ember from 'ember';

const { computed, get, getProperties, setProperties } = Ember;
const { oneWay } = computed;

export default Ember.Component.extend({
	tagName: 'tr',
	classNameBindings: ['highlighted', 'selected'],
	classNames: ['clickable'],
	
	highlighted: oneWay('country.highlighted'),
	selected: oneWay('country.selected'),

	klass: computed('highlighted', 'selected', function() {
		if (get(this, 'selected')) {
			return 'selected';
		} else {
			if (get(this, 'highlighted')) return 'active';
		}
	}),

	subscribersGrowth: oneWay('country.avgSubscribers'),
	
	mauFreeGrowth: computed('country', function() {
		return get(this, 'country.avgMau').free;
	}),
	dauFreeGrowth: computed('country', function() {
		return get(this, 'country.avgDau').free;
	}),
	hoursFreeGrowth: computed('country', function() {
		return get(this, 'country.avgHours').free;
	}),

	avgMauPaid: computed('country', function() {
		return get(this, 'country.avgMau').paid;
	}),
	avgDauPaid: computed('country', function() {
		return get(this, 'country.avgDau').paid;
	}),
	avgHoursPaid: computed('country', function() {
		return get(this, 'country.avgHours').paid;
	}),

	mouseEnter() {
		get(this, 'onhighlight')(get(this, 'country'));
	},

	mouseLeave() {
		get(this, 'ondehighlight')(get(this, 'country'));
	},

	click() {
		if (get(this, 'selected')) {
			get(this, 'ondeselect')(get(this, 'country'));
		} else {
			get(this, 'onselect')(get(this, 'country'));
		}
	}
});
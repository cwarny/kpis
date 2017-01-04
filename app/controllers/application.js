import Ember from 'ember';

/* global d3 */

let { computed, get, set, A, getProperties, setProperties, observer } = Ember;
let { filter, setDiff } = computed;

export default Ember.Controller.extend({
	queryParams: ['subscribersDimension','activeUserProduct','activeUserTimeWindow','contentHoursProduct','hoursDimension','selectedCodes','sortBy','sortDir','subscribersSort','mauPaidSort','mauFreeSort','dauPaidSort','dauFreeSort','hoursPaidSort','hoursFreeSort'],

	countries: filter('model.[]', function(d) {
		return get(d, 'code');
	}),

	selected: computed({
		get() {
			return A([]);
		},
		set(key, value) {
			return value;
		}
	}),

	sortBy: 'name',
	sortDir: 'asc',

	subscribersSort: 'value',
	mauPaidSort: 'value',
	mauFreeSort: 'value',
	dauPaidSort: 'value',
	dauFreeSort: 'value',
	hoursPaidSort: 'value',
	hoursFreeSort: 'value',

	selectedCodes: computed('selected.[]', {
		get() {
			return get(this,'selected').mapBy('code');
		},
		set(key, value) {
			return value;
		}
	}),

	nonselected: setDiff('countries', 'selected'),

	countrySelection: computed('nonselected.[]', function() {
		let regions = {};
		get(this,'nonselected').forEach(d => {
			let r = get(d,'region');
			if (_.hasIn(regions,r)) regions[r].push(d);
			else regions[r] = [d];
		});
		return _.toPairs(regions).map(d => ({
			groupName: d[0],
			options: d[1]
		}));
	}),

	highlighted: null,

	subscribersDimensions: ['total', 'share of active users'],
	hoursDimensions: ['total', 'per user'],

	products: ['paid', 'free'],
	timeWindows: ['monthly', 'daily'],

	subscribersDimension: 'total',
	activeUserProduct: 'paid',
	activeUserTimeWindow: 'monthly',
	contentHoursProduct: 'paid',
	hoursDimension: 'total',

	subscribers: computed('selected.[]', 'subscribersDimension', function() {
		let { selected, subscribersDimension } = getProperties(this, 'selected', 'subscribersDimension');
		switch(subscribersDimension) {
			case 'share active last month':
				return selected.map(d => ({ data: get(d,'shareOfSubscribersActiveLastMonth'), model: d }));
			case 'share of active users':
				return selected.map(d => ({ data: get(d,'shareOfPayingUsers'), model: d }));
			default:
				return selected.map(d => ({ data: get(d,'subscribers'), model: d }));
		};
	}),
	activeUsers: computed('selected.[]', 'activeUserProduct', 'activeUserTimeWindow', function() {
		let { selected, activeUserProduct, activeUserTimeWindow } = getProperties(this, 'selected', 'activeUserProduct', 'activeUserTimeWindow');
		switch(activeUserTimeWindow) {
			case 'monthly':
				switch(activeUserProduct) {
					case 'paid':
						return selected.map(d => ({ data: get(d,'mau').paid, model: d }));
					default:
						return selected.map(d => ({ data: get(d,'mau').free, model: d }));
				};
			default:
				switch(activeUserProduct) {
					case 'paid':
						return selected.map(d => ({ data: get(d,'dau').paid, model: d }));
					default:
						return selected.map(d => ({ data: get(d,'dau').free, model: d }));
				};
		}
	}),
	contentHours: computed('selected.[]', 'contentHoursProduct', 'hoursDimension', function() {
		let { selected, contentHoursProduct, hoursDimension } = getProperties(this, 'selected', 'contentHoursProduct', 'hoursDimension');
		switch(hoursDimension) {
			case 'per user':
				switch(contentHoursProduct) {
					case 'paid':
						return selected.map(d => ({ data: get(d,'hoursPerActiveUser').paid, model: d }));
					default:
						return selected.map(d => ({ data: get(d,'hoursPerActiveUser').free, model: d }));
				};
			default:
				switch(contentHoursProduct) {
					case 'paid':
						return selected.map(d => ({ data: get(d,'hours').paid, model: d }));
					default:
						return selected.map(d => ({ data: get(d,'hours').free, model: d }));
				};
		}
	}),

	actions: {
		highlight(country) {
			set(this, 'highlighted', country);
			set(country, 'highlighted', true);
		},
		dehighlight(country) {
			set(this, 'highlighted', null);
			set(country, 'highlighted', false);
		},
		select(country) {
			get(this, 'selected').pushObject(country);
			set(country, 'selected', true);
		},
		deselect(country) {
			get(this, 'selected').removeObject(country);
			setProperties(country, {
				selected: false,
				highlighted: false
			});
		},
		sort(by) {
			let { sortBy, sortDir } = getProperties(this, 'sortBy', 'sortDir');
			if (sortBy === by) {
				set(this, 'sortDir', sortDir === 'asc' ? 'desc' : 'asc');
			} else {
				setProperties(this, {
					sortBy: by,
					sortDir: 'desc'
				});
			}
		},
		toggleSort(which) {
			set(this, which + 'Sort', get(this, which + 'Sort') === 'value' ? 'growth' : 'value');
		}
	}
});
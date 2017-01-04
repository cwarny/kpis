import Ember from 'ember';

/* global _ */

const { computed, get, getProperties, set, setProperties, observer } = Ember;
const { sort, equal } = computed;

export default Ember.Component.extend({
	sort: computed('sortBy', 'sortDir', function() {
		let { sortBy, sortDir } = getProperties(this, 'sortBy', 'sortDir');
		return [`${sortBy}:${sortDir}`];
	}),

	subscribersSortProp: computed('subscribersSort', function() { return get(this,'subscribersSort') === 'value' ? 'lastSubscribers' : 'subscribersGrowth' }),
	mauFreeSortProp: computed('mauFreeSort', function() { return get(this,'mauFreeSort') === 'value' ? 'lastMau.free' : 'mauGrowth.free' }),
	mauPaidSortProp: computed('mauPaidSort', function() { return get(this,'mauPaidSort') === 'value' ? 'lastMau.paid' : 'mauGrowth.paid' }),
	dauFreeSortProp: computed('dauFreeSort', function() { return get(this,'dauFreeSort') === 'value' ? 'lastDau.free' : 'dauGrowth.free' }),
	dauPaidSortProp: computed('dauPaidSort', function() { return get(this,'dauPaidSort') === 'value' ? 'lastDau.paid' : 'dauGrowth.paid' }),
	hoursFreeSortProp: computed('hoursFreeSort', function() { return get(this,'hoursFreeSort') === 'value' ? 'lastHours.free' : 'hoursGrowth.free' }),
	hoursPaidSortProp: computed('hoursPaidSort', function() { return get(this,'hoursPaidSort') === 'value' ? 'lastHours.paid' : 'hoursGrowth.paid' }),

	resultsPerPage: 10,

	sortedCountries: sort('countries', 'sort'),

	rows: computed('sortedCountries.[]', 'page', 'resultsPerPage', function() {
		let { sortedCountries, page, resultsPerPage } = getProperties(this, 'sortedCountries', 'page', 'resultsPerPage');
		return sortedCountries ? sortedCountries.slice((page-1)*resultsPerPage, page*resultsPerPage) : null;
	}),

	firstPage: computed('page', 'resultsPerPage', {
		get() {
			let { page, resultsPerPage } = getProperties(this, 'page', 'resultsPerPage')
			return Math.floor((page-1)/5)*5+1;
		},
		set(key, value) {
			return value;
		}
	}),

	totalPages: computed('countries.[]', 'resultsPerPage', function() {
		return Math.ceil(get(this, 'countries.length')/get(this, 'resultsPerPage'));
	}),

	pages: computed('firstPage', 'totalPages', 'resultsPerPage', function() {
		let { firstPage, totalPages, resultsPerPage } = getProperties(this, 'firstPage', 'totalPages', 'resultsPerPage');
		let len = Math.min(totalPages-firstPage+1, 5);
		return _.range(firstPage, firstPage+len);
	}),

	page: 1,

	updatePage: observer('highlighted', function() {
		let { highlighted, sortedCountries, resultsPerPage } = getProperties(this,'highlighted','sortedCountries', 'resultsPerPage');
		if (highlighted) {
			let i = sortedCountries.indexOf(highlighted);
			if (i !== -1) set(this, 'page', Math.floor(i/resultsPerPage)+1);
		}
	}),

	actions: {
		incrementPage() {
			if (get(this, 'pages.lastObject') < get(this, 'totalPages')) {
				this.incrementProperty('firstPage', 5);
			} 
		},
		decrementPage() {
			if (get(this, 'pages.firstObject') > 1) {
				this.decrementProperty('firstPage', 5);
			}
		},
		setPage(p) {
			set(this, 'page', p);
		},
		sort(by) {
			get(this,'onsort')(by);
		},
		toggleSort(which) {
			get(this,'ontogglesort')(which);
		}
	}
});
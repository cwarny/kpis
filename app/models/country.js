import Ember from 'ember';
import DS from 'ember-data';

/* global _ */

const { computed, get, getProperties } = Ember;
const { attr } = DS;
const { map } = computed;

export default DS.Model.extend({
	code: attr('string'),
	color: attr('string'),
	name: attr('string'),
	region: attr('string'),
	mau: attr(),
	dau: attr(),
	subscribers: attr(),
	hours: attr(),
	geometry: attr(),

	shareOfPayingUsers: computed('mau', function() {
		let mau = get(this, 'mau');
		return _.zip(
			mau.paid,
			_.zip(mau.free, mau.paid).map(d => ({
				value: _.sumBy(d, 'value'),
				date: d[0].date
			}))
		).map(d => ({
			value: d[0].value/d[1].value,
			date: d[0].date
		}));
	}),
	hoursPerActiveUser: computed('hours', 'mau', function() {
		let { hours, mau } = getProperties(this, 'hours', 'mau');
		return {
			free: _.zip(hours.free, mau.free).map(d => ({
				value: d[0].value/d[1].value,
				date: d[0].date
			})),
			paid: _.zip(hours.paid, mau.paid).map(d => ({
				value: d[0].value/d[1].value,
				date: d[0].date
			}))
		};
	}),

	avgMau: computed('mau', function() {
		let mau = get(this, 'mau');
		return _.mapValues(mau, (it,k) => it.reduce((acc, d) => acc + d.value, 0)/mau[k].length);
	}),
	avgDau: computed('dau', function() {
		let dau = get(this, 'dau');
		return _.mapValues(dau, (it,k) => it.reduce((acc, d) => acc + d.value, 0)/dau[k].length);
	}),
	avgHours: computed('hours', function() {
		let hours = get(this, 'hours');
		return _.mapValues(hours, (it,k) => it.reduce((acc, d) => acc + d.value, 0)/hours[k].length);
	}),
	avgSubscribers: computed( 'subscribers', function() {
		let subscribers = get(this, 'subscribers');
		return subscribers.reduce((acc, d) => acc + d.value, 0)/get(subscribers, 'length');
	}),

	lastMau: computed('mau', function() {
		return _.mapValues(get(this,'mau'), arr => arr[arr.length-1].value);
	}),
	lastDau: computed('dau', function() {
		return _.mapValues(get(this,'dau'), arr => arr[arr.length-1].value);
	}),
	lastHours: computed('hours', function() {
		return _.mapValues(get(this,'hours'), arr => arr[arr.length-1].value);
	}),
	lastSubscribers: computed('subscribers', function() {
		let subscribers = get(this,'subscribers');
		return subscribers[subscribers.length-1].value;
	}),

	mauGrowth: computed('mau', function() {
		let mau = get(this, 'mau');
		return _.mapValues(mau, (it,k) => it[it.length-1].value/it[0].value-1);
	}),
	dauGrowth: computed('dau', function() {
		let dau = get(this, 'dau');
		return _.mapValues(dau, (it,k) => it[it.length-1].value/it[0].value-1);
	}),
	hoursGrowth: computed('hours', function() {
		let hours = get(this, 'hours');
		return _.mapValues(hours, (it,k) => it[it.length-1].value/it[0].value-1);
	}),
	subscribersGrowth: computed('subscribers', function() {
		let subscribers = get(this, 'subscribers');
		return subscribers[subscribers.length-1].value/subscribers[0].value-1;
	})
});
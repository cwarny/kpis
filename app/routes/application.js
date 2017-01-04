import Ember from 'ember';
import { getJSON, getCSV } from '../utils/http';

let { RSVP, get, computed, set, setProperties } = Ember;

/* global d3, _, topojson */

export default Ember.Route.extend({
	parseTime: computed(function() {
		return d3.timeParse('%m/%d/%Y');
	}),

	model: function(transition, params) {
		let parseTime = get(this, 'parseTime');

		return RSVP.all([
			getCSV('KPIsdata-Simulated.csv'),
			getCSV('wikipedia-iso-country-codes.csv'),
			getJSON('world-110m.json')
		]).then(values => {
			let color = d3.scaleOrdinal(d3.schemeCategory20)
				.domain(values[0].map(d => d.code));

			let kpis = _.mapValues(_.groupBy(values[0], 'Country'), d => ({
				code: d[0].Country,
				name: d[0]['Country Name'],
				region: d[0]['Region Name'] === 'Australia - New Zealand' ? 'Oceania' : d[0]['Region Name'],
				color: color(d[0].Country),
				mau: _.mapValues(_.groupBy(d, 'Product'), it => {
					return it.map(e => ({ date: parseTime(e['Date']), value: +e['Monthly Active Users'] }));
				}),
				dau: _.mapValues(_.groupBy(d, 'Product'), it => {
					return it.map(e => ({ date: parseTime(e['Date']), value: +e['Daily Active Users'] }));
				}),
				hours: _.mapValues(_.groupBy(d, 'Product'), it => {
					return it.map(e => ({ date: parseTime(e['Date']), value: +e['Total Content Hours'] }));
				}),
				subscribers: d.filter(e => e.Product === 'paid').map(e => ({ date: parseTime(e['Date']), value: +e.Subscribers }))
			}));

			let countryNames = _.keyBy(values[1], d => +d['Numeric code']);
			let geoFeatures = _.keyBy(topojson.feature(values[2], values[2].objects.countries).features, 'id');
			let features = _.keyBy(_.merge(geoFeatures, countryNames), 'Alpha-2 code');

			return get(this, 'store').push({
				data: _.values(_.merge(features, kpis))
					.filter(d => d.id)
					.map(d => ({
						type: 'country',
						id: d.id,
						attributes: d
					}))
			});
		});
	},

	setupController(controller, model) {
		let selected = controller.get('selectedCodes').map(code => model.findBy('code', code));
		selected.forEach(d => {
			set(d, 'selected', true);
		});
		controller.setProperties({
			selected: selected,
			model: model
		});
	}
});
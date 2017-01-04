import Ember from 'ember';

/* global d3 */

const { computed, get, getProperties, set, setProperties, on, observer } = Ember;

export default Ember.Component.extend({
	tagName: 'svg',
	attributeBindings: ['viewBox'],

	margin: { top: 10, right: 10, bottom: 20, left: 40 },
	
	width: 250,
	height: 110,
	viewBox: computed('width', 'height', function() {
		return `0 0 ${get(this, 'width')} ${get(this, 'height')}`;
	}),

	chartW: computed('margin', 'width', function() {
		let { margin, width } = getProperties(this, 'margin', 'width');
		return width - margin.left - margin.right;
	}),

	chartH: computed(function() {
		let { margin, height } = getProperties(this, 'margin', 'height');
		return height - margin.top - margin.bottom;
	}),

	x: computed('data.[]', 'chartW', function() {
		let { chartW, data } = getProperties(this, 'chartW', 'data');

		return d3.scaleTime()
			.domain([
				d3.min(data.map(d => d3.min(d.data.map(e => e.date)))), 
				d3.max(data.map(d => d3.max(d.data.map(e => e.date))))
			])
			.rangeRound([0, chartW]);
	}),

	y: computed('data.[]', 'chartH', function() {
		let { chartH, data } = getProperties(this, 'chartH', 'data');

		return d3.scaleLinear()
			.domain([0, d3.max(data.map(d => d3.max(d.data.map(e => e.value))))])
			.rangeRound([chartH, 0]);
	}),

	line: computed('x', 'y', function() {
		let { x, y } = getProperties(this, 'x', 'y');

		return d3.line()
			.x(d => x(d.date))
			.y(d => y(d.value));
	}),

	voronoi: computed('x', 'y', 'margin', 'width', 'height', function() {
		let { x, y, margin, width, height } = getProperties(this, 'x', 'y', 'margin', 'width', 'height');

		return d3.voronoi()
			.x(d => x(d.date))
			.y(d => y(d.value))
			.extent([[-1, -1], [width+1, height+1]]);
	}),

	polygons: computed('voronoi', 'data.[]', function() {
		let { voronoi, data } = getProperties(this, 'voronoi', 'data');

		return voronoi.polygons(d3.merge(data.map(d => {
			return d.data.map(e => {
				e.model = d.model;
				return e;
			});
		})));
	}),

	series: computed('line', 'data.[]', function() {
		let { line, data } = getProperties(this, 'line', 'data');

		return data.map(d => ({
			d: line(d.data),
			stroke: get(d.model, 'color'),
			model: d.model
		}));
	}),

	average: computed('line', 'data.[]', function() {
		let { line, data } = getProperties(this, 'line', 'data');

		return line(data[0].data.map((d,i) => ({ 
			date: d.date, 
			value: data.reduce((acc,e) => acc + e.data[i].value,0)/data.length 
		})));
	}),

	draw: on('didInsertElement', observer('x', 'y', function() {
		let { element, x, y } = getProperties(this, 'element', 'x', 'y');

		let svg = d3.select(element);

		svg.select('.axis--x')
			.call(d3.axisBottom(x).ticks(5));

		svg.select('.axis--y')
			.call(d3.axisLeft(y).ticks(5));
	}))
});
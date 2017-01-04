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

	scatterData: computed('data.[]', function() {
		return get(this,'data').map(d => ({
			model: d.model,
			value: d.data[d.data.length-1].value,
			growth: d.data[d.data.length-1].value/d.data[0].value-1
		}));
	}),

	x: computed('scatterData.[]', 'chartW', function() {
		let { chartW, scatterData } = getProperties(this, 'chartW', 'scatterData');

		let domain = d3.extent(scatterData, d => d.value);
		let delta = domain[1]*0.1;
		return d3.scaleLinear()
			.domain([domain[0]-delta,domain[1]+delta])
			.range([0, chartW]);
	}),

	y: computed('scatterData.[]', 'chartH', function() {
		let { chartH, scatterData } = getProperties(this, 'chartH', 'scatterData');

		let domain = d3.extent(scatterData, d => d.growth);
		let delta = domain[1]*0.1;
		return d3.scaleLinear()
			.domain([domain[0]-delta,domain[1]+delta])
			.range([chartH, 0]);
	}),

	voronoi: computed('x', 'y', 'margin', 'width', 'height', function() {
		let { x, y, margin, width, height } = getProperties(this, 'x', 'y', 'margin', 'width', 'height');

		return d3.voronoi()
			.x(d => x(d.value))
			.y(d => y(d.growth))
			.extent([[-1, -1], [width+1, height+1]]);
	}),

	polygons: computed('voronoi', 'scatterData.[]', function() {
		let { voronoi, scatterData } = getProperties(this, 'voronoi', 'scatterData');

		return voronoi.polygons(scatterData);
	}),

	plottableData: computed('scatterData.[]', 'x', 'y', function() {
		let { scatterData, x, y } = getProperties(this, 'scatterData', 'x', 'y');

		return scatterData.map(d => ({
			x: x(d.value),
			y: y(d.growth),
			model: d.model
		}));
	}),

	average: computed('scatterData.[]', 'x', 'y', function() {
		let { scatterData, x, y } = getProperties(this, 'scatterData', 'x', 'y');

		return {
			x: x(d3.mean(scatterData, d => d.value)),
			y: y(d3.mean(scatterData, d => d.growth))
		};
	}),

	draw: on('didInsertElement', observer('x', 'y', function() {
		let { element, x, y } = getProperties(this, 'element', 'x', 'y');

		let svg = d3.select(element);

		svg.select('.axis--x')
			.call(d3.axisBottom(x).ticks(5));

		svg.select('.axis--y')
			.call(d3.axisLeft(y)
				.ticks(5)
				.tickFormat(d3.format('.0%')));
	}))
});
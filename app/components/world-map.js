import Ember from 'ember';

const { computed, get, getProperties, setProperties } = Ember;

/* global d3 */

export default Ember.Component.extend({
	tagName: 'svg',
	attributeBindings: ['viewBox'],
	classNames: ['world-map'],

	width: 700,
	height: 200,
	viewBox: computed('width', 'height', function() {
		let { width, height } = getProperties(this, 'width', 'height');
		return `0 0 ${width} ${height}`;
	}),

	path: computed('width', 'height', function() {
		let { width, height } = getProperties(this, 'width', 'height');
		return d3.geoPath().projection(d3.geoEquirectangular().center([0, 15]).scale(90).translate([width/2,height/2]));
	}),

	shapes: computed('path', 'data', function() {
		let { path, data } = getProperties(this, 'path', 'data');
		return data.map(d => ({
			path: path(get(d, 'geometry')),
			props: d
		}));
	})
});
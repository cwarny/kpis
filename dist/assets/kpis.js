"use strict";

/* jshint ignore:start */



/* jshint ignore:end */

define('kpis/app', ['exports', 'ember', 'kpis/resolver', 'ember-load-initializers', 'kpis/config/environment'], function (exports, _ember, _kpisResolver, _emberLoadInitializers, _kpisConfigEnvironment) {

  var App = undefined;

  _ember['default'].MODEL_FACTORY_INJECTIONS = true;

  App = _ember['default'].Application.extend({
    modulePrefix: _kpisConfigEnvironment['default'].modulePrefix,
    podModulePrefix: _kpisConfigEnvironment['default'].podModulePrefix,
    Resolver: _kpisResolver['default']
  });

  (0, _emberLoadInitializers['default'])(App, _kpisConfigEnvironment['default'].modulePrefix);

  exports['default'] = App;
});
define("kpis/components/-lf-get-outlet-state", ["exports", "liquid-fire/components/-lf-get-outlet-state"], function (exports, _liquidFireComponentsLfGetOutletState) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLfGetOutletState["default"];
    }
  });
});
define('kpis/components/animated-options', ['exports', 'ember', 'ember-power-select/components/power-select/options'], function (exports, _ember, _emberPowerSelectComponentsPowerSelectOptions) {
	exports['default'] = _emberPowerSelectComponentsPowerSelectOptions['default'].extend({
		animationRules: _ember['default'].computed(function () {
			return function () {
				this.transition(this.toValue(function (newOptions, oldOptions) {
					return oldOptions === safeGet(newOptions, 0, 'parentLevel', 'options');
				}), this.use('toLeft'), this.reverse('toRight'));
			};
		}),

		didReceiveAttrs: function didReceiveAttrs() {
			this._super.apply(this, arguments);
			this.set('enableGrowth', !this.get('options.fromSearch'));
		}
	});

	function safeGet(base) {
		for (var _len = arguments.length, keys = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
			keys[_key - 1] = arguments[_key];
		}

		while (base && keys.length > 0) {
			base = base[keys.shift()];
		}
		return base;
	}
});
define('kpis/components/basic-dropdown', ['exports', 'ember-basic-dropdown/components/basic-dropdown'], function (exports, _emberBasicDropdownComponentsBasicDropdown) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBasicDropdownComponentsBasicDropdown['default'];
    }
  });
});
define('kpis/components/basic-dropdown/content', ['exports', 'ember-basic-dropdown/components/basic-dropdown/content'], function (exports, _emberBasicDropdownComponentsBasicDropdownContent) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBasicDropdownComponentsBasicDropdownContent['default'];
    }
  });
});
define('kpis/components/basic-dropdown/trigger', ['exports', 'ember-basic-dropdown/components/basic-dropdown/trigger'], function (exports, _emberBasicDropdownComponentsBasicDropdownTrigger) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberBasicDropdownComponentsBasicDropdownTrigger['default'];
    }
  });
});
define('kpis/components/country-shape', ['exports', 'ember'], function (exports, _ember) {
	var computed = _ember['default'].computed;
	var get = _ember['default'].get;
	var getProperties = _ember['default'].getProperties;
	var setProperties = _ember['default'].setProperties;
	var oneWay = computed.oneWay;

	/* global d3 */

	exports['default'] = _ember['default'].Component.extend({
		tagName: 'path',
		attributeBindings: ['d', 'fill', 'style'],
		classNames: ['country'],
		classNameBindings: ['highlighted'],

		highlighted: oneWay('country.highlighted'),
		selected: oneWay('country.selected'),
		color: oneWay('country.color'),
		code: oneWay('country.code'),

		fill: computed('selected', 'color', function () {
			if (get(this, 'selected')) return get(this, 'color');
			return '#cccccc';
		}),

		style: computed('code', function () {
			if (get(this, 'code')) return 'cursor:pointer';
			return 'cursor:no-drop';
		}),

		mouseEnter: function mouseEnter() {
			get(this, 'onhighlight')(get(this, 'country'));
		},

		mouseLeave: function mouseLeave() {
			get(this, 'ondehighlight')(get(this, 'country'));
		},

		click: function click() {
			if (get(this, 'code')) {
				if (get(this, 'selected')) {
					get(this, 'ondeselect')(get(this, 'country'));
				} else {
					get(this, 'onselect')(get(this, 'country'));
				}
			}
		}
	});
});
define('kpis/components/country-tag', ['exports', 'ember'], function (exports, _ember) {
	var computed = _ember['default'].computed;
	var get = _ember['default'].get;
	var getProperties = _ember['default'].getProperties;
	var setProperties = _ember['default'].setProperties;
	var oneWay = computed.oneWay;

	/* global d3 */

	exports['default'] = _ember['default'].Component.extend({
		tagName: 'span',
		classNames: ['tag'],
		classNameBindings: ['highlighted'],
		attributeBindings: ['style'],

		color: oneWay('country.color'),
		highlighted: oneWay('country.highlighted'),

		style: computed(function () {
			return 'background-color:' + get(this, 'color');
		}),

		mouseEnter: function mouseEnter() {
			get(this, 'onhighlight')(get(this, 'country'));
		},

		mouseLeave: function mouseLeave() {
			get(this, 'ondehighlight')(get(this, 'country'));
		}
	});
});
define('kpis/components/ember-wormhole', ['exports', 'ember-wormhole/components/ember-wormhole'], function (exports, _emberWormholeComponentsEmberWormhole) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberWormholeComponentsEmberWormhole['default'];
    }
  });
});
define('kpis/components/fancy-table', ['exports', 'ember'], function (exports, _ember) {

	/* global _ */

	var computed = _ember['default'].computed;
	var get = _ember['default'].get;
	var getProperties = _ember['default'].getProperties;
	var set = _ember['default'].set;
	var setProperties = _ember['default'].setProperties;
	var observer = _ember['default'].observer;
	var sort = computed.sort;
	var equal = computed.equal;
	exports['default'] = _ember['default'].Component.extend({
		sort: computed('sortBy', 'sortDir', function () {
			var _getProperties = getProperties(this, 'sortBy', 'sortDir');

			var sortBy = _getProperties.sortBy;
			var sortDir = _getProperties.sortDir;

			return [sortBy + ':' + sortDir];
		}),

		subscribersSortProp: computed('subscribersSort', function () {
			return get(this, 'subscribersSort') === 'value' ? 'lastSubscribers' : 'subscribersGrowth';
		}),
		mauFreeSortProp: computed('mauFreeSort', function () {
			return get(this, 'mauFreeSort') === 'value' ? 'lastMau.free' : 'mauGrowth.free';
		}),
		mauPaidSortProp: computed('mauPaidSort', function () {
			return get(this, 'mauPaidSort') === 'value' ? 'lastMau.paid' : 'mauGrowth.paid';
		}),
		dauFreeSortProp: computed('dauFreeSort', function () {
			return get(this, 'dauFreeSort') === 'value' ? 'lastDau.free' : 'dauGrowth.free';
		}),
		dauPaidSortProp: computed('dauPaidSort', function () {
			return get(this, 'dauPaidSort') === 'value' ? 'lastDau.paid' : 'dauGrowth.paid';
		}),
		hoursFreeSortProp: computed('hoursFreeSort', function () {
			return get(this, 'hoursFreeSort') === 'value' ? 'lastHours.free' : 'hoursGrowth.free';
		}),
		hoursPaidSortProp: computed('hoursPaidSort', function () {
			return get(this, 'hoursPaidSort') === 'value' ? 'lastHours.paid' : 'hoursGrowth.paid';
		}),

		resultsPerPage: 10,

		sortedCountries: sort('countries', 'sort'),

		rows: computed('sortedCountries.[]', 'page', 'resultsPerPage', function () {
			var _getProperties2 = getProperties(this, 'sortedCountries', 'page', 'resultsPerPage');

			var sortedCountries = _getProperties2.sortedCountries;
			var page = _getProperties2.page;
			var resultsPerPage = _getProperties2.resultsPerPage;

			return sortedCountries ? sortedCountries.slice((page - 1) * resultsPerPage, page * resultsPerPage) : null;
		}),

		firstPage: computed('page', 'resultsPerPage', {
			get: function get() {
				var _getProperties3 = getProperties(this, 'page', 'resultsPerPage');

				var page = _getProperties3.page;
				var resultsPerPage = _getProperties3.resultsPerPage;

				return Math.floor((page - 1) / 5) * 5 + 1;
			},
			set: function set(key, value) {
				return value;
			}
		}),

		totalPages: computed('countries.[]', 'resultsPerPage', function () {
			return Math.ceil(get(this, 'countries.length') / get(this, 'resultsPerPage'));
		}),

		pages: computed('firstPage', 'totalPages', 'resultsPerPage', function () {
			var _getProperties4 = getProperties(this, 'firstPage', 'totalPages', 'resultsPerPage');

			var firstPage = _getProperties4.firstPage;
			var totalPages = _getProperties4.totalPages;
			var resultsPerPage = _getProperties4.resultsPerPage;

			var len = Math.min(totalPages - firstPage + 1, 5);
			return _.range(firstPage, firstPage + len);
		}),

		page: 1,

		updatePage: observer('highlighted', function () {
			var _getProperties5 = getProperties(this, 'highlighted', 'sortedCountries', 'resultsPerPage');

			var highlighted = _getProperties5.highlighted;
			var sortedCountries = _getProperties5.sortedCountries;
			var resultsPerPage = _getProperties5.resultsPerPage;

			if (highlighted) {
				var i = sortedCountries.indexOf(highlighted);
				if (i !== -1) set(this, 'page', Math.floor(i / resultsPerPage) + 1);
			}
		}),

		actions: {
			incrementPage: function incrementPage() {
				if (get(this, 'pages.lastObject') < get(this, 'totalPages')) {
					this.incrementProperty('firstPage', 5);
				}
			},
			decrementPage: function decrementPage() {
				if (get(this, 'pages.firstObject') > 1) {
					this.decrementProperty('firstPage', 5);
				}
			},
			setPage: function setPage(p) {
				set(this, 'page', p);
			},
			sort: function sort(by) {
				get(this, 'onsort')(by);
			},
			toggleSort: function toggleSort(which) {
				get(this, 'ontogglesort')(which);
			}
		}
	});
});
define("kpis/components/illiquid-model", ["exports", "liquid-fire/components/illiquid-model"], function (exports, _liquidFireComponentsIlliquidModel) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsIlliquidModel["default"];
    }
  });
});
define('kpis/components/line-chart', ['exports', 'ember'], function (exports, _ember) {

	/* global d3 */

	var computed = _ember['default'].computed;
	var get = _ember['default'].get;
	var getProperties = _ember['default'].getProperties;
	var set = _ember['default'].set;
	var setProperties = _ember['default'].setProperties;
	var on = _ember['default'].on;
	var observer = _ember['default'].observer;
	exports['default'] = _ember['default'].Component.extend({
		tagName: 'svg',
		attributeBindings: ['viewBox'],

		margin: { top: 10, right: 10, bottom: 20, left: 40 },

		width: 250,
		height: 110,
		viewBox: computed('width', 'height', function () {
			return '0 0 ' + get(this, 'width') + ' ' + get(this, 'height');
		}),

		chartW: computed('margin', 'width', function () {
			var _getProperties = getProperties(this, 'margin', 'width');

			var margin = _getProperties.margin;
			var width = _getProperties.width;

			return width - margin.left - margin.right;
		}),

		chartH: computed(function () {
			var _getProperties2 = getProperties(this, 'margin', 'height');

			var margin = _getProperties2.margin;
			var height = _getProperties2.height;

			return height - margin.top - margin.bottom;
		}),

		x: computed('data.[]', 'chartW', function () {
			var _getProperties3 = getProperties(this, 'chartW', 'data');

			var chartW = _getProperties3.chartW;
			var data = _getProperties3.data;

			return d3.scaleTime().domain([d3.min(data.map(function (d) {
				return d3.min(d.data.map(function (e) {
					return e.date;
				}));
			})), d3.max(data.map(function (d) {
				return d3.max(d.data.map(function (e) {
					return e.date;
				}));
			}))]).rangeRound([0, chartW]);
		}),

		y: computed('data.[]', 'chartH', function () {
			var _getProperties4 = getProperties(this, 'chartH', 'data');

			var chartH = _getProperties4.chartH;
			var data = _getProperties4.data;

			return d3.scaleLinear().domain([0, d3.max(data.map(function (d) {
				return d3.max(d.data.map(function (e) {
					return e.value;
				}));
			}))]).rangeRound([chartH, 0]);
		}),

		line: computed('x', 'y', function () {
			var _getProperties5 = getProperties(this, 'x', 'y');

			var x = _getProperties5.x;
			var y = _getProperties5.y;

			return d3.line().x(function (d) {
				return x(d.date);
			}).y(function (d) {
				return y(d.value);
			});
		}),

		voronoi: computed('x', 'y', 'margin', 'width', 'height', function () {
			var _getProperties6 = getProperties(this, 'x', 'y', 'margin', 'width', 'height');

			var x = _getProperties6.x;
			var y = _getProperties6.y;
			var margin = _getProperties6.margin;
			var width = _getProperties6.width;
			var height = _getProperties6.height;

			return d3.voronoi().x(function (d) {
				return x(d.date);
			}).y(function (d) {
				return y(d.value);
			}).extent([[-1, -1], [width + 1, height + 1]]);
		}),

		polygons: computed('voronoi', 'data.[]', function () {
			var _getProperties7 = getProperties(this, 'voronoi', 'data');

			var voronoi = _getProperties7.voronoi;
			var data = _getProperties7.data;

			return voronoi.polygons(d3.merge(data.map(function (d) {
				return d.data.map(function (e) {
					e.model = d.model;
					return e;
				});
			})));
		}),

		series: computed('line', 'data.[]', function () {
			var _getProperties8 = getProperties(this, 'line', 'data');

			var line = _getProperties8.line;
			var data = _getProperties8.data;

			return data.map(function (d) {
				return {
					d: line(d.data),
					stroke: get(d.model, 'color'),
					model: d.model
				};
			});
		}),

		average: computed('line', 'data.[]', function () {
			var _getProperties9 = getProperties(this, 'line', 'data');

			var line = _getProperties9.line;
			var data = _getProperties9.data;

			return line(data[0].data.map(function (d, i) {
				return {
					date: d.date,
					value: data.reduce(function (acc, e) {
						return acc + e.data[i].value;
					}, 0) / data.length
				};
			}));
		}),

		draw: on('didInsertElement', observer('x', 'y', function () {
			var _getProperties10 = getProperties(this, 'element', 'x', 'y');

			var element = _getProperties10.element;
			var x = _getProperties10.x;
			var y = _getProperties10.y;

			var svg = d3.select(element);

			svg.select('.axis--x').call(d3.axisBottom(x).ticks(5));

			svg.select('.axis--y').call(d3.axisLeft(y).ticks(5));
		}))
	});
});
define("kpis/components/liquid-bind", ["exports", "liquid-fire/components/liquid-bind"], function (exports, _liquidFireComponentsLiquidBind) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidBind["default"];
    }
  });
});
define("kpis/components/liquid-child", ["exports", "liquid-fire/components/liquid-child"], function (exports, _liquidFireComponentsLiquidChild) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidChild["default"];
    }
  });
});
define("kpis/components/liquid-container", ["exports", "liquid-fire/components/liquid-container"], function (exports, _liquidFireComponentsLiquidContainer) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidContainer["default"];
    }
  });
});
define("kpis/components/liquid-if", ["exports", "liquid-fire/components/liquid-if"], function (exports, _liquidFireComponentsLiquidIf) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidIf["default"];
    }
  });
});
define("kpis/components/liquid-measured", ["exports", "liquid-fire/components/liquid-measured"], function (exports, _liquidFireComponentsLiquidMeasured) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidMeasured["default"];
    }
  });
  Object.defineProperty(exports, "measure", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidMeasured.measure;
    }
  });
});
define("kpis/components/liquid-outlet", ["exports", "liquid-fire/components/liquid-outlet"], function (exports, _liquidFireComponentsLiquidOutlet) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidOutlet["default"];
    }
  });
});
define("kpis/components/liquid-spacer", ["exports", "liquid-fire/components/liquid-spacer"], function (exports, _liquidFireComponentsLiquidSpacer) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidSpacer["default"];
    }
  });
});
define('kpis/components/liquid-sync', ['exports', 'liquid-fire/components/liquid-sync'], function (exports, _liquidFireComponentsLiquidSync) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidSync['default'];
    }
  });
});
define("kpis/components/liquid-unless", ["exports", "liquid-fire/components/liquid-unless"], function (exports, _liquidFireComponentsLiquidUnless) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidUnless["default"];
    }
  });
});
define("kpis/components/liquid-versions", ["exports", "liquid-fire/components/liquid-versions"], function (exports, _liquidFireComponentsLiquidVersions) {
  Object.defineProperty(exports, "default", {
    enumerable: true,
    get: function get() {
      return _liquidFireComponentsLiquidVersions["default"];
    }
  });
});
define('kpis/components/navigable-select', ['exports', 'ember'], function (exports, _ember) {
	var _get = _ember['default'].get;
	var computed = _ember['default'].computed;
	exports['default'] = _ember['default'].Component.extend({
		transformedOptions: computed('options.[]', {
			get: function get() {
				return (function walker(options) {
					var parentLevel = arguments.length <= 1 || arguments[1] === undefined ? null : arguments[1];

					var results = _ember['default'].A();

					results.toArray = function () {
						return results;
					};

					var len = _get(options, 'length');
					parentLevel = parentLevel || { root: true };
					for (var i = 0; i < len; i++) {
						var opt = _get(options, '' + i);
						var groupName = _get(opt, 'groupName');
						if (groupName) {
							var level = { levelName: groupName };
							var optionsWithBack = _ember['default'].A([{ parentLevel: parentLevel }]).concat(_get(opt, 'options'));
							level.options = walker(optionsWithBack, level);
							results.push(level);
						} else {
							results.push(opt);
						}
					}
					parentLevel.options = results;
					return results;
				})(this.get('options'));
			},
			set: function set(key, value) {
				return value;
			}
		}),

		actions: {
			onchange: function onchange(levelOrOption, dropdown) {
				if (_get(levelOrOption, 'levelName')) {
					this.set('transformedOptions', _get(levelOrOption, 'options'));
				} else if (levelOrOption.parentLevel) {
					this.set('transformedOptions', levelOrOption.parentLevel.options);
				} else {
					this.get('onchange')(levelOrOption);
					dropdown.actions.close();
					// this.set('transformedOptions', this.get('transformedOptions'));
				}
			}
		}
	});
});
define('kpis/components/power-select-multiple', ['exports', 'ember-power-select/components/power-select-multiple'], function (exports, _emberPowerSelectComponentsPowerSelectMultiple) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectMultiple['default'];
    }
  });
});
define('kpis/components/power-select-multiple/trigger', ['exports', 'ember-power-select/components/power-select-multiple/trigger'], function (exports, _emberPowerSelectComponentsPowerSelectMultipleTrigger) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectMultipleTrigger['default'];
    }
  });
});
define('kpis/components/power-select', ['exports', 'ember-power-select/components/power-select'], function (exports, _emberPowerSelectComponentsPowerSelect) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelect['default'];
    }
  });
});
define('kpis/components/power-select/before-options', ['exports', 'ember-power-select/components/power-select/before-options'], function (exports, _emberPowerSelectComponentsPowerSelectBeforeOptions) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectBeforeOptions['default'];
    }
  });
});
define('kpis/components/power-select/options', ['exports', 'ember-power-select/components/power-select/options'], function (exports, _emberPowerSelectComponentsPowerSelectOptions) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectOptions['default'];
    }
  });
});
define('kpis/components/power-select/search-message', ['exports', 'ember-power-select/components/power-select/search-message'], function (exports, _emberPowerSelectComponentsPowerSelectSearchMessage) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectSearchMessage['default'];
    }
  });
});
define('kpis/components/power-select/trigger', ['exports', 'ember-power-select/components/power-select/trigger'], function (exports, _emberPowerSelectComponentsPowerSelectTrigger) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectComponentsPowerSelectTrigger['default'];
    }
  });
});
define('kpis/components/radio-button', ['exports', 'ember'], function (exports, _ember) {
	var computed = _ember['default'].computed;
	exports['default'] = _ember['default'].Component.extend({
		classNames: ['btn-group'],
		classNameBindings: ['buttonSize'],
		attributeBindings: ['data-toggle'],
		size: 'sm',
		buttonSize: computed('size', function () {
			return 'btn-group-' + this.get('size');
		}),
		'data-toggle': 'buttons'
	});
});
define('kpis/components/scatter-plot', ['exports', 'ember'], function (exports, _ember) {

	/* global d3 */

	var computed = _ember['default'].computed;
	var get = _ember['default'].get;
	var getProperties = _ember['default'].getProperties;
	var set = _ember['default'].set;
	var setProperties = _ember['default'].setProperties;
	var on = _ember['default'].on;
	var observer = _ember['default'].observer;
	exports['default'] = _ember['default'].Component.extend({
		tagName: 'svg',
		attributeBindings: ['viewBox'],

		margin: { top: 10, right: 10, bottom: 20, left: 40 },

		width: 250,
		height: 110,
		viewBox: computed('width', 'height', function () {
			return '0 0 ' + get(this, 'width') + ' ' + get(this, 'height');
		}),

		chartW: computed('margin', 'width', function () {
			var _getProperties = getProperties(this, 'margin', 'width');

			var margin = _getProperties.margin;
			var width = _getProperties.width;

			return width - margin.left - margin.right;
		}),

		chartH: computed(function () {
			var _getProperties2 = getProperties(this, 'margin', 'height');

			var margin = _getProperties2.margin;
			var height = _getProperties2.height;

			return height - margin.top - margin.bottom;
		}),

		scatterData: computed('data.[]', function () {
			return get(this, 'data').map(function (d) {
				return {
					model: d.model,
					value: d.data[d.data.length - 1].value,
					growth: d.data[d.data.length - 1].value / d.data[0].value - 1
				};
			});
		}),

		x: computed('scatterData.[]', 'chartW', function () {
			var _getProperties3 = getProperties(this, 'chartW', 'scatterData');

			var chartW = _getProperties3.chartW;
			var scatterData = _getProperties3.scatterData;

			var domain = d3.extent(scatterData, function (d) {
				return d.value;
			});
			var delta = domain[1] * 0.1;
			return d3.scaleLinear().domain([domain[0] - delta, domain[1] + delta]).range([0, chartW]);
		}),

		y: computed('scatterData.[]', 'chartH', function () {
			var _getProperties4 = getProperties(this, 'chartH', 'scatterData');

			var chartH = _getProperties4.chartH;
			var scatterData = _getProperties4.scatterData;

			var domain = d3.extent(scatterData, function (d) {
				return d.growth;
			});
			var delta = domain[1] * 0.1;
			return d3.scaleLinear().domain([domain[0] - delta, domain[1] + delta]).range([chartH, 0]);
		}),

		voronoi: computed('x', 'y', 'margin', 'width', 'height', function () {
			var _getProperties5 = getProperties(this, 'x', 'y', 'margin', 'width', 'height');

			var x = _getProperties5.x;
			var y = _getProperties5.y;
			var margin = _getProperties5.margin;
			var width = _getProperties5.width;
			var height = _getProperties5.height;

			return d3.voronoi().x(function (d) {
				return x(d.value);
			}).y(function (d) {
				return y(d.growth);
			}).extent([[-1, -1], [width + 1, height + 1]]);
		}),

		polygons: computed('voronoi', 'scatterData.[]', function () {
			var _getProperties6 = getProperties(this, 'voronoi', 'scatterData');

			var voronoi = _getProperties6.voronoi;
			var scatterData = _getProperties6.scatterData;

			return voronoi.polygons(scatterData);
		}),

		plottableData: computed('scatterData.[]', 'x', 'y', function () {
			var _getProperties7 = getProperties(this, 'scatterData', 'x', 'y');

			var scatterData = _getProperties7.scatterData;
			var x = _getProperties7.x;
			var y = _getProperties7.y;

			return scatterData.map(function (d) {
				return {
					x: x(d.value),
					y: y(d.growth),
					model: d.model
				};
			});
		}),

		average: computed('scatterData.[]', 'x', 'y', function () {
			var _getProperties8 = getProperties(this, 'scatterData', 'x', 'y');

			var scatterData = _getProperties8.scatterData;
			var x = _getProperties8.x;
			var y = _getProperties8.y;

			return {
				x: x(d3.mean(scatterData, function (d) {
					return d.value;
				})),
				y: y(d3.mean(scatterData, function (d) {
					return d.growth;
				}))
			};
		}),

		draw: on('didInsertElement', observer('x', 'y', function () {
			var _getProperties9 = getProperties(this, 'element', 'x', 'y');

			var element = _getProperties9.element;
			var x = _getProperties9.x;
			var y = _getProperties9.y;

			var svg = d3.select(element);

			svg.select('.axis--x').call(d3.axisBottom(x).ticks(5));

			svg.select('.axis--y').call(d3.axisLeft(y).ticks(5).tickFormat(d3.format('.0%')));
		}))
	});
});
define('kpis/components/table-row', ['exports', 'ember'], function (exports, _ember) {
	var computed = _ember['default'].computed;
	var get = _ember['default'].get;
	var getProperties = _ember['default'].getProperties;
	var setProperties = _ember['default'].setProperties;
	var oneWay = computed.oneWay;
	exports['default'] = _ember['default'].Component.extend({
		tagName: 'tr',
		classNameBindings: ['highlighted', 'selected'],
		classNames: ['clickable'],

		highlighted: oneWay('country.highlighted'),
		selected: oneWay('country.selected'),

		klass: computed('highlighted', 'selected', function () {
			if (get(this, 'selected')) {
				return 'selected';
			} else {
				if (get(this, 'highlighted')) return 'active';
			}
		}),

		subscribersGrowth: oneWay('country.avgSubscribers'),

		mauFreeGrowth: computed('country', function () {
			return get(this, 'country.avgMau').free;
		}),
		dauFreeGrowth: computed('country', function () {
			return get(this, 'country.avgDau').free;
		}),
		hoursFreeGrowth: computed('country', function () {
			return get(this, 'country.avgHours').free;
		}),

		avgMauPaid: computed('country', function () {
			return get(this, 'country.avgMau').paid;
		}),
		avgDauPaid: computed('country', function () {
			return get(this, 'country.avgDau').paid;
		}),
		avgHoursPaid: computed('country', function () {
			return get(this, 'country.avgHours').paid;
		}),

		mouseEnter: function mouseEnter() {
			get(this, 'onhighlight')(get(this, 'country'));
		},

		mouseLeave: function mouseLeave() {
			get(this, 'ondehighlight')(get(this, 'country'));
		},

		click: function click() {
			if (get(this, 'selected')) {
				get(this, 'ondeselect')(get(this, 'country'));
			} else {
				get(this, 'onselect')(get(this, 'country'));
			}
		}
	});
});
define('kpis/components/voronoi-cell', ['exports', 'ember'], function (exports, _ember) {
	var computed = _ember['default'].computed;
	var get = _ember['default'].get;
	var getProperties = _ember['default'].getProperties;
	var setProperties = _ember['default'].setProperties;
	var oneWay = computed.oneWay;

	/* global d3 */

	exports['default'] = _ember['default'].Component.extend({
		tagName: 'path',
		attributeBindings: ['d'],

		d: computed('cell', function () {
			var cell = get(this, 'cell');
			return cell ? 'M' + cell.join('L') + 'Z' : null;
		}),

		mouseEnter: function mouseEnter() {
			get(this, 'onhighlight')(get(this, 'cell.data.model'));
		},

		mouseLeave: function mouseLeave() {
			get(this, 'ondehighlight')(get(this, 'cell.data.model'));
		}
	});
});
define('kpis/components/world-map', ['exports', 'ember'], function (exports, _ember) {
	var computed = _ember['default'].computed;
	var get = _ember['default'].get;
	var getProperties = _ember['default'].getProperties;
	var setProperties = _ember['default'].setProperties;

	/* global d3 */

	exports['default'] = _ember['default'].Component.extend({
		tagName: 'svg',
		attributeBindings: ['viewBox'],
		classNames: ['world-map'],

		width: 700,
		height: 200,
		viewBox: computed('width', 'height', function () {
			var _getProperties = getProperties(this, 'width', 'height');

			var width = _getProperties.width;
			var height = _getProperties.height;

			return '0 0 ' + width + ' ' + height;
		}),

		path: computed('width', 'height', function () {
			var _getProperties2 = getProperties(this, 'width', 'height');

			var width = _getProperties2.width;
			var height = _getProperties2.height;

			return d3.geoPath().projection(d3.geoEquirectangular().center([0, 15]).scale(90).translate([width / 2, height / 2]));
		}),

		shapes: computed('path', 'data', function () {
			var _getProperties3 = getProperties(this, 'path', 'data');

			var path = _getProperties3.path;
			var data = _getProperties3.data;

			return data.map(function (d) {
				return {
					path: path(get(d, 'geometry')),
					props: d
				};
			});
		})
	});
});
define('kpis/controllers/application', ['exports', 'ember'], function (exports, _ember) {

	/* global d3 */

	var computed = _ember['default'].computed;
	var _get = _ember['default'].get;
	var set = _ember['default'].set;
	var A = _ember['default'].A;
	var getProperties = _ember['default'].getProperties;
	var setProperties = _ember['default'].setProperties;
	var observer = _ember['default'].observer;
	var filter = computed.filter;
	var setDiff = computed.setDiff;
	exports['default'] = _ember['default'].Controller.extend({
		queryParams: ['subscribersDimension', 'activeUserProduct', 'activeUserTimeWindow', 'contentHoursProduct', 'hoursDimension', 'selectedCodes', 'sortBy', 'sortDir', 'subscribersSort', 'mauPaidSort', 'mauFreeSort', 'dauPaidSort', 'dauFreeSort', 'hoursPaidSort', 'hoursFreeSort'],

		countries: filter('model.[]', function (d) {
			return _get(d, 'code');
		}),

		selected: computed({
			get: function get() {
				return A([]);
			},
			set: function set(key, value) {
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
			get: function get() {
				return _get(this, 'selected').mapBy('code');
			},
			set: function set(key, value) {
				return value;
			}
		}),

		nonselected: setDiff('countries', 'selected'),

		countrySelection: computed('nonselected.[]', function () {
			var regions = {};
			_get(this, 'nonselected').forEach(function (d) {
				var r = _get(d, 'region');
				if (_.hasIn(regions, r)) regions[r].push(d);else regions[r] = [d];
			});
			return _.toPairs(regions).map(function (d) {
				return {
					groupName: d[0],
					options: d[1]
				};
			});
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

		subscribers: computed('selected.[]', 'subscribersDimension', function () {
			var _getProperties = getProperties(this, 'selected', 'subscribersDimension');

			var selected = _getProperties.selected;
			var subscribersDimension = _getProperties.subscribersDimension;

			switch (subscribersDimension) {
				case 'share active last month':
					return selected.map(function (d) {
						return { data: _get(d, 'shareOfSubscribersActiveLastMonth'), model: d };
					});
				case 'share of active users':
					return selected.map(function (d) {
						return { data: _get(d, 'shareOfPayingUsers'), model: d };
					});
				default:
					return selected.map(function (d) {
						return { data: _get(d, 'subscribers'), model: d };
					});
			};
		}),
		activeUsers: computed('selected.[]', 'activeUserProduct', 'activeUserTimeWindow', function () {
			var _getProperties2 = getProperties(this, 'selected', 'activeUserProduct', 'activeUserTimeWindow');

			var selected = _getProperties2.selected;
			var activeUserProduct = _getProperties2.activeUserProduct;
			var activeUserTimeWindow = _getProperties2.activeUserTimeWindow;

			switch (activeUserTimeWindow) {
				case 'monthly':
					switch (activeUserProduct) {
						case 'paid':
							return selected.map(function (d) {
								return { data: _get(d, 'mau').paid, model: d };
							});
						default:
							return selected.map(function (d) {
								return { data: _get(d, 'mau').free, model: d };
							});
					};
				default:
					switch (activeUserProduct) {
						case 'paid':
							return selected.map(function (d) {
								return { data: _get(d, 'dau').paid, model: d };
							});
						default:
							return selected.map(function (d) {
								return { data: _get(d, 'dau').free, model: d };
							});
					};
			}
		}),
		contentHours: computed('selected.[]', 'contentHoursProduct', 'hoursDimension', function () {
			var _getProperties3 = getProperties(this, 'selected', 'contentHoursProduct', 'hoursDimension');

			var selected = _getProperties3.selected;
			var contentHoursProduct = _getProperties3.contentHoursProduct;
			var hoursDimension = _getProperties3.hoursDimension;

			switch (hoursDimension) {
				case 'per user':
					switch (contentHoursProduct) {
						case 'paid':
							return selected.map(function (d) {
								return { data: _get(d, 'hoursPerActiveUser').paid, model: d };
							});
						default:
							return selected.map(function (d) {
								return { data: _get(d, 'hoursPerActiveUser').free, model: d };
							});
					};
				default:
					switch (contentHoursProduct) {
						case 'paid':
							return selected.map(function (d) {
								return { data: _get(d, 'hours').paid, model: d };
							});
						default:
							return selected.map(function (d) {
								return { data: _get(d, 'hours').free, model: d };
							});
					};
			}
		}),

		actions: {
			highlight: function highlight(country) {
				set(this, 'highlighted', country);
				set(country, 'highlighted', true);
			},
			dehighlight: function dehighlight(country) {
				set(this, 'highlighted', null);
				set(country, 'highlighted', false);
			},
			select: function select(country) {
				_get(this, 'selected').pushObject(country);
				set(country, 'selected', true);
			},
			deselect: function deselect(country) {
				_get(this, 'selected').removeObject(country);
				setProperties(country, {
					selected: false,
					highlighted: false
				});
			},
			sort: function sort(by) {
				var _getProperties4 = getProperties(this, 'sortBy', 'sortDir');

				var sortBy = _getProperties4.sortBy;
				var sortDir = _getProperties4.sortDir;

				if (sortBy === by) {
					set(this, 'sortDir', sortDir === 'asc' ? 'desc' : 'asc');
				} else {
					setProperties(this, {
						sortBy: by,
						sortDir: 'desc'
					});
				}
			},
			toggleSort: function toggleSort(which) {
				set(this, which + 'Sort', _get(this, which + 'Sort') === 'value' ? 'growth' : 'value');
			}
		}
	});
});
define('kpis/helpers/and', ['exports', 'ember', 'ember-truth-helpers/helpers/and'], function (exports, _ember, _emberTruthHelpersHelpersAnd) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersAnd.andHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersAnd.andHelper);
  }

  exports['default'] = forExport;
});
define('kpis/helpers/app-version', ['exports', 'ember', 'kpis/config/environment'], function (exports, _ember, _kpisConfigEnvironment) {
  exports.appVersion = appVersion;
  var version = _kpisConfigEnvironment['default'].APP.version;

  function appVersion() {
    return version;
  }

  exports['default'] = _ember['default'].Helper.helper(appVersion);
});
define('kpis/helpers/cancel-all', ['exports', 'ember', 'ember-concurrency/-helpers'], function (exports, _ember, _emberConcurrencyHelpers) {
  exports.cancelHelper = cancelHelper;

  function cancelHelper(args) {
    var cancelable = args[0];
    if (!cancelable || typeof cancelable.cancelAll !== 'function') {
      _ember['default'].assert('The first argument passed to the `cancel-all` helper should be a Task or TaskGroup (without quotes); you passed ' + cancelable, false);
    }

    return (0, _emberConcurrencyHelpers.taskHelperClosure)('cancelAll', args);
  }

  exports['default'] = _ember['default'].Helper.helper(cancelHelper);
});
define('kpis/helpers/ember-power-select-is-group', ['exports', 'ember-power-select/helpers/ember-power-select-is-group'], function (exports, _emberPowerSelectHelpersEmberPowerSelectIsGroup) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectHelpersEmberPowerSelectIsGroup['default'];
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectIsGroup', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectHelpersEmberPowerSelectIsGroup.emberPowerSelectIsGroup;
    }
  });
});
define('kpis/helpers/ember-power-select-is-selected', ['exports', 'ember-power-select/helpers/ember-power-select-is-selected'], function (exports, _emberPowerSelectHelpersEmberPowerSelectIsSelected) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectHelpersEmberPowerSelectIsSelected['default'];
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectIsSelected', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectHelpersEmberPowerSelectIsSelected.emberPowerSelectIsSelected;
    }
  });
});
define('kpis/helpers/ember-power-select-true-string-if-present', ['exports', 'ember-power-select/helpers/ember-power-select-true-string-if-present'], function (exports, _emberPowerSelectHelpersEmberPowerSelectTrueStringIfPresent) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectHelpersEmberPowerSelectTrueStringIfPresent['default'];
    }
  });
  Object.defineProperty(exports, 'emberPowerSelectTrueStringIfPresent', {
    enumerable: true,
    get: function get() {
      return _emberPowerSelectHelpersEmberPowerSelectTrueStringIfPresent.emberPowerSelectTrueStringIfPresent;
    }
  });
});
define('kpis/helpers/eq', ['exports', 'ember'], function (exports, _ember) {
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  exports['default'] = _ember['default'].Helper.helper(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2);

    var v1 = _ref2[0];
    var v2 = _ref2[1];
    return v1 === v2;
  });
});
define('kpis/helpers/gt', ['exports', 'ember', 'ember-truth-helpers/helpers/gt'], function (exports, _ember, _emberTruthHelpersHelpersGt) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersGt.gtHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersGt.gtHelper);
  }

  exports['default'] = forExport;
});
define('kpis/helpers/gte', ['exports', 'ember', 'ember-truth-helpers/helpers/gte'], function (exports, _ember, _emberTruthHelpersHelpersGte) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersGte.gteHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersGte.gteHelper);
  }

  exports['default'] = forExport;
});
define('kpis/helpers/integer-format', ['exports', 'ember'], function (exports, _ember) {
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  exports['default'] = _ember['default'].Helper.helper(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1);

    var value = _ref2[0];
    return value ? Math.round(value).toLocaleString() : 'NaN';
  });
});
define('kpis/helpers/is-array', ['exports', 'ember', 'ember-truth-helpers/helpers/is-array'], function (exports, _ember, _emberTruthHelpersHelpersIsArray) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersIsArray.isArrayHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersIsArray.isArrayHelper);
  }

  exports['default'] = forExport;
});
define('kpis/helpers/is-equal', ['exports', 'ember-truth-helpers/helpers/is-equal'], function (exports, _emberTruthHelpersHelpersIsEqual) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersIsEqual['default'];
    }
  });
  Object.defineProperty(exports, 'isEqual', {
    enumerable: true,
    get: function get() {
      return _emberTruthHelpersHelpersIsEqual.isEqual;
    }
  });
});
define('kpis/helpers/lf-lock-model', ['exports', 'liquid-fire/helpers/lf-lock-model'], function (exports, _liquidFireHelpersLfLockModel) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireHelpersLfLockModel['default'];
    }
  });
  Object.defineProperty(exports, 'lfLockModel', {
    enumerable: true,
    get: function get() {
      return _liquidFireHelpersLfLockModel.lfLockModel;
    }
  });
});
define('kpis/helpers/lf-or', ['exports', 'liquid-fire/helpers/lf-or'], function (exports, _liquidFireHelpersLfOr) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireHelpersLfOr['default'];
    }
  });
  Object.defineProperty(exports, 'lfOr', {
    enumerable: true,
    get: function get() {
      return _liquidFireHelpersLfOr.lfOr;
    }
  });
});
define('kpis/helpers/lt', ['exports', 'ember', 'ember-truth-helpers/helpers/lt'], function (exports, _ember, _emberTruthHelpersHelpersLt) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersLt.ltHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersLt.ltHelper);
  }

  exports['default'] = forExport;
});
define('kpis/helpers/lte', ['exports', 'ember', 'ember-truth-helpers/helpers/lte'], function (exports, _ember, _emberTruthHelpersHelpersLte) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersLte.lteHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersLte.lteHelper);
  }

  exports['default'] = forExport;
});
define('kpis/helpers/not-eq', ['exports', 'ember', 'ember-truth-helpers/helpers/not-equal'], function (exports, _ember, _emberTruthHelpersHelpersNotEqual) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersNotEqual.notEqualHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersNotEqual.notEqualHelper);
  }

  exports['default'] = forExport;
});
define('kpis/helpers/not', ['exports', 'ember', 'ember-truth-helpers/helpers/not'], function (exports, _ember, _emberTruthHelpersHelpersNot) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersNot.notHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersNot.notHelper);
  }

  exports['default'] = forExport;
});
define('kpis/helpers/number-format', ['exports', 'ember'], function (exports, _ember) {
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  exports['default'] = _ember['default'].Helper.helper(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1);

    var value = _ref2[0];
    return value ? value.toLocaleString() : 'NaN';
  });
});
define('kpis/helpers/or', ['exports', 'ember', 'ember-truth-helpers/helpers/or'], function (exports, _ember, _emberTruthHelpersHelpersOr) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersOr.orHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersOr.orHelper);
  }

  exports['default'] = forExport;
});
define('kpis/helpers/percent-format', ['exports', 'ember'], function (exports, _ember) {
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  /* global d3 */

  exports['default'] = _ember['default'].Helper.helper(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 1);

    var value = _ref2[0];
    return d3.format('.0%')(value);
  });
});
define('kpis/helpers/perform', ['exports', 'ember', 'ember-concurrency/-helpers'], function (exports, _ember, _emberConcurrencyHelpers) {
  exports.performHelper = performHelper;

  function performHelper(args, hash) {
    return (0, _emberConcurrencyHelpers.taskHelperClosure)('perform', args, hash);
  }

  exports['default'] = _ember['default'].Helper.helper(performHelper);
});
define('kpis/helpers/pluralize', ['exports', 'ember-inflector/lib/helpers/pluralize'], function (exports, _emberInflectorLibHelpersPluralize) {
  exports['default'] = _emberInflectorLibHelpersPluralize['default'];
});
define('kpis/helpers/scale', ['exports', 'ember'], function (exports, _ember) {
  var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

  exports['default'] = _ember['default'].Helper.helper(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2);

    var scale = _ref2[0];
    var value = _ref2[1];
    return scale(value);
  });
});
define('kpis/helpers/singularize', ['exports', 'ember-inflector/lib/helpers/singularize'], function (exports, _emberInflectorLibHelpersSingularize) {
  exports['default'] = _emberInflectorLibHelpersSingularize['default'];
});
define('kpis/helpers/task', ['exports', 'ember'], function (exports, _ember) {
  function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

  function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

  function taskHelper(_ref) {
    var _ref2 = _toArray(_ref);

    var task = _ref2[0];

    var args = _ref2.slice(1);

    return task._curry.apply(task, _toConsumableArray(args));
  }

  exports['default'] = _ember['default'].Helper.helper(taskHelper);
});
define('kpis/helpers/titlecase', ['exports', 'ember'], function (exports, _ember) {
	var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

	exports['default'] = _ember['default'].Helper.helper(function (_ref) {
		var _ref2 = _slicedToArray(_ref, 1);

		var value = _ref2[0];

		var newValue = '';
		var _iteratorNormalCompletion = true;
		var _didIteratorError = false;
		var _iteratorError = undefined;

		try {
			for (var _iterator = value[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
				var c = _step.value;

				if (c == c.toUpperCase()) {
					newValue += ' ' + c;
				} else {
					newValue += c;
				}
			}
		} catch (err) {
			_didIteratorError = true;
			_iteratorError = err;
		} finally {
			try {
				if (!_iteratorNormalCompletion && _iterator['return']) {
					_iterator['return']();
				}
			} finally {
				if (_didIteratorError) {
					throw _iteratorError;
				}
			}
		}

		return newValue.charAt(0).toUpperCase() + newValue.substr(1).toLowerCase();
	});
});
define('kpis/helpers/xor', ['exports', 'ember', 'ember-truth-helpers/helpers/xor'], function (exports, _ember, _emberTruthHelpersHelpersXor) {

  var forExport = null;

  if (_ember['default'].Helper) {
    forExport = _ember['default'].Helper.helper(_emberTruthHelpersHelpersXor.xorHelper);
  } else if (_ember['default'].HTMLBars.makeBoundHelper) {
    forExport = _ember['default'].HTMLBars.makeBoundHelper(_emberTruthHelpersHelpersXor.xorHelper);
  }

  exports['default'] = forExport;
});
define('kpis/initializers/app-version', ['exports', 'ember-cli-app-version/initializer-factory', 'kpis/config/environment'], function (exports, _emberCliAppVersionInitializerFactory, _kpisConfigEnvironment) {
  var _config$APP = _kpisConfigEnvironment['default'].APP;
  var name = _config$APP.name;
  var version = _config$APP.version;
  exports['default'] = {
    name: 'App Version',
    initialize: (0, _emberCliAppVersionInitializerFactory['default'])(name, version)
  };
});
define('kpis/initializers/container-debug-adapter', ['exports', 'ember-resolver/container-debug-adapter'], function (exports, _emberResolverContainerDebugAdapter) {
  exports['default'] = {
    name: 'container-debug-adapter',

    initialize: function initialize() {
      var app = arguments[1] || arguments[0];

      app.register('container-debug-adapter:main', _emberResolverContainerDebugAdapter['default']);
      app.inject('container-debug-adapter:main', 'namespace', 'application:main');
    }
  };
});
define('kpis/initializers/data-adapter', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `data-adapter` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'data-adapter',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('kpis/initializers/ember-concurrency', ['exports', 'ember-concurrency'], function (exports, _emberConcurrency) {
  exports['default'] = {
    name: 'ember-concurrency',
    initialize: function initialize() {}
  };
});
// This initializer exists only to make sure that the following
// imports happen before the app boots.
define('kpis/initializers/ember-data', ['exports', 'ember-data/setup-container', 'ember-data/-private/core'], function (exports, _emberDataSetupContainer, _emberDataPrivateCore) {

  /*
  
    This code initializes Ember-Data onto an Ember application.
  
    If an Ember.js developer defines a subclass of DS.Store on their application,
    as `App.StoreService` (or via a module system that resolves to `service:store`)
    this code will automatically instantiate it and make it available on the
    router.
  
    Additionally, after an application's controllers have been injected, they will
    each have the store made available to them.
  
    For example, imagine an Ember.js application with the following classes:
  
    App.StoreService = DS.Store.extend({
      adapter: 'custom'
    });
  
    App.PostsController = Ember.Controller.extend({
      // ...
    });
  
    When the application is initialized, `App.ApplicationStore` will automatically be
    instantiated, and the instance of `App.PostsController` will have its `store`
    property set to that instance.
  
    Note that this code will only be run if the `ember-application` package is
    loaded. If Ember Data is being used in an environment other than a
    typical application (e.g., node.js where only `ember-runtime` is available),
    this code will be ignored.
  */

  exports['default'] = {
    name: 'ember-data',
    initialize: _emberDataSetupContainer['default']
  };
});
define('kpis/initializers/export-application-global', ['exports', 'ember', 'kpis/config/environment'], function (exports, _ember, _kpisConfigEnvironment) {
  exports.initialize = initialize;

  function initialize() {
    var application = arguments[1] || arguments[0];
    if (_kpisConfigEnvironment['default'].exportApplicationGlobal !== false) {
      var theGlobal;
      if (typeof window !== 'undefined') {
        theGlobal = window;
      } else if (typeof global !== 'undefined') {
        theGlobal = global;
      } else if (typeof self !== 'undefined') {
        theGlobal = self;
      } else {
        // no reasonable global, just bail
        return;
      }

      var value = _kpisConfigEnvironment['default'].exportApplicationGlobal;
      var globalName;

      if (typeof value === 'string') {
        globalName = value;
      } else {
        globalName = _ember['default'].String.classify(_kpisConfigEnvironment['default'].modulePrefix);
      }

      if (!theGlobal[globalName]) {
        theGlobal[globalName] = application;

        application.reopen({
          willDestroy: function willDestroy() {
            this._super.apply(this, arguments);
            delete theGlobal[globalName];
          }
        });
      }
    }
  }

  exports['default'] = {
    name: 'export-application-global',

    initialize: initialize
  };
});
define('kpis/initializers/injectStore', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `injectStore` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'injectStore',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define("kpis/initializers/liquid-fire", ["exports", "liquid-fire/ember-internals"], function (exports, _liquidFireEmberInternals) {

  (0, _liquidFireEmberInternals.initialize)();

  exports["default"] = {
    name: 'liquid-fire',
    initialize: function initialize() {}
  };
});
define('kpis/initializers/store', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `store` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'store',
    after: 'ember-data',
    initialize: _ember['default'].K
  };
});
define('kpis/initializers/transforms', ['exports', 'ember'], function (exports, _ember) {

  /*
    This initializer is here to keep backwards compatibility with code depending
    on the `transforms` initializer (before Ember Data was an addon).
  
    Should be removed for Ember Data 3.x
  */

  exports['default'] = {
    name: 'transforms',
    before: 'store',
    initialize: _ember['default'].K
  };
});
define('kpis/initializers/truth-helpers', ['exports', 'ember', 'ember-truth-helpers/utils/register-helper', 'ember-truth-helpers/helpers/and', 'ember-truth-helpers/helpers/or', 'ember-truth-helpers/helpers/equal', 'ember-truth-helpers/helpers/not', 'ember-truth-helpers/helpers/is-array', 'ember-truth-helpers/helpers/not-equal', 'ember-truth-helpers/helpers/gt', 'ember-truth-helpers/helpers/gte', 'ember-truth-helpers/helpers/lt', 'ember-truth-helpers/helpers/lte'], function (exports, _ember, _emberTruthHelpersUtilsRegisterHelper, _emberTruthHelpersHelpersAnd, _emberTruthHelpersHelpersOr, _emberTruthHelpersHelpersEqual, _emberTruthHelpersHelpersNot, _emberTruthHelpersHelpersIsArray, _emberTruthHelpersHelpersNotEqual, _emberTruthHelpersHelpersGt, _emberTruthHelpersHelpersGte, _emberTruthHelpersHelpersLt, _emberTruthHelpersHelpersLte) {
  exports.initialize = initialize;

  function initialize() /* container, application */{

    // Do not register helpers from Ember 1.13 onwards, starting from 1.13 they
    // will be auto-discovered.
    if (_ember['default'].Helper) {
      return;
    }

    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('and', _emberTruthHelpersHelpersAnd.andHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('or', _emberTruthHelpersHelpersOr.orHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('eq', _emberTruthHelpersHelpersEqual.equalHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('not', _emberTruthHelpersHelpersNot.notHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('is-array', _emberTruthHelpersHelpersIsArray.isArrayHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('not-eq', _emberTruthHelpersHelpersNotEqual.notEqualHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('gt', _emberTruthHelpersHelpersGt.gtHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('gte', _emberTruthHelpersHelpersGte.gteHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('lt', _emberTruthHelpersHelpersLt.ltHelper);
    (0, _emberTruthHelpersUtilsRegisterHelper.registerHelper)('lte', _emberTruthHelpersHelpersLte.lteHelper);
  }

  exports['default'] = {
    name: 'truth-helpers',
    initialize: initialize
  };
});
define("kpis/instance-initializers/ember-data", ["exports", "ember-data/-private/instance-initializers/initialize-store-service"], function (exports, _emberDataPrivateInstanceInitializersInitializeStoreService) {
  exports["default"] = {
    name: "ember-data",
    initialize: _emberDataPrivateInstanceInitializersInitializeStoreService["default"]
  };
});
define('kpis/models/country', ['exports', 'ember', 'ember-data'], function (exports, _ember, _emberData) {

	/* global _ */

	var computed = _ember['default'].computed;
	var get = _ember['default'].get;
	var getProperties = _ember['default'].getProperties;
	var attr = _emberData['default'].attr;
	var map = computed.map;
	exports['default'] = _emberData['default'].Model.extend({
		code: attr('string'),
		color: attr('string'),
		name: attr('string'),
		region: attr('string'),
		mau: attr(),
		dau: attr(),
		subscribers: attr(),
		hours: attr(),
		geometry: attr(),

		shareOfPayingUsers: computed('mau', function () {
			var mau = get(this, 'mau');
			return _.zip(mau.paid, _.zip(mau.free, mau.paid).map(function (d) {
				return {
					value: _.sumBy(d, 'value'),
					date: d[0].date
				};
			})).map(function (d) {
				return {
					value: d[0].value / d[1].value,
					date: d[0].date
				};
			});
		}),
		hoursPerActiveUser: computed('hours', 'mau', function () {
			var _getProperties = getProperties(this, 'hours', 'mau');

			var hours = _getProperties.hours;
			var mau = _getProperties.mau;

			return {
				free: _.zip(hours.free, mau.free).map(function (d) {
					return {
						value: d[0].value / d[1].value,
						date: d[0].date
					};
				}),
				paid: _.zip(hours.paid, mau.paid).map(function (d) {
					return {
						value: d[0].value / d[1].value,
						date: d[0].date
					};
				})
			};
		}),

		avgMau: computed('mau', function () {
			var mau = get(this, 'mau');
			return _.mapValues(mau, function (it, k) {
				return it.reduce(function (acc, d) {
					return acc + d.value;
				}, 0) / mau[k].length;
			});
		}),
		avgDau: computed('dau', function () {
			var dau = get(this, 'dau');
			return _.mapValues(dau, function (it, k) {
				return it.reduce(function (acc, d) {
					return acc + d.value;
				}, 0) / dau[k].length;
			});
		}),
		avgHours: computed('hours', function () {
			var hours = get(this, 'hours');
			return _.mapValues(hours, function (it, k) {
				return it.reduce(function (acc, d) {
					return acc + d.value;
				}, 0) / hours[k].length;
			});
		}),
		avgSubscribers: computed('subscribers', function () {
			var subscribers = get(this, 'subscribers');
			return subscribers.reduce(function (acc, d) {
				return acc + d.value;
			}, 0) / get(subscribers, 'length');
		}),

		lastMau: computed('mau', function () {
			return _.mapValues(get(this, 'mau'), function (arr) {
				return arr[arr.length - 1].value;
			});
		}),
		lastDau: computed('dau', function () {
			return _.mapValues(get(this, 'dau'), function (arr) {
				return arr[arr.length - 1].value;
			});
		}),
		lastHours: computed('hours', function () {
			return _.mapValues(get(this, 'hours'), function (arr) {
				return arr[arr.length - 1].value;
			});
		}),
		lastSubscribers: computed('subscribers', function () {
			var subscribers = get(this, 'subscribers');
			return subscribers[subscribers.length - 1].value;
		}),

		mauGrowth: computed('mau', function () {
			var mau = get(this, 'mau');
			return _.mapValues(mau, function (it, k) {
				return it[it.length - 1].value / it[0].value - 1;
			});
		}),
		dauGrowth: computed('dau', function () {
			var dau = get(this, 'dau');
			return _.mapValues(dau, function (it, k) {
				return it[it.length - 1].value / it[0].value - 1;
			});
		}),
		hoursGrowth: computed('hours', function () {
			var hours = get(this, 'hours');
			return _.mapValues(hours, function (it, k) {
				return it[it.length - 1].value / it[0].value - 1;
			});
		}),
		subscribersGrowth: computed('subscribers', function () {
			var subscribers = get(this, 'subscribers');
			return subscribers[subscribers.length - 1].value / subscribers[0].value - 1;
		})
	});
});
define('kpis/resolver', ['exports', 'ember-resolver'], function (exports, _emberResolver) {
  exports['default'] = _emberResolver['default'];
});
define('kpis/router', ['exports', 'ember', 'kpis/config/environment'], function (exports, _ember, _kpisConfigEnvironment) {

  var Router = _ember['default'].Router.extend({
    location: _kpisConfigEnvironment['default'].locationType,
    rootURL: _kpisConfigEnvironment['default'].rootURL
  });

  Router.map(function () {});

  exports['default'] = Router;
});
define('kpis/routes/application', ['exports', 'ember', 'kpis/utils/http'], function (exports, _ember, _kpisUtilsHttp) {
	var RSVP = _ember['default'].RSVP;
	var get = _ember['default'].get;
	var computed = _ember['default'].computed;
	var set = _ember['default'].set;
	var setProperties = _ember['default'].setProperties;

	/* global d3, _, topojson */

	exports['default'] = _ember['default'].Route.extend({
		parseTime: computed(function () {
			return d3.timeParse('%m/%d/%Y');
		}),

		model: function model(transition, params) {
			var _this = this;

			var parseTime = get(this, 'parseTime');

			return RSVP.all([(0, _kpisUtilsHttp.getCSV)('KPIsdata-Simulated.csv'), (0, _kpisUtilsHttp.getCSV)('wikipedia-iso-country-codes.csv'), (0, _kpisUtilsHttp.getJSON)('world-110m.json')]).then(function (values) {
				var color = d3.scaleOrdinal(d3.schemeCategory20).domain(values[0].map(function (d) {
					return d.code;
				}));

				var kpis = _.mapValues(_.groupBy(values[0], 'Country'), function (d) {
					return {
						code: d[0].Country,
						name: d[0]['Country Name'],
						region: d[0]['Region Name'] === 'Australia - New Zealand' ? 'Oceania' : d[0]['Region Name'],
						color: color(d[0].Country),
						mau: _.mapValues(_.groupBy(d, 'Product'), function (it) {
							return it.map(function (e) {
								return { date: parseTime(e['Date']), value: +e['Monthly Active Users'] };
							});
						}),
						dau: _.mapValues(_.groupBy(d, 'Product'), function (it) {
							return it.map(function (e) {
								return { date: parseTime(e['Date']), value: +e['Daily Active Users'] };
							});
						}),
						hours: _.mapValues(_.groupBy(d, 'Product'), function (it) {
							return it.map(function (e) {
								return { date: parseTime(e['Date']), value: +e['Total Content Hours'] };
							});
						}),
						subscribers: d.filter(function (e) {
							return e.Product === 'paid';
						}).map(function (e) {
							return { date: parseTime(e['Date']), value: +e.Subscribers };
						})
					};
				});

				var countryNames = _.keyBy(values[1], function (d) {
					return +d['Numeric code'];
				});
				var geoFeatures = _.keyBy(topojson.feature(values[2], values[2].objects.countries).features, 'id');
				var features = _.keyBy(_.merge(geoFeatures, countryNames), 'Alpha-2 code');

				return get(_this, 'store').push({
					data: _.values(_.merge(features, kpis)).filter(function (d) {
						return d.id;
					}).map(function (d) {
						return {
							type: 'country',
							id: d.id,
							attributes: d
						};
					})
				});
			});
		},

		setupController: function setupController(controller, model) {
			var selected = controller.get('selectedCodes').map(function (code) {
				return model.findBy('code', code);
			});
			selected.forEach(function (d) {
				set(d, 'selected', true);
			});
			controller.setProperties({
				selected: selected,
				model: model
			});
		}
	});
});
define('kpis/services/ajax', ['exports', 'ember-ajax/services/ajax'], function (exports, _emberAjaxServicesAjax) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberAjaxServicesAjax['default'];
    }
  });
});
define("kpis/services/liquid-fire-transitions", ["exports", "liquid-fire/transition-map"], function (exports, _liquidFireTransitionMap) {
  exports["default"] = _liquidFireTransitionMap["default"];
});
define('kpis/services/text-measurer', ['exports', 'ember-text-measurer/services/text-measurer'], function (exports, _emberTextMeasurerServicesTextMeasurer) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _emberTextMeasurerServicesTextMeasurer['default'];
    }
  });
});
define("kpis/templates/application", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "FGhcDpog", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"main container-fluid\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-xs-8\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"title\"],[\"flush-element\"],[\"text\",\"BUSINESS DASHBOARD\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-xs-4\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"disclaimer pull-right\"],[\"flush-element\"],[\"text\",\"Disclaimer: dashboard shows dummy data\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"hr\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-xs-9\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"style\",\"min-height:28px;\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"selected\"]]],null,9],[\"text\",\"\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-xs-3\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"append\",[\"helper\",[\"navigable-select\"],null,[[\"options\",\"onchange\"],[[\"get\",[\"countrySelection\"]],[\"helper\",[\"action\"],[[\"get\",[null]],\"select\"],null]]]],false],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-xs-6\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-xs-12\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"world-map\"],null,[[\"data\",\"onhighlight\",\"ondehighlight\",\"onselect\",\"ondeselect\"],[[\"get\",[\"model\"]],[\"helper\",[\"action\"],[[\"get\",[null]],\"highlight\"],null],[\"helper\",[\"action\"],[[\"get\",[null]],\"dehighlight\"],null],[\"helper\",[\"action\"],[[\"get\",[null]],\"select\"],null],[\"helper\",[\"action\"],[[\"get\",[null]],\"deselect\"],null]]]],false],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-xs-12\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"fancy-table\"],null,[[\"countries\",\"highlighted\",\"sortBy\",\"sortDir\",\"subscribersSort\",\"mauPaidSort\",\"mauFreeSort\",\"dauPaidSort\",\"dauFreeSort\",\"hoursPaidSort\",\"hoursFreeSort\",\"ontogglesort\",\"onsort\"],[[\"get\",[\"countries\"]],[\"get\",[\"highlighted\"]],[\"get\",[\"sortBy\"]],[\"get\",[\"sortDir\"]],[\"get\",[\"subscribersSort\"]],[\"get\",[\"mauPaidSort\"]],[\"get\",[\"mauFreeSort\"]],[\"get\",[\"dauPaidSort\"]],[\"get\",[\"dauFreeSort\"]],[\"get\",[\"hoursPaidSort\"]],[\"get\",[\"hoursFreeSort\"]],[\"helper\",[\"action\"],[[\"get\",[null]],\"toggleSort\"],null],[\"helper\",[\"action\"],[[\"get\",[null]],\"sort\"],null]]],7],[\"text\",\"\\t\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"if\"],[[\"get\",[\"selected\"]]],null,5],[\"text\",\"\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"titlecase\"],[[\"get\",[\"option\"]]],null],false],[\"text\",\"\\n\"]],\"locals\":[\"option\"]},{\"statements\":[[\"text\",\"\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"titlecase\"],[[\"get\",[\"option\"]]],null],false],[\"text\",\"\\n\"]],\"locals\":[\"option\"]},{\"statements\":[[\"text\",\"\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"titlecase\"],[[\"get\",[\"option\"]]],null],false],[\"text\",\"\\n\"]],\"locals\":[\"option\"]},{\"statements\":[[\"text\",\"\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"titlecase\"],[[\"get\",[\"option\"]]],null],false],[\"text\",\"\\n\"]],\"locals\":[\"option\"]},{\"statements\":[[\"text\",\"\\t\\t\\t\\t\\t\\t\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"titlecase\"],[[\"get\",[\"option\"]]],null],false],[\"text\",\"\\n\"]],\"locals\":[\"option\"]},{\"statements\":[[\"text\",\"\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-xs-6\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-xs-12\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-xs-12\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"list-header\"],[\"flush-element\"],[\"text\",\"Subscribers\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"input-group input-group-sm\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"radio-button\"],null,[[\"options\",\"selectedOption\",\"size\",\"onselect\"],[[\"get\",[\"subscribersDimensions\"]],[\"get\",[\"subscribersDimension\"]],\"xs\",[\"helper\",[\"action\"],[[\"get\",[null]],[\"helper\",[\"mut\"],[[\"get\",[\"subscribersDimension\"]]],null]],null]]],4],[\"text\",\"\\t\\t\\t\\t\\t\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-xs-6\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"line-chart\"],null,[[\"data\",\"onhighlight\",\"ondehighlight\"],[[\"get\",[\"subscribers\"]],[\"helper\",[\"action\"],[[\"get\",[null]],\"highlight\"],null],[\"helper\",[\"action\"],[[\"get\",[null]],\"dehighlight\"],null]]]],false],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-xs-6\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"scatter-plot\"],null,[[\"data\",\"onhighlight\",\"ondehighlight\"],[[\"get\",[\"subscribers\"]],[\"helper\",[\"action\"],[[\"get\",[null]],\"highlight\"],null],[\"helper\",[\"action\"],[[\"get\",[null]],\"dehighlight\"],null]]]],false],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-xs-12\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-xs-12\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"list-header\"],[\"flush-element\"],[\"text\",\"Active Users\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"input-group input-group-sm\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"radio-button\"],null,[[\"options\",\"selectedOption\",\"size\",\"onselect\"],[[\"get\",[\"products\"]],[\"get\",[\"activeUserProduct\"]],\"xs\",[\"helper\",[\"action\"],[[\"get\",[null]],[\"helper\",[\"mut\"],[[\"get\",[\"activeUserProduct\"]]],null]],null]]],3],[\"text\",\"\\t\\t\\t\\t\\t\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"input-group input-group-sm\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"radio-button\"],null,[[\"options\",\"selectedOption\",\"size\",\"onselect\"],[[\"get\",[\"timeWindows\"]],[\"get\",[\"activeUserTimeWindow\"]],\"xs\",[\"helper\",[\"action\"],[[\"get\",[null]],[\"helper\",[\"mut\"],[[\"get\",[\"activeUserTimeWindow\"]]],null]],null]]],2],[\"text\",\"\\t\\t\\t\\t\\t\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-xs-6\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"line-chart\"],null,[[\"data\",\"onhighlight\",\"ondehighlight\"],[[\"get\",[\"activeUsers\"]],[\"helper\",[\"action\"],[[\"get\",[null]],\"highlight\"],null],[\"helper\",[\"action\"],[[\"get\",[null]],\"dehighlight\"],null]]]],false],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-xs-6\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"scatter-plot\"],null,[[\"data\",\"onhighlight\",\"ondehighlight\"],[[\"get\",[\"activeUsers\"]],[\"helper\",[\"action\"],[[\"get\",[null]],\"highlight\"],null],[\"helper\",[\"action\"],[[\"get\",[null]],\"dehighlight\"],null]]]],false],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"br\",[]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-xs-12\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-xs-12\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"list-header\"],[\"flush-element\"],[\"text\",\"Content Hours\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"input-group input-group-sm\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"radio-button\"],null,[[\"options\",\"selectedOption\",\"size\",\"onselect\"],[[\"get\",[\"products\"]],[\"get\",[\"contentHoursProduct\"]],\"xs\",[\"helper\",[\"action\"],[[\"get\",[null]],[\"helper\",[\"mut\"],[[\"get\",[\"contentHoursProduct\"]]],null]],null]]],1],[\"text\",\"\\t\\t\\t\\t\\t\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"input-group input-group-sm\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"radio-button\"],null,[[\"options\",\"selectedOption\",\"size\",\"onselect\"],[[\"get\",[\"hoursDimensions\"]],[\"get\",[\"hoursDimension\"]],\"xs\",[\"helper\",[\"action\"],[[\"get\",[null]],[\"helper\",[\"mut\"],[[\"get\",[\"hoursDimension\"]]],null]],null]]],0],[\"text\",\"\\t\\t\\t\\t\\t\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"row\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-xs-6\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"line-chart\"],null,[[\"data\",\"onhighlight\",\"ondehighlight\"],[[\"get\",[\"contentHours\"]],[\"helper\",[\"action\"],[[\"get\",[null]],\"highlight\"],null],[\"helper\",[\"action\"],[[\"get\",[null]],\"dehighlight\"],null]]]],false],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"col-xs-6\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"scatter-plot\"],null,[[\"data\",\"onhighlight\",\"ondehighlight\"],[[\"get\",[\"contentHours\"]],[\"helper\",[\"action\"],[[\"get\",[null]],\"highlight\"],null],[\"helper\",[\"action\"],[[\"get\",[null]],\"dehighlight\"],null]]]],false],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\\t\\t\\t\\t\\t\"],[\"append\",[\"helper\",[\"table-row\"],null,[[\"country\",\"onhighlight\",\"ondehighlight\",\"onselect\",\"ondeselect\"],[[\"get\",[\"row\"]],[\"helper\",[\"action\"],[[\"get\",[null]],\"highlight\"],null],[\"helper\",[\"action\"],[[\"get\",[null]],\"dehighlight\"],null],[\"helper\",[\"action\"],[[\"get\",[null]],\"select\"],null],[\"helper\",[\"action\"],[[\"get\",[null]],\"deselect\"],null]]]],false],[\"text\",\"\\n\"]],\"locals\":[\"row\"]},{\"statements\":[[\"block\",[\"each\"],[[\"get\",[\"rows\"]]],null,6]],\"locals\":[\"rows\"]},{\"statements\":[[\"text\",\"\\t\\t\\t\\t\\t\\t\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"country-name\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"country\",\"name\"]],false],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\\t\\t\"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"remove glyphicon glyphicon-remove-sign glyphicon-white\"],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"action\"],[[\"get\",[null]],\"deselect\",[\"get\",[\"country\"]]],null],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"country-tag\"],null,[[\"country\",\"onhighlight\",\"ondehighlight\"],[[\"get\",[\"country\"]],[\"helper\",[\"action\"],[[\"get\",[null]],\"highlight\"],null],[\"helper\",[\"action\"],[[\"get\",[null]],\"dehighlight\"],null]]],8]],\"locals\":[\"country\"]}],\"hasPartials\":false}", "meta": { "moduleName": "kpis/templates/application.hbs" } });
});
define("kpis/templates/components/animated-options", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "G1cudU2M", "block": "{\"statements\":[[\"block\",[\"liquid-bind\"],[[\"get\",[\"options\"]]],[[\"rules\",\"enableGrowth\"],[[\"get\",[\"animationRules\"]],[\"get\",[\"enableGrowth\"]]]],1]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[{\"statements\":[[\"text\",\"\\t\\t\"],[\"open-element\",\"li\",[]],[\"static-attr\",\"class\",\"ember-power-select-option\"],[\"dynamic-attr\",\"aria-selected\",[\"concat\",[[\"helper\",[\"ember-power-select-is-selected\"],[[\"get\",[\"opt\"]],[\"get\",[\"select\",\"selected\"]]],null]]]],[\"dynamic-attr\",\"aria-disabled\",[\"helper\",[\"ember-power-select-true-string-if-present\"],[[\"get\",[\"opt\",\"disabled\"]]],null],null],[\"dynamic-attr\",\"aria-current\",[\"concat\",[[\"helper\",[\"eq\"],[[\"get\",[\"opt\"]],[\"get\",[\"select\",\"highlighted\"]]],null]]]],[\"dynamic-attr\",\"data-option-index\",[\"concat\",[[\"unknown\",[\"groupIndex\"]],[\"get\",[\"index\"]]]]],[\"static-attr\",\"role\",\"option\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"yield\",\"default\",[[\"get\",[\"opt\"]],[\"get\",[\"select\"]]]],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"opt\",\"index\"]},{\"statements\":[[\"block\",[\"each\"],[[\"get\",[\"currentOptions\"]]],null,0]],\"locals\":[\"currentOptions\"]}],\"hasPartials\":false}", "meta": { "moduleName": "kpis/templates/components/animated-options.hbs" } });
});
define("kpis/templates/components/fancy-table", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "r2xVEB/n", "block": "{\"statements\":[[\"open-element\",\"div\",[]],[\"static-attr\",\"class\",\"legend\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"legend-item\"],[\"flush-element\"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-flash growth\"],[\"flush-element\"],[\"close-element\"],[\"text\",\": Will sort by growth\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"legend-item\"],[\"flush-element\"],[\"text\",\"MAU: Monthly Active Users\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"legend-item\"],[\"flush-element\"],[\"text\",\"DAU: Daily Active Users\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"class\",\"legend-item\"],[\"static-attr\",\"style\",\"border:none;\"],[\"flush-element\"],[\"text\",\"TCH: Total Content Hours\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"table\",[]],[\"static-attr\",\"class\",\"table table-condensed first-layer\"],[\"static-attr\",\"style\",\"margin-bottom: -9px;\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"thead\",[]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"th\",[]],[\"static-attr\",\"class\",\"col-xs-1\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"th\",[]],[\"static-attr\",\"class\",\"col-xs-1\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"th\",[]],[\"static-attr\",\"class\",\"col-xs-1 left-aligned\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"th\",[]],[\"static-attr\",\"class\",\"col-xs-2 text-center helpable left-aligned\"],[\"static-attr\",\"title\",\"Monthly Active Users\"],[\"flush-element\"],[\"text\",\"MAU\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"th\",[]],[\"static-attr\",\"class\",\"col-xs-2 text-center helpable left-aligned\"],[\"static-attr\",\"title\",\"Daily Active Users\"],[\"flush-element\"],[\"text\",\"DAU\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"th\",[]],[\"static-attr\",\"class\",\"col-xs-2 text-center helpable left-aligned\"],[\"static-attr\",\"title\",\"Total Content Hours\"],[\"flush-element\"],[\"text\",\"TCH\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"table\",[]],[\"static-attr\",\"class\",\"table table-condensed\"],[\"static-attr\",\"style\",\"margin-bottom:0px;\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"thead\",[]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"tr\",[]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"th\",[]],[\"static-attr\",\"class\",\"col-xs-1\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\tCountry\\n\"],[\"block\",[\"if\"],[[\"helper\",[\"eq\"],[[\"get\",[\"sortBy\"]],\"name\"],null]],null,19,18],[\"text\",\"\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"th\",[]],[\"static-attr\",\"class\",\"col-xs-1\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\tRegion\\n\"],[\"block\",[\"if\"],[[\"helper\",[\"eq\"],[[\"get\",[\"sortBy\"]],\"region\"],null]],null,17,16],[\"text\",\"\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"th\",[]],[\"static-attr\",\"class\",\"col-xs-1 left-aligned\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\tSubscribers\\n\"],[\"block\",[\"if\"],[[\"helper\",[\"eq\"],[[\"get\",[\"sortBy\"]],[\"get\",[\"subscribersSortProp\"]]],null]],null,15,14],[\"text\",\"\\t\\t\\t\\t\"],[\"open-element\",\"i\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"fa fa-flash clickable \",[\"unknown\",[\"subscribersSort\"]]]]],[\"static-attr\",\"title\",\"Sort by growth\"],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"action\"],[[\"get\",[null]],\"toggleSort\",\"subscribers\"],null],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"th\",[]],[\"static-attr\",\"class\",\"col-xs-1 left-aligned\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\tFree\\n\"],[\"block\",[\"if\"],[[\"helper\",[\"eq\"],[[\"get\",[\"sortBy\"]],[\"get\",[\"mauFreeSortProp\"]]],null]],null,13,12],[\"text\",\"\\t\\t\\t\\t\"],[\"open-element\",\"i\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"fa fa-flash clickable \",[\"unknown\",[\"mauFreeSort\"]]]]],[\"static-attr\",\"title\",\"Sort by growth\"],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"action\"],[[\"get\",[null]],\"toggleSort\",\"mauFree\"],null],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"th\",[]],[\"static-attr\",\"class\",\"col-xs-1 left-aligned\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\tPaid\\n\"],[\"block\",[\"if\"],[[\"helper\",[\"eq\"],[[\"get\",[\"sortBy\"]],[\"get\",[\"mauPaidSortProp\"]]],null]],null,11,10],[\"text\",\"\\t\\t\\t\\t\"],[\"open-element\",\"i\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"fa fa-flash clickable \",[\"unknown\",[\"mauPaidSort\"]]]]],[\"static-attr\",\"title\",\"Sort by growth\"],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"action\"],[[\"get\",[null]],\"toggleSort\",\"mauPaid\"],null],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"th\",[]],[\"static-attr\",\"class\",\"col-xs-1 left-aligned\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\tFree\\n\"],[\"block\",[\"if\"],[[\"helper\",[\"eq\"],[[\"get\",[\"sortBy\"]],[\"get\",[\"dauFreeSortProp\"]]],null]],null,9,8],[\"text\",\"\\t\\t\\t\\t\"],[\"open-element\",\"i\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"fa fa-flash clickable \",[\"unknown\",[\"dauFreeSort\"]]]]],[\"static-attr\",\"title\",\"Sort by growth\"],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"action\"],[[\"get\",[null]],\"toggleSort\",\"dauFree\"],null],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"th\",[]],[\"static-attr\",\"class\",\"col-xs-1 left-aligned\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\tPaid\\n\"],[\"block\",[\"if\"],[[\"helper\",[\"eq\"],[[\"get\",[\"sortBy\"]],[\"get\",[\"dauPaidSortProp\"]]],null]],null,7,6],[\"text\",\"\\t\\t\\t\\t\"],[\"open-element\",\"i\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"fa fa-flash clickable \",[\"unknown\",[\"dauPaidSort\"]]]]],[\"static-attr\",\"title\",\"Sort by growth\"],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"action\"],[[\"get\",[null]],\"toggleSort\",\"dauPaid\"],null],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"th\",[]],[\"static-attr\",\"class\",\"col-xs-1 left-aligned\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\tFree\\n\"],[\"block\",[\"if\"],[[\"helper\",[\"eq\"],[[\"get\",[\"sortBy\"]],[\"get\",[\"hoursFreeSortProp\"]]],null]],null,5,4],[\"text\",\"\\t\\t\\t\\t\"],[\"open-element\",\"i\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"fa fa-flash clickable \",[\"unknown\",[\"hoursFreeSort\"]]]]],[\"static-attr\",\"title\",\"Sort by growth\"],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"action\"],[[\"get\",[null]],\"toggleSort\",\"hoursFree\"],null],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"th\",[]],[\"static-attr\",\"class\",\"col-xs-1 left-aligned\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\tPaid\\n\"],[\"block\",[\"if\"],[[\"helper\",[\"eq\"],[[\"get\",[\"sortBy\"]],[\"get\",[\"hoursPaidSortProp\"]]],null]],null,3,2],[\"text\",\"\\t\\t\\t\\t\"],[\"open-element\",\"i\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"fa fa-flash clickable \",[\"unknown\",[\"hoursPaidSort\"]]]]],[\"static-attr\",\"title\",\"Sort by growth\"],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"action\"],[[\"get\",[null]],\"toggleSort\",\"hoursPaid\"],null],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"liquid-bind\"],[[\"get\",[\"page\"]]],null,1],[\"open-element\",\"nav\",[]],[\"static-attr\",\"class\",\"text-center\"],[\"static-attr\",\"style\",\"margin-top:-30px; font-size:10px;\"],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"ul\",[]],[\"static-attr\",\"class\",\"pagination\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"li\",[]],[\"dynamic-attr\",\"class\",[\"helper\",[\"if\"],[[\"helper\",[\"eq\"],[[\"get\",[\"pages\",\"firstObject\"]],1],null],\"disabled\"],null],null],[\"modifier\",[\"action\"],[[\"get\",[null]],\"decrementPage\"]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"\"],[\"static-attr\",\"aria-label\",\"Previous\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"text\",\"«\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"pages\"]]],null,0],[\"text\",\"\\t\\t\"],[\"open-element\",\"li\",[]],[\"dynamic-attr\",\"class\",[\"helper\",[\"if\"],[[\"helper\",[\"eq\"],[[\"get\",[\"pages\",\"lastObject\"]],[\"get\",[\"totalPages\"]]],null],\"disabled\"],null],null],[\"modifier\",[\"action\"],[[\"get\",[null]],\"incrementPage\"]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"\"],[\"static-attr\",\"aria-label\",\"Next\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"span\",[]],[\"static-attr\",\"aria-hidden\",\"true\"],[\"flush-element\"],[\"text\",\"»\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[{\"statements\":[[\"text\",\"\\t\\t\\t\"],[\"open-element\",\"li\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[[\"helper\",[\"if\"],[[\"helper\",[\"eq\"],[[\"get\",[\"page\"]],[\"get\",[\"p\"]]],null],\"active\"],null]]]],[\"modifier\",[\"action\"],[[\"get\",[null]],\"setPage\",[\"get\",[\"p\"]]]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"a\",[]],[\"static-attr\",\"href\",\"\"],[\"flush-element\"],[\"append\",[\"get\",[\"p\"]],false],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"p\"]},{\"statements\":[[\"text\",\"\\t\"],[\"open-element\",\"table\",[]],[\"static-attr\",\"class\",\"table table-condensed\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"tbody\",[]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"yield\",\"default\",[[\"get\",[\"rows\"]]]],[\"text\",\"\\n\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\\t\\t\\t\"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-sort clickable\"],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"action\"],[[\"get\",[null]],\"sort\",[\"get\",[\"hoursPaidSortProp\"]]],null],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\\t\\t\\t\"],[\"open-element\",\"i\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"fa fa-sort-\",[\"unknown\",[\"sortDir\"]],\" clickable\"]]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"action\"],[[\"get\",[null]],\"sort\",[\"get\",[\"hoursPaidSortProp\"]]],null],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\\t\\t\\t\"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-sort clickable\"],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"action\"],[[\"get\",[null]],\"sort\",[\"get\",[\"hoursFreeSortProp\"]]],null],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\\t\\t\\t\"],[\"open-element\",\"i\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"fa fa-sort-\",[\"unknown\",[\"sortDir\"]],\" clickable\"]]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"action\"],[[\"get\",[null]],\"sort\",[\"get\",[\"hoursFreeSortProp\"]]],null],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\\t\\t\\t\"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-sort clickable\"],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"action\"],[[\"get\",[null]],\"sort\",[\"get\",[\"dauPaidSortProp\"]]],null],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\\t\\t\\t\"],[\"open-element\",\"i\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"fa fa-sort-\",[\"unknown\",[\"sortDir\"]],\" clickable\"]]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"action\"],[[\"get\",[null]],\"sort\",[\"get\",[\"dauPaidSortProp\"]]],null],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\\t\\t\\t\"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-sort clickable\"],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"action\"],[[\"get\",[null]],\"sort\",[\"get\",[\"dauFreeSortProp\"]]],null],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\\t\\t\\t\"],[\"open-element\",\"i\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"fa fa-sort-\",[\"unknown\",[\"sortDir\"]],\" clickable\"]]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"action\"],[[\"get\",[null]],\"sort\",[\"get\",[\"dauFreeSortProp\"]]],null],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\\t\\t\\t\"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-sort clickable\"],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"action\"],[[\"get\",[null]],\"sort\",[\"get\",[\"mauPaidSortProp\"]]],null],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\\t\\t\\t\"],[\"open-element\",\"i\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"fa fa-sort-\",[\"unknown\",[\"sortDir\"]],\" clickable\"]]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"action\"],[[\"get\",[null]],\"sort\",[\"get\",[\"mauPaidSortProp\"]]],null],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\\t\\t\\t\"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-sort clickable\"],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"action\"],[[\"get\",[null]],\"sort\",[\"get\",[\"mauFreeSortProp\"]]],null],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\\t\\t\\t\"],[\"open-element\",\"i\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"fa fa-sort-\",[\"unknown\",[\"sortDir\"]],\" clickable\"]]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"action\"],[[\"get\",[null]],\"sort\",[\"get\",[\"mauFreeSortProp\"]]],null],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\\t\\t\\t\"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-sort clickable\"],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"action\"],[[\"get\",[null]],\"sort\",[\"get\",[\"subscribersSortProp\"]]],null],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\\t\\t\\t\"],[\"open-element\",\"i\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"fa fa-sort-\",[\"unknown\",[\"sortDir\"]],\" clickable\"]]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"action\"],[[\"get\",[null]],\"sort\",[\"get\",[\"subscribersSortProp\"]]],null],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\\t\\t\\t\"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-sort clickable\"],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"action\"],[[\"get\",[null]],\"sort\",\"region\"],null],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\\t\\t\\t\"],[\"open-element\",\"i\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"fa fa-sort-\",[\"unknown\",[\"sortDir\"]],\" clickable\"]]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"action\"],[[\"get\",[null]],\"sort\",\"region\"],null],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\\t\\t\\t\"],[\"open-element\",\"i\",[]],[\"static-attr\",\"class\",\"fa fa-sort clickable\"],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"action\"],[[\"get\",[null]],\"sort\",\"name\"],null],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\\t\\t\\t\"],[\"open-element\",\"i\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"fa fa-sort-\",[\"unknown\",[\"sortDir\"]],\" clickable\"]]],[\"dynamic-attr\",\"onclick\",[\"helper\",[\"action\"],[[\"get\",[null]],\"sort\",\"name\"],null],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "kpis/templates/components/fancy-table.hbs" } });
});
define("kpis/templates/components/line-chart", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "i+UWZMZX", "block": "{\"statements\":[[\"open-element\",\"g\",[]],[\"dynamic-attr\",\"transform\",[\"concat\",[\"translate(\",[\"unknown\",[\"margin\",\"left\"]],\",\",[\"unknown\",[\"margin\",\"top\"]],\")\"]]],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"g\",[]],[\"static-attr\",\"class\",\"axis axis--x\"],[\"dynamic-attr\",\"transform\",[\"concat\",[\"translate(0,\",[\"unknown\",[\"chartH\"]],\")\"]]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"g\",[]],[\"static-attr\",\"class\",\"axis axis--y\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"g\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"series\"]]],null,2],[\"text\",\"\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"block\",[\"unless\"],[[\"helper\",[\"eq\"],[[\"get\",[\"series\",\"length\"]],1],null]],null,1],[\"text\",\"\\t\"],[\"open-element\",\"g\",[]],[\"static-attr\",\"class\",\"voronoi\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"polygons\"]]],null,0],[\"text\",\"\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"\\t\\t\\t\"],[\"append\",[\"helper\",[\"voronoi-cell\"],null,[[\"cell\",\"onhighlight\",\"ondehighlight\"],[[\"get\",[\"cell\"]],[\"get\",[\"onhighlight\"]],[\"get\",[\"ondehighlight\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[\"cell\"]},{\"statements\":[[\"text\",\"\\t\\t\"],[\"open-element\",\"path\",[]],[\"static-attr\",\"class\",\"average-line\"],[\"dynamic-attr\",\"d\",[\"unknown\",[\"average\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\\t\"],[\"open-element\",\"path\",[]],[\"static-attr\",\"class\",\"line\"],[\"dynamic-attr\",\"d\",[\"unknown\",[\"s\",\"d\"]],null],[\"dynamic-attr\",\"stroke\",[\"unknown\",[\"s\",\"stroke\"]],null],[\"dynamic-attr\",\"stroke-width\",[\"concat\",[[\"helper\",[\"if\"],[[\"get\",[\"s\",\"model\",\"highlighted\"]],4,1],null],\"px\"]]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"s\"]}],\"hasPartials\":false}", "meta": { "moduleName": "kpis/templates/components/line-chart.hbs" } });
});
define("kpis/templates/components/navigable-select", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "8/lBpxxv", "block": "{\"statements\":[[\"block\",[\"power-select\"],null,[[\"options\",\"searchEnabled\",\"selected\",\"placeholder\",\"closeOnSelect\",\"onchange\",\"optionsComponent\"],[[\"get\",[\"transformedOptions\"]],false,[\"get\",[\"selected\"]],\"Pick a country\",false,[\"helper\",[\"action\"],[[\"get\",[null]],\"onchange\"],null],\"animated-options\"]],4]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"\\t\\t\"],[\"append\",[\"unknown\",[\"levelOrOption\",\"name\"]],false],[\"text\",\"\\n\\t\"]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"append\",[\"unknown\",[\"levelOrOption\",\"levelName\"]],false],[\"text\",\" >\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"levelOrOption\",\"levelName\"]]],null,1,0]],\"locals\":[]},{\"statements\":[[\"text\",\"\\t\\t\"],[\"open-element\",\"strong\",[]],[\"flush-element\"],[\"text\",\"< Back\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"levelOrOption\",\"parentLevel\"]]],null,3,2]],\"locals\":[\"levelOrOption\"]}],\"hasPartials\":false}", "meta": { "moduleName": "kpis/templates/components/navigable-select.hbs" } });
});
define("kpis/templates/components/radio-button", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "SaHWkxy+", "block": "{\"statements\":[[\"block\",[\"each\"],[[\"get\",[\"options\"]]],null,0]],\"locals\":[],\"named\":[],\"yields\":[\"default\"],\"blocks\":[{\"statements\":[[\"text\",\"\\t\"],[\"open-element\",\"label\",[]],[\"dynamic-attr\",\"class\",[\"concat\",[\"btn btn-primary \",[\"helper\",[\"if\"],[[\"helper\",[\"eq\"],[[\"get\",[\"option\"]],[\"get\",[\"selectedOption\"]]],null],\"active\"],null]]]],[\"modifier\",[\"action\"],[[\"get\",[null]],[\"get\",[\"onselect\"]],[\"get\",[\"option\"]]],[[\"on\"],[\"click\"]]],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"input\",[]],[\"static-attr\",\"type\",\"radio\"],[\"dynamic-attr\",\"checked\",[\"helper\",[\"eq\"],[[\"get\",[\"option\"]],[\"get\",[\"selectedOption\"]]],null],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\"],[\"yield\",\"default\",[[\"get\",[\"option\"]]]],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"option\"]}],\"hasPartials\":false}", "meta": { "moduleName": "kpis/templates/components/radio-button.hbs" } });
});
define("kpis/templates/components/scatter-plot", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "6f/TGhg1", "block": "{\"statements\":[[\"open-element\",\"g\",[]],[\"dynamic-attr\",\"transform\",[\"concat\",[\"translate(\",[\"unknown\",[\"margin\",\"left\"]],\",\",[\"unknown\",[\"margin\",\"top\"]],\")\"]]],[\"flush-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"g\",[]],[\"static-attr\",\"class\",\"axis axis--x\"],[\"dynamic-attr\",\"transform\",[\"concat\",[\"translate(0,\",[\"unknown\",[\"chartH\"]],\")\"]]],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"g\",[]],[\"static-attr\",\"class\",\"axis axis--y\"],[\"flush-element\"],[\"text\",\"\\n\\t\\t\"],[\"open-element\",\"text\",[]],[\"static-attr\",\"y\",\"-10\"],[\"static-attr\",\"x\",\"2\"],[\"static-attr\",\"dy\",\".71em\"],[\"static-attr\",\"fill\",\"black\"],[\"static-attr\",\"font-weight\",\"bold\"],[\"flush-element\"],[\"text\",\"Growth\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"g\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"unless\"],[[\"helper\",[\"eq\"],[[\"get\",[\"plottableData\",\"length\"]],1],null]],null,3],[\"text\",\"\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"g\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"plottableData\"]]],null,2],[\"text\",\"\\t\"],[\"close-element\"],[\"text\",\"\\n\\t\"],[\"open-element\",\"g\",[]],[\"static-attr\",\"class\",\"voronoi\"],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"polygons\"]]],null,0],[\"text\",\"\\t\"],[\"close-element\"],[\"text\",\"\\n\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"\\t\\t\\t\"],[\"append\",[\"helper\",[\"voronoi-cell\"],null,[[\"cell\",\"onhighlight\",\"ondehighlight\"],[[\"get\",[\"cell\"]],[\"get\",[\"onhighlight\"]],[\"get\",[\"ondehighlight\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[\"cell\"]},{\"statements\":[[\"text\",\"\\t\\t\\t\\t\"],[\"open-element\",\"line\",[]],[\"dynamic-attr\",\"x1\",[\"unknown\",[\"d\",\"x\"]],null],[\"dynamic-attr\",\"y1\",[\"unknown\",[\"d\",\"y\"]],null],[\"dynamic-attr\",\"x2\",[\"unknown\",[\"d\",\"x\"]],null],[\"dynamic-attr\",\"y2\",[\"unknown\",[\"chartH\"]],null],[\"static-attr\",\"stroke\",\"#cccccc\"],[\"static-attr\",\"stroke-width\",\"1\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\\t\"],[\"open-element\",\"line\",[]],[\"static-attr\",\"x1\",\"0\"],[\"dynamic-attr\",\"y1\",[\"unknown\",[\"d\",\"y\"]],null],[\"dynamic-attr\",\"x2\",[\"unknown\",[\"d\",\"x\"]],null],[\"dynamic-attr\",\"y2\",[\"unknown\",[\"d\",\"y\"]],null],[\"static-attr\",\"stroke\",\"#cccccc\"],[\"static-attr\",\"stroke-width\",\"1\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]},{\"statements\":[[\"block\",[\"if\"],[[\"get\",[\"d\",\"model\",\"highlighted\"]]],null,1],[\"text\",\"\\t\\t\\t\"],[\"open-element\",\"circle\",[]],[\"dynamic-attr\",\"cx\",[\"unknown\",[\"d\",\"x\"]],null],[\"dynamic-attr\",\"cy\",[\"unknown\",[\"d\",\"y\"]],null],[\"dynamic-attr\",\"r\",[\"helper\",[\"if\"],[[\"get\",[\"d\",\"model\",\"highlighted\"]],6,3],null],null],[\"dynamic-attr\",\"fill\",[\"unknown\",[\"d\",\"model\",\"color\"]],null],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[\"d\"]},{\"statements\":[[\"text\",\"\\t\\t\\t\"],[\"open-element\",\"line\",[]],[\"dynamic-attr\",\"x1\",[\"unknown\",[\"average\",\"x\"]],null],[\"static-attr\",\"y1\",\"0\"],[\"dynamic-attr\",\"x2\",[\"unknown\",[\"average\",\"x\"]],null],[\"dynamic-attr\",\"y2\",[\"unknown\",[\"chartH\"]],null],[\"static-attr\",\"class\",\"average-line\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\\t\\t\\t\"],[\"open-element\",\"line\",[]],[\"static-attr\",\"x1\",\"0\"],[\"dynamic-attr\",\"y1\",[\"unknown\",[\"average\",\"y\"]],null],[\"dynamic-attr\",\"x2\",[\"unknown\",[\"chartW\"]],null],[\"dynamic-attr\",\"y2\",[\"unknown\",[\"average\",\"y\"]],null],[\"static-attr\",\"class\",\"average-line\"],[\"flush-element\"],[\"close-element\"],[\"text\",\"\\n\"]],\"locals\":[]}],\"hasPartials\":false}", "meta": { "moduleName": "kpis/templates/components/scatter-plot.hbs" } });
});
define("kpis/templates/components/table-row", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "wRaohaXr", "block": "{\"statements\":[[\"open-element\",\"th\",[]],[\"static-attr\",\"class\",\"col-xs-1\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"country\",\"name\"]],false],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"td\",[]],[\"static-attr\",\"class\",\"col-xs-1\"],[\"flush-element\"],[\"append\",[\"unknown\",[\"country\",\"region\"]],false],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"td\",[]],[\"static-attr\",\"class\",\"col-xs-1 left-aligned\"],[\"flush-element\"],[\"append\",[\"helper\",[\"integer-format\"],[[\"get\",[\"country\",\"subscribers\",\"lastObject\",\"value\"]]],null],false],[\"text\",\" (\"],[\"append\",[\"helper\",[\"percent-format\"],[[\"get\",[\"country\",\"subscribersGrowth\"]]],null],false],[\"text\",\")\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"td\",[]],[\"static-attr\",\"class\",\"col-xs-1 left-aligned\"],[\"flush-element\"],[\"append\",[\"helper\",[\"integer-format\"],[[\"get\",[\"country\",\"lastMau\",\"free\"]]],null],false],[\"text\",\" (\"],[\"append\",[\"helper\",[\"percent-format\"],[[\"get\",[\"country\",\"mauGrowth\",\"free\"]]],null],false],[\"text\",\")\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"td\",[]],[\"static-attr\",\"class\",\"col-xs-1 left-aligned\"],[\"flush-element\"],[\"append\",[\"helper\",[\"integer-format\"],[[\"get\",[\"country\",\"mau\",\"paid\",\"lastObject\",\"value\"]]],null],false],[\"text\",\" (\"],[\"append\",[\"helper\",[\"percent-format\"],[[\"get\",[\"country\",\"mauGrowth\",\"paid\"]]],null],false],[\"text\",\")\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"td\",[]],[\"static-attr\",\"class\",\"col-xs-1 left-aligned\"],[\"flush-element\"],[\"append\",[\"helper\",[\"integer-format\"],[[\"get\",[\"country\",\"dau\",\"free\",\"lastObject\",\"value\"]]],null],false],[\"text\",\" (\"],[\"append\",[\"helper\",[\"percent-format\"],[[\"get\",[\"country\",\"dauGrowth\",\"free\"]]],null],false],[\"text\",\")\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"td\",[]],[\"static-attr\",\"class\",\"col-xs-1 left-aligned\"],[\"flush-element\"],[\"append\",[\"helper\",[\"integer-format\"],[[\"get\",[\"country\",\"dau\",\"paid\",\"lastObject\",\"value\"]]],null],false],[\"text\",\" (\"],[\"append\",[\"helper\",[\"percent-format\"],[[\"get\",[\"country\",\"dauGrowth\",\"paid\"]]],null],false],[\"text\",\")\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"td\",[]],[\"static-attr\",\"class\",\"col-xs-1 left-aligned\"],[\"flush-element\"],[\"append\",[\"helper\",[\"integer-format\"],[[\"get\",[\"country\",\"hours\",\"free\",\"lastObject\",\"value\"]]],null],false],[\"text\",\" (\"],[\"append\",[\"helper\",[\"percent-format\"],[[\"get\",[\"country\",\"hoursGrowth\",\"free\"]]],null],false],[\"text\",\")\"],[\"close-element\"],[\"text\",\"\\n\"],[\"open-element\",\"td\",[]],[\"static-attr\",\"class\",\"col-xs-1 left-aligned\"],[\"flush-element\"],[\"append\",[\"helper\",[\"integer-format\"],[[\"get\",[\"country\",\"hours\",\"paid\",\"lastObject\",\"value\"]]],null],false],[\"text\",\" (\"],[\"append\",[\"helper\",[\"percent-format\"],[[\"get\",[\"country\",\"hoursGrowth\",\"paid\"]]],null],false],[\"text\",\")\"],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[],\"hasPartials\":false}", "meta": { "moduleName": "kpis/templates/components/table-row.hbs" } });
});
define("kpis/templates/components/world-map", ["exports"], function (exports) {
  exports["default"] = Ember.HTMLBars.template({ "id": "DxE2vz0D", "block": "{\"statements\":[[\"open-element\",\"g\",[]],[\"flush-element\"],[\"text\",\"\\n\"],[\"block\",[\"each\"],[[\"get\",[\"shapes\"]]],null,0],[\"close-element\"]],\"locals\":[],\"named\":[],\"yields\":[],\"blocks\":[{\"statements\":[[\"text\",\"\\t\\t\"],[\"append\",[\"helper\",[\"country-shape\"],null,[[\"d\",\"country\",\"onhighlight\",\"ondehighlight\",\"onselect\",\"ondeselect\"],[[\"get\",[\"shape\",\"path\"]],[\"get\",[\"shape\",\"props\"]],[\"get\",[\"onhighlight\"]],[\"get\",[\"ondehighlight\"]],[\"get\",[\"onselect\"]],[\"get\",[\"ondeselect\"]]]]],false],[\"text\",\"\\n\"]],\"locals\":[\"shape\"]}],\"hasPartials\":false}", "meta": { "moduleName": "kpis/templates/components/world-map.hbs" } });
});
define("kpis/transitions", ["exports"], function (exports) {
	exports["default"] = function () {
		this.transition(this.inHelper("liquid-bind"), this.toValue(function (newValue, oldValue) {
			return newValue < oldValue;
		}), this.use("toRight", { duration: 200 }), this.reverse("toLeft", { duration: 200 }));
	};

	;
});
define('kpis/transitions/cross-fade', ['exports', 'liquid-fire/transitions/cross-fade'], function (exports, _liquidFireTransitionsCrossFade) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsCrossFade['default'];
    }
  });
});
define('kpis/transitions/default', ['exports', 'liquid-fire/transitions/default'], function (exports, _liquidFireTransitionsDefault) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsDefault['default'];
    }
  });
});
define('kpis/transitions/explode', ['exports', 'liquid-fire/transitions/explode'], function (exports, _liquidFireTransitionsExplode) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsExplode['default'];
    }
  });
});
define('kpis/transitions/fade', ['exports', 'liquid-fire/transitions/fade'], function (exports, _liquidFireTransitionsFade) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsFade['default'];
    }
  });
});
define('kpis/transitions/flex-grow', ['exports', 'liquid-fire/transitions/flex-grow'], function (exports, _liquidFireTransitionsFlexGrow) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsFlexGrow['default'];
    }
  });
});
define('kpis/transitions/fly-to', ['exports', 'liquid-fire/transitions/fly-to'], function (exports, _liquidFireTransitionsFlyTo) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsFlyTo['default'];
    }
  });
});
define('kpis/transitions/move-over', ['exports', 'liquid-fire/transitions/move-over'], function (exports, _liquidFireTransitionsMoveOver) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsMoveOver['default'];
    }
  });
});
define('kpis/transitions/scale', ['exports', 'liquid-fire/transitions/scale'], function (exports, _liquidFireTransitionsScale) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsScale['default'];
    }
  });
});
define('kpis/transitions/scroll-then', ['exports', 'liquid-fire/transitions/scroll-then'], function (exports, _liquidFireTransitionsScrollThen) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsScrollThen['default'];
    }
  });
});
define('kpis/transitions/to-down', ['exports', 'liquid-fire/transitions/to-down'], function (exports, _liquidFireTransitionsToDown) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsToDown['default'];
    }
  });
});
define('kpis/transitions/to-left', ['exports', 'liquid-fire/transitions/to-left'], function (exports, _liquidFireTransitionsToLeft) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsToLeft['default'];
    }
  });
});
define('kpis/transitions/to-right', ['exports', 'liquid-fire/transitions/to-right'], function (exports, _liquidFireTransitionsToRight) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsToRight['default'];
    }
  });
});
define('kpis/transitions/to-up', ['exports', 'liquid-fire/transitions/to-up'], function (exports, _liquidFireTransitionsToUp) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsToUp['default'];
    }
  });
});
define('kpis/transitions/wait', ['exports', 'liquid-fire/transitions/wait'], function (exports, _liquidFireTransitionsWait) {
  Object.defineProperty(exports, 'default', {
    enumerable: true,
    get: function get() {
      return _liquidFireTransitionsWait['default'];
    }
  });
});
define('kpis/utils/http', ['exports', 'ember'], function (exports, _ember) {
	exports.getJSON = getJSON;
	exports.getCSV = getCSV;
	exports.getTSV = getTSV;

	/* global d3 */

	var RSVP = _ember['default'].RSVP;
	var Promise = RSVP.Promise;

	function getJSON(url) {
		return new Promise(function (resolve, reject) {
			var xhr = new XMLHttpRequest();

			xhr.open('GET', url);
			xhr.onreadystatechange = handler;
			xhr.responseType = 'json';
			xhr.setRequestHeader('Accept', 'application/json');
			xhr.send();

			function handler() {
				if (this.readyState === this.DONE) {
					if (this.status === 200) {
						resolve(this.response);
					} else {
						reject(new Error('getJSON: `' + url + '` failed with status: [' + this.status + ']'));
					}
				}
			};
		});
	}

	;

	function getCSV(url) {
		return new Promise(function (resolve, reject) {
			d3.csv(url, function (err, data) {
				if (err) reject(err);else resolve(data);
			});
		});
	}

	;

	function getTSV(url) {
		return new Promise(function (resolve, reject) {
			d3.tsv(url, function (err, data) {
				if (err) reject(err);else resolve(data);
			});
		});
	}

	;

	exports['default'] = {
		getJSON: getJSON,
		getCSV: getCSV,
		getTSV: getTSV
	};
});
/* jshint ignore:start */



/* jshint ignore:end */

/* jshint ignore:start */

define('kpis/config/environment', ['ember'], function(Ember) {
  var prefix = 'kpis';
/* jshint ignore:start */

try {
  var metaName = prefix + '/config/environment';
  var rawConfig = document.querySelector('meta[name="' + metaName + '"]').getAttribute('content');
  var config = JSON.parse(unescape(rawConfig));

  var exports = { 'default': config };

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;
}
catch(err) {
  throw new Error('Could not read config from meta tag with name "' + metaName + '".');
}

/* jshint ignore:end */

});

/* jshint ignore:end */

/* jshint ignore:start */

if (!runningTests) {
  require("kpis/app")["default"].create({"name":"kpis","version":"0.0.0+870964c0"});
}

/* jshint ignore:end */
//# sourceMappingURL=kpis.map

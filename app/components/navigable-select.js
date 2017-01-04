import Ember from 'ember';

const { get, computed } = Ember;

export default Ember.Component.extend({
	transformedOptions: computed('options.[]', {
		get() {
			return (function walker(options, parentLevel = null) {
				let results = Ember.A();

				results.toArray = () => results;

				let len = get(options, 'length');
				parentLevel = parentLevel || { root: true };
				for (let i = 0; i < len; i++) {
					let opt = get(options, `${i}`);
					let groupName = get(opt, 'groupName');
					if (groupName) {
						let level = { levelName: groupName };
						let optionsWithBack = Ember.A([{ parentLevel }]).concat(get(opt, 'options'));
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
		set(key, value) {
			return value;
		}
	}),

	actions: {
		onchange(levelOrOption, dropdown) {
			if (get(levelOrOption, 'levelName')) {
				this.set('transformedOptions', get(levelOrOption, 'options'));
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
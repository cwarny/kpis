import Ember from 'ember';

export default Ember.Helper.helper(([value]) => {
	let newValue = '';
	for (let c of value) {
		if (c == c.toUpperCase()) {
			newValue += (' ' + c);
		} else {
			newValue += c;
		}
	}
	return newValue.charAt(0).toUpperCase() + newValue.substr(1).toLowerCase()
});
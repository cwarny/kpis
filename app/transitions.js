export default function() {
	this.transition(
		this.inHelper("liquid-bind"),
		this.toValue(function(newValue, oldValue) {
			return newValue < oldValue;
		}),
		this.use("toRight", { duration: 200 }),
		this.reverse("toLeft", { duration: 200 })
	);
};
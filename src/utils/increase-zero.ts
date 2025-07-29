export function increaseZero(value: number) {
	if (value.toString().length === 1) {
		return `0${value}`;
	} else {
		return value;
	}
}

import { increaseZero } from "./increase-zero";

export function getDate(date: Date, extended = true) {
	const dateObj = new Date(date);
	const year = dateObj.getFullYear();
	const month = dateObj.getMonth();

	const monthList = [
		"janeiro",
		"fevereiro",
		"março",
		"abril",
		"maio",
		"junho",
		"julho",
		"agosto",
		"setembro",
		"outubro",
		"novembro",
		"dezembro",
	];

	const day = dateObj.getDate();
	const hour = dateObj.getHours();
	const minutes = dateObj.getMinutes();

	if (!extended) {
		return `${increaseZero(day)}/${increaseZero(month)}/${year}`;
	}

	return `${day} de ${monthList[month]} de ${year} às ${increaseZero(hour)}:${increaseZero(minutes)}`;
}

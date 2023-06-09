function increaseZero(number) {
    if (number.toString().length == 1) {
        return "0" + number;
    } else {
        return number;
    }
}

function getDate(date, extended=true) {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    const month = dateObj.getMonth();

    let monthList = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];


    const day = dateObj.getDate();
    const hour = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    if (!extended) {
        return `${increaseZero(day)}/${increaseZero(month)}/${year}`;
    }

    return `${day} de ${monthList[month]} de ${year} às ${increaseZero(hour)}:${increaseZero(minutes)}`;
}

module.exports = getDate;
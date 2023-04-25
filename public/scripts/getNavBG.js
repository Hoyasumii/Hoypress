var navBg = getComputedStyle(document.getElementsByClassName(`navbar`)[0]).getPropertyValue(`background-color`);

document.styleSheets.item(2).insertRule(
    `.current-button { background-color: ${navBg}; transition: filter 300ms; }`
);
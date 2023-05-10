const getNavBG = () => {
    var navBg = getComputedStyle(document.getElementsByClassName(`navbar`)[0]).getPropertyValue(`background-color`);

    document.styleSheets.item(2).insertRule(
        `.navigation-footer-button { background-color: ${navBg}; transition: filter 300ms; border: 0.800px solid ${navBg}; }`
    );
}

getNavBG();

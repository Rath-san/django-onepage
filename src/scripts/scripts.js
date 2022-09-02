(() => {
    const onWindowLoad = () => {
        handleTopNav().init();
    };

    window.addEventListener("load", onWindowLoad);
})();

const handleTopNav = () => {
    const ACTIVE_CLASS = "active";
    const topNav = document.getElementById("topNav");

    const linksWrapper = topNav.querySelector(".borderDiv");
    const toggleBtn = topNav.querySelector(".borderDiv__nav");
    const linksList = topNav.querySelector(".borderDiv__links");
    const links = Array.from(linksList.querySelectorAll("a"));

    let linksHeight = linksList.scrollHeight;

    const toggleActive = () => {
        if (linksWrapper.classList.contains(ACTIVE_CLASS)) {
            linksWrapper.classList.remove(ACTIVE_CLASS);
            linksList.style.height = 0 + "px";
        } else {
            linksWrapper.classList.add(ACTIVE_CLASS);
            linksList.style.height = linksHeight + "px";
        }
    };

    const calcHeight = () => {
        if (window.innerWidth < 1260) {
            linksWrapper.classList.remove(ACTIVE_CLASS);
            linksHeight = linksList.scrollHeight;
            linksList.style.height = 0 + "px";
        } else {
            linksList.style.height = "auto";
        }
    };

    const init = () => {
        linksList.style.height = 0;
        toggleBtn.addEventListener("click", toggleActive);
        links.forEach((link) => link.addEventListener("click", toggleActive));

        calcHeight();
        window.addEventListener("resize", calcHeight);
    };

    return {
        init,
    };
};
window.onload = function () {
    setTimeout(() => {
        if (window.pageYOffset === 0) activateNavElement(NavElement.HOME);
    }, 10);
    const sidenav = new M.Sidenav(document.getElementById("sidenav"), {
        draggable: true,
        preventScrolling: true
    });
    document.getElementById("menu-button").onclick = sidenav.open.bind(sidenav);
    const elements = document.querySelectorAll("#sidenav li");
    for (let i = 0; i < 5; i++) {
        elements[i].onclick = function () {
            sidenav.close();
            goToPart(i);
        }
    }
};

const NavElement = Object.freeze({
    HOME: 0,
    SERVICE: 1,
    TEAM: 2,
    TESTIMONIALS: 3,
    CONTACT: 4,
    getLiId(element) {
        return "nav-li-" + Object.keys(NavElement)[Object.values(NavElement).indexOf(element)].toLowerCase();
    },
    getBgImgClass(element) {
        return "bg-image-" + Object.keys(NavElement)[Object.values(NavElement).indexOf(element)].toLowerCase();
    },
});

function activateNavElement(id) {
    for (const element in NavElement) if (NavElement.hasOwnProperty(element) && typeof NavElement[element] === "number") {
        const li = document.getElementById(NavElement.getLiId(NavElement[element]));
        li.style["background-color"] = id === NavElement[element] ? "rgb(0, 0, 0)" : "";
        li.onclick = id === NavElement[element] ? () => {} : () => goToPart(NavElement[element])
    }
}

function goToPart(id) {
    window.scrollTo({
        behavior: "smooth",
        top: document.getElementsByClassName(NavElement.getBgImgClass(id))[0].offsetTop
    });
}

window.onscroll = function () {
    const navHeight = document.querySelector("nav .nav-wrapper").clientHeight;
    for (let i = 0; i < 4; i++) {
        if (window.pageYOffset < document.getElementsByClassName(NavElement.getBgImgClass(i+1))[0].offsetTop - navHeight) {
            activateNavElement(i);
            return;
        }
    }
    activateNavElement(NavElement.CONTACT);
};

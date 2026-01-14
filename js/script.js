// lerp scrolling mechanism

/* let currentY = 0;
let targetY = 0;
if (!window.matchMedia('(pointer: coarse)').matches) {
    ease = 0.07;
} else {
    ease = 0.1;
};

const minScrollSpeed = 2;
const maxScrollSpeed = 35;
const zoneHeight = 50;
let isMouseDown = false;
let mouseY = 0;

const main = document.querySelector('main') || document.body.children[0];

function setHeight() {
    if (main) {
        const height = main.getBoundingClientRect().height;
        document.body.style.height = height + "px";
    };
};

function syncScrollPosition() {
    setHeight();
    targetY = window.scrollY;
    currentY = targetY;

    if (main) {
        main.style.transform = `translate3d(0, ${-currentY}px, 0)`;
    };
};

window.addEventListener('mousedown', () => isMouseDown = true);
window.addEventListener('mouseup', () => isMouseDown = false);
window.addEventListener('mousemove', (e) => {
    mouseY = e.clientY;
});

function handleAutoScroll() {
    if (!isMouseDown) return false;

    const selection = window.getSelection().toString();
    if (!selection || selection.length === 0) return false;

    const winHeight = window.innerHeight;
    let delta = 0;

    if (mouseY > winHeight - zoneHeight) {
        const distanceIntoZone = (mouseY - (winHeight - zoneHeight)) / zoneHeight;
        const intensity = Math.min(Math.max(distanceIntoZone, 0), 1);
        delta = minScrollSpeed + (maxScrollSpeed - minScrollSpeed) * intensity;
    } else if (mouseY < zoneHeight && selection.length > 0) {
        const distanceIntoZone = (zoneHeight - mouseY) / zoneHeight;
        const intensity = Math.min(Math.max(distanceIntoZone, 0), 1);
        delta = -(minScrollSpeed + (maxScrollSpeed - minScrollSpeed) * intensity);
    };

    if (delta !== 0) {
        window.scrollBy(0, delta);
        targetY = window.scrollY;
        currentY = targetY;
        return true;
    };
    return false;
};

function smoothScroll() {
    const isAutoScrolling = handleAutoScroll();
    if (!isAutoScrolling) {
        targetY = window.scrollY;
        const diff = targetY - currentY;
        currentY += diff * ease;

        if (Math.abs(diff) < 0.001) {
            currentY = targetY;
        };
    };

    if (main) {
        main.style.transform = `translate3d(0, ${-currentY}px, 0)`;
    };

    requestAnimationFrame(smoothScroll);
};

window.addEventListener('load', () => {
    syncScrollPosition();
    smoothScroll();
});

window.addEventListener('resize', setHeight);

if (document.readyState === 'complete') {
    syncScrollPosition();
}; */

// logo animation

const logo = document.querySelector('#logo');
const logoLink = document.querySelector('nav > a');

function logoAnimation() {
    logo.style.opacity = "0";
    setTimeout(function () {
        logo.style.opacity = "1";
        logo.classList.remove('animate');
    }, 50);
    setTimeout(function () { logo.classList.add('animate') }, 70);
};

window.addEventListener('load', () => {
    logo.classList.add('animate');
});

if (!window.matchMedia('(pointer: coarse)').matches) {
    logoLink.addEventListener('mouseenter', () => {
        logoAnimation();
    });
};

// navbar link hover effect

const navList = document.querySelector('nav ul:not(#mobile)');
const indicator = document.querySelector('nav ul:not(#mobile) div');
const links = document.querySelectorAll('nav ul:not(#mobile) li a');

let mouse = { x: 0, y: 0 };
let target = { x: 0, y: 0, w: 0, h: 0, opacity: 0 };
let current = { x: 0, y: 0, w: 0, h: 0, opacity: 0 };
const linkOffsets = Array.from(links).map(() => ({ x: 0, y: 0 }));
let currentTargetLink = links[0];

const initRect = links[0].getBoundingClientRect();
current.x = target.x = initRect.left;
current.y = target.y = initRect.bottom;
current.w = target.w = initRect.width;
current.h = target.h = initRect.height;

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

function update() {
    let anyHovered = false;
    const navHovered = navList.matches(":hover");

    let closestLink = currentTargetLink;
    let minDistance = Infinity;

    if (navHovered) {
        links.forEach((link) => {
            const rect = link.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            const distance = Math.hypot(mouse.x - centerX, mouse.y - centerY);

            if (distance < minDistance) {
                minDistance = distance;
                closestLink = link;
            };
        });
        currentTargetLink = closestLink;
    };

    links.forEach((link, index) => {
        const rect = link.getBoundingClientRect();

        const isDirectlyHovered = mouse.x > rect.left && mouse.x < rect.right && mouse.y > rect.top && mouse.y < rect.bottom;

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        let textTargetX = 0, textTargetY = 0;

        if (isDirectlyHovered) {
            anyHovered = true;
            const deltaX = (mouse.x - centerX);
            const deltaY = (mouse.y - centerY);
            textTargetX = deltaX * 0.12;
            textTargetY = deltaY * 0.12;
        };

        linkOffsets[index].x += (textTargetX - linkOffsets[index].x) * 0.15;
        linkOffsets[index].y += (textTargetY - linkOffsets[index].y) * 0.15;

        if (Math.abs(linkOffsets[index].x) < 0.001) linkOffsets[index].x = 0;
        if (Math.abs(linkOffsets[index].y) < 0.001) linkOffsets[index].y = 0;

        link.style.transform = `translate3d(${linkOffsets[index].x.toFixed(2)}px, ${linkOffsets[index].y.toFixed(2)}px, 0)`;
    });

    const targetRect = currentTargetLink.getBoundingClientRect();
    target.opacity = navHovered ? 1 : 0;

    if (navHovered) {
        const deltaX = (mouse.x - (targetRect.left + targetRect.width / 2));
        const deltaY = (mouse.y - (targetRect.top + targetRect.height / 2));
        target.x = targetRect.left + (deltaX * 0.15);
        target.y = targetRect.top + (deltaY * 0.15);
    } else {
        target.x = targetRect.left;
        target.y = targetRect.top;
    };

    target.w = targetRect.width;
    target.h = targetRect.height;

    const snapSpeed = 0.2;
    current.x += (target.x - current.x) * snapSpeed;
    current.y += (target.y - current.y) * snapSpeed;
    current.w += (target.w - current.w) * snapSpeed;
    current.h += (target.h - current.h) * snapSpeed;

    const oSpeed = target.opacity === 1 ? 0.7 : 0.15;
    current.opacity += (target.opacity - current.opacity) * oSpeed;

    if (current.opacity < 0.001) current.opacity = 0;

    indicator.style.opacity = current.opacity.toFixed(3);
    indicator.style.width = `${current.w.toFixed(2)}px`;
    indicator.style.height = `${current.h.toFixed(2)}px`;
    indicator.style.transform = `translate3d(${current.x.toFixed(2)}px, ${current.y.toFixed(2)}px, 0)`;

    requestAnimationFrame(update);
};

update();

// shorter navbar, items turn into icons when scrolled up, reverted when scrolled down or navbar clicked

let yPosition = window.scrollY || document.documentElement.scrollTop;
let direction = null;
let fading = false;
let clicked = false;
const nav = document.querySelector('nav');

function expandNavbar() {
    navList.style.opacity = "0";
    nav.style.height = '70px';
    logo.style.width = '45px';
    document.querySelector('#menu-button').style.width = '45px';
    setTimeout(function () {
        indicator.style.borderRadius = "8px";
        navList.style.gap = "20px";
        n = 0;
        nav.querySelectorAll('ul:not(#mobile) li a').forEach((a) => {
            a.classList.remove('material-symbols-outlined');
            a.innerText = items[n];
            a.title = '';
            a.style.padding = '5px 10px';
            n = n + 1;
        });
        navList.style.opacity = "1";
        fading = false;
    }, 150);
};

function shrinkNavbar() {
    navList.style.opacity = "0";
    nav.style.height = '45px';
    logo.style.width = '30px';
    document.querySelector('#menu-button').style.width = '30px';

    setTimeout(function () {
        indicator.style.borderRadius = "100%";
        navList.style.gap = "10px";
        n = 0;
        nav.querySelectorAll('ul:not(#mobile) li a').forEach((a) => {
            a.classList.add('material-symbols-outlined');
            a.innerText = icons[n];
            a.title = items[n];
            a.style.padding = '5px';
            n = n + 1;
        });
        navList.style.opacity = "1";
        fading = false;
    }, 150);
};

window.addEventListener('scroll', () => {
    const currentYPosition = window.scrollY || document.documentElement.scrollTop;
    if (fading) return;
    if (Math.abs(currentYPosition - yPosition) < 5) return;
    icons = ['house', 'info', 'code', 'outdoor_garden'];
    items = ['Home', 'About', 'Projects', 'Backyard'];
    let currentDirection = currentYPosition > yPosition ? 'down' : 'up';

    if (currentDirection === 'down' && clicked) {
        fading = true;
        clicked = false;
        direction = 'down';
        shrinkNavbar();
    } else if (currentDirection !== direction) {
        fading = true;
        direction = currentDirection;

        if (direction === 'down') {
            clicked = false;
        };

        if (currentDirection == 'up') {
            if (!clicked) {
                expandNavbar();
            } else {
                clicked = false;
                fading = false;
            };
        } else if (currentDirection == 'down') {
            shrinkNavbar();
        };
    };
    yPosition = currentYPosition;
});

nav.addEventListener('click', () => {
    if (nav.style.height === '45px' && direction === 'down') {
        expandNavbar();
        clicked = true;
        fading = false;
    };
});

// mobile navbar expand menu

const mobileMenu = document.querySelector('#mobile-menu');
const mobileNav = document.querySelector('nav #mobile-menu ul#mobile');
const menuButton = document.querySelector('#menu-button');
let mobileMenuFading = false;

menuButton.addEventListener('click', () => {
    const isHidden = mobileMenu.style.visibility === "hidden" || mobileMenu.style.display === "";

    if (mobileMenuFading) return;

    if (isHidden) {
        mobileMenuFading = true;
        mobileMenu.style.display = "flex";
        document.querySelector('main').style.filter = "blur(6px)";
        document.querySelector('main').style.overflow = 'hidden';
        mobileMenu.style.visibility = "visible";
        mobileMenu.style.opacity = "1";
        menuButton.style.opacity = "0";
        setTimeout(() => {
            menuButton.style.opacity = "1";
            menuButton.innerText = "close";
        }, 150);

        mobileNav.querySelectorAll('li a').forEach((a, index) => {
            setTimeout(() => {
                a.style.opacity = "1";
                a.style.transform = "translateY(0) rotateX(0)";
            }, 300 + (index * 100));
        });

        setTimeout(() => {
            mobileMenuFading = false;
        }, 300);
    } else {
        mobileMenuFading = true;
        document.querySelector('main').style.filter = "blur(0)";
        document.querySelector('main').style.overflow = 'visible';
        mobileMenu.style.opacity = "0";
        menuButton.style.opacity = "0";
        setTimeout(() => {
            menuButton.style.opacity = "1";
            menuButton.innerText = "menu";
        }, 150);

        setTimeout(() => {
            mobileMenu.style.visibility = "hidden";
            mobileNav.querySelectorAll('li a').forEach((a) => {
                a.style.opacity = "0";
                a.style.transform = "translateY(10px) rotateX(-45deg)";
            });
            mobileMenuFading = false;
        }, 300);
    };
});

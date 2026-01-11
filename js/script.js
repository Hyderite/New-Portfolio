// lerp scrolling mechanism

let currentY = 0;
let targetY = 0;
const ease = 0.125;

const minScrollSpeed = 2;
const maxScrollSpeed = 35;
const zoneHeight = 50;
let isMouseDown = false;
let mouseY = 0;

const content = document.querySelector('main') || document.body.children[0];

function setHeight() {
    if (content) {
        const height = content.getBoundingClientRect().height;
        document.body.style.height = height + "px";
    };
};

function syncScrollPosition() {
    setHeight();
    targetY = window.scrollY;
    currentY = targetY;

    if (content) {
        content.style.transform = `translate3d(0, ${-currentY}px, 0)`;
    };
};

window.addEventListener('mousedown', () => isMouseDown = true);
window.addEventListener('mouseup', () => isMouseDown = false);
window.addEventListener('mousemove', (e) => {
    mouseY = e.clientY;
});

function handleAutoScroll() {
    if (!isMouseDown) return false;

    const winHeight = window.innerHeight;
    let delta = 0;

    if (mouseY > winHeight - zoneHeight) {
        const distanceIntoZone = (mouseY - (winHeight - zoneHeight)) / zoneHeight;
        const intensity = Math.min(Math.max(distanceIntoZone, 0), 1);
        delta = minScrollSpeed + (maxScrollSpeed - minScrollSpeed) * intensity;
    } else if (mouseY < zoneHeight) {
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

    if (content) {
        content.style.transform = `translate3d(0, ${-currentY}px, 0)`;
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
};

// navbar link hover effect

const nav = document.querySelector('nav ul');
const indicator = document.querySelector('nav div');
const links = document.querySelectorAll('nav ul li a');

let mouse = { x: 0, y: 0 };
let target = { x: 0, y: 0, w: 0, h: 0, opacity: 0 };
let current = { x: 0, y: 0, w: 0, h: 0, opacity: 0 };
const linkOffsets = Array.from(links).map(() => ({ x: 0, y: 0 }));
let currentTargetLink = links[0];

// Init
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

    links.forEach((link, index) => {
        const rect = link.getBoundingClientRect();
        const isHovered = mouse.x > rect.left && mouse.x < rect.right &&
            mouse.y > rect.top && mouse.y < rect.bottom;

        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        let textTargetX = 0, textTargetY = 0;

        if (isHovered) {
            anyHovered = true;
            currentTargetLink = link;
            const deltaX = (mouse.x - centerX);
            const deltaY = (mouse.y - centerY);

            textTargetX = deltaX * 0.12;
            textTargetY = deltaY * 0.12;

            target.x = rect.left + (deltaX * 0.15);
            target.y = rect.top + (deltaY * 0.15);
            target.w = rect.width;
            target.h = rect.height;
            target.opacity = 1;
        };

        linkOffsets[index].x += (textTargetX - linkOffsets[index].x) * 0.15;
        linkOffsets[index].y += (textTargetY - linkOffsets[index].y) * 0.15;

        if (Math.abs(linkOffsets[index].x) < 0.01) linkOffsets[index].x = 0;
        if (Math.abs(linkOffsets[index].y) < 0.01) linkOffsets[index].y = 0;

        link.style.transform = `translate3d(${linkOffsets[index].x}px, ${linkOffsets[index].y}px, 0)`;
    });

    if (!anyHovered) {
        target.opacity = 0;
        const lastRect = currentTargetLink.getBoundingClientRect();
        target.x = lastRect.left;
        target.y = lastRect.top;
        target.w = lastRect.width;
        target.h = lastRect.height;
    };

    const snapSpeed = 0.2;
    current.x += (target.x - current.x) * snapSpeed;
    current.y += (target.y - current.y) * snapSpeed;
    current.w += (target.w - current.w) * snapSpeed;
    current.h += (target.h - current.h) * snapSpeed;

    const oSpeed = target.opacity === 1 ? 0.7 : 0.15;
    current.opacity += (target.opacity - current.opacity) * oSpeed;

    if (current.opacity < 0.001) current.opacity = 0;
    if (current.opacity > 0.999) current.opacity = 1;

    indicator.style.opacity = current.opacity;
    indicator.style.width = `${current.w}px`;
    indicator.style.height = `${current.h}px`;
    indicator.style.transform = `translate3d(${current.x}px, ${current.y}px, 0)`;

    requestAnimationFrame(update);
}

update();

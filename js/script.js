let currentY = 0;
let targetY = 0;
const ease = 0.07;

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

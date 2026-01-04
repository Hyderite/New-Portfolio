let currentY = 0;
let targetY = 0;
const ease = 0.07;

const content = document.querySelector('main') || document.body.children[0];

function setHeight() {
    if (content) {
        const height = content.getBoundingClientRect().height;
        document.body.style.height = height + "px";
    };
};

function smoothScroll() {
    targetY = window.scrollY;
    const diff = targetY - currentY;
    currentY += (diff) * ease;

    if (Math.abs(diff) < 0.001) {
        currentY = targetY;
    } else {
        currentY += diff * ease;
    };

    if (content) {
        content.style.transform = `translate3d(0, ${-currentY}px, 0)`;
    };

    requestAnimationFrame(smoothScroll);
};

window.addEventListener('load', () => {
    setHeight();
    smoothScroll();
});

window.addEventListener('resize', setHeight);

if (document.readyState === 'complete') {
    setHeight();
    smoothScroll();
};

const animation = {
  logo: document.querySelector<SVGElement>('#onload #logo')!,
  strokes: Array.from(document.querySelectorAll<SVGElement>('#onload .st0, #onload .st2, #onload .st3'))!,
  text: {
    hello: Array.from(document.querySelectorAll<HTMLSpanElement>('#onload #hello span'))!,
    intro: Array.from(document.querySelectorAll<HTMLSpanElement>('#onload #intro span:not(#dot, #name)'))!,
  },
};

const navbar = document.querySelector<HTMLElement>('nav')!;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

window.addEventListener('load', async () => {
  if (!animation) return;

  const dot = document.querySelector<HTMLSpanElement>('#dot')!;

  const visited = sessionStorage.getItem('visited');

  const skip = () => {
    if (animation.text.intro) {
      animation.text.intro.forEach((span) => {
        span.style.transition = 'none';
        span.offsetHeight;
        span.style.opacity = '1';
      });
    }
    if (dot) {
      document
        .querySelectorAll<HTMLSpanElement>('#name span')!
        .forEach((span) => (span.style.color = 'var(--theme-color)'));
      document.querySelector<HTMLElement>('#name')?.classList.add('draw');
      dot.style.opacity = '1';
      dot.style.transform = `translateX(0px)`;
    }
    navbar.style.transform = 'translateY(0)';
    setTimeout(() => {
      if ((window as any).updateRects) {
        (window as any).updateRects();
      }
    }, 500);
    animation.logo.style.display = 'none';
  };

  if (visited) {
    skip();
  } else {
    sessionStorage.setItem('visited', 'true');

    if (dot && animation.text.intro) {
      dot.style.transition = 'none';
      dot.style.opacity = '0';
      animation.logo.style.display = 'block';

      await sleep(100);

      animation.logo.classList.add('animate');

      await sleep(1500);

      animation.strokes.forEach((stroke) => (stroke.style.strokeWidth = '0px'));

      await sleep(500);

      animation.logo.style.display = 'none';
      animation.text.hello.forEach((span, index) => {
        span.style.opacity = '0';
        setTimeout(() => {
          span.style.opacity = '1';
        }, index * 100);
      });

      await sleep(1000);

      animation.text.hello.forEach((span, index) => {
        setTimeout(() => {
          span.style.opacity = '0';
        }, index * 100);
      });

      await sleep(1500);

      animation.text.intro.forEach((span, index) => {
        span.style.opacity = '0';
        setTimeout(() => {
          span.style.opacity = '1';
        }, index * 50);
      });

      await sleep(animation.text.intro.length * 50 + 400);

      navbar.style.transform = 'translateY(0)';
      setTimeout(() => {
        if ((window as any).updateRects) {
          (window as any).updateRects();
        }
      }, 500);

      dot.style.transition = 'none';
      dot.style.transform = `translateX(-50%)`;
      dot.style.opacity = '0';

      dot.offsetHeight;

      document.querySelectorAll<HTMLSpanElement>('#name span')!.forEach((span, index) => {
        setTimeout(() => {
          span.style.color = 'var(--theme-color)';
        }, index * 80);
        document.querySelector<HTMLElement>('#name')?.classList.add('draw');
      });

      dot.style.transition = 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease-out';
      dot.style.transform = `translateX(0px)`;
      dot.style.opacity = '1';
    }
  }
});

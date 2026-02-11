const animation = {
  logo: document.querySelector<SVGElement>('#onload #logo')!,
  strokes: Array.from(document.querySelectorAll<SVGElement>('#onload .st0, #onload .st2, #onload .st3'))!,
  text: {
    hello: Array.from(document.querySelectorAll<HTMLSpanElement>('#onload #hello span'))!,
    intro: Array.from(document.querySelectorAll<HTMLSpanElement>('#onload #intro span:not(#dot, #name)'))!,
  },
};

const navbar = document.querySelector<HTMLElement>('nav')!;

window.addEventListener('load', async () => {
  if (!animation) return;

  const dot = document.querySelector<HTMLSpanElement>('#dot')!;

  const visited = sessionStorage.getItem('visited');

  const skip = async () => {
    if (animation.text.intro) {
      animation.text.intro.forEach((span) => {
        span.style.transition = 'color 0.3s ease';
        span.offsetHeight;
        span.style.opacity = '1';
      });
    }
    if (dot) {
      document.querySelector<HTMLElement>('#name')?.classList.add('draw');
      dot.style.opacity = '1';
      dot.style.transform = `translateX(0px)`;
      navbar.style.transform = 'translateY(0)';
      animation.logo.style.display = 'none';
      for (const span of Array.from(document.querySelectorAll<HTMLSpanElement>('#name span'))) {
        span.style.color = 'var(--theme-color)';
        await sleep(80);
      }
    }

    await sleep(500);

    if ((window as any).updateRects) {
      (window as any).updateRects();
    }
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

      await sleep(1250);

      animation.strokes.forEach((stroke) => (stroke.style.strokeWidth = '0px'));

      await sleep(500);

      animation.logo.style.display = 'none';
      for (const span of animation.text.hello) {
        span.style.opacity = '1';
        await sleep(50);
      }

      await sleep(800);

      for (const span of animation.text.hello) {
        span.style.opacity = '0';
        await sleep(80);
      }

      await sleep(500);

      for (const span of animation.text.intro) {
        span.style.opacity = '1';
        await sleep(50);
      }

      await sleep(animation.text.intro.length * 50);

      navbar.style.transform = 'translateY(0)';

      dot.style.transition = 'none';
      dot.style.transform = `translateX(-50%)`;
      dot.style.opacity = '0';

      dot.offsetHeight;

      dot.style.transition = 'transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.4s ease-out';
      dot.style.transform = `translateX(0px)`;
      dot.style.opacity = '1';

      for (const span of Array.from(document.querySelectorAll<HTMLSpanElement>('#name span'))) {
        document.querySelector<HTMLElement>('#name')?.classList.add('draw');
        await sleep(80);
        span.style.color = 'var(--theme-color)';
      }

      await sleep(500);

      if ((window as any).updateRects) {
        (window as any).updateRects();
      }
    }
  }
});

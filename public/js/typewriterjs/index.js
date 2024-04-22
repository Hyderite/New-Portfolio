import Typewriter from 'typewriter-effect/dist/core.js';

var text = document.querySelector("#large-hyderite-code-1");

var typewriter = new Typewriter((text), {
    autoStart: true,
});

typewriter
    .pauseFor(2010)
    .typeString("<p>")
    .start();

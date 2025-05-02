var i = 0;
var txt = "Hello world!";
var speed = 50;
function helloWorld() {
    if (i < txt.length) {
        document.querySelector("#hello-world").style.animation = "none";
        document.querySelector("#hello-world").innerHTML += txt.charAt(i);
        i++;
        setTimeout(helloWorld, speed);
    } else {
        document.querySelector("#hello-world").style.animation = "text-cursor 1s infinite step-end";
        setTimeout(function () {
            document.querySelector("#tip-box").style.opacity = "1";
        }, 2000);
    }
};

setTimeout(function () {
    helloWorld();
}, 2500);

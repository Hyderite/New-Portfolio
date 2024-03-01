document.querySelector("#large-hyderite").style.display = "flex";
setTimeout(function () {
    document.querySelector("#large-hyderite").style.fontSize = "100px";
    setTimeout(function () {
        document.querySelector("#large-hyderite").style.transform = "translate(calc(-50% + (245.4px / 2 - 40px)), calc(-50% + 25px)) scale(0.15)";
    }, 1000);
}, 10);
document.querySelector("#large-hyderite").style.display = "flex";
setTimeout(function () {
    if (window.matchMedia("(max-width: 480px)").matches) {
        document.querySelector("#large-hyderite").style.fontSize = "9.259vw";
    } else {
        document.querySelector("#large-hyderite").style.fontSize = "4vw";
    };
    setTimeout(function () {
        document.querySelector("#hyderite").style.color = "#c30000";
        setTimeout(function () {
            if (window.matchMedia("(max-width: 480px)").matches) {
                document.querySelector("#large-hyderite").style.transform = "translate(calc(-50% + (65vw / 2 - 3vw)), calc(-50% + 2.315vw + 20px)) scale(0.65)";
            } else {
                document.querySelector("#large-hyderite").style.transform = "translate(calc(-50% + (22.722vw / 2 - 5vw)), calc(-50% + 2.315vw)) scale(0.3)";
            };
        }, 1000);
    }, 1000);

}, 10);
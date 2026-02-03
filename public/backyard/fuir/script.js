document.querySelector("#select-type").onclick = function() {
  if (document.querySelector("#select").value == "type1") {
    document.querySelector("#ui1").style.animation = "popup .7s forwards";
    setTimeout(function() {document.querySelector("#ui1").style.animation = "slideout .7s forwards";}, 5000);
  } else {
    document.querySelector("#ui2").style.animation = "popup .7s forwards";
    setTimeout(function() {document.querySelector("#ui2").style.animation = "slideout .7s forwards";}, 5000);
  };
};

if (window.matchMedia("(max-width: 480px)").matches) {
  document.querySelector("#mob-error").style.display = "block";
  document.querySelector("#mob-error").style.zIndex = "1000";
  document.querySelector("#fill").style.zIndex = "-1000";
} else {
  document.querySelector("#mob-error").style.display = "none";
  document.querySelector("#mob-error").style.zIndex = "-1";
  document.querySelector("#fill").style.zIndex = "0";
};

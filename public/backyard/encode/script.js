document.querySelector("#encode").onclick = function() {
  document.querySelector("#result").value = "";
  var encoded = encodeURIComponent(document.querySelector("#input").value);
  document.querySelector("#result").value = encoded;
};

document.querySelector("#copy").onclick = function() {
  var copyText = document.getElementById("result");

  copyText.select();
  copyText.setSelectionRange(0, 99999);

  navigator.clipboard.writeText(copyText.value);

  document.querySelector("#success").innerHTML = "Copied to clipboard";
};
const bodyElement = document.querySelector("body");
const bulb = document.getElementById("bulb");
const bulbSwitch = document.getElementById("toggleButton");
const bulbStatus = document.getElementById("status");

let isBulbOn = false;

bulbSwitch.addEventListener("click", () => {
  if (!isBulbOn) {
    bulb.classList.remove("off");
    bodyElement.classList.remove("dark-mode");
    bulbStatus.innerText = "Status : On";
    isBulbOn = true;
    return;
  }

  bulb.classList.add("off");
  bodyElement.classList.add("dark-mode");
  bulbStatus.innerText = "Status : Off";
  isBulbOn = false;
});

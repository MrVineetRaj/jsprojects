const digitalClock = document.querySelector(".digital-clock");
const handMinute = document.querySelector(".minute");
const handSecond = document.querySelector(".second");
const handHour = document.querySelector(".hour");

console.log(handMinute);
function displayTimeInDigitalClock() {
  setInterval(() => {
    const currTime = new Date();
    const currMinute =
      currTime.getMinutes() > 9
        ? currTime.getMinutes()
        : `0${currTime.getMinutes()}`;
    const currSecond =
      currTime.getSeconds() > 9
        ? currTime.getSeconds()
        : `0${currTime.getSeconds()}`;

    const currHour =
      currTime.getHours() % 12 > 9
        ? currTime.getHours() % 12
        : `0${currTime.getHours() % 12}`;
    digitalClock.innerText = `${currHour}:${currMinute}:${currSecond}`;
  }, 1000);
}

function analogWatchDisplay() {
  let secondLoop = 0;
  let minuteLoop = 0;
  let hourLoop = 0;
  setInterval(() => {
    const currTime = new Date();
    const currMinute = currTime.getMinutes();
    const currSecond = currTime.getSeconds();
    const currHour = currTime.getHours() % 12;
    if (currSecond == 0) {
      secondLoop++;
    }
    if (currMinute == 0) {
      minuteLoop++;
    }
    if (currHour == 0) {
      hourLoop++;
    }
    handMinute.style.transform = `translateX(-50%) rotate(${
      currMinute * 6 + 360 * minuteLoop
    }deg)`;
    handSecond.style.transform = `translateX(-50%) rotate(${
      currSecond * 6 + 360 * secondLoop
    }deg)`;
    handHour.style.transform = `translateX(-50%) rotate(${
      currHour * 30 + 360 * hourLoop
    }deg)`;
  }, 1000);
}
analogWatchDisplay();
displayTimeInDigitalClock();

const buttons = document.getElementById("buttons");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resumeButton = document.getElementById("resume");
const intervalButton = document.getElementById("interval");
const resetButton = document.getElementById("reset");
const screen = document.querySelector(".screen");

let i = 0;

function showElements(...args) {
  args.forEach((arg) => {
    arg.classList.remove("hidden");
  });
}
function myTimer() {
  const newDate = Date.now();
  diffTime = newDate - startDate;
  screen.textContent = msToTime(diffTime);
}

function hideElements(...args) {
  args.forEach((arg) => {
    arg.classList.add("hidden");
  });
}

function addInterval(interval) {
  const intervalElt = document.createElement("div");
  intervalElt.classList.add("intervalElt");
  intervalElt.textContent = "Intervalle " + i + ": " + interval;
  buttons.after(intervalElt);
}

function msToTime(s) {
  // Pad to 2 or 3 digits, default is 2
  function pad(n, z) {
    z = z || 2;
    return ("00" + n).slice(-z);
  }

  var ms = s % 1000;
  s = (s - ms) / 1000;
  var secs = s % 60;
  s = (s - secs) / 60;
  var mins = s % 60;
  var hrs = (s - mins) / 60;

  return pad(hrs) + " : " + pad(mins) + " : " + pad(secs) + " . " + pad(ms, 2);
}

startButton.addEventListener("click", (e) => {
  hideElements(startButton);
  showElements(pauseButton, intervalButton);
  startDate = Date.now();
  interval = setInterval(myTimer, 90);
});
pauseButton.addEventListener("click", (e) => {
  hideElements(pauseButton, intervalButton);
  showElements(resumeButton, resetButton);
  clearTimeout(interval);
});

intervalButton.addEventListener("click", (e) => {
  i++;
  addInterval(screen.textContent);
});

resumeButton.addEventListener("click", (e) => {
  hideElements(resumeButton, resetButton);
  showElements(pauseButton, intervalButton);
  startDate = Date.now() - diffTime;
  interval = setInterval(myTimer, 90);
});

resetButton.addEventListener("click", (e) => {
  hideElements(pauseButton, resetButton, intervalButton, resumeButton);
  showElements(startButton);
  const intervalElts = document.querySelectorAll(".intervalElt");
  intervalElts.forEach((intervalElt) => {
    intervalElt.remove();
  });
  diffTime = 0;
  i = 0;
  screen.textContent = msToTime(diffTime);
});

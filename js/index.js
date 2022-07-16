const buttons = document.getElementById("buttons");
const startButton = document.getElementById("start");
const pauseButton = document.getElementById("pause");
const resumeButton = document.getElementById("resume");
const intervalButton = document.getElementById("interval");
const resetButton = document.getElementById("reset");
const screen = document.querySelector(".screen");
let intervalId = 0;

// functions
function showElements(...args) {
  args.forEach((arg) => {
    arg.classList.remove("hidden");
  });
}

function hideElements(...args) {
  args.forEach((arg) => {
    arg.classList.add("hidden");
  });
}

function showTime() {
  const newDate = Date.now();
  diffTime = newDate - startDate;
  screen.textContent = msToTime(diffTime);
}

function addInterval(interval) {
  const intervalElt = document.createElement("div");
  intervalElt.classList.add("intervalElt");
  intervalElt.textContent = interval;
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
  interval = setInterval(showTime, 90);
});
pauseButton.addEventListener("click", (e) => {
  hideElements(pauseButton, intervalButton);
  showElements(resumeButton, resetButton);
  clearTimeout(interval);
});

intervalButton.addEventListener("click", (e) => {
  intervalId++;
  addInterval(screen.textContent);
});

resumeButton.addEventListener("click", (e) => {
  hideElements(resumeButton, resetButton);
  showElements(pauseButton, intervalButton);
  startDate = Date.now() - diffTime;
  interval = setInterval(showTime, 90);
});

resetButton.addEventListener("click", (e) => {
  hideElements(pauseButton, resetButton, intervalButton, resumeButton);
  showElements(startButton);
  const intervalElts = document.querySelectorAll(".intervalElt");
  intervalElts.forEach((intervalElt) => {
    intervalElt.remove();
  });
  diffTime = 0;
  intervalId = 0;
  screen.textContent = msToTime(diffTime);
});

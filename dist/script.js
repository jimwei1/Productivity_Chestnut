let duration = 5 * 60; // 5 minutes in seconds
let timeLeft = duration;
let timerInterval = null;
function updateTimer() {
  const minutes = Math.floor(timeLeft / 60).toString().padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
  const timerString = `${minutes}:${seconds}`;
  document.getElementById("timer").textContent = timerString;
  timeLeft--;
  if (timeLeft < 0) {
    clearInterval(timerInterval);
    document.getElementById("timer").textContent = "Time's up!";
  }
}
function startTimer() {
  duration = document.getElementById("timer-input").value * 60;
  timeLeft = duration;
  clearInterval(timerInterval);
  timerInterval = setInterval(updateTimer, 1000);
}
document.getElementById("start-button").addEventListener("click", startTimer);
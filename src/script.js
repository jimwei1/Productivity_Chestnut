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
  const confirmed = confirm("Are you sure you want to start the timer?");
  if (confirmed) {
    duration = document.getElementById("timer-input").value * 60;
    console.log(duration);
    timeLeft = duration;
    clearInterval(timerInterval);
  }
  else{
    duration = timeLeft;
    clearInterval(timerInterval);
  }
  
  const block = confirm("Do you want to block websites?");
  if (!block) {
    return;
  }
  timerInterval = setInterval(updateTimer, 1000);
  
}

document.getElementById("start-button").addEventListener("click", startTimer);

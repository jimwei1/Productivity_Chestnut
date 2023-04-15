window.onload = function (e) {
  //Initialize the correct app

  //Create a new Vue object

  new Vue({
    template: `<div id="app">
    <div>
      
      <div id="score">
          <button @click="blockWebsites">Score</button>
      </div>
      <div id="timer-container">
          <input type="number" v-model="timerValue" min="1" placeholder="Enter time in minutes">
          <span>{{ timerDisplay }}</span>
      </div>
      <div id="container">
        <button type="submit" class="btn" @click="openTimerPopup">Start Timer</button>
        <div class="popup">
          <img src="src/images/404-tick.png">
          <h2>Test</h2>
          <p>Test</p>
          <button type="submit" class="btn" @click="startTimer">Continue</button>
          <button type="submit" class="btn" @click="closeTimerPopup">Cancel</button>
        </div>
      <div id="menu">
          <button @click="showProfile" id="profile-button"></button>
          <button id="settings-button"></button>
      </div>
      <ul id="list">
          <li v-for="item in items"><s>{{ item }}</s></li>
      </ul>

    </div>
    </div>`,

    data() {
      return {
        duration: 5 * 60, // 5 minutes in seconds
        timeLeft: 0,
        timerInterval: null,
        timerValue: null,
        items: ["Coffee"],
        timerDisplay: "",
        blockListActive: false
      };
    },

    methods: {
      updateTimer() {
        const minutes = Math.floor(this.timeLeft / 60).toString().padStart(2, "0");
        const seconds = (this.timeLeft % 60).toString().padStart(2, "0");
        const timerString = `${minutes}:${seconds}`;
        this.timerDisplay = timerString;
        this.timeLeft--;
        if (this.timeLeft < 0) {
          clearInterval(this.timerInterval);
          this.timerDisplay = "Time's up!";
        }
      },

      openTimerPopup(){
        let popup = document.getElementById("popup");
        popup.classList.add("open-popup")

      },

      closeTimerPopup(){
        let popup = document.getElementById("popup");
        popup.classList.remove("open-popup")
        this.duration = this.timerValue * 60;
        this.timeLeft = this.duration;
        clearInterval(this.timerInterval);
      },

      startTimer() {
        let popup = document.getElementById("popup");
        popup.classList.remove("open-popup")

        this.duration = this.timeLeft;
        clearInterval(this.timerInterval);

        if (blockListActive = True){
          print(test)
        }

        this.timerInterval = setInterval(this.updateTimer, 1000);
      },
      blockWebsites() {
        alert("Blocking websites!");
      },

      showProfile() {
        alert("Showing profile!");
      }
    },
    computed: {
      timerDisplay() {
        const minutes = Math.floor(this.timeLeft / 60).toString().padStart(2, "0");
        const seconds = (this.timeLeft % 60).toString().padStart(2, "0");
        return `${minutes}:${seconds}`;
      }
    },

    el: "#app",
  });
};
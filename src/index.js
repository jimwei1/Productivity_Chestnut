window.onload = function (e) {
    //Initialize the correct app
  
    //Create a new Vue object
  
    new Vue({
      template: `<div id="app">
      <div>
        
        <div id="score">
            <button @click="blockWebsites">Block websites</button>
        </div>
        <div id="timer-container">
            <input type="number" v-model="timerValue" min="1" placeholder="Enter time in minutes">
            <span>{{ timerDisplay }}</span>
            <button @click="startTimer">Start</button>
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
          timerDisplay: ""
        };
      },
  
      methods: {
        updateTimer() {
          const minutes = Math.floor(this.timeLeft / 60).toString().padStart(2, "0");
          const seconds = (this.timeLeft % 60).toString().padStart(2, "0");
          const milliseconds = (this.timeLeft % 1).toFixed(3).slice(2, 5);
          const timerString = `${minutes}:${seconds}${milliseconds}`;
          this.timerDisplay = timerString;
          this.timeLeft--;
          if (this.timeLeft < 0) {
            clearInterval(this.timerInterval);
            this.timerDisplay = "Time's up!";
          }
        },


        startTimer() {
          const confirmed = confirm("Are you sure you want to start the timer?");
          if (confirmed) {
            this.duration = this.timerValue * 60;
            this.timeLeft = this.duration;
            clearInterval(this.timerInterval);
          }
          else{
            this.duration = this.timeLeft;
            clearInterval(this.timerInterval);
          }
          const block = confirm("Do you want to block websites?");
          if (!block) {
            return;
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
  
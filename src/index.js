window.onload = function (e) {
  //Initialize the correct app

  //Create a new Vue object

  new Vue({
    template: `<div id="app">
    <div>
          <div id="score">
            <button @click="openScore">Score</button>
          </div>
          <div id="timer-container">
            <input type="number" v-model="timerValue" min="1" placeholder="Enter time in minutes">
            <span>{{ timerDisplay }}</span>
          </div>

          <div id="container">
            <button type="submit" class="btn" @click="openTimerPopup">Start Timer</button>
            <div class="popup" id="timer-popup">
              <h2>Confirm Start</h2>
              <button type="submit" class="btn" @click="startTimer">Continue</button>
              <button type="submit" class="btn" @click="closeTimerPopup">Cancel</button>
            </div>
          </div>

          <div id="container">
            <div id="menu">
              <button @click="showLogin" id="login-button" class="btn">Login</button>
              <button @click="showSignup" id="signup-button" class="btn">Signup</button>
              <button @click="showProfile" id="profile-button"></button>
              <button id="settings-button"></button>
            </div>

            <div id="login-popup" class="popup">
              <h2>Login</h2>
              <input type="text" placeholder="Username">
              <input type="password" placeholder="Password">
              <button>Login</button>
              <button class="close-button" @click="hideLogin">Close</button>
            </div>

            <div id="signup-popup" class="popup">
              <h2>Signup</h2>
              <input type="text" placeholder="Username">
              <input type="password" placeholder="Password">
              <input type="password" placeholder="Confirm Password">
              <button>Signup</button>
              <button class="close-button" @click="hideSignup">Close</button>
            </div>
          </div>

          <div id="urls-container" class="urlList">
          <h2>BlockedUrls</h2>
            <input id="blockedUrl" type="text" v-model="newUrl" placeholder="Enter URL">
            <button @click="addUrl">Add URL</button>
            <ul>
              <li v-for="url in urls"><s>{{ url }}</s></li>
            </ul>
          </div>
          <div id="task-container" class="taskList">
          <h2>Tasks</h2>
            <input id="aTask" type="text" v-model="newTask" placeholder="Enter a Task">
            <button @click="addTask">Add TASK</button>
            <ul>
              <li v-for="task in tasks"><s>{{ task }}</s></li>
            </ul>
          </div>
        </div>
      </div>
    `,

    data() {
      return {
        duration: 5 * 60, // 5 minutes in seconds
        timeLeft: 0,
        timerInterval: null,
        timerValue: null,
        newTask: "",
        tasks: [],
        timerDisplay: "",
        blockListActive: false,
        audio: null,
        newUrl: "",
        urls: [],
      };
    },
    mounted() {
        // Create the audio element
        this.audio = new Audio("./sounds/alarm.mp3");
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
          const audio = new Audio('./sounds/alarm.mp3'); // replace with the path to your audio file
          audio.play();
        }
      },

      openTimerPopup(){
        /* hide signup popup */
        let popupS = document.getElementById("signup-popup");
        popupS.classList.remove("open-popup");

        /* hide login popup */
        let popupL = document.getElementById("login-popup");
        popupL.classList.remove("open-popup");

        /* show timer popup */
        let popup = document.getElementById("timer-popup");
        popup.classList.add("open-popup")

      },

      closeTimerPopup(){
        let popup = document.getElementById("timer-popup");
        popup.classList.remove("open-popup")
        this.duration = timeLeft;
        clearInterval(this.timerInterval);
        this.timerInterval = setInterval(this.updateTimer, 1000);
      },

      startTimer() {
        let popup = document.getElementById("timer-popup");
        popup.classList.remove("open-popup")

        this.duration = this.timerValue * 60;
        this.timeLeft = this.duration;
        clearInterval(this.timerInterval);
        if (this.blockListActive == true){
          console.log("test")
        }

        this.timerInterval = setInterval(this.updateTimer, 1000);
      },
      openScore() {
        alert("Blocking websites!");
      },

      showProfile() {
        alert("Showing profile!");
      },

      showLogin() {
        /* hide signup popup */
        let popupS = document.getElementById("signup-popup");
        popupS.classList.remove("open-popup");

        /* hide timer popup */
        let popupT = document.getElementById("timer-popup");
        popupT.classList.remove("open-popup")

        /* show login popup */
        let popupL = document.getElementById("login-popup");
        popupL.classList.add("open-popup");
      },
    
      hideLogin() {
        let popup = document.getElementById("login-popup");
        popup.classList.remove("open-popup");
      },
    
      showSignup() {
        /* hide login popup */
        let popupL = document.getElementById("login-popup");
        popupL.classList.remove("open-popup");

        /* hide timer popup */
        let popupT = document.getElementById("timer-popup");
        popupT.classList.remove("open-popup")

        /* show signup popup */
        let popupS = document.getElementById("signup-popup");
        popupS.classList.add("open-popup");
      },
    
      hideSignup() {
        let popup = document.getElementById("signup-popup");
        popup.classList.remove("open-popup");
      },
      addUrl() {
        if (this.newUrl != "") {
          this.urls.push(this.newUrl);
        }
        console.log(this.urls);
        
      },
      addTask() {
        if (this.newTask != "") {
          this.tasks.push(this.newTask);
        }
        
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
window.onload = function (e) {
  //Initialize the correct app

  //Create a new Vue object

  new Vue({
    template: `<div id="app">
    <div>
          <div id="score">
            <button @click="openScore">Score</button>
          </div>
          <div id="urls-container" class="urlList">
          <h2>BlockedUrls</h2>
            <input id="blockedUrl" type="text" v-model="newUrl" placeholder="Enter URL">
            <button @click="addUrl">Add URL</button>
            <ul>
              <li v-for="url in urls">{{ url }}</li>
            </ul>
          </div>
          <div id="task-container" class="taskList">
          <h2>Tasks</h2>
          <input type="text" v-model="v_task" placeholder="Enter a Task">
          <input style="width: 200px;" v-model="v_duedate" placeholder="Enter a date in yyyy-mm-dd">
          
            <button @click="addTask">Add TASK</button>
            <ul>
              <li v-for="task in tasks">{{ task }}</li>
            </ul>
          </div>
          <div id="timer-container">
          <span>{{ timerDisplay }}</span>
          <button type="submit" class="btn" @click="openTimerPopup">Start Timer</button>
          <button type="submit" id="SR_Timer" class="btn" @click="SRTimer">Stop Timer</button>
          <input type="number" v-model="timerValue" min="1" placeholder="Enter time in minutes">
            
          </div>

          <div id="container1">
            
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
              <input v-model="v_username" type="text" placeholder="Username">
              <input v-model="v_password" type="password" placeholder="Password">
              <button @click="logUser">Login</button>
              <button class="close-button" @click="hideLogin">Close</button>
            </div>

            <div id="signup-popup" class="popup">
              <h2>Signup</h2>
              <input v-model="v_username" type="text" placeholder="Username">
              <input v-model="v_name"  type="text" placeholder="Name">
              <input v-model="v_password"  type="password" placeholder="Password">
              <input v-model="v_password2" type="password" placeholder="Confirm Password">
              <input v-model="v_phone" type="text" placeholder="Phone Number">
              <button @click="addUser">Signup</button>
              <button class="close-button" @click="hideSignup">Close</button>
            </div>
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
        SR_Timer: "Stop Timer",
        isStop: true,
        v_username: "",
        v_password: "",
        v_password2: "",
        v_name: "",
        v_phone: "",
        v_duedate:"",
        v_task: "",
        token: null

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
        this.duration = this.timeLeft;
        clearInterval(this.timerInterval);
        this.timerInterval = setInterval(this.updateTimer, 1000);
      },
      SRTimer() {
        const buttonText = document.getElementById('SR_Timer')
        if (this.isStop) {
          clearInterval(this.timerInterval);
          buttonText.innerHTML = "Resume Timer"
          this.isStop = false;
        }
        else{
          this.duration = this.timeLeft;
          clearInterval(this.timerInterval);
          buttonText.innerHTML = "Stop Timer"
          this.timerInterval = setInterval(this.updateTimer, 1000);
          this.isStop = true;
        }
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
        this.timerValue = null;

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
      addUrl() {//add call to database
        if (this.newUrl != "") {
          this.urls.push(this.newUrl);
        }
        console.log(this.urls);
        
      },
      addTask() {
        if (this.newTask != "") {
          this.tasks.push(this.newTask); //will change to get task from database

        }
        if(this.v_duedate <= "2023-04-16"){
          alert("need a future data");
          return;
        }
        
        console.log(this.token)
        const url = 'http://localhost:3001/api/tasks';
        
        const data = { name: this.v_task, priority: 3, due_date: this.v_duedate };
        if (this.token != null){
          fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + this.token}
          })
          .then(response => {
            if (response.ok) {
              console.log('Task created successfully');
            } else {
              console.error('Error creating Task:', response.statusText);
            }
          })
          .catch(error => console.error('Error creating Task:', error));

        }
        else{
          console.error("need to log in");
        }

      
        },

      
        logUser(){
          console.log(this.v_username);
          console.log(this.v_password);
          const url2 = 'http://localhost:3001/api/login';
          const data2 = {username: this.v_username, password: this.v_password}
          fetch(url2, {
            method: 'POST',
            body: JSON.stringify(data2),
            headers: { 'Content-Type': 'application/json' }
          })
          .then(response => {
            if (response.ok) {
              response.json().then(data => {
                console.log(data);
                this.token = data.token;
              });
            } else {
              console.error('Error logging in:', response.statusText);
            }
          })
          .catch(error => console.error('Error logging in:', error));


        },
        
  
      addUser() {
        const url = 'http://localhost:3001/api/users';
        const data = { name: this.v_name, username: this.v_username, phone:this.v_phone, password: this.v_password };
        console.log(JSON.stringify(data));
        fetch(url, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
          if (response.ok) {
            console.log("going to log in");
            this.logUser();
          } else {
            console.error('Error creating user:', response.statusText);
          }
        })
        .catch(error => console.error('Error creating user:', error));
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
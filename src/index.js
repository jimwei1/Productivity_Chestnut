var blockedSites = ["facebook.com", "twitter.com", "instagram.com"];

// Get the current URL
var currentUrl = window.location.href;

// Check if the current URL matches the list of blocked websites
for (var i = 0; i < blockedSites.length; i++) {
  if (currentUrl.indexOf(blockedSites[i]) !== -1) {
    // Redirect to a custom message page
    window.location.replace("http://google.com");
  }
}

window.onload = function (e) {
  //Initialize the correct app

  //Create a new Vue object

  new Vue({
    template: `<div id="app">
    <div>
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
              <button @click="showSignup" id="signin-button" class="btn">Signup</button>
              <button @click="showProfile" id="profile-button"></button>
              <button @click="showSettings"id="settings-button"></button>
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
          <div id="container">
              <div id="settings-popup" class="popupSettings">
                <button class="tablink" v-on:click="openPage('Settings', $refs.settings, 'purple')">Settings</button>
                <button class="tablink" v-on:click="openPage('About', $refs.about, 'orange')">About</button>
                <button class="tablink" @click="hideSettings()">CLOSE</button>
          
                <div id="Settings" class="tabcontent" ref="settings">
                  <h3 style="font-size: 25px;">Settings:</h3>
                  <label for="alarm-sound" style="font-size: 16px;">Alarm Sound:</label>
                  <select id="alarm-sound" name="alarm-sound" style="font-size: 16px; padding: 6px;">
                    <option value="./sounds/alarm1.mp3" selected>Sound 1</option>
                    <option value="./sounds/alarm2.mp3">Sound 2</option>
                    <option value="./sounds/alarm1.mp3">Sound 3</option>
                  </select>
                </div>
          
                <div id="About" class="tabcontent" ref="about">
                  <h3 style="font-size: 25px;">About</h3>
                  <p style="font-size: 16px;">Productivity Chestnut is a Chrome extension designed to improve your productivity by blocking your access to a list of sites while
                  your study timer is active. The extension is named after our cat Chestnut. She's a lazy natured, fat kitty who never does any work.
                  We hope she may find our extension useful and become less lazy. We hope our users also find our extension useful and become more productive (and less lazy).
                  
                  Here's a picture of Chestnut:</p>
                  <img src="./images/cat1.jpg" style="width: 40%; margin-top: 10px;"">
                </div>
            </div>
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
        timerValue: "",
        tasks: [],
        timerDisplay: "05:00",
        blockListActive: false,
        audio: new Audio("./sounds/alarm1.mp3"),
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
        token: null,
        events: ["hi"],
        dcConn: "",
      

      };
    },
    mounted() {
        // Create the audio element
        this.audio = new Audio("./sounds/alarm1.mp3");
        this.openPage('Settings', this.$refs.news, 'green');
      },

    methods: {
      openPage(pageName, elmnt, color) {
        const tabcontents = this.$refs;
        Object.keys(tabcontents).forEach((key) => {
          if (key !== pageName) {
            tabcontents[key].style.display = 'none';
          }
        });

        // Remove the background color of all tab buttons
        const tablinks = document.getElementsByClassName('tablink');
        for (let i = 0; i < tablinks.length; i++) {
          tablinks[i].style.backgroundColor = '';
        }

        // Show the specific tab content
        if (elmnt) {
            elmnt.style.display = 'block';
            // Add the specific color to the button used to open the tab content
            elmnt.previousElementSibling.style.backgroundColor = color;
          }


      },
      updateTimer() {
        const minutes = Math.floor(this.timeLeft / 60).toString().padStart(2, "0");
        const seconds = (this.timeLeft % 60).toString().padStart(2, "0");
        const timerString = `${minutes}:${seconds}`;
        this.timerDisplay = timerString;
        this.timeLeft--;
        if (this.timeLeft < 0) {
          clearInterval(this.timerInterval);
          this.timerDisplay = "Time's up!";
          const theAudio = document.getElementById("alarm-sound").value;
          this.audio = new Audio(theAudio);
          console.log(this.audio);
          this.audio.play();
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
      hideSettings(){
        let popupSe = document.getElementById("settings-popup");
        popupSe.classList.remove("open-popup");

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

      showProfile() {
        const an_alert = "Hi, "+this.v_username;
        alert(an_alert);
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
      showSettings(){
        /* show settings popup */
        let popupSe = document.getElementById("settings-popup");
        popupSe.classList.add("open-popup");
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
        if(this.newUrl!="") {
          this.urls.push(this.newUrl);
        }
        const url = 'http://localhost:3001/api/blocking';
        const data = { url: this.newUrl};
        if (window.localStorage.getItem("token") != null){
          fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + window.localStorage.getItem("token")}
          })
          .then(response => {
            if (response.ok) {
              console.log('Url created successfully');
            } else {
              console.error('Error creating Url:', response.statusText);
            }
          })
          .catch(error => console.error('Error creating Url:', error));

        }
        else{
          console.error("need to log in");
        }
        
      },
      addTask() {
        if(this.v_duedate <= "2023-04-16"){
          alert("need a future data");
          return;
        }
        
        const url = 'http://localhost:3001/api/tasks';
        
        const data = { name: this.v_task, priority: 3, due_date: this.v_duedate };
        if (window.localStorage.getItem("token") != null){
          fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' +  window.localStorage.getItem("token")}
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
                window.localStorage.setItem("token", data.token);
              });
              this.hideLogin();
              const logbutton = document.getElementById("login-button");
              logbutton.style.visibility = "hidden";
              const signbutton = document.getElementById("signin-button");
              signbutton.style.visibility = "hidden";
              const profileButton = document.getElementById("profile-button");
              profileButton.style.visibility = "visible";


              const urlTask = 'http://localhost:3001/api/tasks';
              fetch(urlTask, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + window.localStorage.getItem("token") }
              })
              .then(response => {
                if (response.ok) {
                  response.json().then(data => {
                    
                    for (let aTask in data) {
                      this.tasks.push(data[aTask]["name"]+", "+data[aTask]["due_date"]);
                    }
                  });
                  
                }
                else {
                  console.error('Error finding tasks:', response.statusText);
                }
              })
              .catch(error => console.error('Error finding tasks:', error));

              const urlTask2 = 'http://localhost:3001/api/blocking';
              fetch(urlTask2, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + window.localStorage.getItem("token") }
              })
              .then(response2 => {
                if (response2.ok) {
                  response2.json().then(data => {
                    console.log(data)
                    for (let aUrl in data) {
                      console.log(data[aUrl]["url"])
                      this.urls.push(data[aUrl]["url"]);
                    }
                  });
                  
                }
                else {
                  console.error('Error finding tasks:', response.statusText);
                }
              })
              .catch(error => console.error('Error finding tasks:', error));

            

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
      },
      eventsToDisplay(){
        return this.events.slice().reverse();
      }
    },

    el: "#app",
  });
};
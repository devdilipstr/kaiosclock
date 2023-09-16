var currtime  =""
var schedules = {}
var ringlinks = {}
// Function to fetch and process the JSON file
function fetchJSONFile(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.overrideMimeType("application/json");
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4 && xhr.status === 200) {
        callback(xhr.responseText);
      }
    };
    xhr.send(null);
  }

  // Usage
  fetchJSONFile("https://api.npoint.io/ccfb7235b837c41c99f7", function (response) {
    var data = JSON.parse(response);
    // Process the JSON data
    schedules = data
  });
  fetchJSONFile("https://api.npoint.io/d04ba3574333e7967aaf", function (response) {
    var data = JSON.parse(response);
    // Process the JSON data
    ringlinks = data
  });
  


const digitalSecond = document.querySelector("#digital-second");
const digitalMinute = document.querySelector("#digital-minute");
const digitalHour = document.querySelector("#digital-hour");
const ring = document.getElementById("rings")
const loudring = document.getElementById("loudrings")
const timeline =  document.querySelector(".timeline")

let min = 0;
let sec = 0;
let h = 0;
function sound() {
    
    ring.currentTime = 0;
        
    ring.play()
}
function loudsound() {
    loudring.currentTime = 0;
        
    loudring.play()
}


const twoDigitNum = (num) => {
    if (num < 10) {
        return `0${num}`;
    }
    return num;
};

function clock() {
    const date = new Date();
    sec = date.getSeconds() * 6;
    if (sec === 0) {
       
    } else {
       
    }

    if (min === 0) {
        min = date.getMinutes() * 6;
    }

    // movement of minute needle in one seconde
    // (total rotation / total minutes round) / total second in a minute
    // (360 / 60) / 60
    
    min += 6 / 60;
    
    if (h === 0) {
        h = date.getHours() * 30;
    }

    // movement of hour needle in one second
    // (total rotation / total rounds (12)) / total second in an hour
    // (360 / 12) / (60 * 60)
    h += 30 / (60 * 60);

    if(date.getMinutes()==0 && date.getSeconds()==0){
        sound()
        
    }
    currtime = date.getHours().toString() +":"+ date.getMinutes().toString() + ":" + date.getSeconds().toString()
    if(Object.keys(schedules).includes(currtime)){
        loudsound()
        timeline.innerHTML = schedules[currtime]
        setTimeout(() => {
            timeline.innerHTML = ""
        },10000);
    }

    digitalHour.innerHTML = twoDigitNum(date.getHours());
    digitalMinute.innerHTML = twoDigitNum(date.getMinutes());
    digitalSecond.innerHTML = twoDigitNum(date.getSeconds());


}
clock();
setInterval(clock, 1000);

// declare some useful variables
const timer = document.querySelector("h2");
const selectMenu = document.querySelectorAll("select");
const setAlarmBtn = document.querySelector("#setAlarmBtn");
let alarmArray = [],
  alarmCount = 0,
  alarmTime,
  ring = new Audio("assets/ringtone.mp3");
// Script for Time and Date

function displayClock() {
  let date = new Date();
  var hour = date.getHours(),
    min = date.getMinutes(),
    sec = date.getSeconds(),
    ampm = "AM";

  if (hour >= 12) {
    hour = hour - 12;
    ampm = "PM";
  }
  hour = hour == 0 ? (hour = 12) : hour;
  hour = hour < 10 ? "0" + hour : hour;
  min = min < 10 ? "0" + min : min;
  sec = sec < 10 ? "0" + sec : sec;

  //display time
  timer.innerHTML = `${hour}:${min}:${sec} ${ampm}`;

  for (let i = 0; i < alarmArray.length; i++) {
    if (alarmArray[i] == `${hour}:${min}:${sec} ${ampm}`) {
      console.log("Alarm ringing...");
      ring.loop = true;
      ring.load();
      ring.play();
      document.querySelector("#stopAlarm").style.visibility = "visible";
      let dtdp = document.getElementById("dt-Display");
      blink = setInterval(function () {
        dtdp.classList.add("dtDisplay");
        setTimeout(() => {
          dtdp.classList.remove("dtDisplay");
        }, 500);
      }, 1000);
    }
  }
} 

//loading and update clock 
function loadClock() {
  displayClock();
  window.setInterval("displayClock()", 1000);
}

//Set Alarm section
for (let i = 12; i > 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[0].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 59; i >= 0; i--) {
  i = i < 10 ? "0" + i : i;
  let option = `<option value="${i}">${i}</option>`;
  selectMenu[1].firstElementChild.insertAdjacentHTML("afterend", option);
}

for (let i = 2; i > 0; i--) {
  let ampm = i == 1 ? "AM" : "PM";
  let option = `<option value="${ampm}">${ampm}</option>`;
  selectMenu[2].firstElementChild.insertAdjacentHTML("afterend", option);
}

//add alarm
function setAlarm() {
  let time = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;
  if (
    time.includes("Hour") ||
    time.includes("Minute") ||
    time.includes("AM/PM")
  ) {
    alert("Please, Select a Valide Input");
  } else {
    alarmCount++;
    document.querySelector("#stopAlarm").style.visibility = "visible";
    document.querySelector(".activeAlarm").innerHTML += `
      <div class="alarmText" id="alarm${alarmCount}">
          <span id="span${alarmCount}">${time}</span>
          <button class="btn-delete" id="${alarmCount}" onClick="deleteAlarm(this.id)">Delete</button>
      </div>`;

    alarmTime = `${selectMenu[0].value}:${selectMenu[1].value}:00 ${selectMenu[2].value}`;
    alarmArray.push(alarmTime);
    selectMenu[0].value = "Hour";
    selectMenu[1].value = "Minute";
    selectMenu[2].value = "AM/PM";
  }
}

// click event on Set Alarm button
setAlarmBtn.addEventListener("click", setAlarm);

//Stop Alarm
function stopAlarm() {
  ring.pause();
  ring.loop = false;
  clearInterval(blink);
  document.querySelector("#stopAlarm").style.visibility = "hidden";
}

//delete alarm
function deleteAlarm(click_id) {
  var element = document.getElementById("alarm" + click_id);
  var deleteIndex = alarmArray.indexOf(
    document.querySelector("#span" + click_id).innerText
  );
  alarmArray.splice(deleteIndex, 1);
  element.remove();
}

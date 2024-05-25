function startTimer(duration, display) {
    var timer = duration, minutes, seconds;

    function updateDisplay() {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = 0;
            // Uncomment the following line if you want to reset the timer automatically after reaching 0
            // timer = duration;
        }
    }

    updateDisplay(); // Initial call to update display immediately
    setInterval(updateDisplay, 1000);
}

window.onload = function () {
    var time = 1500; // Your time in seconds here (25 minutes)
    var display = document.querySelector('#safeTimerDisplay');
    var startButton = document.querySelector('#startButton');

    startButton.addEventListener('click', function () {
        startTimer(time, display);
        startButton.disabled = true;
    });
    
};

//loads/initializes schedule from local storage, returning as a schedule object
function loadSchedule() {
    //eventdate and taskdeadline are data objects
    //eventtime and taskttime in minutes
    //schedule = {events:[{eventdate, eventname, eventtime}], tasks:[{taskname, tasktime, taskdeadline, taskcompleted}]}
    temp = localStorage.getItem("Schedule");
    if (temp != NULL) {
        schedule = JSON.parse();
    }
    else {
        localStorage.setItem("Schedule", {events: [], tasks: []});
        schedule = [];
    }
    return schedule;
}

//adds event to local storage schedule object
function addEvent(name, time, year, month, day, hours, minutes) {
    schedule = loadSchedule();
    date = new Date(year, month, days, hours, minutes);
    evnt = {eventdate: date, eventname: name, eventtime: time};
    schedule.event.push(evnt);
    localStorage.setItem("Schedule", JSON.stringify(schedule));
}

//adds task to local storage schedule object
function addTask(name, time, year, month, day, hours, minutes) {
    schedule = loadSchedule();
    date = new Date(year, month, days, hours, minutes);
    task = {taskname: name, tasktime: time, taskdeadline: deadline, taskcompleted: "false"};
    schedule.tasks.push(task);
    localStorage.setItem("Schedule", JSON.stringify(schedule));
}

//removes event from local storage schedule object
function removeEvent(name, year, month, day, hours, minutes) {
    schedule = loadSchedule();
    events = schedule.events;
    date = new Date(year, month, day, hours, minutes);
    for(let i = 0; i < events; i++) {
        evnt = schedule.events[i];
        if(evnt.eventname == name && evnt.eventdate == date) {
            
        }
    }
}

//removes task from local storage schedule object
function removeTask(name) {
    //TODO
}


//calculates optimal schedule to complete tasks around events
function autoSchedule() {
    schedule = loadSchedule;
    //TODO
    localStorage.setItem("Schedule", JSON.stringify(schedule));
}

//returns list of incomplete task objects
function allIncompleteTasks() {
    schedule = loadSchedule;
    alltasks = schedule.tasks;
    incompletetasks = []
    for(let i = 0; i < alltasks.length; i++) {
        if(alltasks[i].taskcompleted == "false") {
            incompletetasks.push(alltasks[i]);
        }
    }
    return incompletetasks;
}


document.addEventListener("DOMContentLoaded", function() {
    console.log("DOM fully loaded and parsed");

    const uploadButton = document.querySelector("#uploadButton");
    const fileInput = document.querySelector("#fileInput");

    console.log("Button:", uploadButton);
    console.log("File Input:", fileInput);

    uploadButton.addEventListener("click", function() {
        console.log("Upload button clicked");
        fileInput.click();
    });

    fileInput.addEventListener("change", function(event) {
        console.log("File input changed");
        const file = event.target.files[0];
        if (file) {
        console.log("File selected:", file.name);
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const fileContent = e.target.result;
                const blob = new Blob([fileContent], { type: file.type });
                console.log("Blob created:", blob);
                // Now you can use the blob object as needed

                const parsedData = ICAL.parse(blob);
                //console.log(parsedData); // Do something with the parsed data
                //alert("Parsing successful! Check console for details.");
            } catch (error) {
            console.error("Parsing error:", error);
            alert("Failed to parse iCalendar file.");
            }
        };
        reader.readAsText(file);
    }
    });
});


const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");


const li = document.createElement("li");

function insertTask() {
    const task = inputBox.value.trim();
    li.innerHTML = `
        <label>
            <input type="checkbox">
            <span>${task}</span>
        </label>
        <span class="edit-btn">Edit</span>
        <span class="delete-btn">Delete</span>
        `;

    listContainer.append(li);
    inputBox.value = "";
}

const checkbox = li.querySelector("input");
const editBtn = li.querySelector(".edit-btn");
const taskSpan = li.querySelector("span");
const deleteBtn = li.querySelector(".delete-btn");

checkbox.addEventListener("click", function () {
    li.classList.toggle("completed", checkbox.checked);
  });






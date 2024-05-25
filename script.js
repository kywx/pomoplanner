function startTimer(duration, display, pause=0) {
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
    
    if (!pause) {
        updateDisplay(); // Initial call to update display immediately
        setInterval(updateDisplay, 1000);
    }
}

window.onload = function () {
    var time = 1500; // Your time in seconds here (25 minutes)
    var display = document.querySelector('#safeTimerDisplay');
    var startButton = document.querySelector('#startButton');

    startButton.addEventListener('click', function () {
        if (startButton.textContent = "Restart") {
            startTimer(time, display);
            startButton.textContent = "Start Timer";
        } else {
            startTimer(time, display, 1);
            startButton.textContent = "Restart";
        }
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
        localStorage.setItem("Schedule", {"events": [], "tasks": []});
        schedule = [];
    }
    return schedule;
}

//adds event to local storage schedule object
function addEvent(name, time, year, month, day, hours, minutes) {
    schedule = loadSchedule();
    date = new Date(year, month, days, hours, minutes);
    evnt = {"eventdate": date, "eventname": name, "eventtime": time};
    schedule.events.push(evnt);
    localStorage.setItem("Schedule", JSON.stringify(schedule));
}

//adds task to local storage schedule object
function addTask(name, time, year, month, day, hours, minutes) {
    schedule = loadSchedule();
    date = new Date(year, month, days, hours, minutes);
    task = {"taskname": name, "tasktime": time, "taskdeadline": deadline, "taskcompleted": "false"};
    schedule.tasks.push(task);
    localStorage.setItem("Schedule", JSON.stringify(schedule));
}

//removes event from local storage schedule object
function removeEvent(name, year, month, day, hours, minutes) {
    schedule = loadSchedule();
    events = schedule.events;
    date = new Date(year, month, day, hours, minutes);
    for(let i = 0; i < events.length(); i++) {
        evnt = schedule.events[i];
        if(evnt.eventname == name && evnt.eventdate == date) {
            events.splice(i, 1);
            break;
        }
    }
    schedule.events = events;
    localStorage.setItem("Schedule", JSON.stringify(schedule));
}

//removes task from local storage schedule object
function removeTask(name, year, month, day, hours, minutes) {
    schedule = loadSchedule();
    tasks = schedule.tasks;
    date = new Date(year, month, day, hours, minutes);
    for(let i = 0; i < tasks.length(); i++) {
        task = schedule.tasks[i];
        if(evnt.eventname == name && evnt.eventdate == date) {
            tasks.splice(i, 1);
            break;
        }
    }
    schedule.tasks = tasks;
    localStorage.setItem("Schedule", JSON.stringify(schedule));
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


function generateDaySchedule(year, month, day) {
    schedule = loadSchedule();
    filter = new Date(year, month, day);
    events = schedule.events;
    tasks = schedule.tasks;
    dayevents = [];
    daytasks = [];
    for(let i = 0; i < events.length(); i++) {
        
    }
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
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");

function updateCounters() {
  const completedTasks = document.querySelectorAll(".completed").length;
  const uncompletedTasks = document.querySelectorAll("li:not(.completed)").length;

  completedCounter.textContent = completedTasks;
  uncompletedCounter.textContent = uncompletedTasks;
}

function insertTask() {
  const task = inputBox.value.trim();
  if (!task) {
    alert("Please write down a task");
    console.log("no task added");

    return;
  }

  const li = document.createElement("li");
  li.innerHTML = `
    <label>
      <input type="checkbox">
      <span>${task}</span>
    </label>
    <span class="edit-btn">Edit</span>
    <span class="delete-btn">Delete</span>
    `;

  listContainer.appendChild(li);

  // clear the input field
  inputBox.value = " ";

  // attach event listeners to the new task
  const checkbox = li.querySelector("input");
  const editBtn = li.querySelector(".edit-btn");
  const taskSpan = li.querySelector("span");
  const deleteBtn = li.querySelector(".delete-btn");

  // strike out the completed task
  checkbox.addEventListener("click", function () {
    li.classList.toggle("completed", checkbox.checked);
    updateCounters();
  });

  editBtn.addEventListener("click", function () {
    const update = prompt("Edit task:", taskSpan.textContent);
    if (update !== null) {
      taskSpan.textContent = update;
      li.classList.remove("completed");
      checkbox.checked = false;
      updateCounters();
    }
  });

  deleteBtn.addEventListener("click", function () {
    if (confirm("Are you sure you want to delete this task?")) {
      li.remove();
      updateCounters();
    }
  });
  updateCounters();
}

// add task when pressing Enter key
inputBox.addEventListener("keyup", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});
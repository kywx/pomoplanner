import ICAL from "./node_modules/ical.js/dist/ical.js";

document.addEventListener('DOMContentLoaded', function() { // Checklist pause, double click
    const checklist = document.getElementById('checklist');
  
    checklist.addEventListener('click', function(event) {
      if (event.target.type === 'checkbox') {
        event.preventDefault(); // Prevent the default click behavior
      }
    });
  
    checklist.addEventListener('dblclick', function(event) {
      if (event.target.type === 'checkbox') {
        event.target.checked = !event.target.checked;
        // Trigger the animations manually
        event.target.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  });


  document.addEventListener('DOMContentLoaded', function() { // Links List Listener
    const animatedButton = document.querySelector('.animated-button');
    const taskList = document.getElementById('taskList');
  
    let index = 1; // Starting index for new tasks
  
    animatedButton.addEventListener('click', function() {
      // Create new list item
      const listItem = document.createElement('li');
      listItem.classList.add('user');
  
      // Create task-link span (editable)
      const taskLinkSpan = document.createElement('span');
      taskLinkSpan.contentEditable = true;
      taskLinkSpan.classList.add('task-link');
      taskLinkSpan.textContent = 'New Link ' + index;
  
      // Create task span (editable)
      const taskSpan = document.createElement('span');
      taskSpan.contentEditable = true;
      taskSpan.classList.add('task');
      taskSpan.textContent = 'www.newlink.com';
  
      // Append spans to list item
      listItem.appendChild(taskLinkSpan);
      listItem.appendChild(taskSpan);
  
      // Append list item to task list
      taskList.appendChild(listItem);
  
      index++; // Increment index for next task
    });
  });
  

  document.addEventListener('DOMContentLoaded', function() { // Checkbox listener
    const addCheckboxButton = document.querySelector('.CheckListButton');
    const checklist = document.getElementById('checklist');
    let index = 4; // Starting index for new checkboxes

    addCheckboxButton.addEventListener('click', function() {
      // Create new checkbox
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.name = 'r';
      checkbox.value = index;
      checkbox.id = '0' + index;

      // Create label for checkbox
      const label = document.createElement('label');
      label.htmlFor = '0' + index;
      label.contentEditable = true;
      label.textContent = 'New Item ' + index; // Example text for new item

      // Append checkbox and label to checklist
      checklist.appendChild(checkbox);
      checklist.appendChild(label);
      //checklist.appendChild(document.createElement('br')); // Optional line break

      index++; // Increment index for next item
    });
  });
  

let intID;
let savedtime;

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
            // add beeping>?
        }
        savedtime = timer;
        
    }
    
    updateDisplay(); // Initial call to update display immediately
    return setInterval(updateDisplay, 1000);
}

function pauseTimer(intervalID) {
    clearInterval(intervalID);
}

/*
function resetTimer(intervalID, timer, display) {
    clearInterval(intervalID);
    display.textContent = "25:00";
}
*/

function restartTimer(intervalID, time, display) {
    clearInterval(intervalID);
    return startTimer(time, display);
}


function resumeTimer(intervalID, display) {
    clearInterval(intervalID);
    return startTimer(savedtime, display);
}


window.onload = function () {
    var time = 1500; // Your time in seconds here (25 minutes)
    var display = document.querySelector('#safeTimerDisplay');
    var startButton = document.querySelector('#startButton');
    var pauseButton = document.querySelector('#pau');
    savedtime = time;

    startButton.addEventListener('click', function () {
        
        if (startButton.textContent == "Start Timer") {
            intID = startTimer(time, display);
            startButton.textContent = "Restart Timer";
            pauseButton.checked = 'true';
        } else {
            pauseTimer(intID);
            savedtime = time;
            
            var minutes = parseInt(time / 60, 10);
            var seconds = parseInt(time % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;
            
            /*display.textContent = "25:00";*/
            startButton.textContent = "Start Timer";
            pauseButton.checked = false;
        }
        
        
    });

    pauseButton.addEventListener('click', function () {
        if (pauseButton.checked) {
            // resume
            if (startButton.textContent == "Start Timer") {
                startButton.textContent = "Restart Timer";
            }
            intID = resumeTimer(intID, display);
        } else {
            // pause
            pauseTimer(intID);
        }
    });
    
};




//loads/initializes schedule from local storage, returning as a schedule object
function loadSchedule() {
    //eventdate and taskdeadline are data objects
    //eventtime and taskttime in minutes
    //schedule = {"events":[{"eventdate": Date(), "eventname": , "eventtime"}],
                //"tasks":[{"taskname": , "tasktime": , "taskdeadline": Date(), "taskcompleted": }]}
    let schedule = localStorage.getItem("Schedule");
    if (schedule != null) {
        schedule = JSON.parse(schedule);
    }
    else {
        localStorage.setItem("Schedule", JSON.stringify({"events": [], "tasks": []}));
        schedule = {"events": [], "tasks": []};
    }
    return schedule;
}

function clearSchedule() {
    localStorage.setItem("Schedule", JSON.stringify({"events": [], "tasks": []}));
}

function printSchedule() {
    const schedule = loadSchedule();
    const events = schedule.events;
    const tasks = schedule.tasks;
    console.log(events);
    console.log(tasks);
}

//adds event to local storage schedule object
function addEvent(name, time, year, month, day, hours, minutes) {
    const schedule = loadSchedule();
    const date = new Date(year, month, day, hours, minutes);
    const evnt = {"eventdate": date, "eventname": name, "eventtime": time};
    schedule.events.push(evnt);
    localStorage.removeItem("Schedule");
    localStorage.setItem("Schedule", JSON.stringify(schedule));
}

//adds task to local storage schedule object
function addTask(name, time, year, month, day, hours, minutes) {
    const schedule = loadSchedule();
    const date = new Date(year, month, day, hours, minutes);
    const task = {"taskname": name, "tasktime": time, "taskdeadline": deadline, "taskcompleted": "false"};
    schedule.tasks.push(task);
    localStorage.removeItem("Schedule");
    localStorage.setItem("Schedule", JSON.stringify(schedule));
}

//removes event from local storage schedule object
function removeEvent(name, year, month, day, hours, minutes) {
    const schedule = loadSchedule();
    const events = schedule.events;
    const date = new Date(year, month, day, hours, minutes);
    for(let i = 0; i < events.length(); i++) {
        evnt = schedule.events[i];
        if(evnt.eventname == name && new Date(evnt.eventdate) == date) {
            events.splice(i, 1);
            break;
        }
    }
    schedule.events = events;
    localStorage.removeItem("Schedule");
    localStorage.setItem("Schedule", JSON.stringify(schedule));
}

//removes task from local storage schedule object
function removeTask(name, year, month, day, hours, minutes) {
    const schedule = loadSchedule();
    const tasks = schedule.tasks;
    const date = new Date(year, month, day, hours, minutes);
    for(let i = 0; i < tasks.length(); i++) {
        const task = schedule.tasks[i];
        if(task.taskname == name && new Date(task.taskdeadline) == date) {
            tasks.splice(i, 1);
            break;
        }
    }
    schedule.tasks = tasks;
    localStorage.removeItem("Schedule");
    localStorage.setItem("Schedule", JSON.stringify(schedule));
}


//calculates optimal schedule to complete tasks around events
function autoSchedule() {
    const schedule = loadSchedule();
    sortEvents();
    const events = generateFutureEvents();
    const tasks = allIncompleteTasks();
    const newschedule = [];
    tasks.sort((a,b) => new Date(a.taskdeadline).getTime() - new Date(b.taskdeadline).getTime());
    for(let i = 0; i < tasks.length; i++) {
        
    }
}

//returns list of incomplete task objects
function allIncompleteTasks() {
    const schedule = loadSchedule();
    const alltasks = schedule.tasks;
    const incompletetasks = []
    for(let i = 0; i < alltasks.length; i++) {
        if(alltasks[i].taskcompleted == "false") {
            incompletetasks.push(alltasks[i]);
        }
    }
    return incompletetasks;
}

function markTaskComplete(name, year, month, day, minutes) {
    const schedule = loadSchedule();const tasks = schedule.tasks;
    const date = new Date(year, month, day, hours, minutes);
    for(let i = 0; i < tasks.length(); i++) {
        task = schedule.tasks[i];
        if(task.taskname == name && new Date(task.taskdeadline) == date) {
            tasks.taskcompleted = "true";
            break;
        }
    }
    schedule.tasks = tasks;
    localStorage.removeItem("Schedule");
    localStorage.setItem("Schedule", JSON.stringify(schedule));
}


function generateDayEvents(year, month, day) {
    const schedule = loadSchedule();
    const filter = new Date(year, month, day);
    const events = schedule.events;
    const dayevents = [];
    for(let i = 0; i < events.length(); i++) {
        if(filter.getDay() == new Date([i].eventdate).getDay()) {
            dayevents.push(events[i]);
        }
    }
    return dayevents;
}


function generateMonthEvents(year, month, day) {
    const schedule = loadSchedule();
    const filter = new Date(year, month, day);
    const events = schedule.events;
    const monthevents = [];
    for(let i = 0; i < events.length(); i++) {
        if(filter.getMonth() == new Date(events[i].eventdate).getMonth()) {
            monthevents.push(events[i]);
        }
    }
    return monthevents;
}


function generateFutureEvents() {
    const schedule = loadSchedule();
    const today = new Date();
    const events = schedule.events;
    const futureevents = [];
    for(let i = 0; i < events.length(); i++) {
        if(today < new Date(events[i].eventdate)) {
            futureevents.push(events[i]);
        }
    }
    return futureevents;
}


function generateCurrentEvents() {
    const today = new Date();
    generateDayEvents(today.year, today.month, today.day);
}


function sortEvents() {
    const schedule = loadSchedule();
    const events = schedule.events;
    events.sort((a,b) => new Date(a.eventdate) - new Date(b.eventdate));
    schedule.events = events;
    localStorage.removeItem("Schedule");
    localStorage.setItem("Schedule");
}



function updateSchedule() {
    const scheduleContainer = document.getElementById("schedule");
    
    const schedule = loadSchedule();
    const events = schedule.events;

    events.forEach(event => {
        const eventCard = document.createElement("div");
        eventCard.classList.add("event-card");
        
        const eventName = document.createElement("h1");
        eventName.textContent = event.eventname;
        
        const eventDate = document.createElement("p");
        eventDate.textContent = event.eventdate;
        
        eventCard.appendChild(eventName);
        //eventCard.appendChild(eventDate);
        eventCard.appendChild(eventDate);

        scheduleContainer.appendChild(eventCard);
    });
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
                // reads the file content
                const fileContent = e.target.result;

                // clears schedule from last run
                clearSchedule();
                
                // parses the ical daa
                const parsedData = ICAL.parse(fileContent);
                const today= new Date();

                // iterate over events in the iCal object
                const events = parsedData[2];
                const schedule = loadSchedule(); 

                for (const num in events) {
                    const event = events[num];
                    if (event[0] == 'vevent') {
                        // event[1] contains the data for one event
                        const data = event[1];
                        //const jdata = JSON.stringify(data);

                        let dtstart, dtend, summary;

                        // find start, end, and name of event
                        data.forEach(item => {
                            switch(item[0]) {
                                case "dtstart":
                                    dtstart = new Date(item[3]);
                                    break;
                                case "dtend":
                                    dtend = new Date(item[3]);
                                    break;
                                case "summary":
                                    summary = item[3];
                                    break;
                            }
                        });
                        
                        // subtracting  start and end time returns milliseconds
                        const differenceInMilli = dtend.getTime()- dtstart.getTime();
                        const differenceInMinutes = differenceInMilli / (1000 * 60);

                        /*console.log("Start Date:", dtstart);
                        console.log("End Date:", dtend);
                        console.log("Summary:", summary);*/
                        // Check if event is for today or later
                        if (dtstart.getDate() >= today.getDate()) {
                            addEvent(summary, 
                                    dtstart.getTime(), 
                                    differenceInMinutes, 
                                    dtstart.getFullYear(), 
                                    dtstart.getMonth(), 
                                    dtstart.getDate(), 
                                    dtstart.getHours(), 
                                    dtstart.getMinutes());
                        }
                    }
                }
                printSchedule();
                updateSchedule();
                alert("Parsing successful! Check console for details.");
            } catch (error) {
            console.error("Parsing error:", error);
            alert("Failed to parse iCalendar file.");
            }
        };
        reader.readAsText(file);
    }
    });
});


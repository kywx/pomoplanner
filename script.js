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
let savedtime;      // when break, use savedtime
let breaks = 0;
let on_break = 0;
const m_startButton = document.querySelector('#startButton');
const m_pauseButton = document.querySelector('#pau');

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
            if (on_break) {
                // go back to Pomodoro
                clearInterval(intID);
                window.alert("Break is over :(");
                on_break = 0;
                m_startButton.textContent = "Start Timer";
                m_pauseButton.checked = false;
            } else {
                on_break = 1;
                breaks += 1;
                savedtime = 300;   // 5 minutes
                if (breaks > 4) {
                    breaks = 0;
                    savedtime = 1200;  // 20 minutes
                }
                clearInterval(intID);
                window.alert("Break time :)");
                m_startButton.textContent = "Start Break";
                m_pauseButton.checked = false;
            }
            return;
        }
        savedtime = timer;
        
    }
    
    updateDisplay(); // Initial call to update display immediately
    return setInterval(updateDisplay, 1000);
}

function pauseTimer(intervalID) {
    clearInterval(intervalID);
}


function restartTimer(intervalID, time, display) {
    clearInterval(intervalID);
    return startTimer(time, display);
}


function resumeTimer(intervalID, display) {
    clearInterval(intervalID);
    return startTimer(savedtime, display);
}



window.onload = function () {
    var time = 1500; // Your time in seconds here 1500 (25 minutes)
    var display = document.querySelector('#safeTimerDisplay');
    var startButton = document.querySelector('#startButton');
    var pauseButton = document.querySelector('#pau');
    savedtime = time;

    m_startButton.addEventListener('click', function () {
        
        if (m_startButton.textContent == "Start Timer") {
            intID = startTimer(time, display);
            m_startButton.textContent = "Restart Timer";
            pauseButton.checked = 'true';
        } else if (m_startButton.textContent == "Start Break") {
            intID = startTimer(savedtime, display);
            m_startButton.textContent = "Restart Pomodoro";
            pauseButton.checked = 'true';
        } else {
            on_break = 0;
            pauseTimer(intID);
            savedtime = time;
            
            var minutes = parseInt(time / 60, 10);
            var seconds = parseInt(time % 60, 10);

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = minutes + ":" + seconds;
            
            m_startButton.textContent = "Start Timer";
            pauseButton.checked = false;
        }
        
    });

    pauseButton.addEventListener('click', function () {
        if (pauseButton.checked) {
            // resume
            if (m_startButton.textContent == "Start Timer") {
                m_startButton.textContent = "Restart Timer";
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
    const newschedule = events;
    tasks.sort((a,b) => new Date(a.taskdeadline).getTime() - new Date(b.taskdeadline).getTime());
    for(let i = 0; i < tasks.length; i++) {
        for(let j = 0; j < newschedule.length; j++) {
            //if task can fit between two elements and/or last element
            if(newschedule[j].hasOwn('eventdate')) {
                prev = new Date(newschedule[j].eventdate).getTime() + parseInt(newschedule[j].eventtime);
            }
            else {
                prev = new Date(newschedule[j].taskdate).getTime() + parseInt(newschedule[j].taskdeadline);
            }
            if(j != events.length - 1) {
                if(newschedule[j+1].hasOwn('eventdate')) {
                    next = new Date(newschedule[j+1].eventdate).getTime();
                }
                else {
                    next = new Date(newschedule[j+1].taskdate).getTime();
                }
                if(prev + parseInt(tasks[i].time) < next) {
                    newschedule.splice(j+1, 0, tasks[i]);
                    break;
                }
            }
            else {
                newschedule.splice(j+1, 0, tasks[i]);
                break;
            }
        }
    }
    return newschedule;
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

//
document.addEventListener('DOMContentLoaded', function() {
    const checkbox = document.getElementById('checkbox_toggle');
    const dailySchedule = document.getElementById('daily-schedule');
    const monthlySchedule = document.getElementById('monthly-schedule');
  
    checkbox.addEventListener('change', function() {
      if (checkbox.checked) {
        dailySchedule.style.display = 'block';
        monthlySchedule.style.display = 'none';
      } else {
        dailySchedule.style.display = 'none';
        monthlySchedule.style.display = 'block';
      }
    });
});

function sortEvents() {
    const schedule = loadSchedule();
    const events = schedule.events;
    events.sort((a,b) => new Date(a.eventdate) - new Date(b.eventdate));
    schedule.events = events;
    localStorage.removeItem("Schedule");
    localStorage.setItem("Schedule");
}

function updateMonthlySchedule () {
    const scheduleContainer = document.getElementById("monthly-schedule");
    
    const schedule = loadSchedule();
    const events = schedule.events;
    console.log("loaded monthly schedule")

    events.forEach(event => {
        const eventName = event.eventname;
        const fdate = new Date(event.eventdate);
        const day = fdate.getDay();
        const duration = event.eventtime / 60;
        const endDate = new Date(fdate.getTime() + duration * 60000 * 60);
        const cell = document.getElementById(`day-${day}`);
        if (cell) {
            cell.innerHTML += `<br><span class="additional-text">${eventName 
            + ": " + fdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + "-" + endDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>`;
        }
    })
}


function updateDailySchedule() {
    const scheduleContainer = document.getElementById("daily-schedule");
    
    const schedule = loadSchedule();
    const events = schedule.events;

    events.forEach(event => {
        const eventCard = document.createElement("div");
        eventCard.classList.add("event-card");
        
        const eventName = document.createElement("h1");
        eventName.classList.add("event-name");
        eventName.textContent = event.eventname;
        
        const eventDate = document.createElement("p");
        eventDate.classList.add("event-date");
        const fdate = new Date(event.eventdate);
        const duration = event.eventtime / 60;
        const newDate = new Date(fdate.getTime() + duration * 60000 * 60);
        eventDate.textContent = fdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) + "-" + newDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        eventCard.style.height = duration * 60 + "px"

        eventCard.appendChild(eventName);
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
                        //function addEvent(name, time, year, month, day, hours, minutes) {
                        if (dtstart.getDate() == today.getDate()) {
                            addEvent(summary,  
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
                updateDailySchedule();
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


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

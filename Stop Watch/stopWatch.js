let timerDisplay = document.querySelector('.time');
let startBtn = document.querySelector('.start');
let stopBtn = document.querySelector('.stop');
let resetBtn = document.querySelector('.reset');
let lapBtn = document.querySelector('.lap');

let secs = 0;
let mins = 0;
let hrs = 0;

let timerId = null;
let x = 1; // Define a variable to keep track of the lap number

let running = false; // Define the running variable

startBtn.addEventListener('click', function() {
    if (timerId !== null) {
        clearInterval(timerId);
    }
    timerId = setInterval(startTimer, 1000);
    startBtn.disabled = true;
    running = true; // Set running to true when the timer starts
    document.getElementById('validation').textContent = " ";
});

stopBtn.addEventListener('click', function() {
    clearInterval(timerId);
    timerId = null;
    startBtn.disabled = false;
    running = false; // Set running to false when the timer stops
    document.getElementById('validation').textContent = " ";
});

resetBtn.addEventListener('click', function() { 
    clearInterval(timerId);
    secs = 0;
    mins = 0;
    hrs = 0;
    timerDisplay.innerHTML = '00 : 00 : 00';
    startBtn.disabled = false;
    running = false; // Ensure running is false after reset
    document.querySelector("#lap").innerHTML = ''; // Clear lap records on reset
    x = 1; // Reset lap number
    document.getElementById('validation').textContent = " ";
});
lapBtn.addEventListener('click', recordLap);


function recordLap() {
    
    // You need to define 'running' somewhere if you want to use it
    if (running) { // Use timerId to check if the timer is running
        let lapTime = document.querySelector(".time").textContent;
        let lapElement = document.createElement("div");
        lapElement.textContent = `Lap ${x}: ${lapTime}`;
        lapElement.classList.add("lap-shadow");// Add the lap-shadow class to the lap element
        document.querySelector("#lap").appendChild(lapElement);
        x++; // Increment the lap number
    }
    if(!running) {
        document.getElementById('validation').textContent = "The timer isn't running!";
    }
}


function startTimer() {
    secs++;
    if (secs === 60) {
        secs = 0;
        mins++;
        if (mins === 60) {
            mins = 0;
            hrs++;
        }
    }

    let secsString = secs < 10 ? `0${secs}` : `${secs}`;
    let minsString = mins < 10 ? `0${mins}` : `${mins}`;
    let hrsString = hrs < 10 ? `0${hrs}` : `${hrs}`;

    timerDisplay.innerHTML = `${hrsString} : ${minsString} : ${secsString}`;
}

// Write your code here.
let timer = document.getElementById("timer");
let start = document.getElementById("start-button");
let stop = document.getElementById("stop-button");
let reset = document.getElementById("reset-button");

let minutes = 00;
let seconds = 00;
let miliseconds = 000;
let clearInt = undefined;
let lastTimerStartTime = 0;
let intervalTime = 1000 / 60;
let milisecondsElapsedBeforeStop = 0;



start.addEventListener("click", () => {
    lastTimerStartTime = Date.now();
    start.disabled = true;
    stop.disabled = false;
    reset.disabled = true;

   clearInt = requestAnimationFrame(updateTimer)
});

stop.addEventListener("click", stopTimer);


reset.addEventListener("click", resetTimer);

function stopTimer(){
    milisecondsElapsedBeforeStop += Date.now() - lastTimerStartTime;
    cancelAnimationFrame(clearInt);
    start.disabled = false;
    stop.disabled = true;
    reset.disabled = false;
}

function resetTimer(){
    clearInterval(clearInt);
    start.disabled = false;
    stop.disabled = true;
    reset.disabled = true;
 
    lastTimerStartTime = Date.now();
    timer.innerHTML = `00:00:000`;
    milisecondsElapsedBeforeStop = 0;
}

function updateTimer() {

    let mili = Date.now() - lastTimerStartTime + milisecondsElapsedBeforeStop;
    let seconds = mili / 1000;
    let minutes = seconds / 60;

    let miliText = formatNumber(mili % 1000, 3);
    let secondText = formatNumber(Math.floor(seconds % 60),2);
    let minuteText = formatNumber(Math.floor(minutes),2);

    timer.textContent = `${minuteText}:${secondText}:${miliText}`;

    clearInt = requestAnimationFrame(updateTimer)

}

function formatNumber(number, desiredLength){
    let numberInString = String(number);
    if(numberInString.length > desiredLength){
        return numberInString.slice(0, desiredLength)
    }

    return numberInString.padStart(desiredLength, '0')
}
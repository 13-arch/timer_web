const timer = $('#timer');
const startButton = $('#start_btn');
const pauseButton = $('#pause_btn');
const resetButton = $('#reset_btn');
const skipButton = $('#skip_btn');
const addTaskButton = $("#addTask");
const body = $("#body");
const inputTask = $("#task");
const notCompletedTask = $("#notCompletedTask");
const completedTask = $("#completedTask");

let timePomodoro = 1500;   
let timeLong = 900;
let timeShort = 300;
let times_array_example = [timePomodoro, timeShort, timePomodoro, timeShort, timePomodoro, timeShort, timePomodoro, timeLong];
let times_array = []
let i = 0;
let timeInterval;

function endTask(i){
    if(i == (times_array_example.length - 1)){
        let task = $(".task").first().text();
        completedTask.append(`<p>${task}</p>`);
        $(".task").first().remove();
    }
}

function changeColor(i){
    if(i % 2 == 0){
        body.addClass("min25");
        body.removeClass("min15");
        body.removeClass("min5");
    } else if(i == (times_array_example.length - 1)){
        body.addClass("min15");
        body.removeClass("min25");
        body.removeClass("min5");
    } else{
        body.addClass("min5");
        body.removeClass("min25");
        body.removeClass("min15");
    }
}

function timeUpdate(time) {
    let minutes = Math.floor(time / 60);
    let seconds = time % 60;
    if (time < 0) {
        timer.text('00:00');
    } else {
        timer.text(
            `${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`
        );
    }
}
function startTimer() {
    times_array = Array.from(times_array_example)
    clearInterval(timeInterval);
    endTask(i);
    changeColor(i);
    timeInterval = setInterval(function () {
        times_array[i] --;
        timeUpdate(times_array[i]);
        if (times_array[i] <= 0) {
            i++;
            if (i >= times_array.length) {
                clearInterval(timeInterval);
                i = 0;
                timer.text('00:00');
                startButton.prop('disabled', false);
                return;
            }
            timeUpdate(times_array[i]);
        }
    }, 1000);
}

function addTask(){
    if(inputTask.val() == "" || inputTask.val() == " "){
        alert("123");
    } else{
        notCompletedTask.append(`<p class="task">${inputTask.val()}</p>`);
    }
}

startButton.on('click', function () {
    startTimer();
    startButton.prop('disabled', true);
});
pauseButton.on('click', function () {
    clearInterval(timeInterval);
    startButton.prop('disabled', false);
});
resetButton.on('click', function () {
    clearInterval(timeInterval);
    timer.text('00:00');
    startButton.prop('disabled', false);
    i = 0;
    times_array = [timePomodoro, timeShort, timePomodoro, timeShort, timePomodoro, timeShort, timePomodoro, timeLong];
});
skipButton.on('click', function () {
    clearInterval(timeInterval);
    i++;
    if (i >= times_array.length) {
        i = 0;
    }
    timeUpdate(times_array[i]);
    startTimer();
});

addTaskButton.on("click", addTask);
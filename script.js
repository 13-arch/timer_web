const timer = $('#timer')
const startButton = $('#start_btn')
const pauseButton = $('#pause_btn')
const resetButton = reset = $('#reset_btn')
let timePomodoro = 15
let timeLong = 900
let timeShort = 300
let timeInterval
let minutes
let seconds

function timeUpdate(time){
    minutes = Math.floor(time/60)
    seconds = time - minutes*60
    if(time<0){
        timer.text('00:00')
    }else{
        timer.text(`${minutes<10? minutes = `0${minutes}`:minutes}:${seconds<10?  seconds = `0${seconds}`:seconds}`)
    }
}

startButton.on('click', function(){
    timeInterval = setInterval(function(){
        timePomodoro-=1
        timeUpdate(timePomodoro)
    } , 1000)
    
})

pauseButton.on('click', function(){
    clearInterval(timeInterval)
})

resetButton.on('click',function(){
    clearInterval(timeInterval)
    timer.text('00:00')
})
$(document).ready(function () {
  $breakTimer = $('#break-timer');
  $sessionTimer = $('#session-timer');
  $breakMinus = $('#break-minus');
  $breakPlus = $('#break-plus');
  $sessionMinus = $('#session-minus');
  $sessionPlus = $('#session-plus');
  $status = $('#status');

  function decrement(sel,val){
    sel.html((+val) - 1);
  }

  function increment(sel,val){
    sel.html((+val) + 1);
  }

  $breakMinus.click(function () {
    $status.html('Break!');
    decrement($breakTimer, $breakTimer.html());
  });

  $breakPlus.click(function () {
    $status.html('Break!');
    increment($breakTimer, $breakTimer.html());
  });

  $sessionMinus.click(function () {
    $status.html('Session!');
    decrement($sessionTimer, $sessionTimer.html());
  });

  $sessionPlus.click(function () {
    $status.html('Session!');
    increment($sessionTimer, $sessionTimer.html());
  });

  function pad(val) {
    return ('00' + val).slice(-2);
  }

  var el = document.getElementById('timer');

  function updateDisplay(t) {
    var hours = Math.floor(t / 3600);
    t -= hours * 3600;
    var minutes = Math.floor(t / 60);
    t -= minutes * 60;
    var seconds = Math.floor(t);
    el.innerHTML = pad(hours) + ':' + pad(minutes) + ':' + pad(seconds);
  }

  time = 0;
  updateDisplay(time);
  var running = true;
  var tlast = (new Date()).getTime();

  function update() {
    if (time <= 0.0) { // Already done
      return;
    }
    var tnow = (new Date()).getTime();
    var dt = (tnow - tlast) / 1000.0;
    tlast = tnow;
    time -= dt;
    if ($status.html() === 'Session!') {
      totalTime = ($sessionTimer.html() * 60);
      water = 'rgba(25, 139, 201, 1)';
    }

    if ($status.html() === 'Break!') {
      totalTime = ($breakTimer.html() * 60);
      water = 'rgba(255, 0, 0, 1)';
    }

    fraction = 1 - (time / totalTime);

    $('#progress').waterbubble({
      data: fraction,
      animation: false,
      waterColor: water
    });

    if (time <= 0.0) {
      //el.innerHTML = 'Finished';
      if ($status.html() === 'Session!') {
        $status.html('Break!');
        time = $breakTimer.html() * 60;

      } else {
        $status.html('Session!');
        time = $sessionTimer.html() * 60;

      }
    }
    updateDisplay(time);
    if (running) {
      requestAnimationFrame(update);
    }

  }

  function run() {
    $status.html('Session!');
    if (time <= 0.0) {
      time = $sessionTimer.html() * 60;
    }
    tlast = (new Date()).getTime();
    running = true;
    requestAnimationFrame(update);
  }

  function pause() {
    running = false;
  }

  function stop() {
    running = false;
    time = 0;
    el.innerHTML = '00:00:00';
    $status.html('Session!');
    $sessionTimer.html(25);
    $breakTimer.html(5);
    $('#progress').waterbubble({
      data: 0.0,
      animation: false,
      waterColor: 'rgba(25, 139, 201, 1)'
    });
  }

  var bStart = document.getElementById('start');
  var bPause = document.getElementById('pause');
  var bReset = document.getElementById('reset');

  bStart.onclick = run;
  bPause.onclick = pause;
  bReset.onclick = stop;

  $('#progress').waterbubble(

      {

        // bubble size
        radius: 100,

        // border width
        lineWidth: undefined,

        // data to present
        data: 0.0,

        // color of the water bubble
        waterColor: 'rgba(25, 139, 201, 1)',

        // text color
        textColor: 'rgba(06, 85, 128, 0.8)',

        // custom font family
        font: '',

        // show wave
        wave: true,

        // custom text displayed inside the water bubble
        txt: undefined,

        // enable water fill animation
        animation: false

      });
});
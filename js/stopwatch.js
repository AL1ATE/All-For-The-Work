$(document).ready(function() {
    var timerInterval;
    var minutes = 0;
    var seconds = 0;
    var milliseconds = 0;
  
    $(".start-stopwatch").click(function() {
      // При клике на кнопку "Старт" начинаем отсчет времени
      timerInterval = setInterval(function() {
        milliseconds += 10;
        if (milliseconds == 1000) {
          milliseconds = 0;
          seconds++;
        }
        if (seconds == 60) {
          seconds = 0;
          minutes++;
        }
        $(".stopwatch").html(
          (minutes < 10 ? "0" : "") + minutes +
          ":" +
          (seconds < 10 ? "0" : "") + seconds +
          ":" +
          (milliseconds < 100 ? "0" : "") +
          (milliseconds < 10 ? "0" : "") +
          milliseconds
        );
      }, 10);
    });
  
    $(".stop-stopwatch").click(function() {
      // При клике на кнопку "Стоп" останавливаем отсчет времени
      clearInterval(timerInterval);
      $(".reset-stopwatch").show();
    });
  
    $(".reset-stopwatch").click(function() {
      // При клике на кнопку "Сброс" сбрасываем секундомер
      clearInterval(timerInterval);
      minutes = 0;
      seconds = 0;
      milliseconds = 0;
      $(".stopwatch").html("00:00:00");
      $(".reset-stopwatch").hide();
    });
  });
  
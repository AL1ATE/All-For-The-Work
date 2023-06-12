$(document).ready(function() {
  var timer, hours, minutes, seconds, interval,countdown;
  var minutes_second_timer = 10;
  var seconds_second_timer = 0;
  var isPaused = false;
  var savedTime;
  
  $("#interval-for-timer").on("change", function() {
    // Получаем выбранное значение из списка
    var selectedInterval = parseInt($(this).val());
    // Устанавливаем интервал остановки таймера
    interval = selectedInterval / 1000;
    // Обновляем визуальный интервал на интерфейсе пользователя
    if (selectedInterval > 0) {
      $(".timer-interval").text("Остановить через " + interval + " секунд(ы)");      
    } else {      
      $(".timer-interval").text("");  
      $('.confirmation-form').show();    
    }
  });

  function runTimer() {
    timer = setInterval(function() {
      if (seconds == 0) {
        if (minutes == 0) {
          if (hours == 0) {
            var audio = new Audio('notification_for_finish.mp3');
            audio.play();
            $('.timer-finished').show();
            clearInterval(timer);
            return;
          } else {
            hours -= 1;
            minutes = 59;
            seconds = 59;
          }
        } else {
          minutes -= 1;
          seconds = 59;
        }
      } else {
        seconds -= 1;
      }

      // Обновляем отображение времени на интерфейсе пользователя
      $(".timer span:nth-child(1)").text(hours < 10 ? "0" + hours : hours);
      $(".timer span:nth-child(3)").text(minutes < 10 ? "0" + minutes : minutes);
      $(".timer span:nth-child(5)").text(seconds < 10 ? "0" + seconds : seconds);

      // Проверяем, нужно ли остановить таймер
      if (interval && (hours * 3600 + minutes * 60 + seconds) % interval == 0) {
        var audio = new Audio('notification_for_relax.mp3');
        audio.play();
        clearInterval(timer);
        $('.confirmation-form').show();
      }
    }, 1000);
  }
  
  // Добавляем обработчик события для кнопки "Add Time"
  $(".add-time").on("click", function() {
    // Добавляем одну минуту к текущему времени таймера
    minutes += 1;
    if (minutes == 60) {
      hours += 1;
      minutes = 0;
    }
    // Обновляем отображение времени на интерфейсе пользователя
    $(".timer span:nth-child(1)").text(hours < 10 ? "0" + hours : hours);
    $(".timer span:nth-child(3)").text(minutes < 10 ? "0" + minutes : minutes);
    $(".timer span:nth-child(5)").text(seconds < 10 ? "0" + seconds : seconds);
  });

  $(".cut-time").on("click", function() {
    // Убираем одну минуту к текущему времени таймера
    minutes -= 1;
    if (minutes == 60) {
      hours -= 1;
      minutes = 0;
    }
    // Обновляем отображение времени на интерфейсе пользователя
    $(".timer span:nth-child(1)").text(hours < 10 ? "0" + hours : hours);
    $(".timer span:nth-child(3)").text(minutes < 10 ? "0" + minutes : minutes);
    $(".timer span:nth-child(5)").text(seconds < 10 ? "0" + seconds : seconds);
  });

  $(".reset-timer").on("click", function() {
    // Сбрасываем время таймера и обновляем отображение на интерфейсе пользователя
    hours = 0;
    minutes = 0;
    seconds = 0;
    $(".timer span:nth-child(1)").text("00");
    $(".timer span:nth-child(3)").text("00");
    $(".timer span:nth-child(5)").text("00");

    $('.pause-timer').hide();
    $('.reset-timer').hide();
    $('.play-timer').hide();
    $('.add-time').hide();
    $('.cut-time').hide();
  });

  $(".play-timer").on("click", function() {
    if (isPaused) {
      // продолжаем отсчет таймера с сохраненного времени
      seconds = savedTime % 60;
      minutes = Math.floor(savedTime / 60) % 60;
      hours = Math.floor(savedTime / 3600);
      runTimer();
    } else {
      // начинаем отсчет таймера сначала
      hours = 0;
      minutes = 0;
      seconds = 0;
      runTimer();
    }
    // скрываем кнопку play-timer и показываем кнопку pause-timer
    $('.play-timer').hide();
    $('.pause-timer').show();
  });
  
  $(".pause-timer").on("click", function() {
    // сохраняем текущее значение времени
    savedTime = hours * 3600 + minutes * 60 + seconds;
    // останавливаем таймер
    clearInterval(timer);
    isPaused = true;
    $('.play-timer').show();
    $('.pause-timer').hide();
  });

  $(".start-timer").on("click", function() {
    hours = parseInt($("#hours").val());
    minutes = parseInt($("#minutes").val());
    seconds = parseInt($("#seconds").val());
    if (isNaN(hours)) hours = 0;
    if (isNaN(minutes)) minutes = 0;
    if (isNaN(seconds)) seconds = 0;
    if (hours == 0 && minutes == 0 && seconds == 0) {
      $('.timer-error').show();
      setTimeout(function() {
        $('.timer-error').hide();
      }, 5000);      
      return;
    } else {
      $('.timer-error').hide();
      $('.reset-timer').show();
      $('.pause-timer').show();
      $('.play-timer').hide();
      $('.add-time').show();
      $('.cut-time').show();
    }
    runTimer();
  });

  $(".confirm-notification").click(function() {    
      countdown = setInterval(function() {
      if (seconds_second_timer === 0) {
        minutes_second_timer--;
        seconds_second_timer = 59;
      } else {
        seconds_second_timer--;
      }

      $(".minutes").text(minutes_second_timer < 10 ? "0" + minutes_second_timer : minutes_second_timer);
      $(".seconds").text(seconds_second_timer < 10 ? "0" + seconds_second_timer : seconds_second_timer);

      if (minutes_second_timer === 0 && seconds_second_timer === 0) {
        var audio = new Audio('notification_for_work.mp3');
        audio.play();
        $('.relax-button').show();
        $('.h2-for-button').hide()
        $('.h2-for-button-relax').show()
        clearInterval(countdown);
      }
    }, 1000);
  });

  $('.relax-button').click(function(){
    const minutesSpan = document.querySelector('.minutes');
    const secondsSpan = document.querySelector('.seconds');

    minutes_second_timer = 10;
    seconds_second_timer = 0;

    clearInterval(countdown);    
    isPaused = false;
    runTimer();    

    // Сбрасываем значени на таймере до 10 минут
    minutesSpan.textContent = '10';
    secondsSpan.textContent = '00';

    // Скрываем блок с подтверждением
    $('.confirmation-form').hide(); 

  });

  $(".close-button-for-confirm").click(function() {
    const minutesSpan = document.querySelector('.minutes');
    const secondsSpan = document.querySelector('.seconds');

    minutes_second_timer = 10;
    seconds_second_timer = 0;

    clearInterval(countdown);    
    isPaused = false;
    runTimer();    

    // Сбрасываем значени на таймере до 10 минут
    minutesSpan.textContent = '10';
    secondsSpan.textContent = '00';

    // Скрываем блок с подтверждением
    $('.confirmation-form').hide();  
    
  });

});

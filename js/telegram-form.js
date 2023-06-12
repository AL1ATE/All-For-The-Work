$(document).ready(function() {
  $('.send-telegram').click(function(event) {
    event.preventDefault(); // предотвращаем стандартное поведение формы
    
    // Получаем значения полей формы
    var name = $('#telegram-name').val();
    var phone = $('#telegram-phone').val();
    var message = $('#telegram-message').val();
    
    // Формируем текст сообщения
    var text = 'Имя: ' + name + '\nТелефон: ' + phone + '\nСообщение: ' + message;
    
    // Отправляем AJAX-запрос к API Telegram
    $.ajax({
      url: 'https://api.telegram.org/bot640188298:AAGZZaU8LEYgmPeQGjV3Xxf50NvQE_ldSI0/sendMessage',
      method: 'POST',
      data: {
        chat_id: '338548559',
        text: text
      },
      success: function(response) {
        // Если сообщение отправлено успешно, показываем сообщение об успехе
        alert('Сообщение успешно отправлено в Telegram!');
      },
      error: function(xhr, status, error) {
        // Если произошла ошибка, показываем сообщение об ошибке
        alert('Произошла ошибка при отправке сообщения в Telegram: ' + error);
      }
    });
  });
});
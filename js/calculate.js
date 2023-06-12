$(document).ready(function() {

    // Variables
    var $display = $('.display');
    var operator = null;
    var firstNum = null;
    var secondNum = null;
    var result = null;
  
    // Click Event
    $('.buttons button').on('click', function() {
      var value = $(this).val();
      var currentValue = $display.val();
  
      if (value === 'AC') {
        $display.val('');
        operator = null;
        firstNum = null;
        secondNum = null;
        result = null;
      } else if (value === 'DEL') {
        $display.val(currentValue.slice(0, -1));
      } else if (value === '+' || value === '-' || value === '*' || value === '/') {
        operator = value;
        firstNum = parseFloat(currentValue);
        $display.val('');
      } else if (value === '=') {
        secondNum = parseFloat(currentValue);
        if (operator === '+') {
          result = firstNum + secondNum;
        } else if (operator === '-') {
          result = firstNum - secondNum;
        } else if (operator === '*') {
          result = firstNum * secondNum;
        } else if (operator === '/') {
          result = firstNum / secondNum;
        }
        $display.val(result);
        operator = null;
        firstNum = null;
        secondNum = null;
        result = null;
      } else {
        $display.val(currentValue + value);
      }
    });
  
    // Keyboard Event
    $(document).on('keydown', function(event) {
      var key = event.key;
      var keyCode = event.keyCode;
      var allowedKeys = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', '+', '-', '*', '/', 'Enter', 'Backspace', 'Delete'];
      if (!allowedKeys.includes(key)) {
        return;
      }
      var value = '';
      if (key === 'Enter') {
        value = '=';
      } else if (key === 'Backspace' || key === 'Delete') {
        value = 'DEL';
      } else {
        value = key;
      }
      $('.buttons button').each(function() {
        if ($(this).val() === value) {
          $(this).trigger('click');
        }
      });
    });
  
  });
  
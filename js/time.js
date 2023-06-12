// получаем элемент времени на странице
const timeElement = document.querySelector('#time .time');

// функция, которая обновляет время на странице каждую секунду
function updateTime() {
    try {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, "0");
      const minutes = now.getMinutes().toString().padStart(2, "0");
      const seconds = now.getSeconds().toString().padStart(2, "0");
  
      const time = `${hours}:${minutes}:${seconds}`;
      const timeElement = document.querySelector("#time .time");
      timeElement.innerHTML = time;
    } catch (error) {
      console.error("Error updating time:", error);
    }
  }

// вызываем функцию обновления времени каждую секунду
setInterval(updateTime, 1000);
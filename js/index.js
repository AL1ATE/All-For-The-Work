function showTab(event, tabName) {
    // отменяем стандартное поведение ссылки
    event.preventDefault();
    
    // получаем все элементы с классом "tab-content"
    var tabs = document.getElementsByClassName("tab-content");
  
    // проходим по всем вкладкам и скрываем их
    for (var i = 0; i < tabs.length; i++) {
      tabs[i].classList.remove("active");
    }
  
    // показываем нужную вкладку
    var tab = document.getElementById(tabName);
    tab.classList.add("active");
  
    // получаем все элементы с классом "active" и удаляем этот класс
    var links = document.getElementsByClassName("active");
    for (var i = 0; i < links.length; i++) {
      links[i].classList.remove("active");
    }
  
    // добавляем класс "active" к выбранной ссылке
    event.target.classList.add("active");
  }
  
/*
*   Поднимаем-опускаем огромный заголовок,
*   чтоб частично скрыть последнюю строчку под верхней границей окна
*   (по смыслу идет в паре с mr-woodman/js/fontfit.js)
*   Много всего подразумевается, если заголовок сложнее чем просто текст в пару строк,
*   будут извращения: убедитесь что визуально последний (нижний) элемент заголовка
*   в разметке так же идёт последним.
*   спёрто у A-List-Apart
*
*   Проблемы совместимости
*       - hasAttribute (DOM2, для ИЕ8- getAttributeNode())
*       - transition
*       - querySelectorAll
*/

// Ожидаем коллекцию элементов HTMLCollection

window.headlift = function(collection) {

    var header, lastElement, top, overrideLift;

    for(var i = 0; i < collection.length; i++) {
        header = collection[i];

        // берём визуально нижний элемент
        lastElement = header.lastElementChild;
        // либо самого себя, если детей не оказалось
        if(!lastElement) lastElement = header;

        // вычисляем нужный отрицательный отступ
        top = -1 * lastElement.offsetTop - lastElement.offsetHeight * 0.5;
        // и запоминаем его (либо оставляем что было прописано в разметке)
        overrideLift = header.getAttribute("data-headlift");
        if(!overrideLift) header.setAttribute("data-headlift", top+"px");

        // готовим нужные стили
        header.style.transition = "all 0.5s ease-out";
        header.style.cursor = "pointer";
        // поднимаем наверх
        header.style.marginTop = overrideLift ? overrideLift : (top + "px");

        // вешаем обработчик кликов чтоб поднимал-опускал
        header.addEventListener("click", function(event) {
            if(parseInt(getComputedStyle(this).marginTop) >= 0) {
                this.style.marginTop = this.getAttribute("data-headlift");
            }
            // и наоборот
            else {
                this.style.marginTop = "0px";
            }
        });

    }
};

document.addEventListener("DOMContentLoaded", function() {
    headlift(document.querySelectorAll("[data-headlift]"));
});

window.addEventListener("resize", function() {
    headlift(document.querySelectorAll("[data-headlift]"));
});
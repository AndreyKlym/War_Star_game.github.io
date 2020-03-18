// study

/*
1. Выбрать поле для игры - done
2. Заполнить игровое поле карточками (тегами li) - done
3. Сделать клик по карточкам - done
4. Сделать переворачивание карточек - done
    4.1. Размещаем картинки для каждой карточки - done
    4.2. Показываем картинки - done
5. Если выбрано 2 картинки - проверяем на сопадение - done
    5.1. Если картинки совпадают - удаляем карточки - done
    5.2. Перевернурь все выбраные карточки назад - done
6. Если все карточки выбраны (удалены), вывести окно перезапуска игры - done
7. При клике на кнопку Рестарт - запустить игру (обновляем страницу) - done
8. Начинаем игру заново - done

9. Сделать генерацию картинок случайным образом
найти как рандомно генерить случайное число от минимального до максимального
проверять есть ли уже такая картинка, если есть проверить сколько их, если 2 то ничего не делаем
если 1 то добавлям картинку в массив(push("случайное число мин-макс"))
10. Сделать повышение уровня сложности увеличивая карточки
увеличивать количество карточек, после завершения игры
11. Сделать обратный отсчет
setInterval
*/


var cardsField = document.querySelector('#cards');
var resetBlock = document.querySelector('#reset');   // вызов окна окончания игры
var resetBtn = document.querySelector('#reset-btn');   // вызов кнопки перезагрузки игры
var notice = document.querySelector('#notice');   // вызов кнопки перезагрузки игры

// console.dir(cardsField);
// console.dir(resetBtn);
// console.dir(restartBtn);

var countCards = 16;

var images = [
    1,2,3,4,
    5,6,7,8,
    1,2,3,4, 
    5,6,7,8
];


var deletedCards = 0; // кол-во удаленных карточек

var selected = []; // хранение выбраных карточек
// console.dir(images[3]);

var pause = false;

for(var i = 0; i < countCards; i = i + 1){
    // console.dir(i);
    var li =document.createElement("li");
        li.id = i;

    cardsField.appendChild(li);
}
// console.dir(cardsField);

cardsField.onclick = function (event) {
    // alert ('test')
    // console.dir(event);
    if (pause == false) {
        var element= event.target;
    
        // if(element.tagName =="LI") {  // удаляется одна выбраная карточка при двойном нажатии
        if(element.tagName =="LI" && element.className != "active") {
            selected.push(element); // вставить эемент в конец выбраной карточки
            element.className = "active" // не удаляется одна выбраная карточка при двойном нажатии
            
            var img = images[element.id]; 
            element.style.backgroundImage = "url(images/" + img + ".png)";
            // element.style.backgroundImage = 'url("images/' + images[element.id] + '.png")';  // запись одной строкой
            // element.style.background = "red";
            // element.style.backgroundImage = "url(images/2.png)";

            if(selected.length ==2) {
                // alert('test');
                pause = true;

                if(images[selected[0].id] == images[selected[1].id]) {
                    // alert('YES')
                    selected[0].style.visibility = "hidden"; // изминение видимости выбраной карточки
                    selected[1].style.visibility = "hidden";
                    deletedCards = deletedCards + 2;
                }
                
                setTimeout(revreshCards, 600);
                // revreshCards();  // вызов функции изминение выбраной карточки до начального вида для проверки 
                // selected = [];
            }   
            
        }
        // event.target.style.background = "red";
        // console.dir(selected);
    }
}

function revreshCards() {  //  функция изминение выбраной карточки до начального вида
    for(var i = 0; i < countCards; i = i + 1) {
        cardsField.children[i].className  = "";
        cardsField.children[i].style.backgroundImage = 'url("images/back.png")';
    }
    selected = [];
    pause = false;

    if(deletedCards == countCards) {
        resetBlock.style.display = "block"
        notice.style.visibility = "hidden";
    } 
}

resetBtn.onclick = function() {
    location.reload();
}

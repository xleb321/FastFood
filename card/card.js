//// Меню t
let pancakesID = document.getElementById('pancakes');
let shaurmaID = document.getElementById('shaurma');
let sandwichesID = document.getElementById('sandwiches');
let burgersID = document.getElementById('burgers');
let chickenID = document.getElementById('chicken');
let saladsID = document.getElementById('salads');
let drinksID = document.getElementById('drinks');

//// Корзина
let busket = document.getElementById('busket_tovar');
let itog = document.getElementById('korz_sum');
let itog_sum = 0 ; // стартовая сумма которую надо заплатить за товары

//// Оформление заказа
let checkout = document.getElementById('checkout'); // Button add item's
let checkout_title = document.getElementById('checkout_title'); // Выводим товары на эту страницу
//// для таймера закрытия страницы нет покупок
let time_checkout = 0 ;

//// для смены карточек и замены заднего фона 
let category = 'shaurma';
let new_categoria = '';

//* Стартовая заменя в шаурме
document.getElementById(category).classList.add('product_active');

//* Место для отображения картинки  
let cards = document.getElementById('cards');

//! Да хоть маньяк ... , меня уже 'замучил' этот JSON
//* Поэтому ни какого отбора по номеру нажатого элемента
pancakesID.onclick = () => { //* Блинов же недодали :) XD
	new_categoria = 'pancakes';
	reduction();
	cards.innerHTML += `<div style='position:fixed;left:45%;top:45%;font-size:2em;'>
        Блины закончились
    </div>`;
};
sandwichesID.onclick = () => {//* Комментарий только здесь , т.к. дальше всё повторяется

	// Выдаёт новое значение для new_categoria что бы вывести нужные карточки
	new_categoria = 'sandwiches'; 

	//todo запуск функции генерирующюю все карточки 
	reduction()
};
shaurmaID.onclick = () => {
	new_categoria = 'shaurma';
	reduction()
};
burgersID.onclick = () => {
	new_categoria = 'burgers';
	reduction()
};
chickenID.onclick = () => {
	new_categoria = 'chicken';
	reduction()
};
saladsID.onclick = () => {
	new_categoria = 'salads';
	reduction()
};
drinksID.onclick = () => {
	new_categoria = 'drinks';
	reduction()
};

//! Повторялось при каждом нажатии поэтому вынес в отдельную функции
function reduction() {
	// Проверка категории и добавления выдача color:orang; нужному блоку меню
	resetCards();
	// Очистка блока с карточками
	cards.innerHTML = "";
	// Coздание карточек по категории из функции //! resetCards  
	CreatsCards();
};

//! В левом меню показывает активную вкладку 
function resetCards() {
	
	// Отображение категории до
	console.log('category up to :', category);
	
	// Выдача класса для выделения нынешнего раздела 
	if (category != new_categoria) {
		document.getElementById(category).classList.remove('product_active');
		document.getElementById(new_categoria).classList.add('product_active');
	}

	// Отоброжение категории после
	category = new_categoria;
	console.log('category after :', category);
};

//! Создание карточке
function CreatsCards() {
	//! Отлов JSON файла 
	(async () => {

		//// Поиск JSON файла 
		let fileUrl = 'card/data.json';
		let response = await fetch(fileUrl);
		let DB = await response.json(); // читаем ответ в формате JSON

		//// Выдача категории с номером карточки
		let cntCardInCategory = 0

		//* Создание карточки по количесву категорий в JSON файле
		for (let i = 0; i < DB['menu'].length; i++) {

			if (DB["menu"][i].category == category) {

				//* Проверка магазина для выдачи нужной картинки 
				//* Т.К. в JSON файле не прописанно это 
				if (DB["menu"][i].market == 'doner') {
					img_url = '/i/markets/doner.png';
				} else if (DB["menu"][i].market == 'subway') {
					img_url = '/i/markets/subway_logo.png';
				} else {
					img_url = '/i/markets/south_fried_chicken.png';
				};

				//* Создание карточек
				cards.innerHTML += `<div class="card">
                    <div class="logo"><img id="logo" src="${img_url}" /></div>
                    <div class="type"><img style="width:165px; height:165px;" id="type" src="${DB["menu"][i].image}"/></div>
                    <div class="name_type">${DB["menu"][i].name}</div>
                    <div id="variety">${DB["menu"][i].description}</div>
                    <div class="prices">Цена <div id="prices">${DB["menu"][i].price}</div> руб.</div>
                    <div class="lot">КОЛИЧЕСТВО</div>
                    <div class='sum_item'>
                        <button class="switches" type="button" onclick="this.nextElementSibling.stepDown()">-</button>
                        <input name="${DB["menu"][i].name}" type="number" min="1" value="1" placeholder="1" class="raz" /> 
						<button class="switches" type="button" onclick="this.previousElementSibling.stepUp()">+</button>
                    </div>
                    <div class='in_busket' onclick="add2Cart('${DB["menu"][i].name}','${DB["menu"][i].price}','${cntCardInCategory}')"><button>В КОРЗИНУ</button></div>
                </div>`;
				
				cntCardInCategory++
			}
		}
	})()
};

//todo Для загрузки страницы вызываем функцию
CreatsCards();

//! Генерация в корзину 
function add2Cart(name, price, numberNode) {

	//// X число для поиска товара куда добавить значение
	let x = -1 ;
	//// Находим количество добавленных товаров
	let cntFromCard = cards.childNodes[numberNode].childNodes[13].childNodes[3].value ;
	//// Массив закупок
	let basket_tovar_arr = document.getElementsByClassName('busket_tovar_all');
	//// Длина массива 
	let z = basket_tovar_arr.length ; 

	//* Генерация итоговой суммы
	itog_sum = price*cntFromCard + itog_sum;
	itog.innerHTML = itog_sum ;

	//todo Проверка на повторы в корзине по имени товара
	for (let i = 0; i < z ; i++) {
		if (name == basket_tovar_arr[i].childNodes[3].textContent){
			x = i ;
		}
	}
	
	//? Условие 
	//? Если повторы есть , значит добавляем число а не целый това 
	//? Иначе добавляем товар
	if ( x != -1){
		// Добавление количество товаровесли они повторяются
		basket_tovar_arr[x].childNodes[4].textContent = Number(basket_tovar_arr[x].childNodes[4].textContent) + Number(cntFromCard)
	} else {
		// Генерация товаров в корзину
		busket.innerHTML += `<div class="busket_tovar_all">
		<div value="${price}" class='busket_tovar_exit'><svg width="20" height="20" fill="currentColor" viewBox="0 0 15 15">
		<path style='pointer-events: none;' d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
	  	</svg></div>
	 	<div class='busket_tovar_name'>${name}</div><div class="basket_amount">${cntFromCard}</div></div>`
	}
}

//! Функция для удаления из корзны товаров
document.querySelector('#busket_tovar').addEventListener('click',function(e){
  if (document.querySelector('.busket_tovar_exit')) {

	// //Очистка консоли для дальнейших проверок
		//console.clear();
	//

	// Пример команд и их проверка 
		// //Ищёт количество заказов при нажатии на этот элемент в этом объекте
		// console.log(Number(e.target.parentNode.parentNode.childNodes[4].innerHTML));

		// //Ищет стоимость заказа который уже в корзине при нажатии на крест
		// console.log(e.path[1].attributes.value.value);
	// 

	//* Вычисляем сумму которую надо вычесть из итоговой суммы  
	let itog_summa = Number(e.target.parentNode.parentNode.childNodes[4].innerHTML) * Number(e.path[1].attributes.value.value) ;
	
	//* Вычисление новой итоговой суммы
	itog_sum = itog_sum - itog_summa ;

	//* Выводим новоую итоговую сумму в корзину
	itog.innerHTML = itog_sum ;

	// Удаление элемента из корзины при нажатии на крест в данном объекте
	e.target.parentNode.parentNode.remove()
  }
})

//todo Запускаем функцию карзины
checkout.onclick = () => {

	// //Количество товаров в корзине
	// // busket.childNodes.length
	console.log('Товаров в корзине ' + busket.childNodes.length);

	//* Если в корзине нету товаров тогда 
	if (busket.childNodes.length == 0){
		without_orders();
		// Для закрытия страницы <Без покупок>
		setTimeout(without_orders,2500);
	} else {
		with_orders();	
	};
}

//! Если ничего не заказанно то вызывается эта функция
function without_orders(){
	// Для вызывания первого условия , при первой пробежки и второй при второй
	time_checkout++

	// При первой пробежке создаёт лист с просьбой купить товар
	if (time_checkout == 1){
		checkout_title.innerHTML = `
			<div class='title_without_orders_backgraund'></div>
			<div class='title_without_orders_center_all'>
				<div class='title_without_orders_center'>
					<div class='title_without_orders_header'>
						<div>Оформление заказа не доступно</div>
					</div>
					<div class='title_without_orders_body'>
						<div>Пожалуйста закажите товар</div>
					</div>
					<div class='title_without_orders_botton'>
						<div>Итого : вы еще ничего не заказали</div>
					</div>
				</div>
			</div>
		`;
		time_checkout++
	} else { // закрывает лист
		checkout_title.innerHTML = ``;
		time_checkout = 0
	};
};

//! Если есть заказы , то выводится эта страница
function with_orders(){
	
}
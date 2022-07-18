//// Меню
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
let create_title = document.getElementById('create_title');
//// для таймера закрытия страницы нет покупок
let time_checkout = 0 ;

//// для смены карточек и замены заднего фона 
let category = 'shaurma';
let new_categoria = '';

//// Создание своего бургера
let str = 0 ;
let json_burger ;
let json_img ;
let create_card_prise ;

//* Стартовая заменя в шаурме
document.getElementById(category).classList.add('product_active');

//* Место для отображения картинки  
let cards = document.getElementById('cards');

//! Да хоть маньяк ... , меня уже 'замучил' этот JSON
//* Поэтому ни какого отбора по номеру нажатого элемента
pancakesID.onclick = () => { //* Блинов же недодали :) XD
	new_categoria = 'pancakes';

	reduction()

	cards.innerHTML = `<div style='position:fixed;left:45%;top:45%;font-size:2em;'>
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

function getRandomInRange(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

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

	// Выдача класса для выделения нынешнего раздела 
	if (category != new_categoria) {
		document.getElementById(category).classList.remove('product_active');
		document.getElementById(new_categoria).classList.add('product_active');
	}

	category = new_categoria;
};

//! Создание карточке
function CreatsCards() {
	//! Отлов JSON файла 
	(async () => {

		//// Поиск JSON файла 
		let fileUrl = 'card/data.json';
		let response = await fetch(fileUrl);
		let DB = await response.json(); // читаем ответ в формате JSON

		if (category == 'sandwiches'){
			OwnBurger();
			json_img = DB['menu'][getRandomInRange(0 , DB['menu'].length)].image;
		};

		//// Выдача категории с номером карточки
		let cntCardInCategory = 1 ;

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
                        <input type="number" min="1" value="1" placeholder="1" class="raz" /> 
						<button class="switches" type="button" onclick="this.previousElementSibling.stepUp()">+</button>
                    </div>
                    <div class='in_busket' onclick="add2Cart('${DB["menu"][i].name}','${DB["menu"][i].price}','${cntCardInCategory}')"><button>В КОРЗИНУ</button></div>
                </div>`;
				
				cntCardInCategory++
			};
		};

	})();
};

function OwnBurger(){
	cards.innerHTML +=`
	<div class="card">
		<div class="logo"><img id="logo" src="i/create/logocreate.png"/></div>
		<div class="type"><img style="width:165px; height:165px;" id="type" src="i/create/Create.png"/></div>
		<div class="name_type">Создай бургер своими руками</div>
		<div id="variety">За сочетание вкусов , кампании не несут отвецтвенность</div>
		<div class="prices">Цена <div id="prices">0</div> руб.</div>
		<div class="lot">КОЛИЧЕСТВО</div>
		<div class='sum_item'>
			<button class="switches" type="button" onclick="this.nextElementSibling.stepDown()">-</button>
			<input name="" type="number" min="1" value="1" placeholder="1" class="raz" /> 
			<button class="switches" type="button" onclick="this.previousElementSibling.stepUp()">+</button>
		</div>
		<div class='in_busket' onclick="create_burger();"><button>Начать создание</button></div>
	</div>
	`;
};

//todo Для загрузки страницы вызываем функцию
CreatsCards();

//! Генерация в корзину 
function add2Cart(name, price, numberNode) {

	//// X число для поиска товара куда добавить значение
	let x = -1 ;
	//// Находим количество добавленных товаров
	let cntFromCard = cards.children[numberNode].childNodes[13].childNodes[3].value ;
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
		busket.innerHTML += `
		<div class="busket_tovar_all" value="${price}" name="${name}">
			<div style='width:10%; height:100%; display:flex; flex-direction: column ; '>
				<div class='busket_tovar_plus busket_tovar_plus_minus'>
					<svg style='pointer-events: none ;' width="20" height="20" fill="currentColor" viewBox="0 0 15 15">
						<path style='pointer-events: none ;' d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
			  		</svg>
				</div>
				<div class='busket_tovar_minus busket_tovar_plus_minus'>
					<svg style='pointer-events: none ;' width="20" height="20" fill="currentColor" viewBox="0 0 15 15">
						<path style='pointer-events: none ;' d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
					</svg>
				</div>
			</div>
	 	<div class='busket_tovar_name'>${name}</div><div class="basket_amount">${cntFromCard}</div></div>`;
	};
};

//! Функция + и - у карточек   
document.querySelector('#busket_tovar').addEventListener('click',function(e){ // Отлов нажатий в корзине => карточки 
	
	if (e.target.classList.contains("busket_tovar_plus")) { // если нажали на + 
		
		// Увеличивает цифру отображаемую карточки
		e.target.parentNode.parentNode.childNodes[4].innerHTML++; // Добавляем один товар в карточку

		// Добавляет в итоговую сумму стоимость карточки 
		let itog_summa = Number(e.target.parentNode.parentNode.attributes.value.value); // Ищем стоимость 1 товара
		itog_sum = itog_sum + itog_summa ; // Считаем новую итоговую сумму 
		itog.innerHTML = itog_sum ; // Выводим итоговую сумму

	};

	if (e.target.classList.contains("busket_tovar_minus")) { // Нажатие на - в карточке

		if (Number(e.target.parentNode.parentNode.childNodes[4].innerHTML) == 1){ // Если в карточке был всего 1 заказ
			// удаляем товар
			e.target.parentNode.parentNode.remove()
		} else { // Если их было более 1 , от 2 
			// Вычитаем из карточки 1 товар
			e.target.parentNode.parentNode.childNodes[4].innerHTML--;
		}

		// Вычитаем из корзины стоимость товара
		let itog_summa = Number(e.target.parentNode.parentNode.attributes.value.value); // Ищем стоимость 1 товара
		itog_sum = itog_sum - itog_summa ; // Считаем новую итоговую сумму  
		itog.innerHTML = itog_sum ; // Выводим итоговую сумму
	};
	
});

//todo Запускаем функцию карзины
checkout.onclick = () => {

	document.querySelector('html, body').style.overflow = 'hidden' ;

	//* Если в корзине нету товаров тогда
	if (busket.children.length == 0){
		without_orders();
		// Для закрытия страницы <Без покупок>
		setTimeout(without_orders,2500);
	} else {
		with_orders();
	};
};

//! Если ничего не заказанно то вызывается эта функция
function without_orders(){
	// Для вызывания первого условия , при первой пробежки и второй при второй
	time_checkout++;

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
		time_checkout++;
	} else { // закрывает лист
		checkout_title.innerHTML = ``;
		time_checkout = 0;

		document.querySelector('html, body').style.overflow = 'auto' ;
	};
};

//! Если есть заказы , то выводится эта страница
function with_orders(name, price, numberNode){
	checkout_title.innerHTML = `
		<div class='title_without_orders_backgraund'></div>
		<div class='title_without_orders_center_all'>
			<div class='title_without_orders_center'>
				<div class='title_without_orders_header'>
					<div>Оформление заказа</div>
					<div class='title_exit'>
						<svg style='pointer-events: none ;' width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
							<path style='pointer-events: none ;' d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
				 		</svg>
					</div>
				</div>
				<div class='title_without_orders_body'>
					<div class='title_without_orders_body_left'>
						<div class='title_without_orders_body_left_header'>Ваши заказы</div>
						<div id='title_cards'></div>
					</div>
					<div class='title_without_orders_body_right'>
						<form method='post' action='form.php' id='form'>
							<div>
								Контактные данные
							</div>
							<div>
								<input type="text" name='username' placeholder='введите имя' onkeypress="noDigits(event)" required>
							</div>
							<div>
								<input type='tel' name='phone' pattern="+7-[0-9]{3}-[0-9]{3}-[0-9]{4}" value='+7' placeholder='Контактный номер' required>
							</div>
							<div>
								<input type='email' name='email' placeholder='Введите mail' required>
							</div>
							<input type="submit" value="Заказать">
						</form>	
					</div>
				</div>
				<div class='title_without_orders_botton'>
					<div style='display:flex;'>Итого : <div id='itog'>${itog_sum}</div> руб.</div>
				</div>
			</div>
		</div>
	`;

	for (let i = 0 ; i < busket.children.length ; i++){
		document.getElementById('title_cards').innerHTML += `
			<div class="busket_tovar_all" value="${busket.children[i].attributes.value.value}" name="${busket.children[i].attributes.name.value}">
			<div style='width:10%; height:100%; display:flex; flex-direction: column ; '>
				<div class='busket_tovar_plus busket_tovar_plus_minus'>
					<svg style='pointer-events: none ;' width="20" height="20" fill="currentColor" viewBox="0 0 15 15">
						<path style='pointer-events: none ;' d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
			  		</svg>
				</div>
				<div class='busket_tovar_minus busket_tovar_plus_minus'>
					<svg style='pointer-events: none ;' width="20" height="20" fill="currentColor" viewBox="0 0 15 15">
						<path style='pointer-events: none ;' d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
					</svg>
				</div>
			</div>
	 		<div class='busket_tovar_name'>${busket.children[i].children[1].innerHTML}</div><div class="basket_amount">${busket.children[i].children[2].innerHTML}</div></div>
		`;
	};
};

document.getElementById('checkout_title').addEventListener('click',function(e){
	if (e.target.classList.contains('title_exit')) { // Если нажали на крестик (выход)
		checkout_title.innerHTML = ``;
		document.querySelector('html, body').style.overflow = 'auto', height = 'auto' ;
	};

	if (e.target.classList.contains("busket_tovar_plus")) { // если нажали на +

		// пробегаемся по всем карточкам в корзине
		for(let i=0 ; i < Number(busket.children.length) ; i++){ 
			// Ecли в корзине есть карточка с такимже именем тогда : 
			if( busket.children[i].attributes.name.value == e.target.parentNode.parentNode.attributes.name.value){ 
				// Добавляем 1 товар
				busket.children[i].children[2].innerHTML++;
			};
		};

		// Увеличивает цифру отображаемую карточки
		e.target.parentNode.parentNode.childNodes[4].innerHTML++; // Добавляем один товар в карточку
		// Добавляет в итоговую сумму стоимость карточки 
		document.querySelector('.title_without_orders_center').childNodes[5].children[0].childNodes[1].innerHTML = Number(document.querySelector('.title_without_orders_center').childNodes[5].children[0].childNodes[1].innerHTML) + Number(e.target.parentNode.parentNode.attributes.value.value);
		let itog_summa = Number(e.target.parentNode.parentNode.attributes.value.value); // Ищем стоимость 1 товара
		itog_sum = itog_sum + itog_summa ; // Считаем новую итоговую сумму 
		itog.innerHTML = itog_sum ; // Выводим итоговую сумму

	};

	if (e.target.classList.contains("busket_tovar_minus")) { // Нажатие на - в карточке

		// Пробегаемся по всем товарам в корзине 
		for(let i=0 ; i < Number(busket.children.length) ; i++){
			// Как только находим нужную по имени
			if( busket.children[i].attributes.name.value == e.target.parentNode.parentNode.attributes.name.value){
				// Убавляем 1 товар
				busket.children[i].children[2].innerHTML--;
				
				// Если данный товар теперь равен 0  
				if(Number(busket.children[i].children[2].innerHTML) == 0){
					// Мы его удаляем 
					busket.children[i].remove();
				};
			};
		};

		if (Number(e.target.parentNode.parentNode.childNodes[4].innerHTML) == 1 ){ // Если в карточке был всего 1 заказ
			// удаляем товар
			e.target.parentNode.parentNode.remove();
		} else { // Если их было более 1 , от 2 
			// Вычитаем из карточки 1 товар
			e.target.parentNode.parentNode.childNodes[4].innerHTML--;
		};

		// Вычитаем из корзины стоимость товара
		document.querySelector('.title_without_orders_center').childNodes[5].children[0].childNodes[1].innerHTML = Number(document.querySelector('.title_without_orders_center').childNodes[5].children[0].childNodes[1].innerHTML) - Number(e.target.parentNode.parentNode.attributes.value.value);
		let itog_summa = Number(e.target.parentNode.parentNode.attributes.value.value); // Ищем стоимость 1 товара
		itog_sum = itog_sum - itog_summa ; // Считаем новую итоговую сумму  
		itog.innerHTML = itog_sum ; // Выводим итоговую сумму
	};

	if (Number(document.getElementById('title_cards').children.length) == 0){
		
		console.log(Number(document.getElementById('title_cards').children.length))
		// Объявляет что в корзине пусто
		document.querySelector('.title_without_orders_body').innerHTML = `
			<div>
				Вы убрали все товары из корзины 
			</div>
		`;

		// Итоговая сумма = 0 , поэтому закрываем его
		document.querySelector('.title_without_orders_center').childNodes[5].children[0].childNodes[1].innerHTML = 0 ;
		setTimeout(() => {
			checkout_title.innerHTML = ``;
			document.querySelector('html, body').style.overflow = 'auto';
		}, 2500);
	};

});

function noDigits(event) {
	if ("1234567890".indexOf(event.key) != -1){
		event.preventDefault();
	};
};

//! Создание бургера
function create_burger(){
	document.querySelector('html, body').style.overflow = 'hidden' ;

		json_burger = {sizes:'15 См',breads:'Белый итальянский',vegetables:'нет',sauces:'нет',fillings:'нет'};
		// Минимальная цена иначе будет слишком дёшево
		create_card_prise = 100 ;
		str = 0 ;

		create_title.innerHTML += `
			<div class='title_without_orders_backgraund'></div>
			<div class='title_without_orders_center_all'>
				<div class='title_without_orders_center'>
					<div class='title_without_orders_header'>
						<div style='font-size:1.5em;' >Создание бургера</div>
						<div class='title_exit'>
							<svg style='pointer-events: none ; color:black;' width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
								<path style='pointer-events: none ;' d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
					 		</svg>
						</div>
					</div>
						<div class='create_cards_all'>
							<div class='create_cards_header'>
								<div class='but_create' style='width:130px;'>Размер</div>
								<div class='but_create' style='width:85px;'>Хлеб</div>
								<div class='but_create' style='width:125px;'>Овощи</div>
								<div class='but_create' style='width:115px;'>Соусы</div>
								<div class='but_create' style='width:155px;'>Начинка</div>
								<div class='but_create' style='width:135px;'>Готово!</div>
							</div>
						<div>

					</div>
					<div id='create_cards_flipping'>
						<div value='-'> 
							<svg style='pointer-events: none ;' width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
							<path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
					  		</svg>

							НАЗАД
						</div>
						<div value='+'>
							ВПЕРЁД

							<svg style='pointer-events: none ;' width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
							<path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
					  		</svg>
						</div>
					</div>

					<div style='display:flex;'>
						<div id='random_img'>
							<div><img src='${json_img}'/></div>
						</div>

						<div id='create_cads_title'></div>
					</div>
					<div id='create_cards_itog' style='border-radius: 0 0 5px 5px;'>
						<div id='create_amount' style='color:var(--main-color); flex-direction:column;'>
							<div style='font-size:0.7em;'>Количество</div>
							<div style='text-align:center;'>
								<button class="switches" type="button" onclick="this.nextElementSibling.stepDown()">-</button>
								<input style=' width:40px;'type="number" min="1" value="1" placeholder="1" class="raz" /> 
								<button class="switches" type="button" onclick="this.previousElementSibling.stepUp()">+</button>
							</div>
						</div>
						<div style='display:flex;'>
							<div style='display:flex;'>Итого: <div id='create_card_prise' price='15' fillings='нет'>${create_card_prise}</div> руб.</div>
							<div class='create_in_busket'>В КОРЗИНУ</div>
						</div>
					</div>
				</div>
			</div>
		`;
		test_create_button();
}

document.querySelector('#create_title').addEventListener('click',function(e){

	if (e.target.classList.contains('but_create')) {
		if (e.target.innerHTML== 'Размер' ){
			str = 0 ;
		};
		if (e.target.innerHTML== 'Хлеб' ){
			str = 1 ;
		};
		if (e.target.innerHTML== 'Овощи' ){
			str = 2 ;
		};
		if (e.target.innerHTML== 'Соусы' ){
			str = 3 ;
		};
		if (e.target.innerHTML== 'Начинка' ){
			str = 4 ;
		};
		if (e.target.innerHTML== 'Готово!' ){
			str = 5 ;
		};
	};

	if (e.target.attributes[0].value=='+'){
		str++;
	};
	if(e.target.attributes[0].value =='-'){
		str--;
	};

	for (let i = 0 ; i < 6 ; i++){
		if (i != str){
			document.getElementsByClassName('but_create')[i].style.backgroundColor='var(--color-white)';	
			document.getElementsByClassName('but_create')[i].style.color='var(--color-black)';
		};
	};
	
	test_create_button();
	
	if (e.target.classList.contains('title_exit')){
		document.querySelector('html, body').style.overflow = 'auto' ;
		create_title.innerHTML =``;
	};
});

function test_create_button(){
	(async () => {

		//// Поиск JSON файла 
		let fileUrl = 'card/data.json';
		let response = await fetch(fileUrl);
		let DB = await response.json(); // читаем ответ в формате JSON

		let create_cads_title = document.getElementById('create_cads_title');

		let create_itog = document.getElementById('create_cards_itog');
		let create_amount = document.getElementById('create_amount');

		create_cads_title.innerHTML = ``;

		if (str==5){
			document.getElementById('create_cads_title').style.overflow = 'hidden' ;
			create_itog.style.height='100px';
			create_amount.style.display='flex';
			document.getElementById('random_img').style.display='flex';
			document.getElementById('create_cads_title').style.width='50%';
			document.querySelector('.create_in_busket').style.display='flex';
		} else {
			document.getElementById('create_cads_title').style.overflow = 'auto' ;
			create_itog.style.height='60px';
			create_amount.style.display='none';
			document.getElementById('random_img').style.display='none';
			document.getElementById('create_cads_title').style.width='100%';
			document.querySelector('.create_in_busket').style.display='none';
		};

		if(str == 0){
			document.querySelector('.title_without_orders_header').children[0].innerHTML = 'Выберите размер сендвича';
			document.getElementById('create_cards_flipping').children[0].style.display='none';
			document.getElementById('create_cards_flipping').children[1].style.display='flex';
			document.getElementById('create_cards_flipping').style.justifyContent='flex-end';

			for (let i = 0; i < Object.keys(DB['sizes']).length ; i++){
				create_cads_title.innerHTML += `
					<div id='card_in_create' style='pointer-events: all ;'>
						<div style='pointer-events: none ;' class='card_in_create_img'><img src='${DB['sizes'][Object.keys(DB['sizes'])[i]].image}' /></div>
						<div style='pointer-events: none ;' class='card_in_create_name'>${DB['sizes'][Object.keys(DB['sizes'])[i]].name}</div>
						<div style='pointer-events: none ;' class='card_in_create_prise'>Цена: <div>${DB['sizes'][Object.keys(DB['sizes'])[i]].price}</div> руб.</div>
					</div>
				`;
			}
			
		} else if (str > 0 && str < 5){
			document.getElementById('create_cards_flipping').children[0].style.display='flex';
			document.getElementById('create_cards_flipping').children[1].style.display='flex';
			document.getElementById('create_cards_flipping').style.justifyContent='space-between';

			if (str == 1){
				document.querySelector('.title_without_orders_header').children[0].innerHTML = 'Хлеб для сендвича на выбор';

				for (let i = 0; i < Object.keys(DB['breads']).length ; i++){
					create_cads_title.innerHTML += `
						<div id='card_in_create' style='pointer-events: all ;'>
							<div style='pointer-events: none ;' class='card_in_create_img'><img src='${DB['breads'][Object.keys(DB['breads'])[i]].image}' /></div>
							<div style='pointer-events: none ;' class='card_in_create_name'>${DB['breads'][Object.keys(DB['breads'])[i]].name}</div>
							<div style='pointer-events: none ;' class='card_in_create_prise'>Цена: <div>${DB['breads'][Object.keys(DB['breads'])[i]].price}</div> руб.</div>
						</div>
					`;
				}
			} else if (str == 2){
				document.querySelector('.title_without_orders_header').children[0].innerHTML = 'Дополнительные овощи бесплатно';

				for (let i = 0; i < Object.keys(DB['vegetables']).length ; i++){
					create_cads_title.innerHTML += `
						<div id='card_in_create' style='pointer-events: all ;'>
							<div style='pointer-events: none ;' class='card_in_create_img'><img src='${DB['vegetables'][Object.keys(DB['vegetables'])[i]].image}' /></div>
							<div style='pointer-events: none ;' class='card_in_create_name'>${DB['vegetables'][Object.keys(DB['vegetables'])[i]].name}</div>
							<div style='pointer-events: none ;' class='card_in_create_prise'>Цена: <div>${DB['vegetables'][Object.keys(DB['vegetables'])[i]].price}</div> руб.</div>
						</div>
					`;
				};
			} else if (str == 3){
				document.querySelector('.title_without_orders_header').children[0].innerHTML = 'Выберите бесплатный соус';

				for (let i = 0; i < Object.keys(DB['sauces']).length ; i++){
					create_cads_title.innerHTML += `
						<div id='card_in_create' style='pointer-events: all ;'>
							<div style='pointer-events: none ;' class='card_in_create_img'><img src='${DB['sauces'][Object.keys(DB['sauces'])[i]].image}' /></div>
							<div style='pointer-events: none ;' class='card_in_create_name'>${DB['sauces'][Object.keys(DB['sauces'])[i]].name}</div>
							<div style='pointer-events: none ;' class='card_in_create_prise'>Цена: <div>${DB['sauces'][Object.keys(DB['sauces'])[i]].price}</div> руб.</div>
						</div>
					`;
				};
			} else if (str == 4){
				document.querySelector('.title_without_orders_header').children[0].innerHTML = 'Добавьте начинку по вкусу';

				for (let i = 0; i < Object.keys(DB['fillings']).length ; i++){
					create_cads_title.innerHTML += `
						<div id='card_in_create' style='pointer-events: all ;'>
							<div style='pointer-events: none ;' class='card_in_create_img'><img src='${DB['fillings'][Object.keys(DB['fillings'])[i]].image}' /></div>
							<div style='pointer-events: none ;' class='card_in_create_name'>${DB['fillings'][Object.keys(DB['fillings'])[i]].name}</div>
							<div style='pointer-events: none ;' class='card_in_create_prise'>Цена: <div>${DB['fillings'][Object.keys(DB['fillings'])[i]].price}</div> руб.</div>
						</div>
					`;
				};
			};
		} else if (str == 5){
			document.querySelector('.title_without_orders_header').children[0].innerHTML = 'Проверьте и добавьте в корзину';
			document.getElementById('create_cards_flipping').children[0].style.display='flex';
			document.getElementById('create_cards_flipping').children[1].style.display='none';
			document.getElementById('create_cards_flipping').style.justifyContent='flex-start';

			create_cads_title.innerHTML +=`
				<div class='create_card_last_title'>
					<div class='create_card_last_title_header'>
						Ваш сендвич готов!
					</div>
					
					<div class='create_card_last_title_body'>
						<div class='create_card_last_title_body_all'>
							<div>Размер: ${json_burger.sizes}</div>
							<div>Хлеб: ${json_burger.breads}</div>
							<div>Овощи: ${json_burger.vegetables}</div>
							<div>Соус: ${json_burger.sauces}</div>
							<div>Начинка: ${json_burger.fillings}</div>
						</div>	
					</div>
				</div>
			`;
		};
		document.getElementsByClassName('but_create')[str].style.backgroundColor='rgb(217,103,70)';
		document.getElementsByClassName('but_create')[str].style.color='white';
	})();
}
let sum_size = 0;
let sum_fillings = 0;
let difference = 0 ;
document.querySelector('#create_title').addEventListener('click',function(e){

	if (e.target.attributes[0].value == 'card_in_create'){
		if(str == 0){ //Размер
			let new_sum = Number(0);

			if(json_burger.sizes != e.target.children[1].innerHTML){
				new_sum = Number(e.target.children[2].children[0].innerHTML);
				if(sum_size < new_sum){
					difference = Number(new_sum - sum_size) ;
					create_card_prise = create_card_prise + difference ;
				} else {
					difference = Number(sum_size - new_sum) ;
					create_card_prise = create_card_prise - difference ;
				};
			} else {
				create_card_prise = Number(e.target.children[2].innerHTML.replace(/\D/g,'')) + create_card_prise;
			};
			sum_size = Number(e.target.children[2].children[0].innerHTML);
			json_burger.sizes = e.target.children[1].innerHTML ;

		}else if(str == 1){ // Хлеб
			if(json_burger.breads != e.target.children[1].innerHTML){
				json_burger.breads = e.target.children[1].innerHTML ;
				create_card_prise = Number(e.target.children[2].innerHTML.replace(/\D/g,'')) + create_card_prise; 
			};
		} else if(str == 2){ // Трава
			if(json_burger.vegetables != e.target.children[1].innerHTML){
				json_burger.vegetables = e.target.children[1].innerHTML ;
				create_card_prise = Number(e.target.children[2].innerHTML.replace(/\D/g,'')) + create_card_prise; 
			};
		} else if(str == 3){ // Соусы
			if(json_burger.sauces != e.target.children[1].innerHTML){
				json_burger.sauces = e.target.children[1].innerHTML ;
				create_card_prise = Number(e.target.children[2].innerHTML.replace(/\D/g,'')) + create_card_prise; 
			};
		} else if(str == 4){ // Начинка
			if(json_burger.fillings != e.target.children[1].innerHTML){
				// Для подсчёта разницы
				let new_sum = 0 ;
				if(json_burger.fillings != 'нет'){
					new_sum = Number(e.target.children[2].children[0].innerHTML) ;

					if(sum_fillings < new_sum){
						difference = new_sum - sum_fillings ;
						create_card_prise = create_card_prise + difference ;
					} else {
						difference = sum_fillings - new_sum ;
						create_card_prise = create_card_prise - difference ;
					};

				} else {
					create_card_prise = Number(e.target.children[2].innerHTML.replace(/\D/g,'')) + create_card_prise;
				};
				
				sum_fillings = Number(e.target.children[2].children[0].innerHTML);
				json_burger.fillings = e.target.children[1].innerHTML ;
			};
		};
	};

	if(e.target.classList.contains("create_in_busket")){
		let kol = Number(e.target.parentNode.parentNode.children[0].children[1].children[1].value) ;
		let sum = create_card_prise ;
		let coincidences = 0 ;

		function add_my_burger() { 
			busket.innerHTML += `
				<div class="busket_tovar_all" value="${sum}" name="Бургер своими руками" size='${Number(json_burger.sizes.replace(/\D/g,''))}' bread='${json_burger.breads}' vegetable='${json_burger.vegetables}' sauce='${json_burger.sauces}' fillinge='${json_burger.fillings}'>
					<div style='width:10%; height:100%; display:flex; flex-direction: column ; '>
					<div class='busket_tovar_plus busket_tovar_plus_minus'>
						<svg style='pointer-events: none ;' width="20" height="20" fill="currentColor" viewBox="0 0 15 15">
							<path style='pointer-events: none ;' d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
						  </svg>
					</div>
					<div class='busket_tovar_minus busket_tovar_plus_minus'>
						<svg style='pointer-events: none ;' width="20" height="20" fill="currentColor" viewBox="0 0 15 15">
							<path style='pointer-events: none ;' d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
						</svg>
					</div>
				</div>
				<div class='busket_tovar_name'>Бургер своими руками</div><div class="basket_amount">${kol}</div></div>
			`;
		};
		
		if(busket.children.length > 0){

			for (let i = 0 ; i < busket.children.length ; i++){

				if(busket.children[i].attributes.name.value == 'Бургер своими руками'){

					coincidences++;

					if((busket.children[i].attributes.size.value == Number(json_burger.sizes.replace(/\D/g,''))) && 
					(busket.children[i].attributes.bread.value == json_burger.breads) && 
					(busket.children[i].attributes.vegetable.value == json_burger.vegetables) && 
					(busket.children[i].attributes.sauce.value == json_burger.sauces) && 
					(busket.children[i].attributes.fillinge.value == json_burger.fillings)){

						busket.children[i].children[2].innerHTML = Number(busket.children[i].children[2].innerHTML) + kol ;

					} else {
						add_my_burger();
					};
				};
			};

			if (coincidences == 0 ){ add_my_burger(); }

		} else { add_my_burger(); };
		
		itog_sum = sum * kol + itog_sum;
		itog.innerHTML = itog_sum ;
		
		create_title.innerHTML = ``;
	};

	document.getElementById('create_card_prise').innerHTML = `${create_card_prise}`;
});
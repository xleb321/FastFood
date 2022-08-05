export default function Cards(Selected){
    (async () => {
		
		let Cards = document.getElementById('Cards');
		let Category = Selected.attributes[0].value ;
		let ImgUrl ;

		//// Поиск JSON файла 
		let fileUrl = '/components/Api/item.json';
		let response = await fetch(fileUrl);
		let DB = await response.json(); // читаем ответ в формате JSON

		//* Создание карточки по количесву категорий в JSON файле
		for (let i = 0; i < DB['menu'].length; i++) {

			if (DB["menu"][i].category == Category) {

				//* Проверка магазина для выдачи нужной картинки 
				//* Т.К. в JSON файле не прописанно это 
				if (DB["menu"][i].market == 'doner') {
					ImgUrl = '/i/markets/doner.png';
				} else if (DB["menu"][i].market == 'subway') {
					ImgUrl = '/i/markets/subway_logo.png';
				} else {
					ImgUrl = '/i/markets/south_fried_chicken.png';
				};

				//* Создание карточек
				Cards.innerHTML += /*html*/ `
                    <div class="Card">
                        <div class="Logo"><img id="Logo" src="${ImgUrl}" /></div>
                        <div class="Type"><img style="width:165px; height:165px;" id="Type" src="${DB["menu"][i].image}"/></div>
                        <div class="NameType">${DB["menu"][i].name}</div>
                        <div id="Variety">${DB["menu"][i].description}</div>
                        <div class="Prices">Цена: <div id="Prices">${DB["menu"][i].price}</div> руб.</div>
                        <div class="Lot">КОЛИЧЕСТВО</div>
                        <div class='SumItem'>
                            <button class="Switches" type="button" onclick="this.nextElementSibling.stepDown()">-</button>
                            <input type="Number" min="1" value="1" placeholder="1" class="Raz" /> 
				    		<button class="Switches" type="button" onclick="this.previousElementSibling.stepUp()">+</button>
                        </div>
                        <div class='InBusket'><button>В КОРЗИНУ</button></div>
                    </div>
                `;
			};
		};
	})();
};
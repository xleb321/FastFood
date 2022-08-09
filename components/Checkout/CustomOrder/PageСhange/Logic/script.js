export default function LogicCustomPage(Str , JsonBurger){
    (async () => {

		//// Поиск JSON файла 
		let fileUrl = '..//components/Api/CustomBurger.json';
		let response = await fetch(fileUrl);
		let DB = await response.json(); // читаем ответ в формате JSON

		let CreateCadsTitle = document.getElementById('CreateCadsTitle');

		let CreateItog = document.getElementById('CreateCardsItog');
		let CreateAmount = document.getElementById('CreateAmount');

		let ObjectGenerate ;

		CreateCadsTitle.innerHTML = ``;

		if (Str==5){
			document.getElementById('CreateCadsTitle').style.overflow = 'hidden' ;
			CreateItog.style.height='100px';
			CreateAmount.style.display='flex';
			document.getElementById('RandomImg').style.display='flex';
			document.getElementById('CreateCadsTitle').style.width='50%';
			document.querySelector('.CreateInBasket').style.display='flex';
		} else {
			document.getElementById('CreateCadsTitle').style.overflow = 'auto' ;
			CreateItog.style.height='60px';
			CreateAmount.style.display='none';
			document.getElementById('RandomImg').style.display='none';
			document.getElementById('CreateCadsTitle').style.width='100%';
			document.querySelector('.CreateInBasket').style.display='none';
		};

		if(Str == 0){
			document.querySelector('.TitleWithoutOrdersHeader').children[0].innerHTML = 'Выберите размер сендвича';
			document.getElementById('CreateCardsFlipping').children[0].style.display='none';
			document.getElementById('CreateCardsFlipping').children[1].style.display='flex';
			document.getElementById('CreateCardsFlipping').style.justifyContent='flex-end';

			ObjectGenerate = 'sizes';
			LocalGenerate();
		} else if (Str > 0 && Str < 5){
			document.getElementById('CreateCardsFlipping').children[0].style.display='flex';
			document.getElementById('CreateCardsFlipping').children[1].style.display='flex';
			document.getElementById('CreateCardsFlipping').style.justifyContent='space-between';

			if (Str == 1){
				document.querySelector('.TitleWithoutOrdersHeader').children[0].innerHTML = 'Хлеб для сендвича на выбор';

				ObjectGenerate = 'breads';
				LocalGenerate();
			} else if (Str == 2){
				document.querySelector('.TitleWithoutOrdersHeader').children[0].innerHTML = 'Дополнительные овощи бесплатно';

				ObjectGenerate = 'vegetables';
				LocalGenerate();
			} else if (Str == 3){
				document.querySelector('.TitleWithoutOrdersHeader').children[0].innerHTML = 'Выберите бесплатный соус';

				ObjectGenerate = 'sauces';
				LocalGenerate();
			} else if (Str == 4){
				document.querySelector('.TitleWithoutOrdersHeader').children[0].innerHTML = 'Добавьте начинку по вкусу';

				ObjectGenerate = 'fillings';
				LocalGenerate();
			};
		} else if (Str == 5){
			document.querySelector('.TitleWithoutOrdersHeader').children[0].innerHTML = 'Проверьте и добавьте в корзину';
			document.getElementById('CreateCardsFlipping').children[0].style.display='flex';
			document.getElementById('CreateCardsFlipping').children[1].style.display='none';
			document.getElementById('CreateCardsFlipping').style.justifyContent='flex-start';

			CreateCadsTitle.innerHTML +=/*html*/`
				<div class='CreateCardLastTitle'>
					<div class='CreateCardLastTitleHeader'>
						Ваш сендвич готов!
					</div>
					
					<div class='CreateCardLastTitleBody'>
						<div class='CreateCardLastTitleBodyAll'>
							<div>Размер: ${JsonBurger.sizes}</div>
							<div>Хлеб: ${JsonBurger.breads}</div>
							<div>Овощи: ${JsonBurger.vegetables}</div>
							<div>Соус: ${JsonBurger.sauces}</div>
							<div>Начинка: ${JsonBurger.fillings}</div>
						</div>	
					</div>
				</div>
			`;
		};

		document.getElementsByClassName('ButCreate')[Str].style.backgroundColor='rgb(217,103,70)';
		document.getElementsByClassName('ButCreate')[Str].style.color='white';

		function LocalGenerate(){
			for (let i = 0; i < Object.keys(DB[ObjectGenerate]).length ; i++){
				CreateCadsTitle.innerHTML += /*html*/`
					<div id='CardInCreate' style='pointer-events: all ;'>
						<div style='pointer-events: none ;' class='CardInCreateImg'><img src='${DB[ObjectGenerate][Object.keys(DB[ObjectGenerate])[i]].image}' /></div>
						<div style='pointer-events: none ;' class='CardInCreateName'>${DB[ObjectGenerate][Object.keys(DB[ObjectGenerate])[i]].name}</div>
						<div style='pointer-events: none ;' class='CardInCreatePrise'>Цена: <div>${DB[ObjectGenerate][Object.keys(DB[ObjectGenerate])[i]].price}</div> руб.</div>
					</div>
				`;
			};
		};
	})();
};
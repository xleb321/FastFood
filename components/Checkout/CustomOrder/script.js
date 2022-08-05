export default function CustomOrder() {
    document.querySelector('html, body').style.overflow = 'hidden' ;

	JsonBurger = {sizes:'15 См',breads:'Белый итальянский',vegetables:'нет',sauces:'нет',fillings:'нет'};
	CreateCardPrise = 100 ;       // Минимальная цена иначе будет слишком дёшево
	Str = 0 ;
	CheckoutTitle.innerHTML += /*html*/`
		<div class='TitleWithoutOrdersBackgraund'></div>
		<div class='TitleWithoutOrdersCenterAll'>
			<div class='TitleWithoutOrdersCenter'>
				<div class='TitleWithoutOrdersHeader'>
					<div style='font-size:1.5em;' >Создание бургера</div>
					<div class='TitleExit'>
						<svg style='pointer-events: none ; color:black;' width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
							<path style='pointer-events: none ;' d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
				 		</svg>
					</div>
				</div>
					<div class='CreateCardsAll'>
						<div class='CreateCardsHeader'>
							<div class='ButCreate' style='width:130px;'>Размер</div>
							<div class='ButCreate' style='width:85px;'>Хлеб</div>
							<div class='ButCreate' style='width:125px;'>Овощи</div>
							<div class='ButCreate' style='width:115px;'>Соусы</div>
							<div class='ButCreate' style='width:155px;'>Начинка</div>
							<div class='ButCreate' style='width:135px;'>Готово!</div>
						</div>
					<div>
				</div>
				<div id='CreateCardsFlipping'>
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
					<div id='RandomImg'>
						<div><img src='${JsonImg}'/></div>
					</div>
					<div id='CreateCadsTitle'></div>
				</div>
				<div id='CreateCardsItog' style='border-radius: 0 0 5px 5px;'>
					<div id='CreateAmount' style='color:var(--main-color); flex-direction:column;'>
						<div style='font-size:0.7em;'>Количество</div>
						<div style='text-align:center;'>
							<button class="Switches" type="button" onclick="this.nextElementSibling.stepDown()">-</button>
							<input style=' width:40px;'type="number" min="1" value="1" placeholder="1" class="Raz" /> 
							<button class="Switches" type="button" onclick="this.previousElementSibling.stepUp()">+</button>
						</div>
					</div>
					<div style='display:flex;'>
						<div style='display:flex;'>Итого: <div id='CreateCardPrise' price='15' fillings='нет'>${CreateCardPrise}</div> руб.</div>
						<div class='CreateInBusket'>В КОРЗИНУ</div>
					</div>
				</div>
			</div>
		</div>
	`;
}
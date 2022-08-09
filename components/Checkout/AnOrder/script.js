import close from "./Close/script.js";
import ProductGeneration from "./ProductGeneration/script.js";
import QuantityChange from "./QuantityСhange/script.js";

export default function AnOrder() {
    let ItogSum = document.getElementById('KorzSum').textContent;

    CheckoutTitle.innerHTML = /*html*/`
		<div class='TitleWithoutOrdersBackgraund'></div>
		<div class='TitleWithoutOrdersCenterAll' name='AnOrder'>
			<div class='TitleWithoutOrdersCenter'>
				<div class='TitleWithoutOrdersHeader'>
					<div>Оформление заказа</div>
					<div class='TitleExit'>
						<svg style='pointer-events: none ;' width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
							<path style='pointer-events: none ;' d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"/>
				 		</svg>
					</div>
				</div>
				<div class='TitleWithoutOrdersBody'>
					<div class='TitleWithoutOrdersBodyLeft'>
						<div class='TitleWithoutOrdersBodyLeftHeader'>Ваши заказы</div>
						<div id='TitleCards'></div>
					</div>
					<div class='TitleWithoutOrdersBodyRight'>
						<form method='post' action='form.php' id='form'>
							<div style='font-weight: 500 ;'>
								Контактные данные
							</div>
							<div>
								<input type="text" name='username' placeholder='введите имя' onkeypress="noDigits(event)" required>
							</div>
							<div>
								<input type='tel' name='phone' value='+7' placeholder='Контактный номер' required>
							</div>
							<div>
								<input type='email' name='email' placeholder='Введите mail' required>
							</div>
							<input type="submit" value="Заказать">
						</form>	
					</div>
				</div>
				<div class='TitleWithoutOrdersBotton'>
					<div style='display:flex;'>Итого : <div id='itog'>${ItogSum}</div> руб.</div>
				</div>
			</div>
		</div>
	`;
	ProductGeneration();
	document.querySelector('.TitleExit').onclick = () => {close();};
};
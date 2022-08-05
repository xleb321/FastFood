export default function NoOrder() {
    
    let CheckoutTitle = document.getElementById('CheckoutTitle');

	
		CheckoutTitle.innerHTML = /*html*/`
			<div class='TitleWithoutOrdersBackgraund'></div>
			<div class='TitleWithoutOrdersCenterAll'>
				<div class='TitleWithoutOrdersCenter'>
					<div class='TitleWithoutOrdersHeader'>
						<div>Оформление заказа не доступно</div>
					</div>
					<div class='TitleWithoutOrdersBody'>
						<div>Пожалуйста закажите товар</div>
					</div>
					<div class='TitleWithoutOrdersBotton'>
						<div>Итого : вы еще ничего не заказали</div>
					</div>
				</div>
			</div>
		`;
	
    function Close() {      // Автоматическое закрытие
        CheckoutTitle.innerHTML = ``;
        document.querySelector('html, body').style.overflow = 'auto' ;
    }

    setTimeout(Close,2500)
};
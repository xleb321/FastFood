export default function AddToBasket(e) {
    let Card = e.target.parentNode.parentNode;
    let CardName = Card.children[2].innerHTML;
    let CardSum = Number(Card.children[6].children[1].value);
    let CardPrice = Number(Card.children[4].children[0].innerHTML);
    
    let Basket = document.getElementById('BasketTovar');
    let x = -1 ;
    let z = Basket.children.length ; 

	let Itog = document.getElementById('KorzSum') ;
    let ItogPrice = Number(Itog.textContent) ;

    for (let i = 0; i < z ; i++) {
		if (CardName == Basket.children[i].children[1].textContent){
			x = i ;
		}
	}

    if ( x != -1){      // Добавление количество товаровесли они повторяются
		Basket.children[x].children[2].textContent = Number(Basket.children[x].children[2].textContent) + CardSum;
	} else {        // Генерация товаров в корзину
		Basket.innerHTML += /*html*/`
		    <div class="BasketTovarAll" value="${CardPrice}" name="${CardName}">
		    	<div style='width:10%; height:100%; display:flex; flex-direction: column ; '>
		    		<div class='BasketTovarPlusMinus' name='plus'>
		    			<svg style='pointer-events: none ;' width="20" height="20" fill="currentColor" viewBox="0 0 15 15">
		    				<path style='pointer-events: none ;' d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
		    	  		</svg>
		    		</div>
		    		<div class='BasketTovarPlusMinus' name='minus'>
		    			<svg style='pointer-events: none ;' width="20" height="20" fill="currentColor" viewBox="0 0 15 15">
		    				<path style='pointer-events: none ;' d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
		    			</svg>
		    		</div>
		    	</div>
	 	    <div class='BasketTovarName'>${CardName}</div><div class="BasketAmount">${CardSum}</div></div>
        `;
    };
	
	ItogPrice = Number(CardPrice) * Number(CardSum) + Number(ItogPrice) ;      // Считаем новую итоговую сумму
    Itog.innerHTML = ItogPrice ;        // Выводим итоговую сумму
};
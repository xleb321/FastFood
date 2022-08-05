export default function ProductGeneration () {
    let Basket = document.getElementById('BasketTovar');

    for (let i = 0 ; i < Basket.children.length ; i++){
		document.getElementById('TitleCards').innerHTML += /*html*/`
			<div class="CheckoutTovarAll" value="${Basket.children[i].attributes.value.value}" name="${Basket.children[i].attributes.name.value}">
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
	 		<div class='CheckoutTovarName'>${Basket.children[i].children[1].innerHTML}</div><div class="CheckoutAmount">${Basket.children[i].children[2].innerHTML}</div></div>
		`;
	};
};
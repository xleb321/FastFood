export default function CustomItem() {
    document.getElementById('Cards').innerHTML += /*html*/`
	    <div class="Card">
	    	<div class="Logo"><img id="Logo" src="i/create/logocreate.png"/></div>
	    	<div class="Type"><img style="width:165px; height:165px;" id="Type" src="i/create/Create.png"/></div>
	    	<div class="NameType">Создай бурито своими руками</div>
	    	<div id="Variety">За сочетание вкусов , кампании не несут отвецтвенность</div>
	    	<div class="Prices">Цена: <div id="Prices">неизвестна</div> </div>
	    	<div class="Lot">КОЛИЧЕСТВО</div>
	    	<div class='SumItem'>
	    		<button class="Switches" type="button" onclick="this.nextElementSibling.stepDown()">-</button>
	    		<input type="number" min="1" value="1" placeholder="1" class="Raz" /> 
	    		<button class="Switches" type="button" onclick="this.previousElementSibling.stepUp()">+</button>
	    	</div>
	    	<div class='InBusket'><button>Начать создание</button></div>
	    </div>
	`;
};
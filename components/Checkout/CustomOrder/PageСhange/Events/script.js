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
				<div class='busket_tovar_name'>Бурито своими руками</div><div class="basket_amount">${kol}</div></div>
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

});
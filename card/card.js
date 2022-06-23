// меню 
let pancakesID = document.getElementById('pancakes');
let shaurmaID = document.getElementById('shaurma');
let sandwichesID = document.getElementById('sandwiches');
let burgersID = document.getElementById('burgers');
let chickenID = document.getElementById('chicken');
let saladsID = document.getElementById('salads');
let drinksID = document.getElementById('drinks');

//! для смены карточек и замены заднего фона 
let category = 'shaurma' ;
let new_categoria = '';

//* Стартовая заменя в шаурме
document.getElementById(category).classList.add('product_active');


//* Место для отображения картинки  
let cards = document.getElementById('cards');


// 

//! Да хоть маньяк ... , меня уже 'замучил' этот JSON 
pancakesID.onclick = () =>{ //* Блинов же недодали :) XD
    new_categoria = 'pancakes' ;
    reduction();
    cards.innerHTML += `<div style='position:absolute;left:45%;top:45%;font-size:2em;'>
        Блины закончились
    </div>`;
};
sandwichesID.onclick = () =>{new_categoria ='sandwiches';reduction()};
shaurmaID.onclick = () => { new_categoria = 'shaurma' ; reduction() };
burgersID.onclick = () => { new_categoria = 'burgers' ; reduction() };
chickenID.onclick = () => { new_categoria = 'chicken' ; reduction() };
saladsID.onclick = () => { new_categoria = 'salads' ; reduction()   };
drinksID.onclick = () => { new_categoria = 'drinks' ; reduction()   };


//* Повторялось при каждом нажатии поэтому вынес в отдельную функции
function reduction(){
    resetCards();
    cards.innerHTML = "" ;
    CreatsCards();
}

//* В левом меню показывает активную вкладку 
function resetCards(){
    console.clear();
    console.log('category up to :',category);
    if(category != new_categoria){
        document.getElementById(category).classList.remove('product_active');
        document.getElementById(new_categoria).classList.add('product_active');
    }
    category=new_categoria;
    console.log('category after :',category);
};

//* Создание карточке
function CreatsCards() {
    (async () => {
        
        let fileUrl = 'card/data.json';
        let response = await fetch(fileUrl);
        let DB = await response.json(); // читаем ответ в формате JSON
        /* console.log(DB) */
    
        for (let i = 0; i < DB['menu'].length; i++) {
            if (DB["menu"][i].category == category) {
                
                if(DB["menu"][i].market == 'doner'){
                    img_url = '/i/markets/doner.png' ; 
                } else if (DB["menu"][i].market == 'subway'){
                    img_url = '/i/markets/subway_logo.png' ;
                } else {
                    img_url = '/i/markets/south_fried_chicken.png' ; 
                };
    
                cards.innerHTML += `<div class="card">
                    <div class="logo"><img id="logo" src="${img_url}" /></div>
                    <div class="type"><img style="width:165px; height:165px;" id="type" src="${DB["menu"][i].image}"/></div>
                    <div class="name_type">${DB["menu"][i].name}</div>
                    <div id="variety">${DB["menu"][i].description}</div>
                    <div class="prices">Цена <div id="prices">${DB["menu"][i].price}</div> руб.</div>
                    <div class="lot">КОЛИЧЕСТВО</div>
                    <div class='sum_item'>
                        <button class="switches" type="button" onclick="this.nextElementSibling.stepDown()">-</button>
                        <input id="${DB["menu"][i].name}" onclick="value();" type="number" min="1" value="1" placeholder="1" class="raz" />
                        <button class="switches" type="button" onclick="this.previousElementSibling.stepUp()">+</button>
                    </div>
                    <div class='in_busket'><button>В КОРЗИНУ</button></div>
                </div>`;

                console.log(document.getElementById("${DB['menu'][i].name}").);
    

            }
        }
    })()
};


//* Для загрузки страницы
CreatsCards();

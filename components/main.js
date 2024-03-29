import SelectedItem from "./ItemList/script.js" ;
import Sorting from "./Cards/script.js";
import AddToBasket from "./Busket/AddToBasket/script.js";
import EditAmount from "./Busket/EditAmount/script.js";
import SelectionOrder from "./Checkout/script.js";
import QuantityChange from "./Checkout/AnOrder/QuantityСhange/script.js";
import CustomOrder from "./Checkout/CustomOrder/script.js";
import LogicCustomPage from "./Checkout/CustomOrder/PageСhange/Logic/script.js";

let Selected = sandwiches ;     // Стартовый поик элемента
let Str = 0 ;

document.querySelector('#AppMenu').addEventListener('click',function(e){       // Переключение категорий
    Selected = e.target; 

    SelectedItem(Selected);     // Изменение цвета кнопок в разделах
    Sorting(Selected);      // Генерация карточек
});

document.querySelector('#Cards').addEventListener('click',function(e){     // Добавление в корзину
    if  (
            (e.target.parentNode.classList.contains('InBusket')) &&
            (e.target.parentNode.parentNode.children[2].textContent != 'Создай бурито своими руками')
        ) {        // Отлов нажатия на кнопку basket
        AddToBasket(e);
    } else if ( e.target.parentNode.parentNode.children[2].textContent == 'Создай бурито своими руками' ){
        CustomOrder();
    };
});

document.querySelector('#BasketTovar').addEventListener('click',function(e){        // Изменение значения товара
    let Meaning = e.target.attributes.name.value ;      // Узнаём на что нажали + или -
    let ThisProduct = e.target.parentNode.parentNode ;      // Поиск товара в котором меняем значение

    if ( Meaning == 'plus' , 'minus') {     // Если нажали на + или - 
        EditAmount(Meaning , ThisProduct);
    };

    console.log(e.target.parentNode.parentNode.classList.value);
    console.log(e.target);
});

document.querySelector('#Checkout').addEventListener('click',function(){     // Страница заказа товароа
    SelectionOrder();
});

document.querySelector('#CheckoutTitle').addEventListener('click',function(e){      // Изменение количество на странице заказа товара
    
    if ( CheckoutTitle.children[1].attributes.name.value == 'AnOrder' ) {
        
        let MoreLess = e.target.attributes.name.value ;

        if ( e.target.classList.value == 'BasketTovarPlusMinus' ) {
            QuantityChange(MoreLess , e);
        };

    } else if ( CheckoutTitle.children[1].attributes.name.value == 'CustomOrder' ) {
        LogicCustomPage(Str);
    }

});

Sorting(Selected);      // Генерация карточек
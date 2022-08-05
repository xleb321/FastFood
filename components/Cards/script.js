import Cards from "./AnyItems/script.js";
import CustomItem from "./CastomItem/script.js";

export default function Sorting(Selected) { 
    document.getElementById('Cards').innerHTML = '';

    if (Selected.attributes[0].value == 'sandwiches') {     // Проверка на раздел для кастомного сендвича
        CustomItem();
    };
    
    Cards(Selected);        // Генерация карточек
};
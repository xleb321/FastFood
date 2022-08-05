import AnOrder from "./AnOrder/script.js" ;
import NoOrder from "./NoOrder/script.js" ;
import CustomOrder from "./CustomOrder/script.js" ;

export default function SelectionOrder () {
    let BasketLength = document.getElementById('BasketTovar').children.length;

    if (BasketLength != 0) {
        AnOrder();
    } else {
        NoOrder();
    };
    document.querySelector('html, body').style.overflow = 'hidden' ;
};
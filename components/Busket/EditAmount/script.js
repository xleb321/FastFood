export default function EditAmount( Meaning , ThisProduct ) {
    let ThisProductPrice = ThisProduct.attributes.value.value ;     // Стоимость 1 товара
    let Itog = document.getElementById('KorzSum') ;
    let ItogPrice = Number(Itog.textContent) ;

    if ( Meaning == 'plus'){
        ThisProduct.children[2].textContent = Number(ThisProduct.children[2].textContent) + 1 ;

		ItogPrice = Number(ItogPrice) + Number(ThisProductPrice) ;      // Считаем новую итоговую сумму
		Itog.innerHTML = ItogPrice;     // Выводим итоговую сумму
        
    } else if (Meaning == 'minus') {
        if (Number(ThisProduct.children[2].textContent) == 1){
            ThisProduct.remove();
        } else {
            ThisProduct.children[2].textContent = Number(ThisProduct.children[2].textContent) - 1 ;
        };

        ItogPrice = Number(ItogPrice) - Number(ThisProductPrice) ;      // Считаем новую итоговую сумму
        Itog.innerHTML = ItogPrice ;        // Выводим итоговую сумму
    };
};
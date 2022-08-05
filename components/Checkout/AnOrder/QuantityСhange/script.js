export default function QuantityChange(MoreLess , e) {
    let ThisItem = e.target.parentNode.parentNode ;
    let NewCol =  Number(ThisItem.children[2].textContent) ;
    let ItogSum = document.getElementById('itog') ;
    let BaskSum = document.getElementById('KorzSum') ;

    if (MoreLess == 'plus') {
        ThisItem.children[2].innerHTML = `${NewCol + 1}`;
        ItogSum.innerHTML = `${Number(ItogSum.textContent) + Number(ThisItem.attributes.value.value)}`;
        BaskSum.innerHTML = `${Number(BaskSum.textContent) + Number(ThisItem.attributes.value.value)}`;
        
        for (let i = 0 ; i < BasketTovar.children.length ; i++){
            if ( BasketTovar.children[i].attributes.name.value == ThisItem.attributes.name.value ){
                BasketTovar.children[i].children[2].textContent++;
            };
        };

    } else if (MoreLess == 'minus') {

        if (Number(ThisItem.children[2].textContent) != 1){
            ThisItem.children[2].innerHTML = `${NewCol - 1}`;
            ItogSum.innerHTML = `${Number(ItogSum.textContent) - Number(ThisItem.attributes.value.value)}`;
            BaskSum.innerHTML = `${Number(BaskSum.textContent) - Number(ThisItem.attributes.value.value)}`;

            for (let i = 0 ; i < BasketTovar.children.length ; i++){
                if ( BasketTovar.children[i].attributes.name.value == ThisItem.attributes.name.value ){
                    BasketTovar.children[i].children[2].textContent--;
                };
            };

        } else {

            for (let i = 0 ; i < BasketTovar.children.length ; i++){
                if ( BasketTovar.children[i].attributes.name.value == ThisItem.attributes.name.value ){
                    BasketTovar.children[i].remove();
                };
            };

            BaskSum.innerHTML = `${Number(BaskSum.textContent) - Number(ThisItem.attributes.value.value)}`;
            ThisItem.remove();

            if (document.getElementById('TitleCards').children.length == 0){
                document.getElementById('CheckoutTitle').innerHTML = ``;
            };
        };
    };
};
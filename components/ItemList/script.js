export default function SelectedItem(Selected) {
    let ItemList = document.getElementById('AppMenu');     // Поиск всего ItemList'а

    for (let i = 0; i < ItemList.children.length; i++){ // Убераем у всех класс
        ItemList.children[i].classList.remove('ProductActive');
    };

    Selected.classList.add('ProductActive'); // Выдаём нажатому класс
};
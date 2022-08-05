export default function close() {
    let CheckoutTitle = document.getElementById('CheckoutTitle');
    
    CheckoutTitle.innerHTML = ``;
    document.querySelector('html, body').style.overflow = 'auto' ;
};
   //    For the Navbar starts
let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
    loginItems.classList.remove('active');
    cartItems.classList.remove('active');
}

   //  For the searchform starts
let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
    loginItems.classList.remove('active');
    cartItems.classList.remove('active');
}

//  For the login starts
let loginItems = document.querySelector('.loginitems');

document.querySelector('#user-btn').onclick = () =>{
    loginItems.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    cartItems.classList.remove('active');
}

    // For the cart starts
 let cartItems = document.querySelector('.cartitems');

 document.querySelector('#cart-btn').onclick = () =>{
    cartItems.classList.toggle('active');
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    loginItems.classList.remove('active');
}

window.onscroll = () =>{
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
    loginItems.classList.remove('active');
    cartItems.classList.remove('active');
}

   // For the plus and minus starts
const plus = document.querySelector(".plus"),
minus = document.querySelector(".minus"),
num = document.querySelector(".num");

let a = 1;

plus.addEventListener("click", () =>{
    a++;
    a = (a < 10) ? "0" + a : a;
    num.innerText = a;
    console.log("a");
});

minus.addEventListener("click", () =>{
 if(a > 1){
    a--;
    a = (a < 10) ? "0" + a : a;
    num.innerText = a;
 }
});


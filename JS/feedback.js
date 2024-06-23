// * product crud
// &Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
  get,
  child,
  remove,
  update,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// & web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBB8LsLnZMETABDpcJv7YWf8e7BiMNAQZ8",
  authDomain: "viral-store-eb345.firebaseapp.com",
  databaseURL: "https://viral-store-eb345-default-rtdb.firebaseio.com",
  projectId: "viral-store-eb345",
  storageBucket: "viral-store-eb345.appspot.com",
  messagingSenderId: "457082796918",
  appId: "1:457082796918:web:698e4f8c7be302110ad857",
  measurementId: "G-8R9QKEBG44",
};

// *Initialize Firebase
const app = initializeApp(firebaseConfig);
let db = getDatabase();

let user;
if (sessionStorage.getItem("user-creds") != null) {
  user = JSON.parse(sessionStorage.getItem("user-creds"));
  document.getElementById("acc").innerHTML = user.displayName;
} else {
  user = null;
  // window.location.href="../index.html"
}

let { displayName, uid } = user;
console.log("dispy", displayName);
console.log("dispy", user);
setTimeout(() => {
  document.getElementById("acc1").innerText = displayName;
}, 1000);
//toglemenu
function toggleMenu() {
  var menuContainer = document.querySelector(".menu-container");
  menuContainer.classList.toggle("open");
}
window.toggleMenu = toggleMenu;

let productKey;
if (sessionStorage.getItem("product") != null) {
  productKey = +sessionStorage.getItem("product");
}

let storedProduct;
function getProduct() {
  let dbref = ref(db);
  get(child(dbref, "/products/" + productKey)).then((e) => {
    storedProduct = e.val();
    if (window.location.pathname.endsWith("productDetails.html")) {
      const currentPageURL = new URL(window.location.href);
      currentPageURL.searchParams.set(
        storedProduct.category,
        storedProduct.productName
      );
      history.replaceState({}, "i8yi8y8y8", currentPageURL);
    }
  
  });
}
window.onload = function () {
  getProduct();
};
////////////////////////////////////////////////////////
//!Cart list Global variable
let allCartProduct;
let cartProduct;
let cart;

let allWishProduct;
let wishProduct;
let wish;

function getWishList() {
  let dbref = ref(db);
  return get(child(dbref, "/wishList")).then((snapshot) => {
    let wish = snapshot.val();
    // console.log(wish);
    //   displayWish(wish)
    getWishData(wish);
    return wish;
  });
}

getWishList();
let allWishItems = [];

function getWishData(listItems) {
  Object.keys(listItems).forEach((key) => {
    if (key == uid) {
      const wishItem = listItems[key];
      //   console.log('s',wishItem);
      allWishItems = [...wishItem.products];
      document.getElementById("wish-num").innerText = allWishItems.length - 1;
      document.getElementById("wish-num-mob").innerText =
        allWishItems.length - 1;
    }
  });
}

let allCardProduct = [];
function getCartList() {
  let dbref = ref(db);
  return get(child(dbref, "/cartList")).then((snapshot) => {
    let Cart = snapshot.val();
    // console.log(Cart);
    getcartData(Cart);
    return Cart;
  });
}
getCartList();

function getcartData(listItems) {
  Object.keys(listItems).forEach((key) => {
    if (key == uid) {
      const cartItem = listItems[key];
      // console.log('s',cartItem);
      allCardProduct = [...cartItem.products];
      // console.log('allCardProduct',allCardProduct)
      document.getElementById("cart-num").innerText = allCardProduct.length - 1;
      document.getElementById("cart-num-mob").innerText =
        allCardProduct.length - 1;
    }
  });
}

async function getWishProducts() {
  wish = await getWishList();
  if (wish == null) {
    createWish();
    return;
  }

  let isfound = false;
  Object.keys(wish).forEach((key) => {
    if (key == uid) {
      isfound = true;
      wishProduct = wish[key];
      allWishProduct = wishProduct.products;
      document.getElementById("wish-num").innerText = allWishProduct.length - 1;
      document.getElementById("wish-num-mob").innerText =
        allWishProduct.length - 1;
      try {
        window.localStorage.setItem(
          "wishNumber",
          `${allWishProduct.length - 1}`
        );
      } catch (error) {}
      return;
    }
  });
  if (isfound == false) {
    createWish();
    allWishProduct = [];
  }
}

async function getCartProducts() {
  cart = await getCartList();
  // console.log('ddd',cart)

  if (cart == null) {
    createCart();
    return;
  }

  let isfound = false;
  Object.keys(cart).forEach((key) => {
    if (key == uid) {
      isfound = true;
      cartProduct = cart[key];
      allCartProduct = cartProduct.products;
      document.getElementById("cart-num").innerText = allCartProduct.length - 1;
      document.getElementById("cart-num-mob").innerText =
        allCartProduct.length - 1;
      try {
        localStorage.setItem("cartNumber", allCartProduct.length - 1);
      } catch (error) {}
      return;
    }
  });
  if (isfound == false) {
    createCart();
    allCartProduct = [];
  }
}

getWishProducts();
getCartProducts();

function addNotify(message) {
  //Screen notify after Add
  Toastify({
    text: message,
    duration: 2000,
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "left", // `left`, `center` or `right`
    stopOnFocus: true,
    offset: {
      y: 70,
    },
    style: {
      background: "linear-gradient(to right, #00b09b, #96c93d)",
    },
    onClick: function () {}, // Callback after click
  }).showToast();
}


function SendFeedBack(){
   let feedback= document.getElementById('feedback').value;
   update(ref(db, "completedOrder/" + uid), {
    feedback:feedback,
  });

  window.location.href='./home.html'
}

window.SendFeedBack=SendFeedBack
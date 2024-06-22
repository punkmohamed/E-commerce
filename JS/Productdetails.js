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
if(sessionStorage.getItem('user-creds')!=null)
  {
      user=JSON.parse(sessionStorage.getItem('user-creds'))
      document.getElementById('acc').innerHTML=user.displayName

  }else{
      user=null
      // window.location.href="../index.html"
  }

  let{displayName,uid}=user

 setTimeout(()=>{
  document.getElementById("acc1").innerHTML = JSON.parse(
    sessionStorage.getItem("user-creds")
  ).displayName;
 },1000)
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
    console.log("storedProduct", storedProduct);
    console.log("storedProducts", storedProduct.category);
    let addeditem = document.querySelector(".addeditem");
    addeditem.innerHTML = `
  <div id="main">
            <div id="gallary">
                <div id="mainphoto">
                    <img src="${storedProduct.productImage}" name="main" alt="">
                </div>
            </div>
            <div id="Details">
                <h1 >${storedProduct.productName}</h1>
                <p>${storedProduct.description}</p>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star checked"></span>
                <span class="fa fa-star"></span>
                <span>( 150 )</span>
                <br>
                <br>
                <hr>
                <h2>Price : ${storedProduct.price} $</h2>
                <p>We have many different payment methods</p>
                <hr>
                <div id="details-btn">
                <button onclick="addToCart(${productKey})" type="button" class="btn cart" onclick="addToCart()">Add To Cart</button>
                <button onclick="addToWish(${productKey})"  type="button" class="btn wish">Add To Wishlist</button>
                </div>
                
            </div>
        </div>
    </div>
`;
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
  let dbref = ref(db)
 return get(child(dbref, '/wishList')).then((snapshot) => {
      let wish = snapshot.val()      
      // console.log(wish);
    //   displayWish(wish)
      getWishData(wish)
      return wish
  })
}

getWishList()
let allWishItems=[]

function getWishData(listItems){

    Object.keys(listItems).forEach((key) => {
        if(key==uid){
            const wishItem = listItems[key];
          //   console.log('s',wishItem);
            allWishItems=[...wishItem.products]
            document.getElementById('wish-num').innerText=allWishItems.length-1
            document.getElementById('wish-num-mob').innerText=allWishItems.length-1
        }
    })

}

let allCardProduct=[];
function getCartList() {
    let dbref = ref(db)
   return get(child(dbref, '/cartList')).then((snapshot) => {
        let Cart = snapshot.val()      
        // console.log(Cart);
        getcartData(Cart)
        return Cart
    })
}
getCartList()

function getcartData(listItems){

    Object.keys(listItems).forEach((key) => {
        if(key==uid){
            const cartItem = listItems[key];
            // console.log('s',cartItem);
            allCardProduct=[...cartItem.products]
            // console.log('allCardProduct',allCardProduct)
            document.getElementById('cart-num').innerText=allCardProduct.length-1
            document.getElementById('cart-num-mob').innerText=allCardProduct.length-1
        }
    })
}

async function addToWish(key) {
  let { count, products, totalPrice } = wishProduct;
  // console.log('hahah',allWishProduct )
  // console.log('ddfdfdfdfsd',wishProduct )
  getCartProducts("Added to wish Successfully");
  let wishProducts = products != [""] ? allWishProduct : [];
  let total = totalPrice ? totalPrice : 0;
  wishProducts.push(storedProduct)
  console.log(storedProduct)
  

  if (wish == null) {
    set(ref(db, "wishList/" + uid), {
      count: 1,
      products: wishProducts,
      totalPrice: total,
      uid,
    });
  } else {
    count += 1;
    set(ref(db, "wishList/" + uid), {
      count: count,
      products: wishProducts,
      totalPrice: total,
      uid,
    });
  }
  getWishProducts();
  addNotify("Added To Wish Successfully");

}
window.addToWish = addToWish;

async function addToCart(key) {

  let { count, products, totalPrice } = cartProduct;
  let cartProducts = products != [""] ? allCartProduct : [];
  let total = totalPrice ? totalPrice : 0;

  cartProducts.push(storedProduct);
  if (wish == null) {
    set(ref(db, "cartList/" + uid), {
      count: 1,
      products: cartProducts,
      totalPrice: total,
      uid,
    });
  } else {
    count += 1;
    set(ref(db, "cartList/" + uid), {
      count: count,
      products: cartProducts,
      totalPrice: total,
      uid,
    });
    getCartList()
  }
  addNotify("Added To Cart Successfully");

}
window.addToCart = addToCart;

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
          
          window.localStorage.setItem("wishNumber", `${allWishProduct.length - 1}`);
        } catch (error) {
          
        }
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
        } catch (error) {
          
        }
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
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
import {
  getStorage,
  ref as reff,
  uploadBytesResumable,
  getDownloadURL,
  // import { async } from './wish';
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
//   *variables
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

const app = initializeApp(firebaseConfig);
let db = getDatabase();
const storage = getStorage();

let storedProducts;
function getProducts() {
  let dbref = ref(db);
  get(child(dbref, "/products")).then((e) => {
    storedProducts = e.val();
    console.log(storedProducts);
    displayProduct(storedProducts);
  });
}
function displayProduct(storedProducts) {
  let productList = ``;
  if (storedProducts == null) {
    document.getElementById("product-cards").innerHTML = "";
  } else {
    Object.keys(storedProducts).forEach((key) => {
      const product = storedProducts[key];
      productList += ` 
      <div class="card">
      <span onclick="productDetails(${key})">
      <img src="${product.productImage}" alt="" class="product-image">
      </span>
          <div><i class='fa-regular fa-heart heart-icon' id="heart-icon"></i></div>
          <div class="product-info">
              <div class="info"><h2>${product.productName}</h2></div>
              <h3 class="price">$ ${product.price}</h3>
              <p>${product.category}</p>
              <p>Quantity ${product.quantity}</p>
              <div class="rating">
                  <span>✶</span>
                  <span>${product.rating}</span>
              </div>
              <button  onclick="addToWish(${key})" class="add-to-cart">Add to Cart</button>
              </div>
          </div>
            `;
    });
    document.getElementById("product-cards").innerHTML = productList;
    addHeart();
  }
}

function productDetails(key) {
  console.log("ssssssssss", key);
  localStorage.setItem("product", key);
  window.location.href = "./productDetails.html";
}
window.productDetails = productDetails;


function logout() {
  localStorage.removeItem("user-info");
  localStorage.removeItem("user-creds");
  window.location.href = "../index.html";
}
window.logout = logout;

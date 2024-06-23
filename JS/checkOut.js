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
import {
  getStorage,
  ref as reff,
  uploadBytesResumable,
  getDownloadURL,
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
// *Initialize Firebase
const app = initializeApp(firebaseConfig);
let db = getDatabase();
let allItems;
let tPrice = 0;

let user;
if (sessionStorage.getItem("user-creds") != null) {
  user = JSON.parse(sessionStorage.getItem("user-creds"));
  document.getElementById("acc").innerHTML = user.displayName;
} else {
  user = null;
  // window.location.href="../index.html"
}

let { displayName, uid, email } = user;
console.log(displayName, uid, email);

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
  displayChectProduct(allCardProduct);
}
function displayChectProduct(orderItem) {
  // console.log((orderItem));
  // console.log('document.getElementById',document.getElementById('order-item'));
  let orderList = ``;
  tPrice = 0;
  for (let i = 1; i < orderItem.length; i++) {
    tPrice += +orderItem[i].price;
    orderList += `
               <tr>
                  <td>${i}</td>
                <td>${orderItem[i].productName}</td>
                 <td><span>${orderItem[i].price}$</span></td>
                        </tr>       
            `;
  }
  document.getElementById("order-item").innerHTML = orderList;
  document.getElementById("priceNumIn").innerHTML += tPrice;
}

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

paypal
  .Buttons({
    style: {
      layout: "vertical",
      color: "blue",
      shape: "rect",
      label: "paypal",
    },
    message: {
      amount: 0,
      align: "center",
      color: "black",
      position: "top",
    },

    createOrder: function (date, actions) {
      return actions.order.create({
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: `${tPrice}.0`,
            },
          },
        ],
      });
    },
    onAuthorize: function (data, actions) {
      return actions.execute().then(function () {
        console.log("sssssssssssssssssss", data, actions);
      });
    },
    onApprove: function (data, actions) {
      // Capture the transaction
      return actions.order.capture().then(function (details) {
        console.log("aproved");
        swal("Good job!", "Payment Successfuly!", "success");
        OrderDone();
        deleteAllItem();
        resetOrder();
        setTimeout(() => {
          window.location.href = "./feedback.html";
        }, 1000);
        // Optionally, you can send the transaction details to your server for processing
      });
    },
    onError: function (err) {
      console.error("An error occurred during the transaction", err);
      // Handle errors here
    },

    client: {
      sandbox:
        "AQTld3wUC_o7_lLuOcedBgu8xfJNHsB4Di4eaawRPTRmzPLiANcf1Azlk4Gg86vEeNriaZiO6CimS7ar",
      production: "",
    },
  })
  .render("#paypal-button-container");

function logout() {
  localStorage.removeItem("user-info");
  localStorage.removeItem("user-creds");
  window.location.href = "../index.html";
}
window.logout = logout;

function toggleMenu() {
  var menuContainer = document.querySelector(".menu-container");
  menuContainer.classList.toggle("open");
}
window.toggleMenu = toggleMenu;

function deleteAllItem() {
  update(ref(db, "cartList/" + uid), {
    products: [""],
  });
  remove(ref(db,"orderRequest/"+uid ))

  document.getElementById("cart-num").innerText = 0;
  document.getElementById("cart-num-mob").innerText = 0;
}
function OrderDone() {
  set(ref(db, "completedOrder/" + uid), {
    name: displayName,
    email: email,
    products: allCardProduct,
  });
}
function resetOrder() {
  update(ref(db, "orderRequest/" + uid), {
    isAccepted: false,
  });
}

// import emailjs from 'https://cdn.emailjs.com/dist/email.min.js';

// (function () {
//   emailjs.init({
//     publicKey: "QWn2GKw6Xbq6wVdLo",
//   });
// })();

// function SendMessageTomail(){
//   var templateParams = {
//     to_name: displayName,
//     to_email: email,
//   };

//   emailjs.send("service_d1dt6yx", "template_7y2ckyj", templateParams).then(
//     (response) => {
//       console.log("SUCCESS!", response.status, response.text);
//       alert("Email sent successfully!");
//     },
//     (error) => {
//       console.log("FAILED...", error);
//       alert("Failed to send email.");
//     }
//   );
  

// }

// var templateParams = {
//   to_name: "ahmed ali",
//   to_email: "ahmedalielian20@gmail.com",
// };
// emailjs.send("service_d1dt6yx", "template_7y2ckyj", templateParams).then(
//   (response) => {
//     console.log("SUCCESS!", response.status, response.text);
//     alert("Email sent successfully!");
//   },
//   (error) => {
//     console.log("FAILED...", error);
//     alert("Failed to send email.");
//   }
// );
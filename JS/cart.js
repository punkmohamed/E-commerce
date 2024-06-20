// * product crud 
// &Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, set, ref, get, child, remove, update } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getStorage, ref as reff,uploadBytesResumable, getDownloadURL }

 from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";
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
    measurementId: "G-8R9QKEBG44"
};
// *Initialize Firebase
const app = initializeApp(firebaseConfig);
let db = getDatabase();
const storage = getStorage();


let allCartProduct;
let cartProduct
let cart;
let orderInfo={};
let allItems=[]

let allWishItems=[]
function getWishList() {
    let dbref = ref(db)
   return get(child(dbref, '/wishList')).then((snapshot) => {
        let wish = snapshot.val()      
        console.log(wish);
      //   displayWish(wish)
        getWishData(wish)
        return wish
    })
}
checkPaymentRequest(orderInfo);
getWishList()
  function getWishData(listItems){

        Object.keys(listItems).forEach((key) => {
            if(key==uid){
                const wishItem = listItems[key];
                console.log('s',wishItem);
                allWishItems=[...wishItem.products]
                document.getElementById('wish-num').innerText=allWishItems.length-1
            }
        })
     

  }
  
let user;
if(sessionStorage.getItem('user-creds')!=null)
    {
        user=JSON.parse(sessionStorage.getItem('user-creds'))
    }else{
        user=null
        window.location.href="../index.html"
    }

    let{displayName,email,uid}=user
    console.log(user)

      
  function getcartList() {
      let dbref = ref(db)
     return get(child(dbref, '/cartList')).then((snapshot) => {
          let cart = snapshot.val()      
          console.log(cart);
        //   displaycart(cart)
          getcartData(cart)
          return cart
      })
  }
  getcartList()


  function getcartData(listItems){

        Object.keys(listItems).forEach((key) => {
            if(key==uid){
                const cartItem = listItems[key];
                console.log('cardd',cartItem);
                allItems=[...cartItem.products]
                document.getElementById('cart-num').innerText=allItems.length
            }
        })
        displaycart(allItems)
        checkPaymentRequest(orderInfo)

  }
  let tPrice=0;

  function displaycart(listItems){
    console.log((listItems));
    console.log('document.getElementById',document.getElementById('cart-items'));
    let cartList = ``;
    tPrice=0;
    for(let i=1;i<listItems.length;i++)
        {
            tPrice+=+listItems[i].price;
            cartList += `
            <div class="items">
                <div class="logo">
                    <img src="${listItems[i].productImage}" alt="">
                </div>
                <div class="item-box">
                    <div class="cart-content">
                        <h2>${ listItems[i].productName}</h2>
                        <div class="rating">
                            <p class='price'>${listItems[i].price}$</p>
                            <p class='rate'>${listItems[i].rating } <i class="fas fa-star"></i>
</p>
                        </div>
                    </div>
                    <div class="item-btn">
                        <button onclick="deleteItem(${i})" class="btn-delete">delete</button>
                    </div>
                </div>

            </div>
       
            `;

        }
        // document.getElementById('cart-items').innerHTML = cartList;
        if(allItems.length<=1)
            {
                document.getElementById('cart-items').innerHTML = `   <div class="page-empty">
            <h2>No cart item Found</h2>   
        </div>`;
        document.getElementById('cart-btn').innerHTML = ``
        resetOrder();
            }else{
                document.getElementById('cart-items').innerHTML = cartList;
            }
    
        console.log('orderInfo.isAcceptedorderInfo.isAccepted',orderInfo);

 

        document.getElementById('cart-num').innerText=allItems.length-1

      localStorage.setItem('total_order',tPrice)
  }

  function deleteItem(index){
      if(allItems.length<=2){
        document.getElementById('cart-items').innerHTML = `  <div class="page-empty">
            <h2>No cart item Found</h2>
          </div>`;
          
       }
      allItems.splice(index,1)
    update(ref(db,"cartList/"+uid ), {
        products: allItems,
    })
     displaycart(allItems)
     document.getElementById('cart-num').innerText=allItems.length-1


  }
  window.deleteItem=deleteItem



  function makeOrderRequest(){
    set(ref(db,"orderRequest/"+uid ), {
        name:displayName,
        mail:email,
        products:allItems,
        isAccepted:false,
        totalPrice:tPrice,  
     })
     getOrderRequest()
     swal("Request Send Successfuly!", "Wait untill admin accept order");
  
  }
  window.makeOrderRequest=makeOrderRequest

  function getOrderRequest(){
    let dbref = ref(db);
     get(child(dbref, "/orderRequest")).then((snapshot) => {
      let order = snapshot.val();
    //   console.log('orderRequest',order);
      getOrderData(order)
    //   return wish;
    });
  }
  function getOrderData(orderItems){
    Object.keys(orderItems).forEach((key) => {
        if(key==uid){
            orderInfo= orderItems[key];
            console.log('orderInfo',orderInfo);
            checkPaymentRequest(orderInfo)
        }
    })
}
window.onload=function name() {
    getOrderRequest()
}

function checkPaymentRequest(orderInfo){
    // console.log("hhhhhhhhhhhhhhhhhh")
    // console.log(allItems.length)
    if(allItems.length>=2){
        document.getElementById('cart-btn').innerHTML = `  
        <div class="prices">
        <a class="btn-Request" onclick="makeOrderRequest()">Request Oreder</a>
        </div>
        </div>`;
    }else{
 document.getElementById('cart-btn').innerHTML = ``
    }
    // console.log(orderInfo)
    if(orderInfo.isAccepted)
        {
           document.getElementById('cart-btn').innerHTML = `  <div class="prices">
         <div>Total Price :<span id="totalPrice">${tPrice}$</span> </div> 
        <a class="btn-checkOut" href="checkOut.html">Check Out</a>
    </div>`;
        }
    
   
}

function resetOrder(){
    update(ref(db,"orderRequest/"+uid ), {      
        isAccepted:false,
     })
}


function logout(){
    localStorage.removeItem("user-info")
    localStorage.removeItem("user-creds")
    window.location.href='../index.html'
  }
  window.logout = logout;
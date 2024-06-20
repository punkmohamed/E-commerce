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


let allWishProduct;
let wishProduct
let wish;

let user;
if(sessionStorage.getItem('user-creds')!=null)
    {
        user=JSON.parse(sessionStorage.getItem('user-creds'))
    }else{
        user=null
        window.location.href="../index.html"
    }

    let{displayName,uid}=user
    console.log(displayName,uid)
    
    
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

  getWishList()
let allItems=[]

  function getWishData(listItems){

        Object.keys(listItems).forEach((key) => {
            if(key==uid){
                const wishItem = listItems[key];
                console.log('s',wishItem);
                allItems=[...wishItem.products]
                document.getElementById('wish-num').innerText=allItems.length-1
            }
        })
        displayWish(allItems)

  }

  function displayWish(listItems){
    console.log((listItems));
    let whisList = ``;
    for(let i=1;i<listItems.length;i++)
        {
            whisList += `
            <div class="items">
                <div class="logo">
                    <img src="${listItems[i].productImage}" alt="">
                </div>
                <div class="item-box">
                    <div class="wish-content">
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

        document.getElementById('wish-items').innerHTML = whisList;
    }
  }

  function deleteItem(index){
      if(allItems.length<=2){
        document.getElementById('wish-items').innerHTML = `  <div class="page-empty">
            <h2>No Wish item Found</h2>
          </div>`;
       }
      allItems.splice(index,1)
    update(ref(db,"wishList/"+uid ), {
        products: allItems,
    })
     displayWish(allItems)
     document.getElementById('wish-num').innerText=allItems.length-1


  }
  window.deleteItem=deleteItem

  function logout(){
    localStorage.removeItem("user-info")
    localStorage.removeItem("user-creds")
    window.location.href='../index.html'
  }
  window.logout = logout;
// * product crud 
// &Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, set, ref, get, child, remove, update } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getStorage, ref as reff,uploadBytesResumable, getDownloadURL }
// import { async } from './wish';

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

//firebase

//toglemenu
function toggleMenu() {
  var menuContainer = document.querySelector('.menu-container');
  menuContainer.classList.toggle('open');
}
window.toggleMenu = toggleMenu;
//toglemenu

//logout
function logout(){
  localStorage.removeItem("user-info")
  localStorage.removeItem("user-creds")
  window.location.href='../index.html'
}
window.logout = logout;

//logout

//scrollimages
let landingpage = document.querySelector(".banner .left img");
let imgsArray = [];
for (let i = 1; i < 9; i++) {
    imgsArray.push(`../images/banner/b${i}.jpg`);
}

let index = 0;
function scrollImages() {
    setInterval(function () {
      try {
        landingpage.style.opacity = 0;    
        setTimeout(function() {
          if (index === imgsArray.length - 1) {
            index = 0;
          } else {
            index++;
          }
            landingpage.src = imgsArray[index];
            landingpage.style.opacity = 1;
        }, 1000);
      } catch (error) {
        
      }

    },3000); 
}
scrollImages();
//scrollimages


// top arrow 
document.addEventListener('DOMContentLoaded', function () {
    var scrollToTopBtn = document.getElementById('scrollToTopBtn');

    try {
      window.addEventListener('scroll', function () {
        if (window.pageYOffset > 100) {
            scrollToTopBtn.style.display = 'block';
        } else {
            scrollToTopBtn.style.display = 'none';
        }
    });
      scrollToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    } catch (error) {
      
    }
    
});
// top arrow 

// sale//////////////

var countDownDate = new Date("sep 5, 2024 15:37:25").getTime();

var x = setInterval(function () {

  var now = new Date().getTime();

  var distance = countDownDate - now;


  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);


  try {
    document.getElementById("demo").innerHTML =
    days + "d " + hours + "h " + minutes + "m " + seconds + "s ";
  } catch (error) {
    
  }


  if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
  }

}, 1000);
// top arrow 





//displaying the product
let storedProducts
function getProducts() {
  let dbref = ref(db);
  get(child(dbref, '/products')).then((e) => {
       storedProducts = e.val();
      // console.log(storedProducts);
      displayProduct(storedProducts);
  })
}


function displayProduct(storedProducts) {
  let productList = ``;
  if (storedProducts == null) {
      document.getElementById('product-cards').innerHTML = "";
  } else {
      Object.keys(storedProducts).forEach((key) => {
          const product = storedProducts[key];
          productList += ` 
    <div class="card">
        <img src="${product.productImage}" alt="" class="product-image">
        <div><i onclick="addToWish(${key})"  class='fa-regular fa-heart heart-icon' id="heart-icon"></i></div>
        <div class="product-info">
            <div class="info"><h2>${product.productName}</h2></div>
            <h3 class="price">$ ${product.price}</h3>
            <p>${product.category}</p>
            <p>Quantity ${product.quantity}</p>
            <div class="rating">
                <span>✶</span>
                <span>${product.rating}</span>
            </div>
            <button  onclick="addToCart(${key})" id="load" class="add-to-cart">Add to Cart</button>
            </div>
        </div>
          `;
      });
      try {
        document.getElementById('product-cards').innerHTML = productList;
      } catch (error) {
        
      }
      addHeart();
  }
}
getProducts();
  // Select all heart icons
  function addHeart() {
    // Select all heart icons
    const heartIcons = document.querySelectorAll(".heart-icon");
    // Add event listener to all heart icons
    heartIcons.forEach((heartIcon) => {
      heartIcon.addEventListener("click", () => {
        heartIcon.classList.toggle("fa-regular");
        heartIcon.classList.toggle("fa-solid");
        heartIcon.classList.toggle("liked");
       
      });
    });
  }
  //displaying the product








  //displaying the category
  function getCategories() {
    let dbref = ref(db)
    get(child(dbref, '/categories')).then((e) => {
        let storedCategories = e.val();
        displayCategories(storedCategories);
    })
}
function displayCategories(storedCategories) { 
  let categoriesList = ``;
  if (storedCategories == null) {
      document.getElementById('categoires').innerHTML = "";
  } else {
      Object.keys(storedCategories).forEach((key) => {
          const category = storedCategories[key];
          categoriesList += `
          <div class="category">
              <div class="cat-img">
                  <img src="${category.image}" alt="">
              </div>
              <div class="cat-info">
                  <a href="">
                      <h1>${category.categoryName}</h1>
                  </a>
                  <p>Quantity: ${category.productsCount}</p>
              </div>
              </div>
          `;
      });
      try {
        document.getElementById('categoires').innerHTML = categoriesList;
      } catch (error) {
        
      }
  }
}
getCategories();

let allWishProduct;
let wishProduct
let wish;
  // animation 
  let animation;
  window.onload = async function() {
try {
  animation = ScrollReveal({
    distance: '60px',
    duration: 1500,
    delay: 200,
    once: true
  });

} catch (error) {
  
}
    animation.reveal('#banner, .Aboutus, .categories, .product-cards', { delay: 200, origin: 'top' });
    animation.reveal('.roww, .card, .category, .gallery', { delay: 200, origin: 'right' });
    animation.reveal('.gallery_item.gallery_item_1', { delay: 200, origin: 'left' });
    animation.reveal('.categories', { delay: 200, origin: 'bottom' });
    getWishProducts()
    getCartProducts()
   
  };

  async  function getWishProducts(){
  wish = await getWishList();
  if(wish==null)
    {
      createWish()
      return
    }
  
let isfound=false
    Object.keys(wish).forEach((key) => {
      if(key==uid)
        {
          isfound=true
          wishProduct=wish[key]
          allWishProduct=wishProduct.products;
          // console.log('aa',wishProduct.products )
          document.getElementById('wish-num').innerText=allWishProduct.length-1;
          document.getElementById('wish-num-mob').innerText=allWishProduct.length-1;
          localStorage.setItem('wishNumber',allWishProduct.length-1)
          return
        }
   })
   if(isfound==false)
    {
      createWish()
      allWishProduct=[]
    }
  }

    //displaying the category



    //!wish list
    let user;
if(sessionStorage.getItem('user-creds')!=null)
    {
        user=JSON.parse(sessionStorage.getItem('user-creds'))
        document.getElementById('acc').innerHTML=user.displayName
    }else{
        user=null
        window.location.href="../index.html"
    }

    let{displayName,uid}=user
    // console.log(displayName,uid)



       function createWish(){
        // console.log('create')
        set(ref(db,"wishList/"+uid ), {
          count:0,
          products:[''],
          totalPrice:0,
          uid})
          getWishList()
          getWishProducts()

       }

    async function addToWish(key){
      let{count,products,totalPrice}=wishProduct
      // console.log('hahah',allWishProduct )
      // console.log('ddfdfdfdfsd',wishProduct )
      getCartProducts( "Added to wish Successfully")
      let wishProducts=products!=['']?allWishProduct:[]
      let total=totalPrice?totalPrice:0;
       Object.keys(storedProducts).forEach((itemkey) => {
        if(itemkey==key)
          {
            // console.log("exist")
            const product = storedProducts[key];
            wishProducts.push(product)
            total+=Number(product.price)
          }
          
        })
    
        
            if(wish==null){
              // console.log('whis is null');
     set(ref(db,"wishList/"+uid ), {
               count:1,
               products:wishProducts,
               totalPrice:total,
               uid
            })
            }else{
              // console.log('whis not null');
              count+=1;
              set(ref(db,"wishList/"+uid ), {
                count:count,
               products:wishProducts,
               totalPrice:total,
               uid
            })
    
          }
          // console.log('ss',wish)
          getWishProducts()
        }
        window.addToWish=addToWish
        // addToWish()
    function getWishList() {
        let dbref = ref(db)
       return get(child(dbref, '/wishList')).then((snapshot) => {
            let wish = snapshot.val()      
            // console.log(wish);
            return wish
        })
    }
    getWishList()



        
            //!Cart list
                    
   let allCartProduct;
   let cartProduct
   let cart;


               function createCart(){
                // console.log('create')
                set(ref(db,"cartList/"+uid ), {
                  count:0,
                  products:[''],
                  totalPrice:0,
                  uid})
                  getCartList()
                  // getCartProducts()    
               }
        
            async function addToCart(key){
            document.getElementById('load').innerHTML=`<i class="fa-solid fa-fa-spinner fa-spin"></i>`
            // console.log(document.getElementById('load'));
              
              let{count,products,totalPrice}=cartProduct
              // console.log('hahddddah',allCartProduct )
        
              let cartProducts=products!=['']?allCartProduct:[]

              let total=totalPrice?totalPrice:0;
               Object.keys(storedProducts).forEach((itemkey) => {
                if(itemkey==key)
                  {
                    // console.log("exist")
                    const product = storedProducts[key];
                    cartProducts.push(product)
                    // console.log('cartProducts',cartProducts)
                    total+=Number(product.price)
                  }
                  
                })
            
                
                    if(wish==null){
                      // console.log('whis is null');
             set(ref(db,"cartList/"+uid ), {
                       count:1,
                       products:cartProducts,
                       totalPrice:total,
                       uid
                    })
                    }else{
                      // console.log('whis not null');
                      count+=1;
                      set(ref(db,"cartList/"+uid ), {
                      count:count,
                       products:cartProducts,
                       totalPrice:total,
                       uid
                    })
                   
                  }
                  // console.log('ss',wish)
                  getCartProducts( "Product Added Successfully")
                  addNotify()
        
                }
                window.addToCart=addToCart
                // addToWish()
                function addNotify(message){
                 //Screen notify after Add
                 Toastify({
                  text:message,
                  duration: 2000,
                  newWindow: true,
                  close: true,
                  gravity: "top", // `top` or `bottom`
                  position: "left", // `left`, `center` or `right`
                  stopOnFocus: true,
                  offset: {
                    // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                    y: 70 // vertical axis - can be a number or a string indicating unity. eg: '2em'
                  }, // Prevents dismissing of toast on hover
                  style: {
                    background: "linear-gradient(to right, #00b09b, #96c93d)",
                  },
                  onClick: function(){} // Callback after click
                }).showToast()
                }
            function getCartList() {
                let dbref = ref(db)
               return get(child(dbref, 'cartList/')).then((snapshot) => {
                    let wish = snapshot.val()      
                    // console.log(wish);
                    return wish
                })
            }
            getCartList()
        
          async  function getCartProducts(){
          cart = await getCartList();
          // console.log('ddd',cart)

          if(cart==null)
            {
              createCart()
              return
            }
          
        let isfound=false
            // console.log('aaaaaaaaaa')
            Object.keys(cart).forEach((key) => {
              if(key==uid)
                {
                  isfound=true
                  cartProduct=cart[key]
                  allCartProduct=cartProduct.products;
                  // console.log('aa',cartProduct.products )
                  document.getElementById('cart-num').innerText=allCartProduct.length-1;
                  document.getElementById('cart-num-mob').innerText=allCartProduct.length-1;
                  localStorage.setItem('cartNumber',allCartProduct.length-1)
                  return
                }
           })
           if(isfound==false)
            {
              createCart()
              allCartProduct=[]
            }
          }
        
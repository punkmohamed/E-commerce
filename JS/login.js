//  import { getDatabase } from 'firebase/database';

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getDatabase,
    set,
    ref,get,child
  } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js"
import {
  getFirestore,
  setDoc,
  getDoc,
  deleteDoc,
  doc,
  collection,
  query,
  where,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  getAuth,signInWithEmailAndPassword,updateProfile,sendEmailVerification,onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// import { getAuth } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js'

//toglemenu
function toggleMenu() {
  var menuContainer = document.querySelector('.menu-container');
  menuContainer.classList.toggle('open');
}
window.toggleMenu = toggleMenu;

const firebaseConfig = {
  apiKey: "AIzaSyAj8AGN1JFHtUT5jcT0RMyMizoljeJxHmA",
  authDomain: "e-commerce-e12d9.firebaseapp.com",
  projectId: "e-commerce-e12d9",
  storageBucket: "e-commerce-e12d9.appspot.com",
  messagingSenderId: "133384343005",
  appId: "1:133384343005:web:faee912204819bf36a7a34",
};
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const data = getFirestore(app);
const auth = getAuth(app);
const dbRef=ref(db);

let email = document.getElementById("email");
let password = document.getElementById("password");
//authencation in firebase login

let loginUser = evt => {
console.log( email.value, password.value)
evt.preventDefault();
if(validateInput(email)&&validateInput(password))
  document.getElementById('loading').style.display='flex'
{
    console.log('corrrext')
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log( userCredential.user.uid)
      console.log("user",auth.currentUser);
      getDoc(doc(data,"UserAuthList",`${userCredential.user.uid}`))
      .then((snapshot)=>{
        sessionStorage.setItem('user-creds',JSON.stringify(userCredential.user))
        sessionStorage.setItem('user-info',JSON.stringify({
          name:userCredential.user.displayName
        }))
      
      })
      setTimeout(()=>{
        window.location.href='./Pages/home.html'
      },1000)
      sendEmailVerification(auth.currentUser).catch((err) =>
        console.log(err)
      );

      // document.getElementById('btn').innerHTML=`Login`
      document.getElementById('loading').style.display='none'


      // ...
    }).catch((error) => {
      console.log(error);
      // document.getElementById('btn').innerHTML=`Login`
      document.getElementById('loading').style.display='none'

      document.getElementById('err').innerHTML="Invalid Email or Password";
      document.getElementById('err').style.display='block'
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
};
}

// ^events
regForm.addEventListener("submit", loginUser);
onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log('sss',uid)
      console.log('sss',user.displayName)
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

function validateInput(element) {
    // password must begain with capital litter and contain number
    console.log(element.nextElementSibling)
   
    var regix = {
      email: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
      password: /^[0-9]{6,}$/, 
    };
  
    if (regix[element.id]?.test(element.value) == true) {
        valid(element)
        return true;
    } else {
        invalid(element)
        return false;
    }
  }

window.validateInput=validateInput;

   function valid(element){
      element.classList.add("is-valid");
      element.classList.remove("is-invalid");
      element.nextElementSibling.style.display="none"; 
      return true;
  }

  function invalid(element){
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    element.nextElementSibling.style.display="block";  
    return false;
  }

  function clearValidatClass(element){
    if(element.value=='')
        {
            element.classList.remove("is-valid");
            element.classList.remove("is-invalid");
            element.nextElementSibling.style.display="none";  
             document.getElementById('err').style.display='none'
            document.getElementById('err').innerHTML=''
        }
  }
  window.clearValidatClass=clearValidatClass;

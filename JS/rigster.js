//  import { getDatabase } from 'firebase/database';

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  set,
  ref,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
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
  getAuth,createUserWithEmailAndPassword,updateProfile,sendEmailVerification
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

// import { getAuth } from 'https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js'


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

let userName= document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let rePass = document.getElementById("rePass");
let regForm = document.getElementById("regForm");
//authencation in firebase login

let registerUser = evt => {
//   console.log(evt)
// document.getElementById('btn').innerHTML=`<i class="fas fa-spin fa-spinner"></i>`

console.log( email.value, password.value)
evt.preventDefault();
if(validateInput(userName)&&validateInput(email)&&validateInput(password)&&validateInput(rePass))
  {
  document.getElementById('loading').style.display='flex'
    console.log('corrrext')
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      console.log("user",auth.currentUser);
      sendEmailVerification(auth.currentUser).catch((err) =>
        console.log(err)
      );
      updateProfile(auth.currentUser, { displayName: userName.value,phoneNumber:'0102022556' }).catch(
        (err) => console.log(err))

        setDoc(doc(data,"UserAuthList",`${userCredential.user.uid}`),{
          name:userName.value
         }) 
         swal("Good job!", " You RegisterSuccessfuly!", "success");
         setTimeout(()=>{
           window.location.href='../index.html'
         },2000)
      // ...
      // document.getElementById('btn').innerHTML=`Register`
      document.getElementById('loading').style.display='none'

    }).catch((error) => {
      console.log(error);
      document.getElementById('err').innerHTML="Email Already exist";
      document.getElementById('err').style.display='block'
      document.getElementById('loading').style.display='none'

      // document.getElementById('btn').innerHTML=`Register`
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });

};
}

regForm.addEventListener("submit", registerUser);



  console.log(document.querySelectorAll('form input'))

  let inputs=document.querySelectorAll('form input')

//   for(let i=0;i<inputs.length;i++)
//     {
//         inputs[i].addEventListener('input',(e)=>validateInput(e.targrt))
//     }

function validateInput(element) {
    // password must begain with capital litter and contain number
    console.log(element.nextElementSibling)
   
    var regix = {
      signInEmail: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
      signInPass: /^[0-9]{6,}$/,
      name: /^([a-zA-Z]{1,10})?(\s{1,})?([a-zA-Z]{1,10})?(\s{1,})?([a-z]{1,10})?$/,
      email: /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/,
      password: /[0-9]{6,}$/,
      rePass: /^(?=.*?[a-z])?(?=.*?[A-Z])(?=.*?[0-9]).{2,}$/,
    };
    if(element.id=='rePass'){
        console.log(password.value==element.value)
        console.log(password.value)
        if(password.value==element.value)
            {
                valid(element)
                return true;

            }else{
                invalid(element)
                return false;

            } 
        
    }
    if (regix[element.id].test(element.value) == true) {
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

  function toggleMenu() {
    var menuContainer = document.querySelector('.menu-container');
    menuContainer.classList.toggle('open');
  }
  window.toggleMenu = toggleMenu;

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  getDatabase,
  set,
  ref,get
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
  getAuth,
  createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";


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

setDoc(doc(data, "collectionName", "889"), {
  text: "it is work too",
});

let allUsers = [];

function generateToken(length) {
  //edit the token allowed characters
  var a =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
  var b = [];
  for (var i = 0; i < length; i++) {
    var j = (Math.random() * (a.length - 1)).toFixed(0);
    b[i] = a[j];
  }
  return b.join("");
}

document.getElementById("btn").addEventListener("click", function () {
  let name = document.getElementById("inpN").value;
  let password = document.getElementById("inpP").value;
  let email = document.getElementById("inpE").value;
  let id = Math.ceil(Math.random(10) * 100000);
  let token = generateToken(32);
  allUsers.push({
    id,
    name,
    password,
    email,
    token,
  });
  console.log(allUsers);
  setDoc(doc(data, "collectionName", "users"), {
    allUsers,
  });
  displayUsers(allUsers);
});

await getDoc(doc(data, "collectionName", "users")).then((e) => {
  console.log(e.data());
  swal({
    title: "Good job!",
    text: e.data().allUsers[0].name + " You clicked the button!",
    icon: "success",
    button: "Aww yiss!",
  });
  allUsers = e.data().allUsers;
  displayUsers(e.data().allUsers);
});

function displayUsers(users) {
  document.getElementById("cont").innerHTML = ``;
  users.forEach((user) => {
    document.getElementById("cont").innerHTML += `
        <p>${user.name}</p>
        <p>${user.password}</p>
        <p>${user.email}</p>
        `;
  });
}




let userName= document.getElementById("name");
let email = document.getElementById("email");
let password = document.getElementById("password");
let rePass = document.getElementById("rePass");

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
                element.classList.remove("is-invalid");
                element.nextElementSibling.style.visbility="none"; 
                element.nextElementSibling.style.color="red"; 
                console.log('teuee')

            }else{
                invalid(element)
                console.log('flass')
                element.nextElementSibling.style.color="black"; 
                element.nextElementSibling.style.display="block"; 

            }
            return 
        
    }
    if (regix[element.id].test(element.value) == true) {
        valid(element)
    } else {
        invalid(element)
    }
  }

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
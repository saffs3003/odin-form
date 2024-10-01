const fname = document.querySelector("#f-name");
const lname = document.querySelector("#l-name");
const mail = document.querySelector("#mail");
const phone = document.querySelector("#phone");
const pass = document.querySelector('#user-password');
const confirmPass = document.querySelector('#user-password-confirm');
const errors = document.querySelectorAll('.error');

const mode = document.querySelector('.mode')
const themeContainer = document.querySelector('#themeContainer')

function modeSelector(mode) {
 
  if (mode.classList.contains('toggler')) {
 
    mode.classList.remove('toggler');
    document.body.classList.remove('dark-mode'); 
       document.body.classList.add('light-mode');
       themeContainer.classList.remove('dark-mode');
       themeContainer.classList.add('light-mode');
     

       
    console.log('Switched to Light Mode.');
  } else {
 
    mode.classList.add('toggler');
    document.body.classList.remove('light-mode'); 
       document.body.classList.add('dark-mode');   
    themeContainer.classList.add('dark-mode')    
    console.log('Switched to Dark Mode.');
  }
}


document.querySelector('.mode').addEventListener('click', function() {
  modeSelector(this);
});



// Show error message
function showError(input, message) {
     input.classList.add('error-border');

    const errorDiv = input.previousElementSibling;
    errorDiv.textContent = message;
    errorDiv.style.cssText = "font-size: 15px; color: red;"; 

     input.style.border = "2px solid red"; 
     
           errorDiv.classList.add('active');
}

// Clear error message
function clearError(input) {
    const errorDiv = input.previousElementSibling;
    errorDiv.textContent = '';
     input.classList.remove('error-border');
      input.style.border = "none"; 
     input.style.borderBottom = "1px solid rgb(0, 0, 0, 0.4)";


     

     
}

function validateEmpty(name) { 
     if (name.value.trim() == '') {
          showError(name, 'Please fill out this form')
          return false
     }
     else { 
          clearError(name)
          return true;
     }
}

// Validate email format
function validateEmail(input) {
     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (validateEmpty(input)) {
          if (!emailPattern.test(input.value.trim())) {
               showError(input, "Please enter a valid email address.");
               return false;
          } else {
               clearError(input);
               return true;
          }
     }
}

// Validate phone number (only digits)
function validatePhone(input) {
     const phonePattern = /^[0-9]{10}$/; // Allow exactly 10 digits
  
          if (!phonePattern.test(input.value.trim())) {
               showError(input, "Please enter a valid phone number.");
               return false;
          } else {
               clearError(input);
               return true;
          }
     
}

// Validate password length
function validatePassword(input) {
     if (validateEmpty(input)) {
          if (input.value.length < 8) {
               showError(input, "Password must be at least 8 characters long.");
               return false;
          } else {
               clearError(input);
               return true;
          }
     }
}

// Validate password confirmation
function validateConfirmPassword(input) {
     if (validateEmpty(input)) {
          if (input.value !== pass.value) {
               showError(input, "Passwords do not match.");
               return false;
          } else {
               clearError(input);
               return true;
          }
     }
}


fname.addEventListener('blur', () => validateEmpty(fname));
lname.addEventListener('blur', () => validateEmpty(lname));
mail.addEventListener('blur', () => validateEmail(mail));
phone.addEventListener('blur', () => validatePhone(phone));
pass.addEventListener('blur', () => validatePassword(pass));
confirmPass.addEventListener('blur', () => validateConfirmPassword(confirmPass));

const form = document.querySelector('form');
form.addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting to validate it first
    
    const isFnameValid = validateName(fname);
    const isLnameValid = validateName(lname);
    const isEmailValid = validateEmail(mail);
    const isPhoneValid = validatePhone(phone);
    const isPasswordValid = validatePassword(pass);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPass);

    // Check if all validations passed before submitting the form
    if (isFnameValid && isLnameValid && isEmailValid && isPhoneValid && isPasswordValid && isConfirmPasswordValid) {
        form.submit(); // Submit the form if all validations pass
    }
});
function setInitialMode() {
  const isDarkMode = document.body.classList.contains('dark-mode');
  if (isDarkMode) {
    mode.classList.add('toggler');
    themeContainer.classList.add('dark-mode');
    console.log('Dark mode is active on load.');
  } else {
    mode.classList.remove('toggler');
    themeContainer.classList.remove('dark-mode');
    console.log('Light mode is active on load.');
  }
}

// Call the function on load
setInitialMode();
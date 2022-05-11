let referralFormButton = document.getElementById("referralSignUpButton");
let firstNameInput = document.getElementById("firstNameInput");
let lastNameInput = document.getElementById("lastNameInput");
let emailInput = document.getElementById("emailInput");
let referralCodeInput = document.getElementById("referralCodeInput");






//function to submit form and redirect to the thank you page
function referralRedirect (event) {
    event.preventDefault();
   // window.location.href = "../thank-you.html";
   let userId = emailInput.value;
   let accountId = emailInput.value;
    console.log(userId, accountId)
    console.log(tenantAlias)


}


//event listener on the referral form to call redirect function
referralFormButton.addEventListener("click", referralRedirect);
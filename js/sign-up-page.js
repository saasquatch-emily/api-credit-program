const jsonWebToken = require('jsonwebtoken')

// calling squatch.js when ready
window.squatch.ready(function(){

    //grabbing id for the button on the referral form - used to add an event listener to the button for submitting info
    let referralFormButton = document.getElementById("referralSignUpButton");

    squatch.ready(function(){

        //tenant id for my test tenant
        squatch.init({
          tenantAlias: 'test_au94wd5r8zree'
        });

        //ids for referral form 

    
    let firstNameInput = document.getElementById("firstNameInput");
    let lastNameInput = document.getElementById("lastNameInput");
    let emailInput = document.getElementById("emailInput");

    let payload = {
      id: emailInput.value,                      
      accountId: emailInput.value,       
      email: emailInput.value,                
      firstName: firstNameInput.value,       
      lastName: lastNameInput.value,
      locale: 'en_US',
    }

    let secret = 'secret'

    let jwt = jsonWebToken.sign(payload, secret);


        //autofill function to grab user's referral code cookie

        let referralCodeInput = document.getElementById("referralCodeInput");
          
        squatch.api().squatchReferralCookie().then(function(response) {
              referralCodeInput.value = response.codes["classic"];
            });

        //object containing the init parameters for squatch.js pulled from docs
        let initObj = {
      
          //user object for upsert, params grabbed from referral form
          user: {                               
            id: emailInput.value,                      
            accountId: emailInput.value,       
            email: emailInput.value,                
            firstName: firstNameInput.value,       
            lastName: lastNameInput.value,
            locale: 'en_US',
          }
        };
      
        squatch.api().upsertUser(initObj).then(function(response) {
          user = response.user;
        }).catch(function(error){
          console.log(error);
        });
      });


//function to submit form and redirect to the thank you page
function referralRedirect (event) {
    event.preventDefault();
    window.location.href = "../thank-you.html";
}



//event listener on the referral form to call redirect function
referralFormButton.addEventListener("click", referralRedirect);

});



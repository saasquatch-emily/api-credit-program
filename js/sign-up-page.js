// calling squatch.js when ready
window.squatch.ready(function(){

    //grabbing id for the button on the referral form - used to add an event listener to the button for submitting info
    let referralFormButton = document.getElementById("referralSignUpButton");

    squatch.ready(function(){

        //tenant id for my test tenant
        squatch.init({
          tenantAlias: 'test_au94wd5r8zree'
        });

        squatch.api().squatchReferralCookie().then(function(response) {
          referralCodeInput.value = response.codes["classic"];
        });

        //ids for referral form 

    
    let firstNameInput = document.getElementById("firstNameInput");
    let lastNameInput = document.getElementById("lastNameInput");
    let emailInput = document.getElementById("emailInput");


        function jwtCreate() {

          let jwtHeader = {
            "alg": "HS256",
            "typ": "JWT"
          };

          let payload = {
            id: emailInput.value,                      
            accountId: emailInput.value,       
            email: emailInput.value,                
            firstName: firstNameInput.value,       
            lastName: lastNameInput.value,
            locale: 'en_US',
          };

          let secret = 'secret';


          function base64encrypt(source) {

            //encode in classical base64
            //encoding/signing function adapted from Alex's implementations.html
            encodedSource = CryptoJS.enc.Base64.stringify(source);

            encodedSource = encodedSource.replace(/=+$/, '');

            encodedSource = encodedSource.replace(/\+/g, '-');
            encodedSource = encodedSource.replace(/\//g, '_');

            return encodedSource;
          }

          let headerString = CryptoJS.enc.Utf8.parse(JSON.stringify(jwtHeader));
          let headerEncoded = base64encrypt(headerString);

          let payloadString = CryptoJS.enc.Utf8.parse(JSON.stringify(payload));
          let encodedPayload = base64encrypt(payloadString);

          let signature = headerEncoded + "." + encodedPayload;
          signature = CryptoJS.HmacSHA256(signature, secret);
          signature = base64encrypt(signature);

          let finalToken = headerEncoded + "." + encodedPayload + "." + signature;
          return finalToken;
        }

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
          },
          jwt: jwtCreate()
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
    window.location.href = "api-credit-program/thank-you.html";
}



//event listener on the referral form to call redirect function
referralFormButton.addEventListener("click", referralRedirect);

});







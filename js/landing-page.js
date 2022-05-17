let signUp = document.getElementById("sign-up")


function signUpRedirect (event) {
    event.preventDefault();
    window.location.href = "./sign-up-page.html";
}


signUp.addEventListener("click", signUpRedirect);
const btnSignIn = document.getElementById('Sign-IN');  // Cambié 'Sign-Up' a 'Sign-IN' si estás tratando de seleccionar el botón de inicio de sesión.
const btnSignUp = document.getElementById('Sign-Up');
const formRegister = document.querySelector(".register");
const formLogin = document.querySelector(".login");

btnSignIn.addEventListener("click", e => {
    formRegister.classList.add("hide");
    formLogin.classList.remove("hide");
});

btnSignUp.addEventListener("click", e => {
    formLogin.classList.add("hide");
    formRegister.classList.remove("hide");
});


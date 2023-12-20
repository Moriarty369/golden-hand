function validarNombreUsuario(nombre) {
    const longitudMinima = 6;
    const longitudMaxima = 20;
    const expresionRegular = /^[A-Z][a-zA-Z]*(?:\s[A-Z][a-zA-Z]*)+$/; // Solo permite letras y espacios

    let resultado = "";

    if (nombre.length < longitudMinima || nombre.length > longitudMaxima) {
        resultado = "Debe poner nombre, apellido con la primera letra de cada palabra en mayuscula.";
    } else if (!expresionRegular.test(nombre)) {
        resultado = "El nombre solo puede contener letras y espacios.";
    } else {
        resultado = "";
    }

    document.getElementById("resultadoValidacion").innerText = resultado;
}

function validarCorreoElectronico(correo) {
    const expresionRegular2 = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // Expresión regular para validar correos electrónicos

    let resultado2 = "";

    if (!expresionRegular2.test(correo)) {
        resultado2 = "Por favor, introduce un correo electrónico válido.";
    } else {
        resultado2 = "";
    }

    document.getElementById("resultadoValidacion2").innerText = resultado2;
}

function validarContraseña(contraseña) {
    // Expresión regular para validar la contraseña Requisitos: Al menos una letra mayúscula, una letra minúscula, un número y un símbolo especial Longitud mínima de 8 caracteres
    const expresionRegular3 = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&,.;])[A-Za-z\d@$!%?&,.;]{8,}$/;
    ;

    let resultado3 = "";

    if (!expresionRegular3.test(contraseña)) {
        resultado3 = "Debe contener: Una letra minuscula, Una letra mayuscula, Un numero, Un simbolo especial y al menos 8 caracteres" ;

    } else {
        resultado3 = "";
    }

    document.getElementById("resultadoValidacion3").innerText = resultado3;
}

function validarCorreoElectronico2(correo) {
    const expresionRegular4 = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // Expresión regular para validar correos electrónicos

    let resultado4 = "";

    if (!expresionRegular4.test(correo)) {
        resultado4 = "Por favor, introduce un correo electrónico válido.";
    } else {
        resultado4 = "";
    }

    document.getElementById("resultadoValidacion4").innerText = resultado4;
}

function validarContraseña2(contraseña) {
    // Expresión regular para validar la contraseña Requisitos: Al menos una letra mayúscula, una letra minúscula, un número y un símbolo especial Longitud mínima de 8 caracteres
    const expresionRegular5 = /^(?=.[a-z])(?=.[A-Z])(?=.\d)(?=.[@$!%?&,.;])[A-Za-z\d@$!%?&,.;]{8,}$/;

    let resultado5 = "";

    if (!expresionRegular5.test(contraseña)) {
        resultado5 = "Debe contener: Una letra minuscula, Una letra mayuscula, Un numero, Un simbolo especial y al menos 8 caracteres";
    } else {
        resultado5 = "";
    }

    document.getElementById("resultadoValidacion5").innerText = resultado5;
}

function validarEmail(){
    let emailContact = document.querySelector("#emailContact")
    let errorContact = document.querySelector("#errorCorreo")
    let expresionCorreo = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  
    if (expresionCorreo.test(emailContact.value)){
      errorContact.textContent = "";
    }else {
      errorContact.textContent = "Por favor, introduce un correo electrónico válido."
    }
  }

  function ValidarNombre(){
    let nombreContacto = document.querySelector("#nombreContact")
    let ErrorNombreContact = document.querySelector("#errorNombreContacto")
    let expresionNombre = /^[A-Z][a-zA-Z]*(?:\s[A-Z][a-zA-Z]*)+$/
    const longitudMinima = 6;
    const longitudMaxima = 20;

    if (nombreContacto.length < longitudMinima || nombreContacto.length > longitudMaxima) {
        ErrorNombreContact.textContent = "Debe poner nombre, apellido con la primera letra de cada palabra en mayuscula.";
    } else if (!expresionNombre.test(nombreContacto.value)) {
        ErrorNombreContact.textContent = "El nombre solo puede contener letras y espacios.";
    } else {
        ErrorNombreContact.textContent = "";
    }
  }
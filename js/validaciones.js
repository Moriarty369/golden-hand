///AQUI ESTAN LAS VALIDACIONES PARA CREAR UNA CUENTA
function validarNombreUsuario(nombre) {
    const longitudMinima = 6;
    const longitudMaxima = 20;
    const expresionRegular = /^[A-Z][a-zA-Z]*(?:\s[A-Z][a-zA-Z]*)+$/;

    if (nombre.length < longitudMinima || nombre.length > longitudMaxima) {
        document.getElementById("resultadoValidacion").innerText = "Debe tener entre 6 y 20 carácteres";
        return false;
    } else if (!expresionRegular.test(nombre)) {
        document.getElementById("resultadoValidacion").innerText = "Debe poner nombre, apellido con la primera letra de cada palabra en mayúscula y no puede contener caracteres especiales";
        return false;
    } else {
        document.getElementById("resultadoValidacion").innerText = "";
        return true;
    }
}

function validarCorreoElectronico(correo) {
    const expresionRegular2 = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // Expresión regular para validar correos electrónicos

    if (!expresionRegular2.test(correo)) {
        document.getElementById("resultadoValidacion2").innerText = "Por favor, introduce un correo electrónico válido.";
        return false;
    } else {
        document.getElementById("resultadoValidacion2").innerText = "";
        return true;
    }

}

function validarContraseña(contraseña) {
    // Expresión regular para validar la contraseña Requisitos: Al menos una letra mayúscula, una letra minúscula, un número y un símbolo especial Longitud mínima de 8 caracteres
    const expresionRegular3 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&,.;])[A-Za-z\d@$!%*?&,.;]{8,}$/;
    ;

    if (!expresionRegular3.test(contraseña)) {
        document.getElementById("resultadoValidacion3").innerText = "Debe contener: Una letra minuscula, Una letra mayuscula, Un numero, Un simbolo especial y al menos 8 caracteres" ;
        return false;
    } else {
        document.getElementById("resultadoValidacion3").innerText = "";
        return true;
    }
}

document.getElementById('tuFormulario').addEventListener('submit', function(event) {
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('email').value;
    const contraseña = document.getElementById('contraseña').value;

    const esNombreValido = validarNombreUsuario(nombre);
    const esCorreoValido = validarCorreoElectronico(correo);
    const esContraseñaValida = validarContraseña(contraseña);

    if (!esNombreValido || !esCorreoValido || !esContraseñaValida) {
        event.preventDefault(); // Previene el envío del formulario
    }
});








/// AQUI ESTA EL CODIGO PARA INICIAR SESION
function validarCorreoElectronico2(correo2) {
    const expresionRegular4 = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; // Expresión regular para validar correos electrónicos

    if (!expresionRegular4.test(correo2)) {
        document.getElementById("resultadoValidacion4").innerText = "Por favor, introduce un correo electrónico válido.";
        return false;
    } else {
        document.getElementById("resultadoValidacion4").innerText = "";
        return true;
    }

}

function validarContraseña2(contraseña2) {
    // Expresión regular para validar la contraseña Requisitos: Al menos una letra mayúscula, una letra minúscula, un número y un símbolo especial Longitud mínima de 8 caracteres
    const expresionRegular5 = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&,.;])[A-Za-z\d@$!%*?&,.;]{8,}$/;
    ;

    if (!expresionRegular5.test(contraseña2)) {
        document.getElementById("resultadoValidacion5").innerText = "Debe contener: Una letra minuscula, Una letra mayuscula, Un numero, Un simbolo especial y al menos 8 caracteres" ;
        return false;
    } else {
        document.getElementById("resultadoValidacion5").innerText = "";
        return true;
    }
}

document.getElementById('tuFormulario2').addEventListener('submit', function(event) {
    const correo2 = document.getElementById('email2').value;
    const contraseña2 = document.getElementById('contraseña2').value;

    const esCorreoValido2 = validarCorreoElectronico2(correo2);
    const esContraseñaValida2 = validarContraseña2(contraseña2);

    if (!esCorreoValido2 || !esContraseñaValida2) {
        event.preventDefault(); // Previene el envío del formulario
    }
});


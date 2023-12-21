function generarCaptcha() {
    var captcha = '';
    var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < 6; i++) {
        captcha += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }

    document.getElementById('textoCaptcha').innerText = captcha; // Actualizar el elemento correcto

    document.getElementById('demo-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Evita el envío automático del formulario
    
        const captchaIngresado = document.getElementById('captchaInput').value;
        const captchaMostrado = document.getElementById('textoCaptcha').innerText;
    
        if (captchaIngresado === captchaMostrado) {
            mensajeResultado.textContent = "";
            return true
        } else {
            mensajeResultado.textContent = "Captcha incorrecto. Por favor, inténtalo de nuevo.";
            return false
        }
    });
    
}

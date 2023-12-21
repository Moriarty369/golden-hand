<?php
    session_start();
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Verifica el captcha
        $userInput = $_POST["captchaInput"];
        $expectedResult = $_SESSION["captchaResult"];
        if ($userInput == $expectedResult) {
            // Captcha válido, procesa el formulario
            // ...
        } else {
            // Captcha inválido, muestra un mensaje de error
            echo "Captcha incorrecto";
        }
    }
?>
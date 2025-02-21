//Funcion para deshabilitar el boton de recuperar contraseña
function deshabilitarBoton() {
    let boton = document.querySelector(".BotonVerificar");
    let mensaje = document.querySelector(".Contrasena");

    boton.disabled = true; // Deshabilita el botón
    mensaje.textContent = "Tu contraseña es: 123456"; // Muestra la contraseña
}



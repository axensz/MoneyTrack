//Funcion para deshabilitar el boton de recuperar contraseña
function deshabilitarBoton() {
    let boton = document.getElementById("miBoton");
    let mensaje = document.getElementById("mensaje");

    boton.disabled = true; // Deshabilita el botón
    mensaje.textContent = "El botón ha sido deshabilitado."; // Muestra el mensaje
}


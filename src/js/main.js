//Funcion para deshabilitar el boton de recuperar contraseña
function deshabilitarBoton() {
    let boton = document.querySelector(".BotonVerificar");
    let mensaje = document.querySelector(".Contrasena");

    boton.disabled = true; // Deshabilita el botón
    mensaje.textContent = "Tu contraseña es: 123456"; // Muestra la contraseña
}


//Funcion para Crear Cuenta Bancaria
function toggleColorPicker(event) {
    event.stopPropagation(); // Evita que el evento se propague al body
    let picker = document.getElementById("colorPicker");

    // Verificar el estado actual y alternarlo
    if (picker.style.display === "block") {
        picker.style.display = "none";
    } else {
        picker.style.display = "block";
    }
}

// Función para seleccionar un color y aplicarlo al preview
function selectColor(color) {
    let preview = document.getElementById("colorPreview");
    preview.style.backgroundColor = color;

    // Ocultar el selector de colores
    document.getElementById("colorPicker").style.display = "none";
}

// Cerrar el selector de colores si el usuario hace clic fuera de él
document.body.addEventListener("click", function () {
    document.getElementById("colorPicker").style.display = "none";
});




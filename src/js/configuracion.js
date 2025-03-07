document.addEventListener("DOMContentLoaded", function () {
    // Obtener datos del usuario desde localStorage
    const usuario = JSON.parse(localStorage.getItem("userData"));

    if (usuario) {
        // Asignar los valores a los campos de la configuración
        document.getElementById("username").value = usuario.username;
        document.getElementById("userEmail").value = usuario.email;
    } else {
        console.warn("No se encontró usuario en localStorage");
        window.location.href = "login.html"; // Redirigir si no hay usuario
    }
});

// Función para habilitar y deshabilitar edición de contraseña
document.getElementById("togglePassword").addEventListener("click", function () {
    const newPassword = document.getElementById("newPassword");
    const repeatPassword = document.getElementById("repeatPassword");
    const saveChanges = document.getElementById("saveChanges");

    const isEditing = !newPassword.disabled;

    if (isEditing) {
        // Si cancela, limpiar los campos
        newPassword.value = "";
        repeatPassword.value = "";
        saveChanges.classList.remove("enabled");
        saveChanges.disabled = true;
    }

    // Alternar habilitación de los campos
    newPassword.disabled = isEditing;
    repeatPassword.disabled = isEditing;

    // Cambiar el texto del botón
    this.textContent = isEditing ? "Editar" : "Cancelar";
});

// Función para validar y activar botón de guardar cambios
function checkPasswords() {
    const newPassword = document.getElementById("newPassword").value;
    const repeatPassword = document.getElementById("repeatPassword").value;
    const saveChanges = document.getElementById("saveChanges");

    if (newPassword !== "" && newPassword === repeatPassword) {
        saveChanges.classList.add("enabled");
        saveChanges.disabled = false;
    } else {
        saveChanges.classList.remove("enabled");
        saveChanges.disabled = true;
    }
}

document.getElementById("newPassword").addEventListener("input", checkPasswords);
document.getElementById("repeatPassword").addEventListener("input", checkPasswords);


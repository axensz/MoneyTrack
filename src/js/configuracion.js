document.addEventListener("DOMContentLoaded", function () {
    // Obtener datos del usuario desde localStorage
    const usuario = JSON.parse(localStorage.getItem("userData"));

    if (usuario) {
        document.getElementById("username").value = usuario.username;
        document.getElementById("userEmail").value = usuario.email;
    } else {
        console.warn("No se encontró usuario en localStorage");
        window.location.href = "login.html"; // Redirigir si no hay usuario
    }
});

// Elementos del DOM
const newPassword = document.getElementById("newPassword");
const repeatPassword = document.getElementById("repeatPassword");
const togglePassword = document.getElementById("togglePassword");
const saveChanges = document.getElementById("saveChanges");
const errorMessage = document.getElementById("passwordError");
const successMessage = document.getElementById("successMessage"); // Mover aquí

// Alternar edición de contraseña
togglePassword.addEventListener("click", function () {
    const isEditing = !newPassword.disabled;

    if (isEditing) {
        // Restablecer campos si se cancela
        newPassword.value = "";
        repeatPassword.value = "";
        errorMessage.textContent = "";
        saveChanges.disabled = true;
        saveChanges.classList.remove("enabled"); // Remover clase de botón activo
    }

    // Habilitar/deshabilitar inputs
    newPassword.disabled = isEditing;
    repeatPassword.disabled = isEditing;
    saveChanges.disabled = isEditing; // Solo habilitar si está en modo edición

    // Cambiar texto del botón
    togglePassword.textContent = isEditing ? "Editar Contraseña" : "Cancelar";
});

// Validar contraseñas y activar botón
function checkPasswords() {
    if (newPassword.disabled) return; // No validar si los inputs están deshabilitados

    const pass1 = newPassword.value.trim();
    const pass2 = repeatPassword.value.trim();

    if (pass1.length < 6) {
        errorMessage.textContent = "La contraseña debe tener al menos 6 caracteres.";
        saveChanges.disabled = true;
        saveChanges.classList.remove("enabled");
        return;
    }

    if (pass1 !== pass2) {
        errorMessage.textContent = "Las contraseñas no coinciden.";
        saveChanges.disabled = true;
        saveChanges.classList.remove("enabled");
        return;
    }

    // Habilitar el botón si todo es correcto
    errorMessage.textContent = "";
    saveChanges.disabled = false;
    saveChanges.classList.add("enabled"); // Agregar clase de botón activo
}

// Eventos para validar contraseñas
newPassword.addEventListener("input", checkPasswords);
repeatPassword.addEventListener("input", checkPasswords);

// Guardar la nueva contraseña
saveChanges.addEventListener("click", function (e) {
    e.preventDefault();

    if (saveChanges.disabled) return; // Evitar cambios si el botón está deshabilitado

    let usuario = JSON.parse(localStorage.getItem("userData"));
    usuario.password = newPassword.value.trim();
    localStorage.setItem("userData", JSON.stringify(usuario));

    // Mostrar mensaje de éxito
    successMessage.classList.add("show");

    // Ocultar el mensaje después de 3 segundos
    setTimeout(() => {
        successMessage.classList.remove("show");
    }, 3000);

    // Resetear estado
    togglePassword.click(); // Simular clic para desactivar edición
});

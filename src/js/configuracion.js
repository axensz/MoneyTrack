document.addEventListener("DOMContentLoaded", function() {
    const togglePassword = document.getElementById("togglePassword");
    const newPassword = document.getElementById("newPassword");
    const repeatPassword = document.getElementById("repeatPassword");
    const saveChanges = document.getElementById("saveChanges");

    togglePassword.addEventListener("click", function() {
        const isEditing = !newPassword.disabled; // Verifica si está en modo edición

        if (isEditing) {
            // Si está en edición y se presiona cancelar, limpiar los campos
            newPassword.value = "";
            repeatPassword.value = "";
            saveChanges.classList.remove("enabled");
            saveChanges.disabled = true;
        }

        // Habilita o deshabilita los campos
        newPassword.disabled = isEditing;
        repeatPassword.disabled = isEditing;

        // Cambia el texto del botón
        togglePassword.textContent = isEditing ? "Editar" : "Cancelar";
    });

    // Activa el botón de guardar si ambas contraseñas coinciden y no están vacías
    function checkPasswords() {
        if (newPassword.value !== "" && newPassword.value === repeatPassword.value) {
            saveChanges.classList.add("enabled");
            saveChanges.disabled = false;
        } else {
            saveChanges.classList.remove("enabled");
            saveChanges.disabled = true;
        }
    }

    newPassword.addEventListener("input", checkPasswords);
    repeatPassword.addEventListener("input", checkPasswords);
});


document.addEventListener("DOMContentLoaded", function () {
    // Verificar si el usuario está almacenado en localStorage
    const usuario = JSON.parse(localStorage.getItem("usuario"));

    if (usuario) {
        // Asignar los valores a los campos
        document.getElementById("username").value = usuario.nombre;
        document.getElementById("userEmail").value = usuario.email;
    } else {
        console.warn("No se encontró usuario en localStorage");
        window.location.href = "login.html"; // Redirige si no hay usuario
    }
});


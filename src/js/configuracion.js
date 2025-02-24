document.addEventListener("DOMContentLoaded", function() {
    const togglePassword = document.getElementById("togglePassword");
    const newPassword = document.getElementById("newPassword");
    const repeatPassword = document.getElementById("repeatPassword");
    const saveChanges = document.getElementById("saveChanges");

    togglePassword.addEventListener("click", function() {
        const isDisabled = newPassword.disabled;
        
        // Habilita o deshabilita los campos
        newPassword.disabled = !isDisabled;
        repeatPassword.disabled = !isDisabled;

        // Cambia el texto del botón
        togglePassword.textContent = isDisabled ? "Cancelar" : "Editar";

        // Reinicia los campos si se cancela la edición
        if (isDisabled) {
            newPassword.value = "";
            repeatPassword.value = "";
            saveChanges.classList.remove("enabled");
            saveChanges.disabled = true;
        }
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

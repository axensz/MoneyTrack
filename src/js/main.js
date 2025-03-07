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



// Función para registrar usuario
function register() {
    let user = document.getElementById("regUser").value.trim();
    let email = document.getElementById("regEmail").value.trim();
    let pass = document.getElementById("regPass").value;
    let question = document.getElementById("securityQuestion").value;
    let answer = document.getElementById("securityAnswer").value.trim();

    if (user === "" || email === "" || pass === "" || question === "" || answer === "") {
        alert("Todos los campos son obligatorios");
        return;
    }

    // Guardar en LocalStorage
    let userData = {
        username: user,
        email: email,
        password: pass,
        securityQuestion: question,
        securityAnswer: answer
    };

    localStorage.setItem("userData", JSON.stringify(userData));

    document.getElementById("registerMsg").textContent = "Registro exitoso. ¡Ahora inicia sesión!";
    setTimeout(() => window.location.href = "login.html", 2000);
}

// Función para iniciar sesión
function login() {
    let user = document.getElementById("loginUser").value.trim();
    let pass = document.getElementById("loginPass").value;

    let storedData = localStorage.getItem("userData");

    if (!storedData) {
        document.getElementById("loginError").textContent = "No hay usuarios registrados";
        return;
    }

    let userData = JSON.parse(storedData);

    if (user === userData.username && pass === userData.password) {
        localStorage.setItem("user", user);
        localStorage.setItem("loggedIn", true);
        window.location.href = "inicio.html";
    } else {
        document.getElementById("loginError").textContent = "Usuario o contraseña incorrectos";
    }
}




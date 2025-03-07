// Función para deshabilitar el botón de recuperación de contraseña
function deshabilitarBoton() {
    let boton = document.querySelector(".BotonVerificar");
    let mensaje = document.querySelector(".Contrasena");

    boton.disabled = true; // Deshabilita el botón
    mensaje.textContent = "Tu contraseña es: 123456"; // Muestra la contraseña (esto debe mejorarse para seguridad)
}

// Función para crear cuenta bancaria
document.getElementById("crearCuentaForm")?.addEventListener("submit", function (event) {
    event.preventDefault();

    let nombre = document.getElementById("nombreCuenta").value.trim();
    let saldo = parseFloat(document.getElementById("saldoInicial").value);
    let tipo = document.getElementById("tipoCuenta").value;
    let color = document.getElementById("colorCuenta").value;

    if (nombre === "" || isNaN(saldo) || saldo < 0 || tipo === "") {
        alert("Por favor, completa todos los campos correctamente.");
        return;
    }

    let cuentas = JSON.parse(localStorage.getItem("cuentas")) || [];

    if (cuentas.length >= 4) {
        alert("No puedes crear más de 4 cuentas.");
        return;
    }

    cuentas.push({ nombre, saldo, tipo, color });
    localStorage.setItem("cuentas", JSON.stringify(cuentas));

    alert("Cuenta creada con éxito.");
    window.location.href = "inicio.html";
});

// Función para cargar cuentas en inicio.html
function cargarCuentas() {
    let cuentas = JSON.parse(localStorage.getItem("cuentas")) || [];
    let contenedorCuentas = document.getElementById("cuentasContainer");
    let totalDinero = 0;

    if (!contenedorCuentas) return;

    // Limpiar contenido antes de agregar cuentas para evitar duplicaciones
    contenedorCuentas.innerHTML = "";

    if (cuentas.length === 0) {
        contenedorCuentas.innerHTML = "<p>No tienes cuentas creadas.</p>";
        return;
    }

    cuentas.slice(0, 4).forEach((cuenta) => {
        totalDinero += cuenta.saldo;

        let cuentaHTML = `
            <div class="grid-item" style="border-left: 5px solid ${cuenta.color};">
                <p class="item-title">${cuenta.nombre}</p>
                <p class="item-amount">$${cuenta.saldo.toFixed(2)}</p>
            </div>
        `;

        // Agregar la cuenta sin duplicaciones
        contenedorCuentas.insertAdjacentHTML("beforeend", cuentaHTML);
    });

    document.getElementById("totalDinero").textContent = `$${totalDinero.toFixed(2)}`;
}


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

// Función para cerrar sesión
function logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("loggedIn");
    window.location.href = "login.html";
}

// Cargar cuentas al inicio
document.addEventListener("DOMContentLoaded", function () {
    if (localStorage.getItem("loggedIn")) {
        cargarCuentas();
        let user = localStorage.getItem("user");
        if (user) {
            document.getElementById("welcomeUser").textContent = "Hola, " + user;
        }
    }
});

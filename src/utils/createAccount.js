    // transactions.js

    // Función para obtener cuentas desde localStorage
    export function obtenerCuentas() {
        return JSON.parse(localStorage.getItem("cuentas")) || [];
    }

    // Función para guardar cuentas en localStorage
    export function guardarCuentas(cuentas) {
        localStorage.setItem("cuentas", JSON.stringify(cuentas));
    }

    // Función para agregar una nueva cuenta
    export function agregarCuenta(nuevaCuenta) {
        let cuentas = obtenerCuentas();

        if (cuentas.length >= 4) {
            return { error: "No puedes crear más de 4 cuentas." };
        }

        if (cuentas.some(cuenta => cuenta.nombre.toLowerCase() === nuevaCuenta.nombre.toLowerCase())) {
            return { error: "Ya existe una cuenta con ese nombre." };
        }

        cuentas.push(nuevaCuenta);
        guardarCuentas(cuentas);
        return { success: "Cuenta creada con éxito." };
    }

    // Función para eliminar una cuenta por nombre
    export function eliminarCuenta(nombreCuenta) {
        let cuentas = obtenerCuentas().filter(cuenta => cuenta.nombre !== nombreCuenta);
        guardarCuentas(cuentas);
    }

    // Función para actualizar el saldo de una cuenta
    export function actualizarSaldo(nombreCuenta, nuevoSaldo) {
        let cuentas = obtenerCuentas().map(cuenta => 
            cuenta.nombre === nombreCuenta ? { ...cuenta, saldo: nuevoSaldo } : cuenta
        );
        guardarCuentas(cuentas);
    }

    // Función para calcular el total de dinero en todas las cuentas
    export function calcularTotalDinero() {
        return obtenerCuentas().reduce((total, cuenta) => total + cuenta.saldo, 0);
    }

    // Función para obtener los datos del gráfico
    export function obtenerDatosGrafico() {
        const cuentas = obtenerCuentas();
        return {
          nombres: cuentas.map(c => c.nombre),
          saldos: cuentas.map(c => c.saldo || 0),
          colores: cuentas.map(c => c.color)
        };
      }
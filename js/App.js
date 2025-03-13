function validarDatos(nombre, email, asistencia, anoNacimiento, profesion, dni) {
    if (!nombre || !email || !anoNacimiento || !profesion || !dni) {
        alert("Por favor, completa todos los campos obligatorios.");
        return false;
    }

    if (!asistencia) {
        alert("Por favor, selecciona si asistirás o no al evento.");
        return false;
    }

    dni = dni.trim(); 

    if (!/^\d{8}$/.test(dni)) {
        alert("El DNI ingresado no es válido. Debe ser un número de 8 dígitos.");
        return false;
    }

    return true;
}

function procesarDatos(nombre, email, asistencia, anoNacimiento, profesion, comentarios, dni) {
    return {
        nombre,
        email,
        asistencia: asistencia ? "Sí" : "No",
        anoNacimiento,
        profesion,
        comentarios: comentarios || "Ninguno",
        dni
    };
}

function mostrarResultado(datos) {
    console.log("Datos del formulario:", datos);
    alert(`Gracias por confirmar tu asistencia, ${datos.nombre}!\n\nAsistencia: ${datos.asistencia}\nAño de nacimiento: ${datos.anoNacimiento}\nProfesión: ${datos.profesion}\nComentarios: ${datos.comentarios}\nDNI: ${datos.dni}`);
}

function enviarFormulario() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const asistencia = document.querySelector('input[name="asistencia"]:checked');
    const anoNacimiento = document.getElementById('ano-nacimiento').value;
    const profesion = document.getElementById('profesion').value;
    const comentarios = document.getElementById('comentarios').value;


let dni = prompt("Por favor, ingresa tu DNI (8 dígitos):");

    if (validarDatos(nombre, email, asistencia.value, anoNacimiento, profesion, dni)) {
        const confirmacion = confirm(`¿Estás seguro de que deseas confirmar tu asistencia, ${nombre}?`);

        if (confirmacion) {
            const datos = procesarDatos(nombre, email, asistencia.value, anoNacimiento, profesion, comentarios, dni);
            mostrarResultado(datos);
        } else {
            alert("No se ha registrado tu asistencia.");
        }
    }
}

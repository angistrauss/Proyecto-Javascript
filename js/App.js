class Asistente {
    constructor(nombre, email, dni, anoNacimiento, profesion, asistencia, comentarios) {
        this.nombre = nombre;
        this.email = email;
        this.dni = dni;
        this.anoNacimiento = anoNacimiento;
        this.profesion = profesion;
        this.asistencia = asistencia;
        this.comentarios = comentarios || "Ninguno";
    }
}

const formulario = document.getElementById('formulario');
const dniInput = document.getElementById('dni');
const dniError = document.getElementById('dni-error');
const abrirBtn = document.getElementById('abrirDrawerAsistentes');
const cerrarBtn = document.getElementById('cerrarDrawerAsistentes');
const drawer = document.getElementById('drawerAsistentes');
const listaAsistentes = document.getElementById('lista-asistentes');
const modal = document.getElementById('modalConfirmacion');
const confirmarBorrado = document.getElementById('confirmarBorrado');
const cancelarBorrado = document.getElementById('cancelarBorrado');
const borrarBtn = document.getElementById('borrarRegistros');

let asistentes = JSON.parse(localStorage.getItem('asistentes')) || [];
    
    if (asistentes.length > 0) {
        abrirBtn.style.display = 'inline-block';
        renderizarAsistentes(asistentes);
    }

function guardarEnLocalStorage() {
    localStorage.setItem('asistentes', JSON.stringify(asistentes));
}

function renderizarAsistentes(lista) {
    listaAsistentes.innerHTML = '';

    if (lista.length === 0) {
        listaAsistentes.innerHTML = '<p>No hay inscripciones aún.</p>';
        return;
    }

    lista.forEach((asistente, index) => {
        const card = document.createElement('div');
        card.classList.add('card-asistente');
        card.innerHTML = `
            <p><strong>${index + 1}. ${asistente.nombre}</strong></p>
            <p>Email: ${asistente.email}</p>
            <p>DNI: ${asistente.dni}</p>
            <p>Año de nacimiento: ${asistente.anoNacimiento}</p>
            <p>Profesión: ${asistente.profesion}</p>
            <p>Asistencia: ${asistente.asistencia}</p>
            <p>Comentarios: ${asistente.comentarios}</p>
        `;
        listaAsistentes.appendChild(card);
    });
}

function validarFormulario(data) {
    const { nombre, email, dni, anoNacimiento, profesion, asistencia } = data;
    dniError.textContent = '';

    if (!nombre || !email || !dni || !anoNacimiento || !profesion || !asistencia) {
        mostrarMensaje("Por favor, completá todos los campos obligatorios.", "error");
        return false;
    }

    if (!/^\d{8}$/.test(dni.trim())) {
        dniError.textContent = "El DNI debe ser un número de 8 dígitos.";
        return false;
    }
    return true;
}

function mostrarMensaje(texto, tipo) {
    const mensaje = document.createElement('p');
    mensaje.textContent = texto;
    mensaje.className = tipo === 'error' ? 'mensaje error' : 'mensaje exito';
    formulario.after(mensaje);
    setTimeout(() => mensaje.remove(), 4000);
}

formulario.addEventListener('submit', (e) => {
    e.preventDefault();

    const nuevoAsistente = new Asistente(
        document.getElementById('nombre').value.trim(),
        document.getElementById('email').value.trim(),
        dniInput.value.trim(),
        document.getElementById('ano-nacimiento').value,
        document.getElementById('profesion').value,
        document.querySelector('input[name="asistencia"]:checked')?.value,
        document.getElementById('comentarios').value.trim()
    );

    if (validarFormulario(nuevoAsistente)) {
        asistentes.push(nuevoAsistente);
        guardarEnLocalStorage();
        renderizarAsistentes(asistentes);
        mostrarMensaje("¡Inscripción registrada con éxito!", "exito");
        formulario.reset();
    
        abrirBtn.style.display = 'inline-block';
        drawer.classList.add('open');
    }
});

abrirBtn.addEventListener('click', () => {
    drawer.classList.add('open');
});

    cerrarBtn.addEventListener('click', () => {
        drawer.classList.remove('open');
    });

borrarBtn.addEventListener('click', () => {
    modal.classList.add('activo');
});

confirmarBorrado.addEventListener('click', () => {
    asistentes = [];
    localStorage.removeItem('asistentes');
    renderizarAsistentes(asistentes);
    drawer.classList.remove('open');
    abrirBtn.style.display = 'none';
    mostrarMensaje("Todos los registros fueron eliminados.", "exito");
    modal.classList.remove('activo');
});

cancelarBorrado.addEventListener('click', () => {
    modal.classList.remove('activo');
});
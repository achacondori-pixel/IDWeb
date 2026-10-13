let tareas = [];
let filtro = 'todas';

const form = document.getElementById('form-tareas');
const alertas = document.getElementById('alertas');
const lista = document.getElementById('lista-tareas');

document.addEventListener('DOMContentLoaded', render);

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const tit = document.getElementById('titulo').value.trim();
    const cur = document.getElementById('curso').value.trim();
    const fec = document.getElementById('fecha').value;

    alertas.innerHTML = '';

    if (!tit || !cur || !fec) {
        alertas.innerHTML = '<div class="alert alert-danger p-2">Completa todos los campos</div>';
        return;
    }

    const hoy = new Date().toISOString().split('T')[0];
    if (fec <= hoy) {
        alertas.innerHTML = '<div class="alert alert-danger p-2">La fecha debe ser mayor a hoy</div>';
        return;
    }

    tareas.push({
        id: Date.now(),
        titulo: tit,
        curso: cur,
        fechaEntrega: fec,
        completada: false
    });

    render();
    form.reset();
});

function render() {
}

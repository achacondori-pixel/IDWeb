let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
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

    guardar(); 
    render();
    form.reset();
});

function render() {
    lista.innerHTML = '';

    let arr = tareas;
    
    if (filtro === 'pendientes') arr = tareas.filter(t => !t.completada);
    if (filtro === 'completadas') arr = tareas.filter(t => t.completada);

    arr.forEach(t => {
        const item = document.createElement('div');
        item.className = 'tarea-box';
        
        if (t.completada) {
            item.classList.add('tachado');
        }

        item.innerHTML = `
            <h5>${t.titulo} <small class="text-muted">(${t.curso})</small></h5>
            <p style="margin-bottom: 5px;"><strong>Para:</strong> ${t.fechaEntrega}</p>
            
            <button class="btn btn-sm ${t.completada ? 'btn-secondary' : 'btn-success'}" onclick="toggle(${t.id})">
                ${t.completada ? 'Desmarcar' : 'Completar'}
            </button>
            <button class="btn btn-sm btn-danger" onclick="borrar(${t.id})">Eliminar</button>
        `;
        
        lista.appendChild(item);
    });
}

function toggle(id) {
    let t = tareas.find(x => x.id === id);
    if (t) t.completada = !t.completada;
    guardar(); 
    render();
}

function borrar(id) {
    tareas = tareas.filter(x => x.id !== id);
    guardar(); 
    render();
}

function setFiltro(f) {
    filtro = f;
    render();
}


function guardar() {
    localStorage.setItem('tareas', JSON.stringify(tareas));
}

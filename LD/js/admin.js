document.addEventListener("DOMContentLoaded", () => {
    mostrarProyectos();
});

function agregarProyecto() {
    const nombre = document.getElementById("nombre").value;
    const descripcion = document.getElementById("descripcion").value;
    const link = document.getElementById("link").value;

    let proyectos = JSON.parse(localStorage.getItem("proyectos")) || [];
    proyectos.push({ nombre, descripcion, link });
    localStorage.setItem("proyectos", JSON.stringify(proyectos));

    limpiarCampos();
    mostrarProyectos();
}

function mostrarProyectos() {
    const proyectos = JSON.parse(localStorage.getItem("proyectos")) || [];
    const contenedor = document.getElementById("admin-proyectos");
    contenedor.innerHTML = "";

    proyectos.forEach((proyecto, index) => {
        const div = document.createElement("div");
        div.classList.add("proyecto");
        div.innerHTML = `
            <span><strong>${proyecto.nombre}</strong> - ${proyecto.descripcion}</span>
            <button class="btn-editar" onclick="editarProyecto(${index})">Editar</button>
            <button class="btn-eliminar" onclick="eliminarProyecto(${index})">Eliminar</button>
        `;
        contenedor.appendChild(div);
    });
}

function eliminarProyecto(index) {
    let proyectos = JSON.parse(localStorage.getItem("proyectos")) || [];
    proyectos.splice(index, 1);
    localStorage.setItem("proyectos", JSON.stringify(proyectos));

    mostrarProyectos();
}

function editarProyecto(index) {
    let proyectos = JSON.parse(localStorage.getItem("proyectos")) || [];
    const proyecto = proyectos[index];

    document.getElementById("nombre").value = proyecto.nombre;
    document.getElementById("descripcion").value = proyecto.descripcion;
    document.getElementById("link").value = proyecto.link;

    document.getElementById("btnGuardar").onclick = function() {
        guardarEdicion(index);
    };
}

function guardarEdicion(index) {
    let proyectos = JSON.parse(localStorage.getItem("proyectos")) || [];
    
    proyectos[index] = {
        nombre: document.getElementById("nombre").value,
        descripcion: document.getElementById("descripcion").value,
        link: document.getElementById("link").value
    };

    localStorage.setItem("proyectos", JSON.stringify(proyectos));

    limpiarCampos();
    mostrarProyectos();
}

function limpiarCampos() {
    document.getElementById("nombre").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("link").value = "";
}

function logout() {
  localStorage.removeItem("autenticado");
  window.location.href = "../login.html";
}

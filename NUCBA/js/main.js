document.addEventListener("DOMContentLoaded", () => {
    cargarProyectos();
    cargarContacto();
});

function cargarProyectos() {
    const proyectos = JSON.parse(localStorage.getItem("proyectos")) || [];
    const contenedor = document.getElementById("lista-proyectos");
    contenedor.innerHTML = "";

    proyectos.forEach(proyecto => {
        const div = document.createElement("div");
        div.classList.add("proyecto");
        div.innerHTML = `
            <h3>${proyecto.nombre}</h3>
            <p>${proyecto.descripcion}</p>
            <a href="${proyecto.link}" target="_blank">Ver Proyecto</a>
        `;
        contenedor.appendChild(div);
    });
}

function cargarContacto() {
    const email = localStorage.getItem("email") || "correo@ejemplo.com";
    const telefono = localStorage.getItem("telefono") || "+123456789";

    document.getElementById("email").textContent = email;
    document.getElementById("telefono").textContent = telefono;
}

document.addEventListener("DOMContentLoaded", () => {
    cargarProyectos();
    cargarContacto();
    activarAnimaciones();
});

function activarAnimaciones() {
    const secciones = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.2 });

    secciones.forEach(seccion => observer.observe(seccion));
}

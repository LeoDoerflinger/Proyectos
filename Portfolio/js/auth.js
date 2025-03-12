document.addEventListener("DOMContentLoaded", () => {
    // Si no hay credenciales almacenadas, creamos las predeterminadas
    if (!localStorage.getItem("usuario") || !localStorage.getItem("password")) {
        localStorage.setItem("usuario", "admin");
        localStorage.setItem("password", "1234");
    }

    // Redirigir si ya está autenticado
    if (localStorage.getItem("autenticado") === "true") {
        window.location.href = "admin/index.html";
    }
});

function login() {
    const usuarioIngresado = document.getElementById("usuario").value;
    const passwordIngresada = document.getElementById("password").value;

    const usuarioCorrecto = localStorage.getItem("usuario");
    const passwordCorrecta = localStorage.getItem("password");

    if (usuarioIngresado === usuarioCorrecto && passwordIngresada === passwordCorrecta) {
        localStorage.setItem("autenticado", "true");
        window.location.href = "admin/index.html";
    } else {
        document.getElementById("mensaje").textContent = "Usuario o contraseña incorrectos.";
    }
}

document.addEventListener("DOMContentLoaded", () => {
    setTimeout(() => {
        document.querySelector(".login-container").style.opacity = "1";
    }, 100);
});

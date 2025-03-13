document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("form").addEventListener("submit", function (event) {
    event.preventDefault(); // Evita el envío por defecto del formulario

    let nombre = document.querySelector("#nombre").value;
    let email = document.querySelector("#email").value;
    let mensaje = document.querySelector("#mensaje").value;

    let telefonoDestino = "5493512619874";

    let mensajeWhatsApp = `Hola Leo! Soy ${nombre}. Mi correo es ${email}. %0A%0A${mensaje}`;

    let url = `https://wa.me/${telefonoDestino}?text=${mensajeWhatsApp}`;

    window.open(url, "_blank"); // Abre WhatsApp en una nueva pestaña
  });
});

document.getElementById("form").reset();

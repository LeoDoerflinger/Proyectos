document.addEventListener("DOMContentLoaded", () => {
    // =========================================================================
    // 1. SELECTORES DEL DOM
    // =========================================================================
    const body = document.body;
    const themeToggle = document.getElementById("theme-toggle");
    const productosContainer = document.getElementById("productos-container");
    const iconoCarrito = document.querySelector(".icono-carrito");
    const carritoSidebar = document.getElementById("carrito-sidebar");
    const carritoContador = document.getElementById("carrito-contador");
    const modalProducto = document.getElementById("modal-producto");
    const modalCheckout = document.getElementById("modal-checkout");
    const modalPago = document.getElementById("modal-pago");
    const hamburgerBtn = document.querySelector(".hamburger");
    const mobileMenu = document.querySelector(".mobile-menu");
    const cerrarMenuMovilBtn = document.querySelector(".cerrar-menu-movil");
    const formContacto = document.getElementById("form-contacto");
    const formPago = document.getElementById("form-pago");

    // =========================================================================
    // 2. ESTADO DE LA APLICACIÓN
    // =========================================================================
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let currentUser = JSON.parse(localStorage.getItem("currentUser")) || null;
    let costoEnvio = 0;
    let descuentoAplicado = 0;
    const cupones = { "DESCUENTO10": 0.10, "SOYDEV": 0.20 };

    // =========================================================================
    // 3. LÓGICA DE USUARIO (localStorage)
    // =========================================================================
    const guardarUsuario = (userData) => {
        localStorage.setItem(`user-${userData.email}`, JSON.stringify(userData));
        localStorage.setItem("currentUser", JSON.stringify(userData));
        currentUser = userData;
    };
    const cerrarSesion = () => {
        localStorage.removeItem("currentUser");
        currentUser = null;
        actualizarVistaUsuario();
    };
    const actualizarVistaUsuario = () => {
        const userLoginView = document.getElementById("user-login-view");
        const userDetailsForm = document.getElementById("user-details-form");
        if (currentUser) {
            userLoginView.classList.remove("hidden");
            userDetailsForm.classList.add("hidden");
            document.getElementById("logged-in-user-name").textContent = currentUser.nombre;
            ['nombre', 'email', 'telefono', 'direccion'].forEach(id => {
                const el = document.getElementById(`checkout-${id}`);
                if(el) el.value = currentUser[id] || '';
            });
        } else {
            userLoginView.classList.add("hidden");
            userDetailsForm.classList.remove("hidden");
            ['nombre', 'email', 'telefono', 'direccion'].forEach(id => {
                 const el = document.getElementById(`checkout-${id}`);
                 if(el) el.value = '';
            });
        }
    };
    
    // =========================================================================
    // 4. LÓGICA DEL CARRITO (Añadir, remover, cambiar cantidad)
    // =========================================================================
    const agregarAlCarrito = (producto) => {
        const existe = carrito.find(item => item.id === producto.id);
        if (existe) { existe.cantidad++; } 
        else { carrito.push({ ...producto, cantidad: 1 }); }
        actualizarCarrito();
    };
    const modificarCantidad = (productoId, cambio) => {
        const item = carrito.find(item => item.id === productoId);
        if (item) {
            item.cantidad += cambio;
            if (item.cantidad <= 0) {
                carrito = carrito.filter(p => p.id !== productoId);
            }
            actualizarCarrito();
        }
    };
    const actualizarCarrito = () => {
        renderizarItemsCarrito();
        renderizarTotalYContador();
        localStorage.setItem("carrito", JSON.stringify(carrito));
    };

    // =========================================================================
    // 5. LÓGICA DE RENDERIZADO (Carrito, Checkout, etc.)
    // =========================================================================
    const renderizarItemsCarrito = () => {
        carritoSidebar.innerHTML = `
            <div class="carrito-header"><h2>Tu Carrito</h2><button class="cerrar-modal" aria-label="Cerrar">&times;</button></div>
            <div class="carrito-items">${carrito.length === 0 ? "<p>Tu carrito está vacío.</p>" : carrito.map(item => `
                <div class="carrito-item" data-id="${item.id}">
                    <img src="${item.imagen}" alt="${item.nombre}">
                    <div class="carrito-item-info">
                        <h4>${item.nombre}</h4>
                        <p>Precio: $${parseFloat(item.precio).toFixed(2)}</p>
                        <div class="item-actions">
                            <button class="quantity-btn decrease-quantity">-</button>
                            <span>${item.cantidad}</span>
                            <button class="quantity-btn increase-quantity">+</button>
                        </div>
                    </div>
                    <button class="remover-item" aria-label="Remover">&times;</button>
                </div>`).join("")}
            </div>
            <div class="carrito-footer">
                <div class="carrito-total"><h3><span>Subtotal:</span><span id="carrito-subtotal-sidebar">$0.00</span></h3></div>
                <button id="btn-iniciar-compra" class="cta-button" ${carrito.length === 0 ? 'disabled' : ''}>Iniciar Compra</button>
            </div>`;
    };

    const renderizarTotalYContador = () => {
        const subtotal = carrito.reduce((acc, item) => acc + parseFloat(item.precio) * item.cantidad, 0);
        const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0);
        const subtotalSidebar = document.getElementById("carrito-subtotal-sidebar");
        if(subtotalSidebar) subtotalSidebar.textContent = `$${subtotal.toFixed(2)}`;
        carritoContador.textContent = totalItems;
        carritoContador.style.display = totalItems > 0 ? 'flex' : 'none';
    };

    const actualizarResumenPedido = () => {
        const subtotal = carrito.reduce((acc, item) => acc + parseFloat(item.precio) * item.cantidad, 0);
        const descuento = subtotal * descuentoAplicado;
        const total = subtotal - descuento + costoEnvio;
        document.getElementById("resumen-items").innerHTML = carrito.map(item => `<div class="resumen-item"><span>${item.cantidad} x ${item.nombre}</span><span>$${(parseFloat(item.precio) * item.cantidad).toFixed(2)}</span></div>`).join("");
        document.getElementById("resumen-subtotal").textContent = `$${subtotal.toFixed(2)}`;
        document.getElementById("resumen-envio").textContent = `$${costoEnvio.toFixed(2)}`;
        const lineaDescuento = document.getElementById("resumen-descuento-linea");
        if(descuento > 0) {
            document.getElementById("resumen-descuento").textContent = `- $${descuento.toFixed(2)}`;
            lineaDescuento.classList.remove("hidden");
        } else {
            lineaDescuento.classList.add("hidden");
        }
        document.getElementById("resumen-total").textContent = `$${total.toFixed(2)}`;
    };

    // =========================================================================
    // 6. MANEJO DE EVENTOS
    // =========================================================================
    const abrirModal = (modal) => modal.classList.add("visible");
    const cerrarModal = (modal) => modal.classList.remove("visible");
    
    // Eventos de Modales
    productosContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("ver-detalles")) {
            const productoNode = e.target.closest(".producto");
            const productoData = productoNode.dataset;
            document.getElementById("modal-producto-img").src = productoData.imagen;
            document.getElementById("modal-producto-nombre").textContent = productoData.nombre;
            document.getElementById("modal-producto-descripcion").textContent = productoData.descripcion;
            document.getElementById("modal-producto-precio").textContent = `$${parseFloat(productoData.precio).toFixed(2)}`;
            const btnAgregar = document.getElementById("modal-agregar-carrito");
            Object.keys(productoData).forEach(key => btnAgregar.dataset[key] = productoData[key]);
            abrirModal(modalProducto);
        }
    });
    document.getElementById("modal-agregar-carrito").addEventListener("click", function () {
        agregarAlCarrito({ ...this.dataset });
        cerrarModal(modalProducto);
    });

    // Eventos de Carrito
    iconoCarrito.addEventListener("click", () => carritoSidebar.classList.add('abierto'));
    carritoSidebar.addEventListener('click', e => {
        if (e.target.classList.contains('cerrar-modal')) { carritoSidebar.classList.remove('abierto'); }
        if (e.target.id === 'btn-iniciar-compra') {
            carritoSidebar.classList.remove('abierto');
            actualizarResumenPedido();
            actualizarVistaUsuario();
            abrirModal(modalCheckout);
        }
        const targetId = e.target.closest('.carrito-item')?.dataset.id;
        if (!targetId) return;
        if (e.target.classList.contains('increase-quantity')) { modificarCantidad(targetId, 1); }
        if (e.target.classList.contains('decrease-quantity')) { modificarCantidad(targetId, -1); }
        if (e.target.classList.contains('remover-item')) { modificarCantidad(targetId, -Infinity); }
    });

    // Eventos de Checkout
    document.querySelectorAll('input[name="delivery"]').forEach(radio => {
        radio.addEventListener('change', e => {
            const addressContainer = document.getElementById('delivery-address-container');
            costoEnvio = e.target.value === 'shipping' ? 10.00 : 0;
            addressContainer.classList.toggle('hidden', e.target.value !== 'shipping');
            actualizarResumenPedido();
        });
    });
    document.getElementById('aplicar-cupon-btn').addEventListener('click', () => {
        const input = document.getElementById('cupon-input');
        const mensaje = document.getElementById('cupon-mensaje');
        const cupon = input.value.trim().toUpperCase();
        descuentoAplicado = cupones[cupon] ? cupones[cupon] : 0;
        mensaje.textContent = cupones[cupon] ? `¡Cupón "${cupon}" aplicado!` : 'Cupón no válido.';
        mensaje.className = cupones[cupon] ? 'exito' : 'error';
        actualizarResumenPedido();
        setTimeout(() => mensaje.textContent = "", 3000);
    });
    document.getElementById('continuar-pago-btn').addEventListener('click', () => {
        const nombre = document.getElementById('checkout-nombre').value;
        const email = document.getElementById('checkout-email').value;
        if(!nombre || !email) {
            alert('Por favor, completa tu nombre y correo electrónico.'); return;
        }
        if(document.getElementById('save-user-data').checked && !currentUser) {
            guardarUsuario({ nombre, email, telefono: document.getElementById('checkout-telefono').value, direccion: document.getElementById('checkout-direccion').value });
        }
        cerrarModal(modalCheckout);
        abrirModal(modalPago);
    });
    document.getElementById('logout-btn').addEventListener('click', cerrarSesion);
    document.querySelectorAll(".cerrar-modal").forEach(btn => btn.addEventListener("click", () => btn.closest(".modal, .carrito-sidebar").classList.remove('visible', 'abierto')));
    
    // =========================================================================
    // 7. INICIALIZACIÓN Y EVENTOS GENERALES
    // =========================================================================
    // Tema
    themeToggle.addEventListener("click", () => {
        const newTheme = body.dataset.theme === "light" ? "dark" : "light";
        localStorage.setItem("theme", newTheme);
        body.dataset.theme = newTheme;
    });

    // Menú hamburguesa
    hamburgerBtn.addEventListener("click", () => mobileMenu.classList.add("abierto"));
    cerrarMenuMovilBtn.addEventListener("click", () => mobileMenu.classList.remove("abierto"));
    document.querySelectorAll('.mobile-menu a').forEach(link => {
        link.addEventListener('click', () => mobileMenu.classList.remove("abierto"));
    });
    
    // CORRECCIÓN: Formulario de Contacto ahora envía a WhatsApp
    formContacto.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const nombre = formContacto.querySelector('input[type="text"]').value;
        const email = formContacto.querySelector('input[type="email"]').value;
        const mensaje = formContacto.querySelector('textarea').value;
        
        const telefonoWhatsApp = "543512619874";
        
        const textoMensaje = `¡Hola! Me contacto desde la tienda.\n\n*Nombre:* ${nombre}\n*Email:* ${email}\n\n*Mensaje:*\n${mensaje}`;
        
        const urlWhatsApp = `https://wa.me/${telefonoWhatsApp}?text=${encodeURIComponent(textoMensaje)}`;
        
        window.open(urlWhatsApp, '_blank');
        
        // Opcional: Mostrar un mensaje de confirmación y limpiar el formulario
        const msgEl = document.getElementById("contacto-mensaje");
        msgEl.textContent = "Serás redirigido a WhatsApp...";
        msgEl.style.color = "var(--color-exito)";
        setTimeout(() => {
            msgEl.textContent = "";
            formContacto.reset();
        }, 3000);
    });
    
    // Formulario de Pago
    formPago.addEventListener("submit", (e) => { e.preventDefault(); /* ... */ });

    // Carga inicial
    const init = () => {
        const savedTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        body.dataset.theme = savedTheme;
        actualizarCarrito();
    };

    init();
});
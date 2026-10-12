/* ==========================================================================
   MITIENDA ONLINE — APP SCRIPT & STATE CONTROLLER
   Modern E-Commerce Logic, Cart, Checkout, Simulation & Wishlist
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  'use strict';

  // --- 1. PRODUCT CATALOG DATA ---
  const PRODUCTS = [
    {
      id: 1,
      nombre: "iPhone 15 Pro",
      categoria: "tecnologia",
      precio: 1499.99,
      precioAntiguo: 1699.99,
      badge: "NUEVO",
      badgeClass: "new",
      rating: 4.9,
      reviews: 42,
      imagen: "assets/phone.jpg",
      descripcion: "El último smartphone con tecnología de punta, cámara Pro de 48MP y pantalla Super Retina XDR con ProMotion a 120Hz. Rendimiento de vanguardia gracias al chip A17 Pro de arquitectura de 3 nanómetros y estructura de titanio aeroespacial.",
      specs: ["Chip Apple A17 Pro", "Cámara Triple 48MP", "Pantalla 6.1 OLED", "Conector USB-C 3"],
      stock: 8
    },
    {
      id: 2,
      nombre: "Laptop Gamer Victus",
      categoria: "tecnologia",
      precio: 1250.00,
      precioAntiguo: 1399.00,
      badge: "OFERTA",
      badgeClass: "sale",
      rating: 4.8,
      reviews: 35,
      imagen: "assets/laptop.jpg",
      descripcion: "Laptop gamer de alto rendimiento con procesador AMD Ryzen 5, 16GB RAM DDR5, almacenamiento ultrarrápido SSD de 512GB NVMe y gráficos dedicados NVIDIA GeForce RTX con DLSS 3. Pantalla de 144Hz para máxima fluidez en tus partidas competitivas.",
      specs: ["AMD Ryzen 5 Serie 7000", "NVIDIA RTX Serie 40", "16GB RAM DDR5", "Pantalla 15.6' 144Hz"],
      stock: 5
    },
    {
      id: 3,
      nombre: "Zapatillas Nike Air Max",
      categoria: "moda",
      precio: 180.50,
      precioAntiguo: 215.00,
      badge: "DESTACADO",
      badgeClass: "",
      rating: 4.7,
      reviews: 64,
      imagen: "assets/shoes.jpg",
      descripcion: "Un clásico icónico reinventado para el confort urbano diario. Amortiguación visible Max Air en el talón combinada con una capellada de cuero y malla transpirable de primera calidad. Tracción confiable en cualquier superficie urbana.",
      specs: ["Amortiguación Max Air", "Suela de Goma Antideslizante", "Materiales Premium", "Estilo Streetwear"],
      stock: 14
    },
    {
      id: 4,
      nombre: "Camiseta Boca Juniors 24",
      categoria: "moda",
      precio: 110.00,
      precioAntiguo: 130.00,
      badge: "MÁS VENDIDO",
      badgeClass: "sale",
      rating: 4.9,
      reviews: 118,
      imagen: "assets/tshirt.jpg",
      descripcion: "La camiseta titular oficial de Boca Juniors para la temporada 2024. Confeccionada con tecnología AEROREADY de alto rendimiento que absorbe el sudor para mantenerte fresco tanto en la cancha como en la tribuna. Escudo bordado en alta definición.",
      specs: ["100% Poliéster Reciclado", "Tecnología AEROREADY", "Escudo Bordado", "Corte Deportivo Regular"],
      stock: 22
    },
    {
      id: 5,
      nombre: "Sofá Minimalista 2 Cuerpos",
      categoria: "hogar",
      precio: 790.00,
      precioAntiguo: 890.00,
      badge: "DISEÑO",
      badgeClass: "",
      rating: 4.6,
      reviews: 19,
      imagen: "assets/sofa.jpg",
      descripcion: "Sofá contemporáneo de dos cuerpos diseñado para elevar la armonía de tu hogar. Estructura de madera maciza estacionada, relleno de espuma de alta densidad (28 kg/m³) con memoria y tapizado en pana rústica anti-manchas de fácil limpieza.",
      specs: ["Estructura Maciza", "Espuma Alta Densidad 28kg", "Tela Anti-Manchas", "Medidas: 1.80m x 0.90m"],
      stock: 3
    },
    {
      id: 6,
      nombre: "Lámpara de Lava Retro",
      categoria: "hogar",
      precio: 75.00,
      precioAntiguo: 95.00,
      badge: "OFERTA",
      badgeClass: "sale",
      rating: 4.8,
      reviews: 28,
      imagen: "assets/lamp.jpg",
      descripcion: "Lámpara de lava vintage con base de aluminio pulido. Emite una iluminación ambiental cálida y relajante con su hipnótico flujo de cera líquida ascendente. Ideal como objeto de diseño decorativo para escritorios, estudios o habitaciones.",
      specs: ["Bombilla Térmica Incluida", "Base de Aluminio", "Cable con Interruptor", "Altura: 40 cm"],
      stock: 15
    }
  ];

  // --- 2. APPLICATION STATE ---
  let carrito = JSON.parse(localStorage.getItem("mt_carrito")) || [];
  let favoritos = JSON.parse(localStorage.getItem("mt_favoritos")) || [];
  let currentUser = JSON.parse(localStorage.getItem("mt_currentUser")) || null;
  let activeCategory = "all";
  let searchQuery = "";
  let currentSort = "featured";
  let costoEnvio = 0;
  let descuentoAplicado = 0;
  const FREE_SHIPPING_THRESHOLD = 500;

  const CUPONES = {
    "SOYDEV": 0.20,
    "DESCUENTO10": 0.10,
    "BIENVENIDO": 0.15
  };

  // --- 3. DOM ELEMENTS ---
  const body = document.body;
  const themeToggle = document.getElementById("theme-toggle");
  const productosContainer = document.getElementById("productos-container");
  const totalCountSpan = document.getElementById("productos-count");

  // Nav Icons & Drawers
  const iconoCarrito = document.getElementById("icono-carrito-btn");
  const carritoContador = document.getElementById("carrito-contador");
  const iconoFavoritos = document.getElementById("icono-favoritos-btn");
  const favoritosContador = document.getElementById("favoritos-contador");
  const carritoSidebar = document.getElementById("carrito-sidebar");
  const cartBackdrop = document.getElementById("cart-backdrop");
  const hamburgerBtn = document.querySelector(".hamburger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const cerrarMenuMovilBtn = document.querySelector(".cerrar-menu-movil");

  // Search & Filter
  const categoryTabs = document.querySelectorAll(".tab-btn");
  const searchInput = document.getElementById("search-input");
  const sortSelect = document.getElementById("sort-select");

  // Modals
  const modalProducto = document.getElementById("modal-producto");
  const modalCheckout = document.getElementById("modal-checkout");
  const modalPago = document.getElementById("modal-pago");

  // Toast container
  const toastContainer = document.getElementById("toast-container");

  // Helper: Toast Notifications
  function showToast(message, icon = "fa-check-circle") {
    if (!toastContainer) return;
    const toast = document.createElement("div");
    toast.className = "toast-alert";
    toast.innerHTML = `<i class="fas ${icon}"></i><span>${message}</span>`;
    toastContainer.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add("show");
    });

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 400);
    }, 2800);
  }

  // --- 4. THEME CONTROLLER ---
  function initTheme() {
    const saved = localStorage.getItem("mt_theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const theme = saved || (prefersDark ? "dark" : "light");
    body.setAttribute("data-theme", theme);
  }

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const isDark = body.getAttribute("data-theme") === "dark";
      const newTheme = isDark ? "light" : "dark";
      body.setAttribute("data-theme", newTheme);
      localStorage.setItem("mt_theme", newTheme);
      showToast(newTheme === "dark" ? "Modo oscuro activado" : "Modo claro activado", "fa-moon");
    });
  }

  // --- 5. RENDER PRODUCTS CATALOG ---
  function renderProducts() {
    if (!productosContainer) return;

    let filtered = PRODUCTS.filter(p => {
      const matchCat = (activeCategory === "all") || 
        (activeCategory === "ofertas" && p.precioAntiguo > p.precio) || 
        (p.categoria === activeCategory);
      const matchSearch = p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.descripcion.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });

    // Sorting
    if (currentSort === "price-asc") {
      filtered.sort((a, b) => a.precio - b.precio);
    } else if (currentSort === "price-desc") {
      filtered.sort((a, b) => b.precio - a.precio);
    } else if (currentSort === "rating") {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (currentSort === "name") {
      filtered.sort((a, b) => a.nombre.localeCompare(b.nombre));
    }

    if (totalCountSpan) {
      totalCountSpan.textContent = `Mostrando ${filtered.length} producto${filtered.length === 1 ? '' : 's'}`;
    }

    if (filtered.length === 0) {
      productosContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; color: var(--text-muted);">
          <i class="fas fa-search" style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.4;"></i>
          <h3 style="font-family: var(--font-heading); color: var(--text-main); font-size: 1.4rem;">No encontramos coincidencias</h3>
          <p>Probá con otra categoría o palabra clave.</p>
        </div>
      `;
      return;
    }

    productosContainer.innerHTML = filtered.map(item => {
      const isFav = favoritos.includes(item.id);
      return `
        <article class="producto" data-id="${item.id}">
          <div class="product-image-wrap">
            <img src="${item.imagen}" alt="${item.nombre}" loading="lazy" />
            ${item.badge ? `<span class="product-badge ${item.badgeClass}">${item.badge}</span>` : ''}
            <button class="btn-wishlist ${isFav ? 'active' : ''}" data-id="${item.id}" aria-label="Agregar a favoritos">
              <i class="${isFav ? 'fas' : 'far'} fa-heart"></i>
            </button>
          </div>
          <div class="product-details">
            <span class="product-category-tag">${item.categoria}</span>
            <h3>${item.nombre}</h3>
            
            <div class="rating-stars">
              ${renderStars(item.rating)}
              <span class="rating-count">(${item.reviews})</span>
            </div>

            <div class="product-price-row">
              <span class="precio">$${item.precio.toFixed(2)}</span>
              ${item.precioAntiguo ? `<span class="precio-antiguo">$${item.precioAntiguo.toFixed(2)}</span>` : ''}
            </div>

            <div class="product-card-actions">
              <button class="btn-quick-add" data-id="${item.id}">
                <i class="fas fa-cart-plus"></i> Añadir
              </button>
              <button class="ver-detalles" data-id="${item.id}" title="Ver detalles y especificaciones">
                <i class="fas fa-eye"></i>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join("");
  }

  function renderStars(rating) {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5 ? 1 : 0;
    let stars = "";
    for (let i = 0; i < full; i++) stars += '<i class="fas fa-star"></i>';
    if (half) stars += '<i class="fas fa-star-half-alt"></i>';
    for (let i = full + half; i < 5; i++) stars += '<i class="far fa-star"></i>';
    return stars;
  }

  // Category Filtering
  categoryTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      categoryTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      activeCategory = tab.dataset.category;
      renderProducts();
    });
  });

  // Search input
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim();
      renderProducts();
    });
  }

  // Sort dropdown
  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      renderProducts();
    });
  }

  // --- 6. WISHLIST FAVORITES CONTROLLER ---
  function updateWishlistBadge() {
    if (!favoritosContador) return;
    favoritosContador.textContent = favoritos.length;
    favoritosContador.classList.toggle("visible", favoritos.length > 0);
  }

  function toggleWishlist(productId) {
    const id = parseInt(productId, 10);
    const idx = favoritos.indexOf(id);
    const prod = PRODUCTS.find(p => p.id === id);

    if (idx === -1) {
      favoritos.push(id);
      showToast(`"${prod.nombre}" agregado a favoritos ❤️`, "fa-heart");
    } else {
      favoritos.splice(idx, 1);
      showToast(`"${prod.nombre}" removido de favoritos`, "fa-heart-broken");
    }
    localStorage.setItem("mt_favoritos", JSON.stringify(favoritos));
    updateWishlistBadge();
    renderProducts();
  }

  if (iconoFavoritos) {
    iconoFavoritos.addEventListener("click", () => {
      if (favoritos.length === 0) {
        showToast("Tu lista de favoritos está vacía.", "fa-heart");
        return;
      }
      activeCategory = "all";
      searchQuery = "";
      categoryTabs.forEach(t => t.classList.remove("active"));
      // Filter strictly by favorite IDs
      const favProducts = PRODUCTS.filter(p => favoritos.includes(p.id));
      productosContainer.innerHTML = favProducts.map(item => `
        <article class="producto" data-id="${item.id}">
          <div class="product-image-wrap">
            <img src="${item.imagen}" alt="${item.nombre}" />
            <button class="btn-wishlist active" data-id="${item.id}"><i class="fas fa-heart"></i></button>
          </div>
          <div class="product-details">
            <span class="product-category-tag">${item.categoria}</span>
            <h3>${item.nombre}</h3>
            <div class="product-price-row"><span class="precio">$${item.precio.toFixed(2)}</span></div>
            <div class="product-card-actions">
              <button class="btn-quick-add" data-id="${item.id}"><i class="fas fa-cart-plus"></i> Añadir</button>
              <button class="ver-detalles" data-id="${item.id}"><i class="fas fa-eye"></i></button>
            </div>
          </div>
        </article>
      `).join("");
      document.getElementById("productos").scrollIntoView({ behavior: "smooth" });
      showToast("Mostrando tus productos favoritos ❤️", "fa-heart");
    });
  }

  // --- 7. CART CONTROLLER ---
  function agregarAlCarrito(productId, qty = 1) {
    const id = parseInt(productId, 10);
    const prod = PRODUCTS.find(p => p.id === id);
    if (!prod) return;

    const exist = carrito.find(item => item.id === id);
    if (exist) {
      exist.cantidad += qty;
    } else {
      carrito.push({
        id: prod.id,
        nombre: prod.nombre,
        precio: prod.precio,
        imagen: prod.imagen,
        cantidad: qty
      });
    }

    actualizarCarrito();
    showToast(`¡"${prod.nombre}" añadido al carrito!`, "fa-shopping-cart");
  }

  function modificarCantidad(productId, delta) {
    const id = parseInt(productId, 10);
    const item = carrito.find(p => p.id === id);
    if (!item) return;

    item.cantidad += delta;
    if (item.cantidad <= 0) {
      carrito = carrito.filter(p => p.id !== id);
    }
    actualizarCarrito();
  }

  function actualizarCarrito() {
    renderCartDrawer();
    renderCartBadge();
    localStorage.setItem("mt_carrito", JSON.stringify(carrito));
  }

  function renderCartBadge() {
    if (!carritoContador) return;
    const totalQty = carrito.reduce((sum, item) => sum + item.cantidad, 0);
    carritoContador.textContent = totalQty;
    carritoContador.classList.toggle("visible", totalQty > 0);
  }

  function renderCartDrawer() {
    if (!carritoSidebar) return;

    const subtotal = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
    const progressPct = Math.min(100, Math.round((subtotal / FREE_SHIPPING_THRESHOLD) * 100));
    const faltante = (FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2);

    carritoSidebar.innerHTML = `
      <div class="carrito-header">
        <h2><i class="fas fa-shopping-bag" style="color:var(--color-primary)"></i> Tu Carrito</h2>
        <button class="cerrar-modal cerrar-carrito-btn" aria-label="Cerrar carrito">&times;</button>
      </div>

      <div class="free-shipping-ticker">
        <div class="shipping-progress-text">
          ${subtotal >= FREE_SHIPPING_THRESHOLD 
            ? '🎉 ¡Felicidades! Tenés <strong>Envío Gratis</strong>' 
            : `Agregá <strong>$${faltante}</strong> más para tener <strong>Envío Gratis</strong>`}
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width: ${progressPct}%"></div>
        </div>
      </div>

      <div class="carrito-items">
        ${carrito.length === 0 ? `
          <div class="cart-empty-view">
            <i class="fas fa-shopping-basket"></i>
            <h4 style="font-family:var(--font-heading); color:var(--text-main); margin-bottom:0.5rem;">Tu carrito está vacío</h4>
            <p style="font-size:0.88rem;">Explorá nuestro catálogo y sumá tus productos favoritos.</p>
          </div>
        ` : carrito.map(item => `
          <div class="carrito-item" data-id="${item.id}">
            <img src="${item.imagen}" alt="${item.nombre}">
            <div class="carrito-item-info">
              <h4>${item.nombre}</h4>
              <div class="carrito-item-price">$${(item.precio * item.cantidad).toFixed(2)}</div>
              <div class="item-actions">
                <button class="quantity-btn btn-qty-dec" data-id="${item.id}" aria-label="Disminuir">-</button>
                <span class="quantity-number">${item.cantidad}</span>
                <button class="quantity-btn btn-qty-inc" data-id="${item.id}" aria-label="Aumentar">+</button>
              </div>
            </div>
            <button class="remover-item btn-remove-item" data-id="${item.id}" aria-label="Eliminar producto">
              <i class="far fa-trash-alt"></i>
            </button>
          </div>
        `).join('')}
      </div>

      <div class="carrito-footer">
        <div class="cart-summary-line">
          <span>Subtotal</span>
          <span style="font-weight:700; color:var(--text-main)">$${subtotal.toFixed(2)}</span>
        </div>
        <div class="cart-summary-line total">
          <span>Total Estimado</span>
          <span style="color:var(--color-primary)">$${subtotal.toFixed(2)}</span>
        </div>
        <button id="btn-iniciar-compra" class="cta-button" style="width:100%" ${carrito.length === 0 ? 'disabled' : ''}>
          <span>Iniciar Compra Segura</span>
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    `;
  }

  // Drawer Toggle Handlers
  function openCart() {
    carritoSidebar.classList.add("abierto");
    cartBackdrop.classList.add("visible");
    document.body.style.overflow = "hidden";
  }
  function closeCart() {
    carritoSidebar.classList.remove("abierto");
    cartBackdrop.classList.remove("visible");
    document.body.style.overflow = "";
  }

  if (iconoCarrito) iconoCarrito.addEventListener("click", openCart);
  if (cartBackdrop) cartBackdrop.addEventListener("click", closeCart);

  // Cart Delegation events
  if (carritoSidebar) {
    carritoSidebar.addEventListener("click", (e) => {
      if (e.target.closest(".cerrar-carrito-btn")) {
        closeCart();
      }
      const incBtn = e.target.closest(".btn-qty-inc");
      if (incBtn) {
        modificarCantidad(incBtn.dataset.id, 1);
      }
      const decBtn = e.target.closest(".btn-qty-dec");
      if (decBtn) {
        modificarCantidad(decBtn.dataset.id, -1);
      }
      const remBtn = e.target.closest(".btn-remove-item");
      if (remBtn) {
        modificarCantidad(remBtn.dataset.id, -9999);
      }
      const checkoutBtn = e.target.closest("#btn-iniciar-compra");
      if (checkoutBtn) {
        closeCart();
        openCheckoutModal();
      }
    });
  }

  // --- 8. PRODUCT DETAIL MODAL ---
  let selectedDetailProduct = null;
  let detailQty = 1;

  function openDetailModal(productId) {
    const prod = PRODUCTS.find(p => p.id === parseInt(productId, 10));
    if (!prod || !modalProducto) return;

    selectedDetailProduct = prod;
    detailQty = 1;

    document.getElementById("modal-producto-img").src = prod.imagen;
    document.getElementById("modal-producto-img").alt = prod.nombre;
    document.getElementById("modal-producto-nombre").textContent = prod.nombre;
    document.getElementById("modal-producto-descripcion").textContent = prod.descripcion;
    document.getElementById("modal-producto-precio").textContent = `$${prod.precio.toFixed(2)}`;
    
    const specsContainer = document.getElementById("modal-producto-specs");
    if (specsContainer && prod.specs) {
      specsContainer.innerHTML = prod.specs.map(s => `<li><i class="fas fa-check" style="color:var(--color-primary);margin-right:6px"></i>${s}</li>`).join("");
    }

    modalProducto.classList.add("visible");
    document.body.style.overflow = "hidden";
  }

  const modalAddCartBtn = document.getElementById("modal-agregar-carrito");
  if (modalAddCartBtn) {
    modalAddCartBtn.addEventListener("click", () => {
      if (selectedDetailProduct) {
        agregarAlCarrito(selectedDetailProduct.id, 1);
        modalProducto.classList.remove("visible");
        document.body.style.overflow = "";
      }
    });
  }

  // Products container delegation (click on quick add, view details, wishlist)
  if (productosContainer) {
    productosContainer.addEventListener("click", (e) => {
      const quickAdd = e.target.closest(".btn-quick-add");
      if (quickAdd) {
        agregarAlCarrito(quickAdd.dataset.id, 1);
        return;
      }
      const viewBtn = e.target.closest(".ver-detalles");
      if (viewBtn) {
        openDetailModal(viewBtn.dataset.id);
        return;
      }
      const wishBtn = e.target.closest(".btn-wishlist");
      if (wishBtn) {
        toggleWishlist(wishBtn.dataset.id);
        return;
      }
    });
  }

  // --- 9. CHECKOUT & RESUMEN ---
  function openCheckoutModal() {
    if (!modalCheckout) return;
    actualizarResumenPedido();
    actualizarVistaUsuario();
    modalCheckout.classList.add("visible");
    document.body.style.overflow = "hidden";
  }

  function actualizarResumenPedido() {
    const subtotal = carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
    const descuento = subtotal * descuentoAplicado;
    const total = subtotal - descuento + costoEnvio;

    const itemsContainer = document.getElementById("resumen-items");
    if (itemsContainer) {
      itemsContainer.innerHTML = carrito.map(item => `
        <div style="display:flex; justify-content:space-between; font-size:0.86rem; color:var(--text-secondary); margin-bottom:0.4rem;">
          <span>${item.cantidad}x ${item.nombre}</span>
          <span style="font-weight:600; color:var(--text-main)">$${(item.precio * item.cantidad).toFixed(2)}</span>
        </div>
      `).join("");
    }

    document.getElementById("resumen-subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("resumen-envio").textContent = costoEnvio === 0 ? "Gratis" : `$${costoEnvio.toFixed(2)}`;

    const descLinea = document.getElementById("resumen-descuento-linea");
    if (descLinea) {
      if (descuento > 0) {
        document.getElementById("resumen-descuento").textContent = `-$${descuento.toFixed(2)}`;
        descLinea.classList.remove("hidden");
      } else {
        descLinea.classList.add("hidden");
      }
    }
    document.getElementById("resumen-total").textContent = `$${total.toFixed(2)}`;
  }

  function actualizarVistaUsuario() {
    const userLoginView = document.getElementById("user-login-view");
    const userDetailsForm = document.getElementById("user-details-form");
    if (currentUser && userLoginView && userDetailsForm) {
      userLoginView.classList.remove("hidden");
      document.getElementById("logged-in-user-name").textContent = currentUser.nombre;
      if (document.getElementById("checkout-nombre")) document.getElementById("checkout-nombre").value = currentUser.nombre || '';
      if (document.getElementById("checkout-email")) document.getElementById("checkout-email").value = currentUser.email || '';
      if (document.getElementById("checkout-codigo-pais")) document.getElementById("checkout-codigo-pais").value = currentUser.codigoPais || '+54';
      if (document.getElementById("checkout-telefono-num")) document.getElementById("checkout-telefono-num").value = currentUser.telefonoNum || '';
      if (document.getElementById("checkout-condicion-iva")) document.getElementById("checkout-condicion-iva").value = currentUser.condicionIva || 'Consumidor Final';
      if (document.getElementById("checkout-doc-numero")) document.getElementById("checkout-doc-numero").value = currentUser.docNumero || '';
      if (document.getElementById("checkout-razon-social")) document.getElementById("checkout-razon-social").value = currentUser.razonSocial || '';
      if (document.getElementById("checkout-direccion")) document.getElementById("checkout-direccion").value = currentUser.direccion || '';
    }
  }

  // Toggle Razón Social según condición frente al IVA
  const selectCondicionIva = document.getElementById("checkout-condicion-iva");
  const razonSocialContainer = document.getElementById("checkout-razon-social-container");
  if (selectCondicionIva && razonSocialContainer) {
    selectCondicionIva.addEventListener("change", (e) => {
      razonSocialContainer.style.display = e.target.value === "Responsable Inscripto" ? "block" : "none";
    });
  }

  // Funciones de formateo y sanitización telefónica para WhatsApp
  function formatWhatsAppPhone(codigoPais, numeroCelular) {
    let cod = (codigoPais || "+54").replace(/\D/g, "");
    let num = (numeroCelular || "").replace(/\D/g, "");
    if (num.startsWith("0")) num = num.substring(1);

    if (cod === "54" || cod === "") {
      if (num.startsWith("54")) num = num.substring(2);
      if (num.startsWith("0")) num = num.substring(1);
      if (!num.startsWith("9")) num = "9" + num;
      return "54" + num;
    }
    return cod + num;
  }

  function formatDisplayPhone(codigoPais, numeroCelular) {
    let cod = codigoPais || "+54";
    let num = (numeroCelular || "").replace(/\D/g, "");
    if (num.startsWith("0")) num = num.substring(1);
    return `${cod} ${num}`;
  }

  // Delivery options radio
  document.querySelectorAll('input[name="delivery"]').forEach(radio => {
    radio.addEventListener('change', e => {
      const addressContainer = document.getElementById('delivery-address-container');
      costoEnvio = e.target.value === 'shipping' ? 10.00 : 0;
      if (addressContainer) {
        addressContainer.classList.toggle('hidden', e.target.value !== 'shipping');
      }
      actualizarResumenPedido();
    });
  });

  // Coupons
  const aplicarCuponBtn = document.getElementById("aplicar-cupon-btn");
  if (aplicarCuponBtn) {
    aplicarCuponBtn.addEventListener("click", () => {
      const input = document.getElementById("cupon-input");
      const mensaje = document.getElementById("cupon-mensaje");
      const code = input.value.trim().toUpperCase();

      if (CUPONES[code]) {
        descuentoAplicado = CUPONES[code];
        mensaje.textContent = `¡Cupón "${code}" aplicado con éxito! (${CUPONES[code] * 100}% OFF)`;
        mensaje.className = "exito";
        showToast(`Cupón "${code}" activado! 🎉`, "fa-tag");
      } else {
        descuentoAplicado = 0;
        mensaje.textContent = "El código ingresado no es válido o ha expirado.";
        mensaje.className = "error";
      }
      actualizarResumenPedido();
    });
  }

  // Continue to Payment
  const continuarPagoBtn = document.getElementById("continuar-pago-btn");
  if (continuarPagoBtn) {
    continuarPagoBtn.addEventListener("click", () => {
      const nombre = document.getElementById("checkout-nombre")?.value.trim();
      const email = document.getElementById("checkout-email")?.value.trim();
      const codPais = document.getElementById("checkout-codigo-pais")?.value.trim() || "+54";
      const telNum = document.getElementById("checkout-telefono-num")?.value.trim() || "";
      const condicionIva = document.getElementById("checkout-condicion-iva")?.value || "Consumidor Final";
      const docNumero = document.getElementById("checkout-doc-numero")?.value.trim() || "";
      const razonSocial = document.getElementById("checkout-razon-social")?.value.trim() || "";

      if (!nombre || !email) {
        alert("Por favor completá tu nombre y correo electrónico para continuar.");
        return;
      }

      if (!telNum) {
        alert("Por favor completá tu número de celular (sin el 0, ej: 3512619874) para poder coordinar tu pedido.");
        document.getElementById("checkout-telefono-num")?.focus();
        return;
      }

      if (condicionIva === "Responsable Inscripto" && !razonSocial) {
        alert("Para Factura A como Responsable Inscripto es obligatoria la Razón Social.");
        document.getElementById("checkout-razon-social")?.focus();
        return;
      }

      if (document.getElementById("save-user-data")?.checked) {
        currentUser = {
          nombre,
          email,
          codigoPais: codPais,
          telefonoNum: telNum,
          condicionIva,
          docNumero,
          razonSocial,
          direccion: document.getElementById("checkout-direccion")?.value.trim() || ''
        };
        localStorage.setItem("mt_currentUser", JSON.stringify(currentUser));
      }

      modalCheckout.classList.remove("visible");
      openPaymentModal();
    });
  }

  // --- 10. VIRTUAL CREDIT CARD & SIMULATED PAYMENT ---
  function openPaymentModal() {
    if (!modalPago) return;
    const formPago = document.getElementById("form-pago");
    const successView = document.getElementById("pago-success-view");
    if (formPago) formPago.style.display = "block";
    if (successView) successView.style.display = "none";

    modalPago.classList.add("visible");
    document.body.style.overflow = "hidden";
  }

  // Live Card Visualizer Inputs
  const inputCardNum = document.getElementById("numero-tarjeta");
  const inputCardName = document.getElementById("nombre-tarjeta");
  const inputCardExp = document.getElementById("fecha-exp");

  const displayCardNum = document.getElementById("card-display-number");
  const displayCardName = document.getElementById("card-display-name");
  const displayCardExp = document.getElementById("card-display-exp");

  if (inputCardNum) {
    inputCardNum.addEventListener("input", (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 16);
      let formatted = val.match(/.{1,4}/g)?.join(' ') || '';
      e.target.value = formatted;
      if (displayCardNum) {
        displayCardNum.textContent = formatted || "•••• •••• •••• ••••";
      }
    });
  }

  if (inputCardName) {
    inputCardName.addEventListener("input", (e) => {
      if (displayCardName) {
        displayCardName.textContent = e.target.value.toUpperCase() || "TITULAR DE LA TARJETA";
      }
    });
  }

  if (inputCardExp) {
    inputCardExp.addEventListener("input", (e) => {
      let val = e.target.value.replace(/\D/g, '').substring(0, 4);
      if (val.length >= 2) {
        val = val.substring(0, 2) + '/' + val.substring(2);
      }
      e.target.value = val;
      if (displayCardExp) {
        displayCardExp.textContent = val || "MM/AA";
      }
    });
  }

  // Payment Form Submit Handler
  const formPago = document.getElementById("form-pago");
  const pagoSpinner = document.getElementById("pago-spinner");
  const btnPagar = document.getElementById("btn-pagar-submit");

  if (formPago) {
    formPago.addEventListener("submit", (e) => {
      e.preventDefault();

      if (btnPagar) btnPagar.style.display = "none";
      if (pagoSpinner) pagoSpinner.style.display = "block";

      setTimeout(() => {
        if (pagoSpinner) pagoSpinner.style.display = "none";
        formPago.style.display = "none";

        const orderId = "MT-" + Math.floor(100000 + Math.random() * 900000);
        const successView = document.getElementById("pago-success-view");
        const orderIdDisplay = document.getElementById("order-id-display");
        if (orderIdDisplay) orderIdDisplay.textContent = orderId;
        if (successView) successView.style.display = "block";

        // Persistir la orden en mt_orders para el Dashboard CRM
        const nombreCliente = document.getElementById("checkout-nombre")?.value.trim() || "Cliente";
        const emailCliente = document.getElementById("checkout-email")?.value.trim() || "cliente@ejemplo.com";
        const codPais = document.getElementById("checkout-codigo-pais")?.value.trim() || "+54";
        const telNum = document.getElementById("checkout-telefono-num")?.value.trim() || "3512619874";
        const condicionIva = document.getElementById("checkout-condicion-iva")?.value || "Consumidor Final";
        const docNumero = document.getElementById("checkout-doc-numero")?.value.trim() || "38291044";
        const razonSocial = document.getElementById("checkout-razon-social")?.value.trim() || "";
        const direccionCliente = document.getElementById("checkout-direccion")?.value.trim() || "Av. Colón 1234, Córdoba";
        const tipoEntrega = document.querySelector('input[name="delivery"]:checked')?.value || 'shipping';
        const cardNumRaw = document.getElementById("numero-tarjeta")?.value || "";
        const last4 = cardNumRaw.replace(/\s/g, '').slice(-4) || "8421";
        const cardHolder = document.getElementById("nombre-tarjeta")?.value || nombreCliente;

        const telefonoDisplay = formatDisplayPhone(codPais, telNum);
        const telefonoWhatsApp = formatWhatsAppPhone(codPais, telNum);
        const tipoFacturaSugerida = condicionIva === "Responsable Inscripto" ? "Factura A" : "Factura B";

        const subtotalNum = carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);
        const descNum = subtotalNum * descuentoAplicado;
        const totalNum = subtotalNum - descNum + costoEnvio;

        const nuevaOrden = {
          id: orderId,
          fecha: new Date().toISOString(),
          cliente: {
            nombre: nombreCliente,
            email: emailCliente,
            telefono: telefonoDisplay,
            telefonoWhatsApp: telefonoWhatsApp,
            codigoPais: codPais,
            telefonoNum: telNum,
            condicionIva: condicionIva,
            docNumero: docNumero,
            razonSocial: razonSocial,
            tipoFacturaSugerida: tipoFacturaSugerida,
            direccion: direccionCliente
          },
          entrega: {
            tipo: tipoEntrega,
            costo: costoEnvio,
            direccion: direccionCliente
          },
          pago: {
            metodo: "Tarjeta de Crédito Virtual",
            ultimos4: last4,
            titular: cardHolder,
            estado: "Aprobado",
            cuotas: 1
          },
          items: [...carrito],
          totales: {
            subtotal: subtotalNum,
            descuento: descNum,
            envio: costoEnvio,
            total: totalNum
          },
          estado: "Pendiente"
        };

        try {
          const existingOrders = JSON.parse(localStorage.getItem("mt_orders")) || [];
          existingOrders.unshift(nuevaOrden);
          localStorage.setItem("mt_orders", JSON.stringify(existingOrders));

          // Notificar en tiempo real al Dashboard CRM
          if (window.BroadcastChannel) {
            const bc = new BroadcastChannel("mitienda_channel");
            bc.postMessage({ tipo: "NUEVA_ORDEN", orden: nuevaOrden });
            bc.close();
          }
        } catch (err) {
          console.warn("Error guardando orden en CRM:", err);
        }

        // Setup WhatsApp notification button for the order
        const btnNotificarWA = document.getElementById("btn-notificar-wa");
        if (btnNotificarWA) {
          const itemsSummary = carrito.map(i => `• ${i.cantidad}x ${i.nombre}`).join('%0A');
          const totalVal = `$${totalNum.toFixed(2)}`;
          const waMsg = `¡Hola! Acabo de realizar una compra en MiTienda.%0A%0A*Pedido:* ${orderId}%0A*Cliente:* ${nombreCliente}%0A*Doc/CUIT:* ${docNumero}%0A*Comprobante:* ${tipoFacturaSugerida} (${condicionIva})%0A*Items:*%0A${itemsSummary}%0A%0A*Total:* ${totalVal}`;
          btnNotificarWA.href = `https://wa.me/5493512619874?text=${waMsg}`;
        }

        // Empty cart
        carrito = [];
        actualizarCarrito();
        showToast("¡Pago acreditado exitosamente! 🎉", "fa-check-circle");
      }, 1600);
    });
  }

  // Close modals on Esc or backdrop click
  document.querySelectorAll(".cerrar-modal").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest(".modal").classList.remove("visible");
      document.body.style.overflow = "";
    });
  });

  window.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      e.target.classList.remove("visible");
      document.body.style.overflow = "";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll(".modal.visible").forEach(m => m.classList.remove("visible"));
      closeCart();
      document.body.style.overflow = "";
    }
  });

  // Mobile menu events
  if (hamburgerBtn) hamburgerBtn.addEventListener("click", () => mobileMenu.classList.add("abierto"));
  if (cerrarMenuMovilBtn) cerrarMenuMovilBtn.addEventListener("click", () => mobileMenu.classList.remove("abierto"));
  document.querySelectorAll(".mobile-menu a").forEach(link => {
    link.addEventListener("click", () => mobileMenu.classList.remove("abierto"));
  });

  // --- 11. CONTACT FORM WITH WHATSAPP ---
  const formContacto = document.getElementById("form-contacto");
  if (formContacto) {
    formContacto.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombre = formContacto.querySelector('input[type="text"]').value.trim();
      const email = formContacto.querySelector('input[type="email"]').value.trim();
      const mensaje = formContacto.querySelector('textarea').value.trim();

      const waText = encodeURIComponent(
        `¡Hola Leo! Te contacto desde la sección de contacto de MiTienda.\n\n*Nombre:* ${nombre}\n*Email:* ${email}\n\n*Mensaje:* ${mensaje}`
      );
      window.open(`https://wa.me/543512619874?text=${waText}`, '_blank');
      showToast("Redirigiendo a WhatsApp...", "fa-paper-plane");
      formContacto.reset();
    });
  }

  // --- 12. INITIALIZATION ---
  initTheme();
  renderProducts();
  actualizarCarrito();
  updateWishlistBadge();
});
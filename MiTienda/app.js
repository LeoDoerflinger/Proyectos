/* ==========================================================================
   MITIENDA — LÓGICA PRINCIPAL DE CATÁLOGO, CARRITO, CHECKOUT Y SINCRONIZACIÓN CRM
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  'use strict';

  const FREE_SHIPPING_THRESHOLD = 150.00;
  const CUPONES = {
    "MITIENDA10": 0.10,
    "PROMO20": 0.20,
    "BIENVENIDO": 0.15
  };

  // --- 1. CATÁLOGO AMPLIADO DE 16 PRODUCTOS REALISTAS ---
  const PRODUCTS = [
    {
      id: 1,
      nombre: "iPhone 15 Pro 256GB Titanio",
      categoria: "tecnologia",
      precio: 1499.99,
      precioAntiguo: 1699.99,
      rating: 4.9,
      reviews: 128,
      badge: "OFERTA",
      badgeClass: "sale",
      imagen: "./assets/phone.jpg",
      descripcion: "Chasis de titanio de grado aeroespacial, chip A17 Pro, botón de acción personalizable y sistema de cámaras Pro con teleobjetivo 5x.",
      specs: [
        "Pantalla Super Retina XDR OLED de 6.1 pulgadas (120Hz ProMotion)",
        "Almacenamiento interno de 256 GB NVMe",
        "Conector USB-C con velocidad USB 3 (hasta 10 Gb/s)",
        "Garantía oficial Apple de 12 meses"
      ]
    },
    {
      id: 2,
      nombre: "Notebook HP Victus 15.6\" RTX",
      categoria: "tecnologia",
      precio: 1250.00,
      precioAntiguo: null,
      rating: 4.8,
      reviews: 94,
      badge: "DESTACADO",
      badgeClass: "neutral",
      imagen: "./assets/laptop.jpg",
      descripcion: "Equilibrio sólido entre potencia gráfica para diseño, desarrollo y gaming con pantalla de 144Hz y refrigeración OMEN Tempest.",
      specs: [
        "Procesador AMD Ryzen 5 serie 7000 Hexa-Core",
        "Placa de video NVIDIA GeForce RTX 4050 6GB GDDR6",
        "16 GB RAM DDR5 + 512 GB SSD PCIe Gen4",
        "Pantalla IPS Full HD 15.6\" antirreflejo a 144Hz"
      ]
    },
    {
      id: 7,
      nombre: "Auriculares Sony WH-1000XM5",
      categoria: "tecnologia",
      precio: 389.00,
      precioAntiguo: 430.00,
      rating: 4.9,
      reviews: 215,
      badge: "OFERTA",
      badgeClass: "sale",
      imagen: "./assets/headphones.jpg",
      descripcion: "Cancelación de ruido activa líder de la industria con 8 micrófonos, audio de alta resolución LDAC y hasta 30 horas de batería.",
      specs: [
        "Doble procesador QN1 + V1 para cancelación de ruido adaptativa",
        "Autonomía de 30 horas (carga rápida: 3 min dan 3 hs de uso)",
        "Conexión multipunto simultánea para notebook y celular",
        "Incluye estuche rígido plegable y cables originales"
      ]
    },
    {
      id: 8,
      nombre: "iPad Pro 11\" Chip M2 + Pencil",
      categoria: "tecnologia",
      precio: 980.00,
      precioAntiguo: null,
      rating: 4.9,
      reviews: 76,
      badge: "NUEVO",
      badgeClass: "new",
      imagen: "./assets/tablet.jpg",
      descripcion: "Rendimiento de estación de trabajo en formato portátil. Pantalla Liquid Retina con ProMotion, True Tone y gama cromática P3.",
      specs: [
        "Chip Apple M2 de 8 núcleos CPU y 10 núcleos GPU",
        "Capacidad de 256 GB + conectividad Wi-Fi 6E",
        "Incluye Apple Pencil de 2da generación magnético",
        "Cámaras Pro con escáner LiDAR para realidad aumentada"
      ]
    },
    {
      id: 9,
      nombre: "Parlante JBL Flip 6 Waterproof",
      categoria: "tecnologia",
      precio: 145.00,
      precioAntiguo: 170.00,
      rating: 4.8,
      reviews: 164,
      badge: "OFERTA",
      badgeClass: "sale",
      imagen: "./assets/speaker.jpg",
      descripcion: "Sonido potente JBL Original Pro de 2 vías con radiadores pasivos duales y certificación IP67 resistente al agua y al polvo.",
      specs: [
        "Woofer en forma de pista + tweeter independiente de 10W",
        "Hasta 12 horas de reproducción continua con una carga",
        "Certificación IP67 sumergible y apto para exteriores",
        "Función PartyBoost para vincular múltiples parlantes"
      ]
    },
    {
      id: 10,
      nombre: "Teclado Inalámbrico Aluminio",
      categoria: "tecnologia",
      precio: 115.00,
      precioAntiguo: null,
      rating: 4.7,
      reviews: 62,
      badge: "DESTACADO",
      badgeClass: "neutral",
      imagen: "./assets/keyboard.jpg",
      descripcion: "Chasis mecanizado en aluminio anodizado de perfil ultrabajo con mecanismo de tijera silencioso y batería recargable por USB-C.",
      specs: [
        "Compatibilidad nativa con macOS, Windows y Linux",
        "Batería interna de larga duración (hasta 60 días por carga)",
        "Distribución en español e inglés configurable",
        "Teclas de función multimedia y brillo dedicadas"
      ]
    },
    {
      id: 11,
      nombre: "Smartwatch Minimal GPS Sport",
      categoria: "tecnologia",
      precio: 260.00,
      precioAntiguo: null,
      rating: 4.6,
      reviews: 53,
      badge: "NUEVO",
      badgeClass: "new",
      imagen: "./assets/watch.jpg",
      descripcion: "Reloj inteligente con caja ultraliviana, GPS multibanda integrado, monitoreo continuo de frecuencia cardíaca y malla de silicona hipoalergénica.",
      specs: [
        "Pantalla AMOLED de alto brillo legible bajo sol directo",
        "GPS integrado + sensor de saturación de oxígeno SpO2",
        "Resistencia al agua 5 ATM (apto natación)",
        "Autonomía de 10 días en modo smartwatch"
      ]
    },
    {
      id: 3,
      nombre: "Zapatillas Nike Air Max Excee",
      categoria: "moda",
      precio: 180.50,
      precioAntiguo: 210.00,
      rating: 4.8,
      reviews: 142,
      badge: "OFERTA",
      badgeClass: "sale",
      imagen: "./assets/shoes.jpg",
      descripcion: "Inspiradas en las icónicas Air Max 90, combinan capellada de malla respirable y cuero genuino con unidad de cámara de aire visible.",
      specs: [
        "Amortiguación Air-Sole visible a través de 3 ventanas",
        "Capellada de cuero natural y mesh de alta resistencia",
        "Suela de goma con almohadillas de tracción urbana",
        "Numeración disponible del 38 al 45 AR"
      ]
    },
    {
      id: 4,
      nombre: "Camiseta Boca Juniors Titular",
      categoria: "moda",
      precio: 110.00,
      precioAntiguo: null,
      rating: 4.9,
      reviews: 310,
      badge: "NUEVO",
      badgeClass: "new",
      imagen: "./assets/tshirt.jpg",
      descripcion: "Camiseta oficial titular confeccionada con tejido técnico transpirable AEROREADY y escudo bordado de alta definición.",
      specs: [
        "Tecnología de absorción de humedad AEROREADY",
        "Confeccionada 100% en poliéster reciclado Primegreen",
        "Escudo del club y logo bordados en pecho",
        "Talles disponibles: S, M, L, XL y XXL"
      ]
    },
    {
      id: 12,
      nombre: "Mochila Urbana Porta Notebook 16\"",
      categoria: "moda",
      precio: 89.00,
      precioAntiguo: 108.00,
      rating: 4.8,
      reviews: 88,
      badge: "OFERTA",
      badgeClass: "sale",
      imagen: "./assets/backpack.jpg",
      descripcion: "Mochila técnica de cordura impermeable con compartimento acolchado independiente para notebooks de hasta 16 pulgadas y bolsillo antirrobo.",
      specs: [
        "Tela Cordura 900D repelente al agua con cierres sellados",
        "División acolchada suspendida para laptop de 16\"",
        "Espaldar ergonómico con flujo de aire y tira para valija",
        "Capacidad de 24 litros ideal para uso diario o viaje"
      ]
    },
    {
      id: 13,
      nombre: "Campera Bomber Impermeable",
      categoria: "moda",
      precio: 165.00,
      precioAntiguo: null,
      rating: 4.7,
      reviews: 49,
      badge: "NUEVO",
      badgeClass: "new",
      imagen: "./assets/jacket.jpg",
      descripcion: "Corte clásico aviador renovado con tejido exterior cortavientos resistente a lloviznas, puños tejidos acanalados y bolsillo utilitario en manga.",
      specs: [
        "Exterior 100% nylon técnico de alta densidad",
        "Forrería interna suave con bolsillo oculto con cierre",
        "Cierre frontal metálico YKK de doble deslizador",
        "Talles disponibles: S, M, L y XL"
      ]
    },
    {
      id: 14,
      nombre: "Lentes de Sol Armazón Metálico",
      categoria: "moda",
      precio: 92.00,
      precioAntiguo: null,
      rating: 4.7,
      reviews: 67,
      badge: "DESTACADO",
      badgeClass: "neutral",
      imagen: "./assets/sunglasses.jpg",
      descripcion: "Diseño atemporal con montura de acero inoxidable dorado liviano y cristales orgánicos polarizados con protección total UV400.",
      specs: [
        "Filtro UV400 certificado contra radiación UVA y UVB",
        "Lentes polarizados antirreflejo categoría 3",
        "Plaquetas nasales de silicona ajustables",
        "Incluye estuche rígido y paño de microfibra"
      ]
    },
    {
      id: 5,
      nombre: "Sofá Escandinavo 2 Cuerpos Lino",
      categoria: "hogar",
      precio: 790.00,
      precioAntiguo: 920.00,
      rating: 4.9,
      reviews: 41,
      badge: "OFERTA",
      badgeClass: "sale",
      imagen: "./assets/sofa.jpg",
      descripcion: "Estructura maciza de madera saligna estacionada con almohadones de placa soft de alta densidad y tapizado en lino antimanchas.",
      specs: [
        "Medidas: 165 cm de ancho x 88 cm de profundidad x 82 cm alto",
        "Asientos en espuma de poliuretano de 28 kg/m³ con memoria",
        "Fundas con cierre oculto desmontables y lavables",
        "Patas de madera maciza con regatones protectores"
      ]
    },
    {
      id: 15,
      nombre: "Sillón Individual Capitonnée",
      categoria: "hogar",
      precio: 410.00,
      precioAntiguo: null,
      rating: 4.8,
      reviews: 34,
      badge: "NUEVO",
      badgeClass: "new",
      imagen: "./assets/chair.jpg",
      descripcion: "Butaca de lectura y recepción con respaldo capitonnée artesanal, tapizado en pana antimanchas color marfil y patas torneadas.",
      specs: [
        "Medidas: 74 cm ancho x 72 cm profundidad x 84 cm alto",
        "Tapizado en pana sintética con tratamiento hidro-repelente",
        "Estructura reforzada con cinchas elásticas importadas",
        "Listo para usar (no requiere ensamblado)"
      ]
    },
    {
      id: 16,
      nombre: "Mesa de Luz Nórdica Madera",
      categoria: "hogar",
      precio: 235.00,
      precioAntiguo: 275.00,
      rating: 4.8,
      reviews: 58,
      badge: "OFERTA",
      badgeClass: "sale",
      imagen: "./assets/table.jpg",
      descripcion: "Mesa auxiliar y de dormitorio fabricada en madera maciza de paraíso con bordes redondeados, doble estante abierto y acabado en laca poliuretánica mate.",
      specs: [
        "Medidas: 52 cm ancho x 40 cm profundidad x 60 cm alto",
        "Madera de paraíso seleccionada con veta natural a la vista",
        "Protección con laca mate resistente a líquidos",
        "Diseño escandinavo de ensamble invisible"
      ]
    },
    {
      id: 6,
      nombre: "Lámpara Decorativa Lava Retro",
      categoria: "hogar",
      precio: 75.00,
      precioAntiguo: 95.00,
      rating: 4.6,
      reviews: 83,
      badge: "OFERTA",
      badgeClass: "sale",
      imagen: "./assets/lamp.jpg",
      descripcion: "Iluminación ambiental cálida para escritorios y livings con cuerpo de aluminio anodizado negro mate y botella de vidrio templado.",
      specs: [
        "Altura total de 42 cm con base estable antideslizante",
        "Incluye lámpara reflectora R39 de 30W (220V directo)",
        "Cable textil reforzado con interruptor de encendido",
        "Tiempo de fluidez óptima entre 45 y 60 minutos"
      ]
    }
  ];

  // Sincronizar catálogo en localStorage para el CRM
  try {
    localStorage.setItem("mt_products", JSON.stringify(PRODUCTS));
  } catch (e) {
    // ignore storage quota errors
  }

  // --- 2. ESTADO DE LA APLICACIÓN ---
  let carrito = JSON.parse(localStorage.getItem("mt_carrito")) || [];
  let favoritos = JSON.parse(localStorage.getItem("mt_favoritos")) || [];
  let currentUser = JSON.parse(localStorage.getItem("mt_currentUser")) || null;

  let activeCategory = "all";
  let searchQuery = "";
  let currentSort = "featured";
  let costoEnvio = 10.00;
  let descuentoAplicado = 0;

  // --- 3. REFERENCIAS DOM ---
  const productosContainer = document.getElementById("productos-container");
  const totalCountSpan = document.getElementById("total-products-count");
  const categoryTabs = document.querySelectorAll(".cat-tab");
  const searchInput = document.getElementById("search-input");
  const sortSelect = document.getElementById("sort-select");

  const iconoCarrito = document.getElementById("icono-carrito");
  const carritoContador = document.getElementById("carrito-contador");
  const carritoSidebar = document.getElementById("carrito-sidebar");
  const cartBackdrop = document.getElementById("cart-backdrop");

  const iconoFavoritos = document.getElementById("icono-favoritos");
  const favoritosContador = document.getElementById("favoritos-contador");

  const modalProducto = document.getElementById("modal-producto");
  const modalCheckout = document.getElementById("modal-checkout");
  const modalPago = document.getElementById("modal-pago");

  const hamburgerBtn = document.getElementById("hamburger-btn");
  const mobileMenu = document.getElementById("mobile-menu");
  const cerrarMenuMovilBtn = document.getElementById("cerrar-menu-movil");
  const toastContainer = document.getElementById("toast-container");

  // --- 4. NOTIFICACIONES TOAST SOBRIAS ---
  function showToast(message, iconClass = "fa-check") {
    if (!toastContainer) return;
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `<i class="fas ${iconClass}"></i><span>${message}</span>`;
    toastContainer.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("show"));
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 250);
    }, 3000);
  }

  // --- 5. RENDERIZADO DEL CATÁLOGO (GRILLA DE 4 COLUMNAS) ---
  function getCategoryLabel(cat) {
    const labels = {
      tecnologia: "Tecnología",
      moda: "Indumentaria",
      hogar: "Hogar y Deco"
    };
    return labels[cat] || cat;
  }

  function renderProducts() {
    if (!productosContainer) return;

    let filtered = PRODUCTS.filter(p => {
      const matchCat =
        activeCategory === "all" ||
        (activeCategory === "ofertas" && p.precioAntiguo && p.precioAntiguo > p.precio) ||
        p.categoria === activeCategory;

      const matchSearch =
        !searchQuery ||
        p.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.descripcion.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.categoria.toLowerCase().includes(searchQuery.toLowerCase());

      return matchCat && matchSearch;
    });

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
      totalCountSpan.textContent = `Mostrando ${filtered.length} producto${filtered.length === 1 ? "" : "s"} disponible${filtered.length === 1 ? "" : "s"}`;
    }

    if (filtered.length === 0) {
      productosContainer.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 3.5rem 1rem; border: 1px solid var(--border-color); background: var(--bg-subtle);">
          <i class="fas fa-search" style="font-size: 2rem; color: var(--text-muted); margin-bottom: 0.75rem;"></i>
          <h3 style="color: var(--text-black); font-size: 1.15rem; margin-bottom: 0.35rem;">No encontramos productos con ese criterio</h3>
          <p style="color: var(--text-muted); font-size: 0.88rem;">Probá buscando con otra palabra clave o seleccionando "Todos".</p>
        </div>
      `;
      return;
    }

    productosContainer.innerHTML = filtered.map((item, idx) => {
      const isFav = favoritos.includes(item.id);
      return `
        <article class="producto" data-id="${item.id}" style="animation-delay: ${idx * 35}ms">
          <div class="product-image-wrap">
            <img src="${item.imagen}" alt="${item.nombre}" loading="lazy" />
            ${item.badge ? `<span class="product-badge ${item.badgeClass}">${item.badge}</span>` : ""}
            <button class="btn-wishlist ${isFav ? "active" : ""}" data-id="${item.id}" aria-label="Guardar en favoritos" title="Guardar en favoritos">
              <i class="${isFav ? "fas" : "far"} fa-heart"></i>
            </button>
          </div>
          <div class="product-details">
            <span class="product-category-tag">${getCategoryLabel(item.categoria)}</span>
            <h3>${item.nombre}</h3>
            <p class="product-short-desc">${item.descripcion}</p>

            <div class="rating-stars" aria-label="Calificación ${item.rating} de 5">
              ${renderStars(item.rating)}
              <span class="rating-count">(${item.reviews})</span>
            </div>

            <div class="product-price-row">
              <span class="precio">$${item.precio.toFixed(2)}</span>
              ${item.precioAntiguo ? `<span class="precio-antiguo">$${item.precioAntiguo.toFixed(2)}</span>` : ""}
            </div>

            <div class="product-card-actions">
              <button class="btn-quick-add" data-id="${item.id}">
                <i class="fas fa-plus"></i>
                <span>Sumar al carrito</span>
              </button>
              <button class="ver-detalles" data-id="${item.id}" aria-label="Ver ficha técnica" title="Ver ficha técnica">
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

  function activateCategoryFilter(cat) {
    activeCategory = cat;
    categoryTabs.forEach(t => {
      t.classList.toggle("active", t.dataset.category === cat);
    });
    renderProducts();
  }

  categoryTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      activateCategoryFilter(tab.dataset.category);
    });
  });

  // Accesos rápidos de categoría (Navbar, Hero, Icon Strip, Footer)
  document.querySelectorAll("[data-QuickCat]").forEach(el => {
    el.addEventListener("click", (e) => {
      const cat = el.getAttribute("data-QuickCat");
      if (cat) {
        activateCategoryFilter(cat);
        const target = document.getElementById("productos");
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth" });
        }
        if (mobileMenu) {
          mobileMenu.classList.remove("abierto");
          document.body.style.overflow = "";
        }
      }
    });
  });

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim();
      renderProducts();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      currentSort = e.target.value;
      renderProducts();
    });
  }

  // --- 6. FAVORITOS (WISHLIST) ---
  function updateWishlistBadge() {
    if (!favoritosContador) return;
    favoritosContador.textContent = favoritos.length;
    favoritosContador.classList.toggle("visible", favoritos.length > 0);
  }

  function toggleWishlist(productId) {
    const id = parseInt(productId, 10);
    const idx = favoritos.indexOf(id);
    const prod = PRODUCTS.find(p => p.id === id);
    if (!prod) return;

    if (idx === -1) {
      favoritos.push(id);
      showToast(`"${prod.nombre}" guardado en favoritos`, "fa-heart");
    } else {
      favoritos.splice(idx, 1);
      showToast(`"${prod.nombre}" quitado de favoritos`, "fa-heart");
    }
    localStorage.setItem("mt_favoritos", JSON.stringify(favoritos));
    updateWishlistBadge();
    renderProducts();
  }

  if (iconoFavoritos) {
    iconoFavoritos.addEventListener("click", () => {
      if (favoritos.length === 0) {
        showToast("Todavía no guardaste productos en favoritos", "fa-heart");
        return;
      }
      categoryTabs.forEach(t => t.classList.remove("active"));
      const favProducts = PRODUCTS.filter(p => favoritos.includes(p.id));
      if (totalCountSpan) {
        totalCountSpan.textContent = `Mostrando ${favProducts.length} favorito${favProducts.length === 1 ? "" : "s"}`;
      }
      productosContainer.innerHTML = favProducts.map(item => `
        <article class="producto" data-id="${item.id}">
          <div class="product-image-wrap">
            <img src="${item.imagen}" alt="${item.nombre}" />
            <button class="btn-wishlist active" data-id="${item.id}"><i class="fas fa-heart"></i></button>
          </div>
          <div class="product-details">
            <span class="product-category-tag">${getCategoryLabel(item.categoria)}</span>
            <h3>${item.nombre}</h3>
            <p class="product-short-desc">${item.descripcion}</p>
            <div class="product-price-row"><span class="precio">$${item.precio.toFixed(2)}</span></div>
            <div class="product-card-actions">
              <button class="btn-quick-add" data-id="${item.id}"><i class="fas fa-plus"></i><span>Sumar al carrito</span></button>
              <button class="ver-detalles" data-id="${item.id}"><i class="fas fa-eye"></i></button>
            </div>
          </div>
        </article>
      `).join("");
      document.getElementById("productos")?.scrollIntoView({ behavior: "smooth" });
      showToast("Mostrando tu selección de favoritos", "fa-heart");
    });
  }

  // --- 7. CARRITO DE COMPRAS ---
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
    showToast(`"${prod.nombre}" sumado al carrito`, "fa-shopping-bag");
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
    const faltante = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal).toFixed(2);

    carritoSidebar.innerHTML = `
      <div class="carrito-header">
        <h2><i class="fas fa-shopping-bag" style="color:var(--color-primary)"></i> Tu Carrito</h2>
        <button class="cerrar-modal cerrar-carrito-btn" aria-label="Cerrar carrito"><i class="fas fa-xmark"></i></button>
      </div>

      <div class="free-shipping-ticker">
        <div class="shipping-progress-text">
          ${subtotal >= FREE_SHIPPING_THRESHOLD
            ? 'Contás con <strong>Envío sin cargo</strong> bonificado en tu pedido'
            : `Sumá <strong>$${faltante}</strong> más para acceder a <strong>Envío sin cargo</strong>`}
        </div>
        <div class="progress-bar-bg">
          <div class="progress-bar-fill" style="width: ${progressPct}%"></div>
        </div>
      </div>

      <div class="carrito-items">
        ${carrito.length === 0 ? `
          <div class="cart-empty-view">
            <i class="fas fa-shopping-bag"></i>
            <h4 style="color:var(--text-black); margin-bottom:0.35rem;">Tu carrito está vacío</h4>
            <p style="font-size:0.84rem;">Recorré el catálogo y sumá los productos que quieras encargar.</p>
          </div>
        ` : carrito.map(item => `
          <div class="carrito-item" data-id="${item.id}">
            <img src="${item.imagen}" alt="${item.nombre}" />
            <div class="carrito-item-info">
              <h4>${item.nombre}</h4>
              <div class="carrito-item-price">$${(item.precio * item.cantidad).toFixed(2)}</div>
              <div class="item-actions">
                <button class="quantity-btn btn-qty-dec" data-id="${item.id}" aria-label="Restar unidad">-</button>
                <span class="quantity-number">${item.cantidad}</span>
                <button class="quantity-btn btn-qty-inc" data-id="${item.id}" aria-label="Sumar unidad">+</button>
              </div>
            </div>
            <button class="remover-item btn-remove-item" data-id="${item.id}" aria-label="Quitar producto">
              <i class="far fa-trash-alt"></i>
            </button>
          </div>
        `).join("")}
      </div>

      <div class="carrito-footer">
        <div class="cart-summary-line">
          <span>Subtotal (${carrito.reduce((s, i) => s + i.cantidad, 0)} art.)</span>
          <span style="font-weight:600; color:var(--text-black)">$${subtotal.toFixed(2)}</span>
        </div>
        <div class="cart-summary-line total">
          <span>Total estimado</span>
          <span style="color:var(--color-primary)">$${subtotal.toFixed(2)}</span>
        </div>
        <button id="btn-iniciar-compra" class="btn-primary-blue btn-full" ${carrito.length === 0 ? "disabled" : ""}>
          <span>Iniciar compra</span>
          <i class="fas fa-arrow-right"></i>
        </button>
      </div>
    `;
  }

  function openCart() {
    carritoSidebar?.classList.add("abierto");
    cartBackdrop?.classList.add("visible");
    document.body.style.overflow = "hidden";
  }

  function closeCart() {
    carritoSidebar?.classList.remove("abierto");
    cartBackdrop?.classList.remove("visible");
    document.body.style.overflow = "";
  }

  if (iconoCarrito) iconoCarrito.addEventListener("click", openCart);
  if (cartBackdrop) cartBackdrop.addEventListener("click", closeCart);

  if (carritoSidebar) {
    carritoSidebar.addEventListener("click", (e) => {
      if (e.target.closest(".cerrar-carrito-btn")) closeCart();
      const incBtn = e.target.closest(".btn-qty-inc");
      if (incBtn) modificarCantidad(incBtn.dataset.id, 1);
      const decBtn = e.target.closest(".btn-qty-dec");
      if (decBtn) modificarCantidad(decBtn.dataset.id, -1);
      const remBtn = e.target.closest(".btn-remove-item");
      if (remBtn) modificarCantidad(remBtn.dataset.id, -9999);
      const checkoutBtn = e.target.closest("#btn-iniciar-compra");
      if (checkoutBtn) {
        closeCart();
        openCheckoutModal();
      }
    });
  }

  // --- 8. MODAL FICHA DE PRODUCTO ---
  let selectedDetailProduct = null;

  function openDetailModal(productId) {
    const prod = PRODUCTS.find(p => p.id === parseInt(productId, 10));
    if (!prod || !modalProducto) return;

    selectedDetailProduct = prod;
    const imgEl = document.getElementById("modal-producto-img");
    if (imgEl) {
      imgEl.src = prod.imagen;
      imgEl.alt = prod.nombre;
    }
    const catEl = document.getElementById("modal-producto-cat");
    if (catEl) catEl.textContent = getCategoryLabel(prod.categoria).toUpperCase();
    document.getElementById("modal-producto-nombre").textContent = prod.nombre;
    document.getElementById("modal-producto-descripcion").textContent = prod.descripcion;
    document.getElementById("modal-producto-precio").textContent = `$${prod.precio.toFixed(2)}`;

    const specsContainer = document.getElementById("modal-producto-specs");
    if (specsContainer && prod.specs) {
      specsContainer.innerHTML = prod.specs
        .map(s => `<li><i class="fas fa-check" style="color:var(--color-primary);margin-right:8px"></i>${s}</li>`)
        .join("");
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

  // --- 9. CHECKOUT Y DATOS DE FACTURACIÓN ---
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
    const envioReal = subtotal >= FREE_SHIPPING_THRESHOLD && costoEnvio > 0 ? 0 : costoEnvio;
    const total = subtotal - descuento + envioReal;

    const itemsContainer = document.getElementById("resumen-items");
    if (itemsContainer) {
      itemsContainer.innerHTML = carrito.map(item => `
        <div style="display:flex; justify-content:space-between; font-size:0.84rem; color:var(--text-body); margin-bottom:0.4rem;">
          <span>${item.cantidad}x ${item.nombre}</span>
          <span style="font-weight:600; color:var(--text-black)">$${(item.precio * item.cantidad).toFixed(2)}</span>
        </div>
      `).join("");
    }

    document.getElementById("resumen-subtotal").textContent = `$${subtotal.toFixed(2)}`;
    document.getElementById("resumen-envio").textContent = envioReal === 0 ? "Bonificado ($0.00)" : `$${envioReal.toFixed(2)}`;

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
    if (currentUser && userLoginView) {
      userLoginView.classList.remove("hidden");
      document.getElementById("logged-in-user-name").textContent = currentUser.nombre;
      if (document.getElementById("checkout-nombre")) document.getElementById("checkout-nombre").value = currentUser.nombre || "";
      if (document.getElementById("checkout-email")) document.getElementById("checkout-email").value = currentUser.email || "";
      if (document.getElementById("checkout-codigo-pais")) document.getElementById("checkout-codigo-pais").value = currentUser.codigoPais || "+54";
      if (document.getElementById("checkout-telefono-num")) document.getElementById("checkout-telefono-num").value = currentUser.telefonoNum || "";
      if (document.getElementById("checkout-condicion-iva")) document.getElementById("checkout-condicion-iva").value = currentUser.condicionIva || "Consumidor Final";
      if (document.getElementById("checkout-doc-numero")) document.getElementById("checkout-doc-numero").value = currentUser.docNumero || "";
      if (document.getElementById("checkout-razon-social")) document.getElementById("checkout-razon-social").value = currentUser.razonSocial || "";
      if (document.getElementById("checkout-direccion")) document.getElementById("checkout-direccion").value = currentUser.direccion || "";
    }
  }

  const selectCondicionIva = document.getElementById("checkout-condicion-iva");
  const razonSocialContainer = document.getElementById("checkout-razon-social-container");
  if (selectCondicionIva && razonSocialContainer) {
    selectCondicionIva.addEventListener("change", (e) => {
      razonSocialContainer.style.display = e.target.value === "Responsable Inscripto" ? "block" : "none";
    });
  }

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

  document.querySelectorAll('input[name="delivery"]').forEach(radio => {
    radio.addEventListener("change", (e) => {
      const addressContainer = document.getElementById("delivery-address-container");
      costoEnvio = e.target.value === "shipping" ? 10.00 : 0;
      if (addressContainer) {
        addressContainer.classList.toggle("hidden", e.target.value !== "shipping");
      }
      actualizarResumenPedido();
    });
  });

  const aplicarCuponBtn = document.getElementById("aplicar-cupon-btn");
  if (aplicarCuponBtn) {
    aplicarCuponBtn.addEventListener("click", () => {
      const input = document.getElementById("cupon-input");
      const mensaje = document.getElementById("cupon-mensaje");
      const code = input.value.trim().toUpperCase();

      if (CUPONES[code]) {
        descuentoAplicado = CUPONES[code];
        mensaje.textContent = `Código "${code}" aplicado (${CUPONES[code] * 100}% de descuento)`;
        mensaje.className = "exito";
        showToast(`Código ${code} aplicado`, "fa-tag");
      } else {
        descuentoAplicado = 0;
        mensaje.textContent = "El código ingresado no es válido.";
        mensaje.className = "error";
      }
      actualizarResumenPedido();
    });
  }

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
        alert("Por favor ingresá tu número de celular (ej: 3512619874) para coordinar la entrega.");
        document.getElementById("checkout-telefono-num")?.focus();
        return;
      }
      if (condicionIva === "Responsable Inscripto" && !razonSocial) {
        alert("Para emitir Factura A como Responsable Inscripto es necesaria la Razón Social.");
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
          direccion: document.getElementById("checkout-direccion")?.value.trim() || ""
        };
        localStorage.setItem("mt_currentUser", JSON.stringify(currentUser));
      }

      modalCheckout.classList.remove("visible");
      openPaymentModal();
    });
  }

  // --- 10. PAGO Y REGISTRO AUTOMÁTICO EN EL PANEL CRM ---
  function openPaymentModal() {
    if (!modalPago) return;
    const formPago = document.getElementById("form-pago");
    const successView = document.getElementById("pago-success-view");
    const btnPagar = document.getElementById("btn-pagar-submit");
    if (formPago) formPago.style.display = "block";
    if (btnPagar) btnPagar.style.display = "inline-flex";
    if (successView) successView.style.display = "none";

    modalPago.classList.add("visible");
    document.body.style.overflow = "hidden";
  }

  const inputCardNum = document.getElementById("numero-tarjeta");
  const inputCardName = document.getElementById("nombre-tarjeta");
  const inputCardExp = document.getElementById("fecha-exp");
  const displayCardNum = document.getElementById("card-display-number");
  const displayCardName = document.getElementById("card-display-name");
  const displayCardExp = document.getElementById("card-display-exp");

  if (inputCardNum) {
    inputCardNum.addEventListener("input", (e) => {
      const val = e.target.value.replace(/\D/g, "").substring(0, 16);
      const formatted = val.match(/.{1,4}/g)?.join(" ") || "";
      e.target.value = formatted;
      if (displayCardNum) displayCardNum.textContent = formatted || "•••• •••• •••• ••••";
    });
  }

  if (inputCardName) {
    inputCardName.addEventListener("input", (e) => {
      if (displayCardName) displayCardName.textContent = e.target.value.toUpperCase() || "TITULAR DE LA TARJETA";
    });
  }

  if (inputCardExp) {
    inputCardExp.addEventListener("input", (e) => {
      let val = e.target.value.replace(/\D/g, "").substring(0, 4);
      if (val.length >= 2) val = val.substring(0, 2) + "/" + val.substring(2);
      e.target.value = val;
      if (displayCardExp) displayCardExp.textContent = val || "MM/AA";
    });
  }

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

        const nombreCliente = document.getElementById("checkout-nombre")?.value.trim() || "Cliente";
        const emailCliente = document.getElementById("checkout-email")?.value.trim() || "cliente@ejemplo.com";
        const codPais = document.getElementById("checkout-codigo-pais")?.value.trim() || "+54";
        const telNum = document.getElementById("checkout-telefono-num")?.value.trim() || "3512619874";
        const condicionIva = document.getElementById("checkout-condicion-iva")?.value || "Consumidor Final";
        const docNumero = document.getElementById("checkout-doc-numero")?.value.trim() || "38291044";
        const razonSocial = document.getElementById("checkout-razon-social")?.value.trim() || "";
        const direccionCliente = document.getElementById("checkout-direccion")?.value.trim() || "Av. Colón 1234, Córdoba";
        const tipoEntrega = document.querySelector('input[name="delivery"]:checked')?.value || "shipping";
        const cardNumRaw = document.getElementById("numero-tarjeta")?.value || "";
        const last4 = cardNumRaw.replace(/\s/g, "").slice(-4) || "8421";
        const cardHolder = document.getElementById("nombre-tarjeta")?.value || nombreCliente;

        const telefonoDisplay = formatDisplayPhone(codPais, telNum);
        const telefonoWhatsApp = formatWhatsAppPhone(codPais, telNum);
        const tipoFacturaSugerida = condicionIva === "Responsable Inscripto" ? "Factura A" : "Factura B";

        const subtotalNum = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
        const descNum = subtotalNum * descuentoAplicado;
        const envioFinal = subtotalNum >= FREE_SHIPPING_THRESHOLD && costoEnvio > 0 ? 0 : costoEnvio;
        const totalNum = subtotalNum - descNum + envioFinal;

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
            costo: envioFinal,
            direccion: tipoEntrega === "shipping" ? direccionCliente : "Retiro en Sucursal (Av. Colón 1234, Córdoba)"
          },
          pago: {
            metodo: "Tarjeta de Crédito",
            marca: "Visa",
            ultimos4: last4,
            titular: cardHolder,
            estado: "Aprobado",
            cuotas: 1
          },
          items: [...carrito],
          totales: {
            subtotal: subtotalNum,
            descuento: descNum,
            envio: envioFinal,
            total: totalNum
          },
          estado: "Pendiente"
        };

        try {
          const existingOrders = JSON.parse(localStorage.getItem("mt_orders")) || [];
          existingOrders.unshift(nuevaOrden);
          localStorage.setItem("mt_orders", JSON.stringify(existingOrders));

          if (window.BroadcastChannel) {
            const bc = new BroadcastChannel("mitienda_channel");
            bc.postMessage({ tipo: "NUEVA_ORDEN", orden: nuevaOrden });
            bc.close();
          }
        } catch (err) {
          console.warn("Error guardando orden:", err);
        }

        const btnNotificarWA = document.getElementById("btn-notificar-wa");
        if (btnNotificarWA) {
          const itemsSummary = carrito.map(i => `• ${i.cantidad}x ${i.nombre}`).join("%0A");
          const totalVal = `$${totalNum.toFixed(2)}`;
          const waMsg = `Hola, acabo de realizar un pedido en MiTienda.%0A%0A*Orden:* ${orderId}%0A*Cliente:* ${nombreCliente}%0A*DNI/CUIT:* ${docNumero}%0A*Comprobante:* ${tipoFacturaSugerida} (${condicionIva})%0A*Artículos:*%0A${itemsSummary}%0A%0A*Total:* ${totalVal}`;
          btnNotificarWA.href = `https://wa.me/5493512619874?text=${waMsg}`;
        }

        carrito = [];
        actualizarCarrito();
        showToast("Compra confirmada y registrada", "fa-check");
      }, 1200);
    });
  }

  // --- 11. CIERRE DE MODALES Y MENÚ MÓVIL ---
  document.querySelectorAll(".cerrar-modal").forEach(btn => {
    btn.addEventListener("click", () => {
      btn.closest(".modal")?.classList.remove("visible");
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
      if (mobileMenu) mobileMenu.classList.remove("abierto");
      document.body.style.overflow = "";
    }
  });

  if (hamburgerBtn && mobileMenu) {
    hamburgerBtn.addEventListener("click", () => {
      mobileMenu.classList.add("abierto");
      document.body.style.overflow = "hidden";
    });
  }
  if (cerrarMenuMovilBtn && mobileMenu) {
    cerrarMenuMovilBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("abierto");
      document.body.style.overflow = "";
    });
  }
  if (mobileMenu) {
    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) {
        mobileMenu.classList.remove("abierto");
        document.body.style.overflow = "";
      }
    });
  }

  // --- 12. FORMULARIO DE CONTACTO ---
  const formContacto = document.getElementById("form-contacto");
  if (formContacto) {
    formContacto.addEventListener("submit", (e) => {
      e.preventDefault();
      const nombre = document.getElementById("contacto-nombre")?.value.trim() || "";
      const email = document.getElementById("contacto-email")?.value.trim() || "";
      const mensaje = document.getElementById("contacto-mensaje")?.value.trim() || "";

      const waText = encodeURIComponent(
        `Hola Leo, te escribo desde MiTienda.\n\n*Nombre:* ${nombre}\n*Email:* ${email}\n\n*Consulta:* ${mensaje}`
      );
      window.open(`https://wa.me/5493512619874?text=${waText}`, "_blank");
      showToast("Abriendo consulta en WhatsApp...", "fa-paper-plane");
      formContacto.reset();
    });
  }

  // --- 13. TEMA CLARO / OSCURO (DARK MODE) ---
  const themeToggleBtn = document.getElementById("theme-toggle");

  function applyTheme(theme) {
    document.body.setAttribute("data-theme", theme);
    if (themeToggleBtn) {
      const icon = themeToggleBtn.querySelector("i");
      if (icon) {
        icon.className = theme === "dark" ? "fas fa-sun" : "fas fa-moon";
      }
      themeToggleBtn.title = theme === "dark" ? "Cambiar a modo claro" : "Cambiar a modo oscuro";
      themeToggleBtn.setAttribute("aria-label", themeToggleBtn.title);
    }
    try {
      localStorage.setItem("mt_theme", theme);
    } catch (e) {
      // ignore storage errors
    }
  }

  const savedTheme = localStorage.getItem("mt_theme") || "light";
  applyTheme(savedTheme);

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const current = document.body.getAttribute("data-theme") || "light";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      showToast(next === "dark" ? "Modo oscuro activado" : "Modo claro activado", next === "dark" ? "fa-moon" : "fa-sun");
    });
  }

  // --- 14. CARRUSEL DINÁMICO DEL HERO POR CATEGORÍAS ---
  const heroCarousel = document.getElementById("hero-carousel");
  const heroSlides = document.querySelectorAll(".hero-slide");
  const heroTabBtns = document.querySelectorAll(".hero-tab-btn");
  const heroPrevBtn = document.getElementById("hero-prev-btn");
  const heroNextBtn = document.getElementById("hero-next-btn");

  let currentSlideIdx = 0;
  let heroInterval = null;
  const HERO_SLIDE_DURATION = 5500;

  function goToHeroSlide(index) {
    if (!heroSlides.length) return;
    currentSlideIdx = (index + heroSlides.length) % heroSlides.length;

    heroSlides.forEach((slide, i) => {
      slide.classList.toggle("active", i === currentSlideIdx);
    });

    heroTabBtns.forEach((tab, i) => {
      const isActive = i === currentSlideIdx;
      tab.classList.toggle("active", isActive);
      // Reiniciar animación de barra de progreso
      const progressFill = tab.querySelector(".tab-progress-fill");
      if (progressFill) {
        progressFill.style.animation = "none";
        void progressFill.offsetWidth;
        progressFill.style.animation = isActive ? "" : "none";
      }
    });
  }

  function startHeroAutoPlay() {
    stopHeroAutoPlay();
    heroInterval = setInterval(() => {
      goToHeroSlide(currentSlideIdx + 1);
    }, HERO_SLIDE_DURATION);
  }

  function stopHeroAutoPlay() {
    if (heroInterval) {
      clearInterval(heroInterval);
      heroInterval = null;
    }
  }

  heroTabBtns.forEach(tab => {
    tab.addEventListener("click", () => {
      const idx = parseInt(tab.getAttribute("data-goto-slide"), 10);
      if (!isNaN(idx)) {
        goToHeroSlide(idx);
        startHeroAutoPlay();
      }
    });
  });

  if (heroPrevBtn) {
    heroPrevBtn.addEventListener("click", () => {
      goToHeroSlide(currentSlideIdx - 1);
      startHeroAutoPlay();
    });
  }

  if (heroNextBtn) {
    heroNextBtn.addEventListener("click", () => {
      goToHeroSlide(currentSlideIdx + 1);
      startHeroAutoPlay();
    });
  }

  if (heroCarousel) {
    heroCarousel.addEventListener("mouseenter", stopHeroAutoPlay);
    heroCarousel.addEventListener("mouseleave", startHeroAutoPlay);
    startHeroAutoPlay();
  }

  // --- 15. POPUP DE SUSCRIPCIÓN AL NEWSLETTER ---
  const modalNewsletter = document.getElementById("modal-newsletter");
  const formNewsletter = document.getElementById("form-newsletter");
  const newsletterFormView = document.getElementById("newsletter-form-view");
  const newsletterSuccessView = document.getElementById("newsletter-success-view");
  const btnDismissNewsletter = document.getElementById("btn-dismiss-newsletter");
  const btnApplyNewsletterCoupon = document.getElementById("btn-apply-newsletter-coupon");

  function openNewsletterModal() {
    if (!modalNewsletter) return;
    if (mobileMenu) mobileMenu.classList.remove("abierto");
    modalNewsletter.classList.add("visible");
    document.body.style.overflow = "hidden";
    try {
      sessionStorage.setItem("mt_newsletter_shown", "1");
    } catch (e) {
      // ignore
    }
  }

  function closeNewsletterModal() {
    if (!modalNewsletter) return;
    modalNewsletter.classList.remove("visible");
    document.body.style.overflow = "";
  }

  [
    "btn-open-newsletter-top",
    "btn-open-newsletter-mobile",
    "btn-open-newsletter-strip",
    "btn-open-newsletter-mid",
    "btn-open-newsletter-footer"
  ].forEach(btnId => {
    const el = document.getElementById(btnId);
    if (el) {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        openNewsletterModal();
      });
    }
  });

  if (btnDismissNewsletter) {
    btnDismissNewsletter.addEventListener("click", closeNewsletterModal);
  }

  if (formNewsletter) {
    formNewsletter.addEventListener("submit", (e) => {
      e.preventDefault();
      const email = document.getElementById("newsletter-email")?.value.trim();
      if (!email) return;

      const selectedCats = Array.from(formNewsletter.querySelectorAll('input[name="nl-cat"]:checked')).map(c => c.value);
      try {
        const subs = JSON.parse(localStorage.getItem("mt_newsletter_subs")) || [];
        subs.push({ email, categorias: selectedCats, fecha: new Date().toISOString() });
        localStorage.setItem("mt_newsletter_subs", JSON.stringify(subs));
      } catch (err) {
        // ignore
      }

      if (newsletterFormView) newsletterFormView.classList.add("hidden");
      if (newsletterSuccessView) newsletterSuccessView.classList.remove("hidden");
      showToast("Suscripción confirmada: cupón BIENVENIDO habilitado", "fa-envelope-open-text");
    });
  }

  if (btnApplyNewsletterCoupon) {
    btnApplyNewsletterCoupon.addEventListener("click", () => {
      descuentoAplicado = CUPONES["BIENVENIDO"] || 0.15;
      const cuponInput = document.getElementById("cupon-input");
      const cuponMensaje = document.getElementById("cupon-mensaje");
      if (cuponInput) cuponInput.value = "BIENVENIDO";
      if (cuponMensaje) {
        cuponMensaje.textContent = 'Código "BIENVENIDO" aplicado (15% de descuento)';
        cuponMensaje.className = "exito";
      }
      actualizarResumenPedido();
      closeNewsletterModal();
      showToast("Cupón BIENVENIDO (15% OFF) activado para tu compra", "fa-tag");
    });
  }

  // Mostrar popup de Newsletter automáticamente una vez por sesión tras 4 segundos (salvo ?no_popup=1)
  if (!window.location.search.includes("no_popup=1") && !sessionStorage.getItem("mt_newsletter_shown")) {
    setTimeout(() => {
      const anyModalOpen = document.querySelector(".modal.visible") || carritoSidebar?.classList.contains("abierto");
      if (!anyModalOpen) {
        openNewsletterModal();
      }
    }, 4000);
  }

  // --- 16. INICIALIZACIÓN ---
  renderProducts();
  updateWishlistBadge();
  actualizarCarrito();
});

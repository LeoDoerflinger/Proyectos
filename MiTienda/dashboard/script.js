/* ==========================================================================
   MITIENDA CRM & REAL-TIME ORDERS DASHBOARD — JAVASCRIPT CONTROLLER
   Live Order Ingestion, Analytics, Customer 360°, Status Manager & CSV Export
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  'use strict';

  // --- 1. DATOS SEMILLA REALISTAS (PARA INICIALIZAR SI NO HAY ÓRDENES) ---
  const SEED_ORDERS = [
    {
      id: "MT-894215",
      fecha: new Date(Date.now() - 15 * 60 * 1000).toISOString(), // Hace 15 min
      cliente: {
        nombre: "Valentina Rossi",
        email: "valentina.rossi@gmail.com",
        telefono: "+54 9 351 512-4488",
        direccion: "Bv. Chacabuco 640, Nueva Córdoba, Córdoba"
      },
      entrega: {
        tipo: "shipping",
        costo: 10.00,
        direccion: "Bv. Chacabuco 640, Piso 4B, Córdoba (CP 5000)"
      },
      pago: {
        metodo: "Tarjeta de Crédito Virtual",
        marca: "Visa Signature",
        ultimos4: "4589",
        titular: "VALENTINA ROSSI",
        estado: "Aprobado",
        cuotas: 3
      },
      items: [
        { id: 1, nombre: "iPhone 15 Pro", precio: 1499.99, cantidad: 1, imagen: "../assets/phone.jpg" }
      ],
      totales: {
        subtotal: 1499.99,
        descuento: 299.99, // Cupón 20%
        envio: 10.00,
        total: 1210.00
      },
      estado: "En Preparacion"
    },
    {
      id: "MT-741029",
      fecha: new Date(Date.now() - 95 * 60 * 1000).toISOString(), // Hace 1h 35m
      cliente: {
        nombre: "Mateo Fernández",
        email: "mateo.fernandez@yahoo.com.ar",
        telefono: "+54 9 3541 62-8811",
        direccion: "Av. San Martín 1420, Villa Carlos Paz, Córdoba"
      },
      entrega: {
        tipo: "pickup",
        costo: 0,
        direccion: "Retiro en Local Central (Av. Colón 1234, Córdoba)"
      },
      pago: {
        metodo: "Tarjeta de Crédito Virtual",
        marca: "Mastercard Black",
        ultimos4: "7812",
        titular: "MATEO FERNANDEZ",
        estado: "Aprobado",
        cuotas: 6
      },
      items: [
        { id: 2, nombre: "Laptop Gamer Victus", precio: 1250.00, cantidad: 1, imagen: "../assets/laptop.jpg" },
        { id: 3, nombre: "Zapatillas Nike Air Max", precio: 180.50, cantidad: 1, imagen: "../assets/shoes.jpg" }
      ],
      totales: {
        subtotal: 1430.50,
        descuento: 0,
        envio: 0,
        total: 1430.50
      },
      estado: "Enviado"
    },
    {
      id: "MT-632194",
      fecha: new Date(Date.now() - 240 * 60 * 1000).toISOString(), // Hace 4h
      cliente: {
        nombre: "Sofía Albarracín",
        email: "sofia.albarracin@outlook.com",
        telefono: "+54 9 358 419-7722",
        direccion: "Belgrano 410, Río Cuarto, Córdoba"
      },
      entrega: {
        tipo: "shipping",
        costo: 10.00,
        direccion: "Belgrano 410, Río Cuarto, Córdoba (CP 5800)"
      },
      pago: {
        metodo: "Tarjeta de Crédito Virtual",
        marca: "Visa Débito",
        ultimos4: "1934",
        titular: "SOFIA ALBARRACIN",
        estado: "Aprobado",
        cuotas: 1
      },
      items: [
        { id: 4, nombre: "Camiseta Boca Juniors 24", precio: 110.00, cantidad: 2, imagen: "../assets/tshirt.jpg" }
      ],
      totales: {
        subtotal: 220.00,
        descuento: 22.00,
        envio: 10.00,
        total: 208.00
      },
      estado: "Entregado"
    },
    {
      id: "MT-518290",
      fecha: new Date(Date.now() - 480 * 60 * 1000).toISOString(), // Hace 8h
      cliente: {
        nombre: "Valentina Rossi",
        email: "valentina.rossi@gmail.com",
        telefono: "+54 9 351 512-4488",
        direccion: "Bv. Chacabuco 640, Nueva Córdoba, Córdoba"
      },
      entrega: {
        tipo: "shipping",
        costo: 10.00,
        direccion: "Bv. Chacabuco 640, Piso 4B, Córdoba"
      },
      pago: {
        metodo: "Tarjeta de Crédito Virtual",
        marca: "Visa Signature",
        ultimos4: "4589",
        titular: "VALENTINA ROSSI",
        estado: "Aprobado",
        cuotas: 1
      },
      items: [
        { id: 6, nombre: "Lámpara de Lava Retro", precio: 75.00, cantidad: 1, imagen: "../assets/lamp.jpg" }
      ],
      totales: {
        subtotal: 75.00,
        descuento: 0,
        envio: 10.00,
        total: 85.00
      },
      estado: "Entregado"
    },
    {
      id: "MT-402911",
      fecha: new Date(Date.now() - 720 * 60 * 1000).toISOString(), // Hace 12h
      cliente: {
        nombre: "Lucas Benítez",
        email: "lucas.benitez@gmail.com",
        telefono: "+54 9 351 688-9900",
        direccion: "Av. Recta Martinolli 5800, Argüello, Córdoba"
      },
      entrega: {
        tipo: "shipping",
        costo: 10.00,
        direccion: "Av. Recta Martinolli 5800, Argüello, Córdoba (CP 5147)"
      },
      pago: {
        metodo: "Tarjeta de Crédito Virtual",
        marca: "Mastercard Gold",
        ultimos4: "3311",
        titular: "LUCAS BENITEZ",
        estado: "Aprobado",
        cuotas: 3
      },
      items: [
        { id: 5, nombre: "Sofá Minimalista 2 Cuerpos", precio: 790.00, cantidad: 1, imagen: "../assets/sofa.jpg" }
      ],
      totales: {
        subtotal: 790.00,
        descuento: 79.00,
        envio: 10.00,
        total: 721.00
      },
      estado: "Pendiente"
    }
  ];

  // --- 2. ESTADO GLOBAL DEL DASHBOARD ---
  let orders = JSON.parse(localStorage.getItem("mt_orders")) || [];
  if (orders.length === 0) {
    orders = [...SEED_ORDERS];
    localStorage.setItem("mt_orders", JSON.stringify(orders));
  }

  let activeView = "orders"; // "orders" o "crm"
  let searchQuery = "";
  let statusFilter = "all";
  let deliveryFilter = "all";
  let selectedOrder = null;

  // --- 3. REFERENCIAS DOM ---
  const DOM = {
    // Topbar & Nav
    themeToggle: document.getElementById("theme-toggle"),
    btnSimulateOrder: document.getElementById("btn-simulate-order"),
    sidebarToggle: document.getElementById("sidebar-toggle"),
    sidebar: document.getElementById("admin-sidebar"),
    navOrdersLink: document.getElementById("nav-orders-link"),
    navCrmLink: document.getElementById("nav-crm-link"),
    ordersCountBadge: document.getElementById("orders-count-badge"),
    customersCountBadge: document.getElementById("customers-count-badge"),

    // Vistas principales
    ordersViewSection: document.getElementById("orders-view-section"),
    crmViewSection: document.getElementById("crm-view-section"),

    // KPIs
    kpiTotalRevenue: document.getElementById("kpi-total-revenue"),
    kpiTotalOrders: document.getElementById("kpi-total-orders"),
    kpiTodayOrders: document.getElementById("kpi-today-orders"),
    kpiTotalCustomers: document.getElementById("kpi-total-customers"),
    kpiRecurrenceRate: document.getElementById("kpi-recurrence-rate"),
    kpiAvgTicket: document.getElementById("kpi-avg-ticket"),

    // Tabla de Órdenes
    ordersTableBody: document.getElementById("orders-table-body"),
    orderSearchInput: document.getElementById("order-search-input"),
    orderStatusFilter: document.getElementById("order-status-filter"),
    orderDeliveryFilter: document.getElementById("order-delivery-filter"),
    btnExportCsv: document.getElementById("btn-export-csv"),

    // Vista CRM
    customerCardsGrid: document.getElementById("customer-cards-grid"),

    // Slide-over Drawer Detalle de Orden
    slideoverBackdrop: document.getElementById("slideover-backdrop"),
    slideoverPanel: document.getElementById("slideover-panel"),
    btnCloseSlideover: document.getElementById("btn-close-slideover"),
    detailOrderId: document.getElementById("detail-order-id"),
    detailOrderDate: document.getElementById("detail-order-date"),
    detailOrderStatusSelect: document.getElementById("detail-order-status-select"),

    // Contenido del Drawer
    detailClientName: document.getElementById("detail-client-name"),
    detailClientEmail: document.getElementById("detail-client-email"),
    detailClientPhone: document.getElementById("detail-client-phone"),
    detailClientBadge: document.getElementById("detail-client-badge"),
    detailClientOrdersCount: document.getElementById("detail-client-orders-count"),
    detailClientLtv: document.getElementById("detail-client-ltv"),

    detailPaymentMethod: document.getElementById("detail-payment-method"),
    detailPaymentCard: document.getElementById("detail-payment-card"),
    detailPaymentHolder: document.getElementById("detail-payment-holder"),
    detailPaymentInstallments: document.getElementById("detail-payment-installments"),
    detailPaymentStatus: document.getElementById("detail-payment-status"),

    detailDeliveryType: document.getElementById("detail-delivery-type"),
    detailDeliveryAddress: document.getElementById("detail-delivery-address"),
    detailDeliveryTracking: document.getElementById("detail-delivery-tracking"),

    detailItemsList: document.getElementById("detail-items-list"),
    detailSubtotal: document.getElementById("detail-subtotal"),
    detailDiscount: document.getElementById("detail-discount"),
    detailShippingCost: document.getElementById("detail-shipping-cost"),
    detailTotalAmount: document.getElementById("detail-total-amount"),

    btnPrintReceipt: document.getElementById("btn-print-receipt"),
    btnContactWa: document.getElementById("btn-contact-customer-wa"),

    // Modal Cliente 360°
    customerModal: document.getElementById("customer-modal"),
    customerModalBody: document.getElementById("customer-modal-body"),
    btnCloseCustomerModal: document.getElementById("btn-close-customer-modal"),

    // Toast Container
    toastContainer: document.getElementById("toast-container")
  };

  // --- 4. TEMA OSCURO / CLARO ---
  function initTheme() {
    const saved = localStorage.getItem("mt_admin_theme") || "dark"; // Default dark mode para admin ejecutivo
    document.body.setAttribute("data-theme", saved);
    if (DOM.themeToggle) {
      DOM.themeToggle.querySelector("i").className = saved === "dark" ? "fas fa-sun" : "fas fa-moon";
    }
  }

  if (DOM.themeToggle) {
    DOM.themeToggle.addEventListener("click", () => {
      const isDark = document.body.getAttribute("data-theme") === "dark";
      const newTheme = isDark ? "light" : "dark";
      document.body.setAttribute("data-theme", newTheme);
      localStorage.setItem("mt_admin_theme", newTheme);
      DOM.themeToggle.querySelector("i").className = newTheme === "dark" ? "fas fa-sun" : "fas fa-moon";
      showToast(newTheme === "dark" ? "Modo oscuro activado" : "Modo claro activado", "fa-moon");
    });
  }

  // --- 5. AUDIO CHIME DE NOTIFICACIÓN DE COMPRA ---
  function playPurchaseChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;

      const playTone = (freq, start, duration) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, now + start);
        gain.gain.setValueAtTime(0, now + start);
        gain.gain.linearRampToValueAtTime(0.2, now + start + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.001, now + start + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + start);
        osc.stop(now + start + duration);
      };

      // Tono triunfal de compra (G5 -> C6)
      playTone(783.99, 0, 0.25);
      playTone(1046.50, 0.18, 0.45);
    } catch (e) {}
  }

  // Helper Toast
  function showToast(msg, icon = "fa-check-circle") {
    if (!DOM.toastContainer) return;
    const toast = document.createElement("div");
    toast.className = "toast-msg";
    toast.innerHTML = `<i class="fas ${icon}" style="color:var(--color-primary)"></i><span>${msg}</span>`;
    DOM.toastContainer.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("show"));

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 350);
    }, 3200);
  }

  // --- 6. CÁLCULO DE MÉTRICAS & PERFILES CRM ---
  function calcularEstadisticasClientes() {
    const clientesMap = {};

    orders.forEach(order => {
      const email = order.cliente.email.toLowerCase().trim();
      if (!clientesMap[email]) {
        clientesMap[email] = {
          nombre: order.cliente.nombre,
          email: order.cliente.email,
          telefono: order.cliente.telefono,
          direccion: order.cliente.direccion,
          ordenesCount: 0,
          totalGastado: 0,
          ordenes: []
        };
      }
      clientesMap[email].ordenesCount += 1;
      clientesMap[email].totalGastado += order.totales.total;
      clientesMap[email].ordenes.push(order);
    });

    return Object.values(clientesMap);
  }

  function getClientBadge(ordersCount, totalGastado) {
    if (ordersCount >= 3 || totalGastado >= 1000) {
      return { texto: "⭐ VIP", clase: "vip" };
    }
    if (ordersCount >= 2) {
      return { texto: "🔄 Recurrente", clase: "recurrente" };
    }
    return { texto: "🌱 Nuevo", clase: "nuevo" };
  }

  function formatMoney(amount) {
    return "$" + Number(amount).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }

  function formatFecha(isoString) {
    const d = new Date(isoString);
    return d.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" }) +
      " " + d.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
  }

  function actualizarKPIs() {
    const totalRev = orders.reduce((acc, o) => acc + o.totales.total, 0);
    const totalOrdersCount = orders.length;

    const hoyInicio = new Date().setHours(0, 0, 0, 0);
    const ordersTodayCount = orders.filter(o => new Date(o.fecha).getTime() >= hoyInicio).length;

    const clientesList = calcularEstadisticasClientes();
    const clientesCount = clientesList.length;
    const recurrentesCount = clientesList.filter(c => c.ordenesCount > 1).length;
    const tasaRecurrencia = clientesCount > 0 ? Math.round((recurrentesCount / clientesCount) * 100) : 0;

    const avgTicket = totalOrdersCount > 0 ? (totalRev / totalOrdersCount) : 0;

    if (DOM.kpiTotalRevenue) DOM.kpiTotalRevenue.textContent = formatMoney(totalRev);
    if (DOM.kpiTotalOrders) DOM.kpiTotalOrders.textContent = totalOrdersCount;
    if (DOM.kpiTodayOrders) DOM.kpiTodayOrders.textContent = `${ordersTodayCount} hoy`;
    if (DOM.kpiTotalCustomers) DOM.kpiTotalCustomers.textContent = clientesCount;
    if (DOM.kpiRecurrenceRate) DOM.kpiRecurrenceRate.textContent = `${tasaRecurrencia}% recurrentes`;
    if (DOM.kpiAvgTicket) DOM.kpiAvgTicket.textContent = formatMoney(avgTicket);

    if (DOM.ordersCountBadge) DOM.ordersCountBadge.textContent = totalOrdersCount;
    if (DOM.customersCountBadge) DOM.customersCountBadge.textContent = clientesCount;
  }

  // --- 7. RENDERIZADO DE TABLA DE ÓRDENES EN TIEMPO REAL ---
  function getFilteredOrders() {
    let list = [...orders];

    if (statusFilter !== "all") {
      list = list.filter(o => o.estado.toLowerCase().replace(/\s/g, '') === statusFilter.toLowerCase().replace(/\s/g, ''));
    }

    if (deliveryFilter !== "all") {
      list = list.filter(o => o.entrega.tipo === deliveryFilter);
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(o =>
        o.id.toLowerCase().includes(q) ||
        o.cliente.nombre.toLowerCase().includes(q) ||
        o.cliente.email.toLowerCase().includes(q) ||
        o.items.some(i => i.nombre.toLowerCase().includes(q))
      );
    }

    return list;
  }

  function getStatusBadgeClass(estado) {
    switch (estado.toLowerCase()) {
      case "pendiente": return "pendiente";
      case "en preparacion": return "preparacion";
      case "enviado": return "enviado";
      case "entregado": return "entregado";
      case "cancelado": return "cancelado";
      default: return "pendiente";
    }
  }

  function renderOrdersTable() {
    if (!DOM.ordersTableBody) return;
    const filtered = getFilteredOrders();

    if (filtered.length === 0) {
      DOM.ordersTableBody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align:center; padding:3rem; color:var(--text-muted);">
            <i class="fas fa-inbox" style="font-size:2rem; margin-bottom:0.6rem; opacity:0.5; display:block;"></i>
            No se encontraron compras con los filtros seleccionados.
          </td>
        </tr>
      `;
      return;
    }

    const clientesStats = calcularEstadisticasClientes();
    const statsMap = {};
    clientesStats.forEach(c => statsMap[c.email.toLowerCase()] = c);

    DOM.ordersTableBody.innerHTML = filtered.map(order => {
      const clientEmail = order.cliente.email.toLowerCase();
      const stat = statsMap[clientEmail] || { ordenesCount: 1, totalGastado: order.totales.total };
      const badge = getClientBadge(stat.ordenesCount, stat.totalGastado);

      return `
        <tr>
          <td>
            <strong style="font-family:var(--font-mono); color:var(--color-primary);">${order.id}</strong>
            <div style="font-size:0.72rem; color:var(--text-muted);">${formatFecha(order.fecha)}</div>
          </td>
          <td>
            <div style="font-weight:700;">${order.cliente.nombre}</div>
            <div style="display:flex; align-items:center; gap:0.4rem; margin-top:0.2rem;">
              <span class="customer-badge ${badge.clase}">${badge.texto}</span>
              <span style="font-size:0.7rem; color:var(--text-muted);">(${stat.ordenesCount} ${stat.ordenesCount === 1 ? 'pedido' : 'pedidos'})</span>
            </div>
          </td>
          <td>
            <div style="display:flex; align-items:center; gap:0.45rem;">
              <i class="fas ${order.entrega.tipo === 'shipping' ? 'fa-truck' : 'fa-store'}" style="color:var(--text-muted);"></i>
              <span style="font-weight:600; font-size:0.8rem;">${order.entrega.tipo === 'shipping' ? 'Envío a Domicilio' : 'Retiro en Local'}</span>
            </div>
            <div style="font-size:0.72rem; color:var(--text-muted); max-width:200px; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">
              ${order.entrega.direccion}
            </div>
          </td>
          <td>
            <div style="display:flex; align-items:center; gap:0.4rem;">
              <i class="fab fa-cc-visa" style="color:var(--color-primary); font-size:1.1rem;"></i>
              <span style="font-family:var(--font-mono); font-size:0.78rem;">•••• ${order.pago.ultimos4 || '4242'}</span>
            </div>
            <span style="font-size:0.7rem; color:var(--color-success); font-weight:700;">● ${order.pago.estado}</span>
          </td>
          <td>
            <div style="font-size:0.8rem; font-weight:600;">${order.items.length} ${order.items.length === 1 ? 'producto' : 'productos'}</div>
            <div style="font-size:0.72rem; color:var(--text-muted); max-width:160px; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">
              ${order.items.map(i => `${i.cantidad}x ${i.nombre}`).join(', ')}
            </div>
          </td>
          <td>
            <span style="font-family:var(--font-mono); font-weight:800; font-size:0.95rem;">${formatMoney(order.totales.total)}</span>
          </td>
          <td>
            <span class="status-badge ${getStatusBadgeClass(order.estado)}">
              ● ${order.estado}
            </span>
          </td>
          <td style="text-align:right;">
            <button class="btn-table-action" data-order-id="${order.id}">
              <i class="fas fa-eye"></i> Detalle
            </button>
          </td>
        </tr>
      `;
    }).join('');

    // Event listener para botones de detalle
    DOM.ordersTableBody.querySelectorAll(".btn-table-action").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-order-id");
        abrirDetalleOrden(id);
      });
    });
  }

  // --- 8. RENDERIZADO DE VISTA CRM DE CLIENTES ---
  function renderCrmView() {
    if (!DOM.customerCardsGrid) return;
    const clientesList = calcularEstadisticasClientes();

    if (clientesList.length === 0) {
      DOM.customerCardsGrid.innerHTML = `
        <div style="grid-column: 1/-1; text-align:center; padding:3rem; color:var(--text-muted);">
          No hay clientes registrados aún.
        </div>
      `;
      return;
    }

    DOM.customerCardsGrid.innerHTML = clientesList.map(cust => {
      const badge = getClientBadge(cust.ordenesCount, cust.totalGastado);
      const initials = cust.nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

      return `
        <div class="customer-profile-card">
          <div class="customer-card-header">
            <div class="customer-avatar">${initials}</div>
            <div class="customer-name-meta">
              <h3>${cust.nombre}</h3>
              <p>${cust.email}</p>
              <div style="margin-top:0.35rem;">
                <span class="customer-badge ${badge.clase}">${badge.texto}</span>
              </div>
            </div>
          </div>

          <div class="customer-stats-strip">
            <div class="cust-stat-item">
              <span class="cust-stat-label">Total Pedidos</span>
              <span class="cust-stat-val">${cust.ordenesCount}</span>
            </div>
            <div class="cust-stat-item">
              <span class="cust-stat-label">LTV Histórico</span>
              <span class="cust-stat-val" style="color:var(--color-primary);">${formatMoney(cust.totalGastado)}</span>
            </div>
          </div>

          <div style="font-size:0.78rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:0.25rem;">
            <div><i class="fas fa-phone" style="width:16px; color:var(--text-muted);"></i> ${cust.telefono || 'Sin teléfono'}</div>
            <div style="text-overflow:ellipsis; overflow:hidden; white-space:nowrap;"><i class="fas fa-map-marker-alt" style="width:16px; color:var(--text-muted);"></i> ${cust.direccion}</div>
          </div>

          <button class="btn-view-customer-history" data-customer-email="${cust.email}">
            <i class="fas fa-history"></i> Ver Historial 360°
          </button>
        </div>
      `;
    }).join('');

    DOM.customerCardsGrid.querySelectorAll(".btn-view-customer-history").forEach(btn => {
      btn.addEventListener("click", () => {
        const email = btn.getAttribute("data-customer-email");
        abrirModalCliente360(email);
      });
    });
  }

  // --- 9. SLIDE-OVER DRAWER DE DETALLE DE COMPRA ---
  function abrirDetalleOrden(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    selectedOrder = order;

    // Poblar encabezado
    DOM.detailOrderId.textContent = order.id;
    DOM.detailOrderDate.textContent = formatFecha(order.fecha);
    DOM.detailOrderStatusSelect.value = order.estado;

    // Cliente CRM
    const statsList = calcularEstadisticasClientes();
    const stat = statsList.find(c => c.email.toLowerCase() === order.cliente.email.toLowerCase()) || { ordenesCount: 1, totalGastado: order.totales.total };
    const badge = getClientBadge(stat.ordenesCount, stat.totalGastado);

    DOM.detailClientName.textContent = order.cliente.nombre;
    DOM.detailClientEmail.textContent = order.cliente.email;
    DOM.detailClientPhone.textContent = order.cliente.telefono || 'No especificado';
    DOM.detailClientBadge.textContent = badge.texto;
    DOM.detailClientBadge.className = `customer-badge ${badge.clase}`;
    DOM.detailClientOrdersCount.textContent = stat.ordenesCount;
    DOM.detailClientLtv.textContent = formatMoney(stat.totalGastado);

    // Pago
    DOM.detailPaymentMethod.textContent = order.pago.metodo;
    DOM.detailPaymentCard.textContent = `${order.pago.marca || 'Visa'} (•••• ${order.pago.ultimos4 || '4242'})`;
    DOM.detailPaymentHolder.textContent = order.pago.titular || order.cliente.nombre;
    DOM.detailPaymentInstallments.textContent = `${order.pago.cuotas || 1} pago sin interés`;
    DOM.detailPaymentStatus.textContent = order.pago.estado;

    // Entrega & Logística
    DOM.detailDeliveryType.textContent = order.entrega.tipo === 'shipping' ? 'Envío a Domicilio' : 'Retiro en Sucursal';
    DOM.detailDeliveryAddress.textContent = order.entrega.direccion;
    DOM.detailDeliveryTracking.textContent = `TRACK-${order.id.replace('MT-', '')}-AR`;

    // Items Comprados
    DOM.detailItemsList.innerHTML = order.items.map(item => `
      <div class="order-item-row">
        <div style="display:flex; align-items:center; gap:0.75rem;">
          <img src="${item.imagen || '../assets/phone.jpg'}" alt="${item.nombre}" style="width:36px; height:36px; object-fit:cover; border-radius:var(--radius-xs);">
          <div>
            <div class="order-item-title">${item.nombre}</div>
            <div style="font-size:0.72rem; color:var(--text-muted);">${item.cantidad} x ${formatMoney(item.precio)}</div>
          </div>
        </div>
        <div class="order-item-price">${formatMoney(item.precio * item.cantidad)}</div>
      </div>
    `).join('');

    // Totales
    DOM.detailSubtotal.textContent = formatMoney(order.totales.subtotal);
    DOM.detailDiscount.textContent = order.totales.descuento > 0 ? `-${formatMoney(order.totales.descuento)}` : "$0.00";
    DOM.detailShippingCost.textContent = order.totales.envio > 0 ? formatMoney(order.totales.envio) : "Gratis ($0.00)";
    DOM.detailTotalAmount.textContent = formatMoney(order.totales.total);

    // Botón de WhatsApp
    if (DOM.btnContactWa) {
      const cleanTel = (order.cliente.telefono || "").replace(/\D/g, "");
      const msg = encodeURIComponent(`¡Hola ${order.cliente.nombre}! Te escribimos desde MiTienda para informarte sobre el estado de tu pedido #${order.id}. Estado actual: ${order.estado}.`);
      DOM.btnContactWa.href = cleanTel ? `https://wa.me/${cleanTel}?text=${msg}` : `https://wa.me/543512619874?text=${msg}`;
    }

    // Abrir Drawer
    DOM.slideoverBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function cerrarSlideover() {
    DOM.slideoverBackdrop.classList.remove("active");
    document.body.style.overflow = "";
    selectedOrder = null;
  }

  if (DOM.btnCloseSlideover) DOM.btnCloseSlideover.addEventListener("click", cerrarSlideover);
  if (DOM.slideoverBackdrop) {
    DOM.slideoverBackdrop.addEventListener("click", (e) => {
      if (e.target === DOM.slideoverBackdrop) cerrarSlideover();
    });
  }

  // Cambio de estado de orden desde el Drawer
  if (DOM.detailOrderStatusSelect) {
    DOM.detailOrderStatusSelect.addEventListener("change", (e) => {
      if (!selectedOrder) return;
      const nuevoEstado = e.target.value;
      selectedOrder.estado = nuevoEstado;

      const idx = orders.findIndex(o => o.id === selectedOrder.id);
      if (idx !== -1) {
        orders[idx].estado = nuevoEstado;
        localStorage.setItem("mt_orders", JSON.stringify(orders));
      }

      actualizarKPIs();
      renderOrdersTable();
      showToast(`Estado de ${selectedOrder.id} actualizado a "${nuevoEstado}"`, "fa-sync-alt");
    });
  }

  // Botón Imprimir Factura / Remito
  if (DOM.btnPrintReceipt) {
    DOM.btnPrintReceipt.addEventListener("click", () => {
      window.print();
    });
  }

  // --- 10. MODAL CLIENTE 360° ---
  function abrirModalCliente360(email) {
    const statsList = calcularEstadisticasClientes();
    const cust = statsList.find(c => c.email.toLowerCase() === email.toLowerCase());
    if (!cust) return;

    const badge = getClientBadge(cust.ordenesCount, cust.totalGastado);

    DOM.customerModalBody.innerHTML = `
      <div style="display:flex; justify-content:space-between; align-items:flex-start;">
        <div style="display:flex; align-items:center; gap:0.85rem;">
          <div class="customer-avatar" style="width:52px; height:52px; font-size:1.3rem;">
            ${cust.nombre.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
          </div>
          <div>
            <h2 style="font-size:1.25rem; font-weight:800; color:var(--text-main);">${cust.nombre}</h2>
            <div style="font-size:0.82rem; color:var(--text-muted);">${cust.email} • ${cust.telefono || 'Sin teléfono'}</div>
          </div>
        </div>
        <span class="customer-badge ${badge.clase}" style="font-size:0.78rem; padding:0.25rem 0.65rem;">${badge.texto}</span>
      </div>

      <div class="customer-stats-strip" style="grid-template-columns:repeat(3, 1fr); margin-top:1rem; padding:1rem;">
        <div class="cust-stat-item">
          <span class="cust-stat-label">Total Compras</span>
          <span class="cust-stat-val">${cust.ordenesCount}</span>
        </div>
        <div class="cust-stat-item">
          <span class="cust-stat-label">LTV Acumulado</span>
          <span class="cust-stat-val" style="color:var(--color-primary);">${formatMoney(cust.totalGastado)}</span>
        </div>
        <div class="cust-stat-item">
          <span class="cust-stat-label">Ticket Promedio</span>
          <span class="cust-stat-val">${formatMoney(cust.totalGastado / cust.ordenesCount)}</span>
        </div>
      </div>

      <div style="margin-top:1.25rem;">
        <h4 style="font-size:0.92rem; font-weight:700; color:var(--text-main); margin-bottom:0.75rem;">
          <i class="fas fa-boxes" style="color:var(--color-primary); margin-right:4px;"></i> Historial Completo de Pedidos
        </h4>
        <div style="display:flex; flex-direction:column; gap:0.75rem; max-height:280px; overflow-y:auto; padding-right:4px;">
          ${cust.ordenes.map(ord => `
            <div style="background:var(--bg-surface-elevated); border:1px solid var(--border-color); border-radius:var(--radius-sm); padding:0.85rem; display:flex; justify-content:space-between; align-items:center;">
              <div>
                <strong style="font-family:var(--font-mono); color:var(--color-primary);">${ord.id}</strong>
                <span style="font-size:0.72rem; color:var(--text-muted); margin-left:0.5rem;">${formatFecha(ord.fecha)}</span>
                <div style="font-size:0.78rem; color:var(--text-secondary); margin-top:0.2rem;">
                  ${ord.items.map(i => `${i.cantidad}x ${i.nombre}`).join(', ')}
                </div>
              </div>
              <div style="text-align:right;">
                <span style="font-family:var(--font-mono); font-weight:800; font-size:0.95rem;">${formatMoney(ord.totales.total)}</span>
                <div>
                  <span class="status-badge ${getStatusBadgeClass(ord.estado)}" style="font-size:0.65rem; padding:0.15rem 0.45rem;">
                    ● ${ord.estado}
                  </span>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;

    DOM.customerModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function cerrarModalCliente() {
    DOM.customerModal.classList.remove("active");
    document.body.style.overflow = "";
  }

  if (DOM.btnCloseCustomerModal) DOM.btnCloseCustomerModal.addEventListener("click", cerrarModalCliente);
  if (DOM.customerModal) {
    DOM.customerModal.addEventListener("click", (e) => {
      if (e.target === DOM.customerModal) cerrarModalCliente();
    });
  }

  // --- 11. SIMULACIÓN DE COMPRA EN VIVO (ACTION BUTTON) ---
  const NOMBRES_SIMULACION = [
    { nombre: "Carolina Herrera", email: "caro.herrera@gmail.com", tel: "+54 9 351 712-9911", dir: "Av. Hipólito Yrigoyen 320, Córdoba" },
    { nombre: "Julián Álvarez", email: "spider.julian@outlook.com", tel: "+54 9 351 440-2211", dir: "Monseñor Pablo Cabrera 2100, Córdoba" },
    { nombre: "Camila Domínguez", email: "cami.dominguez@gmail.com", tel: "+54 9 3543 49-8800", dir: "San Martín 840, Villa Allende, Córdoba" },
    { nombre: "Tomás Giménez", email: "tomi.gimenez@yahoo.com", tel: "+54 9 351 321-7788", dir: "Duarte Quirós 1400, Córdoba" }
  ];

  const PRODUCTOS_SIMULACION = [
    { id: 1, nombre: "iPhone 15 Pro", precio: 1499.99, cantidad: 1, imagen: "../assets/phone.jpg" },
    { id: 2, nombre: "Laptop Gamer Victus", precio: 1250.00, cantidad: 1, imagen: "../assets/laptop.jpg" },
    { id: 3, nombre: "Zapatillas Nike Air Max", precio: 180.50, cantidad: 1, imagen: "../assets/shoes.jpg" },
    { id: 4, nombre: "Camiseta Boca Juniors 24", precio: 110.00, cantidad: 1, imagen: "../assets/tshirt.jpg" }
  ];

  if (DOM.btnSimulateOrder) {
    DOM.btnSimulateOrder.addEventListener("click", () => {
      const randomUser = NOMBRES_SIMULACION[Math.floor(Math.random() * NOMBRES_SIMULACION.length)];
      const randomProd = PRODUCTOS_SIMULACION[Math.floor(Math.random() * PRODUCTOS_SIMULACION.length)];
      const isShipping = Math.random() > 0.3;
      const shipCost = isShipping ? 10.00 : 0;
      const orderId = "MT-" + Math.floor(100000 + Math.random() * 900000);

      const simOrder = {
        id: orderId,
        fecha: new Date().toISOString(),
        cliente: {
          nombre: randomUser.nombre,
          email: randomUser.email,
          telefono: randomUser.tel,
          direccion: randomUser.dir
        },
        entrega: {
          tipo: isShipping ? "shipping" : "pickup",
          costo: shipCost,
          direccion: isShipping ? randomUser.dir : "Retiro en Local Central"
        },
        pago: {
          metodo: "Tarjeta de Crédito Virtual",
          marca: "Visa Virtual",
          ultimos4: String(Math.floor(1000 + Math.random() * 9000)),
          titular: randomUser.nombre.toUpperCase(),
          estado: "Aprobado",
          cuotas: 1
        },
        items: [randomProd],
        totales: {
          subtotal: randomProd.precio,
          descuento: 0,
          envio: shipCost,
          total: randomProd.precio + shipCost
        },
        estado: "Pendiente"
      };

      orders.unshift(simOrder);
      localStorage.setItem("mt_orders", JSON.stringify(orders));

      // Feedback audiovisual
      playPurchaseChime();
      actualizarKPIs();
      renderOrdersTable();
      renderCrmView();
      showToast(`¡Nueva compra simulada en vivo: ${simOrder.cliente.nombre} (${formatMoney(simOrder.totales.total)})! 🛍️`, "fa-bolt");
    });
  }

  // --- 12. SINCRONIZACIÓN EN TIEMPO REAL CON LA TIENDA (BROADCASTCHANNEL & STORAGE) ---
  if (window.BroadcastChannel) {
    try {
      const channel = new BroadcastChannel("mitienda_channel");
      channel.onmessage = (event) => {
        if (event.data && event.data.tipo === "NUEVA_ORDEN") {
          const incomingOrder = event.data.orden;
          // Verificar si ya existe para evitar duplicar
          if (!orders.some(o => o.id === incomingOrder.id)) {
            orders.unshift(incomingOrder);
            playPurchaseChime();
            actualizarKPIs();
            renderOrdersTable();
            renderCrmView();
            showToast(`¡Nueva compra en vivo recibida de ${incomingOrder.cliente.nombre} (${formatMoney(incomingOrder.totales.total)})! 🛍️`, "fa-bell");
          }
        }
      };
    } catch (e) {}
  }

  window.addEventListener("storage", (e) => {
    if (e.key === "mt_orders") {
      orders = JSON.parse(e.newValue) || [];
      actualizarKPIs();
      renderOrdersTable();
      renderCrmView();
    }
  });

  // --- 13. FILTROS, BÚSQUEDA Y EXPORTACIÓN CSV ---
  if (DOM.orderSearchInput) {
    DOM.orderSearchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderOrdersTable();
    });
  }

  if (DOM.orderStatusFilter) {
    DOM.orderStatusFilter.addEventListener("change", (e) => {
      statusFilter = e.target.value;
      renderOrdersTable();
    });
  }

  if (DOM.orderDeliveryFilter) {
    DOM.orderDeliveryFilter.addEventListener("change", (e) => {
      deliveryFilter = e.target.value;
      renderOrdersTable();
    });
  }

  // Exportar a CSV (Excel compatible con BOM UTF-8)
  if (DOM.btnExportCsv) {
    DOM.btnExportCsv.addEventListener("click", () => {
      const filtered = getFilteredOrders();
      if (filtered.length === 0) {
        showToast("No hay órdenes para exportar.", "fa-info-circle");
        return;
      }

      let csv = "\uFEFF"; // BOM para acentos en Excel
      csv += "ID Orden;Fecha;Cliente;Email;Telefono;Tipo Entrega;Direccion;Metodo Pago;Ultimos 4;Estado Pago;Total USD;Estado Orden;Items\n";

      filtered.forEach(o => {
        const itemsStr = o.items.map(i => `${i.cantidad}x ${i.nombre}`).join(' | ');
        csv += `"${o.id}";"${formatFecha(o.fecha)}";"${o.cliente.nombre}";"${o.cliente.email}";"${o.cliente.telefono}";"${o.entrega.tipo === 'shipping' ? 'Envio a Domicilio' : 'Retiro en Local'}";"${o.entrega.direccion}";"${o.pago.metodo}";"${o.pago.ultimos4}";"${o.pago.estado}";"${o.totales.total.toFixed(2)}";"${o.estado}";"${itemsStr}"\n`;
      });

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `MiTienda_Ordenes_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast("Reporte CSV descargado con éxito 📄", "fa-file-excel");
    });
  }

  // --- 14. NAVEGACIÓN ENTRE SECCIONES (ÓRDENES VS CRM) ---
  if (DOM.navOrdersLink) {
    DOM.navOrdersLink.addEventListener("click", (e) => {
      e.preventDefault();
      DOM.navOrdersLink.classList.add("active");
      DOM.navCrmLink.classList.remove("active");
      DOM.ordersViewSection.classList.remove("hidden");
      DOM.crmViewSection.classList.remove("active");
      if (window.innerWidth <= 860) DOM.sidebar.classList.remove("open");
    });
  }

  if (DOM.navCrmLink) {
    DOM.navCrmLink.addEventListener("click", (e) => {
      e.preventDefault();
      DOM.navCrmLink.classList.add("active");
      DOM.navOrdersLink.classList.remove("active");
      DOM.ordersViewSection.classList.add("hidden");
      DOM.crmViewSection.classList.add("active");
      renderCrmView();
      if (window.innerWidth <= 860) DOM.sidebar.classList.remove("open");
    });
  }

  // Responsive Sidebar Toggle
  if (DOM.sidebarToggle) {
    DOM.sidebarToggle.addEventListener("click", () => {
      DOM.sidebar.classList.toggle("open");
    });
  }

  // --- 15. INICIALIZAR ---
  initTheme();
  actualizarKPIs();
  renderOrdersTable();
});

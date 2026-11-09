/* ==========================================================================
   MITIENDA CRM — CONTROLADOR ADMINISTRATIVO DE PEDIDOS, CLIENTES Y CATÁLOGO
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  'use strict';

  // --- 1. CATÁLOGO DE 16 PRODUCTOS SINCRONIZADO ---
  const DEFAULT_CATALOG = [
    { id: 1, nombre: "iPhone 15 Pro 256GB Titanio", categoria: "Tecnología", precio: 1499.99, precioAntiguo: 1699.99, rating: 4.9, badge: "OFERTA", imagen: "../assets/phone.jpg" },
    { id: 2, nombre: "Notebook HP Victus 15.6\" RTX", categoria: "Tecnología", precio: 1250.00, precioAntiguo: null, rating: 4.8, badge: "DESTACADO", imagen: "../assets/laptop.jpg" },
    { id: 7, nombre: "Auriculares Sony WH-1000XM5", categoria: "Tecnología", precio: 389.00, precioAntiguo: 430.00, rating: 4.9, badge: "OFERTA", imagen: "../assets/headphones.jpg" },
    { id: 8, nombre: "iPad Pro 11\" Chip M2 + Pencil", categoria: "Tecnología", precio: 980.00, precioAntiguo: null, rating: 4.9, badge: "NUEVO", imagen: "../assets/tablet.jpg" },
    { id: 9, nombre: "Parlante JBL Flip 6 Waterproof", categoria: "Tecnología", precio: 145.00, precioAntiguo: 170.00, rating: 4.8, badge: "OFERTA", imagen: "../assets/speaker.jpg" },
    { id: 10, nombre: "Teclado Inalámbrico Aluminio", categoria: "Tecnología", precio: 115.00, precioAntiguo: null, rating: 4.7, badge: "DESTACADO", imagen: "../assets/keyboard.jpg" },
    { id: 11, nombre: "Smartwatch Minimal GPS Sport", categoria: "Tecnología", precio: 260.00, precioAntiguo: null, rating: 4.6, badge: "NUEVO", imagen: "../assets/watch.jpg" },
    { id: 3, nombre: "Zapatillas Nike Air Max Excee", categoria: "Indumentaria", precio: 180.50, precioAntiguo: 210.00, rating: 4.8, badge: "OFERTA", imagen: "../assets/shoes.jpg" },
    { id: 4, nombre: "Camiseta Boca Juniors Titular", categoria: "Indumentaria", precio: 110.00, precioAntiguo: null, rating: 4.9, badge: "NUEVO", imagen: "../assets/tshirt.jpg" },
    { id: 12, nombre: "Mochila Urbana Porta Notebook 16\"", categoria: "Indumentaria", precio: 89.00, precioAntiguo: 108.00, rating: 4.8, badge: "OFERTA", imagen: "../assets/backpack.jpg" },
    { id: 13, nombre: "Campera Bomber Impermeable", categoria: "Indumentaria", precio: 165.00, precioAntiguo: null, rating: 4.7, badge: "NUEVO", imagen: "../assets/jacket.jpg" },
    { id: 14, nombre: "Lentes de Sol Armazón Metálico", categoria: "Indumentaria", precio: 92.00, precioAntiguo: null, rating: 4.7, badge: "DESTACADO", imagen: "../assets/sunglasses.jpg" },
    { id: 5, nombre: "Sofá Escandinavo 2 Cuerpos Lino", categoria: "Hogar", precio: 790.00, precioAntiguo: 920.00, rating: 4.9, badge: "OFERTA", imagen: "../assets/sofa.jpg" },
    { id: 15, nombre: "Sillón Individual Capitonnée", categoria: "Hogar", precio: 410.00, precioAntiguo: null, rating: 4.8, badge: "NUEVO", imagen: "../assets/chair.jpg" },
    { id: 16, nombre: "Mesa de Luz Nórdica Madera", categoria: "Hogar", precio: 235.00, precioAntiguo: 275.00, rating: 4.8, badge: "OFERTA", imagen: "../assets/table.jpg" },
    { id: 6, nombre: "Lámpara Decorativa Lava Retro", categoria: "Hogar", precio: 75.00, precioAntiguo: 95.00, rating: 4.6, badge: "OFERTA", imagen: "../assets/lamp.jpg" }
  ];

  // --- 2. ÓRDENES SEMILLA REALISTAS ---
  const SEED_ORDERS = [
    {
      id: "MT-894215",
      fecha: new Date(Date.now() - 18 * 60 * 1000).toISOString(),
      cliente: {
        nombre: "Valentina Rossi",
        email: "valentina.rossi@gmail.com",
        codigoPais: "+54",
        telefonoNum: "3515124488",
        telefono: "+54 9 351 512-4488",
        telefonoWhatsApp: "5493515124488",
        condicionIva: "Consumidor Final",
        docNumero: "38920145",
        razonSocial: "",
        tipoFacturaSugerida: "Factura B",
        direccion: "Bv. Chacabuco 640, Nueva Córdoba, Córdoba"
      },
      entrega: {
        tipo: "shipping",
        costo: 0,
        direccion: "Bv. Chacabuco 640, Piso 4B, Córdoba (CP 5000)"
      },
      pago: {
        metodo: "Tarjeta de Crédito",
        marca: "Visa Signature",
        ultimos4: "4589",
        titular: "VALENTINA ROSSI",
        estado: "Aprobado",
        cuotas: 3
      },
      items: [
        { id: 1, nombre: "iPhone 15 Pro 256GB Titanio", precio: 1499.99, cantidad: 1 },
        { id: 7, nombre: "Auriculares Sony WH-1000XM5", precio: 389.00, cantidad: 1 }
      ],
      totales: {
        subtotal: 1888.99,
        descuento: 188.90,
        envio: 0,
        total: 1700.09
      },
      estado: "En Preparacion"
    },
    {
      id: "MT-741029",
      fecha: new Date(Date.now() - 95 * 60 * 1000).toISOString(),
      cliente: {
        nombre: "Mateo Fernández",
        email: "mateo.fernandez@yahoo.com.ar",
        codigoPais: "+54",
        telefonoNum: "3541628811",
        telefono: "+54 9 3541 62-8811",
        telefonoWhatsApp: "5493541628811",
        condicionIva: "Responsable Inscripto",
        docNumero: "30-71829401-4",
        razonSocial: "MF Soluciones Digitales S.A.",
        tipoFacturaSugerida: "Factura A",
        direccion: "Av. San Martín 1420, Villa Carlos Paz, Córdoba"
      },
      entrega: {
        tipo: "pickup",
        costo: 0,
        direccion: "Retiro en Sucursal (Av. Colón 1234, Córdoba)"
      },
      pago: {
        metodo: "Tarjeta de Crédito",
        marca: "Mastercard Black",
        ultimos4: "7812",
        titular: "MATEO FERNANDEZ",
        estado: "Aprobado",
        cuotas: 6
      },
      items: [
        { id: 2, nombre: "Notebook HP Victus 15.6\" RTX", precio: 1250.00, cantidad: 1 },
        { id: 10, nombre: "Teclado Inalámbrico Aluminio", precio: 115.00, cantidad: 1 }
      ],
      totales: {
        subtotal: 1365.00,
        descuento: 0,
        envio: 0,
        total: 1365.00
      },
      estado: "Enviado"
    },
    {
      id: "MT-632194",
      fecha: new Date(Date.now() - 240 * 60 * 1000).toISOString(),
      cliente: {
        nombre: "Sofía Albarracín",
        email: "sofia.albarracin@outlook.com",
        codigoPais: "+54",
        telefonoNum: "3584197722",
        telefono: "+54 9 358 419-7722",
        telefonoWhatsApp: "5493584197722",
        condicionIva: "Monotributo",
        docNumero: "27-39201984-2",
        razonSocial: "Albarracín Diseño Textil",
        tipoFacturaSugerida: "Factura B",
        direccion: "Belgrano 410, Río Cuarto, Córdoba"
      },
      entrega: {
        tipo: "shipping",
        costo: 0,
        direccion: "Belgrano 410, Río Cuarto, Córdoba (CP 5800)"
      },
      pago: {
        metodo: "Tarjeta de Débito",
        marca: "Visa Débito",
        ultimos4: "1934",
        titular: "SOFIA ALBARRACIN",
        estado: "Aprobado",
        cuotas: 1
      },
      items: [
        { id: 15, nombre: "Sillón Individual Capitonnée", precio: 410.00, cantidad: 1 },
        { id: 16, nombre: "Mesa de Luz Nórdica Madera", precio: 235.00, cantidad: 1 }
      ],
      totales: {
        subtotal: 645.00,
        descuento: 64.50,
        envio: 0,
        total: 580.50
      },
      estado: "Entregado"
    },
    {
      id: "MT-518290",
      fecha: new Date(Date.now() - 480 * 60 * 1000).toISOString(),
      cliente: {
        nombre: "Valentina Rossi",
        email: "valentina.rossi@gmail.com",
        codigoPais: "+54",
        telefonoNum: "3515124488",
        telefono: "+54 9 351 512-4488",
        telefonoWhatsApp: "5493515124488",
        condicionIva: "Consumidor Final",
        docNumero: "38920145",
        razonSocial: "",
        tipoFacturaSugerida: "Factura B",
        direccion: "Bv. Chacabuco 640, Nueva Córdoba, Córdoba"
      },
      entrega: {
        tipo: "shipping",
        costo: 0,
        direccion: "Bv. Chacabuco 640, Piso 4B, Córdoba (CP 5000)"
      },
      pago: {
        metodo: "Tarjeta de Crédito",
        marca: "Visa Signature",
        ultimos4: "4589",
        titular: "VALENTINA ROSSI",
        estado: "Aprobado",
        cuotas: 1
      },
      items: [
        { id: 3, nombre: "Zapatillas Nike Air Max Excee", precio: 180.50, cantidad: 1 },
        { id: 12, nombre: "Mochila Urbana Porta Notebook 16\"", precio: 89.00, cantidad: 1 }
      ],
      totales: {
        subtotal: 269.50,
        descuento: 0,
        envio: 0,
        total: 269.50
      },
      estado: "Entregado"
    },
    {
      id: "MT-402911",
      fecha: new Date(Date.now() - 720 * 60 * 1000).toISOString(),
      cliente: {
        nombre: "Lucas Benítez",
        email: "lucas.benitez@hotmail.com",
        codigoPais: "+54",
        telefonoNum: "3516889900",
        telefono: "+54 9 351 688-9900",
        telefonoWhatsApp: "5493516889900",
        condicionIva: "Consumidor Final",
        docNumero: "36192840",
        razonSocial: "",
        tipoFacturaSugerida: "Factura B",
        direccion: "Av. Recta Martinolli 5800, Argüello, Córdoba"
      },
      entrega: {
        tipo: "shipping",
        costo: 0,
        direccion: "Av. Recta Martinolli 5800, Argüello, Córdoba (CP 5147)"
      },
      pago: {
        metodo: "Tarjeta de Crédito",
        marca: "Mastercard Gold",
        ultimos4: "3311",
        titular: "LUCAS BENITEZ",
        estado: "Aprobado",
        cuotas: 3
      },
      items: [
        { id: 5, nombre: "Sofá Escandinavo 2 Cuerpos Lino", precio: 790.00, cantidad: 1 }
      ],
      totales: {
        subtotal: 790.00,
        descuento: 79.00,
        envio: 0,
        total: 711.00
      },
      estado: "Pendiente"
    }
  ];

  // --- 3. ESTADO GLOBAL ---
  let orders = JSON.parse(localStorage.getItem("mt_orders")) || [];
  if (orders.length === 0) {
    orders = [...SEED_ORDERS];
    localStorage.setItem("mt_orders", JSON.stringify(orders));
  }

  let searchQuery = "";
  let statusFilter = "all";
  let deliveryFilter = "all";
  let selectedOrder = null;

  // --- 4. REFERENCIAS DOM ---
  const DOM = {
    themeToggle: document.getElementById("theme-toggle"),
    btnSimulateOrder: document.getElementById("btn-simulate-order"),
    sidebarToggle: document.getElementById("sidebar-toggle"),
    sidebar: document.getElementById("admin-sidebar"),

    navOrdersLink: document.getElementById("nav-orders-link"),
    navCrmLink: document.getElementById("nav-crm-link"),
    navPedidosShortcut: document.getElementById("nav-pedidos-shortcut"),
    navClientesShortcut: document.getElementById("nav-clientes-shortcut"),
    navCatalogLink: document.getElementById("nav-catalog-link"),

    pageViewTitle: document.getElementById("page-view-title"),
    pageViewSubtitle: document.getElementById("page-view-subtitle"),

    ordersCountBadge: document.getElementById("orders-count-badge"),
    customersCountBadge: document.getElementById("customers-count-badge"),
    catalogCountBadge: document.getElementById("catalog-count-badge"),

    ordersViewSection: document.getElementById("orders-view-section"),
    crmViewSection: document.getElementById("crm-view-section"),
    catalogViewSection: document.getElementById("catalog-view-section"),
    catalogTableBody: document.getElementById("catalog-table-body"),

    kpiTotalRevenue: document.getElementById("kpi-total-revenue"),
    kpiTotalOrders: document.getElementById("kpi-total-orders"),
    kpiTodayOrders: document.getElementById("kpi-today-orders"),
    kpiTotalCustomers: document.getElementById("kpi-total-customers"),
    kpiRecurrenceRate: document.getElementById("kpi-recurrence-rate"),
    kpiAvgTicket: document.getElementById("kpi-avg-ticket"),

    ordersTableBody: document.getElementById("orders-table-body"),
    orderSearchInput: document.getElementById("order-search-input"),
    globalSearchInput: document.getElementById("global-search-input"),
    orderStatusFilter: document.getElementById("order-status-filter"),
    orderDeliveryFilter: document.getElementById("order-delivery-filter"),
    btnExportCsv: document.getElementById("btn-export-csv"),

    chartSalesContainer: document.getElementById("chart-sales-container"),
    chartStatusContainer: document.getElementById("chart-status-container"),
    chartCustomersContainer: document.getElementById("chart-customers-container"),
    chartChannelsContainer: document.getElementById("chart-channels-container"),
    customerCardsGrid: document.getElementById("customer-cards-grid"),

    slideoverBackdrop: document.getElementById("slideover-backdrop"),
    btnCloseSlideover: document.getElementById("btn-close-slideover"),
    detailOrderId: document.getElementById("detail-order-id"),
    detailOrderDate: document.getElementById("detail-order-date"),
    detailOrderStatusSelect: document.getElementById("detail-order-status-select"),
    detailInvoiceTypeSelect: document.getElementById("detail-invoice-type-select"),

    detailClientName: document.getElementById("detail-client-name"),
    detailClientEmail: document.getElementById("detail-client-email"),
    detailClientPhone: document.getElementById("detail-client-phone"),
    detailClientBadge: document.getElementById("detail-client-badge"),
    detailClientFiscal: document.getElementById("detail-client-fiscal"),
    detailClientCuit: document.getElementById("detail-client-cuit"),
    detailClientCompany: document.getElementById("detail-client-company"),
    detailClientCompanyRow: document.getElementById("detail-client-company-row"),
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
    btnPrintShippingLabel: document.getElementById("btn-print-shipping-label"),
    btnContactWa: document.getElementById("btn-contact-customer-wa"),

    customerModal: document.getElementById("customer-modal"),
    customerModalBody: document.getElementById("customer-modal-body"),
    btnCloseCustomerModal: document.getElementById("btn-close-customer-modal"),

    toastContainer: document.getElementById("toast-container")
  };

  // --- 5. TEMA OSCURO / CLARO ---
  function initTheme() {
    const saved = localStorage.getItem("mt_admin_theme") || "dark";
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
      showToast(newTheme === "dark" ? "Modo oscuro activado" : "Modo claro activado", "fa-adjust");
      renderCrmAnalytics();
    });
  }

  // --- 6. UTILIDADES ---
  function getSanitizedWhatsAppNumber(cliente) {
    if (!cliente) return "5493512619874";
    if (cliente.telefonoWhatsApp) return cliente.telefonoWhatsApp.replace(/\D/g, "");

    const raw = (cliente.telefonoNum || cliente.telefono || "").replace(/\D/g, "");
    let cod = (cliente.codigoPais || "54").replace(/\D/g, "");
    if (!cod) cod = "54";

    let num = raw;
    if (num.startsWith("0")) num = num.substring(1);

    if (cod === "54" || cod === "") {
      if (num.startsWith("54")) num = num.substring(2);
      if (num.startsWith("0")) num = num.substring(1);
      if (!num.startsWith("9")) num = "9" + num;
      return "54" + num;
    }
    return cod + num;
  }

  function getItemIconInfo(nombre) {
    const n = (nombre || "").toLowerCase();
    if (n.includes("iphone") || n.includes("phone") || n.includes("celular") || n.includes("ipad")) {
      return { icon: "fa-mobile-screen-button" };
    }
    if (n.includes("laptop") || n.includes("notebook") || n.includes("victus") || n.includes("teclado")) {
      return { icon: "fa-laptop" };
    }
    if (n.includes("auricular") || n.includes("parlante") || n.includes("sony") || n.includes("jbl")) {
      return { icon: "fa-headphones" };
    }
    if (n.includes("zapatilla") || n.includes("nike") || n.includes("calzado")) {
      return { icon: "fa-shoe-prints" };
    }
    if (n.includes("camiseta") || n.includes("campera") || n.includes("mochila") || n.includes("lentes")) {
      return { icon: "fa-shirt" };
    }
    if (n.includes("sofá") || n.includes("sillón") || n.includes("mesa") || n.includes("lámpara")) {
      return { icon: "fa-couch" };
    }
    return { icon: "fa-box" };
  }

  function formatMoney(amount) {
    return "$" + Number(amount || 0).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function formatFecha(isoString) {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("es-AR", { day: "2-digit", month: "2-digit", year: "numeric" }) +
             " " + d.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
    } catch {
      return "Reciente";
    }
  }

  function getStatusBadgeClass(status) {
    const map = {
      "Pendiente": "pendiente",
      "En Preparacion": "preparacion",
      "Enviado": "enviado",
      "Entregado": "entregado",
      "Cancelado": "cancelado"
    };
    return map[status] || "pendiente";
  }

  function getClientBadge(orderCount, totalSpent) {
    if (orderCount >= 2 && totalSpent >= 1000) return { texto: "VIP", clase: "vip" };
    if (orderCount >= 2) return { texto: "Recurrente", clase: "recurrente" };
    return { texto: "Nuevo", clase: "nuevo" };
  }

  // --- 7. KPIS Y ESTADÍSTICAS DE CLIENTES ---
  function calcularEstadisticasClientes() {
    const map = {};
    orders.forEach(o => {
      const email = (o.cliente?.email || "sin-email").toLowerCase();
      if (!map[email]) {
        map[email] = {
          nombre: o.cliente?.nombre || "Cliente",
          email: o.cliente?.email || "sin-email",
          telefono: o.cliente?.telefono || "",
          telefonoWhatsApp: o.cliente?.telefonoWhatsApp || "",
          codigoPais: o.cliente?.codigoPais || "+54",
          condicionIva: o.cliente?.condicionIva || "Consumidor Final",
          docNumero: o.cliente?.docNumero || "",
          razonSocial: o.cliente?.razonSocial || "",
          tipoFacturaSugerida: o.cliente?.tipoFacturaSugerida || "Factura B",
          direccion: o.entrega?.direccion || o.cliente?.direccion || "Córdoba, Argentina",
          ordenesCount: 0,
          totalGastado: 0,
          ordenes: []
        };
      }
      map[email].ordenesCount++;
      map[email].totalGastado += Number(o.totales?.total || 0);
      map[email].ordenes.push(o);
    });
    return Object.values(map);
  }

  function updateKpis() {
    const totalRev = orders.reduce((sum, o) => sum + Number(o.totales?.total || 0), 0);
    const totalOrd = orders.length;

    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);
    const todayOrd = orders.filter(o => new Date(o.fecha) >= startOfToday).length;

    const clientes = calcularEstadisticasClientes();
    const totalCust = clientes.length;
    const recurrentes = clientes.filter(c => c.ordenesCount >= 2).length;
    const recRate = totalCust > 0 ? Math.round((recurrentes / totalCust) * 100) : 0;
    const avgTicket = totalOrd > 0 ? totalRev / totalOrd : 0;

    if (DOM.kpiTotalRevenue) DOM.kpiTotalRevenue.textContent = formatMoney(totalRev);
    if (DOM.kpiTotalOrders) DOM.kpiTotalOrders.textContent = totalOrd;
    if (DOM.kpiTodayOrders) DOM.kpiTodayOrders.textContent = todayOrd;
    if (DOM.kpiTotalCustomers) DOM.kpiTotalCustomers.textContent = totalCust;
    if (DOM.kpiRecurrenceRate) DOM.kpiRecurrenceRate.textContent = `${recRate}%`;
    if (DOM.kpiAvgTicket) DOM.kpiAvgTicket.textContent = formatMoney(avgTicket);

    if (DOM.ordersCountBadge) DOM.ordersCountBadge.textContent = totalOrd;
    if (DOM.customersCountBadge) DOM.customersCountBadge.textContent = totalCust;
    if (DOM.catalogCountBadge) DOM.catalogCountBadge.textContent = DEFAULT_CATALOG.length;
  }

  // --- 8. TABLA DE PEDIDOS ---
  function getFilteredOrders() {
    return orders.filter(o => {
      if (statusFilter !== "all" && o.estado !== statusFilter) return false;
      if (deliveryFilter !== "all" && o.entrega?.tipo !== deliveryFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchId = (o.id || "").toLowerCase().includes(q);
        const matchName = (o.cliente?.nombre || "").toLowerCase().includes(q);
        const matchEmail = (o.cliente?.email || "").toLowerCase().includes(q);
        const matchDoc = (o.cliente?.docNumero || "").toLowerCase().includes(q);
        const matchDir = (o.entrega?.direccion || "").toLowerCase().includes(q);
        if (!matchId && !matchName && !matchEmail && !matchDoc && !matchDir) return false;
      }
      return true;
    });
  }

  function renderOrdersTable() {
    if (!DOM.ordersTableBody) return;
    const filtered = getFilteredOrders();

    if (filtered.length === 0) {
      DOM.ordersTableBody.innerHTML = `
        <tr>
          <td colspan="7" style="text-align:center; padding:2.5rem; color:var(--text-muted);">
            No se encontraron pedidos con los filtros aplicados.
          </td>
        </tr>
      `;
      return;
    }

    const clientesStats = calcularEstadisticasClientes();
    const statsMap = {};
    clientesStats.forEach(c => statsMap[c.email.toLowerCase()] = c);

    DOM.ordersTableBody.innerHTML = filtered.map(order => {
      const clientEmail = (order.cliente?.email || "").toLowerCase();
      const stat = statsMap[clientEmail] || { ordenesCount: 1, totalGastado: order.totales?.total || 0 };
      const badge = getClientBadge(stat.ordenesCount, stat.totalGastado);

      return `
        <tr>
          <td>
            <strong class="mono-text" style="color:var(--color-primary);">${order.id}</strong>
            <div style="font-size:0.72rem; color:var(--text-muted);">${formatFecha(order.fecha)}</div>
          </td>
          <td>
            <div style="font-weight:600; color:var(--text-main);">${order.cliente.nombre}</div>
            <div style="display:flex; align-items:center; gap:0.4rem; margin-top:0.2rem;">
              <span class="customer-badge ${badge.clase}">${badge.texto}</span>
              <span style="font-size:0.7rem; color:var(--text-muted);">${order.cliente.condicionIva || "CF"}</span>
            </div>
          </td>
          <td>
            <div style="font-weight:500; font-size:0.8rem;">
              ${order.entrega.tipo === "shipping" ? "Envío a Domicilio" : "Retiro en Sucursal"}
            </div>
            <div style="font-size:0.72rem; color:var(--text-muted); max-width:210px; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">
              ${order.entrega.direccion}
            </div>
          </td>
          <td>
            <div class="mono-text" style="font-size:0.78rem;">${order.pago.marca || "Visa"} •••• ${order.pago.ultimos4 || "4242"}</div>
            <span style="font-size:0.7rem; color:var(--color-primary); font-weight:600;">${order.pago.estado}</span>
          </td>
          <td>
            <span class="mono-text" style="font-weight:700; font-size:0.9rem;">${formatMoney(order.totales.total)}</span>
          </td>
          <td>
            <span class="status-badge ${getStatusBadgeClass(order.estado)}">
              ${order.estado}
            </span>
          </td>
          <td style="text-align:right;">
            <button class="btn-table-action" data-order-id="${order.id}">
              <i class="fas fa-sliders"></i>
              <span>Gestionar</span>
            </button>
          </td>
        </tr>
      `;
    }).join("");

    DOM.ordersTableBody.querySelectorAll(".btn-table-action").forEach(btn => {
      btn.addEventListener("click", () => {
        abrirDetalleOrden(btn.getAttribute("data-order-id"));
      });
    });
  }

  // --- 9. GRÁFICOS ANALÍTICOS (PALETA ESMERALDA / ZINC SIN PÚRPURA) ---
  function renderCrmAnalytics() {
    const isDark = document.body.getAttribute("data-theme") === "dark";
    const textColor = isDark ? "#A1A1AA" : "#52525B";
    const gridColor = isDark ? "#27272A" : "#E4E4E7";
    const emeraldColor = "#10B981";
    const skyColor = "#0EA5E9";
    const amberColor = "#F59E0B";
    const zincBarColor = isDark ? "#27272A" : "#E4E4E7";

    // Gráfico 1: Evolución de Facturación (Curva Esmeralda Limpia)
    if (DOM.chartSalesContainer) {
      const recentOrders = [...orders].slice(0, 7).reverse();
      const amounts = recentOrders.map(o => Number(o.totales?.total || 0));
      const maxVal = Math.max(...amounts, 100);
      const points = amounts.map((val, idx) => {
        const x = 35 + (idx * (400 / Math.max(amounts.length - 1, 1)));
        const y = 145 - (val / maxVal * 105);
        return { x, y, val, id: recentOrders[idx]?.id || "" };
      });

      const pathD = points.reduce((acc, p, i) => i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`, "");
      const areaD = points.length ? `${pathD} L ${points[points.length - 1].x} 155 L ${points[0].x} 155 Z` : "";

      DOM.chartSalesContainer.innerHTML = `
        <svg class="chart-svg" viewBox="0 0 470 175">
          <defs>
            <linearGradient id="emeraldArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="${emeraldColor}" stop-opacity="0.22"/>
              <stop offset="100%" stop-color="${emeraldColor}" stop-opacity="0.0"/>
            </linearGradient>
          </defs>
          <line x1="25" y1="40" x2="445" y2="40" stroke="${gridColor}" stroke-dasharray="3 3" stroke-width="1" />
          <line x1="25" y1="95" x2="445" y2="95" stroke="${gridColor}" stroke-dasharray="3 3" stroke-width="1" />
          <line x1="25" y1="155" x2="445" y2="155" stroke="${gridColor}" stroke-width="1" />
          <path d="${areaD}" fill="url(#emeraldArea)" />
          <path d="${pathD}" fill="none" stroke="${emeraldColor}" stroke-width="2.5" stroke-linecap="round" />
          ${points.map(p => `
            <circle cx="${p.x}" cy="${p.y}" r="4" fill="${emeraldColor}" stroke="${isDark ? '#121215' : '#FFFFFF'}" stroke-width="2"/>
            <text x="${p.x}" y="${Math.max(p.y - 10, 16)}" text-anchor="middle" font-size="10" font-weight="600" fill="${textColor}">
              $${Math.round(p.val)}
            </text>
            <text x="${p.x}" y="170" text-anchor="middle" font-size="9" fill="${textColor}">
              ${p.id.replace("MT-", "#")}
            </text>
          `).join("")}
        </svg>
      `;
    }

    // Gráfico 2: Estado de Pedidos (Donut Sobrio)
    if (DOM.chartStatusContainer) {
      const counts = { "Entregado": 0, "Enviado": 0, "En Preparacion": 0, "Pendiente": 0 };
      orders.forEach(o => counts[o.estado] = (counts[o.estado] || 0) + 1);
      const total = orders.length || 1;

      DOM.chartStatusContainer.innerHTML = `
        <div style="display:flex; align-items:center; justify-content:space-around; width:100%; gap:1.25rem;">
          <svg viewBox="0 0 100 100" style="width:125px; height:125px;">
            <circle cx="50" cy="50" r="38" fill="none" stroke="${zincBarColor}" stroke-width="12"/>
            <circle cx="50" cy="50" r="38" fill="none" stroke="${emeraldColor}" stroke-width="12"
              stroke-dasharray="${(counts["Entregado"] / total) * 238.76} 238.76" stroke-dashoffset="0" transform="rotate(-90 50 50)"/>
            <circle cx="50" cy="50" r="38" fill="none" stroke="${skyColor}" stroke-width="12"
              stroke-dasharray="${(counts["Enviado"] / total) * 238.76} 238.76" stroke-dashoffset="-${(counts["Entregado"] / total) * 238.76}" transform="rotate(-90 50 50)"/>
            <circle cx="50" cy="50" r="38" fill="none" stroke="${amberColor}" stroke-width="12"
              stroke-dasharray="${((counts["Pendiente"] + counts["En Preparacion"]) / total) * 238.76} 238.76" stroke-dashoffset="-${((counts["Entregado"] + counts["Enviado"]) / total) * 238.76}" transform="rotate(-90 50 50)"/>
            <text x="50" y="54" text-anchor="middle" font-size="15" font-weight="700" fill="${isDark ? '#FAFAFA' : '#09090B'}">${total}</text>
          </svg>
          <div style="display:flex; flex-direction:column; gap:0.5rem; font-size:0.78rem; color:var(--text-secondary);">
            <div><span style="display:inline-block; width:8px; height:8px; border-radius:2px; background:${emeraldColor}; margin-right:6px;"></span>Entregados: <strong style="color:var(--text-main)">${counts["Entregado"]}</strong></div>
            <div><span style="display:inline-block; width:8px; height:8px; border-radius:2px; background:${skyColor}; margin-right:6px;"></span>Enviados: <strong style="color:var(--text-main)">${counts["Enviado"]}</strong></div>
            <div><span style="display:inline-block; width:8px; height:8px; border-radius:2px; background:${amberColor}; margin-right:6px;"></span>En Preparación: <strong style="color:var(--text-main)">${counts["En Preparacion"]}</strong></div>
            <div><span style="display:inline-block; width:8px; height:8px; border-radius:2px; background:${amberColor}; opacity:0.6; margin-right:6px;"></span>Pendientes: <strong style="color:var(--text-main)">${counts["Pendiente"]}</strong></div>
          </div>
        </div>
      `;
    }

    // Gráfico 3: Segmentación de Clientes
    if (DOM.chartCustomersContainer) {
      const clientes = calcularEstadisticasClientes();
      let vip = 0, rec = 0, nuevo = 0;
      clientes.forEach(c => {
        const b = getClientBadge(c.ordenesCount, c.totalGastado);
        if (b.texto === "VIP") vip++;
        else if (b.texto === "Recurrente") rec++;
        else nuevo++;
      });
      const t = clientes.length || 1;

      DOM.chartCustomersContainer.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:0.9rem; width:100%;">
          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.78rem; font-weight:600; margin-bottom:0.3rem;">
              <span>Cuentas VIP (${vip})</span>
              <span>${Math.round((vip / t) * 100)}%</span>
            </div>
            <div style="background:${zincBarColor}; height:8px; border-radius:4px; overflow:hidden;">
              <div style="width:${(vip / t) * 100}%; background:${amberColor}; height:100%;"></div>
            </div>
          </div>
          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.78rem; font-weight:600; margin-bottom:0.3rem;">
              <span>Compradores Recurrentes (${rec})</span>
              <span>${Math.round((rec / t) * 100)}%</span>
            </div>
            <div style="background:${zincBarColor}; height:8px; border-radius:4px; overflow:hidden;">
              <div style="width:${(rec / t) * 100}%; background:${skyColor}; height:100%;"></div>
            </div>
          </div>
          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.78rem; font-weight:600; margin-bottom:0.3rem;">
              <span>Nuevos Compradores (${nuevo})</span>
              <span>${Math.round((nuevo / t) * 100)}%</span>
            </div>
            <div style="background:${zincBarColor}; height:8px; border-radius:4px; overflow:hidden;">
              <div style="width:${(nuevo / t) * 100}%; background:${emeraldColor}; height:100%;"></div>
            </div>
          </div>
        </div>
      `;
    }

    // Gráfico 4: Modalidad Logística
    if (DOM.chartChannelsContainer) {
      const shippingCount = orders.filter(o => o.entrega?.tipo === "shipping").length;
      const pickupCount = orders.filter(o => o.entrega?.tipo === "pickup").length;
      const total = orders.length || 1;

      DOM.chartChannelsContainer.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:1rem; width:100%;">
          <div style="display:flex; align-items:center; gap:0.85rem;">
            <div class="kpi-icon-box"><i class="fas fa-truck"></i></div>
            <div style="flex:1;">
              <div style="display:flex; justify-content:space-between; font-size:0.78rem; font-weight:600;">
                <span>Envío a Domicilio (${shippingCount})</span>
                <span>${Math.round((shippingCount / total) * 100)}%</span>
              </div>
              <div style="background:${zincBarColor}; height:8px; border-radius:4px; overflow:hidden; margin-top:5px;">
                <div style="width:${(shippingCount / total) * 100}%; background:${emeraldColor}; height:100%;"></div>
              </div>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:0.85rem;">
            <div class="kpi-icon-box"><i class="fas fa-store"></i></div>
            <div style="flex:1;">
              <div style="display:flex; justify-content:space-between; font-size:0.78rem; font-weight:600;">
                <span>Retiro en Sucursal (${pickupCount})</span>
                <span>${Math.round((pickupCount / total) * 100)}%</span>
              </div>
              <div style="background:${zincBarColor}; height:8px; border-radius:4px; overflow:hidden; margin-top:5px;">
                <div style="width:${(pickupCount / total) * 100}%; background:${skyColor}; height:100%;"></div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }

  // --- 10. RENDERIZADO DE CLIENTES Y CATÁLOGO ---
  function renderCrmView() {
    if (!DOM.customerCardsGrid) return;
    const clientesList = calcularEstadisticasClientes();

    DOM.customerCardsGrid.innerHTML = clientesList.map(cust => {
      const badge = getClientBadge(cust.ordenesCount, cust.totalGastado);
      const initials = cust.nombre.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase();

      return `
        <div class="customer-profile-card">
          <div class="customer-card-header">
            <div class="customer-avatar">${initials}</div>
            <div class="customer-name-meta">
              <h3>${cust.nombre}</h3>
              <p>${cust.email}</p>
              <div style="margin-top:0.3rem;">
                <span class="customer-badge ${badge.clase}">${badge.texto}</span>
              </div>
            </div>
          </div>

          <div class="customer-stats-strip">
            <div>
              <span class="cust-stat-label">Pedidos</span>
              <span class="cust-stat-val">${cust.ordenesCount}</span>
            </div>
            <div>
              <span class="cust-stat-label">LTV Acumulado</span>
              <span class="cust-stat-val" style="color:var(--color-primary);">${formatMoney(cust.totalGastado)}</span>
            </div>
          </div>

          <div style="font-size:0.76rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:0.25rem;">
            <div><i class="fas fa-file-invoice" style="width:16px; color:var(--text-muted);"></i> ${cust.condicionIva} ${cust.docNumero ? `(${cust.docNumero})` : ""}</div>
            <div><i class="fas fa-phone" style="width:16px; color:var(--text-muted);"></i> ${cust.telefono || "Sin teléfono"}</div>
            <div style="text-overflow:ellipsis; overflow:hidden; white-space:nowrap;"><i class="fas fa-location-dot" style="width:16px; color:var(--text-muted);"></i> ${cust.direccion}</div>
          </div>

          <button class="btn-view-customer-history" data-customer-email="${cust.email}">
            <i class="fas fa-clock-rotate-left"></i>
            <span>Ver Historial Completo</span>
          </button>
        </div>
      `;
    }).join("");

    DOM.customerCardsGrid.querySelectorAll(".btn-view-customer-history").forEach(btn => {
      btn.addEventListener("click", () => {
        abrirModalCliente(btn.getAttribute("data-customer-email"));
      });
    });

    renderCrmAnalytics();
  }

  function renderCatalogView() {
    if (!DOM.catalogTableBody) return;
    DOM.catalogTableBody.innerHTML = DEFAULT_CATALOG.map(item => `
      <tr>
        <td class="mono-text" style="color:var(--text-muted);">#${item.id}</td>
        <td>
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <img src="${item.imagen}" alt="${item.nombre}" style="width:38px; height:38px; object-fit:contain; background:#fff; border-radius:4px; padding:2px; border:1px solid var(--border-color);" />
            <strong style="color:var(--text-main);">${item.nombre}</strong>
          </div>
        </td>
        <td>${item.categoria}</td>
        <td class="mono-text" style="font-weight:700; color:var(--color-primary);">${formatMoney(item.precio)}</td>
        <td class="mono-text" style="color:var(--text-muted); text-decoration:line-through;">${item.precioAntiguo ? formatMoney(item.precioAntiguo) : "—"}</td>
        <td class="mono-text"><i class="fas fa-star" style="color:#F59E0B; margin-right:4px;"></i>${item.rating}</td>
        <td><span class="customer-badge ${item.badge === 'OFERTA' ? 'vip' : 'nuevo'}">${item.badge}</span></td>
      </tr>
    `).join("");
  }

  // --- 11. DRAWER DETALLE DE ORDEN ---
  function abrirDetalleOrden(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    selectedOrder = order;

    DOM.detailOrderId.textContent = order.id;
    DOM.detailOrderDate.textContent = formatFecha(order.fecha);
    DOM.detailOrderStatusSelect.value = order.estado;

    const cond = order.cliente.condicionIva || "Consumidor Final";
    if (order.cliente.tipoFacturaSugerida) {
      DOM.detailInvoiceTypeSelect.value = order.cliente.tipoFacturaSugerida.toLowerCase().replace(" ", "-");
    } else {
      DOM.detailInvoiceTypeSelect.value = cond === "Responsable Inscripto" ? "factura-a" : "factura-b";
    }

    const statsList = calcularEstadisticasClientes();
    const stat = statsList.find(c => c.email.toLowerCase() === order.cliente.email.toLowerCase()) || { ordenesCount: 1, totalGastado: order.totales.total };
    const badge = getClientBadge(stat.ordenesCount, stat.totalGastado);

    DOM.detailClientName.textContent = order.cliente.nombre;
    DOM.detailClientEmail.textContent = order.cliente.email;
    DOM.detailClientPhone.textContent = order.cliente.telefono || "No especificado";
    DOM.detailClientBadge.textContent = badge.texto;
    DOM.detailClientBadge.className = `customer-badge ${badge.clase}`;
    DOM.detailClientOrdersCount.textContent = `${stat.ordenesCount} ${stat.ordenesCount === 1 ? "pedido" : "pedidos"}`;
    DOM.detailClientLtv.textContent = formatMoney(stat.totalGastado);

    DOM.detailClientFiscal.textContent = order.cliente.condicionIva || "Consumidor Final";
    DOM.detailClientCuit.textContent = order.cliente.docNumero || "No informado";
    if (order.cliente.razonSocial) {
      DOM.detailClientCompany.textContent = order.cliente.razonSocial;
      DOM.detailClientCompanyRow.style.display = "block";
    } else {
      DOM.detailClientCompanyRow.style.display = "none";
    }

    DOM.detailPaymentMethod.textContent = order.pago.metodo;
    DOM.detailPaymentCard.textContent = `${order.pago.marca || "Visa"} (•••• ${order.pago.ultimos4 || "4242"})`;
    DOM.detailPaymentHolder.textContent = order.pago.titular || order.cliente.nombre;
    DOM.detailPaymentInstallments.textContent = `${order.pago.cuotas || 1} cuota(s)`;
    DOM.detailPaymentStatus.textContent = order.pago.estado;

    DOM.detailDeliveryType.textContent = order.entrega.tipo === "shipping" ? "Envío a Domicilio" : "Retiro en Sucursal";
    DOM.detailDeliveryAddress.textContent = order.entrega.direccion;
    DOM.detailDeliveryTracking.textContent = `TRACK-${order.id.replace("MT-", "")}-AR`;

    if (DOM.btnPrintShippingLabel) {
      DOM.btnPrintShippingLabel.style.display = order.entrega.tipo === "shipping" ? "inline-flex" : "none";
    }

    DOM.detailItemsList.innerHTML = order.items.map(item => {
      const info = getItemIconInfo(item.nombre);
      return `
        <div class="order-item-row">
          <div style="display:flex; align-items:center; gap:0.7rem;">
            <div class="item-icon-badge"><i class="fas ${info.icon}"></i></div>
            <div>
              <div class="order-item-title">${item.nombre}</div>
              <div style="font-size:0.72rem; color:var(--text-muted);">${item.cantidad} x ${formatMoney(item.precio)}</div>
            </div>
          </div>
          <div class="order-item-price">${formatMoney(item.precio * item.cantidad)}</div>
        </div>
      `;
    }).join("");

    DOM.detailSubtotal.textContent = formatMoney(order.totales.subtotal);
    DOM.detailDiscount.textContent = order.totales.descuento > 0 ? `-${formatMoney(order.totales.descuento)}` : "$0.00";
    DOM.detailShippingCost.textContent = order.totales.envio > 0 ? formatMoney(order.totales.envio) : "Bonificado ($0.00)";
    DOM.detailTotalAmount.textContent = formatMoney(order.totales.total);

    if (DOM.btnContactWa) {
      const cleanPhone = getSanitizedWhatsAppNumber(order.cliente);
      const msg = encodeURIComponent(`Hola ${order.cliente.nombre}, te escribimos desde MiTienda sobre tu pedido #${order.id}. Estado actual: ${order.estado}.`);
      DOM.btnContactWa.href = `https://wa.me/${cleanPhone}?text=${msg}`;
    }

    DOM.slideoverBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function cerrarDetalleOrden() {
    DOM.slideoverBackdrop.classList.remove("active");
    document.body.style.overflow = "";
    selectedOrder = null;
  }

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

      renderOrdersTable();
      renderCrmAnalytics();
      showToast(`Pedido ${selectedOrder.id} actualizado a "${nuevoEstado}"`, "fa-check");
    });
  }

  // --- 12. IMPRESIÓN DE FACTURAS A/B/C Y REMITO ---
  if (DOM.btnPrintReceipt) {
    DOM.btnPrintReceipt.addEventListener("click", () => {
      if (!selectedOrder) return;
      imprimirComprobanteLimpio(selectedOrder, DOM.detailInvoiceTypeSelect.value);
    });
  }

  function imprimirComprobanteLimpio(order, invoiceType) {
    const printWindow = window.open("", "_blank", "width=850,height=950");
    if (!printWindow) {
      alert("Por favor habilitá las ventanas emergentes para imprimir el comprobante.");
      return;
    }

    const typeTitles = {
      "remito": { letra: "R", cod: "091", nombre: "REMITO DE ENTREGA" },
      "factura-a": { letra: "A", cod: "001", nombre: "FACTURA" },
      "factura-b": { letra: "B", cod: "006", nombre: "FACTURA" },
      "factura-c": { letra: "C", cod: "011", nombre: "FACTURA" }
    };
    const conf = typeTitles[invoiceType] || typeTitles["factura-b"];
    const isFacturaA = invoiceType === "factura-a";
    const subtotalBruto = order.totales.subtotal;
    const netoGravado = isFacturaA ? subtotalBruto / 1.21 : subtotalBruto;
    const iva21 = isFacturaA ? subtotalBruto - netoGravado : 0;

    const receiptHtml = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>${conf.nombre} ${conf.letra} — ${order.id}</title>
        <style>
          @page { size: A4 portrait; margin: 12mm; }
          * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; color: #111; }
          body { background: #fff; padding: 15px; font-size: 13px; line-height: 1.4; }
          .receipt-box { border: 2px solid #000; padding: 16px; }
          .header-grid { display: grid; grid-template-columns: 1fr 90px 1fr; border-bottom: 2px solid #000; padding-bottom: 12px; margin-bottom: 12px; }
          .emitter-col h1 { font-size: 22px; font-weight: 800; }
          .emitter-col p { font-size: 11px; color: #444; }
          .letter-box { border: 2px solid #000; border-top: none; text-align: center; width: 80px; height: 80px; margin: 0 auto; display: flex; flex-direction: column; justify-content: center; }
          .letter-box h2 { font-size: 38px; line-height: 1; font-weight: 900; }
          .letter-box span { font-size: 9px; font-weight: bold; }
          .doc-col { text-align: right; }
          .doc-col h2 { font-size: 18px; font-weight: 800; }
          .doc-col p { font-size: 11px; }
          .client-box { border: 1px solid #999; padding: 10px; margin-bottom: 15px; background: #fafafa; }
          .client-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 11.5px; }
          table.items-table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
          table.items-table th { background: #eee; border: 1px solid #999; padding: 6px 8px; font-size: 11px; text-transform: uppercase; text-align: left; }
          table.items-table td { border: 1px solid #ccc; padding: 6px 8px; font-size: 11.5px; }
          .totals-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 15px; align-items: start; }
          .qr-dummy { border: 1px solid #ccc; padding: 8px; font-size: 10px; display: flex; align-items: center; gap: 10px; }
          .qr-box { width: 65px; height: 65px; background: #000; }
          .totals-table { width: 100%; border-collapse: collapse; }
          .totals-table td { padding: 4px 6px; font-size: 12px; }
          .totals-table .total-row { font-size: 15px; font-weight: bold; border-top: 2px solid #000; border-bottom: 2px solid #000; }
          .print-btn-bar { margin-bottom: 15px; text-align: right; }
          .print-btn { background: #111; color: #fff; border: none; padding: 8px 16px; font-weight: bold; cursor: pointer; }
          @media print { .print-btn-bar { display: none; } }
        </style>
      </head>
      <body>
        <div class="print-btn-bar">
          <button class="print-btn" onclick="window.print()">Imprimir Comprobante</button>
        </div>
        <div class="receipt-box">
          <div class="header-grid">
            <div class="emitter-col">
              <h1>MiTienda S.R.L.</h1>
              <p>Av. Colón 1234, Centro, Córdoba (CP 5000)</p>
              <p>Tel: +54 9 351 261-9874 | ventas@mitienda.com.ar</p>
              <p><strong>IVA Responsable Inscripto</strong></p>
            </div>
            <div class="letter-box">
              <h2>${conf.letra}</h2>
              <span>COD. ${conf.cod}</span>
            </div>
            <div class="doc-col">
              <h2>${conf.nombre}</h2>
              <p><strong>Nro:</strong> 0004-000${order.id.replace("MT-", "")}</p>
              <p><strong>Fecha:</strong> ${formatFecha(order.fecha).split(" ")[0]}</p>
              <p><strong>CUIT:</strong> 30-71234567-9</p>
              <p><strong>IIBB:</strong> 901-284910-1</p>
            </div>
          </div>
          <div class="client-box">
            <div class="client-grid">
              <div><strong>Receptor:</strong> ${order.cliente.razonSocial ? `${order.cliente.razonSocial} (${order.cliente.nombre})` : order.cliente.nombre}</div>
              <div><strong>CUIT / DNI:</strong> ${order.cliente.docNumero || "Consumidor Final"}</div>
              <div><strong>Condición IVA:</strong> ${order.cliente.condicionIva || "Consumidor Final"}</div>
              <div><strong>Medio de Pago:</strong> ${order.pago.metodo} (${order.pago.marca || "Visa"} •••• ${order.pago.ultimos4})</div>
              <div><strong>Domicilio:</strong> ${order.entrega.direccion}</div>
              <div><strong>Teléfono:</strong> ${order.cliente.telefono || "-"}</div>
            </div>
          </div>
          <table class="items-table">
            <thead>
              <tr>
                <th style="width: 50px;">Cant.</th>
                <th>Descripción</th>
                ${isFacturaA ? '<th style="width: 90px; text-align:right;">Neto Unit.</th><th style="width: 60px; text-align:center;">IVA</th>' : '<th style="width: 90px; text-align:right;">Precio Unit.</th>'}
                <th style="width: 100px; text-align: right;">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              ${order.items.map(item => {
                const pNeto = isFacturaA ? (item.precio / 1.21) : item.precio;
                return `
                  <tr>
                    <td style="text-align: center;">${item.cantidad}</td>
                    <td><strong>${item.nombre}</strong></td>
                    <td style="text-align: right;">${formatMoney(pNeto)}</td>
                    ${isFacturaA ? '<td style="text-align: center;">21%</td>' : ""}
                    <td style="text-align: right;"><strong>${formatMoney(pNeto * item.cantidad)}</strong></td>
                  </tr>
                `;
              }).join("")}
            </tbody>
          </table>
          <div class="totals-grid">
            <div class="qr-dummy">
              <div class="qr-box"></div>
              <div>
                <p style="font-weight:bold;">Comprobante Electrónico Autorizado</p>
                <p>CAE Nº: 74182938472910 · Vto: 25/12/2026</p>
                <p style="color:#555;">Tracking: TRACK-${order.id.replace("MT-", "")}-AR</p>
              </div>
            </div>
            <table class="totals-table">
              ${isFacturaA ? `
                <tr><td>Importe Neto Gravado:</td><td style="text-align:right;">${formatMoney(netoGravado)}</td></tr>
                <tr><td>IVA 21%:</td><td style="text-align:right;">${formatMoney(iva21)}</td></tr>
              ` : `
                <tr><td>Subtotal:</td><td style="text-align:right;">${formatMoney(order.totales.subtotal)}</td></tr>
              `}
              ${order.totales.descuento > 0 ? `<tr><td>Descuento aplicado:</td><td style="text-align:right;">-${formatMoney(order.totales.descuento)}</td></tr>` : ""}
              <tr><td>Costo de Envío:</td><td style="text-align:right;">${order.totales.envio > 0 ? formatMoney(order.totales.envio) : "Bonificado"}</td></tr>
              <tr class="total-row"><td>IMPORTE TOTAL:</td><td style="text-align:right;">${formatMoney(order.totales.total)}</td></tr>
            </table>
          </div>
        </div>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(receiptHtml);
    printWindow.document.close();
  }

  // --- 13. RÓTULO DE ENVÍO (10x15 CM) ---
  if (DOM.btnPrintShippingLabel) {
    DOM.btnPrintShippingLabel.addEventListener("click", () => {
      if (!selectedOrder) return;
      imprimirRotuloEnvio(selectedOrder);
    });
  }

  function imprimirRotuloEnvio(order) {
    const printWindow = window.open("", "_blank", "width=600,height=800");
    if (!printWindow) {
      alert("Por favor habilitá las ventanas emergentes para imprimir el rótulo.");
      return;
    }

    const trackCode = `TRACK-${order.id.replace("MT-", "")}-AR`;
    const labelHtml = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Rótulo Logístico — ${order.id}</title>
        <style>
          @page { size: 100mm 150mm; margin: 0; }
          * { box-sizing: border-box; margin: 0; padding: 0; font-family: Arial, sans-serif; }
          body { background: #fff; width: 100mm; height: 150mm; margin: 0 auto; padding: 4mm; display: flex; flex-direction: column; justify-content: space-between; border: 1.5px solid #000; font-size: 11px; }
          .label-header { border-bottom: 2px solid #000; padding-bottom: 3mm; display: flex; justify-content: space-between; }
          .delivery-title { font-size: 16px; font-weight: 900; text-align: center; padding: 2mm 0; border-bottom: 2px solid #000; text-transform: uppercase; }
          .qr-section { display: flex; justify-content: space-between; align-items: center; padding: 3mm 0; border-bottom: 2px solid #000; }
          .qr-graphic { width: 32mm; height: 32mm; border: 2px solid #000; background: #000; }
          .zip-info { text-align: right; flex: 1; padding-left: 4mm; }
          .zip-code { font-size: 24px; font-weight: 900; }
          .barcode-section { text-align: center; padding: 2mm 0; border-bottom: 2px solid #000; }
          .barcode-bars { height: 12mm; background: repeating-linear-gradient(90deg, #000 0, #000 2px, #fff 2px, #fff 4px, #000 4px, #000 7px, #fff 7px, #fff 9px); width: 85%; margin: 0 auto; }
          .dest-header { font-size: 12px; font-weight: 900; background: #000; color: #fff; padding: 1.5mm; text-align: center; text-transform: uppercase; margin-bottom: 2mm; }
          .dest-info { font-size: 10.5px; line-height: 1.4; }
          .footer-section { border-top: 1px dashed #000; padding-top: 2mm; font-size: 8.5px; display: flex; justify-content: space-between; }
          .print-bar { position: fixed; top: 10px; right: 10px; }
          .btn-print { background: #000; color: #fff; padding: 6px 12px; font-weight: bold; border: none; cursor: pointer; }
          @media print { .print-bar { display: none; } }
        </style>
      </head>
      <body>
        <div class="print-bar"><button class="btn-print" onclick="window.print()">Imprimir Rótulo</button></div>
        <div>
          <div class="label-header">
            <div><strong>MITIENDA LOGÍSTICA</strong><br><small>Av. Colón 1234, Córdoba</small></div>
            <div style="text-align:right;">Orden: <strong>#${order.id}</strong></div>
          </div>
          <div class="delivery-title">Despacho Prioritario a Domicilio</div>
          <div class="qr-section">
            <div class="qr-graphic"></div>
            <div class="zip-info">
              <div>CÓDIGO POSTAL</div>
              <div class="zip-code">${order.entrega.direccion.match(/CP\s*(\d+)/i)?.[1] || "5000"}</div>
              <div><strong>CÓRDOBA, AR</strong></div>
            </div>
          </div>
          <div class="barcode-section">
            <div class="barcode-bars"></div>
            <div style="font-family:monospace; font-weight:bold; margin-top:3px;">${trackCode}</div>
          </div>
        </div>
        <div>
          <div class="dest-header">Datos del Destinatario</div>
          <div class="dest-info">
            <div><strong>Recibe:</strong> ${order.cliente.nombre}</div>
            <div><strong>Domicilio:</strong> ${order.entrega.direccion}</div>
            <div><strong>Teléfono:</strong> ${order.cliente.telefono || "-"}</div>
            <div><strong>Contenido:</strong> ${order.items.map(i => `${i.cantidad}x ${i.nombre}`).join(", ")}</div>
          </div>
          <div class="footer-section">
            <span>Tracking: ${trackCode}</span>
            <span>Bultos: 1/1</span>
          </div>
        </div>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(labelHtml);
    printWindow.document.close();
  }

  // --- 14. MODAL CLIENTE 360° ---
  function abrirModalCliente(email) {
    const clientes = calcularEstadisticasClientes();
    const cust = clientes.find(c => c.email.toLowerCase() === email.toLowerCase());
    if (!cust) return;

    const badge = getClientBadge(cust.ordenesCount, cust.totalGastado);
    const cleanPhone = getSanitizedWhatsAppNumber(cust);

    DOM.customerModalBody.innerHTML = `
      <div style="display:flex; align-items:center; gap:1rem;">
        <div class="customer-avatar" style="width:48px; height:48px; font-size:1.1rem;">
          ${cust.nombre.split(" ").map(n => n[0]).join("").substring(0, 2).toUpperCase()}
        </div>
        <div>
          <h4 style="font-size:1.1rem; font-weight:700; color:var(--text-main);">${cust.nombre}</h4>
          <p style="font-size:0.82rem; color:var(--text-muted);">${cust.email}</p>
          <span class="customer-badge ${badge.clase}" style="margin-top:0.25rem;">${badge.texto}</span>
        </div>
      </div>

      <div class="customer-stats-strip">
        <div>
          <span class="cust-stat-label">Total Pedidos</span>
          <span class="cust-stat-val">${cust.ordenesCount}</span>
        </div>
        <div>
          <span class="cust-stat-label">Gasto Acumulado (LTV)</span>
          <span class="cust-stat-val" style="color:var(--color-primary);">${formatMoney(cust.totalGastado)}</span>
        </div>
        <div>
          <span class="cust-stat-label">Condición Fiscal</span>
          <span class="cust-stat-val" style="font-size:0.85rem;">${cust.condicionIva}</span>
        </div>
        <div>
          <span class="cust-stat-label">DNI / CUIT</span>
          <span class="cust-stat-val mono-text" style="font-size:0.85rem;">${cust.docNumero || "Consumidor Final"}</span>
        </div>
      </div>

      <div>
        <h4 style="font-size:0.82rem; font-weight:600; text-transform:uppercase; color:var(--text-muted); margin-bottom:0.6rem;">
          Historial de Operaciones
        </h4>
        <div style="display:flex; flex-direction:column; gap:0.5rem; max-height:210px; overflow-y:auto;">
          ${cust.ordenes.map(o => `
            <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-elevated); padding:0.65rem 0.85rem; border-radius:var(--radius-sm); border:1px solid var(--border-color);">
              <div>
                <strong class="mono-text" style="color:var(--color-primary);">${o.id}</strong>
                <span style="font-size:0.72rem; color:var(--text-muted); margin-left:6px;">${formatFecha(o.fecha)}</span>
                <div style="font-size:0.76rem; color:var(--text-secondary); margin-top:2px;">
                  ${o.items.map(i => `${i.cantidad}x ${i.nombre}`).join(", ")}
                </div>
              </div>
              <div style="text-align:right;">
                <div class="mono-text" style="font-weight:700;">${formatMoney(o.totales.total)}</div>
                <span class="status-badge ${getStatusBadgeClass(o.estado)}" style="font-size:0.66rem;">${o.estado}</span>
              </div>
            </div>
          `).join("")}
        </div>
      </div>

      <a href="https://wa.me/${cleanPhone}?text=${encodeURIComponent(`Hola ${cust.nombre}, te escribimos desde MiTienda.`)}" target="_blank" rel="noopener" class="btn-emerald-primary" style="width:100%; justify-content:center;">
        <i class="fab fa-whatsapp"></i>
        <span>Contactar por WhatsApp</span>
      </a>
    `;

    DOM.customerModal.classList.add("active");
  }

  // --- 15. EXPORTAR CSV ---
  if (DOM.btnExportCsv) {
    DOM.btnExportCsv.addEventListener("click", () => {
      if (orders.length === 0) {
        showToast("No hay pedidos para exportar", "fa-circle-exclamation");
        return;
      }

      const headers = ["ID Orden", "Fecha", "Cliente", "Email", "Telefono", "Condicion IVA", "DNI/CUIT", "Razon Social", "Entrega", "Direccion", "Pago", "Total", "Estado"];
      const rows = orders.map(o => [
        `"${o.id}"`,
        `"${formatFecha(o.fecha)}"`,
        `"${(o.cliente.nombre || "").replace(/"/g, '""')}"`,
        `"${(o.cliente.email || "").replace(/"/g, '""')}"`,
        `"${(o.cliente.telefono || "").replace(/"/g, '""')}"`,
        `"${(o.cliente.condicionIva || "Consumidor Final").replace(/"/g, '""')}"`,
        `"${(o.cliente.docNumero || "").replace(/"/g, '""')}"`,
        `"${(o.cliente.razonSocial || "").replace(/"/g, '""')}"`,
        `"${o.entrega.tipo === "shipping" ? "Envio a Domicilio" : "Retiro en Sucursal"}"`,
        `"${(o.entrega.direccion || "").replace(/"/g, '""')}"`,
        `"${o.pago.metodo}"`,
        o.totales.total.toFixed(2),
        `"${o.estado}"`
      ]);

      const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(r => r.join(","))].join("\r\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `MiTienda_Pedidos_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast("Archivo CSV descargado", "fa-file-csv");
    });
  }

  // --- 16. NUEVA ORDEN DE PRUEBA ---
  const MOCK_BUYERS = [
    { nombre: "Camila Domínguez", email: "camila.dominguez@gmail.com", tel: "3516109922", dir: "Bv. Chacabuco 780, Nueva Córdoba", cond: "Consumidor Final", doc: "40192831", rs: "" },
    { nombre: "Franco Navarro", email: "franco.navarro@outlook.com", tel: "3513349011", dir: "Av. Hipólito Yrigoyen 240, Córdoba", cond: "Responsable Inscripto", doc: "30-71994012-8", rs: "Navarro Tecnologías S.R.L." },
    { nombre: "Lucía Villalba", email: "lucia.villalba@yahoo.com", tel: "3541620099", dir: "Av. San Martín 820, Villa Carlos Paz", cond: "Monotributo", doc: "27-38192011-3", rs: "Estudio Villalba" },
    { nombre: "Agustín Morales", email: "agustin.morales@gmail.com", tel: "3584102988", dir: "Sobremonte 510, Río Cuarto", cond: "Consumidor Final", doc: "39201940", rs: "" }
  ];

  function crearOrdenDePrueba() {
    const buyer = MOCK_BUYERS[Math.floor(Math.random() * MOCK_BUYERS.length)];
    const prod = DEFAULT_CATALOG[Math.floor(Math.random() * DEFAULT_CATALOG.length)];
    const qty = 1;
    const isShipping = Math.random() > 0.3;
    const costoEnv = prod.precio >= 150 ? 0 : (isShipping ? 10.00 : 0);
    const subtotal = prod.precio * qty;
    const total = subtotal + costoEnv;

    const nueva = {
      id: "MT-" + Math.floor(100000 + Math.random() * 900000),
      fecha: new Date().toISOString(),
      cliente: {
        nombre: buyer.nombre,
        email: buyer.email,
        codigoPais: "+54",
        telefonoNum: buyer.tel,
        telefono: `+54 9 ${buyer.tel.substring(0, 3)} ${buyer.tel.substring(3)}`,
        telefonoWhatsApp: `549${buyer.tel}`,
        condicionIva: buyer.cond,
        docNumero: buyer.doc,
        razonSocial: buyer.rs,
        tipoFacturaSugerida: buyer.cond === "Responsable Inscripto" ? "Factura A" : "Factura B",
        direccion: buyer.dir
      },
      entrega: {
        tipo: isShipping ? "shipping" : "pickup",
        costo: costoEnv,
        direccion: isShipping ? buyer.dir : "Retiro en Sucursal (Av. Colón 1234, Córdoba)"
      },
      pago: {
        metodo: "Tarjeta de Crédito",
        marca: ["Visa Signature", "Mastercard Black", "Amex"][Math.floor(Math.random() * 3)],
        ultimos4: String(Math.floor(1000 + Math.random() * 9000)),
        titular: buyer.nombre.toUpperCase(),
        estado: "Aprobado",
        cuotas: [1, 3, 6][Math.floor(Math.random() * 3)]
      },
      items: [
        { id: prod.id, nombre: prod.nombre, precio: prod.precio, cantidad: qty }
      ],
      totales: {
        subtotal,
        descuento: 0,
        envio: costoEnv,
        total
      },
      estado: "Pendiente"
    };

    orders.unshift(nueva);
    localStorage.setItem("mt_orders", JSON.stringify(orders));

    showToast(`Orden ${nueva.id} registrada (${buyer.nombre})`, "fa-check");
    updateKpis();
    renderOrdersTable();
    renderCrmAnalytics();
  }

  if (DOM.btnSimulateOrder) {
    DOM.btnSimulateOrder.addEventListener("click", crearOrdenDePrueba);
  }

  // --- 17. SINCRONIZACIÓN CROSS-TAB CON LA TIENDA ---
  if (window.BroadcastChannel) {
    const channel = new BroadcastChannel("mitienda_channel");
    channel.onmessage = (event) => {
      if (event.data?.tipo === "NUEVA_ORDEN") {
        const nueva = event.data.orden;
        if (!orders.some(o => o.id === nueva.id)) {
          orders.unshift(nueva);
          updateKpis();
          renderOrdersTable();
          renderCrmAnalytics();
          showToast(`Nuevo pedido recibido desde la tienda: ${nueva.id}`, "fa-bag-shopping");
        }
      }
    };
  }

  window.addEventListener("storage", (e) => {
    if (e.key === "mt_orders" && e.newValue) {
      try {
        orders = JSON.parse(e.newValue);
        updateKpis();
        renderOrdersTable();
        renderCrmAnalytics();
      } catch (err) {
        console.warn("Error leyendo storage:", err);
      }
    }
  });

  // --- 18. NAVEGACIÓN DE VISTAS DEL SIDEBAR ---
  function setActiveView(view) {
    document.querySelectorAll(".sidebar-nav .nav-item").forEach(el => el.classList.remove("active"));

    DOM.ordersViewSection?.classList.add("hidden");
    DOM.crmViewSection?.classList.remove("active");
    DOM.catalogViewSection?.classList.add("hidden");

    if (view === "orders") {
      DOM.ordersViewSection?.classList.remove("hidden");
      DOM.navOrdersLink?.classList.add("active");
      if (DOM.pageViewTitle) DOM.pageViewTitle.textContent = "Panel General";
      if (DOM.pageViewSubtitle) DOM.pageViewSubtitle.textContent = "Resumen de facturación, métricas operativas y bandeja de pedidos.";
      renderOrdersTable();
      renderCrmAnalytics();
    } else if (view === "crm") {
      DOM.crmViewSection?.classList.add("active");
      DOM.navCrmLink?.classList.add("active");
      if (DOM.pageViewTitle) DOM.pageViewTitle.textContent = "Analíticas y Directorio de Clientes";
      if (DOM.pageViewSubtitle) DOM.pageViewSubtitle.textContent = "Segmentación de cartera, perfiles fiscales e historial 360°.";
      renderCrmView();
    } else if (view === "catalog") {
      DOM.catalogViewSection?.classList.remove("hidden");
      DOM.navCatalogLink?.classList.add("active");
      if (DOM.pageViewTitle) DOM.pageViewTitle.textContent = "Catálogo de Productos";
      if (DOM.pageViewSubtitle) DOM.pageViewSubtitle.textContent = "Listado de los 16 artículos publicados en la tienda web.";
      renderCatalogView();
    }

    if (window.innerWidth <= 860) {
      DOM.sidebar?.classList.remove("open");
    }
  }

  [DOM.navOrdersLink, DOM.navPedidosShortcut].forEach(el => {
    if (el) {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        setActiveView("orders");
      });
    }
  });

  [DOM.navCrmLink, DOM.navClientesShortcut].forEach(el => {
    if (el) {
      el.addEventListener("click", (e) => {
        e.preventDefault();
        setActiveView("crm");
      });
    }
  });

  if (DOM.navCatalogLink) {
    DOM.navCatalogLink.addEventListener("click", (e) => {
      e.preventDefault();
      setActiveView("catalog");
    });
  }

  if (DOM.sidebarToggle && DOM.sidebar) {
    DOM.sidebarToggle.addEventListener("click", () => {
      DOM.sidebar.classList.toggle("open");
    });
  }

  // Buscadores y Filtros
  if (DOM.orderSearchInput) {
    DOM.orderSearchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim();
      renderOrdersTable();
    });
  }

  if (DOM.globalSearchInput) {
    DOM.globalSearchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim();
      if (DOM.orderSearchInput) DOM.orderSearchInput.value = searchQuery;
      setActiveView("orders");
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

  // Cerrar Drawer y Modales
  if (DOM.btnCloseSlideover) DOM.btnCloseSlideover.addEventListener("click", cerrarDetalleOrden);
  if (DOM.slideoverBackdrop) {
    DOM.slideoverBackdrop.addEventListener("click", (e) => {
      if (e.target === DOM.slideoverBackdrop) cerrarDetalleOrden();
    });
  }

  if (DOM.btnCloseCustomerModal) {
    DOM.btnCloseCustomerModal.addEventListener("click", () => {
      DOM.customerModal.classList.remove("active");
    });
  }
  if (DOM.customerModal) {
    DOM.customerModal.addEventListener("click", (e) => {
      if (e.target === DOM.customerModal) DOM.customerModal.classList.remove("active");
    });
  }

  function showToast(msg, icon = "fa-check") {
    if (!DOM.toastContainer) return;
    const toast = document.createElement("div");
    toast.className = "toast-msg";
    toast.innerHTML = `<i class="fas ${icon}" style="color:var(--color-primary)"></i><span>${msg}</span>`;
    DOM.toastContainer.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("show"));
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 250);
    }, 3000);
  }

  // --- 19. INICIALIZACIÓN ---
  initTheme();
  updateKpis();
  renderOrdersTable();
  renderCrmAnalytics();
  renderCatalogView();
});

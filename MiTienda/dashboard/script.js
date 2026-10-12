/* ==========================================================================
   MITIENDA CRM & REAL-TIME ORDERS DASHBOARD — JAVASCRIPT CONTROLLER
   Live Ingestion, Analytics Charts, MeLi Labels, AFIP Invoicing & Clean Printing
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  'use strict';

  // --- 1. DATOS SEMILLA REALISTAS (CON DATOS FISCALES Y LOGÍSTICOS) ---
  const SEED_ORDERS = [
    {
      id: "MT-894215",
      fecha: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
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
        { id: 1, nombre: "iPhone 15 Pro", precio: 1499.99, cantidad: 1 }
      ],
      totales: {
        subtotal: 1499.99,
        descuento: 299.99,
        envio: 10.00,
        total: 1210.00
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
        { id: 2, nombre: "Laptop Gamer Victus", precio: 1250.00, cantidad: 1 },
        { id: 3, nombre: "Zapatillas Nike Air Max", precio: 180.50, cantidad: 1 }
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
        { id: 4, nombre: "Camiseta Boca Juniors 24", precio: 110.00, cantidad: 2 }
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
        costo: 10.00,
        direccion: "Bv. Chacabuco 640, Piso 4B, Córdoba (CP 5000)"
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
        { id: 6, nombre: "Lámpara Lava Retro", precio: 75.00, cantidad: 1 }
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
        { id: 5, nombre: "Sofá Minimalista 2 Cuerpos", precio: 790.00, cantidad: 1 }
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

  // --- 2. ESTADO GLOBAL ---
  let orders = JSON.parse(localStorage.getItem("mt_orders")) || [];
  if (orders.length === 0) {
    orders = [...SEED_ORDERS];
    localStorage.setItem("mt_orders", JSON.stringify(orders));
  }

  let activeView = "orders";
  let searchQuery = "";
  let statusFilter = "all";
  let deliveryFilter = "all";
  let selectedOrder = null;

  // --- 3. REFERENCIAS DOM ---
  const DOM = {
    themeToggle: document.getElementById("theme-toggle"),
    btnSimulateOrder: document.getElementById("btn-simulate-order"),
    sidebarToggle: document.getElementById("sidebar-toggle"),
    sidebar: document.getElementById("admin-sidebar"),
    navOrdersLink: document.getElementById("nav-orders-link"),
    navCrmLink: document.getElementById("nav-crm-link"),
    ordersCountBadge: document.getElementById("orders-count-badge"),
    customersCountBadge: document.getElementById("customers-count-badge"),

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

    // Gráficos CRM
    chartSalesContainer: document.getElementById("chart-sales-container"),
    chartStatusContainer: document.getElementById("chart-status-container"),
    chartCustomersContainer: document.getElementById("chart-customers-container"),
    chartChannelsContainer: document.getElementById("chart-channels-container"),
    customerCardsGrid: document.getElementById("customer-cards-grid"),

    // Drawer Slide-Over
    slideoverBackdrop: document.getElementById("slideover-backdrop"),
    slideoverPanel: document.getElementById("slideover-panel"),
    btnCloseSlideover: document.getElementById("btn-close-slideover"),
    detailOrderId: document.getElementById("detail-order-id"),
    detailOrderDate: document.getElementById("detail-order-date"),
    detailOrderStatusSelect: document.getElementById("detail-order-status-select"),
    detailInvoiceTypeSelect: document.getElementById("detail-invoice-type-select"),

    // Drawer Ficha Cliente & Fiscal
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

    // Drawer Pago & Logística
    detailPaymentMethod: document.getElementById("detail-payment-method"),
    detailPaymentCard: document.getElementById("detail-payment-card"),
    detailPaymentHolder: document.getElementById("detail-payment-holder"),
    detailPaymentInstallments: document.getElementById("detail-payment-installments"),
    detailPaymentStatus: document.getElementById("detail-payment-status"),
    detailDeliveryType: document.getElementById("detail-delivery-type"),
    detailDeliveryAddress: document.getElementById("detail-delivery-address"),
    detailDeliveryTracking: document.getElementById("detail-delivery-tracking"),

    // Drawer Items & Totales
    detailItemsList: document.getElementById("detail-items-list"),
    detailSubtotal: document.getElementById("detail-subtotal"),
    detailDiscount: document.getElementById("detail-discount"),
    detailShippingCost: document.getElementById("detail-shipping-cost"),
    detailTotalAmount: document.getElementById("detail-total-amount"),

    // Drawer Acciones
    btnPrintReceipt: document.getElementById("btn-print-receipt"),
    btnPrintShippingLabel: document.getElementById("btn-print-shipping-label"),
    btnContactWa: document.getElementById("btn-contact-customer-wa"),

    // Modal Cliente 360°
    customerModal: document.getElementById("customer-modal"),
    customerModalBody: document.getElementById("customer-modal-body"),
    btnCloseCustomerModal: document.getElementById("btn-close-customer-modal"),

    toastContainer: document.getElementById("toast-container")
  };

  // --- 4. TEMA OSCURO / CLARO ---
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
      showToast(newTheme === "dark" ? "Modo oscuro activado" : "Modo claro activado", "fa-moon");
      renderCrmAnalytics();
    });
  }

  // --- 5. AUDIO CHIME DE COMPRA EN VIVO ---
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
        osc.frequency.setValueAtTime(freq, start);
        gain.gain.setValueAtTime(0, start);
        gain.gain.linearRampToValueAtTime(0.2, start + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, start + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(start);
        osc.stop(start + duration);
      };

      playTone(587.33, now, 0.25);        // D5
      playTone(880.00, now + 0.12, 0.45); // A5
    } catch (e) {
      // Audio autoplay policy
    }
  }

  // --- 6. UTILIDADES: FORMATEO TELEFÓNICO SANITIZADO PARA WHATSAPP ---
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

  // ÍCONOS DE PRODUCTO SEGUROS (ELIMINA IMÁGENES ROTAS)
  function getItemIconInfo(nombre) {
    const n = (nombre || "").toLowerCase();
    if (n.includes("iphone") || n.includes("phone") || n.includes("celular")) {
      return { icon: "fa-mobile-screen-button", clase: "phone" };
    }
    if (n.includes("laptop") || n.includes("gamer") || n.includes("victus") || n.includes("pc")) {
      return { icon: "fa-laptop", clase: "laptop" };
    }
    if (n.includes("zapatilla") || n.includes("nike") || n.includes("zapato") || n.includes("shoe")) {
      return { icon: "fa-shoe-prints", clase: "shoes" };
    }
    if (n.includes("camiseta") || n.includes("remera") || n.includes("ropa") || n.includes("boca")) {
      return { icon: "fa-shirt", clase: "shirt" };
    }
    if (n.includes("sofá") || n.includes("sofa") || n.includes("sillon") || n.includes("hogar") || n.includes("lampara")) {
      return { icon: "fa-couch", clase: "home" };
    }
    return { icon: "fa-box-open", clase: "box" };
  }

  function formatMoney(amount) {
    return "$" + Number(amount || 0).toLocaleString("es-AR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function formatFecha(isoString) {
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString("es-AR", { day: '2-digit', month: '2-digit', year: 'numeric' }) +
             ' ' + d.toLocaleTimeString("es-AR", { hour: '2-digit', minute: '2-digit' });
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

  // --- 7. CÁLCULO DE KPIS Y CLIENTES CRM ---
  function calcularEstadisticasClientes() {
    const map = {};
    orders.forEach(o => {
      const email = (o.cliente?.email || "sin-email").toLowerCase();
      if (!map[email]) {
        map[email] = {
          nombre: o.cliente?.nombre || "Cliente Anónimo",
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
  }

  // --- 8. FILTRADO Y RENDERIZADO DE TABLA (COMPACTA Y SIN SCROLLBARS) ---
  function getFilteredOrders() {
    return orders.filter(o => {
      if (statusFilter !== "all" && o.estado !== statusFilter) return false;
      if (deliveryFilter !== "all" && o.entrega?.tipo !== deliveryFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchId = (o.id || "").toLowerCase().includes(q);
        const matchName = (o.cliente?.nombre || "").toLowerCase().includes(q);
        const matchEmail = (o.cliente?.email || "").toLowerCase().includes(q);
        const matchDir = (o.entrega?.direccion || "").toLowerCase().includes(q);
        if (!matchId && !matchName && !matchEmail && !matchDir) return false;
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
      const clientEmail = (order.cliente?.email || "").toLowerCase();
      const stat = statsMap[clientEmail] || { ordenesCount: 1, totalGastado: order.totales?.total || 0 };
      const badge = getClientBadge(stat.ordenesCount, stat.totalGastado);

      return `
        <tr>
          <td>
            <strong style="font-family:var(--font-mono); color:var(--color-primary);">${order.id}</strong>
            <div style="font-size:0.7rem; color:var(--text-muted);">${formatFecha(order.fecha)}</div>
          </td>
          <td>
            <div style="font-weight:700;">${order.cliente.nombre}</div>
            <div style="display:flex; align-items:center; gap:0.4rem; margin-top:0.2rem;">
              <span class="customer-badge ${badge.clase}">${badge.texto}</span>
              <span style="font-size:0.68rem; color:var(--text-muted);">(${stat.ordenesCount} ${stat.ordenesCount === 1 ? 'pedido' : 'pedidos'})</span>
            </div>
          </td>
          <td>
            <div style="display:flex; align-items:center; gap:0.4rem;">
              <i class="fas ${order.entrega.tipo === 'shipping' ? 'fa-truck' : 'fa-store'}" style="color:var(--text-muted); font-size:0.85rem;"></i>
              <span style="font-weight:600; font-size:0.78rem;">${order.entrega.tipo === 'shipping' ? 'Envío a Domicilio' : 'Retiro en Local'}</span>
            </div>
            <div style="font-size:0.7rem; color:var(--text-muted); max-width:180px; text-overflow:ellipsis; overflow:hidden; white-space:nowrap;">
              ${order.entrega.direccion}
            </div>
          </td>
          <td>
            <div style="display:flex; align-items:center; gap:0.35rem;">
              <i class="fab fa-cc-visa" style="color:var(--color-primary); font-size:1rem;"></i>
              <span style="font-family:var(--font-mono); font-size:0.76rem;">•••• ${order.pago.ultimos4 || '4242'}</span>
            </div>
            <span style="font-size:0.68rem; color:var(--color-success); font-weight:700;">● ${order.pago.estado}</span>
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

    DOM.ordersTableBody.querySelectorAll(".btn-table-action").forEach(btn => {
      btn.addEventListener("click", () => {
        const id = btn.getAttribute("data-order-id");
        abrirDetalleOrden(id);
      });
    });
  }

  // --- 9. RENDERIZADO DE GRÁFICOS ANALÍTICOS CRM ---
  function renderCrmAnalytics() {
    const isDark = document.body.getAttribute("data-theme") === "dark";
    const textColor = isDark ? "#94a3b8" : "#475569";
    const primaryColor = isDark ? "#6366f1" : "#4f46e5";
    const successColor = "#10b981";
    const warningColor = "#f59e0b";
    const infoColor = "#0284c7";

    // Gráfico 1: Ventas Recientes (Trend Curve SVG)
    if (DOM.chartSalesContainer) {
      const recentOrders = [...orders].slice(0, 7).reverse();
      const amounts = recentOrders.map(o => Number(o.totales?.total || 0));
      const maxVal = Math.max(...amounts, 100);
      const points = amounts.map((val, idx) => {
        const x = 30 + (idx * (280 / Math.max(amounts.length - 1, 1)));
        const y = 140 - (val / maxVal * 105);
        return { x, y, val, id: recentOrders[idx]?.id };
      });

      const pathD = points.reduce((acc, p, i) => i === 0 ? `M ${p.x} ${p.y}` : `${acc} L ${p.x} ${p.y}`, "");
      const areaD = points.length ? `${pathD} L ${points[points.length - 1].x} 150 L ${points[0].x} 150 Z` : "";

      DOM.chartSalesContainer.innerHTML = `
        <svg class="chart-svg" viewBox="0 0 340 160">
          <defs>
            <linearGradient id="salesGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stop-color="${primaryColor}" stop-opacity="0.35"/>
              <stop offset="100%" stop-color="${primaryColor}" stop-opacity="0.0"/>
            </linearGradient>
          </defs>
          <path d="${areaD}" fill="url(#salesGrad)" />
          <path d="${pathD}" fill="none" stroke="${primaryColor}" stroke-width="3" stroke-linecap="round" />
          ${points.map(p => `
            <circle cx="${p.x}" cy="${p.y}" r="4" fill="${primaryColor}" stroke="#fff" stroke-width="2"/>
            <text x="${p.x}" y="${Math.max(p.y - 10, 15)}" text-anchor="middle" font-size="10" font-weight="700" fill="${textColor}">
              $${Math.round(p.val)}
            </text>
          `).join('')}
          <line x1="20" y1="150" x2="320" y2="150" stroke="${isDark ? '#1e293b' : '#e2e8f0'}" stroke-width="1" />
        </svg>
      `;
    }

    // Gráfico 2: Estados Operativos (Doughnut SVG)
    if (DOM.chartStatusContainer) {
      const counts = { "Entregado": 0, "Enviado": 0, "En Preparacion": 0, "Pendiente": 0 };
      orders.forEach(o => counts[o.estado] = (counts[o.estado] || 0) + 1);
      const total = orders.length || 1;

      DOM.chartStatusContainer.innerHTML = `
        <div style="display:flex; align-items:center; justify-content:space-around; width:100%; gap:1rem;">
          <svg viewBox="0 0 100 100" style="width:110px; height:110px;">
            <circle cx="50" cy="50" r="38" fill="none" stroke="${isDark ? '#1e293b' : '#e2e8f0'}" stroke-width="12"/>
            <circle cx="50" cy="50" r="38" fill="none" stroke="${successColor}" stroke-width="12"
              stroke-dasharray="${(counts['Entregado'] / total) * 238.76} 238.76" stroke-dashoffset="0" transform="rotate(-90 50 50)"/>
            <circle cx="50" cy="50" r="38" fill="none" stroke="${infoColor}" stroke-width="12"
              stroke-dasharray="${(counts['Enviado'] / total) * 238.76} 238.76" stroke-dashoffset="-${(counts['Entregado'] / total) * 238.76}" transform="rotate(-90 50 50)"/>
            <circle cx="50" cy="50" r="38" fill="none" stroke="${warningColor}" stroke-width="12"
              stroke-dasharray="${(counts['Pendiente'] / total) * 238.76} 238.76" stroke-dashoffset="-${((counts['Entregado'] + counts['Enviado']) / total) * 238.76}" transform="rotate(-90 50 50)"/>
            <text x="50" y="55" text-anchor="middle" font-size="14" font-weight="800" fill="${textColor}">${total}</text>
          </svg>
          <div style="display:flex; flex-direction:column; gap:0.4rem; font-size:0.74rem;">
            <div><span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${successColor}; margin-right:5px;"></span>Entregados: <strong>${counts['Entregado']}</strong></div>
            <div><span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${infoColor}; margin-right:5px;"></span>Enviados: <strong>${counts['Enviado']}</strong></div>
            <div><span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${primaryColor}; margin-right:5px;"></span>En Prep.: <strong>${counts['En Preparacion']}</strong></div>
            <div><span style="display:inline-block; width:8px; height:8px; border-radius:50%; background:${warningColor}; margin-right:5px;"></span>Pendientes: <strong>${counts['Pendiente']}</strong></div>
          </div>
        </div>
      `;
    }

    // Gráfico 3: Segmentación Clientes (VIP, Recurrente, Nuevo)
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
        <div style="display:flex; flex-direction:column; gap:0.75rem; width:100%; justify-content:center;">
          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.75rem; font-weight:700; margin-bottom:0.25rem;">
              <span>⭐ Clientes VIP (${vip})</span>
              <span>${Math.round((vip / t) * 100)}%</span>
            </div>
            <div style="background:${isDark ? '#1e293b' : '#e2e8f0'}; height:8px; border-radius:4px; overflow:hidden;">
              <div style="width:${(vip / t) * 100}%; background:${warningColor}; height:100%;"></div>
            </div>
          </div>
          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.75rem; font-weight:700; margin-bottom:0.25rem;">
              <span>🔄 Clientes Recurrentes (${rec})</span>
              <span>${Math.round((rec / t) * 100)}%</span>
            </div>
            <div style="background:${isDark ? '#1e293b' : '#e2e8f0'}; height:8px; border-radius:4px; overflow:hidden;">
              <div style="width:${(rec / t) * 100}%; background:${primaryColor}; height:100%;"></div>
            </div>
          </div>
          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.75rem; font-weight:700; margin-bottom:0.25rem;">
              <span>🌱 Nuevos Compradores (${nuevo})</span>
              <span>${Math.round((nuevo / t) * 100)}%</span>
            </div>
            <div style="background:${isDark ? '#1e293b' : '#e2e8f0'}; height:8px; border-radius:4px; overflow:hidden;">
              <div style="width:${(nuevo / t) * 100}%; background:${successColor}; height:100%;"></div>
            </div>
          </div>
        </div>
      `;
    }

    // Gráfico 4: Logística y Modalidad
    if (DOM.chartChannelsContainer) {
      const shippingCount = orders.filter(o => o.entrega?.tipo === 'shipping').length;
      const pickupCount = orders.filter(o => o.entrega?.tipo === 'pickup').length;
      const total = orders.length || 1;

      DOM.chartChannelsContainer.innerHTML = `
        <div style="display:flex; flex-direction:column; gap:0.9rem; width:100%; justify-content:center;">
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <div style="width:36px; height:36px; border-radius:8px; background:rgba(79,70,229,0.15); color:${primaryColor}; display:flex; align-items:center; justify-content:center;">
              <i class="fas fa-truck"></i>
            </div>
            <div style="flex:1;">
              <div style="display:flex; justify-content:space-between; font-size:0.75rem; font-weight:700;">
                <span>Envío a Domicilio (${shippingCount})</span>
                <span>${Math.round((shippingCount / total) * 100)}%</span>
              </div>
              <div style="background:${isDark ? '#1e293b' : '#e2e8f0'}; height:7px; border-radius:4px; overflow:hidden; margin-top:4px;">
                <div style="width:${(shippingCount / total) * 100}%; background:${primaryColor}; height:100%;"></div>
              </div>
            </div>
          </div>
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <div style="width:36px; height:36px; border-radius:8px; background:rgba(16,185,129,0.15); color:${successColor}; display:flex; align-items:center; justify-content:center;">
              <i class="fas fa-store"></i>
            </div>
            <div style="flex:1;">
              <div style="display:flex; justify-content:space-between; font-size:0.75rem; font-weight:700;">
                <span>Retiro en Local (${pickupCount})</span>
                <span>${Math.round((pickupCount / total) * 100)}%</span>
              </div>
              <div style="background:${isDark ? '#1e293b' : '#e2e8f0'}; height:7px; border-radius:4px; overflow:hidden; margin-top:4px;">
                <div style="width:${(pickupCount / total) * 100}%; background:${successColor}; height:100%;"></div>
              </div>
            </div>
          </div>
        </div>
      `;
    }
  }

  // --- 10. RENDERIZADO DE DIRECTORIO CRM DE CLIENTES ---
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

          <div style="font-size:0.76rem; color:var(--text-secondary); display:flex; flex-direction:column; gap:0.25rem;">
            <div><i class="fas fa-file-invoice" style="width:16px; color:var(--text-muted);"></i> ${cust.condicionIva} ${cust.docNumero ? `(${cust.docNumero})` : ''}</div>
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
        abrirModalCliente(email);
      });
    });

    renderCrmAnalytics();
  }

  // --- 11. SLIDE-OVER DRAWER DETALLE DE ORDEN ---
  function abrirDetalleOrden(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (!order) return;
    selectedOrder = order;

    DOM.detailOrderId.textContent = order.id;
    DOM.detailOrderDate.textContent = formatFecha(order.fecha);
    DOM.detailOrderStatusSelect.value = order.estado;

    // Sugerencia de Comprobante según Condición Fiscal
    const cond = order.cliente.condicionIva || "Consumidor Final";
    if (order.cliente.tipoFacturaSugerida) {
      const typeKey = order.cliente.tipoFacturaSugerida.toLowerCase().replace(" ", "-");
      DOM.detailInvoiceTypeSelect.value = typeKey;
    } else {
      DOM.detailInvoiceTypeSelect.value = cond === "Responsable Inscripto" ? "factura-a" : "factura-b";
    }

    // Cliente CRM & Datos Fiscales
    const statsList = calcularEstadisticasClientes();
    const stat = statsList.find(c => c.email.toLowerCase() === order.cliente.email.toLowerCase()) || { ordenesCount: 1, totalGastado: order.totales.total };
    const badge = getClientBadge(stat.ordenesCount, stat.totalGastado);

    DOM.detailClientName.textContent = order.cliente.nombre;
    DOM.detailClientEmail.textContent = order.cliente.email;
    DOM.detailClientPhone.textContent = order.cliente.telefono || 'No especificado';
    DOM.detailClientBadge.textContent = badge.texto;
    DOM.detailClientBadge.className = `customer-badge ${badge.clase}`;
    DOM.detailClientOrdersCount.textContent = `${stat.ordenesCount} ${stat.ordenesCount === 1 ? 'pedido' : 'pedidos'}`;
    DOM.detailClientLtv.textContent = formatMoney(stat.totalGastado);

    // Datos Fiscales en Drawer
    DOM.detailClientFiscal.textContent = order.cliente.condicionIva || 'Consumidor Final';
    DOM.detailClientCuit.textContent = order.cliente.docNumero || 'No informado';
    if (order.cliente.razonSocial) {
      DOM.detailClientCompany.textContent = order.cliente.razonSocial;
      DOM.detailClientCompanyRow.style.display = 'block';
    } else {
      DOM.detailClientCompanyRow.style.display = 'none';
    }

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

    // Botón Rótulo MeLi: Solo visible/activo para envíos a domicilio
    if (DOM.btnPrintShippingLabel) {
      DOM.btnPrintShippingLabel.style.display = order.entrega.tipo === 'shipping' ? 'inline-flex' : 'none';
    }

    // Items Comprados con Íconos Seguros
    DOM.detailItemsList.innerHTML = order.items.map(item => {
      const info = getItemIconInfo(item.nombre);
      return `
        <div class="order-item-row">
          <div style="display:flex; align-items:center; gap:0.75rem;">
            <div class="item-icon-badge ${info.clase}">
              <i class="fas ${info.icon}"></i>
            </div>
            <div>
              <div class="order-item-title">${item.nombre}</div>
              <div style="font-size:0.72rem; color:var(--text-muted);">${item.cantidad} x ${formatMoney(item.precio)}</div>
            </div>
          </div>
          <div class="order-item-price">${formatMoney(item.precio * item.cantidad)}</div>
        </div>
      `;
    }).join('');

    // Totales
    DOM.detailSubtotal.textContent = formatMoney(order.totales.subtotal);
    DOM.detailDiscount.textContent = order.totales.descuento > 0 ? `-${formatMoney(order.totales.descuento)}` : "$0.00";
    DOM.detailShippingCost.textContent = order.totales.envio > 0 ? formatMoney(order.totales.envio) : "Gratis ($0.00)";
    DOM.detailTotalAmount.textContent = formatMoney(order.totales.total);

    // Botón de WhatsApp Sanitizado
    if (DOM.btnContactWa) {
      const cleanPhone = getSanitizedWhatsAppNumber(order.cliente);
      const msg = encodeURIComponent(`¡Hola ${order.cliente.nombre}! Te escribimos desde MiTienda para informarte sobre el estado de tu pedido #${order.id}. Estado actual: ${order.estado}.`);
      DOM.btnContactWa.href = `https://wa.me/${cleanPhone}?text=${msg}`;
    }

    // Abrir Drawer
    DOM.slideoverBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function cerrarDetalleOrden() {
    DOM.slideoverBackdrop.classList.remove("active");
    document.body.style.overflow = "";
    selectedOrder = null;
  }

  // Actualizar estado de orden desde el select del drawer
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
      showToast(`Orden ${selectedOrder.id} actualizada a "${nuevoEstado}"`, "fa-check");

      if (DOM.btnContactWa) {
        const cleanPhone = getSanitizedWhatsAppNumber(selectedOrder.cliente);
        const msg = encodeURIComponent(`¡Hola ${selectedOrder.cliente.nombre}! Te informamos que tu pedido #${selectedOrder.id} ha sido actualizado a: *${nuevoEstado}*.`);
        DOM.btnContactWa.href = `https://wa.me/${cleanPhone}?text=${msg}`;
      }
    });
  }

  // --- 12. GENERADOR LIMPIO DE COMPROBANTES (FACTURAS A/B/C Y REMITO EN VENTANA NUEVA) ---
  if (DOM.btnPrintReceipt) {
    DOM.btnPrintReceipt.addEventListener("click", () => {
      if (!selectedOrder) return;
      imprimirComprobanteLimpio(selectedOrder, DOM.detailInvoiceTypeSelect.value);
    });
  }

  function imprimirComprobanteLimpio(order, invoiceType) {
    const printWindow = window.open("", "_blank", "width=850,height=950");
    if (!printWindow) {
      alert("Por favor autorizá las ventanas emergentes para imprimir el comprobante.");
      return;
    }

    const typeTitles = {
      "remito": { letra: "R", cod: "091", nombre: "REMITO DE ENTREGA", subtitulo: "DOCUMENTO NO VÁLIDO COMO FACTURA" },
      "factura-a": { letra: "A", cod: "001", nombre: "FACTURA", subtitulo: "IVA RESPONSABLE INSCRIPTO" },
      "factura-b": { letra: "B", cod: "006", nombre: "FACTURA", subtitulo: "A CONSUMIDOR FINAL / EXENTO" },
      "factura-c": { letra: "C", cod: "011", nombre: "FACTURA", subtitulo: "RÉGIMEN SIMPLIFICADO / MONOTRIBUTO" }
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
          .receipt-box { border: 2px solid #000; padding: 16px; border-radius: 4px; }
          
          .header-grid { display: grid; grid-template-columns: 1fr 90px 1fr; border-bottom: 2px solid #000; padding-bottom: 12px; margin-bottom: 12px; position: relative; }
          .emitter-col h1 { font-size: 22px; font-weight: 800; }
          .emitter-col p { font-size: 11px; color: #444; }
          
          .letter-box { border: 2px solid #000; border-top: none; background: #fff; text-align: center; width: 80px; height: 80px; margin: 0 auto; display: flex; flex-direction: column; justify-content: center; }
          .letter-box h2 { font-size: 38px; line-height: 1; font-weight: 900; }
          .letter-box span { font-size: 9px; font-weight: bold; }
          
          .doc-col { text-align: right; }
          .doc-col h2 { font-size: 18px; font-weight: 800; text-transform: uppercase; }
          .doc-col p { font-size: 11px; }

          .client-box { border: 1px solid #999; padding: 10px; margin-bottom: 15px; border-radius: 4px; background: #fafafa; }
          .client-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 6px; font-size: 11.5px; }
          
          table.items-table { width: 100%; border-collapse: collapse; margin-bottom: 15px; }
          table.items-table th { background: #eee; border: 1px solid #999; padding: 6px 8px; font-size: 11px; text-transform: uppercase; text-align: left; }
          table.items-table td { border: 1px solid #ccc; padding: 6px 8px; font-size: 11.5px; }
          
          .totals-grid { display: grid; grid-template-columns: 1.2fr 1fr; gap: 15px; align-items: start; }
          .qr-dummy { border: 1px solid #ccc; padding: 8px; font-size: 10px; display: flex; align-items: center; gap: 10px; }
          .qr-box { width: 65px; height: 65px; background: #000; border-radius: 2px; }
          
          .totals-table { width: 100%; border-collapse: collapse; }
          .totals-table td { padding: 4px 6px; font-size: 12px; }
          .totals-table .total-row { font-size: 15px; font-weight: bold; border-top: 2px solid #000; border-bottom: 2px solid #000; }

          .print-btn-bar { margin-bottom: 15px; text-align: right; }
          .print-btn { background: #4f46e5; color: #fff; border: none; padding: 8px 16px; border-radius: 4px; font-weight: bold; cursor: pointer; }
          @media print { .print-btn-bar { display: none; } }
        </style>
      </head>
      <body>
        <div class="print-btn-bar">
          <button class="print-btn" onclick="window.print()">🖨️ Imprimir este comprobante</button>
        </div>
        <div class="receipt-box">
          <div class="header-grid">
            <div class="emitter-col">
              <h1>MiTienda S.R.L.</h1>
              <p>Av. Colón 1234, Centro, Córdoba (CP 5000)</p>
              <p>Tel: +54 9 351 261-9874 | ventas@mitienda.com</p>
              <p><strong>IVA Responsable Inscripto</strong></p>
            </div>
            
            <div class="letter-box">
              <h2>${conf.letra}</h2>
              <span>COD. ${conf.cod}</span>
            </div>
            
            <div class="doc-col">
              <h2>${conf.nombre}</h2>
              <p><strong>Nro:</strong> 0004-000${order.id.replace('MT-', '')}</p>
              <p><strong>Fecha de Emisión:</strong> ${formatFecha(order.fecha).split(' ')[0]}</p>
              <p><strong>CUIT:</strong> 30-71234567-9</p>
              <p><strong>Ingresos Brutos:</strong> 901-284910-1</p>
              <p><strong>Inicio Actividades:</strong> 01/01/2024</p>
            </div>
          </div>

          <div class="client-box">
            <div class="client-grid">
              <div><strong>Receptor:</strong> ${order.cliente.razonSocial ? `${order.cliente.razonSocial} (${order.cliente.nombre})` : order.cliente.nombre}</div>
              <div><strong>CUIT / DNI:</strong> ${order.cliente.docNumero || 'Consumidor Final'}</div>
              <div><strong>Condición IVA:</strong> ${order.cliente.condicionIva || 'Consumidor Final'}</div>
              <div><strong>Condición de Venta:</strong> ${order.pago.metodo} (${order.pago.marca || 'Visa'} •••• ${order.pago.ultimos4})</div>
              <div><strong>Domicilio:</strong> ${order.entrega.direccion}</div>
              <div><strong>Teléfono:</strong> ${order.cliente.telefono || '-'}</div>
            </div>
          </div>

          <table class="items-table">
            <thead>
              <tr>
                <th style="width: 50px;">Cant.</th>
                <th>Descripción del Producto</th>
                ${isFacturaA ? '<th style="width: 80px; text-align:right;">Neto Unit.</th><th style="width: 60px; text-align:center;">IVA</th>' : '<th style="width: 90px; text-align:right;">Precio Unit.</th>'}
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
                    ${isFacturaA ? '<td style="text-align: center;">21%</td>' : ''}
                    <td style="text-align: right;"><strong>${formatMoney(pNeto * item.cantidad)}</strong></td>
                  </tr>
                `;
              }).join('')}
            </tbody>
          </table>

          <div class="totals-grid">
            <div class="qr-dummy">
              <div class="qr-box"></div>
              <div>
                <p style="font-weight:bold;">Comprobante Autorizado AFIP</p>
                <p>CAE Nº: 74182938472910</p>
                <p>Vto. CAE: 25/10/2026</p>
                <p style="color:#666; font-size:9px;">Seguimiento: TRACK-${order.id.replace('MT-', '')}-AR</p>
              </div>
            </div>

            <table class="totals-table">
              ${isFacturaA ? `
                <tr><td>Importe Neto Gravado:</td><td style="text-align:right;">${formatMoney(netoGravado)}</td></tr>
                <tr><td>IVA 21%:</td><td style="text-align:right;">${formatMoney(iva21)}</td></tr>
              ` : `
                <tr><td>Subtotal:</td><td style="text-align:right;">${formatMoney(order.totales.subtotal)}</td></tr>
              `}
              ${order.totales.descuento > 0 ? `<tr><td style="color:green;">Descuento cupón:</td><td style="text-align:right; color:green;">-${formatMoney(order.totales.descuento)}</td></tr>` : ''}
              <tr><td>Costo de Envío:</td><td style="text-align:right;">${order.totales.envio > 0 ? formatMoney(order.totales.envio) : 'Gratis'}</td></tr>
              <tr class="total-row"><td>IMPORTE TOTAL:</td><td style="text-align:right;">${formatMoney(order.totales.total)}</td></tr>
            </table>
          </div>
        </div>
        <script>
          setTimeout(() => { window.print(); }, 400);
        </script>
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(receiptHtml);
    printWindow.document.close();
  }

  // --- 13. GENERADOR DE RÓTULO DE ENVÍO ESTILO MERCADOLIBRE (10x15 CM) ---
  if (DOM.btnPrintShippingLabel) {
    DOM.btnPrintShippingLabel.addEventListener("click", () => {
      if (!selectedOrder) return;
      imprimirRotuloMeli(selectedOrder);
    });
  }

  function imprimirRotuloMeli(order) {
    const printWindow = window.open("", "_blank", "width=600,height=800");
    if (!printWindow) {
      alert("Por favor autorizá las ventanas emergentes para imprimir el rótulo de envío.");
      return;
    }

    const trackCode = `TRACK-${order.id.replace('MT-', '')}-AR`;
    const labelHtml = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>Rótulo de Envío — ${order.id}</title>
        <style>
          @page { size: 100mm 150mm; margin: 0; }
          * { box-sizing: border-box; margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif; }
          body { background: #fff; width: 100mm; height: 150mm; margin: 0 auto; padding: 4mm; display: flex; flex-direction: column; justify-content: space-between; border: 1.5px solid #000; font-size: 11px; }
          
          .label-header { border-bottom: 2px solid #000; padding-bottom: 3mm; display: flex; justify-content: space-between; align-items: flex-start; }
          .brand-meli { display: flex; align-items: center; gap: 4px; font-weight: 900; font-size: 13px; }
          .handshake-icon { width: 18px; height: 18px; border: 1.5px solid #000; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 10px; font-weight: bold; }
          
          .delivery-title { font-size: 17px; font-weight: 900; text-align: center; padding: 2mm 0; border-bottom: 2px solid #000; text-transform: uppercase; letter-spacing: 0.5px; }
          
          .qr-section { display: flex; justify-content: space-between; align-items: center; padding: 3mm 0; border-bottom: 2px solid #000; }
          .qr-graphic { width: 34mm; height: 34mm; border: 2px solid #000; background: #000; position: relative; }
          .qr-inner { position: absolute; inset: 4px; background: #fff; display: grid; grid-template-columns: repeat(5, 1fr); gap: 2px; padding: 2px; }
          .qr-dot { background: #000; }
          
          .zip-info { text-align: right; flex: 1; padding-left: 4mm; }
          .zip-code { font-size: 26px; font-weight: 900; line-height: 1; }
          .zip-city { font-size: 13px; font-weight: 800; text-transform: uppercase; }
          
          .barcode-section { text-align: center; padding: 2mm 0; border-bottom: 2px solid #000; }
          .barcode-bars { height: 12mm; display: flex; justify-content: center; gap: 2px; align-items: stretch; background: repeating-linear-gradient(90deg, #000 0, #000 2px, #fff 2px, #fff 4px, #000 4px, #000 7px, #fff 7px, #fff 9px); width: 85%; margin: 0 auto; }
          .barcode-digits { font-family: monospace; font-size: 10px; font-weight: bold; letter-spacing: 2px; margin-top: 2px; }

          .dest-header { font-size: 13px; font-weight: 900; background: #000; color: #fff; padding: 1.5mm; text-align: center; text-transform: uppercase; margin-bottom: 2mm; }
          .dest-info { padding: 0 1mm; font-size: 10.5px; line-height: 1.35; }
          .dest-info strong { font-size: 12px; }

          .footer-section { border-top: 1px dashed #000; padding-top: 2mm; font-size: 8.5px; color: #333; display: flex; justify-content: space-between; align-items: center; }
          
          .print-bar { position: fixed; top: 10px; right: 10px; }
          .btn-print { background: #000; color: #fff; padding: 6px 12px; font-weight: bold; border: none; cursor: pointer; border-radius: 4px; }
          @media print { .print-bar { display: none; } }
        </style>
      </head>
      <body>
        <div class="print-bar">
          <button class="btn-print" onclick="window.print()">Imprimir Rótulo (10x15cm)</button>
        </div>

        <div>
          <div class="label-header">
            <div class="brand-meli">
              <div class="handshake-icon">🤝</div>
              <div>MiTienda Envíos</div>
            </div>
            <div style="text-align: right; font-size: 9px;">
              <div>Remitente: MiTienda Despachos</div>
              <div>Av. Colón 1234, Centro, CBA</div>
              <div>Pedido: <strong>#${order.id}</strong></div>
            </div>
          </div>

          <div class="delivery-title">
            Envío Flex a Domicilio
          </div>

          <div class="qr-section">
            <div class="qr-graphic">
              <div class="qr-inner">
                <div class="qr-dot"></div><div class="qr-dot"></div><div></div><div class="qr-dot"></div><div class="qr-dot"></div>
                <div class="qr-dot"></div><div></div><div class="qr-dot"></div><div></div><div class="qr-dot"></div>
                <div></div><div class="qr-dot"></div><div class="qr-dot"></div><div class="qr-dot"></div><div></div>
                <div class="qr-dot"></div><div></div><div class="qr-dot"></div><div></div><div class="qr-dot"></div>
                <div class="qr-dot"></div><div class="qr-dot"></div><div></div><div class="qr-dot"></div><div class="qr-dot"></div>
              </div>
            </div>
            <div class="zip-info">
              <div style="font-size: 10px; font-weight: bold; color: #555;">CÓDIGO POSTAL</div>
              <div class="zip-code">${order.entrega.direccion.match(/CP\s*(\d+)/i)?.[1] || '5000'}</div>
              <div class="zip-city">CÓRDOBA</div>
              <div style="font-size: 9px; color: #666; margin-top: 2px;">DESPACHO PRIORITARIO</div>
            </div>
          </div>

          <div class="barcode-section">
            <div class="barcode-bars"></div>
            <div class="barcode-digits">${trackCode}</div>
          </div>
        </div>

        <div>
          <div class="dest-header">
            Destinatario / Domicilio Residencial
          </div>

          <div class="dest-info">
            <div><strong>Destinatario:</strong> ${order.cliente.nombre}</div>
            <div><strong>Domicilio:</strong> ${order.entrega.direccion}</div>
            <div><strong>Teléfono de Contacto:</strong> ${order.cliente.telefono || '-'}</div>
            <div><strong>Identificación Fiscal:</strong> ${order.cliente.condicionIva} (${order.cliente.docNumero || 'CF'})</div>
            <div><strong>Contenido del Paquete:</strong> ${order.items.map(i => `${i.cantidad}x ${i.nombre}`).join(', ')}</div>
          </div>

          <div class="footer-section">
            <div>Tracking: <strong>${trackCode}</strong></div>
            <div>Bultos: 1 de 1 | Pegar sobre cara superior</div>
          </div>
        </div>

        <script>
          setTimeout(() => { window.print(); }, 400);
        </script>
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
        <div class="customer-avatar" style="width:54px; height:54px; font-size:1.3rem;">
          ${cust.nombre.split(' ').map(n=>n[0]).join('').substring(0,2).toUpperCase()}
        </div>
        <div>
          <h3 style="font-size:1.2rem; font-weight:800; color:var(--text-main);">${cust.nombre}</h3>
          <p style="font-size:0.85rem; color:var(--text-muted);">${cust.email}</p>
          <div style="margin-top:0.4rem;">
            <span class="customer-badge ${badge.clase}">${badge.texto}</span>
          </div>
        </div>
      </div>

      <div class="customer-stats-strip" style="padding:1rem;">
        <div class="cust-stat-item">
          <span class="cust-stat-label">Total Pedidos</span>
          <span class="cust-stat-val" style="font-size:1.3rem;">${cust.ordenesCount}</span>
        </div>
        <div class="cust-stat-item">
          <span class="cust-stat-label">Gasto Acumulado (LTV)</span>
          <span class="cust-stat-val" style="font-size:1.3rem; color:var(--color-primary);">${formatMoney(cust.totalGastado)}</span>
        </div>
        <div class="cust-stat-item">
          <span class="cust-stat-label">Condición Fiscal</span>
          <span class="cust-stat-val" style="font-size:0.9rem; color:var(--text-main);">${cust.condicionIva}</span>
        </div>
        <div class="cust-stat-item">
          <span class="cust-stat-label">DNI / CUIT</span>
          <span class="cust-stat-val" style="font-size:0.9rem; font-family:var(--font-mono);">${cust.docNumero || 'Consumidor Final'}</span>
        </div>
      </div>

      <div>
        <h4 style="font-size:0.9rem; font-weight:800; margin-bottom:0.75rem; color:var(--text-main);">
          <i class="fas fa-boxes-stacked" style="color:var(--color-primary); margin-right:4px;"></i> Historial Cronológico de Compras
        </h4>
        <div style="display:flex; flex-direction:column; gap:0.6rem; max-height:220px; overflow-y:auto;">
          ${cust.ordenes.map(o => `
            <div style="display:flex; justify-content:space-between; align-items:center; background:var(--bg-surface-elevated); padding:0.75rem; border-radius:var(--radius-sm); border:1px solid var(--border-color);">
              <div>
                <strong style="color:var(--color-primary); font-family:var(--font-mono);">${o.id}</strong>
                <span style="font-size:0.72rem; color:var(--text-muted); margin-left:6px;">${formatFecha(o.fecha)}</span>
                <div style="font-size:0.75rem; color:var(--text-secondary); margin-top:2px;">
                  ${o.items.map(i=>`${i.cantidad}x ${i.nombre}`).join(', ')}
                </div>
              </div>
              <div style="text-align:right;">
                <div style="font-weight:800; font-family:var(--font-mono);">${formatMoney(o.totales.total)}</div>
                <span class="status-badge ${getStatusBadgeClass(o.estado)}" style="font-size:0.65rem;">${o.estado}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>

      <div style="display:flex; justify-content:space-between; align-items:center; padding-top:0.5rem; border-top:1px solid var(--border-color);">
        <a href="https://wa.me/${cleanPhone}?text=${encodeURIComponent(`¡Hola ${cust.nombre}! Te contactamos desde el equipo de atención al cliente de MiTienda.`)}" target="_blank" class="btn-contact-customer-wa" style="width:100%; justify-content:center;">
          <i class="fab fa-whatsapp"></i> Iniciar Chat de WhatsApp con el Cliente
        </a>
      </div>
    `;

    DOM.customerModal.classList.add("active");
  }

  // --- 15. EXPORTADOR CSV COMPATIBLE CON EXCEL (UTF-8 BOM) ---
  if (DOM.btnExportCsv) {
    DOM.btnExportCsv.addEventListener("click", () => {
      if (orders.length === 0) {
        showToast("No hay órdenes para exportar", "fa-circle-exclamation");
        return;
      }

      const headers = ["ID Orden", "Fecha", "Cliente", "Email", "Telefono", "Condicion IVA", "DNI/CUIT", "Razon Social", "Tipo Entrega", "Direccion", "Medio Pago", "Tarjeta Ultimos 4", "Articulos", "Subtotal", "Descuento", "Envio", "Total", "Estado"];
      const rows = orders.map(o => [
        `"${o.id}"`,
        `"${formatFecha(o.fecha)}"`,
        `"${(o.cliente.nombre || '').replace(/"/g, '""')}"`,
        `"${(o.cliente.email || '').replace(/"/g, '""')}"`,
        `"${(o.cliente.telefono || '').replace(/"/g, '""')}"`,
        `"${(o.cliente.condicionIva || 'Consumidor Final').replace(/"/g, '""')}"`,
        `"${(o.cliente.docNumero || '').replace(/"/g, '""')}"`,
        `"${(o.cliente.razonSocial || '').replace(/"/g, '""')}"`,
        `"${o.entrega.tipo === 'shipping' ? 'Envio a Domicilio' : 'Retiro en Local'}"`,
        `"${(o.entrega.direccion || '').replace(/"/g, '""')}"`,
        `"${o.pago.metodo}"`,
        `"${o.pago.ultimos4 || ''}"`,
        `"${o.items.map(i => `${i.cantidad}x ${i.nombre}`).join('; ').replace(/"/g, '""')}"`,
        o.totales.subtotal.toFixed(2),
        o.totales.descuento.toFixed(2),
        o.totales.envio.toFixed(2),
        o.totales.total.toFixed(2),
        `"${o.estado}"`
      ]);

      const csvContent = "\uFEFF" + [headers.join(","), ...rows.map(r => r.join(","))].join("\r\n");
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `MiTienda_Ordenes_${new Date().toISOString().slice(0, 10)}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      showToast("Archivo CSV exportado exitosamente", "fa-file-csv");
    });
  }

  // --- 16. SIMULADOR DE COMPRA EN VIVO ---
  const MOCK_BUYERS = [
    { nombre: "Camila Domínguez", email: "camila.dominguez@gmail.com", tel: "3516109922", dir: "Chacabuco 780, Nueva Córdoba", cond: "Consumidor Final", doc: "40192831", rs: "" },
    { nombre: "Franco Navarro", email: "franco.navarro@outlook.com", tel: "3513349011", dir: "Av. Hipólito Yrigoyen 240, Córdoba", cond: "Responsable Inscripto", doc: "30-71994012-8", rs: "Navarro Tecnologías SRL" },
    { nombre: "Lucía Villalba", email: "lucia.villalba@yahoo.com", tel: "3541620099", dir: "Av. San Martín 820, Villa Carlos Paz", cond: "Monotributo", doc: "27-38192011-3", rs: "Lucía Estudio de Diseño" },
    { nombre: "Agustín Morales", email: "agustin.morales@gmail.com", tel: "3584102988", dir: "Sobremonte 510, Río Cuarto", cond: "Consumidor Final", doc: "39201940", rs: "" }
  ];

  const MOCK_PRODUCTS = [
    { id: 1, nombre: "iPhone 15 Pro", precio: 1499.99 },
    { id: 2, nombre: "Laptop Gamer Victus", precio: 1250.00 },
    { id: 3, nombre: "Zapatillas Nike Air Max", precio: 180.50 },
    { id: 4, nombre: "Camiseta Boca Juniors 24", precio: 110.00 },
    { id: 5, nombre: "Sofá Minimalista 2 Cuerpos", precio: 790.00 }
  ];

  function simularCompraEnVivo() {
    const buyer = MOCK_BUYERS[Math.floor(Math.random() * MOCK_BUYERS.length)];
    const prod = MOCK_PRODUCTS[Math.floor(Math.random() * MOCK_PRODUCTS.length)];
    const qty = Math.floor(Math.random() * 2) + 1;
    const isShipping = Math.random() > 0.35;
    const costoEnv = isShipping ? 10.00 : 0;
    const subtotal = prod.precio * qty;
    const total = subtotal + costoEnv;

    const codPais = "+54";
    const telNum = buyer.tel;
    const cleanPhone = `549${telNum}`;

    const simulated = {
      id: "MT-" + Math.floor(100000 + Math.random() * 900000),
      fecha: new Date().toISOString(),
      cliente: {
        nombre: buyer.nombre,
        email: buyer.email,
        codigoPais: codPais,
        telefonoNum: telNum,
        telefono: `+54 9 ${telNum.substring(0,3)} ${telNum.substring(3)}`,
        telefonoWhatsApp: cleanPhone,
        condicionIva: buyer.cond,
        docNumero: buyer.doc,
        razonSocial: buyer.rs,
        tipoFacturaSugerida: buyer.cond === "Responsable Inscripto" ? "Factura A" : "Factura B",
        direccion: buyer.dir
      },
      entrega: {
        tipo: isShipping ? "shipping" : "pickup",
        costo: costoEnv,
        direccion: isShipping ? buyer.dir : "Retiro en Local Central (Av. Colón 1234, Córdoba)"
      },
      pago: {
        metodo: "Tarjeta de Crédito Virtual",
        marca: ["Visa Signature", "Mastercard Black", "American Express"][Math.floor(Math.random() * 3)],
        ultimos4: String(Math.floor(1000 + Math.random() * 9000)),
        titular: buyer.nombre.toUpperCase(),
        estado: "Aprobado",
        cuotas: [1, 3, 6][Math.floor(Math.random() * 3)]
      },
      items: [
        { id: prod.id, nombre: prod.nombre, precio: prod.precio, cantidad: qty }
      ],
      totales: {
        subtotal: subtotal,
        descuento: 0,
        envio: costoEnv,
        total: total
      },
      estado: "Pendiente"
    };

    orders.unshift(simulated);
    localStorage.setItem("mt_orders", JSON.stringify(orders));

    playPurchaseChime();
    showToast(`¡Nueva compra de ${buyer.nombre}! (${formatMoney(total)})`, "fa-bolt");
    updateKpis();
    renderOrdersTable();
    renderCrmAnalytics();
  }

  if (DOM.btnSimulateOrder) {
    DOM.btnSimulateOrder.addEventListener("click", simularCompraEnVivo);
  }

  // --- 17. LISTENER CROSS-TAB EN TIEMPO REAL (BROADCASTCHANNEL + STORAGE) ---
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
          playPurchaseChime();
          showToast(`¡Nueva compra ingresada: ${nueva.id}!`, "fa-cart-shopping");
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
        console.warn("Error sincronizando storage:", err);
      }
    }
  });

  // --- 18. NAVEGACIÓN ENTRE PESTAÑAS (ÓRDENES / CRM) ---
  function setActiveView(view) {
    activeView = view;
    if (view === "orders") {
      DOM.ordersViewSection?.classList.remove("hidden");
      DOM.crmViewSection?.classList.remove("active");
      DOM.navOrdersLink?.classList.add("active");
      DOM.navCrmLink?.classList.remove("active");
    } else {
      DOM.ordersViewSection?.classList.add("hidden");
      DOM.crmViewSection?.classList.add("active");
      DOM.navOrdersLink?.classList.remove("active");
      DOM.navCrmLink?.classList.add("active");
      renderCrmView();
    }
  }

  if (DOM.navOrdersLink) {
    DOM.navOrdersLink.addEventListener("click", (e) => {
      e.preventDefault();
      setActiveView("orders");
      if (window.innerWidth <= 860) DOM.sidebar.classList.remove("open");
    });
  }

  if (DOM.navCrmLink) {
    DOM.navCrmLink.addEventListener("click", (e) => {
      e.preventDefault();
      setActiveView("crm");
      if (window.innerWidth <= 860) DOM.sidebar.classList.remove("open");
    });
  }

  // Mobile Sidebar Toggle
  if (DOM.sidebarToggle && DOM.sidebar) {
    DOM.sidebarToggle.addEventListener("click", () => {
      DOM.sidebar.classList.toggle("open");
    });
  }

  // Filtros de búsqueda
  if (DOM.orderSearchInput) {
    DOM.orderSearchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim();
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

  // Toast flotante
  function showToast(msg, icon = "fa-check") {
    if (!DOM.toastContainer) return;
    const toast = document.createElement("div");
    toast.className = "toast-msg";
    toast.innerHTML = `<i class="fas ${icon}" style="color:var(--color-primary)"></i><span>${msg}</span>`;
    DOM.toastContainer.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add("show"));
    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // --- 19. INICIALIZACIÓN ---
  initTheme();
  updateKpis();
  renderOrdersTable();
  renderCrmAnalytics();
});

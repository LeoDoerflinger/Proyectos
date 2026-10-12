# 🛍️ MiTienda — E-Commerce Moderno & Dashboard CRM en Tiempo Real

> Plataforma completa de comercio electrónico y gestión empresarial (ERP/CRM ligero) desarrollada con estándares modernos de diseño, arquitectura reactiva sin backend y sincronización en tiempo real entre la tienda y el panel de administración.

---

## 🌟 Visión General

**MiTienda** combina una experiencia de compra para el usuario final con un centro de control operativo para administradores y dueños de negocio. El proyecto está dividido en dos módulos interconectados que comparten estado y reaccionan en tiempo real:

1. **🏬 Tienda Online (Storefront)**: Catálogo de productos interactivo, carrito de compras deslizable, lista de favoritos, cupones de descuento, cálculo dinámico de envíos y pasarela de pago con tarjeta virtual y confirmación automática vía WhatsApp.
2. **📊 Panel Admin & CRM en Tiempo Real (`/dashboard`)**: Dashboard administrativo ejecutivo que ingesta y visualiza las compras en vivo, con análisis de medios de pago, control logístico de despachos y un motor CRM 360° que clasifica automáticamente a los clientes según su recurrencia, valor de vida (LTV) e historial completo de transacciones.

---

## 🚀 Enlaces y Acceso Rápido

* **Tienda Online**: [`index.html`](./index.html)
* **Panel Administrativo & CRM**: [`dashboard/index.html`](./dashboard/index.html)
* **Portfolio del Desarrollador**: [portfolio-leodoerflinger.vercel.app](https://portfolio-leodoerflinger.vercel.app/)

---

## ✨ Características Principales

### 1. 🏬 Tienda Online (Storefront)
- **Diseño Moderno & Glassmorphism**: Interfaz con tipografías *Plus Jakarta Sans* y *Outfit*, animaciones suaves y modo oscuro/claro persistente.
- **Catálogo Interactivo**: Filtrado por categorías (Tecnología, Calzado, Moda, Hogar), ordenamiento por precio y novedades, y barra de búsqueda en vivo.
- **Carrito de Compras Reactivo**: Drawer deslizable con actualización inmediata de subtotales, costo de envío configurable (Envío a domicilio vs Retiro gratis en sucursal) y soporte de cupones de descuento (ej. `SOYDEV` para 20% OFF).
- **Lista de Deseos (Wishlist)**: Guardado de productos favoritos persistente en `localStorage`.
- **Checkout Seguro con Tarjeta Virtual**: Formulario de pago realista con detección de marca (Visa, Mastercard, American Express), formato dinámico de número de tarjeta, selección de cuotas y pantalla de éxito con botón para notificar el pedido directamente a WhatsApp.
- **Persistencia y Emisión de Eventos**: Cada compra exitosa genera un registro normalizado de orden y lo emite a través de la API `BroadcastChannel`.

---

### 2. 📊 Dashboard Administrativo & CRM (`/dashboard`)
- **Visualización en Tiempo Real**: Ingesta instantánea de nuevos pedidos realizados desde cualquier pestaña de la tienda utilizando `BroadcastChannel` y eventos `storage` a 0ms de latencia.
- **Chime Sonoro Ejecutivo**: Notificación auditiva sintetizada mediante la API nativa de **Web Audio** al recibir una nueva transacción en vivo.
- **Métricas KPI en Vivo**:
  - **Ingresos Totales**: Facturación acumulada en moneda local.
  - **Órdenes Totales**: Contador global y desglose de pedidos ingresados en el día de hoy.
  - **Clientes CRM**: Total de compradores únicos y **tasa de recurrencia (%)** calculada en tiempo real.
  - **Ticket Promedio**: Monto promedio gastado por pedido.
- **Gestión Integral de Órdenes**:
  - Buscador predictivo por ID de orden, cliente, correo o ciudad.
  - Filtro por estado operativo: *Pendiente*, *En Preparación*, *Enviado*, *Entregado* o *Cancelado*.
  - Filtro logístico: *Envío a Domicilio* vs *Retiro en Sucursal*.
  - Actualización reactiva del estado del pedido con sincronización global.
- **Desglose de Pago & Logística (Drawer Slide-Over)**:
  - **Medio de Pago**: Tarjeta utilizada, marca (Visa, Mastercard, etc.), últimos 4 dígitos, nombre del titular, plan de cuotas y estado de aprobación.
  - **Logística**: Modalidad de entrega, dirección exacta de destino, código postal y tracking de despacho.
  - **Detalle de Artículos**: Lista completa de productos con imágenes, cantidades y totales desglosados (subtotal, cupón de descuento, envío y total abonado).
- **Directorio CRM 360° de Clientes**:
  - Detección automática del perfil del cliente:
    - 🟢 **NUEVO**: Primera compra registrada.
    - 🔵 **RECURRENTE**: 2 o más pedidos realizados.
    - 🟡 **VIP**: Gasto acumulado superior a $1,500.
  - Cálculo de **LTV (Customer Lifetime Value)** y gasto histórico consolidado.
  - Modal interactivo de **Ficha 360°** con desglose cronológico de todas las órdenes asociadas a ese usuario.
  - Botón directo para iniciar chat de **WhatsApp** con el cliente con mensaje contextualizado.
- **Herramientas de Exportación y Operación**:
  - **Exportar CSV**: Descarga inmediata de todas las órdenes en formato CSV compatible con Microsoft Excel (con codificación UTF-8 BOM).
  - **Imprimir Remito / Packing Slip**: Vista adaptada mediante `@media print` para imprimir recibos y hojas de embalaje profesionales en un solo clic.
  - **Simulador de Compras**: Botón *Simular Compra* para disparar pedidos aleatorios y verificar la reactividad del sistema en demostraciones.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnologías |
|---|---|
| **Estructura** | HTML5 Semántico (W3C Standard, Accesibilidad ARIA) |
| **Estilos** | CSS3 Moderno (Custom Properties, Flexbox, Grid, Glassmorphism, Print Media Queries) |
| **Lógica** | JavaScript Vanilla ES6+ (Async/Await, Event Loop, Modularización) |
| **Tiempo Real** | `BroadcastChannel` API + `window.localStorage` (Cross-Tab Event Sync) |
| **Audio** | Web Audio API (`AudioContext` con síntesis de osciladores para chimes) |
| **Iconografía** | Font Awesome 6.4.0 & Google Fonts (*Plus Jakarta Sans*, *Outfit*, *JetBrains Mono*) |

---

## 📁 Estructura del Proyecto

```text
MiTienda/
│
├── index.html              # Tienda pública (Catálogo, Carrito, Checkout)
├── style.css               # Estilos modernos del storefront y checkout
├── app.js                  # Lógica del storefront y emisor de órdenes en tiempo real
│
├── dashboard/              # 📊 MÓDULO ADMINISTRATIVO Y CRM
│   ├── index.html          # Panel de control de órdenes y clientes CRM
│   ├── styles.css          # Diseño del dashboard, drawer, modales y print
│   └── script.js           # Receptor en tiempo real, KPIs, CRM 360° y exportador
│
├── assets/                 # Imágenes y recursos multimedia de productos
│   ├── phone.jpg
│   ├── laptop.jpg
│   ├── shoes.jpg
│   ├── tshirt.jpg
│   └── sofa.jpg
│
└── README.md               # Documentación completa del proyecto
```

---

## 💻 Guía de Uso y Demostración

1. **Abrir la Tienda**: Abrí `index.html` en tu navegador.
2. **Abrir el Dashboard**: Abrí `dashboard/index.html` en una pestaña contigua o en otra ventana.
3. **Comprar en Vivo**:
   - Agregá productos al carrito en la tienda, ingresá un cupón (ej: `SOYDEV`), seleccioná envío a domicilio y completá el checkout de pago con tarjeta.
   - Al hacer clic en **Pagar Ahora**, observá cómo la pestaña del **Dashboard CRM** emite de inmediato un sonido de campana (*chime*), agrega la nueva orden en la parte superior de la tabla con animación pulsante y actualiza automáticamente los KPIs de facturación, pedidos y recurrencia del cliente.
4. **Inspeccionar al Cliente y la Logística**:
   - En el Dashboard, hacé clic en **Ver Detalle** de cualquier orden para inspeccionar la tarjeta de crédito, la dirección de entrega, el tracking y el historial del cliente.
   - Cambiá a la pestaña **Directorio CRM** en la barra lateral para ver las fichas 360° de todos los compradores.
5. **Simulación Rápida**: Si solo querés probar el flujo administrativo, hacé clic en el botón **Simular Compra** en la barra superior del Dashboard para inyectar transacciones automáticas.

---

## 👨‍💻 Autor

**Leopoldo Doerflinger**
- GitHub: [@LeoDoerflinger](https://github.com/LeoDoerflinger)
- LinkedIn: [Leopoldo Doerflinger](https://www.linkedin.com/in/leopoldo-doerflinger-737570186/)
- WhatsApp: [+54 9 351 261-9874](https://wa.me/543512619874)
- Portfolio: [portfolio-leodoerflinger.vercel.app](https://portfolio-leodoerflinger.vercel.app/)

---
*Desarrollado con dedicación y pasión por la ingeniería web de alto impacto.*

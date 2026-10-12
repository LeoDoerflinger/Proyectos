# 🛍️ MiTienda — E-Commerce Moderno & Dashboard CRM en Tiempo Real

> Plataforma completa de comercio electrónico y gestión empresarial (ERP/CRM ligero) desarrollada con estándares modernos de ingeniería de software, arquitectura reactiva sin backend y sincronización en tiempo real entre la tienda y el panel de administración.

---

## 🚀 Enlaces de Despliegue en Vivo (Vercel)

* **🏬 Tienda Online (Storefront)**: [https://mitienda-one.vercel.app/index.html](https://mitienda-one.vercel.app/index.html)
* **📊 Panel Admin & CRM en Tiempo Real**: [https://mitienda-one.vercel.app/dashboard/index.html](https://mitienda-one.vercel.app/dashboard/index.html)
* **🌐 Portfolio del Desarrollador**: [https://portfolio-leodoerflinger.vercel.app/](https://portfolio-leodoerflinger.vercel.app/)

---

## 🌟 Visión General

**MiTienda** combina una experiencia de compra fluida para el usuario final con un centro de control operativo integral para administradores y dueños de negocio. El proyecto está dividido en dos módulos interconectados que comparten estado y reaccionan en tiempo real:

1. **🏬 Tienda Online (Storefront)**: Catálogo de productos interactivo, carrito de compras deslizable, lista de favoritos, cupones de descuento, cálculo dinámico de envíos y pasarela de pago con tarjeta virtual, captura de condición fiscal y confirmación automática vía WhatsApp con número sanitizado.
2. **📊 Panel Admin & CRM en Tiempo Real (`/dashboard`)**: Dashboard administrativo ejecutivo que ingesta y visualiza las compras en vivo, con análisis de medios de pago, control logístico de despachos, emisión e impresión de Facturas (A, B, C y Remito), generación de rótulos térmicos de envío estilo MercadoLibre (10x15cm) y un motor CRM 360° con analíticas gráficas interactivas.

---

## ✨ Características Principales

### 1. 🏬 Tienda Online (Storefront)
- **Diseño Moderno & Glassmorphism**: Interfaz con tipografías *Plus Jakarta Sans* y *Outfit*, animaciones suaves y modo oscuro/claro persistente.
- **Catálogo Interactivo**: Filtrado por categorías (Tecnología, Calzado, Moda, Hogar), ordenamiento por precio y novedades, y barra de búsqueda en vivo.
- **Carrito de Compras Reactivo**: Drawer deslizable con actualización inmediata de subtotales, costo de envío configurable (Envío a domicilio vs Retiro gratis en sucursal) y soporte de cupones de descuento (ej. `SOYDEV` para 20% OFF).
- **Lista de Deseos (Wishlist)**: Guardado de productos favoritos persistente en `localStorage`.
- **Checkout con Validación Telefónica y Fiscal**:
  - **Teléfono WhatsApp Sanitizado**: Selector de código de país (`+54`, `+56`, `+55`, etc.) y campo de celular sin el 0 (ej. `0351 = 351`), permitiendo que la API de WhatsApp envíe las actualizaciones de pedido con el prefijo internacional exacto sin errores de número no registrado.
  - **Condición Fiscal**: Selector entre *Consumidor Final (Factura B)*, *Responsable Inscripto (Factura A)*, *Monotributo* y *Exento*, solicitando DNI, CUIT y Razón Social cuando corresponda.
- **Checkout Seguro con Tarjeta Virtual**: Formulario de pago realista con detección de marca (Visa, Mastercard, American Express), formato dinámico de tarjeta, selección de cuotas y pantalla de éxito con notificación directa por WhatsApp.

---

### 2. 📊 Dashboard Administrativo & CRM (`/dashboard`)
- **Visualización en Tiempo Real**: Ingesta instantánea de nuevos pedidos realizados desde cualquier pestaña de la tienda utilizando `BroadcastChannel` y eventos `storage` a 0ms de latencia.
- **Chime Sonoro Ejecutivo**: Notificación auditiva sintetizada mediante la API nativa de **Web Audio** al recibir una nueva transacción en vivo.
- **Métricas KPI en Vivo**:
  - **Ingresos Totales**: Facturación acumulada en moneda local.
  - **Órdenes Totales**: Contador global y pedidos ingresados en el día de hoy.
  - **Clientes CRM**: Total de compradores únicos y **tasa de recurrencia (%)**.
  - **Ticket Promedio**: Monto promedio gastado por pedido.
- **Gestión Integral de Órdenes (Tabla Optimizada sin Desbordamientos)**:
  - Buscador predictivo por ID de orden, cliente, correo o ciudad.
  - Filtro por estado operativo: *Pendiente*, *En Preparación*, *Enviado*, *Entregado* o *Cancelado*.
  - Filtro logístico: *Envío a Domicilio* vs *Retiro en Sucursal*.
  - Actualización reactiva del estado del pedido con sincronización global.
- **Emisión e Impresión de Facturas Oficiales (A, B, C y Remito)**:
  - Selector en el drawer para emitir **Factura A** (con IVA 21% discriminado para Responsables Inscriptos), **Factura B** (Consumidor Final / Monotributo), **Factura C** o **Remito de Entrega**.
  - Impresión aislada en pestaña nueva optimizada en formato **1 sola página A4** estándar AFIP, sin incluir la interfaz del dashboard.
- **Impresión de Rótulos de Envío Estilo MercadoLibre (10x15cm)**:
  - Generador de etiquetas para paquetes de 10x15cm para impresoras térmicas (Zebra o formato A4).
  - Incluye código QR de alta definición, código de barras vectorial, código postal destacado (`CP: 5000 CÓRDOBA`), datos completos de destinatario, remitente y tracking (`TRACK-XXXXXX-AR`).
- **Centro de Analíticas Gráficas CRM**:
  - Gráfico interactivo SVG de **Evolución de Ventas y Facturación**.
  - Gráfico Donut de **Pipeline de Pedidos por Estado**.
  - Gráfico de **Segmentación de Clientes CRM** (⭐ VIP, 🔄 Recurrente, 🌱 Nuevo) y su aporte al LTV.
  - Gráfico comparativo de **Canales de Despacho** (Envío vs Retiro).
- **Directorio CRM 360° de Clientes**:
  - Detección automática del perfil del cliente (VIP con gasto > $1,000, Recurrente, Nuevo).
  - Cálculo de **LTV (Customer Lifetime Value)** y gasto acumulado consolidado.
  - Modal interactivo de **Ficha 360°** con desglose cronológico de todas las órdenes del cliente.
  - Botón directo para iniciar chat de **WhatsApp** con el cliente mediante número sanitizado con formato internacional.
- **Íconos Vectoriales Seguros**: Reemplazo de dependencias de imágenes locales por insignias de categorías con íconos vectoriales dinámicos que garantizan 100% de fiabilidad visual.
- **Exportación CSV para Excel**: Descarga de transacciones en formato CSV con codificación `UTF-8 con BOM`.

---

## 🛠️ Stack Tecnológico

| Capa | Tecnologías |
|---|---|
| **Estructura** | HTML5 Semántico (W3C Standard, Accesibilidad ARIA) |
| **Estilos** | CSS3 Moderno (Custom Properties, Flexbox, Grid, Glassmorphism, Print Media Queries) |
| **Lógica** | JavaScript Vanilla ES6+ (Async/Await, Event Loop, Modularización) |
| **Tiempo Real** | `BroadcastChannel` API + `window.localStorage` (Cross-Tab Event Sync) |
| **Gráficos** | SVG Vectorial Puro (Responsive, adaptado a modo oscuro y claro) |
| **Audio** | Web Audio API (`AudioContext` con síntesis de osciladores para chimes) |
| **Iconografía** | Font Awesome 6.4.0 & Google Fonts (*Plus Jakarta Sans*, *Outfit*, *JetBrains Mono*) |

---

## 📁 Estructura del Proyecto

```text
MiTienda/
│
├── index.html              # Tienda pública (Catálogo, Carrito, Checkout Fiscal & Teléfono)
├── style.css               # Estilos modernos del storefront y checkout
├── app.js                  # Lógica del storefront, sanitización de WhatsApp y órdenes
│
├── dashboard/              # 📊 MÓDULO ADMINISTRATIVO Y CRM
│   ├── index.html          # Panel de control de órdenes, analíticas gráficas y CRM
│   ├── styles.css          # Diseño del dashboard, gráficos, drawer y modales
│   └── script.js           # Receptor en tiempo real, KPIs, gráficos SVG, facturas y rótulos MeLi
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

1. **Abrir la Tienda**: Navegá a [https://mitienda-one.vercel.app/index.html](https://mitienda-one.vercel.app/index.html).
2. **Abrir el Dashboard**: Abrí en otra pestaña [https://mitienda-one.vercel.app/dashboard/index.html](https://mitienda-one.vercel.app/dashboard/index.html).
3. **Comprar en Vivo**:
   - Agregá productos al carrito en la tienda, ingresá tu celular sin el 0 (ej. `3512619874`), elegí tu condición fiscal (ej. Responsable Inscripto con Factura A), seleccioná envío a domicilio y completá el pago virtual.
   - Observá cómo la pestaña del **Dashboard CRM** emite de inmediato un sonido de campana (*chime*), agrega la orden en la tabla, actualiza los KPIs y los gráficos de ventas y segmentación en vivo.
4. **Imprimir Factura o Remito**:
   - En el Dashboard, hacé clic en **Detalle** de la orden, elegí el tipo de comprobante (*Factura A, B, C o Remito*) y presioná **Imprimir Comprobante**. Se abrirá una pestaña limpia con el documento AFIP oficial en 1 sola página A4.
5. **Imprimir Rótulo de Envío (MeLi)**:
   - Para órdenes con envío a domicilio, hacé clic en **Rótulo Envío MeLi** para abrir la etiqueta térmica de 10x15cm con código de barras y QR lista para pegar en el paquete.
6. **Contactar al Comprador**:
   - Hacé clic en **Contactar al Comprador por WhatsApp** para verificar que el número se abre directamente en WhatsApp Web / App sin errores de código de área ni dígitos faltantes.

---

## 👨‍💻 Autor

**Leopoldo Doerflinger**
- GitHub: [@LeoDoerflinger](https://github.com/LeoDoerflinger)
- LinkedIn: [Leopoldo Doerflinger](https://www.linkedin.com/in/leopoldo-doerflinger-737570186/)
- WhatsApp: [+54 9 351 261-9874](https://wa.me/5493512619874)
- Portfolio: [https://portfolio-leodoerflinger.vercel.app/](https://portfolio-leodoerflinger.vercel.app/)

---
*Desarrollado con dedicación y pasión por la ingeniería web de alto impacto.*

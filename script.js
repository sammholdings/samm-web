
"use strict";

/* CONFIGURACIÓN COMERCIAL DE SAMM HOLDINGS */
const CONFIG = {
  whatsapp: "573014987709",

  // Tarifas ilustrativas en pesos colombianos.
  // Revisa estos valores antes de ofrecer cotizaciones reales.
  tarifas: {
    diseno: 30000,
    disenoCompleto: 55000,
    render: 250000,
    presupuesto: 6000,
    construccion: 3200000
  },

  presupuestoMinimo: 600000
};

/* ELEMENTOS DE LA PÁGINA */
const service = document.getElementById("service");
const area = document.getElementById("area");
const images = document.getElementById("images");
const finish = document.getElementById("finish");

const areaGroup = document.getElementById("areaGroup");
const renderGroup = document.getElementById("renderGroup");
const finishGroup = document.getElementById("finishGroup");

const estimateValue = document.getElementById("estimateValue");
const estimateNote = document.getElementById("estimateNote");
const quoteForm = document.getElementById("quoteForm");
const formMessage = document.getElementById("formMessage");

const nav = document.getElementById("nav");
const menuToggle = document.getElementById("menuToggle");

/* FORMATO DE MONEDA COLOMBIANA */
const money = value =>
  new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(value);

/* NOMBRES DE LOS SERVICIOS */
const serviceNames = {
  diseno: "Diseño arquitectónico básico",
  disenoCompleto: "Diseño arquitectónico completo",
  render: "Render fotorrealista",
  presupuesto: "Presupuesto de obra",
  construccion: "Construcción de vivienda"
};

/* CALCULAR ESTIMACIÓN */
function calculateEstimate() {
  const selected = service.value;
  const squareMeters = Math.max(0, Number(area.value) || 0);
  const imageCount = Math.min(
    100,
    Math.max(1, Number(images.value) || 1)
  );

  // Mostrar únicamente los campos necesarios para cada servicio.
  areaGroup.classList.toggle("hidden", selected === "render");
  renderGroup.classList.toggle("hidden", selected !== "render");
  finishGroup.classList.toggle("hidden", selected !== "construccion");

  area.required = selected !== "render";
  images.required = selected === "render";

  let total = 0;
  let note = "";

  switch (selected) {
    case "diseno":
      total = squareMeters * CONFIG.tarifas.diseno;
      note = "Tarifa ilustrativa de $30.000 COP/m².";
      break;

    case "disenoCompleto":
      total = squareMeters * CONFIG.tarifas.disenoCompleto;
      note = "Tarifa ilustrativa de $55.000 COP/m².";
      break;

    case "render":
      total = imageCount * CONFIG.tarifas.render;
      note = "Referencia desde $250.000 COP por imagen.";
      break;

    case "presupuesto":
      total = Math.max(
        squareMeters * CONFIG.tarifas.presupuesto,
        CONFIG.presupuestoMinimo
      );
      note = "Desde $6.000 COP/m², con mínimo de $600.000 COP.";
      break;

    case "construccion": {
      const multipliers = {
        basico: 0.85,
        medio: 1,
        premium: 1.35
      };

      total =
        squareMeters *
        CONFIG.tarifas.construccion *
        (multipliers[finish.value] || 1);

      note =
        "Referencia inicial para vivienda. Requiere revisión técnica.";
      break;
    }

    default:
      total = 0;
      note = "Selecciona un servicio para calcular una estimación.";
  }

  estimateValue.textContent = money(total);
  estimateNote.textContent = note;

  return {
    total,
    selected,
    squareMeters,
    imageCount
  };
}

/* ACTUALIZAR CÁLCULO AL CAMBIAR LOS CAMPOS */
[service, area, images, finish].forEach(element => {
  element.addEventListener("input", calculateEstimate);
  element.addEventListener("change", calculateEstimate);
});

/* LOS ENLACES DE SERVICIOS SELECCIONAN EL COTIZADOR */
document.querySelectorAll("[data-service]").forEach(link => {
  link.addEventListener("click", () => {
    const selectedService = link.dataset.service;

    // El enlace de diseño dirige al diseño básico.
    if (selectedService === "diseno") {
      service.value = "diseno";
    } else if (serviceNames[selectedService]) {
      service.value = selectedService;
    }

    calculateEstimate();
  });
});

/* MENÚ RESPONSIVE PARA CELULARES */
menuToggle.addEventListener("click", () => {
  const isOpen = nav.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Cerrar menú" : "Abrir menú"
  );

  menuToggle.textContent = isOpen ? "×" : "☰";
});

/* CERRAR MENÚ DESPUÉS DE ELEGIR UNA SECCIÓN */
nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    menuToggle.textContent = "☰";
  });
});

/* CREAR SOLICITUD DE COTIZACIÓN POR WHATSAPP */
quoteForm.addEventListener("submit", event => {
  event.preventDefault();
  formMessage.textContent = "";

  if (!quoteForm.reportValidity()) {
    return;
  }

  const result = calculateEstimate();

  const clientName =
    document.getElementById("clientName").value.trim();

  const clientContact =
    document.getElementById("clientContact").value.trim();

  const city =
    document.getElementById("city").value.trim();

  const details =
    document.getElementById("details").value.trim();

  if (!clientName || !clientContact || !city) {
    formMessage.textContent =
      "Completa tu nombre, teléfono y ciudad.";
    return;
  }

  if (!serviceNames[result.selected]) {
    formMessage.textContent =
      "Selecciona un servicio válido.";
    return;
  }

  const quantity = result.selected === "render"
    ? `Cantidad de imágenes: ${result.imageCount}`
    : `Área aproximada: ${result.squareMeters} m²`;

  const finishText = result.selected === "construccion"
    ? `Acabados: ${finish.options[finish.selectedIndex].text}`
    : "";

  const message = [
    "Hola, SAMM Holdings. Quiero solicitar una cotización.",
    "",
    `Nombre: ${clientName}`,
    `Contacto: ${clientContact}`,
    `Ciudad: ${city}`,
    `Servicio: ${serviceNames[result.selected]}`,
    quantity,
    finishText,
    `Estimación ilustrativa de la web: ${money(result.total)}`,
    `Detalles: ${details || "Pendiente por definir"}`,
    "",
    "Entiendo que la estimación es orientativa y no constituye una cotización definitiva."
  ].filter(Boolean).join("\n");

  const whatsappUrl =
    `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;

  formMessage.textContent =
    "Se abrirá WhatsApp. Revisa el mensaje y envíalo para solicitar tu cotización.";

  const whatsappWindow = window.open(
    whatsappUrl,
    "_blank",
    "noopener,noreferrer"
  );

  // Alternativa si el navegador bloquea la nueva ventana.
  if (!whatsappWindow) {
    formMessage.textContent = "";

    const link = document.createElement("a");
    link.href = whatsappUrl;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Haz clic aquí para abrir WhatsApp";

    formMessage.appendChild(link);
  }
});

/* AÑO AUTOMÁTICO EN EL PIE DE PÁGINA */
document.getElementById("year").textContent =
  new Date().getFullYear();

/* CALCULAR EL VALOR INICIAL AL CARGAR LA PÁGINA */
calculateEstimate();

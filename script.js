
"use strict";

/*
  IMPORTANTE:
  Estos valores son referencias ilustrativas. Ajusta las tarifas
  antes de utilizar el cotizador comercialmente.
*/
const CONFIG = {
  whatsapp: "573014987709",
  tarifas: {
    diseno: 30000,
    disenoCompleto: 55000,
    render: 250000,
    presupuesto: 6000,
    construccion: 3200000
  },
  presupuestoMinimo: 600000
};

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

const serviceNames = {
  diseno: "Diseño arquitectónico básico",
  disenoCompleto: "Diseño arquitectónico completo",
  render: "Render fotorrealista",
  presupuesto: "Presupuesto de obra",
  construccion: "Construcción de vivienda"
};

function money(value) {
  return new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  }).format(value);
}

function calculateEstimate() {
  const selected = service.value;
  const squareMeters = Math.max(0, Number(area.value) || 0);
  const imageCount = Math.min(100, Math.max(1, Number(images.value) || 1));

  const isRender = selected === "render";
  const isConstruction = selected === "construccion";

  areaGroup.classList.toggle("hidden", isRender);
  renderGroup.classList.toggle("hidden", !isRender);
  finishGroup.classList.toggle("hidden", !isConstruction);

  area.required = !isRender;
  images.required = isRender;

  let total = 0;
  let note = "";

  switch (selected) {
    case "diseno":
      total = squareMeters * CONFIG.tarifas.diseno;
      note = "Referencia ilustrativa: $30.000 COP/m².";
      break;

    case "disenoCompleto":
      total = squareMeters * CONFIG.tarifas.disenoCompleto;
      note = "Referencia ilustrativa: $55.000 COP/m².";
      break;

    case "render":
      total = imageCount * CONFIG.tarifas.render;
      note = "Referencia ilustrativa: $250.000 COP por imagen.";
      break;

    case "presupuesto":
      total = Math.max(
        squareMeters * CONFIG.tarifas.presupuesto,
        CONFIG.presupuestoMinimo
      );
      note = "Referencia desde $6.000 COP/m², mínimo ilustrativo $600.000.";
      break;

    case "construccion": {
      const multipliers = {
        basico: 0.85,
        medio: 1,
        premium: 1.35
      };

      total = squareMeters * CONFIG.tarifas.construccion *
        (multipliers[finish.value] || 1);

      note = "Valor preliminar. Requiere revisión técnica y de acabados.";
      break;
    }

    default:
      note = "Selecciona un servicio.";
  }

  estimateValue.textContent = money(total);
  estimateNote.textContent = note;

  return { total, selected, squareMeters, imageCount };
}

[service, area, images, finish].forEach(element => {
  element.addEventListener("input", calculateEstimate);
  element.addEventListener("change", calculateEstimate);
});

/* Seleccionar el servicio desde las tarjetas */
document.querySelectorAll("[data-service]").forEach(link => {
  link.addEventListener("click", () => {
    const chosen = link.dataset.service;
    if (serviceNames[chosen]) {
      service.value = chosen;
      calculateEstimate();
    }
  });
});

/* Menú para móviles */
menuToggle.addEventListener("click", () => {
  const opened = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(opened));
  menuToggle.setAttribute("aria-label", opened ? "Cerrar menú" : "Abrir menú");
  menuToggle.textContent = opened ? "×" : "☰";
});

nav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
    menuToggle.textContent = "☰";
  });
});

/* Formulario de cotización por WhatsApp */
quoteForm.addEventListener("submit", event => {
  event.preventDefault();
  formMessage.textContent = "";

  if (!quoteForm.reportValidity()) return;

  const result = calculateEstimate();
  const clientName = document.getElementById("clientName").value.trim();
  const clientContact = document.getElementById("clientContact").value.trim();
  const city = document.getElementById("city").value.trim();
  const details = document.getElementById("details").value.trim();

  if (!clientName || !clientContact || !city) {
    formMessage.textContent = "Completa tu nombre, contacto y ciudad.";
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
    `Estimación ilustrativa: ${money(result.total)}`,
    `Detalles: ${details || "Pendiente por definir"}`,
    "",
    "Entiendo que la estimación es orientativa y requiere confirmación."
  ].filter(Boolean).join("\n");

  const url = `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;

  formMessage.textContent =
    "Se abrirá WhatsApp. Revisa el mensaje y pulsa Enviar.";

  const popup = window.open(url, "_blank", "noopener,noreferrer");

  if (!popup) {
    formMessage.textContent = "";
    const link = document.createElement("a");
    link.href = url;
    link.target = "_blank";
    link.rel = "noopener noreferrer";
    link.textContent = "Haz clic aquí para abrir WhatsApp";
    formMessage.appendChild(link);
  }
});

/* Año automático */
document.getElementById("year").textContent = new Date().getFullYear();

/* Cálculo inicial */
calculateEstimate();

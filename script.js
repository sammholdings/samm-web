
"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const WHATSAPP = "573014987709";

  const $ = (selector) => document.querySelector(selector);

  const year = $("#currentYear");
  const menuButton = $("#menuToggle");
  const nav = $("#nav");

  if (year) {
    year.textContent = new Date().getFullYear();
  }

  // MENÚ RESPONSIVE
  function closeMenu() {
    if (!menuButton || !nav) return;
    nav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.setAttribute("aria-label", "Abrir menú");
  }

  if (menuButton && nav) {
    menuButton.addEventListener("click", function (event) {
      event.preventDefault();
      const open = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
      menuButton.setAttribute(
        "aria-label",
        open ? "Cerrar menú" : "Abrir menú"
      );
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });
  }

  // TARIFAS DE REFERENCIA EDITABLES EN PESOS COLOMBIANOS.
  // Confirma y sustituye estos valores por las tarifas comerciales reales.
  const services = {
    diseno: {
      name: "Diseño arquitectónico",
      rate: { basico: 25000, medio: 35000, alto: 50000 },
      minimum: 1500000,
      unit: "m²"
    },
    render: {
      name: "Render y visualización 3D",
      rate: { basico: 15000, medio: 25000, alto: 40000 },
      minimum: 500000,
      unit: "m²"
    },
    construccion: {
      name: "Construcción",
      rate: { basico: 1800000, medio: 2600000, alto: 3800000 },
      minimum: 0,
      unit: "m²"
    },
    remodelacion: {
      name: "Remodelación",
      rate: { basico: 500000, medio: 900000, alto: 1500000 },
      minimum: 1000000,
      unit: "m²"
    },
    bim: {
      name: "Modelado BIM",
      rate: { basico: 12000, medio: 22000, alto: 35000 },
      minimum: 500000,
      unit: "m²"
    },
    planos: {
      name: "Planos y documentación",
      rate: { basico: 15000, medio: 25000, alto: 40000 },
      minimum: 700000,
      unit: "m²"
    },
    inmobiliaria: {
      name: "Gestión inmobiliaria",
      custom: true,
      unit: "m²"
    }
  };

  const finishNames = {
    basico: "Básico",
    medio: "Medio",
    alto: "Premium"
  };

  const money = (value) =>
    new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0
    }).format(value);

  const form = $("#quoteForm");
  const type = $("#projectType");
  const area = $("#area");
  const finish = $("#finish");
  const city = $("#city");
  const details = $("#projectDetails");
  const result = $("#quoteResult");
  const areaField = $("#areaField");

  if (!form || !type || !area || !finish || !city || !result) {
    console.error("SAMM: no se encontraron todos los campos del cotizador.");
    return;
  }

  // Impide que el navegador intente enviar el formulario y cambie la URL.
  form.setAttribute("action", "javascript:void(0)");
  form.setAttribute("method", "dialog");

  let lastQuote = null;

  function clearResult() {
    result.classList.remove("visible");
    result.replaceChildren();
    lastQuote = null;
  }

  function updateService() {
    const service = services[type.value];
    if (!service) return;

    const label = areaField ? areaField.querySelector("label") : null;
    if (label) label.textContent = "Área aproximada (" + service.unit + ")";

    finish.disabled = Boolean(service.custom);
    if (service.custom) finish.value = "medio";

    clearResult();
  }

  type.addEventListener("change", updateService);
  area.addEventListener("input", clearResult);
  finish.addEventListener("change", clearResult);
  city.addEventListener("input", clearResult);

  if (details) details.addEventListener("input", clearResult);

  document.querySelectorAll("[data-service-link]").forEach((link) => {
    link.addEventListener("click", () => {
      const key = link.getAttribute("data-service-link");
      if (services[key]) {
        type.value = key;
        updateService();
      }
    });
  });

  function element(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function addRow(container, label, value) {
    const row = element("div", "result-row");
    row.append(element("span", "", label));
    row.append(element("strong", "", value));
    container.append(row);
  }

  function showEstimate(quote) {
    result.replaceChildren();
    result.classList.add("visible");

    result.append(
      element(
        "span",
        "result-label",
        quote.custom ? "COTIZACIÓN PERSONALIZADA" : "VALOR DE REFERENCIA"
      )
    );

    result.append(
      element(
        "strong",
        "result-price",
        quote.custom ? "Por definir" : money(quote.total)
      )
    );

    result.append(
      element(
        "p",
        "result-description",
        quote.custom
          ? "La gestión inmobiliaria depende de las actividades, el tipo de inmueble y el alcance del servicio. Envíanos la información para preparar una propuesta."
          : "Estimación para " + quote.service.name.toLowerCase() +
            " de " + quote.area.toLocaleString("es-CO") + " m²."
      )
    );

    if (!quote.custom) {
      const breakdown = element("div", "result-breakdown");

      addRow(breakdown, "Servicio", quote.service.name);
      addRow(
        breakdown,
        "Área",
        quote.area.toLocaleString("es-CO") + " m²"
      );
      addRow(
        breakdown,
        "Tarifa de referencia",
        money(quote.rate) + " / m²"
      );
      addRow(
        breakdown,
        "Operación",
        quote.area.toLocaleString("es-CO") + " × " + money(quote.rate)
      );

      if (quote.minimumApplied) {
        addRow(
          breakdown,
          "Valor mínimo aplicado",
          money(quote.service.minimum)
        );
      } else {
        addRow(breakdown, "Subtotal", money(quote.subtotal));
      }

      addRow(
        breakdown,
        "Nivel de acabado",
        finishNames[quote.finish]
      );

      result.append(breakdown);
    }

    result.append(
      element(
        "p",
        "result-note",
        "Tarifas ilustrativas, no verificadas como precios de mercado. El valor definitivo depende del alcance, ubicación, materiales, especificaciones y condiciones del proyecto. No constituye una oferta comercial."
      )
    );

    const message = [
      "Hola, SAMM Holdings S.A.S. Quiero solicitar una cotización.",
      "",
      "Servicio: " + quote.service.name,
      "Ciudad: " + quote.city,
      "Área: " + quote.area + " m²",
      "Acabados: " + finishNames[quote.finish],
      "Valor de referencia: " +
        (quote.custom ? "Por definir" : money(quote.total)),
      details && details.value.trim()
        ? "Detalles: " + details.value.trim()
        : "",
      "",
      "Solicito revisión del alcance y una cotización formal."
    ].filter(Boolean).join("\n");

    const whatsapp = element(
      "a",
      "btn btn-primary result-whatsapp",
      "Consultar por WhatsApp ↗"
    );

    whatsapp.href =
      "https://wa.me/" + WHATSAPP + "?text=" +
      encodeURIComponent(message);
    whatsapp.target = "_blank";
    whatsapp.rel = "noopener noreferrer";

    result.append(whatsapp);
    lastQuote = quote;
  }

  // El evento submit intercepta el envío antes de cualquier navegación.
  form.addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();

    const service = services[type.value];
    const areaValue = Number(area.value);
    const cityValue = city.value.trim();
    const finishValue = finish.value;

    if (!service) {
      type.focus();
      return;
    }

    if (!Number.isFinite(areaValue) || areaValue <= 0 || areaValue > 100000) {
      area.setCustomValidity("Ingresa un área entre 1 y 100.000 m².");
      area.reportValidity();
      area.setCustomValidity("");
      area.focus();
      return;
    }

    if (!cityValue) {
      city.setCustomValidity("Escribe la ciudad o municipio del proyecto.");
      city.reportValidity();
      city.setCustomValidity("");
      city.focus();
      return;
    }

    if (!service.custom && !service.rate[finishValue]) {
      finish.focus();
      return;
    }

    let quote;

    if (service.custom) {
      quote = {
        service,
        area: areaValue,
        finish: finishValue,
        city: cityValue,
        custom: true
      };
    } else {
      const rate = service.rate[finishValue];
      const subtotal = areaValue * rate;
      const total = Math.max(subtotal, service.minimum);

      quote = {
        service,
        area: areaValue,
        finish: finishValue,
        city: cityValue,
        rate,
        subtotal,
        total,
        minimumApplied: subtotal < service.minimum,
        custom: false
      };
    }

    showEstimate(quote);

    // Muestra el resultado sin recargar la página ni cambiar la URL.
    result.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  });

  updateService();
});

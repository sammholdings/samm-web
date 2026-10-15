
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const WHATSAPP_NUMBER = "573014987709";

  // ==========================================
  // AÑO DEL PIE DE PÁGINA
  // ==========================================

  const yearElement = document.getElementById("currentYear");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // ==========================================
  // MENÚ MÓVIL
  // ==========================================

  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");

  function closeMenu() {
    if (!menuToggle || !nav) return;

    nav.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menú");
  }

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú" : "Abrir menú"
      );
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu();
    });

    document.addEventListener("click", (event) => {
      if (
        nav.classList.contains("open") &&
        !nav.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  // ==========================================
  // SERVICIOS Y TARIFAS CONFIGURABLES
  // ==========================================
  //
  // IMPORTANTE:
  // Estas cifras son valores ilustrativos en COP.
  // Ajusta cada tarifa a tus precios comerciales reales.
  //
  // Los valores por m² NO son tarifas oficiales ni
  // constituyen presupuestos definitivos de construcción.

  const SERVICES = {
    diseno: {
      name: "Diseño arquitectónico",
      unit: "m²",
      rates: {
        basico: 25000,
        medio: 35000,
        alto: 50000
      },
      minimum: 1500000,
      label: "Área de diseño"
    },

    render: {
      name: "Render y visualización 3D",
      unit: "m²",
      rates: {
        basico: 15000,
        medio: 25000,
        alto: 40000
      },
      minimum: 500000,
      label: "Área de referencia"
    },

    construccion: {
      name: "Construcción",
      unit: "m²",
      rates: {
        basico: 1800000,
        medio: 2600000,
        alto: 3800000
      },
      minimum: 0,
      label: "Área construida"
    },

    remodelacion: {
      name: "Remodelación",
      unit: "m²",
      rates: {
        basico: 500000,
        medio: 900000,
        alto: 1500000
      },
      minimum: 1000000,
      label: "Área de remodelación"
    },

    bim: {
      name: "Modelado BIM",
      unit: "m²",
      rates: {
        basico: 12000,
        medio: 22000,
        alto: 35000
      },
      minimum: 500000,
      label: "Área modelada"
    },

    planos: {
      name: "Planos y documentación",
      unit: "m²",
      rates: {
        basico: 15000,
        medio: 25000,
        alto: 40000
      },
      minimum: 700000,
      label: "Área documentada"
    },

    inmobiliaria: {
      name: "Gestión inmobiliaria",
      unit: "m²",
      rates: {
        basico: 0,
        medio: 0,
        alto: 0
      },
      minimum: 0,
      label: "Área del inmueble"
    }
  };

  const FINISHES = {
    basico: "Básico",
    medio: "Medio",
    alto: "Premium"
  };

  const COP = new Intl.NumberFormat("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  });

  const quoteForm = document.getElementById("quoteForm");
  const projectType = document.getElementById("projectType");
  const areaInput = document.getElementById("area");
  const finishInput = document.getElementById("finish");
  const cityInput = document.getElementById("city");
  const detailsInput = document.getElementById("projectDetails");
  const quoteResult = document.getElementById("quoteResult");
  const areaField = document.getElementById("areaField");

  if (
    !quoteForm ||
    !projectType ||
    !areaInput ||
    !finishInput ||
    !cityInput ||
    !detailsInput ||
    !quoteResult
  ) {
    return;
  }

  let lastEstimate = null;

  function hideResult() {
    quoteResult.classList.remove("visible");
    quoteResult.replaceChildren();
    lastEstimate = null;
  }

  function updateServiceFields() {
    const service = SERVICES[projectType.value];

    if (!service) return;

    const areaLabel = areaField
      ? areaField.querySelector("label")
      : null;

    if (areaLabel) {
      areaLabel.textContent =
        service.label + " (m²)";
    }

    if (projectType.value === "inmobiliaria") {
      finishInput.value = "medio";
      finishInput.disabled = true;
    } else {
      finishInput.disabled = false;
    }

    hideResult();
  }

  projectType.addEventListener("change", updateServiceFields);
  finishInput.addEventListener("change", hideResult);
  areaInput.addEventListener("input", hideResult);
  cityInput.addEventListener("input", hideResult);
  detailsInput.addEventListener("input", hideResult);

  // Los enlaces de servicios seleccionan el servicio correspondiente.
  document.querySelectorAll("[data-service-link]").forEach((link) => {
    link.addEventListener("click", () => {
      const selectedService = link.dataset.serviceLink;

      if (SERVICES[selectedService]) {
        projectType.value = selectedService;
        updateServiceFields();
      }
    });
  });

  function createElement(tag, className, text) {
    const element = document.createElement(tag);

    if (className) element.className = className;
    if (text !== undefined) element.textContent = text;

    return element;
  }

  function addBreakdownRow(container, label, value) {
    const row = createElement("div", "result-row");
    const left = createElement("span", "", label);
    const right = createElement("strong", "", value);

    row.append(left, right);
    container.appendChild(row);
  }

  function calculateEstimate(serviceKey, area, finish) {
    const service = SERVICES[serviceKey];

    if (!service) return null;

    // La gestión inmobiliaria requiere revisar el alcance
    // y no se cotiza de manera responsable solo por m².
    if (serviceKey === "inmobiliaria") {
      return {
        service,
        area,
        finish,
        total: null,
        rate: null,
        isCustom: true
      };
    }

    const rate = service.rates[finish];

    if (!Number.isFinite(rate) || rate <= 0) {
      return null;
    }

    const subtotal = area * rate;
    const total = Math.max(subtotal, service.minimum);

    return {
      service,
      area,
      finish,
      rate,
      subtotal,
      total,
      isCustom: false
    };
  }

  function renderEstimate(estimate, city, details) {
    quoteResult.replaceChildren();
    quoteResult.classList.add("visible");

    const label = createElement(
      "span",
      "result-label",
      estimate.isCustom
        ? "SOLICITUD DE COTIZACIÓN PERSONALIZADA"
        : "ESTIMACIÓN PRELIMINAR"
    );

    quoteResult.appendChild(label);

    const price = createElement(
      "strong",
      "result-price",
      estimate.isCustom
        ? "A definir"
        : COP.format(estimate.total)
    );

    quoteResult.appendChild(price);

    const description = estimate.isCustom
      ? "La gestión inmobiliaria depende del tipo de inmueble, las tareas requeridas y el alcance de la administración. Envíanos tus datos para revisar la propuesta."
      : "Referencia calculada para " +
        estimate.service.name.toLowerCase() +
        " con " +
        estimate.area.toLocaleString("es-CO") +
        " m² y nivel de acabado " +
        FINISHES[estimate.finish].toLowerCase() +
        ".";

    quoteResult.appendChild(
      createElement("p", "result-description", description)
    );

    if (!estimate.isCustom) {
      const breakdown = createElement(
        "div",
        "result-breakdown"
      );

      addBreakdownRow(
        breakdown,
        "Servicio",
        estimate.service.name
      );

      addBreakdownRow(
        breakdown,
        "Área",
        estimate.area.toLocaleString("es-CO") + " m²"
      );

      addBreakdownRow(
        breakdown,
        "Tarifa ilustrativa por m²",
        COP.format(estimate.rate)
      );

      if (estimate.subtotal < estimate.service.minimum) {
        addBreakdownRow(
          breakdown,
          "Valor mínimo aplicado",
          COP.format(estimate.service.minimum)
        );
      } else {
        addBreakdownRow(
          breakdown,
          "Subtotal estimado",
          COP.format(estimate.subtotal)
        );
      }

      addBreakdownRow(
        breakdown,
        "Acabados",
        FINISHES[estimate.finish]
      );

      quoteResult.appendChild(breakdown);
    }

    quoteResult.appendChild(
      createElement(
        "p",
        "result-note",
        "Este valor es únicamente orientativo. No incluye automáticamente licencias, estudios, impuestos, transporte, diseños especializados ni otros conceptos que dependan del proyecto. El alcance y el precio deben validarse antes de contratar."
      )
    );

    const whatsappButton = createElement(
      "a",
      "btn btn-primary result-whatsapp",
      "Enviar consulta por WhatsApp ↗"
    );

    const messageLines = [
      "Hola, SAMM Holdings S.A.S. Quiero solicitar una cotización.",
      "",
      "Servicio: " + estimate.service.name,
      "Ciudad: " + city,
      "Área: " + estimate.area + " m²",
      "Nivel de acabados: " + FINISHES[estimate.finish],
      "Estimación preliminar: " +
        (estimate.isCustom
          ? "Por definir"
          : COP.format(estimate.total))
    ];

    if (details) {
      messageLines.push("", "Detalles del proyecto:", details);
    }

    messageLines.push(
      "",
      "Entiendo que el valor es orientativo y solicito una revisión del alcance."
    );

    whatsappButton.href =
      "https://wa.me/" +
      WHATSAPP_NUMBER +
      "?text=" +
      encodeURIComponent(messageLines.join("\n"));

    whatsappButton.target = "_blank";
    whatsappButton.rel = "noopener noreferrer";

    quoteResult.appendChild(whatsappButton);

    lastEstimate = estimate;
  }

  quoteForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const serviceKey = projectType.value;
    const area = Number(areaInput.value);
    const finish = finishInput.value;
    const city = cityInput.value.trim();
    const details = detailsInput.value.trim();

    if (!SERVICES[serviceKey]) {
      projectType.focus();
      return;
    }

    if (!Number.isFinite(area) || area <= 0 || area > 100000) {
      areaInput.setCustomValidity(
        "Ingresa un área mayor que cero y menor o igual a 100.000 m²."
      );
      areaInput.reportValidity();
      areaInput.setCustomValidity("");
      areaInput.focus();
      return;
    }

    if (!city) {
      cityInput.setCustomValidity(
        "Escribe la ciudad o el municipio del proyecto."
      );
      cityInput.reportValidity();
      cityInput.setCustomValidity("");
      cityInput.focus();
      return;
    }

    if (!FINISHES[finish]) {
      finishInput.focus();
      return;
    }

    const estimate = calculateEstimate(
      serviceKey,
      area,
      finish
    );

    if (!estimate) {
      quoteResult.classList.add("visible");
      quoteResult.replaceChildren(
        createElement(
          "p",
          "result-description",
          "No pudimos calcular esta referencia. Verifica los datos o solicita una cotización personalizada por WhatsApp."
        )
      );
      return;
    }

    renderEstimate(estimate, city, details);
    quoteResult.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  });

  // Inicializa el formulario con el servicio seleccionado.
  updateServiceFields();
});


document.addEventListener("DOMContentLoaded", () => {
  // AÑO AUTOMÁTICO EN EL PIE DE PÁGINA
  const currentYear = document.getElementById("currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // MENÚ PARA CELULARES
  const menuToggle = document.getElementById("menuToggle");
  const nav = document.getElementById("nav");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");

      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Cerrar menú" : "Abrir menú"
      );
      menuToggle.textContent = isOpen ? "✕" : "☰";
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
        menuToggle.textContent = "☰";
      });
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menú");
        menuToggle.textContent = "☰";
      }
    });
  }

  // COTIZADOR PRELIMINAR
  const quoteForm = document.getElementById("quoteForm");
  const quoteResult = document.getElementById("quoteResult");

  if (quoteForm && quoteResult) {
    quoteForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const projectType =
        document.getElementById("projectType").value;

      const area = Number(
        document.getElementById("area").value
      );

      const finish =
        document.getElementById("finish").value;

      if (!Number.isFinite(area) || area <= 0) {
        quoteResult.classList.add("visible");
        quoteResult.textContent =
          "Ingresa un área válida para calcular la estimación.";
        return;
      }

      // Valores ilustrativos en pesos colombianos.
      // No representan tarifas oficiales ni una oferta comercial.
      const rates = {
        diseno: {
          basico: 25000,
          medio: 35000,
          alto: 50000
        },
        render: {
          basico: 15000,
          medio: 25000,
          alto: 40000
        },
        construccion: {
          basico: 1800000,
          medio: 2600000,
          alto: 3800000
        },
        remodelacion: {
          basico: 500000,
          medio: 900000,
          alto: 1500000
        },
        bim: {
          basico: 12000,
          medio: 22000,
          alto: 35000
        }
      };

      const projectNames = {
        diseno: "Diseño arquitectónico",
        render: "Render y visualización 3D",
        construccion: "Construcción",
        remodelacion: "Remodelación",
        bim: "Modelado BIM"
      };

      const finishNames = {
        basico: "Básico",
        medio: "Medio",
        alto: "Alto"
      };

      const rate = rates[projectType]?.[finish];

      if (!rate) {
        quoteResult.classList.add("visible");
        quoteResult.textContent =
          "No fue posible calcular la estimación. Inténtalo de nuevo.";
        return;
      }

      const total = area * rate;

      const money = new Intl.NumberFormat("es-CO", {
        style: "currency",
        currency: "COP",
        maximumFractionDigits: 0
      }).format(total);

      quoteResult.classList.add("visible");
      quoteResult.replaceChildren();

      const title = document.createElement("strong");
      title.textContent = money;

      const summary = document.createElement("p");
      summary.textContent =
        "Estimación preliminar para " +
        projectNames[projectType] +
        ", con " + area.toLocaleString("es-CO") +
        " m² y acabados " + finishNames[finish].toLowerCase() + ".";

      const note = document.createElement("p");
      note.textContent =
        "Valor orientativo sujeto a revisión de alcance, ubicación, " +
        "materiales, especificaciones y condiciones del proyecto.";

      const whatsapp = document.createElement("a");
      whatsapp.className = "btn btn-primary";
      whatsapp.style.marginTop = "14px";
      whatsapp.style.width = "100%";
      whatsapp.style.textAlign = "center";
      whatsapp.target = "_blank";
      whatsapp.rel = "noopener noreferrer";

      const message =
        "Hola, SAMM Holdings. Quiero consultar una cotización.%0A" +
        "Proyecto: " + encodeURIComponent(projectNames[projectType]) + "%0A" +
        "Área: " + encodeURIComponent(area + " m²") + "%0A" +
        "Acabados: " + encodeURIComponent(finishNames[finish]) + "%0A" +
        "Estimación orientativa: " + encodeURIComponent(money);

      whatsapp.href = "https://wa.me/573014987709?text=" + message;
      whatsapp.textContent = "Consultar por WhatsApp ↗";

      quoteResult.append(title, summary, note, whatsapp);
    });
  }
});

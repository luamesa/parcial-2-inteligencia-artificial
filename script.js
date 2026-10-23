
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Cerrar menú" : "Abrir menú"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Abrir menú");
      menuToggle.textContent = "☰";
    });
  });

  const cases = [
    {
      tag: "CASO 01",
      symbol: "◈",
      title: "La información no es un producto cualquiera",
      description:
        "Una empresa solicita utilizar los datos personales de sus usuarios para una nueva campaña comercial, aunque estos no fueron recopilados con ese propósito.",
      question:
        "¿Cómo puedes aprovechar la información sin vulnerar la privacidad ni la confianza de los usuarios?",
      solution:
        "Antes de utilizar los datos, verifica el propósito para el que fueron recopilados, informa claramente a las personas y determina si existe una base legítima para el nuevo uso. Aplica medidas de seguridad, limita el acceso y recoge únicamente la información necesaria. No compartas datos personales sin la debida autorización o fundamento legal.",
      principle: "Dignidad humana y responsabilidad digital"
    },
    {
      tag: "CASO 02",
      symbol: "✳",
      title: "Cuando un algoritmo no trata a todos por igual",
      description:
        "Una organización utiliza inteligencia artificial para seleccionar candidatos. Descubres que el sistema favorece ciertos perfiles y perjudica injustamente a otros.",
      question:
        "¿Qué deberías hacer como profesional antes de permitir que el sistema continúe tomando decisiones?",
      solution:
        "Investiga el origen del sesgo, evalúa los datos y mide los resultados para distintos grupos. Documenta los hallazgos, propone correcciones y establece mecanismos de supervisión humana y revisión de decisiones. La automatización no elimina la responsabilidad de quienes diseñan y utilizan el sistema.",
      principle: "Convivencia plural y responsabilidad digital"
    },
    {
      tag: "CASO 03",
      symbol: "◎",
      title: "Una aplicación que no todos pueden utilizar",
      description:
        "Tu equipo desarrolla una plataforma de servicios, pero algunas personas con discapacidad visual o dificultades de movilidad no pueden completar las tareas principales.",
      question:
        "¿Es suficiente que la aplicación funcione para la mayoría de los usuarios?",
      solution:
        "No. Evalúa la accesibilidad desde el diseño, incorpora navegación por teclado, etiquetas comprensibles, contraste adecuado y compatibilidad con tecnologías de asistencia. Prueba la plataforma con usuarios diversos y corrige las barreras encontradas. La inclusión debe ser parte del desarrollo, no un añadido final.",
      principle: "Dignidad humana, cuidado e inclusión"
    }
  ];

  const tabs = document.querySelectorAll(".case-tab");
  const caseTag = document.getElementById("caseTag");
  const caseSymbol = document.getElementById("caseSymbol");
  const caseTitle = document.getElementById("caseTitle");
  const caseDescription = document.getElementById("caseDescription");
  const caseQuestion = document.getElementById("caseQuestion");
  const analyzeButton = document.getElementById("analyzeCase");
  const caseAnalysis = document.getElementById("caseAnalysis");
  const caseSolution = document.getElementById("caseSolution");
  const casePrinciple = document.getElementById("casePrinciple");

  let selectedCase = 0;

  function showCase(index) {
    selectedCase = index;
    const item = cases[index];

    caseTag.textContent = item.tag;
    caseSymbol.textContent = item.symbol;
    caseTitle.textContent = item.title;
    caseDescription.textContent = item.description;
    caseQuestion.textContent = item.question;
    caseSolution.textContent = item.solution;
    casePrinciple.textContent = item.principle;

    caseAnalysis.hidden = true;
    analyzeButton.innerHTML = 'Ver análisis ético <span>↗</span>';

    tabs.forEach((tab, tabIndex) => {
      const active = tabIndex === index;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-pressed", String(active));
    });
  }

  tabs.forEach((tab) => {
    tab.setAttribute(
      "aria-pressed",
      String(tab.classList.contains("active"))
    );

    tab.addEventListener("click", () => {
      const index = Number(tab.dataset.case);

      if (Number.isInteger(index) && cases[index]) {
        showCase(index);
      }
    });
  });

  analyzeButton.addEventListener("click", () => {
    const isHidden = caseAnalysis.hidden;
    caseAnalysis.hidden = !isHidden;

    analyzeButton.innerHTML = isHidden
      ? "Ocultar análisis ↑"
      : 'Ver análisis ético <span>↗</span>';

    if (isHidden) {
      caseAnalysis.scrollIntoView({
        behavior: "smooth",
        block: "nearest"
      });
    }
  });

  const reflectionForm = document.getElementById("reflectionForm");
  const principleSelect = document.getElementById("principleSelect");
  const reflectionText = document.getElementById("reflectionText");
  const reflectionResult = document.getElementById("reflectionResult");

  reflectionForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const principle = principleSelect.value;
    const reflection = reflectionText.value.trim();

    if (!principle || !reflection) {
      reflectionForm.reportValidity();
      return;
    }

    if (reflection.length < 15) {
      reflectionText.setCustomValidity(
        "Escribe una reflexión de al menos 15 caracteres."
      );
      reflectionText.reportValidity();
      reflectionText.setCustomValidity("");
      return;
    }

    const heading = document.createElement("h4");
    heading.textContent = "Mi compromiso ético";

    const principleLine = document.createElement("p");
    principleLine.textContent = `Principio elegido: ${principle}.`;

    const reflectionLine = document.createElement("p");
    reflectionLine.textContent = reflection;

    reflectionResult.replaceChildren(
      heading,
      principleLine,
      reflectionLine
    );

    reflectionResult.hidden = false;

    reflectionResult.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  });

  showCase(0);
});

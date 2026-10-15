/* ==========================================================================
   PASSWORDGEN — SCRIPT DE CONTROL CRIPTOGRÁFICO & ENTROPÍA
   Generación segura por CSPRNG (Web Crypto API)
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // --- Elementos del DOM ---
  const lengthInput = document.getElementById("length");
  const lengthSlider = document.getElementById("length-slider");
  const lengthDisplay = document.getElementById("length-display");
  const uppercaseCheckbox = document.getElementById("uppercase");
  const lowercaseCheckbox = document.getElementById("lowercase");
  const numbersCheckbox = document.getElementById("numbers");
  const symbolsCheckbox = document.getElementById("symbols");
  const generateButton = document.getElementById("generate");
  const regenerateBtn = document.getElementById("btn-regenerate");
  const passwordField = document.getElementById("password");
  const copyButton = document.getElementById("copy");
  const themeToggleBtn = document.getElementById("theme-toggle");
  const entropyText = document.getElementById("entropy-text");
  const entropyBar = document.getElementById("entropy-bar");
  const toastNotice = document.getElementById("toast-notice");
  const toastMessage = document.getElementById("toast-message");

  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const numberChars = "0123456789";
  const symbolChars = "!@#$%^&*()_+{}[]<>?~";

  // --- Sincronizar Sliders y Números ---
  function updateLength(val) {
    const num = Math.max(6, Math.min(64, parseInt(val, 10) || 16));
    if (lengthInput) lengthInput.value = num;
    if (lengthSlider) lengthSlider.value = num;
    if (lengthDisplay) lengthDisplay.textContent = num;
    generatePassword();
  }

  if (lengthSlider) {
    lengthSlider.addEventListener("input", (e) => updateLength(e.target.value));
  }
  if (lengthInput) {
    lengthInput.addEventListener("input", (e) => updateLength(e.target.value));
  }

  // --- Visualizar estado activo de las tarjetas switch ---
  const checkboxes = [uppercaseCheckbox, lowercaseCheckbox, numbersCheckbox, symbolsCheckbox];
  checkboxes.forEach((cb) => {
    if (!cb) return;
    cb.addEventListener("change", () => {
      const card = cb.closest(".switch-card");
      if (card) {
        card.classList.toggle("active", cb.checked);
      }
      generatePassword();
    });
  });

  // --- Toast Feedback ---
  let toastTimeout;
  function showToast(msg) {
    if (!toastNotice) return;
    if (toastMessage) toastMessage.textContent = msg;
    toastNotice.classList.add("show");
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastNotice.classList.remove("show");
    }, 2500);
  }

  // --- Cálculo de Entropía Criptográfica ---
  function calcularEntropia(length, poolSize) {
    if (poolSize === 0 || length === 0) return 0;
    return Math.round(length * Math.log2(poolSize));
  }

  function actualizarBarraEntropia(bits) {
    if (!entropyText || !entropyBar) return;

    let nivel = "Débil";
    let colorVar = "var(--color-weak)";
    let pct = Math.min(100, Math.max(10, Math.round((bits / 128) * 100)));

    if (bits < 45) {
      nivel = "Vulnerable";
      colorVar = "var(--color-weak)";
    } else if (bits < 65) {
      nivel = "Moderada";
      colorVar = "var(--color-moderate)";
    } else if (bits < 90) {
      nivel = "Segura";
      colorVar = "var(--color-secure)";
    } else {
      nivel = "Máxima Seguridad";
      colorVar = "var(--color-secure)";
    }

    entropyText.textContent = `${nivel} (${bits} bits)`;
    entropyText.style.color = colorVar;
    entropyBar.style.width = `${pct}%`;
    entropyBar.style.backgroundColor = colorVar;
  }

  // --- Generador Seguro con CSPRNG ---
  function generatePassword() {
    const length = parseInt(lengthInput ? lengthInput.value : 16, 10) || 16;
    let charSet = "";
    let poolSize = 0;

    if (uppercaseCheckbox && uppercaseCheckbox.checked) {
      charSet += uppercaseChars;
      poolSize += uppercaseChars.length;
    }
    if (lowercaseCheckbox && lowercaseCheckbox.checked) {
      charSet += lowercaseChars;
      poolSize += lowercaseChars.length;
    }
    if (numbersCheckbox && numbersCheckbox.checked) {
      charSet += numberChars;
      poolSize += numberChars.length;
    }
    if (symbolsCheckbox && symbolsCheckbox.checked) {
      charSet += symbolChars;
      poolSize += symbolChars.length;
    }

    if (charSet === "") {
      if (passwordField) passwordField.value = "Seleccioná al menos un grupo";
      actualizarBarraEntropia(0);
      return;
    }

    let password = "";
    // Uso de CSPRNG para máxima seguridad criptográfica
    if (window.crypto && window.crypto.getRandomValues) {
      const randomValues = new Uint32Array(length);
      window.crypto.getRandomValues(randomValues);
      for (let i = 0; i < length; i++) {
        password += charSet[randomValues[i] % charSet.length];
      }
    } else {
      // Fallback
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charSet.length);
        password += charSet[randomIndex];
      }
    }

    if (passwordField) {
      passwordField.value = password;
    }

    const bits = calcularEntropia(length, poolSize);
    actualizarBarraEntropia(bits);
  }

  if (generateButton) generateButton.addEventListener("click", generatePassword);
  if (regenerateBtn) regenerateBtn.addEventListener("click", () => {
    generatePassword();
    showToast("¡Nueva clave generada!");
  });

  // --- Acción de Copiado ---
  if (copyButton && passwordField) {
    copyButton.addEventListener("click", async () => {
      const text = passwordField.value;
      if (!text || text.startsWith("Seleccioná")) return;

      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(text);
        } else {
          passwordField.select();
          document.execCommand("copy");
        }
        showToast("¡Clave copiada al portapapeles!");
      } catch (err) {
        passwordField.select();
        document.execCommand("copy");
        showToast("¡Clave copiada!");
      }
    });
  }

  // --- Alternancia de Tema Visual ---
  function applyTheme(theme) {
    document.body.className = theme;
    if (themeToggleBtn) {
      themeToggleBtn.innerHTML = theme === "dark" ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
      themeToggleBtn.title = theme === "dark" ? "Cambiar a Modo Claro" : "Cambiar a Modo Oscuro";
    }
    localStorage.setItem("passwordgen_theme", theme);
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener("click", () => {
      const isDark = document.body.classList.contains("dark");
      applyTheme(isDark ? "light" : "dark");
    });
  }

  const savedTheme = localStorage.getItem("passwordgen_theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  applyTheme(savedTheme);

  // Generar clave inicial
  generatePassword();
});

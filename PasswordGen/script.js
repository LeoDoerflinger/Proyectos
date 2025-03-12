document.addEventListener("DOMContentLoaded", () => {
    const lengthInput = document.getElementById("length");
    const uppercaseCheckbox = document.getElementById("uppercase");
    const lowercaseCheckbox = document.getElementById("lowercase");
    const numbersCheckbox = document.getElementById("numbers");
    const symbolsCheckbox = document.getElementById("symbols");
    const generateButton = document.getElementById("generate");
    const passwordField = document.getElementById("password");
    const copyButton = document.getElementById("copy");

    const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
    const numberChars = "0123456789";
    const symbolChars = "!@#$%^&*()_+{}[]<>?";

    function generatePassword() {
        let length = parseInt(lengthInput.value);
        let charSet = "";
        let password = "";

        if (uppercaseCheckbox.checked) charSet += uppercaseChars;
        if (lowercaseCheckbox.checked) charSet += lowercaseChars;
        if (numbersCheckbox.checked) charSet += numberChars;
        if (symbolsCheckbox.checked) charSet += symbolChars;

        if (charSet === "") {
            passwordField.value = "Selecciona al menos una opción";
            return;
        }

        for (let i = 0; i < length; i++) {
            let randomIndex = Math.floor(Math.random() * charSet.length);
            password += charSet[randomIndex];
        }
        passwordField.value = password;
    }

    generateButton.addEventListener("click", generatePassword);

    copyButton.addEventListener("click", () => {
        passwordField.select();
        document.execCommand("copy");
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const themeToggleBtn = document.createElement("button");
    themeToggleBtn.textContent = "Modo Oscuro";
    themeToggleBtn.id = "theme-toggle";
    document.body.appendChild(themeToggleBtn);

    function applyTheme(theme) {
        document.body.className = theme;
        themeToggleBtn.textContent = theme === "dark" ? "Modo Claro" : "Modo Oscuro";
        localStorage.setItem("theme", theme);
    }

    themeToggleBtn.addEventListener("click", () => {
        const newTheme = document.body.classList.contains("dark") ? "light" : "dark";
        applyTheme(newTheme);
    });

    const savedTheme = localStorage.getItem("theme") || "light";
    applyTheme(savedTheme);
});

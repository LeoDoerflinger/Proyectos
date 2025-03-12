document.addEventListener("DOMContentLoaded", () => {
    const amountInput = document.getElementById("amount");
    const fromCurrency = document.getElementById("from");
    const toCurrency = document.getElementById("to");
    const convertButton = document.getElementById("convert");
    const resultDisplay = document.getElementById("result");

    const apiURL = "https://api.exchangerate-api.com/v4/latest/USD";

    let exchangeRates = {};

    fetch(apiURL)
        .then(response => response.json())
        .then(data => {
            exchangeRates = data.rates;
            populateCurrencyOptions(Object.keys(exchangeRates));
        })
        .catch(error => console.error("Error al obtener tasas de cambio", error));

    function populateCurrencyOptions(currencies) {
        currencies.forEach(currency => {
            const option1 = document.createElement("option");
            const option2 = document.createElement("option");
            option1.value = option2.value = currency;
            option1.textContent = option2.textContent = currency;
            fromCurrency.appendChild(option1);
            toCurrency.appendChild(option2);
        });
        fromCurrency.value = "USD";
        toCurrency.value = "EUR";
    }

    convertButton.addEventListener("click", () => {
        const amount = parseFloat(amountInput.value);
        if (isNaN(amount) || amount <= 0) {
            resultDisplay.textContent = "Ingrese un monto válido";
            return;
        }
        const from = fromCurrency.value;
        const to = toCurrency.value;
        const conversionRate = exchangeRates[to] / exchangeRates[from];
        const convertedAmount = (amount * conversionRate).toFixed(2);
        resultDisplay.textContent = `${amount} ${from} = ${convertedAmount} ${to}`;
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

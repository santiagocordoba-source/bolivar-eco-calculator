const translations = {
    es: {
        appTitle: "Bolívar Eco-Calculator",
        formTitle: "Hábitos Semanales",
        lblTransport: "Transporte al Colegio",
        optBus: "Bus escolar / público",
        optCar: "Carro privado",
        optCarpool: "Carro compartido (Carpool)",
        optBike: "Bicicleta / Caminando",
        lblPaper: "Hojas de Papel al día",
        lblRecycle: "Hábitos de Reciclaje",
        optNever: "Nunca",
        optSometimes: "A veces",
        optAlways: "Siempre",
        btnCalculate: "Calcular Impacto",
        resultsTitle: "Impacto Ambiental",
        lblCO2: "Huella de Carbono Estimada",
        lblPoints: "Eco-Points Obtenidos",
        btnPrint: "Imprimir / Reporte PDF"
    },
    en: {
        appTitle: "Bolívar Eco-Calculator",
        formTitle: "Weekly Habits",
        lblTransport: "School Transportation",
        optBus: "School / Public Bus",
        optCar: "Private Car",
        optCarpool: "Carpool",
        optBike: "Bicycle / Walking",
        lblPaper: "Paper sheets used per day",
        lblRecycle: "Recycling Habits",
        optNever: "Never",
        optSometimes: "Sometimes",
        optAlways: "Always",
        btnCalculate: "Calculate Impact",
        resultsTitle: "Environmental Impact",
        lblCO2: "Estimated Carbon Footprint",
        lblPoints: "Eco-Points Earned",
        btnPrint: "Print / PDF Report"
    }
};

function changeLanguage(lang) {
    localStorage.setItem('eco_lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(elem => {
        const key = elem.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            elem.textContent = translations[lang][key];
        }
    });
}

function calculateImpact() {
    const transport = document.getElementById('transport').value;
    const paper = parseFloat(document.getElementById('paper').value) || 0;
    const recycle = document.getElementById('recycle').value;

    let transportCO2 = 0;
    if (transport === 'bus') transportCO2 = 12;
    else if (transport === 'car') transportCO2 = 25;
    else if (transport === 'carpool') transportCO2 = 8;
    else if (transport === 'bike_walk') transportCO2 = 0;

    const paperCO2 = (paper * 5) * 0.005;

    let recycleCO2 = 0;
    if (recycle === 'never') recycleCO2 = 3;
    else if (recycle === 'sometimes') recycleCO2 = 0;
    else if (recycle === 'always') recycleCO2 = -2;

    const totalCO2 = Math.max(0, (transportCO2 + paperCO2 + recycleCO2)).toFixed(2);
    const ecoPoints = Math.max(0, Math.round(100 - totalCO2));

    document.getElementById('co2Result').textContent = totalCO2;
    document.getElementById('pointsResult').textContent = ecoPoints;
}

document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('eco_lang') || 'es';
    document.getElementById('languageSelect').value = savedLang;
    changeLanguage(savedLang);
    lucide.createIcons();
});

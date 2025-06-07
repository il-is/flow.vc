document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("startupForm");
    const steps = document.querySelectorAll(".step");
    const progress = document.querySelector(".progress");
    let currentStep = 1;

    const updateProgress = () => {
        const percent = (currentStep / steps.length) * 100;
        progress.style.width = `${percent}%`;
    };

    const showStep = (step) => {
        steps.forEach((s, i) => {
            s.classList.toggle("hidden", i + 1 !== step);
        });
        document.querySelectorAll(".prev").forEach(btn => btn.classList.toggle("hidden", step === 1));
        updateProgress();
    };

    document.querySelectorAll(".next").forEach(btn => {
        btn.addEventListener("click", () => {
            const currentFields = steps[currentStep - 1].querySelectorAll("[required]");
            let valid = true;
            currentFields.forEach(field => {
                if (!field.value.trim()) {
                    valid = false;
                    field.classList.add("border-red-500");
                } else {
                    field.classList.remove("border-red-500");
                }
            });
            if (valid && currentStep < steps.length) {
                currentStep++;
                showStep(currentStep);
            } else if (!valid) {
                alert("Заполните все обязательные поля.");
            }
        });
    });

    document.querySelectorAll(".prev").forEach(btn => {
        btn.addEventListener("click", () => {
            if (currentStep > 1) {
                currentStep--;
                showStep(currentStep);
            }
        });
    });

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        // Замените на реальный Google Apps Script URL после настройки
        alert("Форма отправлена! Настройте Google Apps Script для обработки.");
    });

    showStep(currentStep);
});
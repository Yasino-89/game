// قوالب الأسئلة
const templates = [
    { subject: "عدد الطلاب", operator: ">", operatorText: "أكبر من" },
    { subject: "عدد الكتب", operator: "<=", operatorText: "أصغر أو يساوي" },
    { subject: "عدد السيارات", operator: "≠", operatorText: "لا يساوي" },
    { subject: "وزن الصندوق", operator: "≥", operatorText: "أكبر أو يساوي" },
    { subject: "عدد الكراسي", operator: "≤", operatorText: "أصغر أو يساوي" },
];

// دالة توليد سؤال عشوائي
function generateRandomQuestion() {
    const template = templates[Math.floor(Math.random() * templates.length)];
    const randomValue = Math.floor(Math.random() * 50) + 1;
    return {
        text: `${template.subject} ${template.operatorText} ${randomValue}`,
        operator: template.operator,
        value: randomValue,
    };
}

let currentQuestion = {};
let score = 0;
let highScore = localStorage.getItem("highScore") || 0;

// تحديث عرض النقاط
function updateScore() {
    document.getElementById("score").textContent = `النقاط: ${score}`;
}

// عرض السؤال على الشاشة
function generateQuestion() {
    currentQuestion = generateRandomQuestion(); // توليد سؤال جديد عشوائي
    const questionElement = document.getElementById("question");
    questionElement.textContent = currentQuestion.text; // عرض نص السؤال
}

// بدء اللعبة
document.getElementById("start-game").addEventListener("click", () => {
    const studentName = document.getElementById("student-name").value.trim() || "ضيف";
    document.getElementById("player-name").textContent = `مرحبًا، ${studentName}!`;
    document.getElementById("start-screen").classList.add("hidden");
    document.getElementById("game-screen").classList.remove("hidden");
    generateQuestion(); // استدعاء السؤال الأول
});

// التعامل مع إرسال الإجابة
document.getElementById("submit").addEventListener("click", () => {
    const variable = document.getElementById("variable").value.trim();
    const number = parseInt(document.getElementById("number").value, 10);

    if (!currentQuestion || isNaN(number)) {
        document.getElementById("feedback").textContent = "يرجى ملء جميع الحقول!";
        return;
    }

    const isCorrect = currentQuestion.operator === "≤"
        ? number <= currentQuestion.value
        : currentQuestion.operator === "≥"
        ? number >= currentQuestion.value
        : eval(`${number} ${currentQuestion.operator} ${currentQuestion.value}`);

    if (isCorrect) {
        score++;
        updateScore();
        document.getElementById("feedback").textContent = "إجابة صحيحة! 🎉";
    } else {
        document.getElementById("feedback").textContent = "إجابة خاطئة!";
    }

    document.getElementById("next-question").classList.remove("hidden");
    document.getElementById("submit").classList.add("hidden");
});

// السؤال التالي
document.getElementById("next-question").addEventListener("click", () => {
    document.getElementById("next-question").classList.add("hidden");
    document.getElementById("submit").classList.remove("hidden");
    generateQuestion(); // عرض سؤال جديد
});

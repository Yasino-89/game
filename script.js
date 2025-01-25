const templates = [
    { subject: "عدد الطلاب", operator: ">", operatorText: "أكبر من" },
    { subject: "عدد الكتب", operator: "<=", operatorText: "أصغر أو يساوي" },
    { subject: "عدد السيارات", operator: "≠", operatorText: "لا يساوي" },
    { subject: "وزن الصندوق", operator: "≥", operatorText: "أكبر أو يساوي" },
    { subject: "عدد الكراسي", operator: "≤", operatorText: "أصغر أو يساوي" },
];

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
let correctAnswers = 0;
let wrongAnswers = 0;

document.getElementById("high-score").textContent = `أعلى النقاط: ${highScore}`;

function updateScore() {
    const scoreElement = document.getElementById("score");
    scoreElement.textContent = `النقاط: ${score}`;
}

function showResults() {
    const feedback = document.getElementById("feedback");
    feedback.innerHTML = `
        <p>إجابات صحيحة: ${correctAnswers}</p>
        <p>إجابات خاطئة: ${wrongAnswers}</p>
    `;
}

// الكود المحدث يتابع بجلب النتائج وإضافة تحسينات. أكمل ذلك بناءً على التفاصيل. 😊

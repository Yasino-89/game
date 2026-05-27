/* ============================================================
   عيديات فنوميدو — منطق التطبيق
   ============================================================ */

// ===== بيانات العائلة (مع التوجيه السري للمبالغ) =====
const MEMBERS = {
    fanu: {
        name: 'فنو',
        emoji: '👑',
        greeting: 'يا حبيبة قلبي',
        // 500 إلى 1000 عشوائي
        drawAmount: () => 500 + Math.floor(Math.random() * 501),
        message: 'لأنك تستاهلي كل شي حلو 💛'
    },
    alma: {
        name: 'ألما',
        emoji: '🌸',
        greeting: 'يا أميرة بابا',
        // مئة بالضبط
        drawAmount: () => 100,
        message: 'صحة وسعادة يا قلبي 🌷'
    },
    aws: {
        name: 'أوس',
        emoji: '🦁',
        greeting: 'يا فارس بابا',
        // مئة بالضبط
        drawAmount: () => 100,
        message: 'كبير وقوي يا بطل ⚔️'
    }
};

// ===== الألوان المتاحة =====
const COLORS = [
    { name: 'الأحمر',     hex: '#dc2626', textOn: '#fff' },
    { name: 'الأزرق',     hex: '#2563eb', textOn: '#fff' },
    { name: 'الأخضر',     hex: '#16a34a', textOn: '#fff' },
    { name: 'الأصفر',     hex: '#f5d63a', textOn: '#000' },
    { name: 'البنفسجي',   hex: '#9333ea', textOn: '#fff' },
    { name: 'الزهري',     hex: '#ec4899', textOn: '#fff' },
    { name: 'البرتقالي',  hex: '#ea580c', textOn: '#fff' },
    { name: 'الفيروزي',   hex: '#06b6d4', textOn: '#fff' },
    { name: 'الذهبي',     hex: '#d4a017', textOn: '#000' },
    { name: 'الأسود',     hex: '#1f2937', textOn: '#fff' },
    { name: 'الأبيض',     hex: '#f8fafc', textOn: '#000' },
    { name: 'الفضي',      hex: '#94a3b8', textOn: '#000' }
];

// ===== توليد النجوم في الخلفية =====
function createStars() {
    const wrap = document.getElementById('stars');
    const n = 60;
    let html = '';
    for (let i = 0; i < n; i++) {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const d = 2 + Math.random() * 4;
        const delay = Math.random() * 3;
        html += `<span class="star" style="left:${x}%;top:${y}%;--dur:${d}s;--delay:-${delay}s"></span>`;
    }
    wrap.innerHTML = html;
}
createStars();

// ===== كانفاس الكونفيتي =====
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
let particles = [];
let confettiRunning = false;

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

function spawnConfetti(count = 80, palette = null) {
    const colors = palette || ['#e0b34a', '#fce8a4', '#1e7a5a', '#d97373', '#fff8e7'];
    for (let i = 0; i < count; i++) {
        particles.push({
            x: canvas.width / 2 + (Math.random() - 0.5) * 200,
            y: canvas.height / 2 + (Math.random() - 0.5) * 100,
            vx: (Math.random() - 0.5) * 12,
            vy: -Math.random() * 14 - 6,
            g: 0.35,
            size: 6 + Math.random() * 8,
            color: colors[Math.floor(Math.random() * colors.length)],
            rot: Math.random() * Math.PI * 2,
            vr: (Math.random() - 0.5) * 0.3,
            life: 200 + Math.random() * 100,
            shape: Math.random() > 0.5 ? 'rect' : 'circle'
        });
    }
    if (!confettiRunning) {
        confettiRunning = true;
        animateConfetti();
    }
}

function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles = particles.filter(p => p.life > 0 && p.y < canvas.height + 60);
    for (const p of particles) {
        p.vy += p.g;
        p.x += p.vx;
        p.y += p.vy;
        p.rot += p.vr;
        p.life--;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        if (p.shape === 'rect') {
            ctx.fillRect(-p.size / 2, -p.size / 4, p.size, p.size / 2);
        } else {
            ctx.beginPath();
            ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.restore();
    }
    if (particles.length > 0) {
        requestAnimationFrame(animateConfetti);
    } else {
        confettiRunning = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
}

// ===== صوت بسيط بـ Web Audio =====
let audioCtx = null;
function tone(freq, duration = 0.1, type = 'sine', vol = 0.15) {
    try {
        if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = type;
        osc.frequency.value = freq;
        gain.gain.value = vol;
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
        osc.connect(gain).connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) { /* تجاهل */ }
}
function tickSound() { tone(420 + Math.random() * 120, 0.04, 'square', 0.06); }
function chime() {
    [523, 659, 784, 1047].forEach((f, i) => setTimeout(() => tone(f, 0.25, 'triangle', 0.18), i * 90));
}
function fanfare() {
    [523, 659, 784, 988, 1047].forEach((f, i) => setTimeout(() => tone(f, 0.3, 'sine', 0.2), i * 110));
}

// ===== بناء عجلة الألوان (SVG) =====
function buildColorWheel() {
    const wheel = document.getElementById('colorWheel');
    const n = COLORS.length;
    const sliceDeg = 360 / n;
    let gradient = 'conic-gradient(';
    const parts = [];
    COLORS.forEach((c, i) => {
        const start = i * sliceDeg;
        const end = (i + 1) * sliceDeg;
        parts.push(`${c.hex} ${start}deg ${end}deg`);
    });
    gradient += parts.join(', ') + ')';
    wheel.style.background = gradient;
}
buildColorWheel();

// ===== إدارة النافذة المنبثقة =====
const modal = document.getElementById('modal');
const modalCard = document.getElementById('modalCard');
const closeBtn = document.getElementById('closeBtn');
const restartBtn = document.getElementById('restartBtn');
const giftBox = document.getElementById('giftBox');

const stages = {
    gift:   document.getElementById('stage-gift'),
    amount: document.getElementById('stage-amount'),
    color:  document.getElementById('stage-color'),
    final:  document.getElementById('stage-final')
};

function showStage(name) {
    Object.values(stages).forEach(s => s.classList.add('hidden'));
    stages[name].classList.remove('hidden');
}

function resetModal() {
    showStage('gift');
    giftBox.classList.remove('opening');
    document.getElementById('amountNumber').textContent = '0';
    document.getElementById('amountMsg').classList.remove('show');
    document.getElementById('colorResult').classList.add('hidden');
    const wheel = document.getElementById('colorWheel');
    wheel.style.transition = 'none';
    wheel.style.transform = 'rotate(0deg)';
    // إعادة تفعيل الانتقال بعد الإطار التالي
    requestAnimationFrame(() => {
        wheel.style.transition = '';
    });
}

function openModal(memberKey) {
    const m = MEMBERS[memberKey];
    document.querySelector('#welcomeText span').textContent = `${m.greeting} ${m.name}`;
    resetModal();
    modal.classList.add('open');
    modal.dataset.member = memberKey;
}

function closeModal() {
    modal.classList.remove('open');
    particles = []; // إيقاف الكونفيتي
}

closeBtn.addEventListener('click', closeModal);
restartBtn.addEventListener('click', closeModal);
modal.querySelector('.modal-bg').addEventListener('click', closeModal);
document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
});

// ===== ربط بطاقات العائلة =====
document.querySelectorAll('.card').forEach(card => {
    card.querySelector('.draw-btn').addEventListener('click', () => {
        openModal(card.dataset.member);
        chime();
    });
});

// ===== فتح صندوق الهدية =====
giftBox.addEventListener('click', () => {
    if (giftBox.classList.contains('opening')) return;
    giftBox.classList.add('opening');
    chime();
    spawnConfetti(40, ['#e0b34a', '#fce8a4', '#fff']);
    setTimeout(() => startAmountReveal(), 900);
});

// ===== المرحلة 2: كشف المبلغ =====
function startAmountReveal() {
    showStage('amount');
    const memberKey = modal.dataset.member;
    const member = MEMBERS[memberKey];
    const finalAmount = member.drawAmount();

    const numberEl = document.getElementById('amountNumber');
    const msgEl = document.getElementById('amountMsg');

    // عداد سريع يبدو عشوائياً ثم يستقر على القيمة الحقيقية
    const totalDuration = 2400;
    const start = performance.now();
    let lastTick = 0;

    function frame(now) {
        const elapsed = now - start;
        const t = Math.min(elapsed / totalDuration, 1);
        // منحنى تباطؤ: سريع في البداية ثم يبطئ
        const eased = 1 - Math.pow(1 - t, 3);

        if (t < 1) {
            // أرقام عشوائية ضمن مدى 10-1000 تعطي إحساس بسحب حقيقي
            const fake = 10 + Math.floor(Math.random() * 990);
            numberEl.textContent = fake;
            // تسريع الـ tick في البداية ثم تبطيئه
            const tickInterval = 30 + eased * 180;
            if (now - lastTick > tickInterval) {
                tickSound();
                lastTick = now;
            }
            requestAnimationFrame(frame);
        } else {
            // الاستقرار على الرقم الحقيقي
            numberEl.textContent = finalAmount;
            tone(880, 0.4, 'triangle', 0.25);
            spawnConfetti(60);
            msgEl.textContent = member.message;
            msgEl.classList.add('show');

            // ننتقل لمرحلة الألوان بعد لحظات
            setTimeout(() => startColorReveal(finalAmount), 2200);
        }
    }
    requestAnimationFrame(frame);
}

// ===== المرحلة 3: عجلة الألوان =====
function startColorReveal(amount) {
    showStage('color');

    const wheel = document.getElementById('colorWheel');
    const colorIndex = Math.floor(Math.random() * COLORS.length);
    const chosen = COLORS[colorIndex];

    const sliceDeg = 360 / COLORS.length;
    // الزاوية المطلوبة بحيث يستقر المؤشر العلوي على شريحة اللون
    // المؤشر في الأعلى (0°). نريد منتصف الشريحة المختارة عند 0°
    const targetSliceCenter = colorIndex * sliceDeg + sliceDeg / 2;
    const fullSpins = 5;
    const finalRotation = fullSpins * 360 - targetSliceCenter;

    // إعادة الضبط ثم التدوير
    wheel.style.transition = 'none';
    wheel.style.transform = 'rotate(0deg)';
    requestAnimationFrame(() => {
        wheel.style.transition = 'transform 4s cubic-bezier(0.17, 0.67, 0.16, 1)';
        wheel.style.transform = `rotate(${finalRotation}deg)`;
    });

    // أصوات tick أثناء دوران العجلة
    let ticks = 0;
    const tickTimer = setInterval(() => {
        tickSound();
        ticks++;
        if (ticks > 22) clearInterval(tickTimer);
    }, 180);

    // كشف اللون بعد انتهاء الدوران
    setTimeout(() => {
        clearInterval(tickTimer);
        const result = document.getElementById('colorResult');
        const swatch = document.getElementById('colorSwatch');
        const nameEl = document.getElementById('colorName');
        swatch.style.background = chosen.hex;
        swatch.style.setProperty('--swatch-glow', chosen.hex);
        nameEl.textContent = chosen.name;
        result.classList.remove('hidden');
        fanfare();
        spawnConfetti(80, [chosen.hex, '#e0b34a', '#fce8a4', '#fff8e7']);

        setTimeout(() => showFinal(amount, chosen), 1800);
    }, 4100);
}

// ===== المرحلة 4: النهاية والتحدي =====
function showFinal(amount, color) {
    showStage('final');
    document.getElementById('finalAmount').textContent = `${amount} شيكل`;
    const finalColorEl = document.getElementById('finalColor');
    finalColorEl.textContent = color.name;
    finalColorEl.style.setProperty('--final-color', color.hex);
    document.getElementById('finalColorText').textContent = color.name;

    // كونفيتي احتفالي ضخم
    spawnConfetti(150, [color.hex, '#e0b34a', '#fce8a4', '#fff8e7', '#1e7a5a']);
    setTimeout(() => spawnConfetti(80, [color.hex, '#e0b34a']), 400);
    fanfare();
}

// --- 1. Icons Initialization ---
lucide.createIcons();

// --- 2. Snowfall Engine ---
const canvas = document.getElementById('snow-canvas');
const ctx = canvas.getContext('2d');

let width, height;
let particles = [];

function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
}

window.addEventListener('resize', resize);
resize();

class Particle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * width;
        this.y = Math.random() * height - height; // Start above screen
        this.speed = Math.random() * 1 + 0.5;
        this.radius = Math.random() * 2 + 0.5;
        this.opacity = Math.random() * 0.5 + 0.3;
        this.drift = Math.random() * 1 - 0.5;
    }

    update() {
        this.y += this.speed;
        this.x += this.drift;

        if (this.y > height) {
            this.reset();
            this.y = -10; // Reset to just above
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
    }
}

// Create particles
for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
    // Randomize initial positions so they don't all start at top
    particles[i].y = Math.random() * height; 
}

function animateSnow() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateSnow);
}
animateSnow();

// --- 3. Intro Interaction ---
function startExperience() {
    const overlay = document.getElementById('intro-overlay');
    const mainContent = document.getElementById('main-content');
    
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
        mainContent.style.opacity = '1';
    }, 1000);
}

// --- 4. Intersection Observer for Scroll Animations ---
const observerOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            // Optional: stop observing once revealed
            // observer.unobserve(entry.target); 
        }
    });
}, observerOptions);

document.querySelectorAll('.reveal-on-scroll').forEach(el => {
    observer.observe(el);
});

// --- 5. Hidden Surprise Logic ---
function revealSurprise(btn) {
    const text = document.getElementById('hidden-surprise-text');
    btn.style.transform = 'scale(0.9)';
    setTimeout(() => {
        btn.style.display = 'none';
        text.classList.remove('hidden');
        text.classList.add('animate-pop-in'); // Trigger Pop Animation
    }, 200);
}

// --- 6. Add simple Keyframe for fade-in in CSS dynamically ---
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    @keyframes fadeIn {
        to { opacity: 1; }
    }
`;
document.head.appendChild(styleSheet);

// --- 7. Scroll to Top Logic ---
const scrollBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        scrollBtn.classList.remove('opacity-0', 'translate-y-10', 'pointer-events-none');
    } else {
        scrollBtn.classList.add('opacity-0', 'translate-y-10', 'pointer-events-none');
    }
});

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

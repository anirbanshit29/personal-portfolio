// Smooth scroll for nav links
document.querySelectorAll('a[data-scroll]').forEach(a => {
    a.addEventListener('click', (e) => {
        e.preventDefault();
        const id = a.getAttribute('href');
        document.querySelector(id).scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (window.innerWidth < 900) closeMobileNav();
    });
});

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
navToggle && navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-show');
});
function closeMobileNav() { navLinks.classList.remove('mobile-show'); }

// Intersection observer to reveal sections and animate skill bars
const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // animate any .fill bars inside
            entry.target.querySelectorAll('.fill').forEach(f => {
                const w = f.style.width || '0%';
                // force reflow then set width (already set in HTML). This triggers CSS transition.
                f.style.width = '0%';
                setTimeout(() => f.style.width = w, 50);
            })
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.section-fade, .card-project, .hero-card').forEach(el => io.observe(el));

// Contact form (static)
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thanks! Message captured locally. Connect a real form backend (Formspree, Netlify Forms, etc.) to receive emails.');
        contactForm.reset();
    });
}

// theme toggle (light/dark)
const themeToggle = document.getElementById('themeToggle');
themeToggle && themeToggle.addEventListener('click', () => {
    if (document.documentElement.style.getPropertyValue('--bg') === '#fff') {
        // switch to dark
        document.documentElement.style.setProperty('--bg', '#071023');
        document.documentElement.style.setProperty('--panel', '#0b1220');
        themeToggle.textContent = '🌙';
    } else {
        // to light
        document.documentElement.style.setProperty('--bg', '#ffffff');
        document.documentElement.style.setProperty('--panel', '#f7fafc');
        themeToggle.textContent = '☀';
    }
});

// fill year
document.getElementById('year').textContent = new Date().getFullYear();
// prefill email subject
const emailLink = document.getElementById('emailLink'); 
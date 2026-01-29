// Viraltech Custom JavaScript

// AI Demo Widget
function handleAIDemo() {
    const input = document.getElementById('aiPrompt');
    const result = document.getElementById('aiResult');
    const prompt = input.value.trim();

    if (!prompt) {
        alert('Please enter a prompt');
        return;
    }

    result.classList.add('show');
    result.innerHTML = '<div class="skeleton-loader"></div>Generating response...';

    // Simulate AI response
    setTimeout(() => {
        result.innerHTML = `
            <strong>AI Response:</strong><br>
            Based on your prompt "${prompt}", here's a generated solution using our AI models. 
            This demonstrates real-time AI processing capabilities.
        `;
    }, 1500);
}

// Testimonial Video Player
function playTestimonialVideo(id) {
    // In production, this would open a video modal or play embedded video
    alert('Video testimonial ' + id + ' would play here. In production, integrate with a video player.');
}

// Portfolio Filter
document.addEventListener('DOMContentLoaded', function () {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.filter-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                if (filterValue === '*' || item.classList.contains(filterValue.substring(1))) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});

// Stats Counter Animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                if (target % 1 !== 0) {
                    counter.textContent = target.toFixed(1);
                } else {
                    counter.textContent = Math.floor(target);
                }
            }
        };

        // Start animation when element is in viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    updateCounter();
                    observer.unobserve(entry.target);
                }
            });
        });

        observer.observe(counter);
    });
}

// 3D Tilt Effect for Cards
function initTiltEffect() {
    const tiltElements = document.querySelectorAll('[data-tilt]');

    tiltElements.forEach(element => {
        element.addEventListener('mousemove', function (e) {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        element.addEventListener('mouseleave', function () {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });
}

// Magnetic Button Effect
function initMagneticButtons() {
    const magneticButtons = document.querySelectorAll('.gsap-magnetic');

    magneticButtons.forEach(button => {
        button.addEventListener('mousemove', function (e) {
            const rect = button.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });

        button.addEventListener('mouseleave', function () {
            button.style.transform = 'translate(0, 0)';
        });
    });
}

// Parallax Effect
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;

        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Initialize all effects
document.addEventListener('DOMContentLoaded', function () {
    animateCounters();
    initTiltEffect();
    initMagneticButtons();
    initParallax();

    // Add enter key support for AI demo
    const aiPromptInput = document.getElementById('aiPrompt');
    if (aiPromptInput) {
        aiPromptInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                handleAIDemo();
            }
        });
    }

    // Initialize Premium About Section GSAP Animations
    initPremiumAboutAnimations();
});

// Premium About Section GSAP Animations
function initPremiumAboutAnimations() {
    // Check if GSAP and ScrollTrigger are available
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
        console.warn('GSAP or ScrollTrigger not loaded');
        return;
    }

    // Register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    // Fade Up Animations
    const fadeUpElements = document.querySelectorAll('.about-section-premium .gsap-fade-up');
    fadeUpElements.forEach((el, index) => {
        gsap.fromTo(el,
            {
                opacity: 0,
                y: 60
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                delay: index * 0.1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Fade Left Animation (for visual side)
    const fadeLeftElements = document.querySelectorAll('.about-section-premium .gsap-fade-left');
    fadeLeftElements.forEach((el) => {
        gsap.fromTo(el,
            {
                opacity: 0,
                x: 80
            },
            {
                opacity: 1,
                x: 0,
                duration: 1,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Scale Up Animations (for stat cards)
    const scaleUpElements = document.querySelectorAll('.about-section-premium .gsap-scale-up');
    scaleUpElements.forEach((el, index) => {
        const delay = parseFloat(el.dataset.delay) || index * 0.1;
        gsap.fromTo(el,
            {
                opacity: 0,
                scale: 0.8,
                y: 30
            },
            {
                opacity: 1,
                scale: 1,
                y: 0,
                duration: 0.6,
                delay: delay,
                ease: 'back.out(1.2)',
                scrollTrigger: {
                    trigger: '.stats-grid',
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

    // Animated Counter for Stats
    const statNumbers = document.querySelectorAll('.about-section-premium .stat-number');
    statNumbers.forEach((counter) => {
        const target = parseFloat(counter.getAttribute('data-count'));

        ScrollTrigger.create({
            trigger: counter,
            start: 'top 85%',
            onEnter: () => {
                gsap.to(counter, {
                    innerHTML: target,
                    duration: 2,
                    ease: 'power2.out',
                    snap: { innerHTML: 1 },
                    onUpdate: function () {
                        counter.textContent = Math.floor(counter.innerHTML);
                    }
                });
            },
            once: true
        });
    });

    // Floating Particles Enhanced Animation
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        gsap.to(particle, {
            x: 'random(-50, 50)',
            y: 'random(-50, 50)',
            duration: 'random(3, 6)',
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: index * 0.5
        });
    });

    // Gradient Orbs Parallax Effect
    const orbs = document.querySelectorAll('.gradient-orb');
    orbs.forEach((orb, index) => {
        gsap.to(orb, {
            scrollTrigger: {
                trigger: '.about-section-premium',
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1
            },
            y: index % 2 === 0 ? -100 : 100,
            x: index % 2 === 0 ? -50 : 50
        });
    });
}

// ==========================================
// Stats Premium Section - Three.js Particles
// ==========================================
function initStatsParticles() {
    const canvas = document.getElementById('stats-particles-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const section = document.querySelector('.stats-premium-section');

    let width, height;
    let particles = [];
    let mouseX = 0;
    let mouseY = 0;
    let animationId;

    // Particle class
    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * width;
            this.y = Math.random() * height;
            this.size = Math.random() * 3 + 1;
            this.speedX = (Math.random() - 0.5) * 0.5;
            this.speedY = (Math.random() - 0.5) * 0.5;
            this.opacity = Math.random() * 0.5 + 0.2;

            // Color variations - for light background
            const colors = [
                'rgba(10, 143, 108, ',   // Green
                'rgba(76, 131, 255, ',   // Blue
                'rgba(100, 100, 100, ',  // Gray
                'rgba(50, 50, 50, '      // Dark gray
            ];
            this.baseColor = colors[Math.floor(Math.random() * colors.length)];
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            // Mouse interaction
            const dx = mouseX - this.x;
            const dy = mouseY - this.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 150) {
                const force = (150 - distance) / 150;
                this.x -= (dx / distance) * force * 0.5;
                this.y -= (dy / distance) * force * 0.5;
            }

            // Boundary wrap
            if (this.x < 0) this.x = width;
            if (this.x > width) this.x = 0;
            if (this.y < 0) this.y = height;
            if (this.y > height) this.y = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.baseColor + this.opacity + ')';
            ctx.fill();

            // Glow effect
            ctx.shadowBlur = 15;
            ctx.shadowColor = this.baseColor + '0.5)';
        }
    }

    // Resize handler
    function resize() {
        const rect = section.getBoundingClientRect();
        width = rect.width;
        height = rect.height;
        canvas.width = width;
        canvas.height = height;
    }

    // Initialize particles
    function initParticles() {
        particles = [];
        const particleCount = Math.min(80, Math.floor((width * height) / 15000));
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }

    // Draw connection lines
    function drawConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) {
                    const opacity = (1 - distance / 120) * 0.15;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(10, 143, 108, ${opacity})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    // Animation loop
    function animate() {
        ctx.clearRect(0, 0, width, height);

        // Draw connections first
        drawConnections();

        // Update and draw particles
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });

        animationId = requestAnimationFrame(animate);
    }

    // Mouse move handler
    section.addEventListener('mousemove', (e) => {
        const rect = section.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;
    });

    // Initialize
    resize();
    initParticles();
    animate();

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
        resize();
        initParticles();
    });
    resizeObserver.observe(section);

    // Cleanup when section is out of view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!animationId) animate();
            } else {
                cancelAnimationFrame(animationId);
                animationId = null;
            }
        });
    });
    observer.observe(section);
}

// Stats Premium Section GSAP Animations
function initStatsPremiumAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const section = document.querySelector('.stats-premium-section');
    if (!section) return;

    // Fade up animations
    gsap.utils.toArray('.stats-premium-section .gsap-fade-up').forEach((elem, i) => {
        gsap.from(elem, {
            scrollTrigger: {
                trigger: elem,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            y: 60,
            opacity: 0,
            duration: 1,
            delay: i * 0.15,
            ease: 'power3.out'
        });
    });

    // Scale up animations for stat cards
    gsap.utils.toArray('.stat-premium-card').forEach((card) => {
        const delay = parseFloat(card.getAttribute('data-delay')) || 0;
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                toggleActions: 'play none none none'
            },
            scale: 0.8,
            opacity: 0,
            duration: 0.8,
            delay: delay,
            ease: 'back.out(1.7)'
        });
    });

    // Counter animations for premium stats
    gsap.utils.toArray('.stat-premium-number').forEach(counter => {
        const target = parseFloat(counter.getAttribute('data-count'));
        const isDecimal = target % 1 !== 0;

        ScrollTrigger.create({
            trigger: counter,
            start: 'top 85%',
            onEnter: () => {
                gsap.to(counter, {
                    innerHTML: target,
                    duration: 2,
                    ease: 'power2.out',
                    snap: isDecimal ? { innerHTML: 0.1 } : { innerHTML: 1 },
                    onUpdate: function () {
                        if (isDecimal) {
                            counter.textContent = parseFloat(counter.innerHTML).toFixed(1);
                        } else {
                            counter.textContent = Math.floor(counter.innerHTML);
                        }
                    }
                });
            },
            once: true
        });
    });

    // Progress bar animations
    gsap.utils.toArray('.stat-progress-fill').forEach(bar => {
        const targetWidth = bar.style.width;
        bar.style.width = '0%';

        ScrollTrigger.create({
            trigger: bar,
            start: 'top 90%',
            onEnter: () => {
                gsap.to(bar, {
                    width: targetWidth,
                    duration: 1.5,
                    ease: 'power2.out',
                    delay: 0.5
                });
            },
            once: true
        });
    });
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function () {
    initStatsParticles();
    initStatsPremiumAnimations();
});

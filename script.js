// DOM Elements
const header = document.querySelector('.header');
const navLinks = document.querySelectorAll('.nav-link');
const themeToggle = document.getElementById('themeToggle');
const backToTop = document.getElementById('backToTop');
const dynamicGreeting = document.getElementById('dynamicGreeting');
const sortByGPA = document.getElementById('sortByGPA');
const educationTableBody = document.getElementById('educationTableBody');
const skillFilters = document.querySelectorAll('.skill-filter');
const skillItems = document.querySelectorAll('.skill-item');
const skillProgresses = document.querySelectorAll('.skill-progress');
const projectFilters = document.querySelectorAll('.project-filter');
const projectCards = document.querySelectorAll('.project-card');
const interestItems = document.querySelectorAll('.interest-item');
const modal = document.getElementById('interestModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalClose = document.querySelector('.modal-close');
const tooltip = document.getElementById('tooltip');
const tooltipTriggers = document.querySelectorAll('.tooltip-trigger');
const jobEntries = document.querySelectorAll('.job-entry');

// Greeting messages
const greetings = [
    "Welcome to my digital portfolio! 👋",
    "Hello! Thanks for visiting my resume site! ✨",
    "Greetings! Explore my professional journey! 🚀"
];


const interestDetails = {
    photography: {
        title: "Photography",
        description: "Interested in photography, with a creative eye for detail and composition."
    },
    cricket: {
        title: "cricket",
        description: "Passionate about playing cricket, developing teamwork, leadership, and strategic thinking skills."
    },
    music: {
        title: "Listening Music",
        description: "Enjoy exploring different genres of music, which helps improve creativity and focus."
    }
};


document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    displayDynamicGreeting();
    setupScrollEffects();
    setupNavigationHighlighting();
    setupEducationSorting();
    setupSkillFiltering();
    setupProjectFiltering();
    setupModalFunctionality();
    setupTooltips();
    animateProgressBars();
    animateJobEntries();
    setupSmoothScrolling();
});


function initializeTheme() {
    const savedTheme = localStorage.getItem('resume-theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('resume-theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}


function displayDynamicGreeting() {
    const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
    dynamicGreeting.textContent = randomGreeting;
    dynamicGreeting.classList.add('fade-in');
}

function setupScrollEffects() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', throttle(() => {
        const scrollY = window.scrollY;
        
        if (scrollY > 120) {
            header.classList.add('scrolled');
        } else if (scrollY < 80) {
            header.classList.remove('scrolled');
        }
        
      
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        
        
        animateOnScroll();
        
        lastScrollY = scrollY;
    }, 16));
    
   
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}


function setupNavigationHighlighting() {
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const targetId = entry.target.id;
                
               
                navLinks.forEach(link => link.classList.remove('active'));
                
               
                const activeLink = document.querySelector(`[href="#${targetId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-100px 0px -50% 0px'
    });
    
    sections.forEach(section => observer.observe(section));
}


function setupSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
           
            navLinks.forEach(navLink => navLink.classList.remove('active'));
            link.classList.add('active');
            
            if (targetSection) {
                const headerHeight = header.offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}


function setupEducationSorting() {
    let sortedByGPA = false;
    
    sortByGPA.addEventListener('click', () => {
        const rows = Array.from(educationTableBody.querySelectorAll('tr'));
        
        if (!sortedByGPA) {
            
            rows.sort((a, b) => {
                const gpaA = parseFloat(a.querySelector('[data-gpa]').getAttribute('data-gpa'));
                const gpaB = parseFloat(b.querySelector('[data-gpa]').getAttribute('data-gpa'));
                return gpaB - gpaA;
            });
            sortByGPA.textContent = 'Sort by Date';
            sortedByGPA = true;
        } else {
           
            rows.reverse();
            sortByGPA.textContent = 'Sort by GPA';
            sortedByGPA = false;
        }
        
        
        educationTableBody.innerHTML = '';
        rows.forEach(row => educationTableBody.appendChild(row));
        
       
        educationTableBody.style.opacity = '0';
        setTimeout(() => {
            educationTableBody.style.opacity = '1';
        }, 150);
    });
}


function setupSkillFiltering() {
    skillFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            const level = filter.getAttribute('data-level');
            
            skillFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            
           
            skillItems.forEach(skill => {
                const skillLevel = skill.getAttribute('data-level');
                
                if (level === 'all' || skillLevel === level) {
                    skill.classList.remove('hidden');
                    skill.style.display = 'flex';
                } else {
                    skill.classList.add('hidden');
                    skill.style.display = 'none';
                }
            });
        });
    });
}


function setupProjectFiltering() {
    projectFilters.forEach(filter => {
        filter.addEventListener('click', () => {
            const tech = filter.getAttribute('data-tech');
            
           
            projectFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');
            

            projectCards.forEach(card => {
                const cardTech = card.getAttribute('data-tech');
                
                if (tech === 'all' || cardTech.includes(tech)) {
                    card.classList.remove('hidden');
                    card.style.display = 'block';
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none';
                }
            });
        });
    });
}


function setupModalFunctionality() {
    interestItems.forEach(item => {
        item.addEventListener('click', () => {
            const interest = item.getAttribute('data-interest');
            const details = interestDetails[interest];
            
            if (details) {
                modalTitle.textContent = details.title;
                modalDescription.textContent = details.description;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
    });
    

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
}


function setupTooltips() {
    tooltipTriggers.forEach(trigger => {
        trigger.addEventListener('mouseenter', (e) => {
            const text = e.target.getAttribute('data-tooltip');
            if (text) {
                showTooltip(e, text);
            }
        });
        
        trigger.addEventListener('mouseleave', hideTooltip);
        trigger.addEventListener('mousemove', (e) => {
            updateTooltipPosition(e);
        });
    });
}

function showTooltip(e, text) {
    tooltip.textContent = text;
    tooltip.classList.add('visible');
    updateTooltipPosition(e);
}

function hideTooltip() {
    tooltip.classList.remove('visible');
}

function updateTooltipPosition(e) {
    const rect = tooltip.getBoundingClientRect();
    const x = e.clientX - rect.width / 2;
    const y = e.clientY - rect.height - 10;
    
    tooltip.style.left = Math.max(10, Math.min(x, window.innerWidth - rect.width - 10)) + 'px';
    tooltip.style.top = Math.max(10, y) + 'px';
}


function animateProgressBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progress = entry.target;
                const value = progress.getAttribute('data-value');
                
               
                let currentValue = 0;
                const increment = value / 50; 
                
                const timer = setInterval(() => {
                    currentValue += increment;
                    if (currentValue >= value) {
                        currentValue = value;
                        clearInterval(timer);
                    }
                    progress.value = currentValue;
                }, 40);
                
                progress.classList.add('progress-animate');
                observer.unobserve(progress);
            }
        });
    }, { threshold: 0.5 });
    
    skillProgresses.forEach(progress => observer.observe(progress));
}


function animateJobEntries() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate');
                }, 200);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    jobEntries.forEach(entry => observer.observe(entry));
}

function animateOnScroll() {
    jobEntries.forEach(entry => {
        const rect = entry.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (isVisible && !entry.classList.contains('animate')) {
            entry.classList.add('animate');
        }
    });
}


function throttle(func, delay) {
    let timeoutId;
    let lastExecTime = 0;
    
    return function (...args) {
        const currentTime = Date.now();
        
        if (currentTime - lastExecTime > delay) {
            func.apply(this, args);
            lastExecTime = currentTime;
        } else {
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                func.apply(this, args);
                lastExecTime = Date.now();
            }, delay - (currentTime - lastExecTime));
        }
    };
}


document.addEventListener('DOMContentLoaded', function() {
    
    const emphasisSpans = document.querySelectorAll('.emphasis');
    emphasisSpans.forEach(span => {
        span.addEventListener('mouseenter', () => {
            span.style.transform = 'scale(1.05)';
        });
        
        span.addEventListener('mouseleave', () => {
            span.style.transform = 'scale(1)';
        });
    });
    
    
    function typeWriter(element, text, speed = 50) {
        element.textContent = '';
        let i = 0;
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    
    setTimeout(() => {
        const greeting = document.getElementById('dynamicGreeting');
        if (greeting && greeting.textContent) {
            const text = greeting.textContent;
            typeWriter(greeting, text, 30);
        }
    }, 500);
    
  
    themeToggle.addEventListener('click', () => {
        createParticles(themeToggle);
    });
    
    function createParticles(element) {
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = 'currentColor';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            
            const rect = element.getBoundingClientRect();
            particle.style.left = (rect.left + rect.width / 2) + 'px';
            particle.style.top = (rect.top + rect.height / 2) + 'px';
            
            document.body.appendChild(particle);
            
            const angle = (i / 6) * Math.PI * 2;
            const velocity = 50;
            const vx = Math.cos(angle) * velocity;
            const vy = Math.sin(angle) * velocity;
            
            let x = 0, y = 0, opacity = 1;
            
            function animateParticle() {
                x += vx * 0.02;
                y += vy * 0.02;
                opacity -= 0.02;
                
                particle.style.transform = `translate(${x}px, ${y}px)`;
                particle.style.opacity = opacity;
                
                if (opacity > 0) {
                    requestAnimationFrame(animateParticle);
                } else {
                    document.body.removeChild(particle);
                }
            }
            
            requestAnimationFrame(animateParticle);
        }
    }
    
    
    if ('performance' in window) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                const perfData = performance.getEntriesByType('navigation')[0];
                if (perfData) {
                    console.log(`Page loaded in ${Math.round(perfData.loadEventEnd - perfData.fetchStart)}ms`);
                }
            }, 1000);
        });
    }
    
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });
    
    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
});

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        
    });
}
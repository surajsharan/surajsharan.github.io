// Particles.js Configuration
particlesJS('particles-js', {
    particles: {
        number: {
            value: 80,
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: '#00ff9d'
        },
        shape: {
            type: 'circle'
        },
        opacity: {
            value: 0.5,
            random: false
        },
        size: {
            value: 3,
            random: true
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: '#00ff9d',
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false
        }
    },
    interactivity: {
        detect_on: 'canvas',
        events: {
            onhover: {
                enable: true,
                mode: 'repulse'
            },
            onclick: {
                enable: true,
                mode: 'push'
            },
            resize: true
        }
    },
    retina_detect: true
});

// Experience Data
const experiences = [
    {
        title: 'AI Engineer',
        company: 'Company Name',
        period: '2022 - Present',
        description: 'Working on cutting-edge AI solutions and machine learning models.'
    },
    // Add more experiences here
];

// Projects Data
const projects = [
    {
        title: 'AI Project 1',
        description: 'Description of the project goes here.',
        technologies: ['Python', 'TensorFlow', 'React'],
        github: '#',
        demo: '#'
    },
    // Add more projects here
];

// Populate Experience Timeline
function populateExperience() {
    const timeline = document.querySelector('.timeline');
    experiences.forEach((exp, index) => {
        const item = document.createElement('div');
        item.className = `timeline-item ${index % 2 === 0 ? 'left' : 'right'}`;
        item.innerHTML = `
            <div class="timeline-content">
                <h3>${exp.title}</h3>
                <h4>${exp.company}</h4>
                <p class="period">${exp.period}</p>
                <p>${exp.description}</p>
            </div>
        `;
        timeline.appendChild(item);
    });
}

// Populate Projects Grid
function populateProjects() {
    const projectsGrid = document.querySelector('.projects-grid');
    projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="technologies">
                ${project.technologies.map(tech => `<span>${tech}</span>`).join('')}
            </div>
            <div class="project-links">
                <a href="${project.github}" target="_blank">GitHub</a>
                <a href="${project.demo}" target="_blank">Live Demo</a>
            </div>
        `;
        projectsGrid.appendChild(card);
    });
}

// Glitch Text Effect
function setupGlitchEffect() {
    const glitchText = document.querySelector('.glitch-text');
    if (glitchText) {
        const text = glitchText.textContent;
        glitchText.setAttribute('data-text', text);
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupGlitchEffect();
    populateExperience();
    populateProjects();
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});
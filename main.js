document.addEventListener('DOMContentLoaded', () => {
    // 1. Dark/Light Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = themeToggle ? themeToggle.querySelector('i') : null;

    // Check localStorage or fallback to default (Dark Theme)
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    
    if (savedTheme === 'light') {
        document.body.setAttribute('data-theme', 'light');
        if (themeIcon) {
            themeIcon.className = 'bx bx-sun';
        }
    } else {
        document.body.removeAttribute('data-theme');
        if (themeIcon) {
            themeIcon.className = 'bx bx-moon';
        }
    }

    if (themeToggle && themeIcon) {
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.body.getAttribute('data-theme');
            if (currentTheme === 'light') {
                document.body.removeAttribute('data-theme');
                localStorage.setItem('portfolio-theme', 'dark');
                themeIcon.className = 'bx bx-moon';
            } else {
                document.body.setAttribute('data-theme', 'light');
                localStorage.setItem('portfolio-theme', 'light');
                themeIcon.className = 'bx bx-sun';
            }
        });
    }

    // 2. Typed.js Hero Auto-typing Effect
    if (typeof Typed !== 'undefined') {
        new Typed('.text', {
            strings: ['Computer Engineering Student', 'Frontend Developer', 'Tech Enthusiast'],
            typeSpeed: 70,
            backSpeed: 50,
            backDelay: 1000,
            loop: true
        });
    }

    // 3. Project Filter Tags
    const filterTags = document.querySelectorAll('.filter-tag');
    const projectCards = document.querySelectorAll('.project-card');

    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            // Remove active status from all tags and add to current
            filterTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');

            const filterValue = tag.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.classList.remove('hidden');
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // 4. GitHub API Integration
    async function fetchGitHubStats() {
        const statsContainers = document.querySelectorAll('.github-stats');
        
        for (const container of statsContainers) {
            const repo = container.getAttribute('data-repo');
            if (!repo) continue;
            
            try {
                // Fetch repo stats from GitHub public API
                const response = await fetch(`https://api.github.com/repos/${repo}`);
                if (!response.ok) {
                    throw new Error(`GitHub API error: ${response.status}`);
                }
                const data = await response.json();
                
                const starsElement = container.querySelector('.stars-count');
                const forksElement = container.querySelector('.forks-count');
                
                if (starsElement) starsElement.textContent = data.stargazers_count;
                if (forksElement) forksElement.textContent = data.forks_count;
                
                // Make stats container visible once loaded successfully
                container.classList.add('visible');
            } catch (error) {
                console.warn(`Could not load GitHub stats for repo: ${repo}.`, error);
                // Gracefully leave the stats container hidden (defaults to opacity 0)
            }
        }
    }

    // Call stats fetcher
    fetchGitHubStats();

    // 5. Scroll Spy & Active Nav Item Highlight
    const sections = document.querySelectorAll('section, main > section');
    const navLinks = document.querySelectorAll('.navbar a');

    function updateActiveNavLink() {
        let current = '';
        const scrollPosition = window.scrollY + 150; // offset for fixed header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveNavLink);
    updateActiveNavLink(); // initial call on load

    // 6. Contact Form Success Handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Provide premium visual submission alert
            alert('Thank you! Your message has been sent successfully. Bhumi will get in touch with you shortly.');
            contactForm.reset();
        });
    }
});

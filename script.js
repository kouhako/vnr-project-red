// Smooth scroll and fade-in animations
document.addEventListener('DOMContentLoaded', function() {
    // Smooth page transitions
    const links = document.querySelectorAll('a[href^="#"], a[href^="/"], .nav-link');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Only handle internal links and non-external navigation
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    // Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                // Optionally stop observing after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all content sections
    const sections = document.querySelectorAll('.content-section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Smooth image loading
    const images = document.querySelectorAll('.content-image');
    images.forEach(img => {
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease-in-out';
            img.addEventListener('load', function() {
                this.style.opacity = '1';
            });
        }
    });

    // Add active state management for navigation
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath.endsWith(linkPath) || (currentPath.endsWith('/') && linkPath === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });

    // Smooth header scroll effect
    let lastScroll = 0;
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (header && currentScroll > 100) {
            header.style.transform = 'translateY(-10px)';
            header.style.opacity = '0.95';
        } else if (header) {
            header.style.transform = 'translateY(0)';
            header.style.opacity = '1';
        }
        
        lastScroll = currentScroll;
    });

    // Parallax effect for header background (subtle)
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const headerContent = document.querySelector('.header-content');
        
        if (headerContent && scrolled < 500) {
            headerContent.style.transform = `translateY(${scrolled * 0.3}px)`;
            headerContent.style.opacity = 1 - (scrolled / 500);
        }
    });

    // ===== MỐC 2: TAB & ACCORDION =====
    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const targetTab = button.getAttribute('data-tab');
            const targetElement = document.getElementById(targetTab);
            
            if (!targetElement) return;
            
            // Remove active from all
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active to clicked
            button.classList.add('active');
            targetElement.classList.add('active');
            
            // Smooth scroll to tab content
            setTimeout(() => {
                const tabContainer = document.querySelector('.tab-container');
                if (tabContainer) {
                    const headerOffset = 120;
                    const elementPosition = tabContainer.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        });
    });

    // Accordion
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const item = header.parentElement;
            const isActive = item.classList.contains('active');
            
            // Close all
            document.querySelectorAll('.accordion-item').forEach(i => {
                i.classList.remove('active');
                i.querySelector('.accordion-icon').textContent = '▼';
            });
            
            // Toggle current
            if (!isActive) {
                item.classList.add('active');
                header.querySelector('.accordion-icon').textContent = '▲';
            }
        });
    });

    // Interactive cards (flip on click)
    const interactiveCards = document.querySelectorAll('.interactive-card');
    interactiveCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    // Significance tabs (Mốc 2)
    const sigTabs = document.querySelectorAll('.sig-tab');
    const sigContents = document.querySelectorAll('.sig-content');
    
    sigTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetSig = tab.getAttribute('data-sig');
            const targetElement = document.getElementById(targetSig);
            
            if (!targetElement) return;
            
            sigTabs.forEach(t => t.classList.remove('active'));
            sigContents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            targetElement.classList.add('active');
            
            // Smooth scroll to significance content
            setTimeout(() => {
                const significanceTabs = document.querySelector('.significance-tabs');
                if (significanceTabs) {
                    const headerOffset = 120;
                    const elementPosition = significanceTabs.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }, 100);
        });
    });

    // ===== MỐC 3: FLIP CARDS & EXPANDABLE =====
    // Flip cards
    const flipCards = document.querySelectorAll('.flip-card');
    flipCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });

    // Expandable cards
    const expandableCards = document.querySelectorAll('.expandable-card');
    expandableCards.forEach(card => {
        const header = card.querySelector('.expand-header');
        header.addEventListener('click', () => {
            const isActive = card.classList.contains('active');
            
            // Close all others if needed
            // Or allow multiple open - comment out if you want only one open at a time
            // expandableCards.forEach(c => {
            //     c.classList.remove('active');
            //     c.querySelector('.expand-toggle').textContent = '+';
            // });
            
            if (!isActive) {
                card.classList.add('active');
                header.querySelector('.expand-toggle').textContent = '−';
            } else {
                card.classList.remove('active');
                header.querySelector('.expand-toggle').textContent = '+';
            }
        });
    });

    // Reveal cards (hover)
    const revealCards = document.querySelectorAll('.reveal-card');
    revealCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.classList.add('revealed');
        });
        card.addEventListener('mouseleave', () => {
            card.classList.remove('revealed');
        });
    });

    // ===== MỐC 4: PARALLAX & PROGRESSIVE REVEAL =====
    // Parallax reveal observer
    const parallaxObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    document.querySelectorAll('.parallax-reveal').forEach(el => {
        parallaxObserver.observe(el);
    });

    // ===== MỐC 5: TIMELINE INTERACTIVE =====
    // Expandable timeline
    const expandTimelineButtons = document.querySelectorAll('.expand-timeline-btn');
    expandTimelineButtons.forEach(button => {
        button.addEventListener('click', () => {
            const item = button.closest('.expand-timeline-item');
            const isActive = item.classList.contains('active');
            
            if (!isActive) {
                item.classList.add('active');
                button.textContent = '▲';
            } else {
                item.classList.remove('active');
                button.textContent = '▼';
            }
        });
    });

    // Interactive significance cards (flip)
    const sigCards = document.querySelectorAll('.sig-card-interactive');
    sigCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });
});

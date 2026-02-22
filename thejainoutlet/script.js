 lucide.createIcons();

        const header = document.getElementById('main-navigation');
        const menuBtn = document.getElementById('menu-trigger');
        const mobileNav = document.getElementById('mobile-nav');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 80) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        menuBtn.addEventListener('click', () => {
            mobileNav.classList.toggle('visible');
        });

        document.querySelectorAll('.mobile-drawer .nav-item').forEach(link => {
            link.addEventListener('click', () => mobileNav.classList.remove('visible'));
        });

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.reveal-on-scroll').forEach(el => observer.observe(el));
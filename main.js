// Main JavaScript File

document.addEventListener('DOMContentLoaded', function() {
    // ===== NAVBAR SCROLL EFFECT =====
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Back to top button
        const backToTopButton = document.getElementById('backToTop');
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    // Inisialisasi: cek posisi awal
    if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
    }
    
    // ===== BACK TO TOP BUTTON =====
    const backToTopButton = document.getElementById('backToTop');
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // ===== PORTFOLIO FILTERING =====
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioGrid = document.querySelector('.portfolio-grid');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter portfolio items
            const portfolioItems = document.querySelectorAll('.portfolio-item');
            portfolioItems.forEach(item => {
                if (filterValue === 'all' || item.classList.contains(filterValue)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // ===== SMOOTH SCROLLING =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile navbar
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    navbarCollapse.classList.remove('show');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                this.classList.add('active');
            }
        });
    });
    
    // ===== LOAD PORTFOLIO ITEMS =====
    if (portfolioGrid) {
        // PORTFOLIO DATA: gunakan pola nama file lokal per kategori
        // Tambahkan file dengan nama sesuai ke folder `img/` jika ingin menampilkan gambar lokal.
        const portfolioData = [
            // WEDDING - 6 items (img/wedding1.jpg .. img/wedding6.jpg)
            { category: 'wedding', src: 'img/wedding1.jpg', title: 'Wedding 1' },
            { category: 'wedding', src: 'img/wedding2.jpg', title: 'Wedding 2' },
            { category: 'wedding', src: 'img/wedding3.jpg', title: 'Wedding 3' },
            { category: 'wedding', src: 'img/wedding4.jpg', title: 'Wedding 4' },
            { category: 'wedding', src: 'img/wedding5.jpg', title: 'Wedding 5' },
            { category: 'wedding', src: 'img/wedding6.jpg', title: 'Wedding 6' },

            // FOTO - 6 items (img/foto1.jpg .. img/foto6.jpg)
            { category: 'foto', src: 'img/foto1.jpg', title: 'Foto 1' },
            { category: 'foto', src: 'img/foto2.jpg', title: 'Foto 2' },
            { category: 'foto', src: 'img/foto3.jpg', title: 'Foto 3' },
            { category: 'foto', src: 'img/foto4.jpg', title: 'Foto 4' },
            { category: 'foto', src: 'img/foto5.jpg', title: 'Foto 5' },
            { category: 'foto', src: 'img/foto6.jpg', title: 'Foto 6' },

            // PROJECT - 6 items (img/project1.jpg .. img/project6.jpg)
            { category: 'project', src: 'img/project1.jpg', title: 'Project 1' },
            { category: 'project', src: 'img/project2.jpg', title: 'Project 2' },
            { category: 'project', src: 'img/project3.jpg', title: 'Project 3' },
            { category: 'project', src: 'img/project4.jpg', title: 'Project 4' },

            // SERTIFIKAT - 6 items (img/sertifikat1..6) - gunakan file lokal atau placeholder fallback
            { category: 'sertifikat', src: 'img/sertifikat1.jpeg', title: 'Sertifikat 1' },
            { category: 'sertifikat', src: 'img/sertifikat2.jpg', title: 'Sertifikat 2' },
            { category: 'sertifikat', src: 'img/sertifikat3.jpg', title: 'Sertifikat 3' },
            { category: 'sertifikat', src: 'img/sertifikat4.jpg', title: 'Sertifikat 4' },
        ];
        
        portfolioData.forEach(item => {
            const portfolioItem = document.createElement('div');
            portfolioItem.className = `portfolio-item ${item.category}`;
            
            portfolioItem.innerHTML = `
                <div class="portfolio-card h-100">
                    <img src="${item.src}" alt="${item.title}" class="img-fluid w-100">
                    <div class="portfolio-overlay">
                        <h5 class="mb-2 text-white">${item.title}</h5>
                        <small class="text-light">Klik untuk memperbesar</small>
                    </div>
                </div>
            `;

            // Jika gambar lokal tidak tersedia, tampilkan placeholder sebagai fallback
            const imgEl = portfolioItem.querySelector('img');
            if (imgEl) {
                imgEl.addEventListener('error', function() {
                    this.src = 'https://via.placeholder.com/400x300?text=No+Image';
                });
            }
            
            // Click to show modal
            portfolioItem.addEventListener('click', function() {
                const modalHtml = `
                    <div class="modal fade" id="imageModal">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">${item.title}</h5>
                                    <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                                </div>
                                <div class="modal-body text-center">
                                    <img src="${item.src}" alt="${item.title}" class="img-fluid">
                                </div>
                            </div>
                        </div>
                    </div>
                `;
                
                document.body.insertAdjacentHTML('beforeend', modalHtml);
                const modal = new bootstrap.Modal(document.getElementById('imageModal'));
                modal.show();
                
                // Remove modal after close
                document.getElementById('imageModal').addEventListener('hidden.bs.modal', function() {
                    this.remove();
                });
            });
            
            portfolioGrid.appendChild(portfolioItem);
        });
    }
    
    // ===== ANIMATE SKILL DOTS =====
    const animateSkillDots = () => {
        const skillDots = document.querySelectorAll('.skill-dot');
        skillDots.forEach((dot, index) => {
            setTimeout(() => {
                dot.classList.add('active');
            }, index * 100);
        });
    };

    // Animate when skills section is in view
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateSkillDots();
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(skillsSection);
    }
});
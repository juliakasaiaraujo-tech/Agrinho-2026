// ============================================
// SCRIPT.JS - INTERATIVIDADE ORIENTAL
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    'use strict';

    // ============================================
    // 1. MENU MOBILE (HAMBURGUER)
    // ============================================
    const header = document.querySelector('header');
    const nav = document.querySelector('nav');
    
    // Criar botão hamburguer
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.setAttribute('aria-label', 'Menu');
    hamburger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;
    
    // Adicionar ao header (antes do .nav-links)
    const navLinks = document.querySelector('.nav-links');
    if (navLinks) {
        nav.insertBefore(hamburger, navLinks);
    }

    // Estilos do hamburguer (injetar via JS)
    const hamburgerStyles = document.createElement('style');
    hamburgerStyles.textContent = `
        .hamburger {
            display: none;
            flex-direction: column;
            gap: 5px;
            background: none;
            border: none;
            padding: 5px;
            cursor: pointer;
            z-index: 100;
        }
        
        .hamburger span {
            display: block;
            width: 28px;
            height: 2px;
            background: #e6d5b8;
            transition: all 0.3s ease;
        }
        
        .hamburger.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
        
        @media (max-width: 800px) {
            .hamburger {
                display: flex;
            }
            
            .nav-links {
                display: none;
                position: absolute;
                top: 100%;
                left: 0;
                right: 0;
                background: rgba(44, 36, 24, 0.98);
                backdrop-filter: blur(10px);
                flex-direction: column;
                padding: 2rem;
                gap: 1.5rem;
                border-bottom: 1px solid rgba(200, 180, 150, 0.2);
                text-align: center;
            }
            
            .nav-links.open {
                display: flex;
            }
            
            .btn-contato {
                display: none;
            }
        }
    `;
    document.head.appendChild(hamburgerStyles);

    // Toggle menu
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('open');
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('open');
        });
    });

    // ============================================
    // 2. SCROLL SUAVE E SEÇÃO ATIVA
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-links a');

    // Scroll suave para âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Detectar seção ativa no scroll
    function updateActiveSection() {
        let current = '';
        const scrollPosition = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinksAll.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    }

    // Adicionar estilo para link ativo
    const activeStyle = document.createElement('style');
    activeStyle.textContent = `
        .nav-links a.active {
            color: #8ba37e !important;
        }
        .nav-links a.active::after {
            width: 100% !important;
        }
    `;
    document.head.appendChild(activeStyle);

    window.addEventListener('scroll', updateActiveSection);
    updateActiveSection();

    // ============================================
    // 3. ANIMAÇÕES AO SCROLL (REVELAR ELEMENTOS)
    // ============================================
    function revealElements() {
        const reveals = document.querySelectorAll('.card, .stat-box, .challenge-card, .action-card');
        
        reveals.forEach((el, index) => {
            const windowHeight = window.innerHeight;
            const elementTop = el.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < windowHeight - elementVisible) {
                el.classList.add('revealed');
                // Adicionar delay gradual
                el.style.animationDelay = (index * 0.1) + 's';
            }
        });
    }

    // Estilos para animação de revelação
    const revealStyles = document.createElement('style');
    revealStyles.textContent = `
        .card, .stat-box, .challenge-card, .action-card {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .card.revealed, .stat-box.revealed, .challenge-card.revealed, .action-card.revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(revealStyles);

    window.addEventListener('scroll', revealElements);
    window.addEventListener('load', revealElements);
    revealElements();

    // ============================================
    // 4. CALCULADORA DE IMPACTO APERFEIÇOADA
    // ============================================
    const calcularBtn = document.querySelector('button[onclick="calcularImpacto()"]');
    if (calcularBtn) {
        // Remover onclick do HTML e adicionar via JS
        calcularBtn.removeAttribute('onclick');
        calcularBtn.addEventListener('click', function(e) {
            e.preventDefault();
            calcularImpactoOrientado();
        });

        // Permitir Enter no input
        const areaInput = document.getElementById('area');
        if (areaInput) {
            areaInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    calcularImpactoOrientado();
                }
            });
        }
    }

    function calcularImpactoOrientado() {
        const areaInput = document.getElementById('area');
        const resultadoDiv = document.getElementById('resultado');
        
        if (!areaInput || !resultadoDiv) return;
        
        const area = parseFloat(areaInput.value);
        
        if (!area || area <= 0) {
            resultadoDiv.innerHTML = `
                <div style="color: #b13e3e; padding: 1rem; border: 1px solid #b13e3e; border-radius: 16px;">
                    <i class="fa-solid fa-triangle-exclamation"></i> 
                    Por favor, insira um valor válido.
                </div>
            `;
            return;
        }

        // Cálculos mais detalhados
        const aguaEconomizada = (area * 7200).toLocaleString('pt-BR');
        const carbonoReduzido = (area * 2.5).toFixed(1);
        const arvoresEquivalentes = Math.round(area * 1.8);
        
        resultadoDiv.innerHTML = `
            <div style="background: #f1ede4; padding: 1.5rem; border-radius: 24px; border-left: 4px solid #5a6e4a;">
                <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
                    <i class="fa-solid fa-leaf" style="color: #5a6e4a;"></i>
                    <span style="font-weight: 700; color: #2e241f;">🌱 Impacto sustentável</span>
                </div>
                <div style="font-size: 0.95rem; color: #4a3f38;">
                    <p>💧 <strong>${aguaEconomizada}</strong> litros de água economizados/ano</p>
                    <p>🌿 <strong>${carbonoReduzido}</strong> toneladas de CO₂ reduzidas</p>
                    <p>🌳 Equivalente a <strong>${arvoresEquivalentes}</strong> árvores plantadas</p>
                </div>
                <div style="margin-top: 0.8rem; font-size: 0.8rem; color: #8b8174;">
                    <i class="fa-regular fa-clock"></i> Dados baseados em práticas sustentáveis
                </div>
            </div>
        `;
        
        // Animação de "respiração" no resultado
        resultadoDiv.style.animation = 'none';
        setTimeout(() => {
            resultadoDiv.style.animation = 'fadeIn 0.5s ease';
        }, 10);
    }

    // ============================================
    // 5. VALIDAÇÃO DE FORMULÁRIO
    // ============================================
    const form = document.querySelector('.action-card form, form');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const inputs = this.querySelectorAll('input, textarea');
            let isValid = true;
            
            inputs.forEach(input => {
                if (!input.value.trim()) {
                    isValid = false;
                    input.style.borderColor = '#b13e3e';
                    input.style.backgroundColor = '#fff5f5';
                    
                    // Adicionar mensagem de erro
                    const errorMsg = document.createElement('small');
                    errorMsg.className = 'error-msg';
                    errorMsg.style.color = '#b13e3e';
                    errorMsg.style.display = 'block';
                    errorMsg.style.marginTop = '-0.5rem';
                    errorMsg.style.marginBottom = '0.5rem';
                    errorMsg.textContent = '⚠️ Este campo é obrigatório';
                    
                    const parent = input.parentElement;
                    const existingError = parent.querySelector('.error-msg');
                    if (!existingError) {
                        parent.appendChild(errorMsg);
                    }
                } else {
                    input.style.borderColor = '#5a6e4a';
                    input.style.backgroundColor = '#fef9e6';
                    const parent = input.parentElement;
                    const errorMsg = parent.querySelector('.error-msg');
                    if (errorMsg) {
                        errorMsg.remove();
                    }
                }
            });
            
            if (isValid) {
                // Simular envio
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.textContent = '✉️ Enviado!';
                submitBtn.style.background = '#5a6e4a';
                
                setTimeout(() => {
                    submitBtn.textContent = originalText;
                    submitBtn.style.background = '';
                    this.reset();
                    
                    // Mostrar mensagem de sucesso
                    const successMsg = document.createElement('div');
                    successMsg.style.cssText = `
                        background: #5a6e4a;
                        color: white;
                        padding: 1rem;
                        border-radius: 24px;
                        text-align: center;
                        margin-top: 1rem;
                        animation: fadeIn 0.5s ease;
                    `;
                    successMsg.textContent = '🌸 Mensagem enviada com sucesso!';
                    this.appendChild(successMsg);
                    
                    setTimeout(() => {
                        successMsg.remove();
                    }, 4000);
                }, 1500);
            }
        });

        // Limpar erro ao digitar
        document.querySelectorAll('.action-card input, .action-card textarea').forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '#d6c8b8';
                this.style.backgroundColor = '#fffcf5';
                const parent = this.parentElement;
                const errorMsg = parent.querySelector('.error-msg');
                if (errorMsg) {
                    errorMsg.remove();
                }
            });
        });
    }

    // ============================================
    // 6. EFEITO DE DIGITAÇÃO NO HERO
    // ============================================
    function typeEffect() {
        const heroTitle = document.querySelector('.hero h2');
        if (!heroTitle) return;
        
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        
        let i = 0;
        const speed = 80; // ms por caractere
        
        function typeWriter() {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            }
        }
        
        // Iniciar após 1s
        setTimeout(typeWriter, 1000);
    }
    
    // Verificar se é desktop (evitar em mobile)
    if (window.innerWidth > 800) {
        typeEffect();
    }

    // ============================================
    // 7. MODO NOTURNO (toggle)
    // ============================================
    // Criar botão toggle
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Alternar tema');
    themeToggle.innerHTML = '🌙';
    themeToggle.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: rgba(44, 36, 24, 0.9);
        backdrop-filter: blur(8px);
        color: #e6d5b8;
        border: 1px solid rgba(200, 180, 150, 0.3);
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 1.5rem;
        cursor: pointer;
        z-index: 999;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    
    themeToggle.addEventListener('mouseenter', () => {
        themeToggle.style.transform = 'scale(1.1)';
    });
    themeToggle.addEventListener('mouseleave', () => {
        themeToggle.style.transform = 'scale(1)';
    });
    
    document.body.appendChild(themeToggle);

    // Estilos para modo noturno
    const darkModeStyles = document.createElement('style');
    darkModeStyles.id = 'dark-mode-styles';
    darkModeStyles.textContent = `
        body.dark-mode {
            background: #1a1714;
            color: #d6c8b8;
        }
        
        body.dark-mode .card,
        body.dark-mode .action-card,
        body.dark-mode .stat-box,
        body.dark-mode .challenge-card {
            background: #2a241f;
            border-color: #3d3530;
            color: #d6c8b8;
        }
        
        body.dark-mode .stat-box {
            background: rgba(50, 45, 40, 0.5);
        }
        
        body.dark-mode input,
        body.dark-mode textarea {
            background: #2a241f;
            border-color: #4a3f38;
            color: #d6c8b8;
        }
        
        body.dark-mode input:focus,
        body.dark-mode textarea:focus {
            border-color: #8ba37e;
        }
        
        body.dark-mode #sustentabilidade {
            background: #1f1b16;
        }
        
        body.dark-mode .solutions {
            background: #0f0d0b;
        }
        
        body.dark-mode .hero-btn {
            background: rgba(91, 110, 74, 0.8);
        }
        
        body.dark-mode .theme-toggle {
            background: rgba(200, 180, 150, 0.9);
            color: #2c2418;
        }
    `;
    
    let darkMode = false;

    themeToggle.addEventListener('click', function() {
        darkMode = !darkMode;
        document.body.classList.toggle('dark-mode');
        this.textContent = darkMode ? '☀️' : '🌙';
        
        // Salvar preferência
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    });

    // Carregar preferência salva
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        darkMode = true;
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }

    // ============================================
    // 8. CONTADOR DE VISITAS (simples)
    // ============================================
    function updateVisitorCount() {
        let visits = localStorage.getItem('visitorCount');
        visits = visits ? parseInt(visits) + 1 : 1;
        localStorage.setItem('visitorCount', visits);
        
        // Mostrar no footer (se existir)
        const footer = document.querySelector('footer p:last-child');
        if (footer && visits > 1) {
            // Adicionar contador sutil
            const countSpan = document.createElement('span');
            countSpan.style.cssText = `
                display: block;
                font-size: 0.7rem;
                margin-top: 0.5rem;
                color: #8b8174;
            `;
            countSpan.textContent = `🌸 Visitante número ${visits}`;
            footer.appendChild(countSpan);
        }
    }
    updateVisitorCount();

    // ============================================
    // 9. PARALLAX SUAVE NO HERO
    // ============================================
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            hero.style.backgroundPositionY = scrolled * 0.3 + 'px';
        });
    }

    // ============================================
    // 10. ANIMAÇÃO DE "RESPIRAÇÃO" PARA ÍCONES
    // ============================================
    const breatheStyles = document.createElement('style');
    breatheStyles.textContent = `
        @keyframes breathe {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        .card i, .stat-box i, .challenge-card i {
            animation: breathe 3s ease-in-out infinite;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    document.head.appendChild(breatheStyles);

    // ============================================
    // 11. QUIZ INTERATIVO (melhorado)
    // ============================================
    const quizBtn = document.querySelector('.action-card button:not([onclick])');
    if (quizBtn && quizBtn.textContent.includes('Iniciar')) {
        quizBtn.addEventListener('click', function() {
            // Criar modal simples
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
             

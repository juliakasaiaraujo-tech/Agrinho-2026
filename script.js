// Menu Mobile
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const navMenu = document.querySelector('.nav-menu');

mobileMenuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    });
});

// Animação de números
const animateNumbers = () => {
    const numbers = document.querySelectorAll('.stat-number');
    
    numbers.forEach(number => {
        const target = parseFloat(number.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateNumber = () => {
            current += increment;
            if (current < target) {
                number.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                number.textContent = target % 1 === 0 ? target : target.toFixed(1);
            }
        };
        
        updateNumber();
    });
};

// Observer para animar números quando visíveis
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateNumbers();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const statsGrid = document.querySelector('.stats-grid');
if (statsGrid) {
    statsObserver.observe(statsGrid);
}

// Animação das barras de severidade
const animateSeverityBars = () => {
    const bars = document.querySelectorAll('.severity-fill');
    bars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        bar.style.width = width + '%';
    });
};

const severityObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateSeverityBars();
            severityObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const challengesSection = document.querySelector('.desafios');
if (challengesSection) {
    severityObserver.observe(challengesSection);
}

// Quiz
const quizBtn = document.querySelector('.quiz-btn');
const quizResult = document.querySelector('.quiz-result');

const correctAnswers = {
    q1: 'plantio',
    q2: 'solar',
    q3: 'ilpf'
};

quizBtn.addEventListener('click', () => {
    let correct = 0;
    let total = 3;
    
    for (let i = 1; i <= total; i++) {
        const selected = document.querySelector(`input[name="q${i}"]:checked`);
        if (selected && selected.value === correctAnswers[`q${i}`]) {
            correct++;
        }
    }
    
    const percentage = (correct / total) * 100;
    
    quizResult.classList.add('show');
    quizResult.classList.remove('correct', 'incorrect');
    
    if (percentage === 100) {
        quizResult.classList.add('correct');
        quizResult.textContent = `🎉 Parabéns! Você acertou todas as ${total} questões!`;
    } else if (percentage >= 50) {
        quizResult.classList.add('correct');
        quizResult.textContent = `✅ Bom trabalho! Você acertou ${correct} de ${total} questões.`;
    } else {
        quizResult.classList.add('incorrect');
        quizResult.textContent = `❌ Você acertou ${correct} de ${total} questões. Continue estudando!`;
    }
});

// Calculadora de Impacto
const calculatorBtn = document.querySelector('.calculator-btn');
const resultValue = document.querySelector('.result-value');

calculatorBtn.addEventListener('click', () => {
    const area = parseFloat(document.getElementById('area').value) || 0;
    const fertilizantes = parseFloat(document.getElementById('fertilizantes').value) || 0;
    const combustivel = parseFloat(document.getElementById('combustivel').value) || 0;
    
    // Cálculo simplificado de emissões
    const emissaoFertilizante = fertilizantes * 3.6; // tCO2e por tonelada
    const emissaoCombustivel = combustivel * 0.0027; // tCO2e por litro
    const emissaoArea = area * 0.5; // Estimativa básica
    
    const total = emissaoFertilizante + emissaoCombustivel + emissaoArea;
    
    resultValue.textContent = total.toFixed(2);
});

// Formulário de Contato
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Simulação de envio
    alert(`Mensagem enviada com sucesso!\n\nNome: ${data.nome}\nE-mail: ${data.email}\nAssunto: ${data.assunto}\n\nObrigado pelo contato!`);
    
    contactForm.reset();
});

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
let lastScroll = 0;
const header = document.querySelector('.header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Animação de entrada dos elementos
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Aplicar animação aos cards
document.querySelectorAll('.stat-card, .info-card, .sustainability-card, .challenge-card, .timeline-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
});

// Gráfico de Produção (usando Canvas)
const canvas = document.getElementById('productionChart');
if (canvas) {
    const ctx = canvas.getContext('2d');
    canvas.width = canvas.offsetWidth;
    canvas.height = 400;
    
    // Dados simulados
    const years = ['1990', '2000', '2010', '2020', '2025'];
    const producao = [60, 90, 150, 250, 300];
    const area = [35, 40, 48, 55, 60];
    
    const padding = 60;
    const chartWidth = canvas.width - padding * 2;
    const chartHeight = canvas.height - padding * 2;
    
    // Desenhar eixos
    ctx.strokeStyle = '#e0e0e0';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(padding, padding);
    ctx.lineTo(padding, canvas.height - padding);
    ctx.lineTo(canvas.width - padding, canvas.height - padding);
    ctx.stroke();
    
    // Desenhar linhas do gráfico
    const maxProducao = Math.max(...producao);
    const maxArea = Math.max(...area);
    
    // Linha de produção
    ctx.strokeStyle = '#4a7c2c';
    ctx.lineWidth = 3;
    ctx.beginPath();
    producao.forEach((value, index) => {
        const x = padding + (index / (years.length - 1)) * chartWidth;
        const y = canvas.height - padding - (value / maxProducao) * chartHeight;
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();
    
    // Linha de área
    ctx.strokeStyle = '#7cb342';
    ctx.lineWidth = 3;
    ctx.beginPath();
    area.forEach((value, index) => {
        const x = padding + (index / (years.length - 1)) * chartWidth;
        const y = canvas.height - padding - (value / maxArea) * chartHeight;
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
    });
    ctx.stroke();
    
    // Desenhar pontos
    ctx.fillStyle = '#4a7c2c';
    producao.forEach((value, index) => {
        const x = padding + (index / (years.length - 1)) * chartWidth;
        const y = canvas.height - padding - (value / maxProducao) * chartHeight;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
    });
    
    ctx.fillStyle = '#7cb342';
    area.forEach((value, index) => {
        const x = padding + (index / (years.length - 1)) * chartWidth;
        const y = canvas.height - padding - (value / maxArea) * chartHeight;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
    });
    
    // Labels dos anos
    ctx.fillStyle = '#2c3e50';
    ctx.font = '14px Poppins';
    ctx.textAlign = 'center';
    years.forEach((year, index) => {
        const x = padding + (index / (years.length - 1)) * chartWidth;
        ctx.fillText(year, x, canvas.height - padding + 25);
    });
    
    // Legenda
    ctx.fillStyle = '#4a7c2c';
    ctx.fillRect(padding, padding - 30, 20, 3);
    ctx.fillText('Produção (milhões ton)', padding + 100, padding - 25);
    
    ctx.fillStyle = '#7cb342';
    ctx.fillRect(padding + 250, padding - 30, 20, 3);
    ctx.fillText('Área (milhões ha)', padding + 350, padding - 25);
}

// Redimensionar gráfico quando a janela mudar
window.addEventListener('resize', () => {
    if (canvas) {
        canvas.width = canvas.offsetWidth;
        // Redesenhar gráfico aqui se necessário
    }
});

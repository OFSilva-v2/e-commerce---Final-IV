// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar funcionalidades
    initMenuMobile();
    initCartModal();
    initProductFilters();
    loadFeaturedProducts();
    initContactForm();
    initFAQ();
    
    // Inicializar contador do carrinho
    updateCartCount();
});

// Menu móvel
function initMenuMobile() {
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const quickAccessMenu = document.querySelector('.quick-access nav ul');
    
    if (mobileMenuBtn && quickAccessMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            quickAccessMenu.classList.toggle('active');
            this.classList.toggle('fa-times');
            this.classList.toggle('fa-bars');
        });
        
        // Fechar menu ao clicar em um link
        const navLinks = document.querySelectorAll('.quick-access nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    quickAccessMenu.classList.remove('active');
                    mobileMenuBtn.classList.remove('fa-times');
                    mobileMenuBtn.classList.add('fa-bars');
                }
            });
        });
    }
}

// Modal do carrinho
function initCartModal() {
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeModal = document.querySelector('.close-modal');
    
    if (cartIcon && cartModal) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            cartModal.style.display = 'block';
            renderCartItems();
        });
    }
    
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            cartModal.style.display = 'none';
        });
    }
    
    // Fechar modal ao clicar fora
    window.addEventListener('click', function(e) {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });
}

// Filtros de produtos
function initProductFilters() {
    // Verificar se estamos na página de produtos
    const filterForm = document.getElementById('filter-form');
    if (!filterForm) return;
    
    // Aplicar filtros
    filterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        applyFilters();
    });
    
    // Limpar filtros
    const clearFiltersBtn = document.getElementById('clear-filters');
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            filterForm.reset();
            applyFilters();
        });
    }
}

// Aplicar filtros
function applyFilters() {
    const category = document.getElementById('category-filter')?.value || 'all';
    const minPrice = parseFloat(document.getElementById('min-price')?.value) || 0;
    const maxPrice = parseFloat(document.getElementById('max-price')?.value) || 10000;
    const size = document.getElementById('size-filter')?.value || 'all';
    const color = document.getElementById('color-filter')?.value || 'all';
    
    let filteredProducts = window.productsData?.products || [];
    
    // Filtrar por categoria
    if (category !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.category === category);
    }
    
    // Filtrar por preço
    filteredProducts = filteredProducts.filter(p => p.price >= minPrice && p.price <= maxPrice);
    
    // Filtrar por tamanho
    if (size !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.sizes.includes(size));
    }
    
    // Filtrar por cor
    if (color !== 'all') {
        filteredProducts = filteredProducts.filter(p => p.colors.includes(color));
    }
    
    // Renderizar produtos filtrados
    const container = document.getElementById('products-container');
    if (container && window.productsData) {
        window.productsData.renderProducts(filteredProducts, 'products-container');
        
        // Atualizar contador de produtos
        const productCount = document.getElementById('product-count');
        if (productCount) {
            productCount.textContent = filteredProducts.length;
        }
    }
}

// Carregar produtos em destaque
function loadFeaturedProducts() {
    const featuredContainer = document.getElementById('featured-products');
    if (featuredContainer && window.productsData) {
        window.productsData.renderFeaturedProducts();
    }
}

// Formulário de contato
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar formulário
        const name = document.getElementById('contact-name').value.trim();
        const email = document.getElementById('contact-email').value.trim();
        const message = document.getElementById('contact-message').value.trim();
        
        if (!name || !email || !message) {
            showMessage('Por favor, preencha todos os campos.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showMessage('Por favor, insira um e-mail válido.', 'error');
            return;
        }
        
        // Simular envio
        showMessage('Mensagem enviada com sucesso! Entraremos em contato em breve.', 'success');
        contactForm.reset();
        
        // Scroll para a mensagem
        const messageElement = document.querySelector('.message');
        if (messageElement) {
            messageElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Validação de e-mail
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Mostrar mensagens
function showMessage(text, type) {
    const messageDiv = document.querySelector('.message');
    if (!messageDiv) return;
    
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;
    messageDiv.style.display = 'block';
    
    // Esconder mensagem após 5 segundos
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 5000);
}

// FAQ - Alternar respostas
function initFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Alternar resposta
            answer.classList.toggle('active');
            
            // Alternar ícone
            if (answer.classList.contains('active')) {
                icon.className = 'fas fa-chevron-up';
                answer.style.maxHeight = answer.scrollHeight + 'px';
            } else {
                icon.className = 'fas fa-chevron-down';
                answer.style.maxHeight = '0';
            }
            
            // Fechar outras respostas
            faqQuestions.forEach(otherQuestion => {
                if (otherQuestion !== this) {
                    const otherAnswer = otherQuestion.nextElementSibling;
                    const otherIcon = otherQuestion.querySelector('i');
                    
                    otherAnswer.classList.remove('active');
                    otherIcon.className = 'fas fa-chevron-down';
                    otherAnswer.style.maxHeight = '0';
                }
            });
        });
    });
}

// Atualizar contador do carrinho
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    document.querySelectorAll('.cart-count').forEach(element => {
        element.textContent = totalItems;
    });
}

// Adicionar produto ao carrinho (event listener global)
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('add-to-cart')) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        addToCart(productId);
    }
});

// Adicionar produto ao carrinho
function addToCart(productId) {
    if (!window.productsData) return;
    
    const product = window.productsData.getProductById(productId);
    if (!product) return;
    
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        if (existingItem.quantity >= product.stock) {
            showMessage(`Desculpe, apenas ${product.stock} unidades disponíveis em estoque.`, 'error');
            return;
        }
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
            maxStock: product.stock
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    
    // Mostrar mensagem de confirmação
    showMessage(`${product.name} foi adicionado ao carrinho!`, 'success');
    
    // Atualizar carrinho se o modal estiver aberto
    const cartModal = document.getElementById('cart-modal');
    if (cartModal && cartModal.style.display === 'block') {
        renderCartItems();
    }
}

// Renderizar itens do carrinho
function renderCartItems() {
    const container = document.getElementById('cart-items-container');
    const totalPriceElement = document.querySelector('.total-price');
    
    if (!container || !totalPriceElement) return;
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-cart">Seu carrinho está vazio.</p>';
        totalPriceElement.textContent = 'R$ 0,00';
        return;
    }
    
    container.innerHTML = '';
    let totalPrice = 0;
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <div class="cart-item-info">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img">
                <div class="cart-item-details">
                    <h4>${item.name}</h4>
                    <p>R$ ${item.price.toFixed(2)} cada</p>
                </div>
            </div>
            <div class="cart-item-actions">
                <button class="decrease-quantity" data-id="${item.id}">-</button>
                <span class="cart-item-quantity">${item.quantity}</span>
                <button class="increase-quantity" data-id="${item.id}">+</button>
            </div>
            <div class="cart-item-price">R$ ${(item.price * item.quantity).toFixed(2)}</div>
        `;
        container.appendChild(itemElement);
        
        totalPrice += item.price * item.quantity;
    });
    
    totalPriceElement.textContent = `R$ ${totalPrice.toFixed(2)}`;
    
    // Adicionar event listeners para os botões de quantidade
    document.querySelectorAll('.increase-quantity').forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            updateCartItemQuantity(id, 1);
        });
    });
    
    document.querySelectorAll('.decrease-quantity').forEach(button => {
        button.addEventListener('click', function() {
            const id = parseInt(this.getAttribute('data-id'));
            updateCartItemQuantity(id, -1);
        });
    });
}

// Atualizar quantidade do item no carrinho
function updateCartItemQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === productId);
    
    if (itemIndex === -1) return;
    
    const newQuantity = cart[itemIndex].quantity + change;
    
    if (newQuantity < 1) {
        // Remover item do carrinho
        cart.splice(itemIndex, 1);
    } else if (newQuantity > cart[itemIndex].maxStock) {
        showMessage(`Desculpe, apenas ${cart[itemIndex].maxStock} unidades disponíveis em estoque.`, 'error');
        return;
    } else {
        cart[itemIndex].quantity = newQuantity;
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCartItems();
}

// Exportar funções para uso global
window.mainFunctions = {
    initMenuMobile,
    initCartModal,
    initProductFilters,
    applyFilters,
    loadFeaturedProducts,
    initContactForm,
    initFAQ,
    updateCartCount,
    addToCart,
    renderCartItems,
    updateCartItemQuantity,
    showMessage
};
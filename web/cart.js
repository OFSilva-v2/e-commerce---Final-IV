// Inicialização do carrinho
document.addEventListener('DOMContentLoaded', function() {
    // Verificar se estamos na página de checkout
    if (window.location.pathname.includes('checkout.html')) {
        initCheckout();
    }
    
    // Verificar se estamos na página da conta
    if (window.location.pathname.includes('account.html')) {
        initAccountPage();
    }
});

// Página de checkout
function initCheckout() {
    renderCheckoutItems();
    initCheckoutForm();
    calculateShipping();
}

// Renderizar itens no checkout
function renderCheckoutItems() {
    const container = document.getElementById('checkout-items');
    const subtotalElement = document.getElementById('checkout-subtotal');
    const shippingElement = document.getElementById('checkout-shipping');
    const totalElement = document.getElementById('checkout-total');
    
    if (!container || !subtotalElement) return;
    
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (cart.length === 0) {
        container.innerHTML = '<p class="empty-cart">Seu carrinho está vazio. <a href="products.html">Voltar às compras</a></p>';
        subtotalElement.textContent = 'R$ 0,00';
        shippingElement.textContent = 'R$ 0,00';
        totalElement.textContent = 'R$ 0,00';
        return;
    }
    
    container.innerHTML = '';
    let subtotal = 0;
    
    cart.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'checkout-item';
        itemElement.innerHTML = `
            <div class="checkout-item-info">
                <img src="${item.image}" alt="${item.name}" class="checkout-item-img">
                <div class="checkout-item-details">
                    <h4>${item.name}</h4>
                    <p>Quantidade: ${item.quantity}</p>
                </div>
            </div>
            <div class="checkout-item-price">R$ ${(item.price * item.quantity).toFixed(2)}</div>
        `;
        container.appendChild(itemElement);
        
        subtotal += item.price * item.quantity;
    });
    
    subtotalElement.textContent = `R$ ${subtotal.toFixed(2)}`;
    calculateTotals(subtotal);
}

// Calcular totais
function calculateTotals(subtotal) {
    const shippingElement = document.getElementById('checkout-shipping');
    const totalElement = document.getElementById('checkout-total');
    
    if (!shippingElement || !totalElement) return;
    
    const shipping = parseFloat(shippingElement.textContent.replace('R$ ', '')) || 0;
    const total = subtotal + shipping;
    
    totalElement.textContent = `R$ ${total.toFixed(2)}`;
}

// Calcular frete
function calculateShipping() {
    const shippingMethod = document.getElementById('shipping-method');
    const shippingElement = document.getElementById('checkout-shipping');
    
    if (!shippingMethod || !shippingElement) return;
    
    // Calcular subtotal
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let subtotal = 0;
    cart.forEach(item => {
        subtotal += item.price * item.quantity;
    });
    
    // Frete grátis para compras acima de R$ 199,90
    if (subtotal > 199.90) {
        shippingElement.textContent = 'R$ 0,00';
        calculateTotals(subtotal);
        return;
    }
    
    // Calcular frete baseado no método selecionado
    shippingMethod.addEventListener('change', function() {
        let shippingCost = 0;
        
        switch (this.value) {
            case 'standard':
                shippingCost = 15.90;
                break;
            case 'express':
                shippingCost = 29.90;
                break;
            case 'store-pickup':
                shippingCost = 0;
                break;
        }
        
        shippingElement.textContent = `R$ ${shippingCost.toFixed(2)}`;
        calculateTotals(subtotal);
    });
    
    // Calcular inicialmente
    let initialShipping = 15.90; // Padrão
    shippingElement.textContent = `R$ ${initialShipping.toFixed(2)}`;
    calculateTotals(subtotal);
}

// Formulário de checkout
function initCheckoutForm() {
    const checkoutForm = document.getElementById('checkout-form');
    if (!checkoutForm) return;
    
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validar formulário
        if (!validateCheckoutForm()) {
            return;
        }
        
        // Simular processamento do pagamento
        processPayment();
    });
    
    // Alternar formas de pagamento
    const paymentMethods = document.querySelectorAll('input[name="payment-method"]');
    paymentMethods.forEach(method => {
        method.addEventListener('change', function() {
            updatePaymentFields(this.value);
        });
    });
    
    // Atualizar campos inicialmente
    const selectedMethod = document.querySelector('input[name="payment-method"]:checked');
    if (selectedMethod) {
        updatePaymentFields(selectedMethod.value);
    }
}

// Validar formulário de checkout
function validateCheckoutForm() {
    const requiredFields = [
        'checkout-name',
        'checkout-email',
        'checkout-phone',
        'checkout-address',
        'checkout-city',
        'checkout-state',
        'checkout-zip'
    ];
    
    let isValid = true;
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field && !field.value.trim()) {
            field.classList.add('error');
            isValid = false;
        } else if (field) {
            field.classList.remove('error');
        }
    });
    
    // Validar e-mail
    const emailField = document.getElementById('checkout-email');
    if (emailField && emailField.value.trim() && !isValidEmail(emailField.value.trim())) {
        emailField.classList.add('error');
        isValid = false;
        showMessage('Por favor, insira um e-mail válido.', 'error');
    }
    
    if (!isValid) {
        showMessage('Por favor, preencha todos os campos obrigatórios.', 'error');
    }
    
    return isValid;
}

// Atualizar campos de pagamento
function updatePaymentFields(method) {
    // Esconder todos os campos de pagamento
    document.querySelectorAll('.payment-field').forEach(field => {
        field.style.display = 'none';
    });
    
    // Mostrar campos relevantes
    switch (method) {
        case 'credit-card':
            document.getElementById('credit-card-fields').style.display = 'block';
            break;
        case 'boleto':
            document.getElementById('boleto-info').style.display = 'block';
            break;
        case 'pix':
            document.getElementById('pix-info').style.display = 'block';
            break;
    }
}

// Processar pagamento
function processPayment() {
    // Simular processamento
    showMessage('Processando seu pagamento...', 'success');
    
    setTimeout(() => {
        // Criar pedido
        const order = createOrder();
        
        // Limpar carrinho
        localStorage.removeItem('cart');
        updateCartCount();
        
        // Redirecionar para confirmação
        localStorage.setItem('lastOrder', JSON.stringify(order));
        window.location.href = 'account.html?order=success';
    }, 2000);
}

// Criar pedido
function createOrder() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = parseFloat(document.getElementById('checkout-shipping').textContent.replace('R$ ', '')) || 0;
    
    const order = {
        id: Date.now(),
        date: new Date().toISOString(),
        items: cart,
        subtotal: subtotal,
        shipping: shipping,
        total: subtotal + shipping,
        status: 'processing',
        shippingAddress: {
            name: document.getElementById('checkout-name').value,
            address: document.getElementById('checkout-address').value,
            city: document.getElementById('checkout-city').value,
            state: document.getElementById('checkout-state').value,
            zip: document.getElementById('checkout-zip').value
        },
        paymentMethod: document.querySelector('input[name="payment-method"]:checked').value
    };
    
    // Salvar no histórico de pedidos
    let orders = JSON.parse(localStorage.getItem('orders')) || [];
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    
    return order;
}

// Página da conta
function initAccountPage() {
    renderOrderHistory();
    initAccountForm();
    
    // Verificar se há mensagem de pedido concluído
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('order') === 'success') {
        showMessage('Pedido realizado com sucesso! Você pode acompanhar o status abaixo.', 'success');
    }
}

// Renderizar histórico de pedidos
function renderOrderHistory() {
    const container = document.getElementById('order-history');
    if (!container) return;
    
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    
    if (orders.length === 0) {
        container.innerHTML = '<p class="no-orders">Você ainda não fez nenhum pedido.</p>';
        return;
    }
    
    // Ordenar por data (mais recente primeiro)
    orders.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    container.innerHTML = '';
    
    orders.forEach(order => {
        const orderElement = document.createElement('div');
        orderElement.className = 'order-card';
        orderElement.innerHTML = `
            <div class="order-header">
                <h4>Pedido #${order.id}</h4>
                <span class="order-status ${order.status}">${getStatusText(order.status)}</span>
            </div>
            <div class="order-details">
                <p><strong>Data:</strong> ${formatDate(order.date)}</p>
                <p><strong>Total:</strong> R$ ${order.total.toFixed(2)}</p>
                <p><strong>Itens:</strong> ${order.items.length} produto(s)</p>
            </div>
            <div class="order-actions">
                <button class="btn-secondary view-order-details" data-id="${order.id}">Ver Detalhes</button>
                ${order.status === 'delivered' ? '<button class="btn-secondary exchange-request" data-id="${order.id}">Solicitar Troca</button>' : ''}
            </div>
        `;
        container.appendChild(orderElement);
    });
    
    // Adicionar event listeners para os botões
    document.querySelectorAll('.view-order-details').forEach(button => {
        button.addEventListener('click', function() {
            const orderId = parseInt(this.getAttribute('data-id'));
            showOrderDetails(orderId);
        });
    });
    
    document.querySelectorAll('.exchange-request').forEach(button => {
        button.addEventListener('click', function() {
            const orderId = parseInt(this.getAttribute('data-id'));
            initExchangeRequest(orderId);
        });
    });
}

// Obter texto do status
function getStatusText(status) {
    const statusMap = {
        'processing': 'Processando',
        'shipped': 'Enviado',
        'delivered': 'Entregue',
        'cancelled': 'Cancelado'
    };
    
    return statusMap[status] || status;
}

// Formatar data
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR');
}

// Mostrar detalhes do pedido
function showOrderDetails(orderId) {
    const orders = JSON.parse(localStorage.getItem('orders')) || [];
    const order = orders.find(o => o.id === orderId);
    
    if (!order) return;
    
    // Criar modal de detalhes
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'order-details-modal';
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2>Detalhes do Pedido #${order.id}</h2>
            
            <div class="order-info">
                <h3>Informações do Pedido</h3>
                <p><strong>Status:</strong> <span class="order-status ${order.status}">${getStatusText(order.status)}</span></p>
                <p><strong>Data:</strong> ${formatDate(order.date)}</p>
                <p><strong>Forma de Pagamento:</strong> ${getPaymentMethodText(order.paymentMethod)}</p>
            </div>
            
            <div class="shipping-info">
                <h3>Endereço de Entrega</h3>
                <p>${order.shippingAddress.name}</p>
                <p>${order.shippingAddress.address}</p>
                <p>${order.shippingAddress.city} - ${order.shippingAddress.state}</p>
                <p>CEP: ${order.shippingAddress.zip}</p>
            </div>
            
            <div class="order-items">
                <h3>Itens do Pedido</h3>
                <div class="items-list">
                    ${order.items.map(item => `
                        <div class="order-item">
                            <img src="${item.image}" alt="${item.name}">
                            <div class="item-details">
                                <h4>${item.name}</h4>
                                <p>Quantidade: ${item.quantity}</p>
                                <p>Preço unitário: R$ ${item.price.toFixed(2)}</p>
                            </div>
                            <div class="item-total">
                                R$ ${(item.price * item.quantity).toFixed(2)}
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="order-totals">
                <p><strong>Subtotal:</strong> R$ ${order.subtotal.toFixed(2)}</p>
                <p><strong>Frete:</strong> R$ ${order.shipping.toFixed(2)}</p>
                <p class="total"><strong>Total:</strong> R$ ${order.total.toFixed(2)}</p>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Mostrar modal
    modal.style.display = 'block';
    
    // Fechar modal
    const closeBtn = modal.querySelector('.close-modal');
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.removeChild(modal);
    });
    
    // Fechar ao clicar fora
    window.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.removeChild(modal);
        }
    });
}

// Obter texto do método de pagamento
function getPaymentMethodText(method) {
    const methodMap = {
        'credit-card': 'Cartão de Crédito',
        'boleto': 'Boleto Bancário',
        'pix': 'PIX',
        'debit': 'Cartão de Débito'
    };
    
    return methodMap[method] || method;
}

// Iniciar solicitação de troca
function initExchangeRequest(orderId) {
    // Implementar lógica de troca
    showMessage('Funcionalidade de troca em desenvolvimento.', 'success');
}

// Formulário da conta
function initAccountForm() {
    const accountForm = document.getElementById('account-form');
    if (!accountForm) return;
    
    // Carregar dados salvos
    const savedData = JSON.parse(localStorage.getItem('accountData'));
    if (savedData) {
        Object.keys(savedData).forEach(key => {
            const field = document.getElementById(`account-${key}`);
            if (field) {
                field.value = savedData[key];
            }
        });
    }
    
    // Salvar dados
    accountForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('account-name').value,
            email: document.getElementById('account-email').value,
            phone: document.getElementById('account-phone').value,
            address: document.getElementById('account-address').value,
            city: document.getElementById('account-city').value,
            state: document.getElementById('account-state').value,
            zip: document.getElementById('account-zip').value
        };
        
        localStorage.setItem('accountData', JSON.stringify(formData));
        showMessage('Dados atualizados com sucesso!', 'success');
    });
}

// Exportar funções para uso global
window.cartFunctions = {
    initCheckout,
    renderCheckoutItems,
    calculateShipping,
    initCheckoutForm,
    processPayment,
    initAccountPage,
    renderOrderHistory,
    showOrderDetails
};
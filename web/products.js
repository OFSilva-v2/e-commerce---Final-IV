// Dados dos produtos - 3 linhas com 4 produtos cada
const products = [
    // Linha 1: Tênis Esportivos
    {
        id: 1,
        name: "Tênis Esportivo Nike Air Max 270",
        category: "tenis",
        price: 349.90,
        oldPrice: 499.90,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
        description: "Tênis esportivo com amortecimento Air Max para máximo conforto durante atividades físicas e uso casual.",
        sizes: ["38", "39", "40", "41", "42", "43"],
        colors: ["Preto", "Branco", "Azul"],
        brand: "Nike",
        material: "Mesh e Sintético",
        stock: 15,
        rating: 4.5,
        reviews: 28
    },
    {
        id: 2,
        name: "Tênis Adidas Ultraboost 22",
        category: "tenis",
        price: 429.90,
        oldPrice: 599.90,
        image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
        description: "Tecnologia Boost para retorno de energia a cada passo. Ideal para corrida e caminhada.",
        sizes: ["37", "38", "39", "40", "41", "42"],
        colors: ["Preto", "Cinza", "Verde"],
        brand: "Adidas",
        material: "Primeknit",
        stock: 8,
        rating: 4.8,
        reviews: 42
    },
    {
        id: 3,
        name: "Tênis Puma RS-X³",
        category: "tenis",
        price: 279.90,
        oldPrice: 399.90,
        image: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
        description: "Design arrojado com solado emborrachado de alta durabilidade. Estilo retrô moderno.",
        sizes: ["36", "37", "38", "39", "40", "41"],
        colors: ["Vermelho", "Branco", "Preto"],
        brand: "Puma",
        material: "Couro Sintético",
        stock: 12,
        rating: 4.3,
        reviews: 19
    },
    {
        id: 4,
        name: "Tênis New Balance 574 Core",
        category: "tenis",
        price: 319.90,
        oldPrice: 459.90,
        image: "https://images.unsplash.com/photo-1543508282-6319a3e2621f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
        description: "Clássico retrô com entressola EVA para conforto durante todo o dia. Versátil e atemporal.",
        sizes: ["38", "39", "40", "41", "42", "43", "44"],
        colors: ["Cinza", "Azul", "Marrom"],
        brand: "New Balance",
        material: "Suede e Mesh",
        stock: 20,
        rating: 4.6,
        reviews: 35
    },
    
    // Linha 2: Sapatos Sociais
    {
        id: 5,
        name: "Sapato Social Derby Preto Couro",
        category: "sapatos",
        price: 249.90,
        oldPrice: 349.90,
        image: "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
        description: "Sapato social em couro legítimo, perfeito para ocasiões formais e trabalho. Acabamento impecável.",
        sizes: ["38", "39", "40", "41", "42"],
        colors: ["Preto", "Marrom"],
        brand: "Caligaris",
        material: "Couro Legítimo",
        stock: 10,
        rating: 4.4,
        reviews: 22
    },
    {
        id: 6,
        name: "Sapato Oxford Marrom Envernizado",
        category: "sapatos",
        price: 299.90,
        oldPrice: 429.90,
        image: "https://images.unsplash.com/photo-1463100099107-aa0980c362e6?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
        description: "Oxford em couro envernizado com acabamento premium. Ideal para eventos formais.",
        sizes: ["39", "40", "41", "42", "43"],
        colors: ["Marrom", "Preto"],
        brand: "Dublin",
        material: "Couro Envernizado",
        stock: 6,
        rating: 4.7,
        reviews: 18
    },
    {
        id: 7,
        name: "Sapato Social Double Monk Strap",
        category: "sapatos",
        price: 399.90,
        oldPrice: 549.90,
        image: "https://images.unsplash.com/photo-1531315630201-bb15abeb1653?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
        description: "Modelo double monk strap com fivela dupla em metal. Sofisticação e estilo diferenciado.",
        sizes: ["40", "41", "42", "43"],
        colors: ["Preto", "Marrom", "Azul Escuro"],
        brand: "Via Uno",
        material: "Couro Italiano",
        stock: 4,
        rating: 4.9,
        reviews: 15
    },
    {
        id: 8,
        name: "Sapato Social Bicolor Casual",
        category: "sapatos",
        price: 279.90,
        oldPrice: 399.90,
        image: "https://images.unsplash.com/photo-1529408686214-b48b8532f72c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
        description: "Design moderno com combinação de cores e solado flexível. Perfeito para o dia a dia.",
        sizes: ["38", "39", "40", "41", "42", "43"],
        colors: ["Preto/Branco", "Marrom/Bege"],
        brand: "Moleca",
        material: "Couro e Tecido",
        stock: 15,
        rating: 4.2,
        reviews: 27
    },
    
    // Linha 3: Bolsas e Acessórios
    {
        id: 9,
        name: "Bolsa de Trabalho Executiva Premium",
        category: "bolsas",
        price: 189.90,
        oldPrice: 269.90,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
        description: "Bolsa executiva em couro sintético com múltiplos compartimentos para organização.",
        sizes: ["Único"],
        colors: ["Preto", "Marrom", "Cinza"],
        brand: "Tasch",
        material: "Couro Sintético",
        stock: 18,
        rating: 4.5,
        reviews: 31
    },
    {
        id: 10,
        name: "Mochila Notebook Antifurto 15.6''",
        category: "bolsas",
        price: 159.90,
        oldPrice: 229.90,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
        description: "Mochila com compartimento acolchoado para notebook até 15.6 polegadas. Sistema antifurto.",
        sizes: ["Único"],
        colors: ["Preto", "Azul Escuro", "Verde Militar"],
        brand: "Mochila Top",
        material: "Nylon Resistente",
        stock: 22,
        rating: 4.6,
        reviews: 45
    },
    {
        id: 11,
        name: "Bolsa Tote Grande Feminina Couro",
        category: "bolsas",
        price: 129.90,
        oldPrice: 189.90,
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
        description: "Bolsa tote espaçosa com alças longas e bolso interno com zíper. Versátil e prática.",
        sizes: ["Único"],
        colors: ["Bege", "Preto", "Vermelho"],
        brand: "Bolsas & Cia",
        material: "Couro Sintético",
        stock: 14,
        rating: 4.3,
        reviews: 23
    },
    {
        id: 12,
        name: "Necessaire de Viagem Organizadora",
        category: "bolsas",
        price: 79.90,
        oldPrice: 119.90,
        image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
        description: "Necessaire organizadora com múltiplos compartimentos para viagem. Impermeável.",
        sizes: ["Pequena", "Média", "Grande"],
        colors: ["Preto", "Cinza", "Azul Marinho"],
        brand: "Viagem Segura",
        material: "Nylon Impermeável",
        stock: 30,
        rating: 4.7,
        reviews: 38
    }
];

// Função para obter produtos por categoria
function getProductsByCategory(category) {
    if (category === 'all') return products;
    return products.filter(product => product.category === category);
}

// Função para obter produto por ID
function getProductById(id) {
    return products.find(product => product.id === id);
}

// Função para renderizar produtos
function renderProducts(productsArray, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    if (productsArray.length === 0) {
        container.innerHTML = '<p class="no-products">Nenhum produto encontrado.</p>';
        return;
    }
    
    productsArray.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-img">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <div class="product-price">
                    <span class="old-price">R$ ${product.oldPrice.toFixed(2)}</span>
                    <span class="current-price">R$ ${product.price.toFixed(2)}</span>
                </div>
                <div class="product-rating">
                    <i class="fas fa-star"></i>
                    <span>${product.rating} (${product.reviews})</span>
                </div>
                <button class="btn-primary add-to-cart" data-id="${product.id}">Adicionar ao Carrinho</button>
            </div>
        `;
        container.appendChild(productCard);
    });
}

// Função para renderizar produtos em destaque na página inicial
function renderFeaturedProducts() {
    const container = document.getElementById('featured-products');
    if (!container) return;
    
    // Selecionar 6 produtos aleatórios
    const shuffledProducts = [...products].sort(() => 0.5 - Math.random());
    const featuredProducts = shuffledProducts.slice(0, 6);
    
    renderProducts(featuredProducts, 'featured-products');
}

// Exportar funções para uso global
window.productsData = {
    products,
    getProductsByCategory,
    getProductById,
    renderProducts,
    renderFeaturedProducts
};
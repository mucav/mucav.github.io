// Common JavaScript for MUCAV Website

// Shopping Cart Functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function addToCart(productId) {
    const product = products.find(p => p.id == productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id == productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({...product, quantity: 1});
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${product.name} sepete eklendi!`);
}

function updateCartCount() {
    const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-count').forEach(el => {
        el.textContent = cartCount;
    });
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    
    // Add event listeners to all add-to-cart buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', function() {
            const productId = this.getAttribute('data-id');
            addToCart(productId);
        });
    });
});

// Mobile menu toggle - fixed version
document.querySelector('.navbar-toggler').addEventListener('click', function() {
    const navbar = document.querySelector('#navbarNav');
    if (navbar.classList.contains('show')) {
        navbar.classList.remove('show');
        // Add animation for smooth closing
        navbar.style.height = navbar.scrollHeight + 'px';
        setTimeout(() => {
            navbar.style.height = '0';
            setTimeout(() => {
                navbar.style.overflow = 'hidden';
            }, 300);
        }, 10);
    } else {
        navbar.style.display = 'block';
        navbar.style.height = '0';
        navbar.style.overflow = 'hidden';
        navbar.classList.add('show');
        setTimeout(() => {
            navbar.style.height = navbar.scrollHeight + 'px';
            setTimeout(() => {
                navbar.style.height = 'auto';
            }, 300);
        }, 10);
    }
});

// Close menu when clicking outside
document.addEventListener('click', function(event) {
    const navbar = document.querySelector('#navbarNav');
    const toggler = document.querySelector('.navbar-toggler');
    if (navbar.classList.contains('show') &&
        !navbar.contains(event.target) &&
        !toggler.contains(event.target)) {
        navbar.classList.remove('show');
    }
});
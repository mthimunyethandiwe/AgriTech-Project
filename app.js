// Fetch and display products
async function fetchProducts() {
    const response = await fetch('/api/products/');
    const products = await response.json();
    const productsDiv = document.getElementById('Products');

    // Clear existing products
    productsDiv.innerHTML = '';

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.textContent = `${product.name} (${product.category}) - $${product.price}`;
        productsDiv.appendChild(productElement);
    });
}

// Handle form submission to add a new product
document.getElementById('Product-Form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('product-name').value;
    const category = document.getElementById('category').value;
    const price = document.getElementById('price').value;

    const response = await fetch('/api/products/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, category, price }),
    });

    if (response.ok) {
        // Clear the form fields
        document.getElementById('Product-Form').reset();
        // Fetch products again to update the list
        fetchProducts();
    } else {
        alert('Failed to add product');
    }
});

fetchProducts();

fetch('http://127.0.0.1:5500/api/products/', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(product),
})

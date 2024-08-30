// Fungsi untuk menghitung total harga
function calculateTotalPrice() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalPrice = cart.reduce((total, product) => total + (product.price * product.quantity), 0);
    document.getElementById('total-price').textContent = 'Rp' + totalPrice.toLocaleString();
}

// Fungsi untuk checkout
function checkout() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        alert('Keranjang Anda kosong. Tambahkan produk sebelum checkout.');
        return;
    }

    // Arahkan pengguna ke halaman pembayaran
    window.location.href = 'payment.html';
}

// Fungsi untuk menambah produk ke keranjang
function addToCart(productId, productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let product = cart.find(item => item.id === productId);

    if (product) {
        product.quantity++;
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

// Fungsi untuk memperbarui tampilan jumlah item di keranjang
function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartCount = cart.reduce((total, product) => total + product.quantity, 0);
    document.getElementById('cart-count').textContent = cartCount;
}

// Fungsi untuk mengambil isi keranjang dan menampilkannya di halaman keranjang
function displayCartItems() {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    let cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Keranjang Anda kosong.</p>';
        return;
    }

    cart.forEach(product => {
        let item = document.createElement('div');
        item.className = 'cart-item';
        item.innerHTML = `
            <h3>${product.name}</h3>
            <p>Harga: Rp${product.price.toLocaleString()}</p>
            <p>Jumlah: ${product.quantity}</p>
            <button onclick="removeFromCart(${product.id})">Hapus</button>
        `;
        cartItemsContainer.appendChild(item);
    });
}

// Fungsi untuk menghapus produk dari keranjang
function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));

    displayCartItems();
    updateCartCount();
    calculateTotalPrice();
}

// Panggil updateCartCount saat halaman dimuat
document.addEventListener('DOMContentLoaded', updateCartCount);

function processPayment(event) {
    event.preventDefault(); // Mencegah form dari refresh halaman
    document.getElementById('payment-loading').style.display = 'block'; // Menampilkan indikator proses
    setTimeout(() => {
        alert('Pembayaran berhasil! Terima kasih telah berbelanja.');
        localStorage.removeItem('cart'); // Hapus keranjang setelah pembayaran
        updateCartCount(); // Perbarui jumlah item di keranjang
        window.location.href = 'index.html'; // Arahkan pengguna ke halaman utama setelah pembayaran
    }, 2000); // Simulasi pemrosesan pembayaran dengan delay 2 detik
}


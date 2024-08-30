// script.js

// Array untuk menyimpan produk dalam keranjang
let cart = [];

// Fungsi untuk menambahkan produk ke keranjang
function addToCart(productName, productPrice) {
    cart.push({name: productName, price: productPrice});
    alert(productName + " telah ditambahkan ke keranjang.");
    updateCartCount();
}

// Fungsi untuk memperbarui jumlah item di keranjang
function updateCartCount() {
    document.getElementById("cart-count").innerText = cart.length;
}
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


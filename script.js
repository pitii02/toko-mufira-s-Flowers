

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Array untuk menyimpan item keranjang
let cartItems = [];
const cartCount = document.getElementById('cart-count');

// Fungsi untuk menambahkan produk ke keranjang
function addToCart(productName, productPrice) {
    // Tambahkan produk ke array keranjang
    cartItems.push({ name: productName, price: productPrice });
    console.log(cartItems); // Ini untuk memverifikasi bahwa item ditambahkan ke keranjang
    updateCartCount();
    updateCartDisplay(); // Perbarui tampilan keranjang setelah menambahkan item
}

// Fungsi untuk memperbarui jumlah item di keranjang
function updateCartCount() {
    cartCount.textContent = cartItems.length;
}

// Fungsi untuk memperbarui tampilan keranjang
function updateCartDisplay() {
    const cartModal = document.getElementById('cart-items');
    cartModal.innerHTML = ""; // Kosongkan daftar sebelum memperbarui

    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.textContent = `${item.name} - ${item.price}`;
        cartModal.appendChild(cartItem);
    });
}

// Event listener untuk tombol 'Tambah ke Keranjang'
const addToCartButtons = document.querySelectorAll('.add-to-cart');
addToCartButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
        const product = button.closest('.product-item');
        const productName = product.querySelector('h4').textContent;
        const productPrice = product.querySelector('p').textContent;

        addToCart(productName, productPrice);
    });
});

// Smooth scrolling ketika tautan navigasi diklik
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Jika menggunakan modal untuk keranjang
document.querySelector('.cart a').addEventListener('click', function(event) {
    event.preventDefault();  // Mencegah link default
    // Tampilkan modal keranjang
    document.getElementById('cart-modal').style.display = 'block';
});

function updateCartDisplay() {
    const cartModal = document.getElementById('cart-items');
    cartModal.innerHTML = ""; // Kosongkan daftar sebelum memperbarui

    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.textContent = `${item.name} - ${item.price}`;
        cartModal.appendChild(cartItem);
    });
}

// Fungsi untuk menghitung total harga keranjang
function calculateTotal() {
    return cartItems.reduce((total, item) => {
        // Hapus format 'Rp ' dan konversi harga ke angka
        const price = parseFloat(item.price.replace('Rp ', '').replace(',', ''));
        return total + price;
    }, 0);
}


// Fungsi untuk memperbarui tampilan keranjang dan total harga
function updateCartDisplay() {
    const cartModal = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartModal.innerHTML = ""; // Kosongkan daftar sebelum memperbarui

    cartItems.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.textContent = `${item.name} - ${item.price}`;
        cartModal.appendChild(cartItem);
    });

    //Update total harga
    const total = calculateTotal();
    cartTotal.textContent = `Total: Rp ${total.toLocaleString('id-ID')}`;
}

// Event listener untuk tombol checkout
document.getElementById('checkout-btn').addEventListener('click', function() {
    showPaymentForm();
});


// Fungsi untuk menampilkan form pembayaran
function showPaymentForm() {
    const paymentForm = document.getElementById('payment-form');
    paymentForm.style.display = 'block'; // Menampilkan form pembayaran
}

// Fungsi untuk memproses pembayaran
function processPayment() {
    const name = document.getElementById('name').value;
    const address = document.getElementById('address').value;
    const paymentMethod = document.getElementById('payment-method').value;
    const total = calculateTotal();

    // Misalnya: Menampilkan konfirmasi
    alert(`Terima kasih, ${name}. Pembayaran sebesar Rp ${total} telah diproses menggunakan metode ${paymentMethod}. Barang akan dikirim ke ${address}.`);

    // Kosongkan keranjang setelah pembayaran berhasil
    cartItems = [];
    updateCartCount();
    updateCartDisplay();

    // Sembunyikan form pembayaran
    document.getElementById('payment-form').style.display = 'none';

    return false; // Untuk mencegah reload halaman setelah submit
}

// Fungsi untuk menyimpan data pembelian ke localStorage
function savePurchaseData(name, address, paymentMethod, total) {
    const purchaseData = {
        name: name,
        address: address,
        paymentMethod: paymentMethod,
        total: total,
        items: cartItems
    };

    // Simpan data ke localStorage
    localStorage.setItem('purchase', JSON.stringify(purchaseData));
}



// checkout.js
document.addEventListener('DOMContentLoaded', function() {
  // Ambil data yang dikirim dari halaman produk
  const data = JSON.parse(localStorage.getItem('orderData'));

  if (data) {
    // Tampilkan ulang data di halaman checkout
    document.getElementById('checkout-unit-price').textContent = data.price;
    document.getElementById('checkout-qty').textContent = data.qty + 'x';
    document.getElementById('checkout-item-count').textContent = data.qty;
    document.getElementById('checkout-total-price').textContent = data.total;
    document.getElementById('summary-subtotal').textContent = data.total;

    // Hitung ulang total akhir (Subtotal + 20.000 + 20.000)
    const grandTotal = data.amount + 20000 + 20000;
    document.getElementById('summary-grand-total').textContent = 'Rp' + grandTotal.toLocaleString('id-ID');
  }
});
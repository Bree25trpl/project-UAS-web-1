// ============================================
// PRODUK.JS - SUDAH FIX (dengan dua tombol & redirect)
// ============================================

const HARGA_SATUAN = 200000;

function updateTotalHarga(jumlah) {
  const totalHarga = jumlah * HARGA_SATUAN;
  document.getElementById('totalPrice').textContent = 'Rp' + totalHarga.toLocaleString('id-ID');
}

function ubahJumlah(delta) {
  const input = document.getElementById('qtyInput');
  let jumlah = parseInt(input.value, 10);

  if (isNaN(jumlah)) jumlah = 1;
  jumlah += delta;
  if (jumlah < 1) jumlah = 1;

  input.value = jumlah;
  updateTotalHarga(jumlah);
}

document.getElementById('qtyInput').addEventListener('input', function () {
  let jumlah = parseInt(this.value, 10);
  if (isNaN(jumlah) || jumlah < 1) jumlah = 1;
  this.value = jumlah;
  updateTotalHarga(jumlah);
});

// ===== TOMBOL ADD TO CART (simpan & langsung ke cart) =====
document.getElementById('addToCartBtn').addEventListener('click', function () {
  const qty = parseInt(document.getElementById('qtyInput').value);
  const totalString = document.getElementById('totalPrice').textContent;
  const amount = parseInt(totalString.replace(/[^0-9]/g, ''));

  const item = {
    name: 'Mangkok Sri Baduga',   // sesuaikan dengan produk sebenarnya
    price: HARGA_SATUAN,
    qty: qty,
    total: totalString,
    amount: amount,
    image: document.querySelector('.product-image img').src
  };

  // Ambil cart yang sudah ada, tambahkan item
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart.push(item);
  localStorage.setItem('cart', JSON.stringify(cart));

  // Langsung redirect ke halaman cart
  window.location.href = 'cart.html';
});

// ===== TOMBOL PURCHASE (tetap ke checkout) =====
document.getElementById('purchaseBtn').addEventListener('click', function () {
  const qty = parseInt(document.getElementById('qtyInput').value);
  const totalString = document.getElementById('totalPrice').textContent;
  const amount = parseInt(totalString.replace(/[^0-9]/g, ''));

  const orderData = {
    name: 'Mangkok Sri Baduga',
    price: HARGA_SATUAN,
    qty: qty,
    total: totalString,
    amount: amount
  };

  localStorage.setItem('orderData', JSON.stringify(orderData));
  window.location.href = 'checkout.html';
});

// ===== INISIALISASI JUMLAH SAAT HALAMAN DIMUAT =====
document.addEventListener('DOMContentLoaded', function () {
  const data = JSON.parse(localStorage.getItem('orderData'));

  if (data && data.qty) {
    document.getElementById('qtyInput').value = data.qty;
    updateTotalHarga(data.qty);
  } else {
    document.getElementById('qtyInput').value = 1;
    updateTotalHarga(1);
  }
});
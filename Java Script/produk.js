// ============================================
// PRODUK.JS - SUDAH FIX
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

document.getElementById('qtyInput').addEventListener('input', function() {
  let jumlah = parseInt(this.value, 10);
  if (isNaN(jumlah) || jumlah < 1) jumlah = 1;
  this.value = jumlah;
  updateTotalHarga(jumlah);
});

document.querySelector('.button-group button:last-child').addEventListener('click', function(e) {
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
  console.log('Data disimpan:', orderData);

  window.location.href = 'checkout.html';
});

document.addEventListener('DOMContentLoaded', function() {
  const data = JSON.parse(localStorage.getItem('orderData'));

  if (data && data.qty) {
    document.getElementById('qtyInput').value = data.qty;
    updateTotalHarga(data.qty);
  } else {
    document.getElementById('qtyInput').value = 1;
    updateTotalHarga(1);
  }
});
// produk.js
function ubahJumlah(delta) {
  const input = document.getElementById('qtyInput');
  let jumlah = parseInt(input.value, 10);

  if (isNaN(jumlah)) jumlah = 1;
  jumlah += delta;
  if (jumlah < 1) jumlah = 1;
  input.value = jumlah;

  const hargaSatuan = 200000;
  const totalHarga = jumlah * hargaSatuan;
  document.getElementById('totalPrice').textContent = 'Rp' + totalHarga.toLocaleString('id-ID');
}

// Event listener jika user mengetik langsung angkanya
document.getElementById('qtyInput').addEventListener('input', function() {
  let jumlah = parseInt(this.value, 10);
  if (isNaN(jumlah) || jumlah < 1) jumlah = 1;
  this.value = jumlah;

  const totalHarga = jumlah * 200000;
  document.getElementById('totalPrice').textContent = 'Rp' + totalHarga.toLocaleString('id-ID');
});

// --- TAMBAHAN: SIMPAN DATA SAAT TOMBOL PURCHASE DIKLIK ---
// Kita pilih tombol Purchase (tombol terakhir di grup)
document.querySelector('.button-group button:last-child').addEventListener('click', function(e) {
  // Ambil jumlah barang dari input
  const qty = parseInt(document.getElementById('qtyInput').value);
  
  // Ambil total harga yang sudah terformat (contoh: "Rp200.000")
  const totalString = document.getElementById('totalPrice').textContent;
  
  // Ubah string Rupiah menjadi angka murni (hilangkan "Rp" dan titik)
  const amount = parseInt(totalString.replace(/[^0-9]/g, ''));

  // Simpan data ke localStorage
  localStorage.setItem('orderData', JSON.stringify({
    name: 'Mangkok Sri Baduga',
    price: 'Rp200.000',
    qty: qty,
    total: totalString,
    amount: amount  // angka murni untuk perhitungan ongkir
  }));

  // Redirect ke halaman checkout
  window.location.href = 'checkout.html';
});
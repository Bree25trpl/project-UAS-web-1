// ============================================
// CHECKOUT.JS - FIX JUMLAH & HARGA
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  // Ambil data dari localStorage
  const data = JSON.parse(localStorage.getItem('orderData'));

  console.log('Data di checkout:', data);

  if (data && data.qty) {
    // === UPDATE BAGIAN PRODUCT ===
    // Cari elemen harga dan qty di bagian product
    const priceQtyElements = document.querySelectorAll('.price-qty span');
    if (priceQtyElements.length >= 2) {
      priceQtyElements[0].textContent = data.total || 'Rp' + (data.qty * data.price).toLocaleString('id-ID');
      priceQtyElements[1].textContent = data.qty + 'x';
    }

    // === UPDATE ORDER TOTAL ===
    const orderTotal = document.querySelector('.order-total');
    if (orderTotal) {
      const totalSpan = orderTotal.querySelector('span');
      const totalStrong = orderTotal.querySelector('strong');
      if (totalSpan) {
        totalSpan.innerHTML = 'Total (<span id="checkout-item-count">' + data.qty + '</span> item)';
      }
      if (totalStrong) {
        totalStrong.textContent = data.total || 'Rp' + (data.qty * data.price).toLocaleString('id-ID');
      }
    }

    // === UPDATE SUMMARY ===
    const subtotalElement = document.getElementById('summary-subtotal');
    if (subtotalElement) {
      subtotalElement.textContent = data.total || 'Rp' + (data.qty * data.price).toLocaleString('id-ID');
    }

    // Hitung grand total
    const amount = data.amount || (data.qty * data.price);
    const shippingCost = 20000;
    const serviceFee = 20000;
    const grandTotal = amount + shippingCost + serviceFee;

    const grandTotalElement = document.getElementById('summary-grand-total');
    if (grandTotalElement) {
      grandTotalElement.textContent = 'Rp' + grandTotal.toLocaleString('id-ID');
    }

  } else {
    // Tidak ada data
    const priceQtyElements = document.querySelectorAll('.price-qty span');
    if (priceQtyElements.length >= 2) {
      priceQtyElements[0].textContent = 'Rp0';
      priceQtyElements[1].textContent = '0x';
    }

    const orderTotal = document.querySelector('.order-total');
    if (orderTotal) {
      const totalSpan = orderTotal.querySelector('span');
      const totalStrong = orderTotal.querySelector('strong');
      if (totalSpan) {
        totalSpan.innerHTML = 'Total (<span id="checkout-item-count">0</span> item)';
      }
      if (totalStrong) {
        totalStrong.textContent = 'Rp0';
      }
    }

    document.getElementById('summary-subtotal').textContent = 'Rp0';
    document.getElementById('summary-grand-total').textContent = 'Rp40.000';
    
    alert('Tidak ada data pesanan. Silahkan pilih produk terlebih dahulu.');
  }
});

// --- TOMBOL BAYAR ---
const bayarBtn = document.querySelector('.btn-bayar');
if (bayarBtn) {
  bayarBtn.addEventListener('click', function() {
    const data = JSON.parse(localStorage.getItem('orderData'));
    
    if (data) {
      alert('Pembayaran berhasil!\n\n' +
            'Produk: ' + data.name + '\n' +
            'Jumlah: ' + data.qty + '\n' +
            'Total: ' + data.total + '\n\n' +
            'Terima kasih sudah berbelanja! 🎉');
      
      localStorage.removeItem('orderData');
      window.location.href = 'index.html';
    } else {
      alert('Tidak ada data pesanan!');
    }
  });
}

// --- SHIPPING OPTION ---
const shippingRadios = document.querySelectorAll('input[name="shipping"]');
shippingRadios.forEach(function(radio) {
  radio.addEventListener('change', function() {
    const data = JSON.parse(localStorage.getItem('orderData'));
    
    if (data) {
      let shippingCost = 20000;
      if (this.value === 'gosend') {
        shippingCost = 15000;
      } else if (this.value === 'jnt') {
        shippingCost = 25000;
      }
      
      const amount = data.amount || (data.qty * data.price);
      const serviceFee = 20000;
      const grandTotal = amount + shippingCost + serviceFee;
      
      const grandTotalElement = document.getElementById('summary-grand-total');
      if (grandTotalElement) {
        grandTotalElement.textContent = 'Rp' + grandTotal.toLocaleString('id-ID');
      }
    }
  });
});
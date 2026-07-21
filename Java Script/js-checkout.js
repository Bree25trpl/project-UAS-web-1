// ============================================
// CHECKOUT.JS - FIX JUMLAH & HARGA
// ============================================

document.addEventListener('DOMContentLoaded', function() {
  // Ambil data dari localStorage
  const items = JSON.parse(localStorage.getItem('checkoutItems'));
  const address = JSON.parse(localStorage.getItem('checkoutAddress'));

  console.log('Items di checkout:', items);
  console.log('Address di checkout:', address);

  // Tampilkan alamat
  if (address) {
    const customerInfo = document.querySelector('.customer-info');
    if (customerInfo) {
      customerInfo.innerHTML = `
        <h4>${address.name}</h4>
        <p>${address.address}</p>
        <p>${address.city}, ${address.zip}</p>
        <p>📞 ${address.phone}</p>
      `;
    }
  }

  // Hitung total dari semua item yang dipilih
  let totalQty = 0;
  let totalPrice = 0;
  let selectedItems = [];

  if (items && items.length > 0) {
    items.forEach(item => {
      totalQty += item.qty;
      totalPrice += item.price * item.qty;
      selectedItems.push(item);
    });

    // Tampilkan produk pertama (atau semua)
    const productContainer = document.querySelector('.product');
    if (productContainer && items.length > 0) {
      const firstItem = items[0];
      const productImage = productContainer.querySelector('.product-image img');
      const productName = productContainer.querySelector('.product-info h4');
      const productDesc = productContainer.querySelector('.product-info p');
      const priceSpan = document.getElementById('checkout-unit-price');
      const qtySpan = document.getElementById('checkout-qty');

      if (productImage) productImage.src = firstItem.image || 'gambar/aca74648293e2d81636180a760c38c08.jpg';
      if (productName) productName.textContent = firstItem.name;
      if (productDesc) productDesc.textContent = items.length > 1 ? `${items.length} produk dipilih` : firstItem.name;
      if (priceSpan) priceSpan.textContent = 'Rp' + firstItem.price.toLocaleString('id-ID');
      if (qtySpan) qtySpan.textContent = firstItem.qty + 'x';
    }

    // Update order total
    const orderTotal = document.querySelector('.order-total');
    if (orderTotal) {
      const totalSpan = orderTotal.querySelector('span');
      const totalStrong = orderTotal.querySelector('strong');
      if (totalSpan) {
        totalSpan.innerHTML = 'Total (<span id="checkout-item-count">' + totalQty + '</span> item)';
      }
      if (totalStrong) {
        totalStrong.textContent = 'Rp' + totalPrice.toLocaleString('id-ID');
      }
    }

    // Update summary
    const subtotalElement = document.getElementById('summary-subtotal');
    if (subtotalElement) {
      subtotalElement.textContent = 'Rp' + totalPrice.toLocaleString('id-ID');
    }

    // Simpan data untuk perhitungan
    window.checkoutData = {
      items: items,
      totalQty: totalQty,
      totalPrice: totalPrice,
      shippingCost: 0,
      serviceFee: 0,
      selectedPayment: null,
      selectedShipping: null
    };

    updateGrandTotal();

  } else {
    // Tidak ada data
    alert('Tidak ada data pesanan. Silahkan pilih produk terlebih dahulu.');
    window.location.href = 'cart.html';
  }

  // --- SHIPPING OPTION ---
  const shippingRadios = document.querySelectorAll('input[name="shipping"]');
  shippingRadios.forEach(function(radio) {
    radio.addEventListener('change', function() {
      let shippingCost = 0;
      if (this.value === 'gosend') {
        shippingCost = 15000;
      } else if (this.value === 'jnt') {
        shippingCost = 25000;
      }
      
      if (window.checkoutData) {
        window.checkoutData.shippingCost = shippingCost;
        window.checkoutData.selectedShipping = this.value;
        updateGrandTotal();
      }
    });
  });

  // --- PAYMENT METHOD dengan SERVICE FEE ---
  const paymentButtons = document.querySelectorAll('.payment-list button');
  
  // Definisikan biaya layanan untuk setiap metode pembayaran
  const paymentFees = {
    'BRI': 0,
    'BCA': 0,
    'Mandiri': 0,
    'BNI': 0,
    'PayPal': 5000,
    'Dana': 2000,
    'OVO': 2000,
    'GoPay': 3000,
    'ShopeePay': 3000
  };

  paymentButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      // Remove active class from all
      paymentButtons.forEach(b => b.classList.remove('active'));
      // Add active class to clicked
      this.classList.add('active');
      
      // Get payment method name - AMBIL DARI NODE PERTAMA (tanpa badge)
      let paymentMethod = '';
      // Cari text node pertama (hanya nama metode)
      const childNodes = this.childNodes;
      for (let i = 0; i < childNodes.length; i++) {
        if (childNodes[i].nodeType === Node.TEXT_NODE) {
          paymentMethod = childNodes[i].textContent.trim();
          break;
        }
      }
      // Jika tidak ada text node, gunakan textContent (fallback)
      if (!paymentMethod) {
        paymentMethod = this.textContent.trim();
      }
      
      console.log('Metode pembayaran dipilih:', paymentMethod);
      
      // Set service fee berdasarkan metode pembayaran
      const serviceFee = paymentFees[paymentMethod] || 0;
      
      if (window.checkoutData) {
        window.checkoutData.serviceFee = serviceFee;
        window.checkoutData.selectedPayment = paymentMethod;
        updateGrandTotal();
      }
    });
  });

  // --- STICKY SHADOW EFFECT ---
  const summaryCard = document.getElementById('summaryCard');
  
  function handleStickyShadow() {
    if (summaryCard && window.innerWidth > 900) {
      const rect = summaryCard.getBoundingClientRect();
      const isSticky = rect.top <= 100;
      
      if (isSticky) {
        summaryCard.classList.add('sticky-shadow');
      } else {
        summaryCard.classList.remove('sticky-shadow');
      }
    } else if (summaryCard) {
      summaryCard.classList.remove('sticky-shadow');
    }
  }
  
  // Throttle function
  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }
  
  const handleStickyShadowThrottled = throttle(handleStickyShadow, 100);
  window.addEventListener('scroll', handleStickyShadowThrottled);
  window.addEventListener('resize', handleStickyShadow);
  handleStickyShadow();

  // --- TOMBOL BAYAR ---
  const bayarBtn = document.querySelector('.btn-bayar');
  if (bayarBtn) {
    bayarBtn.addEventListener('click', function() {
      if (!window.checkoutData || !window.checkoutData.items) {
        alert('Tidak ada data pesanan!');
        return;
      }

      // Check if payment method selected
      if (!window.checkoutData.selectedPayment) {
        alert('Silakan pilih metode pembayaran terlebih dahulu!');
        return;
      }

      // Check if shipping method selected
      const selectedShipping = document.querySelector('input[name="shipping"]:checked');
      if (!selectedShipping) {
        alert('Silakan pilih metode pengiriman terlebih dahulu!');
        return;
      }

      const data = window.checkoutData;
      const total = data.totalPrice + data.shippingCost + data.serviceFee;
      
      // Get shipping method
      const shippingMethod = selectedShipping.value;

      // Get address
      const address = JSON.parse(localStorage.getItem('checkoutAddress'));
      
      // Format service fee display
      const serviceFeeDisplay = data.serviceFee > 0 ? 'Rp' + data.serviceFee.toLocaleString('id-ID') : 'GRATIS';
      
      alert('✅ Pembayaran Berhasil!\n\n' +
            '📦 ' + data.items.length + ' produk\n' +
            '📦 Total Item: ' + data.totalQty + '\n' +
            '💳 Metode: ' + data.selectedPayment + '\n' +
            '💰 Biaya Layanan: ' + serviceFeeDisplay + '\n' +
            '🚚 Pengiriman: ' + shippingMethod.toUpperCase() + ' (Rp' + data.shippingCost.toLocaleString('id-ID') + ')\n' +
            '💰 Total: Rp' + total.toLocaleString('id-ID') + '\n\n' +
            '📬 Dikirim ke:\n' + 
            (address ? `${address.name}\n${address.address}\n${address.city}, ${address.zip}` : 'Alamat tidak tersedia') +
            '\n\nTerima kasih sudah berbelanja! 🎉');
      
      // Clear checkout data
      localStorage.removeItem('checkoutItems');
      localStorage.removeItem('checkoutAddress');
      localStorage.removeItem('cart');
      
      window.location.href = 'storepage.html';
    });
  }

  function updateGrandTotal() {
    if (!window.checkoutData) return;
    
    const data = window.checkoutData;
    const shippingCost = data.shippingCost || 0;
    const serviceFee = data.serviceFee || 0;
    const grandTotal = data.totalPrice + shippingCost + serviceFee;
    
    // Update shipping cost
    const shippingElement = document.getElementById('summary-shipping');
    if (shippingElement) {
      shippingElement.textContent = 'Rp' + shippingCost.toLocaleString('id-ID');
    }
    
    // Update service fee
    const serviceElement = document.getElementById('summary-service-fee');
    if (serviceElement) {
      if (serviceFee === 0) {
        serviceElement.textContent = 'GRATIS 🎉';
        serviceElement.style.color = '#4CAF50';
        serviceElement.style.fontWeight = '600';
      } else {
        serviceElement.textContent = 'Rp' + serviceFee.toLocaleString('id-ID');
        serviceElement.style.color = '#f57c00';
        serviceElement.style.fontWeight = '600';
      }
    }
    
    // Update grand total
    const grandTotalElement = document.getElementById('summary-grand-total');
    if (grandTotalElement) {
      grandTotalElement.textContent = 'Rp' + grandTotal.toLocaleString('id-ID');
    }
  }
});
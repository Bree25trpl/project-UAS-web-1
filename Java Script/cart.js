// ============================================
// CART.JS - Keranjang Belanja Dinamis
// ============================================

document.addEventListener('DOMContentLoaded', function () {
  const cartContainer = document.getElementById('cartContainer');
  const totalHargaEl = document.getElementById('totalHargaCart');
  const checkedCountEl = document.getElementById('checkedCount');
  const checkoutBtn = document.getElementById('checkoutBtn');

  // Ambil cart dari localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Render semua item
  function renderCart() {
    // Simpan status centang sebelum render ulang
    const checkedStatus = {};
    document.querySelectorAll('.cart-checkbox').forEach(cb => {
      checkedStatus[cb.dataset.index] = cb.checked;
    });

    cartContainer.innerHTML = '';

    if (cart.length === 0) {
      cartContainer.innerHTML =
        '<p style="text-align:center; padding:40px;">Keranjangmu kosong 😢</p>';
      updateTotal();
      return;
    }

    cart.forEach((item, index) => {
      const article = document.createElement('article');
      article.className = 'cart-card';
      article.innerHTML = `
        <div class="store-name">
          <h3>Keramik Mulya Plered</h3>
          <span>Dikirim dalam 3 hari</span>
        </div>
        <div class="cart-content">
          <span class="cart-checkbox" data-index="${index}">☐</span>
          <img src="${item.image || 'gambar/aca74648293e2d81636180a760c38c08.jpg'}" alt="${item.name}" />
          <div class="product-info">
            <h4>${item.name}</h4>
            <p>Rp${item.price.toLocaleString('id-ID')}</p>
            <div class="quantity">
              <button class="qty-minus" data-index="${index}">-</button>
              <input type="number" value="${item.qty}" min="1" class="qty-input" data-index="${index}" />
              <button class="qty-plus" data-index="${index}">+</button>
            </div>
          </div>
        </div>
      `;
      cartContainer.appendChild(article);

      // Kembalikan status centang
      const checkbox = article.querySelector('.cart-checkbox');
      if (checkedStatus[index]) {
        checkbox.textContent = '☑';
        checkbox.dataset.checked = 'true';
      } else {
        checkbox.textContent = '☐';
        checkbox.dataset.checked = 'false';
      }
    });

    attachEvents();
    updateTotal();
  }

  // Event untuk checkbox, tombol +/-, input qty
  function attachEvents() {
    // Checkbox
    document.querySelectorAll('.cart-checkbox').forEach(cb => {
      cb.addEventListener('click', function (e) {
        e.stopPropagation(); // biar tidak bentrok dengan event lain
        const isChecked = this.dataset.checked === 'true';
        this.dataset.checked = (!isChecked).toString();
        this.textContent = isChecked ? '☐' : '☑';
        updateTotal();
      });
    });

    // Minus
    document.querySelectorAll('.qty-minus').forEach(btn => {
      btn.addEventListener('click', function () {
        const index = parseInt(this.dataset.index);
        if (cart[index].qty > 1) {
          cart[index].qty -= 1;
          localStorage.setItem('cart', JSON.stringify(cart));
          renderCart();
        }
      });
    });

    // Plus
    document.querySelectorAll('.qty-plus').forEach(btn => {
      btn.addEventListener('click', function () {
        const index = parseInt(this.dataset.index);
        cart[index].qty += 1;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      });
    });

    // Input manual
    document.querySelectorAll('.qty-input').forEach(input => {
      input.addEventListener('input', function () {
        const index = parseInt(this.dataset.index);
        let newQty = parseInt(this.value);
        if (isNaN(newQty) || newQty < 1) newQty = 1;
        cart[index].qty = newQty;
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCart();
      });
    });
  }

  // Update total harga & jumlah item tercentang
  function updateTotal() {
    let total = 0;
    let count = 0;
    document.querySelectorAll('.cart-checkbox').forEach((cb, idx) => {
      if (cb.dataset.checked === 'true') {
        total += cart[idx].price * cart[idx].qty;
        count++;
      }
    });
    totalHargaEl.textContent = 'Rp' + total.toLocaleString('id-ID');
    checkedCountEl.textContent = count;
  }

  // Tombol Checkout
  checkoutBtn.addEventListener('click', function () {
    const selected = [];
    document.querySelectorAll('.cart-checkbox').forEach((cb, idx) => {
      if (cb.dataset.checked === 'true') {
        selected.push(cart[idx]);
      }
    });

    if (selected.length === 0) {
      alert('Pilih minimal satu produk untuk checkout.');
      return;
    }

    localStorage.setItem('checkoutItems', JSON.stringify(selected));
    window.location.href = 'checkout.html';
  });

  // Render pertama
  renderCart();
});
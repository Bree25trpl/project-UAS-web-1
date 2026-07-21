// ============================
// FILTER KATEGORI PRODUK
// ============================

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.category');
    const productCards = document.querySelectorAll('.product-card');
    const noProducts = document.getElementById('noProducts');

    // Fungsi untuk filter produk
    function filterProducts(category) {
        let visibleCount = 0;

        productCards.forEach(card => {
            const cardCategory = card.getAttribute('data-category');
            
            // Jika kategori 'all', tampilkan semua
            // Jika tidak, tampilkan hanya yang sesuai
            if (category === 'all' || cardCategory === category) {
                card.style.display = 'block';
                card.style.animation = 'fadeInUp 0.4s ease forwards';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        // Tampilkan pesan jika tidak ada produk
        if (visibleCount === 0) {
            noProducts.style.display = 'block';
        } else {
            noProducts.style.display = 'none';
        }
    }

    // Event listener untuk setiap tombol kategori
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Hapus class active dari semua tombol
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Tambahkan class active ke tombol yang diklik
            this.classList.add('active');
            
            // Ambil kategori dari data attribute
            const category = this.getAttribute('data-category');
            
            // Filter produk
            filterProducts(category);
        });
    });

    // Tambahkan CSS animasi
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .no-products {
            text-align: center;
            padding: 60px 20px;
            color: #888;
            font-size: 18px;
            grid-column: 1 / -1;
        }
        
        body.dark-mode .no-products {
            color: #aaa;
        }
    `;
    document.head.appendChild(style);

    // Jalankan filter awal (All)
    filterProducts('all');
});
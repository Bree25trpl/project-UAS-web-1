// ============================
// DARK MODE TOGGLE
// ============================

document.addEventListener('DOMContentLoaded', function() {
    // Cek apakah dark mode sudah aktif sebelumnya
    const darkMode = localStorage.getItem('darkMode');
    
    // Buat tombol toggle di navbar
    createDarkModeToggle();
    
    // Jika dark mode aktif, terapkan
    if (darkMode === 'enabled') {
        document.body.classList.add('dark-mode');
        updateToggleButton(true);
    }
    
    // Event listener untuk tombol toggle
    const toggleBtn = document.getElementById('darkModeToggle');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', function() {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            
            // Simpan preferensi
            localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
            updateToggleButton(isDark);
        });
    }
});

// Fungsi untuk membuat tombol toggle di navbar
function createDarkModeToggle() {
    // Cari semua nav ul di halaman
    const navs = document.querySelectorAll('nav ul');
    
    navs.forEach(nav => {
        // Cek apakah tombol sudah ada
        if (!nav.querySelector('#darkModeToggle')) {
            const li = document.createElement('li');
            li.innerHTML = `
                <button id="darkModeToggle" class="dark-toggle-btn" 
                        aria-label="Toggle Dark Mode">
                    🌙
                </button>
            `;
            nav.appendChild(li);
        }
    });
}

// Fungsi untuk update icon tombol
function updateToggleButton(isDark) {
    const toggleBtn = document.getElementById('darkModeToggle');
    if (toggleBtn) {
        toggleBtn.textContent = isDark ? '☀️' : '🌙';
    }
}
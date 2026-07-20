// shopping.js
document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.featured-track');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  
  // Ambil semua kartu di dalam track
  const cards = track.querySelectorAll('.featured-card');
  let currentIndex = 0;

  // Fungsi untuk menggeser track
  function updateSlide() {
    // Hitung lebar satu kartu + jarak gap (40px dari CSS kita)
    const cardWidth = cards[0].offsetWidth + 40; 
    
    // Geser track ke kiri sebanyak (index * lebar kartu)
    track.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
  }

  // Tombol Next (Kanan)
  nextBtn.addEventListener('click', function() {
    if (currentIndex < cards.length - 1) {
      currentIndex++;
      updateSlide();
    }
  });

  // Tombol Prev (Kiri)
  prevBtn.addEventListener('click', function() {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlide();
    }
  });
});
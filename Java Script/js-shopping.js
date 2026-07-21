document.addEventListener('DOMContentLoaded', function() {
  const track = document.querySelector('.featured-track');
  const cards = document.querySelectorAll('.featured-card');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');

  let currentIndex = 0;
  const totalCards = cards.length;

  function updateSlider() {
    const offset = -currentIndex * 100;
    track.style.transform = 'translateX(' + offset + '%)';
  }

  nextBtn.addEventListener('click', function() {
    if (currentIndex < totalCards - 1) {
      currentIndex++;
    } else {
      currentIndex = 0;
    }
    updateSlider();
  });

  prevBtn.addEventListener('click', function() {
    if (currentIndex > 0) {
      currentIndex--;
    } else {
      currentIndex = totalCards - 1;
    }
    updateSlider();
  });

  updateSlider();
});
document.addEventListener("DOMContentLoaded", function () {
    const wrapper = document.querySelector(".timeline");
    const timelineList = document.querySelector(".timeline-list");
    
    // Ambil semua kartu artikel
    const items = document.querySelectorAll(".timeline-content");
    if (!items.length) return;

    // 1. Ubah struktur HTML menjadi layout Teks-Kiri & Slider-Kanan
    const heroLayout = document.createElement("div");
    heroLayout.className = "hero-layout";
    
    // Area Teks (Kiri)
    const textArea = document.createElement("div");
    textArea.className = "text-area";
    textArea.innerHTML = `
        <h2 id="dynamic-title">${items[0].querySelector('.timeline-text h3').innerHTML}</h2>
        <p id="dynamic-desc">${items[0].querySelector('.timeline-text p').innerHTML}</p>
        <div class="timeline-controls">
            <button id="prev-btn" class="slider-btn" aria-label="Sebelumnya">&#10094;</button>
            <button id="next-btn" class="slider-btn" aria-label="Selanjutnya">&#10095;</button>
        </div>
    `;

    // Area Gambar Slider (Kanan)
    const sliderArea = document.createElement("div");
    sliderArea.className = "slider-area";
    sliderArea.innerHTML = `<div class="image-slider-track" id="image-track"></div>`;
    
    // Masukkan elemen ke layout
    // --- UBAH DISINI: pakai append agar ditaruh di bawah judul <h2> ---
    wrapper.append(heroLayout); 
    // --- SELESAI PERUBAHAN ---

    heroLayout.appendChild(textArea);
    heroLayout.appendChild(sliderArea);

    // Pindahkan gambar ke dalam track slider
    const track = document.getElementById("image-track");
    items.forEach(item => {
        const imgSrc = item.querySelector(".timeline-image img").src;
        const imgDiv = document.createElement("div");
        imgDiv.className = "slide-item";
        imgDiv.innerHTML = `<img src="${imgSrc}" alt="Keramik">`;
        track.appendChild(imgDiv);
    });

    // Sembunyikan elemen HTML asli (agar tidak double)
    timelineList.style.display = "none";

    // --- 2. Logika Slider dan Perubahan Teks ---
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const titleEl = document.getElementById("dynamic-title");
    const descEl = document.getElementById("dynamic-desc");
    
    let currentIndex = 0;
    const totalItems = items.length;

    function updateSlide(index) {
        if (index < 0) index = 0;
        if (index >= totalItems) index = totalItems - 1;
        currentIndex = index;

        // Geser gambar
        const slideWidth = track.children[0]?.offsetWidth || 500;
        track.style.transform = `translateX(-${index * slideWidth}px)`;

        // Ambil data teks dari HTML asli yang disembunyikan
        const targetItem = items[index];
        const newTitle = targetItem.querySelector('.timeline-text h3').innerHTML;
        const newDesc = targetItem.querySelector('.timeline-text p').innerHTML;

        // --- 3. Efek Fade In / Fade Out pada Teks ---
        titleEl.classList.remove("fade-in");
        descEl.classList.remove("fade-in");
        titleEl.style.opacity = 0;
        descEl.style.opacity = 0;

        setTimeout(() => {
            titleEl.innerHTML = newTitle;
            descEl.innerHTML = newDesc;
            titleEl.classList.add("fade-in");
            descEl.classList.add("fade-in");
            titleEl.style.opacity = 1;
            descEl.style.opacity = 1;
        }, 150); // Delay sebentar agar efek hilang-timbul terlihat

        // Update state tombol (aktif/nonaktif)
        prevBtn.disabled = index === 0;
        nextBtn.disabled = index === totalItems - 1;
        prevBtn.style.opacity = index === 0 ? "0.5" : "1";
        nextBtn.style.opacity = index === totalItems - 1 ? "0.5" : "1";
    }

    // --- 4. Event Tombol ---
    prevBtn.addEventListener("click", () => updateSlide(currentIndex - 1));
    nextBtn.addEventListener("click", () => updateSlide(currentIndex + 1));

    // Inisialisasi slide pertama
    updateSlide(0);

    // --- 5. Dukungan Swipe / Scroll Manual ---
    let isDown = false;
    let startX;
    let scrollLeftPos = 0;

    track.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - track.offsetLeft;
        scrollLeftPos = currentIndex * track.children[0]?.offsetWidth;
    });
    track.addEventListener('mouseleave', () => isDown = false);
    track.addEventListener('mouseup', () => isDown = false);
    track.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 0.8;
        const newIndex = Math.round((scrollLeftPos - walk) / (track.children[0]?.offsetWidth || 500));
        if(newIndex !== currentIndex) updateSlide(newIndex);
    });
});
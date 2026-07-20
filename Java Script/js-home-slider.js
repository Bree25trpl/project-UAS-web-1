document.addEventListener("DOMContentLoaded", function () {
    const scrollArea = document.getElementById("umkmScroll");
    const prevBtn = document.getElementById("umkmPrev");
    const nextBtn = document.getElementById("umkmNext");

    if (scrollArea && prevBtn && nextBtn) {
        // Fungsi untuk menggeser kartu ke kiri
        prevBtn.addEventListener("click", () => {
            scrollArea.scrollBy({
                left: -350, // 320px (lebar kartu) + 30px (gap)
                behavior: "smooth"
            });
        });

        // Fungsi untuk menggeser kartu ke kanan
        nextBtn.addEventListener("click", () => {
            scrollArea.scrollBy({
                left: 350, // 320px (lebar kartu) + 30px (gap)
                behavior: "smooth"
            });
        });
    }
});
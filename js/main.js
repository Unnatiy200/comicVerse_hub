// js/main.js
// Homepage carousel + few comics

// Simple carousel: use first 3 comics
const slidesContainer = document.getElementById("carousel-slides");
const dotsContainer = document.getElementById("carousel-dots");

if (slidesContainer && dotsContainer) {
  comics.slice(0, 3).forEach((comic, index) => {
    const slide = document.createElement("div");
    slide.className = "carousel-slide" + (index === 0 ? " active" : "");
    slide.innerHTML = `
  <img src="${comic.cover}" alt="${comic.title}" class="carousel-cover">

  <div class="hero-hover-overlay">
    <div class="hero-overlay-title">${comic.title}</div>
    <div class="hero-overlay-meta">${comic.publisher} • ₹${comic.price}</div>
    <a href="comic-detail.html?id=${comic.id}" class="hero-overlay-btn">Details</a>
  </div>
`;

    slidesContainer.appendChild(slide);

    const dot = document.createElement("div");
    dot.className = "dot" + (index === 0 ? " active" : "");
    dotsContainer.appendChild(dot);
  });

  let currentSlide = 0;
  const slides = slidesContainer.querySelectorAll(".carousel-slide");
  const dots = dotsContainer.querySelectorAll(".dot");

  function showSlide(idx) {
    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");
    currentSlide = idx;
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }

  setInterval(() => {
    const next = (currentSlide + 1) % slides.length;
    showSlide(next);
  }, 3000);
}

// Render a few comics below
const homeComics = document.getElementById("home-comics");
if (homeComics) {
  comics.slice(0, 4).forEach(comic => {
    const card = document.createElement("article");
    card.className = "comic-card";
    card.innerHTML = `
      <img src="${comic.cover}" alt="${comic.title}" class="comic-cover">
      <div class="comic-title">${comic.title}</div>
      <div class="comic-meta">${comic.publisher} • ${comic.character}</div>
      <div class="comic-price">₹${comic.price}</div>
      <div class="card-actions">
        <a href="comic-detail.html?id=${comic.id}">
          <button class="btn-outline">Details</button>
        </a>
        <button class="btn-primary" data-id="${comic.id}">Add</button>
      </div>
    `;
    homeComics.appendChild(card);
  });

  homeComics.addEventListener("click", e => {
    if (e.target.matches(".btn-primary")) {
      const id = Number(e.target.dataset.id);
      addToCart(id);
    }
  });
}

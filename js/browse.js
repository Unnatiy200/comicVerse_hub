// js/browse.js

const grid = document.getElementById("browse-grid");
const publisherFilter = document.getElementById("publisher-filter");
const characterFilter = document.getElementById("character-filter");
const sortBy = document.getElementById("sort-by");

function renderComics(list) {
  if (!grid) return;
  grid.innerHTML = "";
  list.forEach(comic => {
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
    grid.appendChild(card);
  });
}

function applyFiltersAndSort() {
  let list = [...comics];

  const pub = publisherFilter.value;
  const ch = characterFilter.value;

  if (pub !== "all") {
    list = list.filter(c => c.publisher === pub);
  }
  if (ch !== "all") {
    list = list.filter(c => c.character === ch);
  }

  switch (sortBy.value) {
    case "title-asc":
      list.sort((a, b) => a.title.localeCompare(b.title));
      break;
    case "price-asc":
      list.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      list.sort((a, b) => b.price - a.price);
      break;
    case "release-desc":
      list.sort((a, b) => new Date(b.release) - new Date(a.release));
      break;
  }

  renderComics(list);
}

if (grid) {
  applyFiltersAndSort();

  publisherFilter.addEventListener("change", applyFiltersAndSort);
  characterFilter.addEventListener("change", applyFiltersAndSort);
  sortBy.addEventListener("change", applyFiltersAndSort);

  grid.addEventListener("click", e => {
    if (e.target.matches(".btn-primary")) {
      const id = Number(e.target.dataset.id);
      addToCart(id);
    }
  });
}

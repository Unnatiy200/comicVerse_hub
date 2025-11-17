// js/detail.js

function getQueryId() {
  const params = new URLSearchParams(window.location.search);
  return Number(params.get("id"));
}

const detailRoot = document.getElementById("detail-content");
if (detailRoot) {
  const id = getQueryId();
  const comic = comics.find(c => c.id === id);

  if (!comic) {
    detailRoot.innerHTML = "<p>Comic not found.</p>";
  } else {
    detailRoot.innerHTML = `
      <div>
        <img src="${comic.cover}" alt="${comic.title}" class="detail-cover">
      </div>
      <div>
        <h1 class="detail-heading">${comic.title}</h1>
        <div class="detail-meta">
          ${comic.publisher} • ${comic.character} • ${comic.genre}<br>
          Release: ${new Date(comic.release).toLocaleDateString()}
        </div>
        <p class="detail-description">
          ${comic.description}
        </p>
        <div class="detail-price">Price: ₹${comic.price}</div>
        <button class="btn-primary" id="detail-add">Add to Cart</button>
      </div>
    `;

    document.getElementById("detail-add").addEventListener("click", () => {
      addToCart(comic.id);
    });
  }
}

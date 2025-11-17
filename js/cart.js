// js/cart.js
// Small cart helper used on multiple pages

const CART_KEY = "comicverse_cart";

function getCart() {
  const stored = localStorage.getItem(CART_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

function addToCart(id) {
  const comic = comics.find(c => c.id === id);
  if (!comic) return;

  const cart = getCart();
  const existing = cart.find(item => item.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ id: comic.id, title: comic.title, price: comic.price, cover: comic.cover, qty: 1 });
  }

  saveCart(cart);
  showMiniToast(`${comic.title} added to cart`);
}

function removeFromCart(id) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== id);
  saveCart(cart);
}

function updateCartQty(id, qty) {
  const cart = getCart();
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, qty);
  saveCart(cart);
}

function calcCartTotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
}

// Simple mini toast
function showMiniToast(message) {
  const existing = document.querySelector(".mini-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "mini-toast";
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 10);
  setTimeout(() => {
    toast.classList.remove("show");
    setTimeout(() => toast.remove(), 200);
  }, 1500);
}

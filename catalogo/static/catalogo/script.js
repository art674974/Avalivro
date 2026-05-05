// === Sidebar toggle + overlay ===
const toggleBtnSidebar = document.getElementById("toggleSidebar");
const overlay = document.getElementById("overlay");
const sidebar = document.getElementById("sidebar");

if (toggleBtnSidebar) {
  toggleBtnSidebar.addEventListener("click", () => {
    sidebar.classList.toggle("active");
    overlay.classList.toggle("active");
  });
}

if (overlay) {
  overlay.addEventListener("click", () => {
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
  });
}

// === Dark Mode Toggle ===
const darkToggle = document.getElementById("darkModeToggle");
const logoMain = document.getElementById("logo-main"); // logo principal

// aplica tema salvo ao carregar
const savedTheme = localStorage.getItem("theme");
if (savedTheme === "dark") {
  document.body.classList.add("dark");
  darkToggle.textContent = "☀️";
  if (logoMain) logoMain.src = "/static/catalogo/img/logo-clara.png";
} else {
  document.body.classList.remove("dark");
  darkToggle.textContent = "🌙";
  if (logoMain) logoMain.src = "/static/catalogo/img/logo-escura.png";
}

if (darkToggle) {
  darkToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    const isDark = document.body.classList.contains("dark");

    if (isDark) {
      localStorage.setItem("theme", "dark");
      darkToggle.textContent = "☀️";
      if (logoMain) logoMain.src = "/static/catalogo/img/logo-clara.png";
    } else {
      localStorage.setItem("theme", "light");
      darkToggle.textContent = "🌙";
      if (logoMain) logoMain.src = "/static/catalogo/img/logo-escura.png";
    }
  });
}

// === Mensagens estilizadas ===
function showMessage(text, type = "success") {
  const container = document.getElementById("message-container");
  if (!container) return;
  container.innerHTML = `<div class="message ${type} show">${text}</div>`;
  setTimeout(() => {
    container.innerHTML = "";
  }, 3000);
}

// === Controle de estrelas clicáveis ===
function initStarRating(bookId) {
  const stars = document.querySelectorAll(`.rating[data-book="${bookId}"] span`);
  stars.forEach(star => {
    star.addEventListener("click", () => {
      const value = star.getAttribute("data-value");
      stars.forEach(s => s.classList.remove("selected"));
      for (let i = 0; i < value; i++) {
        stars[i].classList.add("selected");
      }
      document.querySelector(`.rating[data-book="${bookId}"]`).setAttribute("data-selected", value);
    });
  });
}

// Inicializa estrelas para todos os livros renderizados pelo Django
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".rating").forEach(ratingDiv => {
    const bookId = ratingDiv.getAttribute("data-book");
    initStarRating(bookId);
  });
});

// === Submeter avaliação (via formulário Django) ===
function submitReview(bookId) {
  bookId = parseInt(bookId);
  const ratingElement = document.querySelector(`.rating[data-book="${bookId}"]`);
  const rating = ratingElement.getAttribute("data-selected");
  const comment = document.getElementById(`comment-${bookId}`).value;

  if (!rating) {
    showMessage("Por favor, selecione uma nota de 1 a 5 estrelas.", "error");
    return;
  }

  fetch(`/catalogo/${bookId}/`, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: `rating=${rating}&comment=${encodeURIComponent(comment)}&csrfmiddlewaretoken=${getCsrfToken()}`
  })
  .then(res => res.json())
  .then(data => {
    showMessage("Avaliação enviada com sucesso!", "success");
    document.getElementById(`comment-${bookId}`).value = "";

    // Atualiza a nota média no card
    const avgRatingElement = document.getElementById(`avg-rating-${bookId}`);
    avgRatingElement.textContent = `⭐ Nota média: ${data.avg_rating.toFixed(1)}/5`;
  })
  .catch(() => {
    showMessage("Erro ao enviar avaliação.", "error");
  });
}

// === Helper para CSRF ===
function getCsrfToken() {
  const csrfInput = document.querySelector('input[name="csrfmiddlewaretoken"]');
  return csrfInput ? csrfInput.value : "";
}

// === Pesquisa ===
const searchBtn = document.getElementById("search-button");
if (searchBtn) {
  searchBtn.addEventListener("click", function() {
    const query = document.getElementById("search-input").value.trim();
    if (query) {
      window.location.href = `/catalogo/search/?q=${encodeURIComponent(query)}`;
    }
  });
}

// === Alfabeto ===
document.querySelectorAll(".alphabet-btn").forEach(btn => {
  btn.addEventListener("click", function() {
    const char = this.getAttribute("data-char");
    window.location.href = `/catalogo/search/?q=${char}`;
  });
});

// === Filtros ===
const filterSelect = document.getElementById("filter-select");
const orderSelect = document.getElementById("order-select");

if (filterSelect) filterSelect.addEventListener("change", applyFilter);
if (orderSelect) orderSelect.addEventListener("change", applyFilter);

function applyFilter() {
  const query = document.getElementById("search-input").value.trim();
  const filter = filterSelect.value;
  const order = orderSelect.value;
  window.location.href = `/catalogo/search/?q=${encodeURIComponent(query)}&filter=${filter}&order=${order}`;
}
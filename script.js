const books = [
  { title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
  { title: "To Kill a Mockingbird", author: "Harper Lee" },
  { title: "1984", author: "George Orwell" },
  { title: "Pride and Prejudice", author: "Jane Austen" },
  { title: "Moby-Dick", author: "Herman Melville" },
  { title: "The Catcher in the Rye", author: "J.D. Salinger" },
  { title: "The Hobbit", author: "J.R.R. Tolkien" },
  { title: "Fahrenheit 451", author: "Ray Bradbury" },
  { title: "Jane Eyre", author: "Charlotte Brontë" },
  { title: "Wuthering Heights", author: "Emily Brontë" },
  { title: "Test", author: "Rafay Syed" }
];

// Render books dynamically into the DOM
function renderBooks(bookList) {
  const container = document.getElementById("bookContainer");
  container.innerHTML = ""; 

  bookList.forEach(book => {
    const col = document.createElement("div");
    col.className = "col";

    const card = document.createElement("div");
    card.className = "book card h-100 p-3 border border-2";

    const titleEl = document.createElement("h2");
    const link = document.createElement("a");
    link.href = "#";
    link.textContent = book.title;
    titleEl.appendChild(link);

    const authorEl = document.createElement("p");
    authorEl.className = "card-text";
    authorEl.textContent = `by ${book.author}`;

    card.appendChild(titleEl);
    card.appendChild(authorEl);
    col.appendChild(card);
    container.appendChild(col);
  });
}

// Filter books by search input
function filterBooks(query) {
  return books.filter(book =>
    book.title.toLowerCase().includes(query.toLowerCase())
  );
}

// Highlight long titles
function highlightLongTitles() {
  const cards = document.querySelectorAll(".book");
  cards.forEach(card => {
    const title = card.querySelector("h2").textContent;
    if (title.length > 20) {
      card.classList.add("border-danger");
    }
  });
}

// Reset border styling
function resetBorders() {
  const cards = document.querySelectorAll(".book");
  cards.forEach(card => card.classList.remove("border-danger"));
}

// Setup event listeners
document.addEventListener("DOMContentLoaded", () => {
  renderBooks(books);

  const searchInput = document.getElementById("searchInput");
  const clearButton = document.getElementById("clearButton");
  const highlightButton = document.getElementById("highlightButton");
  const resetButton = document.getElementById("resetButton");

  searchInput.addEventListener("input", () => {
    const filtered = filterBooks(searchInput.value);
    renderBooks(filtered);
  });

  clearButton.addEventListener("click", () => {
    searchInput.value = "";
    renderBooks(books);
  });

  highlightButton.addEventListener("click", highlightLongTitles);
  resetButton.addEventListener("click", resetBorders);
});

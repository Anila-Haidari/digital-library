
// ===== Bookshelf picture for the hero background (made here, no internet needed) =====
function makeBookshelf() {
    const colors = ["#7655a6", "#b5527a", "#2f6f73", "#a8630f", "#3b5b92", "#5a6072", "#e8b75a"];
    let seed = 7;
    let x = 0;
    let books = "";

    // Small "random" numbers that are always the same (so the picture never changes)
    function next() {
        seed = (seed * 9301 + 49297) % 233280;
        return seed / 233280;
    }

    while (x < 1200) {
        let width = 24 + Math.floor(next() * 26);
        const height = 130 + Math.floor(next() * 100);
        const color = colors[Math.floor(next() * colors.length)];

        if (x + width > 1200) {
            width = 1200 - x;
        }

        const y = 250 - height;

        books += '<rect x="' + x + '" y="' + y + '" width="' + (width - 3) + '" height="' + height +
            '" rx="3" fill="' + color + '"/>';
        books += '<rect x="' + (x + 5) + '" y="' + (y + 18) + '" width="' + Math.max(width - 13, 2) +
            '" height="4" fill="#ffffff" fill-opacity="0.5"/>';
        books += '<rect x="' + (x + 5) + '" y="' + (y + height - 26) + '" width="' + Math.max(width - 13, 2) +
            '" height="4" fill="#ffffff" fill-opacity="0.5"/>';

        x += width;
    }

    const svg =
        '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="260" viewBox="0 0 1200 260">' +
        books +
        '<rect x="0" y="250" width="1200" height="10" fill="#ffffff" fill-opacity="0.5"/>' +
        '</svg>';

    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}

// Put the picture behind the hero section
const heroSection = document.querySelector(".hero");
heroSection.style.setProperty("--shelf", 'url("' + makeBookshelf() + '")');
const bookList = document.getElementById("bookList");
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const categoryButtons = document.querySelectorAll(".category-btn");

// Get all books (sample + uploaded)
let allBooks = getAllBooks();

// Selected category
let selectedCategory = "All";

// Display books
function displayBooks(books) {
    bookList.innerHTML = "";

    if (books.length === 0) {
        bookList.innerHTML = `
            <div class="no-books">
                <h3>No Books Found!</h3>
                <p>Try another title, author or category.</p>
            </div>
        `;
        return;
    }

    books.forEach(function(book) {
        const bookCard = document.createElement("div");

        bookCard.classList.add("book-card");

        bookCard.innerHTML = `
            <img src="${book.cover}" alt="${book.title}">

            <h3>${book.title}</h3>

            <p>Author: ${book.author}</p>

            <p>Category: ${book.category}</p>

            <p>Rating: ⭐ ${book.rating || "Not rated"}</p>

            <a href="details.html?id=${book.id}">
                View Details
            </a>
        `;

        bookList.appendChild(bookCard);
    });
}

// Search and filter books
function filterBooks() {
    const searchValue = searchInput.value.trim().toLowerCase();

    const filteredBooks = allBooks.filter(function(book) {

        const matchesSearch =
            book.title.toLowerCase().includes(searchValue) ||
            book.author.toLowerCase().includes(searchValue);

        const matchesCategory =
            selectedCategory === "All" ||
            book.category === selectedCategory;

        return matchesSearch && matchesCategory;
    });

    displayBooks(filteredBooks);
}

// Search button
searchBtn.addEventListener("click", filterBooks);

// Search with Enter key
searchInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        filterBooks();
    }
});

// Update results while typing
searchInput.addEventListener("input", filterBooks);

// Category filter
categoryButtons.forEach(function(button) {

    button.addEventListener("click", function() {

        selectedCategory = button.dataset.category;

        categoryButtons.forEach(function(btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");

        filterBooks();
    });
});

// Show all books
displayBooks(allBooks);

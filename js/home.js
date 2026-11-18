

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
// Fill the stack of covers on each category tile 
function fillCategoryStacks() {
    categoryButtons.forEach(function(button) {
        const stack = button.querySelector(".stack");
        const category = button.dataset.category;
        const color = coverColors[category] || "#7655a6";

        const booksOfCategory = allBooks.filter(function(book) {
            return category === "All" || book.category === category;
        });

        // Order in the stack: left, center (front), right.
        // The first book of the category is always in the center.
        let html = "";

        [1, 0, 2].forEach(function(index) {
            const book = booksOfCategory[index];

            if (book) {
                html += '<img src="' + book.cover + '" alt="' + book.title + '">';
            } else {
                html += '<span class="blank" style="background:' + color + '"></span>';
            }
        });

        stack.innerHTML = html;
    });
}
// Featured books: the 4 best rated 
const featuredList = document.getElementById("featuredList");

const featuredBooks = allBooks
    .slice()
    .sort(function(a, b) {
        return (b.rating || 0) - (a.rating || 0);
    })
    .slice(0, 4);

featuredList.innerHTML = featuredBooks.map(function(book) {
    return `
        <a class="featured-card" href="details.html?id=${book.id}">
            <img src="${book.cover}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>⭐ ${book.rating || "Not rated"}</p>
        </a>
    `;
}).join("");
// Clear filters button
const clearBtn = document.getElementById("clearFilters");

clearBtn.addEventListener("click", function() {
    searchInput.value = "";
    selectedCategory = "All";

    categoryButtons.forEach(function(btn) {
        btn.classList.remove("active");
    });

    document.querySelector('.category-btn[data-category="All"]').classList.add("active");

    filterBooks();
});

fillCategoryStacks();

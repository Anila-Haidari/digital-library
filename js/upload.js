

// Select HTML elements
const uploadForm = document.getElementById("uploadForm");

const bookTitle = document.getElementById("bookTitle");
const bookAuthor = document.getElementById("bookAuthor");
const bookCategory = document.getElementById("bookCategory");
const bookDescription = document.getElementById("bookDescription");

const bookPdf = document.getElementById("bookPdf");
const bookCover = document.getElementById("bookCover");
const bookPermission = document.getElementById("bookPermission");

const myBooksList = document.getElementById("myBooksList");
const formMessage = document.getElementById("formMessage");
const publishButton = document.getElementById("publishButton");

// Preview elements
const previewTitle = document.getElementById("previewTitle");
const previewAuthor = document.getElementById("previewAuthor");
const previewCategory = document.getElementById("previewCategory");
const coverPreview = document.getElementById("coverPreview");

// File name elements
const pdfFileName = document.getElementById("pdfFileName");
const coverFileName = document.getElementById("coverFileName");




function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
}

function clearErrors() {
    const errorIds = [
        "titleError",
        "authorError",
        "categoryError",
        "pdfError",
        "coverError",
        "permissionError"
    ];

    errorIds.forEach(function (id) {
        showError(id, "");
    });

    formMessage.textContent = "";
    formMessage.className = "form-message";
}


// seceeuuss

function showMessage(message, type) {
    formMessage.textContent = message;
    formMessage.className = "form-message " + type;
}


bookTitle.addEventListener("input", function () {
    previewTitle.textContent =
        bookTitle.value.trim() || "Your Book Title";
});

bookAuthor.addEventListener("input", function () {
    previewAuthor.textContent =
        bookAuthor.value.trim() || "Author name";
});

bookCategory.addEventListener("change", function () {
    previewCategory.textContent =
        bookCategory.value || "Not selected";
});


bookPdf.addEventListener("change", function () {
    const file = bookPdf.files[0];

    pdfFileName.textContent = file ? file.name : "";
    showError("pdfError", "");
});

bookCover.addEventListener("change", function () {
    const file = bookCover.files[0];

    coverFileName.textContent = file ? file.name : "";
    showError("coverError", "");

    if (!file) {
        resetCoverPreview();
        return;
    }

    if (!file.type.startsWith("image/")) {
        showError("coverError", "Please select a valid image.");
        resetCoverPreview();
        return;
    }

    if (file.size > 300 * 1024) {
        showError("coverError", "Image size must be 300 KB or less.");
        resetCoverPreview();
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
        coverPreview.style.backgroundImage =
            `url("${event.target.result}")`;

        coverPreview.innerHTML = "";
    };

    reader.onerror = function () {
        showError("coverError", "Could not read the cover image.");
        resetCoverPreview();
    };

    reader.readAsDataURL(file);
});

function resetCoverPreview() {
    coverPreview.style.backgroundImage = "";
    coverPreview.innerHTML = `
        <i class="fa-solid fa-book-open"></i>
        <span>YOUR BOOK</span>
    `;
}


function validateForm() {
    clearErrors();

    let isValid = true;

    const title = bookTitle.value.trim();
    const author = bookAuthor.value.trim();
    const category = bookCategory.value;
    const pdfFile = bookPdf.files[0];
    const coverFile = bookCover.files[0];

    const allowedCategories = [
        "Programming",
        "Science",
        "History",
        "Language",
        "Literature",
        "Others"
    ];

    // Validate title
    if (title === "") {
        showError("titleError", "Please enter the book title.");
        isValid = false;
    }

    // Validate author
    if (author === "") {
        showError("authorError", "Please enter the author's name.");
        isValid = false;
    }

    // Validate category
    if (!allowedCategories.includes(category)) {
        showError("categoryError", "Please select a valid category.");
        isValid = false;
    }

    // Validate PDF
    if (!pdfFile) {
        showError("pdfError", "Please select a PDF file.");
        isValid = false;
    } else if (!pdfFile.name.toLowerCase().endsWith(".pdf")) {
        showError("pdfError", "Only PDF files are accepted.");
        isValid = false;
    }

    // Validate cover image
    if (coverFile) {
        if (!coverFile.type.startsWith("image/")) {
            showError("coverError", "Please select an image file.");
            isValid = false;
        } else if (coverFile.size > 300 * 1024) {
            showError("coverError", "Cover image must be 300 KB or less.");
            isValid = false;
        }
    }

    if (!bookPermission.checked) {
        showError(
            "permissionError",
            "Please confirm that you have permission to upload this book."
        );
        isValid = false;
    }

    return isValid;
}


function readCoverImage(file) {
    return new Promise(function (resolve, reject) {

        if (!file) {
            resolve("images/default-cover.jpg");
            return;
        }

        const reader = new FileReader();

        reader.onload = function (event) {
            resolve(event.target.result);
        };

        reader.onerror = function () {
            reject(new Error("Unable to read the cover image."));
        };

        reader.readAsDataURL(file);
    });
}




uploadForm.addEventListener("submit", async function (event) {

    event.preventDefault();

    if (!validateForm()) {
        showMessage("Please correct the errors in the form.", "error");
        return;
    }

    publishButton.disabled = true;
    publishButton.querySelector("span").textContent = "Publishing...";

    try {

        const coverFile = bookCover.files[0];
        const pdfFile = bookPdf.files[0];

        // Read image before saving
        const coverData = await readCoverImage(coverFile);

        // Create book object
        const newBook = {
            id: Date.now(),
            title: bookTitle.value.trim(),
            author: bookAuthor.value.trim(),
            category: bookCategory.value,
            description:
                bookDescription.value.trim() || "No description.",
            cover: coverData,
            pdfUrl: "",
            pdfName: pdfFile.name,
            rating: 0
        };

        // Save using the shared storage function
        const isSaved = addBook(newBook);

        if (isSaved) {

            showMessage(
                "Your book has been successfully uploaded!",
                "success"
            );

            uploadForm.reset();

            // Reset live preview
            previewTitle.textContent = "Your Book Title";
            previewAuthor.textContent = "Author name";
            previewCategory.textContent = "Not selected";

            pdfFileName.textContent = "";
            coverFileName.textContent = "";

            resetCoverPreview();

            // Refresh uploaded books
            showMyBooks();

            // Bring the success message into view
            formMessage.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });

        } else {

            showMessage(
                "Unable to save the book. Storage may be full.",
                "error"
            );
        }

    } catch (error) {

        console.error("Upload error:", error);

        showMessage(
            "Something went wrong while uploading the book.",
            "error"
        );

    } finally {

        publishButton.disabled = false;
        publishButton.querySelector("span").textContent = "Publish Book";
    }
});




function showMyBooks() {

    myBooksList.innerHTML = "";

    const uploadedBooks = getUploadedBooks();

    const bookCount = document.getElementById("bookCount");

    bookCount.textContent =
        uploadedBooks.length + (uploadedBooks.length === 1 ? " Book" : " Books");

    // Show empty message
    if (!uploadedBooks || uploadedBooks.length === 0) {

        const emptyBox = document.createElement("div");
        emptyBox.className = "empty-books";

        const emptyIcon = document.createElement("i");
        emptyIcon.className = "fa-solid fa-book-open";

        const emptyTitle = document.createElement("h3");
        emptyTitle.textContent = "Your collection is waiting";

        const emptyText = document.createElement("p");
        emptyText.textContent =
            "You have not uploaded any books yet. Start sharing your favorite books!";

        emptyBox.append(emptyIcon, emptyTitle, emptyText);
        myBooksList.appendChild(emptyBox);

        return;
    }

    // Create a card for every uploaded book
    uploadedBooks.forEach(function (book) {

        const card = document.createElement("article");
        card.className = "uploaded-book-card";

        // Cover
        const coverBox = document.createElement("div");
        coverBox.className = "uploaded-book-cover";

        const coverImage = document.createElement("img");
        coverImage.src = book.cover || "images/default-cover.jpg";
        coverImage.alt = book.title + " cover";

        coverImage.onerror = function () {
            coverBox.innerHTML = '<i class="fa-solid fa-book-open"></i>';
        };

        coverBox.appendChild(coverImage);

        // Book information
        const info = document.createElement("div");
        info.className = "uploaded-book-info";

        const title = document.createElement("h3");
        title.textContent = book.title;

        const author = document.createElement("p");
        author.textContent = "By " + book.author;

        const category = document.createElement("span");
        category.className = "uploaded-book-category";
        category.textContent = book.category;

        const pdfInfo = document.createElement("div");
        pdfInfo.className = "uploaded-pdf-name";

        const pdfIcon = document.createElement("i");
        pdfIcon.className = "fa-solid fa-file-pdf";

        const pdfName = document.createElement("span");
        pdfName.textContent = book.pdfName || "PDF information unavailable";

        pdfInfo.append(pdfIcon, pdfName);

        // Action buttons
        const actions = document.createElement("div");
        actions.className = "uploaded-book-actions";

        const detailsLink = document.createElement("a");
        detailsLink.href =
            "details.html?id=" + encodeURIComponent(book.id);
        detailsLink.textContent = "View Details";

        const deleteButton = document.createElement("button");
        deleteButton.type = "button";
        deleteButton.className = "delete-book-button";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function () {
            const confirmed = confirm(
                "Are you sure you want to delete this book?"
            );

            if (confirmed) {

                const isDeleted = deleteBook(book.id);

                if (isDeleted) {
                    showMyBooks();
                } else {
                    showMessage(
                        "Could not delete this book.",
                        "error"
                    );
                }
            }
        });

        actions.append(detailsLink, deleteButton);

        info.append(title, author, category, pdfInfo, actions);
        card.append(coverBox, info);

        myBooksList.appendChild(card);
    });
}




document.addEventListener("DOMContentLoaded", function () {
    showMyBooks();
});
document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id") || "1";
  const selectedBook = idParam ? getBookById(Number(idParam)) : null;

  const notFoundCard = document.getElementById("notFoundCard");
  const detailsCard = document.getElementById("detailsCard");
  const relatedSection = document.getElementById("relatedSection");

  if (!selectedBook) {
    notFoundCard.hidden = false;
    detailsCard.hidden = true;
    return;
  }

  notFoundCard.hidden = true;
  detailsCard.hidden = false;

  const coverImg = document.getElementById("bookCover");
  coverImg.src = selectedBook.cover || "images/default-cover.jpg";
  coverImg.onerror = function () {
    this.src = "images/default-cover.jpg";
  };

  document.getElementById("bookTitle").textContent = selectedBook.title;
  document.getElementById("bookAuthor").textContent = selectedBook.author;
  document.getElementById("bookCategory").textContent = selectedBook.category;
  document.getElementById("bookRating").textContent =
    selectedBook.rating + " / 5";
  document.getElementById("bookDescription").textContent =
    selectedBook.description;

  const readOnlineBtn = document.getElementById("readOnlineBtn");
  const downloadBtn = document.getElementById("downloadBtn");
  const noPdfMessage = document.getElementById("noPdfMessage");

  if (selectedBook.pdfUrl && selectedBook.pdfUrl.trim() !== "") {
    readOnlineBtn.href = "reader.html?id=" + selectedBook.id;
    downloadBtn.href = selectedBook.pdfUrl;
    readOnlineBtn.hidden = false;
    downloadBtn.hidden = false;
    noPdfMessage.hidden = true;
  } else {
    readOnlineBtn.hidden = true;
    downloadBtn.hidden = true;
    noPdfMessage.hidden = false;
  }

  const relatedBooks = getAllBooks()
    .filter(function (book) {
      return (
        book.category === selectedBook.category && book.id !== selectedBook.id
      );
    })
    .slice(0, 4);

  const relatedList = document.getElementById("relatedList");
  relatedList.innerHTML = "";

  if (relatedBooks.length === 0) {
    relatedList.innerHTML = "<p>No related books yet.</p>";
  } else {
    relatedBooks.forEach(function (book) {
      const card = document.createElement("a");
      card.href = "details.html?id=" + book.id;
      card.className = "related-card";
      card.innerHTML =
        '<img src="' +
        (book.cover || "images/default-cover.jpg") +
        '" onerror="this.src=\'images/default-cover.jpg\'" alt="' +
        book.title +
        '"><h4>' +
        book.title +
        "</h4>";
      relatedList.appendChild(card);
    });
  }

  relatedSection.hidden = false;
});

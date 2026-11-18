document.addEventListener("DOMContentLoaded", function () {
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get("id") || "1";

  let selectedBook = null;
  if (typeof getBookById === "function") {
    selectedBook = getBookById(Number(idParam));
  }

  if (!selectedBook) {
    selectedBook = {
      id: 1,
      title: "Toxic Parents",
      author: "Susan Forward",
      pdfUrl: "Books/toxic-parents.pdf",
    };
  }

  const readerNotFound = document.getElementById("readerNotFound");
  const readerWrapper = document.getElementById("readerWrapper");

  if (readerNotFound) readerNotFound.hidden = true;
  if (readerWrapper) {
    readerWrapper.hidden = false;
    readerWrapper.style.display = "flex";
    readerWrapper.style.flexDirection = "column";
    readerWrapper.style.gap = "16px";
  }

  document.getElementById("readerBookTitle").textContent = selectedBook.title;
  document.getElementById("readerBookAuthor").textContent =
    "By " + selectedBook.author;

  const backBtn = document.getElementById("readerBackBtn");
  backBtn.href = "details.html?id=" + selectedBook.id;

  const pdfViewerBox = document.getElementById("pdfViewerBox");
  const pdfFrame = document.getElementById("pdfFrame");
  const noPdfBox = document.getElementById("noPdfBox");
  const downloadBtn = document.getElementById("readerDownloadBtn");

  if (selectedBook.pdfUrl && selectedBook.pdfUrl.trim() !== "") {
    pdfFrame.src = selectedBook.pdfUrl;
    pdfViewerBox.hidden = false;
    noPdfBox.hidden = true;

    downloadBtn.href = selectedBook.pdfUrl;
    downloadBtn.hidden = false;
  } else {
    pdfViewerBox.hidden = true;
    noPdfBox.hidden = false;
    downloadBtn.hidden = true;
  }
});

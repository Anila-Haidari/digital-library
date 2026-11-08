// Sample books (shared by all pages).
// Categories: Programming, Science, History, Language, Literature
// pdfUrl: path of a PDF inside the books/ folder, or "" if the book has no file.

// Makes a simple cover image locally (no internet needed)
function makeCover(label) {
    const svg =
        '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400">' +
        '<rect width="300" height="400" fill="#e9e1f5"/>' +
        '<rect x="16" y="16" width="268" height="368" fill="none" stroke="#7655a6" stroke-width="4"/>' +
        '<text x="150" y="205" font-family="Arial, sans-serif" font-size="28" font-weight="bold" ' +
        'fill="#30234a" text-anchor="middle">' + label + '</text>' +
        '</svg>';

    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}

const sampleBooks = [
    {
        id: 1,
        title: "JavaScript for Beginners",
        author: "John Smith",
        category: "Programming",
        description: "A simple guide to learning JavaScript from the beginning.",
        cover: makeCover("JavaScript"),
        pdfUrl: "books/javascript.pdf",
        rating: 4.5
    },
    {
        id: 2,
        title: "Introduction to Science",
        author: "Sarah Johnson",
        category: "Science",
        description: "Learn basic scientific concepts and discoveries.",
        cover: makeCover("Science"),
        pdfUrl: "books/science.pdf",
        rating: 4.2
    },
    {
        id: 3,
        title: "English Grammar",
        author: "David Brown",
        category: "Language",
        description: "Improve your English grammar with simple lessons.",
        cover: makeCover("English"),
        pdfUrl: "books/english.pdf",
        rating: 4.7
    },
    {
        id: 4,
        title: "The World of Literature",
        author: "Emily Wilson",
        category: "Literature",
        description: "Explore stories and the wonderful world of literature.",
        cover: makeCover("Literature"),
        pdfUrl: "books/literature.pdf",
        rating: 4.6
    },
    {
        id: 5,
        title: "World History Basics",
        author: "Michael Davis",
        category: "History",
        description: "A short introduction to the main events of world history.",
        cover: makeCover("History"),
        pdfUrl: "books/history.pdf",
        rating: 4.3
    },
    {
        id: 6,
        title: "HTML and CSS Basics",
        author: "Anna Taylor",
        category: "Programming",
        description: "Build your first web pages with HTML and CSS.",
        cover: makeCover("HTML and CSS"),
        pdfUrl: "books/html-css.pdf",
        rating: 4.4
    }
];
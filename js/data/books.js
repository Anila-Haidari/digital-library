// Sample books (shared by all pages).
// Categories: Novels, Poetry, Philosophy, Self-Growth, History, Other
// pdfUrl: path of a PDF inside the books/ folder, or "" if the book has no file.

// Colors of the covers (one color for each category)
const coverColors = {
    "Novels": "#7655a6",
    "Poetry": "#b5527a",
    "Philosophy": "#2f6f73",
    "Self-Growth": "#a8630f",
    "History": "#3b5b92",
    "Other": "#5a6072"
};

// Makes a simple cover image locally (no internet needed)
function makeCover(title, author, category) {
    const color = coverColors[category] || "#7655a6";

    // Split the title into lines of about 14 characters
    const lines = [];
    let line = "";

    title.split(" ").forEach(function (word) {
        if ((line + " " + word).trim().length > 14 && line !== "") {
            lines.push(line);
            line = word;
        } else {
            line = (line + " " + word).trim();
        }
    });
    lines.push(line);

    // Title text (centered, each line under the other)
    const startY = 170 - (lines.length - 1) * 18;
    const titleText = lines.map(function (text, index) {
        return '<text x="150" y="' + (startY + index * 36) + '" text-anchor="middle" ' +
            'font-family="Arial, sans-serif" font-size="27" font-weight="bold" fill="#ffffff">' +
            text + '</text>';
    }).join("");

    const svg =
        '<svg xmlns="http://www.w3.org/2000/svg" width="300" height="400" viewBox="0 0 300 400">' +
        '<rect width="300" height="400" fill="' + color + '"/>' +
        '<rect x="16" y="16" width="268" height="368" fill="none" stroke="#ffffff" stroke-opacity="0.6" stroke-width="3"/>' +
        titleText +
        '<rect x="120" y="296" width="60" height="3" fill="#ffffff" fill-opacity="0.7"/>' +
        '<text x="150" y="334" text-anchor="middle" font-family="Arial, sans-serif" ' +
        'font-size="17" fill="#ffffff" fill-opacity="0.9">' + author + '</text>' +
        '</svg>';

    return "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
}

const sampleBooks = [
    {
        id: 1,
        title: "The Kite Runner",
        author: "Khaled Hosseini",
        category: "Novels",
        description: "A story of friendship, guilt and forgiveness that begins in Kabul.",
        cover: "images/covers/kite-runner.jpg",
        pdfUrl: "",
        rating: 4.6
    },
    {
        id: 2,
        title: "Crime and Punishment",
        author: "Fyodor Dostoevsky",
        category: "Novels",
        description: "A poor student commits a crime and struggles with his conscience.",
        cover: "images/covers/crime-and-punishment.webp",
        pdfUrl: "books/sample.pdf",
        rating: 4.5
    },
    {
        id: 3,
        title: "A Brief History of Time",
        author: "Stephen Hawking",
        category: "Other",
        description: "A clear introduction to space, time and the universe.",
        cover: "images/covers/brief-history-of-time.webp",
        pdfUrl: "",
        rating: 4.3
    },
    {
        id: 4,
        title: "Divan of Hafez",
        author: "Hafez of Shiraz",
        category: "Poetry",
        description: "Poems of love, wine and mystery by the great Persian poet.",
        cover: "images/covers/hafez-divan.webp",
        pdfUrl: "",
        rating: 4.8
    },
    {
        id: 5,
        title: "The Masnavi",
        author: "Jalaluddin Rumi",
        category: "Poetry",
        description: "A long spiritual poem full of short stories and wisdom.",
        cover: "images/covers/masnavi.webp",
        pdfUrl: "",
        rating: 4.9
    },
    {
        id: 6,
        title: "Meditations",
        author: "Marcus Aurelius",
        category: "Philosophy",
        description: "Private notes of a Roman emperor on living with calm and duty.",
        cover: "images/covers/meditations.webp",
        pdfUrl: "",
        rating: 4.5
    },
    {
        id: 7,
        title: "Man's Search for Meaning",
        author: "Viktor E. Frankl",
        category: "Self-Growth",
        description: "How to find purpose in life, even in the hardest times.",
        cover: "images/covers/mans-search-for-meaning.webp",
        pdfUrl: "",
        rating: 4.7
    },
    {
        id: 8,
        title: "Sapiens: A Graphic History",
        author: "Yuval Noah Harari",
        category: "History",
        description: "The story of humankind told as an illustrated graphic novel.",
        cover: "images/covers/sapiens.webp",
        pdfUrl: "",
        rating: 4.4
    }
];
const myLibrary = [];
const libraryContainer = document.querySelector("#library-container");

function Book(title, author, pages, status) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

Book.prototype.toggleReadStatus = function() {
    this.status = (this.status === "Unfinished") ? "Finished" : "Unfinished";
};

function addBookToLibrary(title, author, pages, status, libraryArr) {
    let book = new Book(title, author, pages, status);

    if (libraryArr) {
        libraryArr.push(book);
    }

    return book
}

// random color for book background
function getRandomColor() {
    const r = 30 + Math.floor(Math.random() * 91);       // 30 to 120
    const g = 30 + Math.floor(Math.random() * 91);
    const b = 30 + Math.floor(Math.random() * 91);
    return `rgb(${r}, ${g}, ${b})`;
}

function displayBook(book) {
    // create nodes
    let divBook = document.createElement("div");
    let divBookTop = document.createElement("div");
    let divBookBottom = document.createElement("div");
    let pTitle = document.createElement("p");
    let pAuthor = document.createElement("p");
    let pPages = document.createElement("p");
    let pReadStatus = document.createElement("p");

    let divButtonGroup = document.createElement("div");
    let toggleStatusBtn = document.createElement("button");
    let delBtn = document.createElement("button");

    // add to DOM
    libraryContainer.appendChild(divBook);
    divBook.appendChild(divBookTop);
    divBook.appendChild(divBookBottom);
    divBook.appendChild(divButtonGroup);

    divBookTop.appendChild(pTitle);
    divBookTop.appendChild(pAuthor);

    divBookBottom.appendChild(pPages);
    divBookBottom.appendChild(pReadStatus);

    divButtonGroup.appendChild(toggleStatusBtn);
    divButtonGroup.appendChild(delBtn);
    
    // add attributes
    let randColor = getRandomColor()
    divBook.style.backgroundColor = randColor;
    divBook.style.borderLeft = `8px solid hsl(from ` + randColor + ` h s calc(l - 10))`
    
    toggleStatusBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q65 0 123 19t107 53l-58 59q-38-24-81-37.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-18-2-36t-6-35l65-65q11 32 17 66t6 70q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-56-216L254-466l56-56 114 114 400-401 56 56-456 457Z"/></svg>`;
    toggleStatusBtn.hidden = true;
    delBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`;
    delBtn.hidden = true;
    const toggleSvg = toggleStatusBtn.querySelector("svg");

    // add classes
    divBook.classList.add("book");
    divBookTop.classList.add("book-top");
    divBookBottom.classList.add("book-bottom");
    divButtonGroup.classList.add("book-btn-group");
    
    pTitle.classList.add("title");
    pAuthor.classList.add("author");
    pPages.classList.add("pages");
    pReadStatus.classList.add("read-status");
    
    toggleStatusBtn.classList.add("toggle-status-btn", "icon-btn");
    delBtn.classList.add("delete-book-btn", "icon-btn");

    if (book.status === "Finished") 
        toggleSvg.classList.add("status-finished");

    // add book content
    divBook.dataset.id = book.id;
    pTitle.textContent = book.title;
    pAuthor.textContent = "by " + book.author;
    pPages.textContent = "Pages: " + book.pages;
    pReadStatus.textContent = "Status: " + book.status;

    // add event listener
    divBook.addEventListener("mouseenter", () => {
        delBtn.hidden = false;
        toggleStatusBtn.hidden = false;
    });
    divBook.addEventListener("mouseleave", () => {
        delBtn.hidden = true;
        toggleStatusBtn.hidden = true;
    });

    toggleStatusBtn.addEventListener("click", () => {
        // change in arr
        book.toggleReadStatus();
        console.log(myLibrary);
        
        // change in display
        toggleSvg.classList.toggle("status-finished");
        pReadStatus.textContent = "Status: " + book.status;
    });

    delBtn.addEventListener("click", () => {
        // remove from arr
        let index = myLibrary.indexOf(book);
        myLibrary.splice(index, 1);
        console.log(myLibrary);

        // remove from display
        libraryContainer.removeChild(divBook);
    });
}

function displayLibrary(libraryArr) {
    // for each book, create a display in library container
    for (let i = 0; i < libraryArr.length; i++) {
        displayBook(libraryArr[i]);
    }
}

// modal nodes
const openModalBtn = document.querySelector("#add-btn");
const closeModalBtn = document.querySelector("#close-modal-btn");
const modal = document.querySelector("#add-book-modal");
const modalArea = document.querySelector("#dialog-area");
const formAddBtn = document.querySelector("#form-add-btn");

// form inputs nodes
const form = document.querySelector("#add-book-form");
const titleInput = document.querySelector("#title-input");
const authorInput = document.querySelector("#author-input");
const pagesInput = document.querySelector("#pages-input");
const statusInput = document.querySelector("#read-status-input");

// event listeners
openModalBtn.addEventListener("click", () => modal.showModal());

closeModalBtn.addEventListener("click", () => modal.close());

// clicking outside modal should closes it as well,
// stop event bubbling when clicking inside modalArea
modal.addEventListener("click", () => modal.close());
modalArea.addEventListener("click", (e) => {
    e.stopPropagation();
});

formAddBtn.addEventListener("click", (e) => {
    if (form.checkValidity()) {
        e.preventDefault();
    
        let title = titleInput.value;
        let author = authorInput.value;
        let pages = pagesInput.value;
        let status = statusInput.value;
    
        let book = addBookToLibrary(title, author, pages, status, myLibrary);
        console.log(myLibrary);
        displayBook(book);

        form.reset();
        modal.close();
    }
});

// test books
addBookToLibrary("The Hunger Games", "Suzanne Collins", 374, "Unfinished", myLibrary);
addBookToLibrary("Harry Potter and the Order of the Phoenix", " J.K. Rowling", 912, "Unfinished", myLibrary);
addBookToLibrary("Pride and Prejudice", "Jane Austen", 279, "Finished", myLibrary);
addBookToLibrary("To Kill a Mockingbird", "Harper Lee", 323, "Finished", myLibrary);
addBookToLibrary("The Book Thief", "Markus Zusak", 592, "Unfinished", myLibrary);
addBookToLibrary("Twilight", "Stephenie Meyer", 498, "Finished", myLibrary);
addBookToLibrary("Animal Farm", "George Orwell", 141, "Unfinished", myLibrary);
addBookToLibrary("The Hobbit and The Lord of the Rings", "J.R.R. Tolkien", 1728, "Unfinished", myLibrary);
addBookToLibrary("The Chronicles of Narnia", "C.S. Lewis", 767, "Finished", myLibrary);

displayLibrary(myLibrary);
const mylibrary = [];
const libraryContainer = document.querySelector("#library-container");

function Book(title, author, pages, status) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary(title, author, pages, status, libraryArr) {
    let book = new Book(title, author, pages, status);

    if (libraryArr) {
        libraryArr.push(book);
    }

    return book
}

function displayBook(book) {
    // create nodes
    let divCard = document.createElement("div");
    let divBookTop = document.createElement("div");
    let divBookBottom = document.createElement("div");
    let pTitle = document.createElement("p");
    let pAuthor = document.createElement("p");
    let pPages = document.createElement("p");
    let pHasRead = document.createElement("p");

    // add to DOM
    libraryContainer.appendChild(divCard);
    divCard.appendChild(divBookTop);
    divCard.appendChild(divBookBottom);
    divBookTop.appendChild(pTitle);
    divBookTop.appendChild(pAuthor);
    divBookBottom.appendChild(pPages);
    divBookBottom.appendChild(pHasRead);
    
    // add classes
    divCard.classList.add("book");
    divBookTop.classList.add("book-top");
    divBookBottom.classList.add("book-bottom");
    pTitle.classList.add("title");
    pAuthor.classList.add("author");
    pPages.classList.add("pages");
    pHasRead.classList.add("read-status");

    // add text content
    pTitle.textContent = book.title;
    pAuthor.textContent = "By " + book.author;
    pPages.textContent = "Pages: " + book.pages;
    pHasRead.textContent = "Status: " + book.status;
}

function displayLibrary(libraryArr) {
    // for each book, create a card in library container
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

openModalBtn.addEventListener("click", () => modal.showModal());

closeModalBtn.addEventListener("click", () => modal.close());

// clicking outside modal should closes it as well
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
    
        let book = addBookToLibrary(title, author, pages, status);
        displayBook(book);
        form.reset();
        modal.close();
    }
});

addBookToLibrary("t1", "js1", 50, "Unread", mylibrary);
addBookToLibrary("t2", "js2", 50, "Unread", mylibrary);
addBookToLibrary("t3", "js3", 50, "Finished", mylibrary);
addBookToLibrary("t4", "js4", 50, "Unread", mylibrary);
displayLibrary(mylibrary);
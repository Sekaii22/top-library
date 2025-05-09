const myLibrary = [];
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
    let divBook = document.createElement("div");
    let divBookTop = document.createElement("div");
    let divBookBottom = document.createElement("div");
    let pTitle = document.createElement("p");
    let pAuthor = document.createElement("p");
    let pPages = document.createElement("p");
    let pHasRead = document.createElement("p");
    let delBtn = document.createElement("button");

    // add to DOM
    libraryContainer.appendChild(divBook);
    divBook.appendChild(delBtn);
    divBook.appendChild(divBookTop);
    divBook.appendChild(divBookBottom);
    divBookTop.appendChild(pTitle);
    divBookTop.appendChild(pAuthor);
    divBookBottom.appendChild(pPages);
    divBookBottom.appendChild(pHasRead);
    
    // add classes
    divBook.classList.add("book");

    delBtn.classList.add("delete-book-btn", "icon-btn")
    divBookTop.classList.add("book-top");
    divBookBottom.classList.add("book-bottom");

    pTitle.classList.add("title");
    pAuthor.classList.add("author");
    pPages.classList.add("pages");
    pHasRead.classList.add("read-status");

    // add attributes
    delBtn.hidden = true;
    delBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 -960 960 960" width="24px" fill="#e3e3e3"><path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z"/></svg>`

    // add book content
    divBook.dataset.id = book.id;
    pTitle.textContent = book.title;
    pAuthor.textContent = "By " + book.author;
    pPages.textContent = "Pages: " + book.pages;
    pHasRead.textContent = "Status: " + book.status;

    // add event listener
    divBook.addEventListener("mouseenter", () => delBtn.hidden = false);
    divBook.addEventListener("mouseleave", () => delBtn.hidden = true);

    delBtn.addEventListener("click", () => {
        // remove from arr
        let index = myLibrary.indexOf(book);
        myLibrary.splice(index, 1);

        // remove from display
        libraryContainer.removeChild(divBook);
    });
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

addBookToLibrary("t1", "js1", 50, "Unread", myLibrary);
addBookToLibrary("t2", "js2", 50, "Unread", myLibrary);
addBookToLibrary("t3", "js3", 50, "Finished", myLibrary);
addBookToLibrary("t4", "js4", 50, "Unread", myLibrary);
displayLibrary(myLibrary);
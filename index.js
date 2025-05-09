const mylibrary = [];

function Book(author, title, pages, status) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

function addBookToLibrary(author, title, pages, status, libraryArr) {
    let book = new Book(author, title, pages, status);

    if (libraryArr) {
        libraryArr.push(book);
    }
}

const libraryContainer = document.querySelector("#library-container");

function displayLibrary(libraryArr) {
    // loop through library arr
    // for each book, create a card in library container
    for (let i = 0; i < libraryArr.length; i++) {
        // create nodes
        let divCard = document.createElement("div");
        let divBookTop = document.createElement("div");
        let divBookBottom = document.createElement("div");
        let pTitle = document.createElement("p");
        let pAuthor = document.createElement("p");
        let pPages = document.createElement("p");
        let pHasRead = document.createElement("p");

        // add to DOM
        divBookTop.appendChild(pTitle);
        divBookTop.appendChild(pAuthor);
        divBookBottom.appendChild(pPages);
        divBookBottom.appendChild(pHasRead);
        divCard.appendChild(divBookTop);
        divCard.appendChild(divBookBottom);
        libraryContainer.appendChild(divCard);
        
        // add classes
        divCard.classList.add("book");
        divBookTop.classList.add("book-top");
        divBookBottom.classList.add("book-bottom");
        pTitle.classList.add("title");
        pAuthor.classList.add("author");
        pPages.classList.add("pages");
        pHasRead.classList.add("read-status");

        // add text content
        pTitle.textContent = libraryArr[i].title;
        pAuthor.textContent = libraryArr[i].author;
        pPages.textContent = "Pages: " + libraryArr[i].pages;
        pHasRead.textContent = "Status: " + libraryArr[i].status;
    }
}

addBookToLibrary("js1", "t1", 50, "Unread", mylibrary);
addBookToLibrary("js2", "t2", 50, "Unread", mylibrary);
addBookToLibrary("js3", "t3", 50, "Finished", mylibrary);
addBookToLibrary("js4", "t4", 50, "Unread", mylibrary);
displayLibrary(mylibrary);
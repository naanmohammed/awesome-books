const bookList = document.getElementById('book-list');
const addBookForm = document.getElementById('add-book-form');
const titleInput = document.getElementById('title-input');
const authorInput = document.getElementById('author-input');

let books = [];

function updateBookList() {
  bookList.innerHTML = '';
  for (let i = 0; i < books.length; i++) {
    const book = books[i];
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${book.title}</strong> <br> ${book.author}<br>`;
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.addEventListener('click', () => {
      removeBook(book.title);
    });
    const breakline = document.createElement('hr');
    listItem.appendChild(removeButton);
    listItem.appendChild(breakline);
    bookList.appendChild(listItem);
  }
  localStorage.setItem('books', JSON.stringify(books));
}

addBookForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = titleInput.value;
  const author = authorInput.value;
  const book = { title, author };
  books.push(book);
  titleInput.value = '';
  authorInput.value = '';
  updateBookList();
});

function removeBook(title) {
  books = books.filter((book) => book.title !== title);
  updateBookList();
}

window.addEventListener('load', () => {
  const storedBooks = localStorage.getItem('books');
  if (storedBooks) {
    books = JSON.parse(storedBooks);
    updateBookList();
  }
});

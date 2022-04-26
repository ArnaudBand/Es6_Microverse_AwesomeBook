import {
  blockDisplay, formSection, contactSection, bookTitle, bookAuthor, form, bookList, addedBook,
} from './variables.js';

// eslint-disable-next-line import/no-cycle
import UI from './displayBook.js';

export const listBtn = document.querySelector('.list-btn');
export const addBtn1 = document.querySelector('.adde-btn-1');
export const contactBtn = document.querySelector('.contact-btn');
export const displayList = () => {
  blockDisplay.style.display = 'flex';
  formSection.style.display = 'none';
  contactSection.style.display = 'none';
};

export const displayBookForm = () => {
  blockDisplay.style.display = 'none';
  formSection.style.display = 'flex';
  contactSection.style.display = 'none';
};

export const displayContact = () => {
  contactSection.style.display = 'flex';
  blockDisplay.style.display = 'none';
  formSection.style.display = 'none';
};

export default class Library {
  constructor() {
    this.collection = [];
  }

  static addCollection(newBook) {
    this.collection.push(newBook);
    localStorage.setItem('collection', JSON.stringify(this.collection));
  }

  static removeABook(target) {
    const removeBook = target.previousElementSibling.firstElementChild.textContent;

    this.collection.filter((book, index) => {
      if (book.title === removeBook) {
        this.collection.splice(index, 1);
      }
      return this.collection;
    });
    localStorage.setItem('collection', JSON.stringify(this.collection));
  }

  static getBook() {
    if (localStorage.getItem('collection') === null) {
      this.collection = [];
    } else {
      this.collection = JSON.parse(localStorage.getItem('collection'));
    }
    return this.collection;
  }
}

function Book(title, author) {
  this.title = title;
  this.author = author;
}

//  Class UI helps to display and remove books

const newDisplay = new UI();

// Message added Book

const addBookMsg = () => {
  addedBook.textContent = 'New book added';
  addedBook.style.display = 'block';
  setTimeout(() => {
    addedBook.style.display = 'none';
  }, 2000);
};

// AddBook function: to add books to our page in the storage and change them into objects.

const addBook = (e) => {
  const title = bookTitle.value;
  const author = bookAuthor.value;

  const newBook = new Book(title, author);

  Library.addCollection(newBook);

  newDisplay.displayBook(newBook);
  newDisplay.deleteInput(bookTitle, bookAuthor);
  addBookMsg();

  e.preventDefault();
};

// RemoveBook function: This function was build to remove a book added by the function below

const removeBook = (e) => {
  if (e.target.className === 'remove') {
    newDisplay.deleteBook(e.target);
    Library.removeABook(e.target);

    window.location.reload();
  }
};

// AddEventListener

form.addEventListener('submit', addBook);
bookList.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded', () => {
  const allBooks = Library.getBook();
  allBooks.forEach((book) => newDisplay.displayBook(book));
});

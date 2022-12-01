let library = [];
const content = JSON.parse(localStorage.getItem('Books'));
if (content === 0 || content === null) {
  localStorage.setItem('Books', JSON.stringify(library));
} else {
  library = content;

  for (let i = 0; i < library.length; i += 1) {
    const booklist = document.getElementById('bookcard');
    const booktemplate = `
           <div class="card">
            <h2 class="title">${library[i].title} by ${library[i].author}</h2>
            <button id="${library[i].id}" class="removebutton">Remove</button>
            </div>
            `;

    booklist.innerHTML += booktemplate;
  }
}

function Book(id, title, author) {
  this.id = id;
  this.title = title;
  this.author = author;
}

class UI {
  constructor(book) {
    this.book = book;
  }

  addBook(book) {
    this.book = book;
    const booklist = document.getElementById('bookcard');
    const cardtemplate = `

                <div class="card">
                <h2 class="title">${book.title} by ${book.author}</h2>
                <button id="${book.id}" class="removebutton">Remove</button>
                </div>
                `;
    booklist.innerHTML += cardtemplate;
  }

  resetForm(form1) {
    this.form1 = form1;
    form1.reset();
  }

  removeBook(element) {
    if (element.textContent === 'Remove') {
      const { id } = element;
      library = library.filter((book) => book.id.toString() !== id);
      localStorage.setItem('Books', JSON.stringify(library));
      element.parentElement.remove();
    }
    return this.book;
  }
}

// DOM events

document.getElementById('addform').addEventListener('submit', (e) => {
  const title = document.getElementById('bookname').value;
  const author = document.getElementById('bookauthor').value;
  let id = 0;
  if (library.length === 0 || library === null) {
    id = 1;
  } else {
    id = library[library.length - 1].id + 1;
  }

  const book = new Book(id, title, author);
  library.push(book);
  localStorage.setItem('Books', JSON.stringify(library));
  const ui = new UI();
  ui.addBook(book);

  const form1 = document.getElementById('addform');
  ui.resetForm(form1);
  e.preventDefault();
});

document.getElementById('bookcard').addEventListener('click', (e) => {
  const ui = new UI();
  ui.removeBook(e.target);
});

// Template function

const listbutton = document.querySelector('.navitem1');
const newbutton = document.querySelector('.navitem2');
const contactbutton = document.querySelector('.navitem3');
const list = document.getElementById('list');
const form = document.getElementById('form');
const contact = document.getElementById('contact');

listbutton.addEventListener('click', () => {
  list.style.display = 'flex';
  form.classList.replace('show', 'hide');
  contact.classList.replace('show', 'hide');
});

newbutton.addEventListener('click', () => {
  list.style.display = 'none';
  form.classList.replace('hide', 'show');
  contact.classList.replace('show', 'hide');
});

contactbutton.addEventListener('click', () => {
  list.style.display = 'none';
  form.classList.replace('show', 'hide');
  contact.classList.replace('hide', 'show');
});
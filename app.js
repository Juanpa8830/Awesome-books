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

  static addBook(book) {
    const booklist = document.getElementById('bookcard');
    const cardtemplate = `

                <div class="card">
                <h2 class="title">${book.title} by ${book.author}</h2>
                <button id="${book.id}" class="removebutton">Remove</button>
                </div>
                `;
    booklist.innerHTML += cardtemplate;
  }

  static resetForm() {
    document.getElementById('addform').reset();
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

  ui.resetForm();
  e.preventDefault();
});

document.getElementById('bookcard').addEventListener('click', (e) => {
  const ui = new UI();
  ui.removeBook(e.target);
});

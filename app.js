let books = [];
const booksList = document.getElementById('bookcard');

window.addEventListener('load', () => {
  const content = JSON.parse(localStorage.getItem('books'));
  if (content === 0 || content === null) {
    localStorage.setItem('books', JSON.stringify(books));
  } else {
    books = content;

    for (let i = 0; i < books.length; i += 1) {
      const booktemplate = `
        <div>
            <h3 class="booktitle">${books[i].title}</h3>
            <h3 class="bookauthor">${books[i].author}</h3>
            <button id="${books[i].id}" class="removebutton">Remove</button>
            <hr class="division">
        </div>
        `;

      booksList.innerHTML += booktemplate;
    }
  }
});

booksList.addEventListener('click', (event) => {
  if (event.target.textContent === 'Remove') {
    const { id } = event.target;
    books = books.filter((book) => book.id !== id);

    localStorage.setItem('books', JSON.stringify(books));
    event.target.parentElement.remove();
  }
});

const addbook = document.getElementById('addform');

addbook.addEventListener('submit', (e) => {
  e.preventDefault();

  const newtitle = document.getElementById('bookname').value;
  const newauthor = document.getElementById('bookauthor').value;
  let id = 0;
  if (books.length === 0) {
    id = 1;
  } else {
    id = books[books.length - 1].id + 1;
  }

  const newbook = { id, title: newtitle, author: newauthor };

  books.push(newbook);

  const booktemplate = `
    <div>
        <h3 class="booktitle">${newbook.title}</h3>
        <h3 class="bookauthor">${newbook.author}</h3>
        <button id="${newbook.id}" class="removebutton">Remove</button>
        <hr class="division">
    </div>
    `;

  booksList.innerHTML += booktemplate;
  localStorage.setItem('books', JSON.stringify(books));
  addbook.submit();
});
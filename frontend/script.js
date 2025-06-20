const form = document.getElementById('book-form');
const booksList = document.getElementById('books-list');

async function fetchBooks() {
  const res = await fetch('/api/books');
  const books = await res.json();

  booksList.innerHTML = '';
  books.forEach(book => {
    const div = document.createElement('div');
    div.className = 'book';
    div.innerHTML = `
      <strong>${book.title}</strong>
      <p>Author: ${book.author}</p>
      <p>Year: ${book.year}</p>
      <div class="book-actions">
        <button onclick="deleteBook(${book.id})">Delete</button>
        <button onclick="editBook(${book.id}, '${book.title}', '${book.author}', ${book.year})">Edit</button>
      </div>
    `;
    booksList.appendChild(div);
  });
}

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = form.title.value.trim();
  const author = form.author.value.trim();
  const year = form.year.value.trim();

  if (!title || !author || !year) return alert("Please fill all fields.");

  await fetch('/api/books', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ title, author, year }),
  });

  form.reset();
  fetchBooks();
});

async function deleteBook(id) {
  await fetch(`/api/books/${id}`, { method: 'DELETE' });
  fetchBooks();
}

function editBook(id, title, author, year) {
  form.title.value = title;
  form.author.value = author;
  form.year.value = year;

  form.onsubmit = async (e) => {
    e.preventDefault();
    await fetch(`/api/books/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: form.title.value,
        author: form.author.value,
        year: form.year.value,
      }),
    });
    form.reset();
    form.onsubmit = originalSubmit;
    fetchBooks();
  };
}

const originalSubmit = form.onsubmit;
fetchBooks();

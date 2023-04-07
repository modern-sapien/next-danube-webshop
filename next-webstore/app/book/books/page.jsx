async function fetchBooks() {
  try {
    const response = await fetch(`http://localhost:5000/api/v1/books`);
    const responseJSON = await response.json();
    const books = await responseJSON.data;
    return books;
  } catch (error) {
    console.log(error);
  }
}

const BooksPage = async () => {
  const books = await fetchBooks();
  console.log(books.data);
  return (
    <div>
      {books.map((book) => (
        <div className="" key={book.id}>
          <h3>{book.title}</h3>
          <ul>
            <li> {book.author}</li>
            <li> {book.publisher}</li>
            <li> {book.price}</li>
            <li> {book.image}</li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default BooksPage;

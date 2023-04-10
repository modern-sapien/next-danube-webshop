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
        <div className="book-container" data-test={book.title} key={book.id}>
          <h3>{book.title}</h3>
          <ul>
            <li> author: {book.author}</li>
            <li> publisher: {book.publisher}</li>
            <li>genre: {books.genre}</li>
            <li> price: {book.price}</li>
            <li> {book.image}</li>
          </ul>
          <button className="btn" data-test="add-to-cart">add to cart</button>
        </div>
      ))}
    </div>
  );
};

export default BooksPage;

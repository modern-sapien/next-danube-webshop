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

const BookCards = async () => {
  const books = await fetchBooks();
  console.log(books.data);
  return (
    <div className="right-column">
      {books.map((book) => (
        <div className="card" data-test={book.title} key={book.id}>
          <h3 style={{display: "flex", justifyContent: "center"}}>{book.title}</h3>              
          <img style={{display: "flex", justifyContent: "center"}} src="./gatsbycover.png" width="200" height="200" alt="User profile picture" />

          <ul >
            <li> author: {book.author}</li>
            <li> publisher: {book.publisher}</li>
            <li>genre: {books.genre}</li>
            <li> price: {book.price}</li>
          </ul>
          <button className="btn" data-test="add-to-cart">
            add to cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default BookCards;

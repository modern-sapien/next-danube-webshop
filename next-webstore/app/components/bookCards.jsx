import Link from "next/link";

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
          <Link href="/book" data-test="book-link" style={{ display: "flex", justifyContent: "center", flexDirection: "column"}}>
            <h3 style={{ display: "flex", justifyContent: "center" }}>{book.title}</h3>
            <img
              style={{ display: "flex", justifyContent: "center" }}
              src="./gatsbycover.png"
              width="200"
              height="200"
              alt="User profile picture"
            />
          </Link>

          <ul>
            <li> Author: {book.author}</li>
            <li> Publisher: {book.publisher}</li>
            <li>Genre: {books.genre}</li>
            <li> Price: {book.price}</li>
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

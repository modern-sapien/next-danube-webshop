"use client";

import Link from "next/link";

async function fetchBooks() {
  try {
    const response = await fetch(`https://next-danube-webshop-backend.vercel.app/api/v1/books`);
    const responseJSON = await response.json();
    const books = await responseJSON.data;
    return books;
  } catch (error) {
    console.log(error);
  }
}

const BookCards = async () => {
  const books = await fetchBooks();
  return (
    <div className="right-column">
      {books ? (
        <>
          {books.map((book) => (
            <div className="card" data-test={book.title} key={book.id}>
              <Link href={`/book/${book.id}`}>
                <div
                  data-test="book-link"
                  style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}
                >
                  <h3 style={{ display: "flex", justifyContent: "center" }}>{book.title}</h3>
                  <img
                    style={{ display: "flex", justifyContent: "center" }}
                    src="./gatsbycover.png"
                    width="200"
                    height="200"
                    alt="User profile picture"
                  />
                </div>
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
        </>
      ) : (
        <h1>LOADING</h1>
      )}
    </div>
  );
};

export default BookCards;

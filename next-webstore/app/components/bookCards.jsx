'use client';

import Link from 'next/link';
import { trace, SpanStatusCode } from '@opentelemetry/api';
import BookProfile from './bookProfile';
import { useState, useEffect } from 'react';

const tracer = trace.getTracer('vercel-tracer');

async function fetchBooks() {
  const span = tracer.startSpan('fetchBooks');
  const apiUrl =
    process.env.NEXT_PUBLIC_NODE_ENV === "production"
      ? "https://next-danube-webshop-backend.vercel.app/api/v1"
      : "https://next-danube-webshop-backend-staging.vercel.app/api/v1";

  try {
    console.log(apiUrl);
    const response = await fetch(`${apiUrl}/books`);
    const responseJSON = await response.json();
    const books = await responseJSON.data;
    span.setStatus({ code: SpanStatusCode.OK }); // Use SpanStatusCode.OK
    return books;
  } catch (error) {
    span.setStatus({ code: SpanStatusCode.ERROR, message: error.message }); // Use SpanStatusCode.ERROR
    console.log(error);
    return null;
  } finally {
    span.addEvent('Books API was called', {
      provider: 'checkly',
      someKey: 'someValue',
    })
    span.end();
  }
}

const BookCards = () => {
  const [books, setBooks] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    async function getBooks() {
      const fetchedBooks = await fetchBooks();
      setBooks(fetchedBooks);
    }

    getBooks();
  }, []);

  const handleBookClick = (book) => {
    setSelectedBook(book);
  };

  return (
    <>
      {!selectedBook && (
        <div className='right-column'>
          {books ? (
            <>
              {books.map((book) => (
                <div
                  className='card'
                  data-test={book.title}
                  key={book.id}
                  onClick={() => handleBookClick(book)}
                >
                  <div
                    data-test='book-div'
                    style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}
                  >
                    <h3 style={{ display: 'flex', justifyContent: 'center' }}>{book.title}</h3>
                    <img
                      style={{ display: 'flex', justifyContent: 'center' }}
                      src='./gatsbycover.png'
                      width='200'
                      height='200'
                      alt='User profile picture'
                    />
                  </div>

                  <ul>
                    <li> Author: {book.author}</li>
                    <li> Publisher: {book.publisher}</li>
                    <li>Genre: {book.genre}</li>
                    <li> Price: {book.price}</li>
                  </ul>
                  <button className='btn' data-test='add-to-cart'>
                    add to cart
                  </button>
                </div>
              ))}
            </>
          ) : (
            <h1>LOADING</h1>
          )}
        </div>
      )}
      {selectedBook && (
        <BookProfile
          id={selectedBook.id}
          author={selectedBook.author}
          publisher={selectedBook.publisher}
          title={selectedBook.title}
          genre={selectedBook.genre}
        />
      )}
    </>
  );
};

export default BookCards;

"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const BookPage = ({id}) => {
  const router = useRouter();
  const [book, setBook] = useState(null);

  useEffect(() => {
    async function fetchBook() {
      try {
        const response = await fetch(`https://next-danube-webshop-backend.vercel.app/api/v1/books/${router.query.id}`);
        const responseJSON = await response.json();
        const bookData = await responseJSON.data;
        setBook(bookData);
      } catch (error) {
        console.log(error);
      }
    }

    if (router.query.id) {
      fetchBook();
    }
  }, [router.query.id]);

  if (typeof router === 'undefined' || !book) {
    return <h1>Loading...</h1>;
  }

  return (
    <div>
      <h1>{book.title}</h1>
      <p>{book.author}</p>
      <p>{book.publisher}</p>
      <p>{book.genre}</p>
      <p>{book.price}</p>
    </div>
  );
};

export default BookPage;
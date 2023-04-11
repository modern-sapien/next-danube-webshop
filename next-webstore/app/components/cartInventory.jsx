"use client";

import React, { useEffect } from "react";
import "../cart/Cart.css";
import CartItem from "../components/cartItem";

const cartInventory = ({}) => {
  const cartItems = [
    {
      id: 1,
      title: 'Title 1',
      author: "Author 1",
      publisher: "Publisher 1",
      genre: "Genre 1",
      price: 10.0,
      quantity: 2,
    },
    {
      id: 2,
      title: 'Title 2',
      author: "Author 2",
      publisher: "Publisher 2",
      genre: "Genre 2",
      price: 15.0,
      quantity: 1,
    },
    {
      id: 3,
      title: 'Title 3',
      author: "Author 3",
      publisher: "Publisher 3",
      genre: "Genre 3",
      price: 20.0,
      quantity: 3,
    },
  ];

  console.log(cartItems, "cartItems");
  return (
    <div className="test left-column">
      <h1 style={{ textAlign: "center" }}>Order</h1>
      {cartItems &&
        cartItems.map((item) => (
          <CartItem key={item.id} item={item} author={item.author}>
            hello
          </CartItem>
        ))}
    </div>
  );
};

export default cartInventory;

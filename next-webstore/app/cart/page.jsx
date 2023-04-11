"use client";
import React, { useState, useEffect } from "react";
import CartItem from "../components/cartItems";
import "./Cart.css";

const CartPage = () => {
  const cartItems = [
    {
      id: 1,
      author: "Author 1",
      publisher: "Publisher 1",
      genre: "Genre 1",
      price: 10.0,
      quantity: 2,
    },
    {
      id: 2,
      author: "Author 2",
      publisher: "Publisher 2",
      genre: "Genre 2",
      price: 15.0,
      quantity: 1,
    },
    {
      id: 3,
      author: "Author 3",
      publisher: "Publisher 3",
      genre: "Genre 3",
      price: 20.0,
      quantity: 3,
    },
  ];

  return (
    <div className="cart-container" suppressHydrationWarning={true}>


      <h2>Your Cart</h2>
      <div className="cart-items-container test">
        {cartItems.map((item) => (
          <CartItem key={item.id} item={item} className="cart-item"/>
        ))}
      </div>
    
    </div>
  );
};

export default CartPage;

"use client";
import React from "react";

const cartItem = ({ item }) => {
  console.log(`${item}`);
  return (
    <div
      className="card"
      // item={item}
      // onQuantityChange={handleQuantityChange}
      // onRemoveItem={handleRemoveItem}
    >
      <ul>
        <li> Author: {item.author}</li>
        <li>Genre: {item.genre}</li>
        <li> Quantity: {item.quantity}</li>
        <li> Price: {item.price}</li>
        <li>Item total: ${item.price * item.quantity}</li>
      </ul>
    </div>
  );
};

export default cartItem;

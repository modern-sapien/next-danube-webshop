"use client";
import React from "react";

const cartItem = ({ item }) => {
  console.log(`${item}`);
  return (
    <div  data-test={item.id}
      className="cart-item"
      // item={item}
      // onQuantityChange={handleQuantityChange}
      // onRemoveItem={handleRemoveItem}
    >
      <>
        <h2 className="cart-item-title"> {item.title}</h2>
        <h3 className="cart-item-author"> {item.author}</h3>
        <p className="cart-item-author">  Quantity: {item.quantity}</p>
        <p className="cart-item-author">${item.price} per unit</p>
        <p className="cart-item-price">total =${item.price * item.quantity}</p>
      </>
    </div>
  );
};

export default cartItem;

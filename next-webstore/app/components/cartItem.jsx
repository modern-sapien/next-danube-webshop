"use client";
import React from "react";
import styles from '../styles/cart.module.css';


const cartItem = ({ item }) => {
  console.log(`${item}`);
  return (
    <div  data-test={item.id}
      className={styles.cartItem}
      // item={item}
      // onQuantityChange={handleQuantityChange}
      // onRemoveItem={handleRemoveItem}
    >
      <>
        <h2 className={styles.cartItemTitle}> {item.title}</h2>
        <h3 className={styles.cartItemAuthor}> {item.author}</h3>
        <p className={styles.cartItemAuthor}>  Quantity: {item.quantity}</p>
        <p className={styles.cartItemAuthor}>${item.price} per unit</p>
        <p className={styles.cartItemPrice}>total =${item.price * item.quantity}</p>
      </>
    </div>
  );
};

export default cartItem;

import React from "react";
import styles from '../styles/cart.module.css';

const cartCheckout = (props) => {
  const {
    firstName = "",
    lastName = "",
    address = "",
    cardNumber = "",
    cardExpiration = "",
    cardCVV = "",
    city = "",
    state = "",
    zipCode = "",
    setFirstName = () => {},
    setLastName = () => {},
    setAddress = () => {},
    setCity = () => {},
    setState = () => {},
    setZipCode = () => {},
    setcardNumber = () => {},
    setCardExpiration = () => {},
    setcardCVV = () => {},
  } = props;

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle form submission logic here
  };

  return (
    <form data-test="" className={styles.stickyForm} onSubmit={handleSubmit}>
      <h2>Shipping</h2>
      <div className={styles.checkoutDiv}>
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          name="firstName"
          value={firstName}
          onChange={(event) => props.setFirstName(event.target.value)}
        />
      </div>
      <div className={styles.checkoutDiv}>
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          name="lastName"
          value={lastName}
          onChange={(event) => props.setLastName(event.target.value)}
        />
      </div>

      <div className={styles.checkoutDiv}>
        <label htmlFor="address">Address:</label>
        <input
          type="text"
          id="address"
          name="address"
          value={address}
          onChange={(event) => props.setAddress(event.target.value)}
        />
      </div>

      <div className={styles.checkoutDiv}>
        <label htmlFor="city">City:</label>
        <input
          type="text"
          id="city"
          name="city"
          value={city}
          onChange={(event) => props.setCity(event.target.value)}
        />
      </div>

      <div className={styles.checkoutDiv}>
        <label htmlFor="state">State:</label>
        <input
          type="text"
          id="state"
          name="state"
          value={state}
          onChange={(event) => props.setState(event.target.value)}
        />
      </div>

      <div className={styles.checkoutDiv}>
        <label htmlFor="zipCode">Zip Code:</label>
        <input
          type="text"
          id="zipCode"
          name="zipCode"
          value={zipCode}
          onChange={(event) => props.setZipCode(event.target.value)}
        />
      </div>

      <h2>Payment</h2>
      <div className={styles.checkoutDiv}>
        <label htmlFor="cardNumber">Card number:</label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={cardNumber}
          onChange={(event) => props.setcardNumber(event.target.value)}
        />
      </div>

      <div className={styles.checkoutDiv}>
        <label htmlFor="cardExpiration">Card expiration:</label>
        <input
          type="text"
          id="cardExpiration"
          name="cardExpiration"
          value={cardExpiration}
          onChange={(event) => props.setCardExpiration(event.target.value)}
        />
      </div>

      <div className={styles.checkoutDiv}>
        <label htmlFor="cardCVV">CVV:</label>
        <input
          type="text"
          id="cardCVV"
          name="cardCVV"
          value={cardCVV}
          onChange={(event) => props.setcardCVV(event.target.value)}
        />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default cartCheckout;

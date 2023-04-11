"use client";
import React, { useState } from "react";

const SignupForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRetry, setPasswordRetry] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    // do something with form data, like send it to a server
    console.log("Form submitted:", { email, username, password, passwordRetry });

    // clear form fields
    setEmail("");
    setUsername("");
    setPassword("");
    setPasswordRetry("");
  };

  return (
    <div>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="passwordRetry">Retry password:</label>
          <input
            type="password"
            id="passwordRetry"
            value={passwordRetry}
            onChange={(event) => setPasswordRetry(event.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignupForm;

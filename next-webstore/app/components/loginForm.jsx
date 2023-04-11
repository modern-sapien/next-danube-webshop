"use client";
import React, { useState } from "react";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      // handle login
      fetch("https://next-danube-webshop-nwm9c679y-modern-sapien.vercel.app/api/v1/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Invalid email or password");
          }
          // handle successful login
          console.log("User logged in successfully");
        })
        .catch(error => {
          console.error(error);
        });
    } else {
      // handle sign up
      fetch("https://next-danube-webshop-nwm9c679y-modern-sapien.vercel.app/api/v1/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: email,
          username: username,
          password: password,
          passwordConfirm: passwordConfirm
        })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error("Unable to create account");
          }
          // handle successful sign up
          console.log("User signed up successfully");
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  return (
    <div>
      <h1>{isLogin ? "Login" : "Sign Up"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        {!isLogin && (
          <div>
            <label>Username:</label>
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
          </div>
        )}
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        {/* Additional fields only when isLogin is false */}

        {!isLogin && (
          <div>
            <label>Confirm Password:</label>
            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
            />
          </div>
        )}

        <button type="submit">{isLogin ? "Login" : "Sign Up"}</button>
      </form>
      <p>
        {isLogin ? "Don't have an account? " : "Already have an account? "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            setIsLogin(!isLogin);
          }}
        >
          {isLogin ? "Sign up here" : "Login here"}
        </a>
      </p>
    </div>
  );
};

export default LoginForm;

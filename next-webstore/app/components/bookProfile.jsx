"use client";
import React, { useState } from "react";

const bookProfile = ({ author, title, genre, publisher, id }) => {
  const [selectedFile, setSelectedFile] = useState(null);

  function handleFileUpload(event) {
    setSelectedFile(event.target.files[0]);
  }

  async function handleSubmit(event) {
    event.preventDefault(); // prevent the default form submission
    const title = event.target.elements.title.value;
    const rating = event.target.elements.rating.value;
    const recommend = event.target.elements.recommend.value;
    const description = event.target.elements.description.value;

    try {
      const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
      };
      const token = getCookie("token");

      console.log(token, "token");
      console.log(id, "id")

      const response = await fetch(
        `http:localhost:3000/api/v1/books/70de0e72-26a8-4d47-8316-7f2eb814c25e/review`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ title, rating, recommend, description }),
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="columns">
      <div className="left-column">
        <img
          data-test="book-image"
          className="book-image"
          width="300"
          height="300"
          src="./gatsbycover.png"
          alt="User profile picture"
        />
        <a href="./gatsbycover.png" download>
          Pretty cool image, want to download?
        </a>
      </div>

      <div className="right-column-expanded">
        <form className="card-expanded" onSubmit={handleSubmit} key={id}>
          <h1>Write a review</h1>
          <div className="form-group">
            <h3>Title: {title}</h3>
            <h3>Author: {author}</h3>
            <h3>Publisher: {publisher}</h3>
          </div>
          <div className="form-group">
            <label htmlFor="title">title of review:</label>
            <input type="text" className="form-control" id="title" />
          </div>
          <div className="form-group">
            <label htmlFor="rating">rating:</label>
            <select type="rating" className="form-control" id="rating">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="recommend">recommend:</label>
            <select type="recommend" className="form-control" id="recommend">
              <option value="yes">yes</option>
              <option value="no">no</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">content:</label>
            <textarea type="text" className="form-control" id="description" />
          </div>
          <button type="submit" className="btn btn-primary">
            Add review
          </button>
        </form>
      </div>
    </div>
  );
};

export default bookProfile;

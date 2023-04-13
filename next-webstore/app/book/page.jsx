"use client";

import React, { useState } from "react";

const BookPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  function handleFileUpload(event) {
    setSelectedFile(event.target.files[0]);
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
        <form className="card-expanded">
          <h1>TITLE OF BOOK</h1>
          <div className="form-group">
            <label htmlFor="title">title of review:</label>
            <input type="text" className="form-control" id="title" />
          </div>
          <div className="form-group">
            <label htmlFor="recommend">recommend:</label>
            <select type="recommend" className="form-control" id="recommend">
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="rating">rating:</label>
            <select type="rating" className="form-control" id="rating">
              <option value="yes">yes</option>
              <option value="no">no</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">content:</label>
            <textarea type="text" className="form-control" id="description" />
          </div>
          <button type="submit" className="btn btn-primary">
            Add to cart
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookPage;
"use client";

import React, { useState } from "react";
import BookCards from "../components/bookCards";

const UserPage = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  function handleFileUpload(event) {
    setSelectedFile(event.target.files[0]);
  }

  return (
    <div className="columns">
      <div className="left-column">
        <img src="./niccage.png" alt="User profile picture" />
        <label htmlFor="file-upload">Change your profile photo?</label>
        <input id="file-upload" type="file" accept=".jpg,.png,.gif" onChange={handleFileUpload} />
      </div>
      <div className="right-column-expanded">
        <form className="card-expanded">
          <h1>User Profile</h1>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input type="text" className="form-control" id="username" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input type="email" className="form-control" id="email" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" className="form-control" id="password" />
          </div>
          <div className="form-group">
            <label htmlFor="dateJoined">Date Joined:</label>
            <input type="text" className="form-control" id="dateJoined" />
          </div>
          <button type="submit" className="btn btn-primary">
            Update
          </button>
        </form>
      </div>

    </div>
    
  );
};

export default UserPage;

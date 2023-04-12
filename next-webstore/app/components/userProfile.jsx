import React from "react";

const UserProfile = ({ userData }) => {
  console.log(userData)
  return (
    <form className="card-expanded">
      <h1>User Profile</h1>
      {userData && (
        <>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              className="form-control"
              id="username"
              value={userData.data.username}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={userData.data.email}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input type="password" className="form-control" id="password" />
          </div>
          <div className="form-group">
            <label htmlFor="dateJoined">Date Joined:</label>
            <input
              type="text"
              className="form-control"
              id="dateJoined"
              value={userData.data.createdAt}
            />
          </div>
        </>
      )}
      <button type="submit" className="btn btn-primary">
        Update
      </button>
    </form>
  );
};

export default UserProfile;

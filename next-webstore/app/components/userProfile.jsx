import React, { useState } from "react";

const UserProfile = ({ userData }) => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {

      const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(";").shift();
      };
      const token = getCookie("token");
      const { id, email } = userData.data;

      console.log(token, "token");
      console.log(id, "id");
      console.log(email, "email");
      console.log(formValues, "formValues");

      const response = await fetch(
        `https://next-danube-webshop-backend.vercel.app/api/v1/users/${id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...formValues, email }), // Include email in request body
        }
      );

      const data = await response.json();
      console.log(data, "data");
    } catch (error) {
      console.error("There was a problem updating the user profile", error);
    }
  };

  return (
    <form className="card-expanded" onSubmit={handleSubmit}>
      <h1>User Profile</h1>
      {userData && (
        <>
          <div className="form-group" key={userData.data.id}>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              value={formValues.username || userData.data.username}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formValues.email || userData.data.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formValues.password}
              onChange={handleInputChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dateJoined">Date Joined:</label>
            <input
              type="text"
              className="form-control"
              id="dateJoined"
              name="dateJoined"
              value={userData.data.createdAt}
              readOnly
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
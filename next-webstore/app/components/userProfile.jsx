import React, { useState } from "react";

const UserProfile = ({ userData }) => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
  });

  const [message, setMessage] = useState("");

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
        `${process.env.NEXT_PUBLIC_ENV_URL}/users/${id}`,
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
      setMessage("Successfully updated");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    } catch (error) {
      console.error("There was a problem updating the user profile", error);
      setMessage("Something went wrong");
      setTimeout(() => {
        setMessage("");
      }, 5000);
    }
  };

  return (
    <>
      <form className="card-expanded" style={{ fontSize: '1.3rem' }} onSubmit={handleSubmit}>
        
        {userData && (
          <>
            <div className="form-group" key={userData.data.id}>
              <h1>User Profile</h1>
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
              <p>Date Joined: {userData.data.createdAt}</p>
              <label htmlFor="dateJoined"></label>
            </div>
          </>
        )}
        <button type="submit" className="btn btn-primary user-button">
          Update
        </button>
        {message ? <h3>{message}</h3> : ""}
      </form>
    </>
  );
};

export default UserProfile;

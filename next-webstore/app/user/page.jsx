"use client"
import React, { useEffect, useState } from "react";
import BookCards from "../components/bookCards";
import UserPhoto from "../components/userPhoto";
import UserProfile from "../components/userProfile";

const UserPage = () => {
  const [userData, setUserData] = useState(null);
  const [userMessage, setUserMessage] = useState("")
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://next-danube-webshop.vercel.app/api/v1/auth/me"
      );
      const data = await response.json();
      setUserData(data.data);
      setLoading(false);
      console.log(data)
    }
      try {

        setTimeout(() => {
          setUserMessage("loading")
          console.log(userMessage)
        }, 3000);
        fetchData();
      } catch (error) {
        setUserMessage("failed")
        console.log(userMessage)
      }


    
  }, []);

  return (
    <div className="columns">
      {userMessage ? <h1> {userMessage}</h1> : ""}
      <div className="left-column">
      {loading ? (
          <p>Loading...</p>
        ) : (
          <UserPhoto userData={userData} />
        )}      </div>
      <div className="right-column-expanded">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <UserProfile userData={userData} />
        )}
      </div>
    </div>
  );
};

export default UserPage;
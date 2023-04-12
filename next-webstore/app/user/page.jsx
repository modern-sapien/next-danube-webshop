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
    const fetchData = async () => {
      try {
        // Get token from cookies
        const getCookie = (name) => {
          const value = `; ${document.cookie}`;
          const parts = value.split(`; ${name}=`);
          if (parts.length === 2) return parts.pop().split(";").shift();
        };
        const token = getCookie("token");

        // Fetch user data with token in headers
        const response = await fetch('https://next-danube-webshop-backend.vercel.app/api/v1/auth/me', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          setUserMessage("success");
          setUserData(data);
          console.log(data)
        } else {
          setUserMessage("failed");
          console.error(error, "error")
          console.log(error, "log error")
          console.log("failed")
        }
      } catch (error) {
        setUserMessage("failed");
        console.error(error);
        console.log(error, "log error")
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <div className="columns">
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
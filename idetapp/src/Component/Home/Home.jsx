import React from 'react'
import NavBar from '../NavBar/NavBar'
import LatestNewsLayout from '../Layout/LatestNewsLayout'
import CatNav from '../CatNav/CatNav'
import CommonNews from '../Layout/CommonNews'
import { useEffect } from "react";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { jwtDecode } from 'jwt-decode';
import { userState } from '../../recoil/userState'
import {  useNavigate } from 'react-router-dom'


function Home() {
  const setUser = useSetRecoilState(userState);
  const user = useRecoilValue(userState);


  const navigate = useNavigate();

   // Function to handle Create Article navigation
   const handleReaderdetails = () => {
    navigate("/readerDetails");
  };

  const fetchUserDetails = async () => {

    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        //decode the token to get user details
        const decordedToken = jwtDecode(token);
        const { userId, roleType } = decordedToken;
        //then fetch user details

        const response = await axios.get("http://localhost:3001/auth/user-details", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log("response.data", response.data);
        const userDetails = response.data;

        setUser({
          isLoggedIn: true,
          userName: userDetails.firstName,
          roleType: roleType,
        })



      } catch (error) {
        console.error("Error fetching user data", error);
      }
    }



  }

    useEffect(() => {
      fetchUserDetails();

    }, [setUser])


  return (
    <div className=' '>
      <NavBar/>
      <div className='w-full mx-auto items-start md:w-13/12 lg:w-8/12 px-2'><LatestNewsLayout/></div>
      <div className='w-full mx-auto items-start md:w-13/12 lg:w-8/12 px-2 m-5  '><CatNav/></div>
      <div className='w-full mx-auto items-start md:w-13/12 lg:w-8/12 px-2'><CommonNews/></div>
       
    </div>
  )
}

export default Home

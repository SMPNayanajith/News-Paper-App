import React from 'react'
import NavBar from '../NavBar/NavBar'
import LatestNewsLayout from '../Layout/LatestNewsLayout'
import CatNav from '../CatNav/CatNav'
import CommonNews from '../Layout/CommonNews'



function Home() {
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

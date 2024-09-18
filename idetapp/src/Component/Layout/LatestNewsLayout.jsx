import React, { useEffect, useState } from 'react'
import NewsCard from '../NewsCard/NewsCard'
import img1 from '../Image/e1.jpeg'
import axios from 'axios'

function LatestNewsLayout() {

  const [newsData, setNewsData]=useState([])

  const fetchNewsData = async ()=>{
    try {
      const response = await axios.get("http://localhost:3001/auth/fetch-articles");
      if(!response)
        {
        console.log("Error featching news data");
      }

      setNewsData(response.data.latestArticle)
      console.log(response.data.latestArticle)
      
    } catch (error) {
      console.log("error", error)
    }
  }
  useEffect(()=>{
    fetchNewsData();

  },[])
  return (
    <div className='w-full flex flex-col space-y-2 '>
      <div>
        <h2 className=' font-semibold text-slate-800 capitalize'>Latest News</h2>
      </div>
      <div className='w-full md:flex-row space-x-0 md:space-x-2 space-y-2 md:space-y-0 flex flex-col'>
       
        {
          newsData && newsData?.map((newsItem,index)=>(
            <NewsCard key={index} newsItem={newsItem} />

          ))
        }
      </div>
      
      
    </div>
  )
}

export default LatestNewsLayout

import axios from 'axios'
import React, { useEffect, useState } from 'react'
import NewsCard from '../NewsCard/NewsCard'

function OwnerArticle() {

  const [articleData, setArticleData] = useState([]) // Ensure it's initialized as an array
  const [error, setError] = useState(null)

  const fetchOwnerArticles = async () => {
    try {
      const token = localStorage.getItem("authToken");
      
      if (!token) {
        setError("No token found, please login again.");
        return;
      }

      const response = await axios.get("http://localhost:3001/auth/fetch-articles", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      if (response.status === 200) {
        setArticleData(Array.isArray(response.data) ? response.data : []); // Ensure data is an array
      } else {
        setError("Failed to fetch user details.");
      }
       
    } catch (error) {
      console.error("Fetch error:", error.message);
      setError("An error occurred while fetching articles.");
    }
  }

  useEffect(() => {
    fetchOwnerArticles();
  }, []);

  return (
    <div>
      {error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : (
        <div className='w-full flex flex-col space-y-2'>
          <div>
            <h2 className='font-semibold text-slate-800 capitalize'>Latest News</h2>
          </div>
          <div className='w-full md:flex-row space-x-0 md:space-x-2 space-y-2 md:space-y-0 flex flex-col'>
            {Array.isArray(articleData) && articleData.map((newsItem, index) => (
              <NewsCard key={index} newsItem={newsItem} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default OwnerArticle;

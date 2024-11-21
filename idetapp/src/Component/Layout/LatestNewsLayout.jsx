import React, { useEffect, useState } from 'react'
import NewsCard from '../NewsCard/NewsCard'
import axios from 'axios'
import { useRecoilValue } from 'recoil';
import { userState } from '../../recoil/userState';
import { useNavigate } from 'react-router-dom';


function LatestNewsLayout() {

  const [newsData, setNewsData] = useState([])

  const fetchNewsData = async () => {
    try {
      const response = await axios.get("http://localhost:3001/auth/fetch-articles");
      if (!response) {
        console.log("Error featching news data");
      }

      setNewsData(response.data.latestArticle)
      console.log(response.data.latestArticle)
      

    } catch (error) {
      console.log("error", error)
    }
  }
  useEffect(() => {
    fetchNewsData();

  }, [])

  const user = useRecoilValue(userState);
  const navigate = useNavigate();

  // Function to handle Create Article navigation
  const handleCreateArticle = () => {
    navigate("/create-article");
  };

  return (
    <>
      <div className="flex-shrink-0 flex items-center space-x-4">
        {user.isLoggedIn && user.roleType === 'reporter' && (
          <div>
            <h1 className="font-semibold text-20 my-5">Will you create an article? Click here
              <button
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 mx-3"
                onClick={handleCreateArticle}
              >
                Create Article
              </button>
            </h1>
          </div>
        )}

      </div>
      <div className='w-full flex flex-col  space-y-2 my-5'>
        <div>
          <h2 className=' font-bold text-slate-500 text-3xl  md:my-3'>Latest News</h2>
        </div>
        <div className='w-full md:flex-row space-x-0 md:space-x-2 space-y-2 md:space-y-0 flex flex-col'>

          {
            newsData && newsData?.map((newsItem, index) => (
              <NewsCard key={index} newsItem={newsItem} />

            ))
          }
        </div>


      </div>
    </>
  )
}

export default LatestNewsLayout
// 165
// 132
// 32
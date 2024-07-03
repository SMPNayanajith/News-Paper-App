import React from 'react'
import NewsCard from '../NewsCard/NewsCard'
import img1 from '../Image/e1.jpeg'

function LatestNewsLayout() {
  return (
    <div className='w-full flex flex-col space-y-2 '>
      <div>
        <h2 className=' font-semibold text-slate-800 capitalize'>Latest News</h2>
      </div>
      <div className='w-full md:flex-row space-x-0 md:space-x-2 space-y-2 md:space-y-0 flex flex-col'>
        <NewsCard NewsImage={img1} NewsHeading={"dfghjkl"} NewsDiscription={'sdfghj'}/>
        <NewsCard NewsImage={img1}/>
        <NewsCard NewsImage={img1}/>
      </div>
      
      
    </div>
  )
}

export default LatestNewsLayout

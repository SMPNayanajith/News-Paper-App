import React from 'react'
import config from '../../config'

function NewsCard({newsItem}) {

  const coverImageUrl = `${config.baseUrl}/${newsItem.coverImage.replace(/\\/g, '/')}`;
  return (
    <div className='ml-0 h-[200px] items-center justify-center mx-auto sm:w-1/2 md:w-4/12 lg:4/12 news-card-wrapper w-full shadow-md shadow-slate-400 rounded-md relative bg-center bg-cover bg-no-repeat'>
        <div className='news-card-content rounded-md h-full w-full  flex flex-col bg-gradient-to-t from-slate-950 to bg-slate-400 opacity-80 ' >
         <img src={coverImageUrl} alt="" className='w-full h-full  rounded-md relative'/>

          <div className='w-full absolute bottom-0 h-auto flex-col space-y-1 left-0'>
            <h1 className='font-bold text- capitalize text-[2rem] text-black'>{newsItem.newsHeading}</h1>
            <p className='text-black text-xs break-all line-clamp-2 text-ellipsis'>{newsItem.newsDescription}</p>
          </div>

        </div>
      
    </div>
  )
}

export default NewsCard

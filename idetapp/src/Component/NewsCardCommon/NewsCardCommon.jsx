import React from "react";
import { FaCalendarAlt } from "react-icons/fa";
import config from '../../config'

function NewsCardCommon({
  articleItem 
}) {
  const coverImageUrl = `${config.baseUrl}/${articleItem.coverImage.replace(/\\/g, '/')}`;

  return (
    <div className="flex-row">
      <div className="h-auto flex flex-wrap max-w-[800px] rounded-tr-md rounded-tl-md ">
        <div className="flex flex-col p-2" >
        <div className="  ml-0 h-[200px] items-center justify-center mx-auto news-card-wrapper w-full shadow-md  rounded-tr-md rounded-tl-md  relative bg-center bg-cover bg-no-repeat">
          <div className=" news-card-content rounded-md h-full w-full  flex flex-col bg-gradient-to-t from-slate-950 to bg-slate-400 opacity-100 ">
             
            <div className="w-full absolute bottom-0 h-auto flex-col space-y-1 left-0">
              <img src={coverImageUrl} alt="" className="max-h-[80px] w-full" />

              <h1 className="p-2 font-bold text-white capitalize text-[2rem]">
                {articleItem?.newsHeading}
              </h1>
              <p className="text-white p-2 text-xs break-all line-clamp-2 text-ellipsis">
                {articleItem?.newsDescription}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full  flex flex-col space-y-1 py-3">
          <div className="w-full flex flex-row justify-between items-center">
            <span className="text-xs font-semibold text-gray-600">{articleItem?.author }</span>
            <span className="text-xs font-semibold text-gray-600 flex mx-3 justify-between">
              <FaCalendarAlt className="mr-2 flex flex-row space-x-2 justify-center items-center" />{" "}
              <span>{articleItem?.publishDate}</span>{" "}
            </span>
          </div>
          <div className="w-full">
            <p className="text-black line-clamp-4 text-xs break-all  text-ellipsis">
              {articleItem?.newsDescriptionLong}
            </p>
          </div>
        </div>
        </div>
       
      </div>
    </div>
  );
}

export default NewsCardCommon;

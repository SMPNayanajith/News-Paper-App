  import React from "react";
  import { FaCalendarAlt } from "react-icons/fa";
  import config from '../../config';

  function NewsCardCommon({ articleItem }) {
    const coverImageUrl = `${config.baseUrl}/${articleItem.coverImage.replace(/\\/g, '/')}`;

    return (
      <div className="h-auto flex flex-wrap max-w-[800px] rounded-tr-md rounded-tl-md shadow-md mb-5">
        <div className="flex flex-col p-2">
          {/* Fixed image container */}
          <div className="ml-0 items-center justify-center mx-auto news-card-wrapper w-full h-[200px] overflow-hidden rounded-t-md">
            <img 
              src={coverImageUrl} 
              alt="" 
              className="w-full h-full object-cover" 
            />
          </div>

          {/* Below the image: heading and description */}
          <div className="w-full bg-gray-200 p-3 rounded-b-md">
            <h1 className="font-bold text-gray-900 capitalize text-[2rem]">
              {articleItem?.newsHeading}
            </h1>
            <p className="text-gray-700 text-sm break-all">
              {articleItem?.newsDescription}
            </p>
          </div>

          {/* Text content below heading and description */}
          <div className="w-full flex flex-col space-y-1 py-3">
            <div className="w-full flex flex-row justify-between items-center">
              <span className="text-xs font-semibold text-gray-600">
                {articleItem?.author}
              </span>
              <span className="text-xs font-semibold text-gray-600 flex mx-3 justify-between">
                <FaCalendarAlt className="mr-2 flex flex-row space-x-2 justify-center items-center" />
                <span>{articleItem?.publishDate}</span>
              </span>
            </div>
            <div className="w-full">
              <p className="text-black line-clamp-4 text-xs break-all text-ellipsis">
                {articleItem?.newsDescriptionLong}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  export default NewsCardCommon;

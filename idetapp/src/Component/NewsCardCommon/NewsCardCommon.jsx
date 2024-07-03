import React from "react";
import { FaCalendarAlt } from "react-icons/fa";

function NewsCardCommon({
  NewsImage,
  NewsHeading,
  NewsDiscription,
  author,
  datentime,
}) {
  return (
    <div className="flex-row">
      <div className="h-auto flex flex-col w-full rounded-tr-md rounded-tl-md ">
        <div className="  ml-0 h-[200px] items-center justify-center mx-auto news-card-wrapper w-full shadow-md  rounded-tr-md rounded-tl-md  relative bg-center bg-cover bg-no-repeat">
          <div className=" news-card-content rounded-md h-full w-full  flex flex-col bg-gradient-to-t from-slate-950 to bg-slate-400 opacity-100 ">
            <img
              src={NewsImage}
              alt=""
              className="w-full h-full  rounded-md relative"
            />

            <div className="w-full absolute bottom-0 h-auto flex-col space-y-1 left-0">
              <h1 className="p-2 font-bold text-white capitalize text-[2rem]">
                {NewsHeading}
              </h1>
              <p className="text-white p-2 text-xs break-all line-clamp-2 text-ellipsis">
                {NewsDiscription}
              </p>
            </div>
          </div>
        </div>
        <div className="w-full  flex flex-col space-y-1 py-3">
          <div className="w-full flex flex-row justify-between items-center">
            <span className="text-xs font-semibold text-gray-600">Author</span>
            <span className="text-xs font-semibold text-gray-600 flex">
              <FaCalendarAlt className="mr-2 flex flex-row space-x-2 justify-center items-center" />{" "}
              <span>5\10\2024</span>{" "}
            </span>
          </div>
          <div className="w-full">
            <p className="text-black line-clamp-4 text-xs break-all  text-ellipsis">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Quibusdam fugit, ratione magni, sit adipisci quis commodi enim
              aliquid ea corporis, id est quas. Delectus iusto laboriosam quam
              voluptatem dolorum saepe!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NewsCardCommon;

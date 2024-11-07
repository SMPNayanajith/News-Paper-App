import React from "react";
import NewsCardCommon from "../NewsCardCommon/NewsCardCommon";
import { useRecoilValue } from "recoil";
import { articleState } from "../../recoil/articleState";


function CommonNews() {

const articleData = useRecoilValue(articleState);
console.log(articleData)
  return (
    <div className="w-full  flex flex-col space-y-2 ">
      <div className="flex flex-wrap  space-x-4">
        <div className="w-1/2 max-w  space-x-0 md:space-x-2 space-y-2 md:space-y-0 flex flex-col md:flex-row">
        
        {articleData && articleData?.map((articleItem,index)=>(
          <NewsCardCommon 
          key={index}
          articleItem={articleItem}
        />

        ))}
          
          
        </div>
      </div>
    </div>
  );
}

export default CommonNews;

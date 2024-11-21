import React from "react";
import NewsCardCommon from "../NewsCardCommon/NewsCardCommon";
import { useRecoilValue } from "recoil";
import { articleState } from "../../recoil/articleState";

function CommonNews() {
  const articleData = useRecoilValue(articleState);
  console.log(articleData);

  return (
    <div className="w-full">
      {/* Grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {articleData &&
          articleData.map((articleItem, index) => (
            <div key={index} className="flex justify-center">
              <NewsCardCommon articleItem={articleItem} />
            </div>
          ))}
      </div>
    </div>
  );
}

export default CommonNews;

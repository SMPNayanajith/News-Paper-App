import React from "react";
import NewsCardCommon from "../NewsCardCommon/NewsCardCommon";
import myImage from "../Image/s.jpeg";

function CommonNews() {
  return (
    <div className="w-full  flex flex-col space-y-2 ">
      <div className="flex flex-row  space-x-4">
        <div className="w-1/2 max-w  space-x-0 md:space-x-2 space-y-2 md:space-y-0 flex flex-col md:flex-row">
          <NewsCardCommon
            NewsImage={myImage}
            NewsDiscription={"fghj"}
            NewsHeading={"Heading"}
          />
          
        </div>
        <div className="w-1/2  space-x-0 md:space-x-2 space-y-2 md:space-y-0 flex flex-col md:flex-row">
          <NewsCardCommon
            NewsImage={myImage}
            NewsDiscription={"fghj"}
            NewsHeading={"cv"}
          />

        </div>
      </div>
    </div>
  );
}

export default CommonNews;

import React from "react";
import PackageCard from "../PackageCard/PackageCard";

const Card = () => {
  const packageData = [
    {
      name: "SilverPackage",
      price: "$200",
      headingNote: "This is discripton",
      buttonLabel: "Try free",
      packageDetailes: [
        "First month free",
        "Limited access",
        "Maximum 3 reviewa",
      ],
    },
    {
      name: "GoldPackage",
      price: "$300",
      headingNote: "This is discripton",
      buttonLabel: "Bye now",
      packageDetailes: [
        "First month free",
        "5 months access",
        "Maximum 5 review",
      ],
    },
    {
      name: "PlatinumPackage",
      price: "$400",
      headingNote: "This is discripton",
      buttonLabel: "Customize",
      packageDetailes: [
        "First month free",
        "Unimited access",
        "Unlimited reviews",
      ],
    },
  ];
  return (
    <div className="w-full h-screen flex justify-center items-center ">
      {packageData.map((dataItem, index) => (
        <PackageCard dataItem={dataItem} />
      ))}
    </div>
  );
};
export default Card;

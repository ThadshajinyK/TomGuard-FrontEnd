import React, { useEffect } from "react";
import Card from "./Card";
import Color1 from "../../../../images/color/color-1.png";
import Color2 from "../../../../images/color/color-2.png";
import Color3 from "../../../../images/color/color-3.png";
import Color4 from "../../../../images/color/color-4.png";

const colorCollections = [
  {
    name: "Classic",
    icon: Color2,
    colors: ["#CF541F", "#1F9ACF"],
  },
  {
    name: "Bold",
    icon: Color1,
    colors: ["#CC1FCF", "#AA5E82"],
  },
  {
    name: "FreshMint",
    icon: Color3,
    colors: ["#8265D3", "#CF541F"],
  },
  {
    name: "Beach",
    icon: Color4,
    colors: ["#CF1F1F", "#CCCF1F"],
  },
];

const Preferences = () => {
  const [selectedCollection, setSelectedCollection] = React.useState(
    colorCollections[0]
  );
  const [btnText, setBtnText] = React.useState("Apply");

  useEffect(() => {
    const currentColor = JSON.parse(localStorage.getItem("colorCollections"));

    setSelectedCollection(currentColor);
  }, []);

  const handleCardClicked = (item) => {
    setSelectedCollection(item);
    setBtnText("Apply");
  };
  const handleApplyColor = () => {
    localStorage.setItem(
      "colorCollections",
      JSON.stringify(selectedCollection)
    );
    setBtnText("Applied");
  };

  return (
    <div className="w-100 mb-3 mt-5 ml-5 d-flex flex-column align-items-center ">
      <div className="  d-flex gap-5 align-items-center flex-wrap">
        {colorCollections.map((item) => (
          <Card
            isSelected={item.name === selectedCollection?.name}
            key={item.name}
            color={item.icon}
            name={item.name}
            handleClick={() => handleCardClicked(item)}
          />
        ))}
      </div>
      <button
        type="button"
        class="btn btn-info mt-5"
        onClick={handleApplyColor}
      >
        {btnText}
      </button>
    </div>
  );
};

export default Preferences;

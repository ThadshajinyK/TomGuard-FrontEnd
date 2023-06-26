import React, { useEffect } from "react";
import Card from "./Card";
import Color1 from "../../../../images/color/color-1.jpeg";
import Color2 from "../../../../images/color/color-2.jpeg";
import Color3 from "../../../../images/color/color-3.jpeg";
import Color4 from "../../../../images/color/color-4.jpeg";

const colorCollections = [
  {
    name: "Classic",
    icon: Color1,
    colors: ["#ECEC20", "#72A963", "#28A1E4"],
  },
  {
    name: "Bold",
    icon: Color2,
    colors: ["#AD5FA4", "#CF3D6E", "#6539D3"],
  },
  {
    name: "FreshMint",
    icon: Color3,
    colors: ["#D0513C", "#FFC000", "#591EEE"],
  },
  {
    name: "Beach",
    icon: Color4,
    colors: ["#9B7192", "#39CCD3", "#1CF08B"],
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

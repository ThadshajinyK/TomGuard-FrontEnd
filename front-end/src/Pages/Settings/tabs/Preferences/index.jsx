import React from "react";
import Card from "./Card";
import Color1 from "../../../../images/color/color-1.jpeg";
import Color2 from "../../../../images/color/color-2.jpeg";
import Color3 from "../../../../images/color/color-3.jpeg";
import Color4 from "../../../../images/color/color-4.jpeg";

const colorCollections = [
  {
    name: "Classic",
    icon: Color1,
    colors: ["#1FCFCF", "#1FCF66", "#CF541F", "#1F9ACF", "#AA5E82"],
  },
  {
    name: "Bold",
    icon: Color2,
    colors: ["#1FCFCF", "#1FCF66", "#CF541F", "#CC1FCF", "#AA5E82"],
  },
  {
    name: "FreshMint",
    icon: Color3,
    colors: ["#8265D3", "#DADBA4", "#CF541F", "#CCA5AA", "#AA5E82"],
  },
  {
    name: "Beach",
    icon: Color4,
    colors: ["#CF1F1F", "#1F31CF", "#CF541F", "#2DCF1F", "#CCCF1F"],
  },
];

const Preferences = () => {
  const [selectedCollection, setSelectedCollection] = React.useState(
    colorCollections[0]
  );

  const handleCardClicked = (item) => {
    setSelectedCollection(item);
    localStorage.setItem("colorCollections", item.colors);
  };

  return (
    <div className='w-100 mb-3 mt-5 ml-5 d-flex flex-column align-items-center '>
      <div className='  d-flex gap-5 align-items-center flex-wrap'>
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
    </div>
  );
};

export default Preferences;

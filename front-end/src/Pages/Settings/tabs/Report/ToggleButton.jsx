import React from "react";

const ToggleButton = () => {
  const [isMonthly, setIsMonthly] = React.useState(true);

  const style = {
    width: "50%",
    height: "38px",
    borderRadius: "9px",
    display: "grid",
    placeContent: "center",
    fontSize: "15px",
    cursor: "pointer",
  };

  return (
    <div
      style={{
        width: "100%",
        // maxWidth: "400px",
        height: "38px",
        borderRadius: "9px",
        display: "flex",
        flexDirection: "row",
        backgroundColor: "#F5F5F5",
      }}
    >
      <div
        style={{
          ...style,
          backgroundColor: isMonthly && "#36b5bd",
          color: isMonthly ? "#fff" : "#000",
        }}
        onClick={() => setIsMonthly(true)}
      >
        monthly
      </div>
      <div
        style={{
          ...style,
          backgroundColor: !isMonthly && "#36b5bd",
          color: !isMonthly ? "#fff" : "#000",
        }}
        onClick={() => setIsMonthly(false)}
      >
        weekly
      </div>
    </div>
  );
};

export default ToggleButton;

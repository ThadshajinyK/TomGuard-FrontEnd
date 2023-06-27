const Card = ({ color, name, isSelected, handleClick }) => {
  return (
    <div
      style={{
        boxShadow: "3px 3px 12px #00000014",
        width: "277px",
        height: "84px",
        backgroundColor: "#ffff",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "5px 30px",
        cursor: "pointer",
        border: isSelected && "2px solid #36b5bd",
      }}
      onClick={handleClick}
    >
      <p>{name}</p>
      <img src={color} alt="color" width="80px" height="38px" />
    </div>
  );
};

export default Card;

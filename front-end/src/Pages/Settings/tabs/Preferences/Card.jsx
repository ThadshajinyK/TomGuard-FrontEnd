const Card = ({ color, name, isSelected, handleClick }) => {
  return (
    <div
      style={{
        width: "277px",
        height: "84px",
        backgroundColor: "#E8E8E8",
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
      <img src={color} alt='color' width='80px' height='38px' />
    </div>
  );
};

export default Card;

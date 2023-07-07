const TextField = ({ error, nobg, ...props }) => {
  return (
    <div style={{ height: "65px" }}>
      <input
        style={{
          borderColor: error ? "red" : "revert",
          backgroundColor: !nobg && error ? "#FDE2E2" : "#fff",
        }}
        {...props}
      />
      <p style={{ marginTop: "5px", color: "red", fontSize: "13px" }}>
        {error}
      </p>
    </div>
  );
};

export default TextField;

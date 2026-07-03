export default function Sales() {
  return (
    <div style={{ padding: "30px", background: "#f8f9fa", minHeight: "100vh" }}>
      <h1>💰 Sales Dashboard</h1>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={cardStyle}>
          <h3>Today Sales</h3>
          <h2>PKR 12,500</h2>
        </div>

        <div style={cardStyle}>
          <h3>Weekly Sales</h3>
          <h2>PKR 85,000</h2>
        </div>

        <div style={cardStyle}>
          <h3>Monthly Sales</h3>
          <h2>PKR 245,680</h2>
        </div>
      </div>

      <div style={{ ...cardStyle, marginTop: "30px" }}>
        <h3>Best Seller</h3>
        <p>🍫 Chocolate Ice Cream — 198 Sales</p>
      </div>
    </div>
  );
}

const cardStyle = {
  background: "white",
  padding: "25px",
  borderRadius: "20px",
  boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
};
export default function Orders() {
  return (
    <div style={{ padding: "30px", background: "#f8f9fa", minHeight: "100vh" }}>
      <h1>🛒 Orders Dashboard</h1>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <div style={cardStyle}><h3>Total Orders</h3><h2>1248</h2></div>
        <div style={cardStyle}><h3>Pending</h3><h2>25</h2></div>
        <div style={cardStyle}><h3>Completed</h3><h2>1223</h2></div>
      </div>

      <div style={{ ...cardStyle, marginTop: "30px" }}>
        <h3>Recent Orders</h3>
        <p>#001 - Chocolate Ice Cream - Delivered ✅</p>
        <p>#002 - Vanilla Ice Cream - Pending ⏳</p>
        <p>#003 - Mango Shake - Delivered ✅</p>
        <p>#004 - Strawberry Cone - Processing 🔄</p>
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
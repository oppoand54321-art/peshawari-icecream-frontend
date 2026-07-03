import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalRevenue: 0
  });

  useEffect(() => {
    fetch("http://localhost:5000/dashboard")
      .then((res) => res.json())
      .then((data) => setStats(data))
      .catch(() => {
        setStats({
          totalProducts: 0,
          totalOrders: 0,
          totalCustomers: 0,
          totalRevenue: 0
        });
      });
  }, []);

  const cardStyle = {
    flex: 1,
    margin: "10px",
    padding: "20px",
    borderRadius: "12px",
    color: "white",
    boxShadow: "0 4px 10px rgba(0,0,0,0.15)"
  };

  return (
    <div style={{ padding: "20px", background: "#f4f6f9", minHeight: "100vh" }}>
      <h2 style={{ marginBottom: "20px" }}>📊 Admin Dashboard</h2>

      <div style={{ display: "flex", flexWrap: "wrap" }}>
        
        <div style={{ ...cardStyle, background: "#4f46e5" }}>
          <h3>Products</h3>
          <h1>{stats.totalProducts}</h1>
        </div>

        <div style={{ ...cardStyle, background: "#16a34a" }}>
          <h3>Orders</h3>
          <h1>{stats.totalOrders}</h1>
        </div>

        <div style={{ ...cardStyle, background: "#f59e0b" }}>
          <h3>Customers</h3>
          <h1>{stats.totalCustomers}</h1>
        </div>

        <div style={{ ...cardStyle, background: "#ef4444" }}>
          <h3>Revenue</h3>
          <h1>Rs {stats.totalRevenue}</h1>
        </div>

      </div>
    </div>
  );
}
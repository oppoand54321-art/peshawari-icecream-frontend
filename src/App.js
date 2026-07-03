import { useState } from "react";
import CustomerView from "./CustomerView";
import AdminApp from "./AdminApp";

function App() {
  const [mode, setMode] = useState("customer");

  return (
    <div style={{ width: "100%", overflowX: "hidden" }}>
      <div
        style={{
          padding: 10,
          background: "#111",
          color: "#fff",
          width: "100%",
          boxSizing: "border-box",
          display: "flex",
          flexWrap: "wrap",
          gap: 10
        }}
      >
        <button onClick={() => setMode("customer")}>
          Customer View
        </button>

        <button onClick={() => setMode("admin")}>
          Admin View
        </button>
      </div>

      <div style={{ width: "100%", overflowX: "hidden" }}>
        {mode === "customer" ? <CustomerView /> : <AdminApp />}
      </div>
    </div>
  );
}

export default App;
import { useState } from "react";
import CustomerView from "./CustomerView";
import AdminApp from "./AdminApp";

function App() {
  const [mode, setMode] = useState("customer");

  return (
    <div>
      <div style={{ padding: 10, background: "#111", color: "#fff" }}>
        <button onClick={() => setMode("customer")}>
          Customer View
        </button>

        <button onClick={() => setMode("admin")} style={{ marginLeft: 10 }}>
          Admin View
        </button>
      </div>

      {mode === "customer" ? <CustomerView /> : <AdminApp />}
    </div>
  );
}

export default App;
import { useState } from "react";
import initialProducts from "./pages/products";
import CustomerView from "./CustomerView";

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState("Ice Cream");

  // 🔥 IMPORTANT FIX: default customer view
  const [activePage, setActivePage] = useState("customer");

  const handleDelete = (id) => {
    setProducts(products.filter((item) => item.id !== id));
  };

  const handleEdit = (id) => {
    const product = products.find((item) => item.id === id);

    const newName = prompt("Enter new product name:", product.name);
    if (!newName) return;

    const newPrice = prompt("Enter new price:", product.price);
    if (!newPrice) return;

    setProducts(
      products.map((item) =>
        item.id === id
          ? { ...item, name: newName, price: Number(newPrice) }
          : item
      )
    );
  };

  const filteredProducts = products.filter(
    (item) => item.category === selectedCategory
  );

  return (
    <div style={styles.app}>
      {activePage !== "customer" && (
        <div style={styles.sidebar}>
          <h2>🍦 Peshawari Ice Cream</h2>

          <div style={styles.menu}>
            <p onClick={() => setActivePage("dashboard")}>🏠 Dashboard</p>
            <p onClick={() => setActivePage("products")}>📦 Products</p>
            <p onClick={() => setActivePage("orders")}>🛒 Orders</p>
            <p onClick={() => setActivePage("customers")}>👥 Customers</p>
            <p onClick={() => setActivePage("settings")}>⚙️ Settings</p>
            <p onClick={() => setActivePage("customer")}>🛍 Customer View</p>
          </div>
        </div>
      )}

      <div
        style={{
          ...styles.main,
          padding: activePage === "customer" ? "0" : "20px"
        }}
      >
        {activePage === "customer" ? (
          <CustomerView />
        ) : (
          <>
            <h1>Peshawari Ice Cream Admin Board</h1>

            {activePage === "dashboard" && <h2>Dashboard Page</h2>}
            {activePage === "orders" && <h2>Orders Page</h2>}
            {activePage === "customers" && <h2>Customers Page</h2>}
            {activePage === "settings" && <h2>Settings Page</h2>}

            {activePage === "products" && (
              <>
                <div style={styles.categoryBar}>
                  <button onClick={() => setSelectedCategory("Ice Cream")}>🍦 Ice Cream</button>
                  <button onClick={() => setSelectedCategory("Shakes")}>🥤 Shakes</button>
                  <button onClick={() => setSelectedCategory("Fast Food")}>🍔 Fast Food</button>
                  <button onClick={() => setSelectedCategory("Juices")}>🧃 Juices</button>
                  <button onClick={() => setSelectedCategory("Chaat")}>🌮 Chaat</button>
                </div>

                <div style={styles.grid}>
                  {filteredProducts.map((item) => (
                    <div key={item.id} style={styles.card}>
                      <h3>{item.name}</h3>
                      <p>Rs. {item.price}</p>

                      <div style={styles.actions}>
                        <button style={styles.edit} onClick={() => handleEdit(item.id)}>
                          Edit
                        </button>
                        <button style={styles.delete} onClick={() => handleDelete(item.id)}>
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  app: { display: "flex", minHeight: "100vh", fontFamily: "Arial" },
  sidebar: { width: "240px", background: "#6a1b4d", color: "white", padding: "20px" },
  menu: { marginTop: "30px", lineHeight: "2.4", cursor: "pointer" },
  main: { flex: 1 },
  categoryBar: { display: "flex", gap: "10px", flexWrap: "wrap", marginBottom: "20px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: "12px" },
  card: { background: "#fff", padding: "10px", borderRadius: "10px" },
  actions: { display: "flex", justifyContent: "space-between" },
  edit: { background: "orange", border: "none", padding: "6px" },
  delete: { background: "red", color: "white", border: "none", padding: "6px" }
};

export default App;
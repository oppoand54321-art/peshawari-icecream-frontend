function Cart({ cart, setCart, setPage }) {
  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, qty: item.qty - 1 } : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div style={{ minHeight: "100vh", background: "#fff7fb", padding: 20, fontFamily: "Arial" }}>
      
      <button
        onClick={() => setPage("menu")}
        style={{ padding: "10px 16px", border: "none", borderRadius: 20, cursor: "pointer" }}
      >
        ⬅ Back
      </button>

      <h1 style={{ color: "#6a1b4d" }}>Your Cart 🛒</h1>

      {cart.length === 0 ? (
        <h3>Cart is empty</h3>
      ) : (
        <>
          {cart.map((item) => (
            <div
              key={item.id}
              style={{
                background: "white",
                padding: 15,
                borderRadius: 15,
                marginBottom: 15,
                boxShadow: "0 4px 10px rgba(0,0,0,0.1)"
              }}
            >
              <h3>{item.name}</h3>
              <p>Price: Rs. {item.price}</p>
              <p>Quantity: {item.qty}</p>

              <div style={{ display: "flex", gap: 10 }}>
                <button onClick={() => increaseQty(item.id)}>+</button>
                <button onClick={() => decreaseQty(item.id)}>-</button>
              </div>
            </div>
          ))}

          <h2>Total: Rs. {total}</h2>

          <button
            onClick={() => setPage("checkout")}
            style={{
              padding: "14px 24px",
              background: "#ff4fa0",
              color: "white",
              border: "none",
              borderRadius: 30,
              cursor: "pointer"
            }}
          >
            Checkout
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;
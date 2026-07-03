import { useState, useEffect } from "react";
import initialProducts from "./pages/products";
import Cart from "./Cart";

const slides = [
  "/images/slide1.jpeg",
  "/images/slide2.jpeg",
  "/images/slide3.jpeg"
];

function CustomerView() {
  const [selectedCategory, setSelectedCategory] = useState("Ice Cream");
  const [page, setPage] = useState("home");
  const [slideIndex, setSlideIndex] = useState(0);
  const [cart, setCart] = useState([]);
  const [clickedId, setClickedId] = useState(null);
  const [cartBounce, setCartBounce] = useState(false);

  const [checkoutData, setCheckoutData] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  const filteredProducts = initialProducts.filter(
    (item) => item.category === selectedCategory
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % slides.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleCart = (item) => {
    setClickedId(item.id);
    setTimeout(() => setClickedId(null), 150);

    setCartBounce(true);
    setTimeout(() => setCartBounce(false), 300);

    const existing = cart.find((cartItem) => cartItem.id === item.id);

    if (existing) {
      setCart(
        cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, qty: cartItem.qty + 1 }
            : cartItem
        )
      );
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
  };

  if (page === "cart") {
    return <Cart cart={cart} setCart={setCart} setPage={setPage} />;
  }

  if (page === "checkout") {
    const total = cart.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );

    const placeOrder = () => {
      if (!checkoutData.name || !checkoutData.phone || !checkoutData.address) {
        alert("Please fill all details");
        return;
      }

      setOrderPlaced(true);
      setCart([]);
    };

    return (
      <div style={{ padding: 20, minHeight: "100vh", background: "#fff7fb" }}>
        {orderPlaced ? (
          <>
            <h2>Order Placed Successfully 🎉</h2>
            <button onClick={() => setPage("home")}>Go Home</button>
          </>
        ) : (
          <>
            <h1>Checkout 🧾</h1>
            <h3>Total Bill: Rs. {total}</h3>

            <input
              placeholder="Name"
              value={checkoutData.name}
              onChange={(e) =>
                setCheckoutData({ ...checkoutData, name: e.target.value })
              }
              style={{ display: "block", margin: 10, padding: 10, width: 300 }}
            />

            <input
              placeholder="Phone"
              value={checkoutData.phone}
              onChange={(e) =>
                setCheckoutData({ ...checkoutData, phone: e.target.value })
              }
              style={{ display: "block", margin: 10, padding: 10, width: 300 }}
            />

            <textarea
              placeholder="Address"
              value={checkoutData.address}
              onChange={(e) =>
                setCheckoutData({ ...checkoutData, address: e.target.value })
              }
              style={{
                display: "block",
                margin: 10,
                padding: 10,
                width: 300,
                height: 100
              }}
            />

            <button
              onClick={placeOrder}
              style={{
                padding: "12px 20px",
                background: "#ff4fa0",
                color: "white",
                border: "none",
                borderRadius: 20
              }}
            >
              Place Order
            </button>
          </>
        )}
      </div>
    );
  }

  if (page === "home") {
    return (
      <div style={styles.home}>
        <div style={styles.hero}>
          <div style={styles.leftHero}>
            <h1 style={styles.title}>Peshawari Ice Cream 🍦</h1>
            <p style={styles.subtitle}>Fresh • Tasty • Fast Food</p>

            <button style={styles.orderBtn} onClick={() => setPage("menu")}>
              Order Now 🛍
            </button>
          </div>

          <div style={styles.rightHero}>
            <img src="/logo.jpeg" alt="" style={styles.heroLogo} />
            <img src={slides[slideIndex]} alt="" style={styles.slideImg} />
          </div>
        </div>

        <div style={styles.content}>
          <section style={styles.bigSection}>
            <h2 style={styles.bigHeading}>🍨 We Create Sweet Moments</h2>
            <p style={styles.bigText}>
              At Peshawari Ice Cream, we don’t just serve desserts — we create sweet moments for every customer.
            </p>
          </section>

          <div style={styles.featuresGrid}>
            <div style={styles.box}>
              <h3 style={styles.boxTitle}>🥛 Fresh Ingredients, Better Taste</h3>
              <p style={styles.boxText}>
                We use carefully selected ingredients to ensure every scoop delivers rich flavor.
              </p>
            </div>
   <div style={styles.box}>
              <h3 style={styles.boxTitle}>👨‍👩‍👧 Made for Every Family Moment</h3>
              <p style={styles.boxText}>
                From kids to grandparents, our ice cream brings people together.
              </p>
            </div>

            <div style={styles.box}>
              <h3 style={styles.boxTitle}>⭐ Quality You Can Trust</h3>
              <p style={styles.boxText}>We never compromise on quality.</p>
            </div>

            <div style={styles.box}>
              <h3 style={styles.boxTitle}>⚡ Fast Service</h3>
              <p style={styles.boxText}>Quick and fresh delivery every time.</p>
            </div>
          </div>

          <footer style={styles.footer}>
            <h3>Follow Us</h3>
            <p>📷 Instagram • 👍 Facebook • ▶ YouTube • 💬 WhatsApp</p>
            <button style={styles.mapBtn}>📍 Google Map</button>
          </footer>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.menuPage}>
      <button style={styles.backBtn} onClick={() => setPage("home")}>
        ⬅ Back
      </button>

      <button
        style={{
          marginLeft: 10,
          padding: "10px 16px",
          border: "none",
          borderRadius: 20,
          background: "#ff4fa0",
          color: "white",
          cursor: "pointer",
          transform: cartBounce ? "scale(1.15)" : "scale(1)",
          transition: "0.2s ease"
        }}
        onClick={() => setPage("cart")}
      >
        Cart ({cart.length})
      </button>

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
            <img src={item.image} alt={item.name || ""} style={styles.image} />
            <h3>{item.name}</h3>
            <p>Rs. {item.price}</p>

            <button
              style={{
                ...styles.cartBtn,
                transform: clickedId === item.id ? "scale(0.9)" : "scale(1)",
                transition: "0.15s ease"
              }}
              onClick={() => handleCart(item)}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  home: { minHeight: "100vh", fontFamily: "Arial", background: "#fff7fb" },
  hero: { display: "flex", height: "30vh", background: "#2c1138" },
  leftHero: {
    width: "40%",
    padding: 25,
    color: "white",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  rightHero: {
    width: "60%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative"
  },
  heroLogo: {
    position: "absolute",
    top: 15,
    right: 20,
    width: 85,
    height: 85,
    borderRadius: "50%",
    objectFit: "cover",
    background: "white",
    padding: 4
  },
  slideImg: { width: "95%", height: "95%", objectFit: "contain" },
  title: { fontSize: 34, marginBottom: 10 },
  subtitle: { fontSize: 18 },
  orderBtn: {
    marginTop: 20,
    padding: "12px 24px",
    background: "#ff4fa0",
    color: "white",
    border: "none",
    borderRadius: 30
  },

  content: {
    padding: 25,
    backgroundImage: "url('/images/bg-icecream.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat"
  },

  bigSection: { textAlign: "center", marginBottom: 50 },
  bigHeading: { fontSize: 42, color: "#6a1b4d" },
  bigText: { fontSize: 18, lineHeight: 1.7 },

  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: 30
  },

  box: {
    background: "rgba(255,255,255,0.88)",
    backdropFilter: "blur(4px)",
    padding: 40,
    borderRadius: 25,
    boxShadow: "0 6px 18px rgba(0,0,0,0.12)"
  },

  boxTitle: { fontSize: 30, marginBottom: 15, color: "#6a1b4d" },
  boxText: { fontSize: 18, lineHeight: 1.7 },
  footer: {
    marginTop: 40,
    textAlign: "center",
    background: "#ffd9ea",
    padding: 30,
    borderRadius: 20
  },
  mapBtn: {
    marginTop: 15,
    padding: "10px 20px",
    border: "none",
    borderRadius: 20
  },

  menuPage: { padding: 20 },
  backBtn: { padding: "10px 16px", border: "none", borderRadius: "20px" },
  categoryBar: { display: "flex", gap: 10, margin: "20px 0", flexWrap: "wrap" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: 12 },
  card: { background: "white", padding: 10, borderRadius: 10, textAlign: "center" },
  image: { width: "100%", height: 110, objectFit: "cover", borderRadius: 8 },
  cartBtn: {
    marginTop: 8,
    padding: "8px 12px",
    border: "none",
    borderRadius: 8,
    background: "#6a1b4d",
    color: "white"
  }
};

export default CustomerView;
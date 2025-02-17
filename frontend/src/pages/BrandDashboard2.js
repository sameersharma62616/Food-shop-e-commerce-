import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { FaPlus } from "react-icons/fa";

const BrandDashboard2 = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [cart, setCart] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileNumber, setMobileNumber] = useState(""); // Mobile number input
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/foods/${id}`)
      .then((res) => setFood(res.data))
      .catch((err) => console.error(err));
  }, [id]);

  const addToCart = (menuItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.name === menuItem.name);
      if (existingItem) {
        return prevCart.map((item) =>
          item.name === menuItem.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...menuItem, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (menuItem) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.name === menuItem.name
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  if (!food)
    return (
      <h2 style={{ textAlign: "center", marginTop: "20px" }}>Loading...</h2>
    );

  // Filter menu items based on search query
  const filteredMenuItems = food.menuItems?.filter((menuItem) =>
    menuItem.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOrderConfirm = async () => {
    if (!mobileNumber || cart.length === 0) {
      alert("Please select items and enter a valid mobile number.");
      return;
    }

    setLoading(true);
    const orderDetails = {
      mobile: mobileNumber,
      cart: cart,
      totalAmount: getTotalPrice(),
    };

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_API_BASE_URL}/send-sms`,
        orderDetails
      );
      alert(response.data.message);
    } catch (error) {
      console.error("Error sending SMS:", error);
      alert("Failed to send order details. Try again.");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        display: "flex",
        width: "90%",
        gap: "20px",
        padding: "40px 5%",
        background:
          "linear-gradient(to right, #87CEFA,rgba(0, 255, 255, 0.72))",
        // backgroundImage: "url(https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg)",
        // backgroundSize: "cover",
        // backgroundPosition: "center",
      }}
    >
      {/* Left Section */}
      <div
        style={{
          flex: "3",
          backdropFilter: "blur(10px)",
          background: "rgba(0, 0, 0, 0.32)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "white",
            fontSize: "32px",
            marginBottom: "20px",
          }}
        >
          {food.title}
        </h1>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <img
            src={food.image}
            alt={food.title}
            style={{
              width: "100%",
              maxWidth: "500px",
              borderRadius: "10px",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
            }}
          />
        </div>
        <p
          style={{
            textAlign: "center",
            fontSize: "18px",
            color: "white",
            lineHeight: "1.6",
          }}
        >
          {food.description}
        </p>

        {/* Menu Items */}
        <h2
          style={{
            textAlign: "center",
            marginTop: "30px",
            color: "white",
            fontSize: "28px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          {/* Search Box */}
          <input
            type="text"
            placeholder="Search food..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width: "60%",
              padding: "10px",
              fontSize: "18px",
              marginBottom: "20px",
              borderRadius: "5px",
              border: "1px solid #ddd",
            }}
          />
          Menu Items
        </h2>
        {food.menuItems && food.menuItems.length > 0 ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: "20px",
              marginTop: "20px",
            }}
          >
            {filteredMenuItems.map((menuItem, index) => (
              <div
                key={index}
                style={{
                  backdropFilter: "blur(10px)",
                  background: "rgba(255, 255, 255, 0.32)",
                  boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  padding: "20px",
                  borderRadius: "8px",
                  textAlign: "center",
                  position: "relative",
                }}
              >
                <h3
                  style={{
                    color: "white",
                    fontSize: "20px",
                    marginBottom: "10px",
                  }}
                >
                  {menuItem.name}
                </h3>
                <p
                  style={{
                    color: "white",
                    fontSize: "16px",
                    marginBottom: "10px",
                    lineHeight: "1.5",
                  }}
                >
                  {menuItem.description}
                </p>
                <p
                  style={{
                    fontWeight: "bold",
                    color: "white",
                    fontSize: "18px",
                  }}
                >
                  ₹{menuItem.price}
                </p>
                {menuItem.image && (
                  <img
                    src={menuItem.image}
                    alt={menuItem.name}
                    style={{
                      width: "100%",
                      maxWidth: "200px",
                      borderRadius: "5px",
                      marginTop: "10px",
                    }}
                  />
                )}

                {/* Add Button */}
                <button
                  onClick={() => addToCart(menuItem)}
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "10px",
                    background: "#e63946",
                    color: "#fff",
                    border: "none",
                    borderRadius: "50%",
                    width: "35px",
                    height: "35px",
                    cursor: "pointer",
                  }}
                >
                  <FaPlus />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p
            style={{
              textAlign: "center",
              color: "white",
              marginTop: "10px",
              fontSize: "18px",
            }}
          >
            No menu items added yet.
          </p>
        )}
      </div>

      {/* Right Section - Order Summary */}
      <div
        style={{
          flex: "1",
          padding: "20px",
          borderRadius: "10px",
          backdropFilter: "blur(10px)",
          background: "rgba(0, 0, 0, 0.32)",
          boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
          textAlign: "center",
          maxWidth: "400px",
          margin: "auto",
          position: "sticky",
          top: "20px"
        }}
      >
        <h2 style={{ color: "WHITE", marginBottom: "15px" }}>Your Order</h2>

        {cart.length > 0 ? (
          <>
            <ul style={{ listStyle: "none", padding: "0" }}>
              {cart.map((item, index) => (
                <li
                  key={index}
                  style={{
                    background: "#f9f9f9",
                    padding: "10px",
                    borderRadius: "5px",
                    marginBottom: "8px",
                    fontSize: "16px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <span>
                    {item.name} ({item.quantity})
                  </span>
                  <div>
                    <button
                      onClick={() => removeFromCart(item)}
                      style={{
                        background: "#ff0000",
                        color: "#fff",
                        border: "none",
                        borderRadius: "50%",
                        width: "25px",
                        height: "25px",
                        cursor: "pointer",
                        marginRight: "5px",
                      }}
                    >
                      -
                    </button>
                    <button
                      onClick={() => addToCart(item)}
                      style={{
                        background: "#008000",
                        color: "#fff",
                        border: "none",
                        borderRadius: "50%",
                        width: "25px",
                        height: "25px",
                        cursor: "pointer",
                      }}
                    >
                      +
                    </button>
                  </div>
                  <strong style={{ color: "#333" }}>
                    ₹{item.price * item.quantity}
                  </strong>
                </li>
              ))}
            </ul>

            <h3
              style={{
                color: "WHITE",
                marginTop: "15px",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              Total: ₹{getTotalPrice()}
            </h3>

            {/* Mobile Number Input */}
            <input
              type="text"
              placeholder="Enter mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              style={{
                width: "60%",
                padding: "12px",
                marginTop: "10px",
                fontSize: "16px",
                borderRadius: "5px",
                border: "1px solid #ccc",
                outline: "none",
              }}
            />

            {/* Order Confirmation Button */}
            <button
              onClick={handleOrderConfirm}
              disabled={loading}
              style={{
                marginTop: "15px",
                padding: "12px",
                fontSize: "18px",
                background: loading ? "#ccc" : "#ff6600",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: loading ? "not-allowed" : "pointer",
                width: "100%",
                transition: "background 0.3s",
              }}
            >
              {loading ? "Sending..." : "Confirm Order"}
            </button>
          </>
        ) : (
          <p style={{ color: "WHITE", fontSize: "16px" }}>No items selected.</p>
        )}
      </div>
    </div>
  );
};

export default BrandDashboard2;

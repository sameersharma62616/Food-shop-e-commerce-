// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import { FaPlus } from "react-icons/fa";

// const FoodDetail = () => {
//   const { id } = useParams();
//   const [food, setFood] = useState(null);
//   const [cart, setCart] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/foods/${id}`)
//       .then((res) => setFood(res.data))
//       .catch((err) => console.error(err));
//   }, [id]);

//   const addToCart = (menuItem) => {
//     setCart((prevCart) => {
//       const existingItem = prevCart.find((item) => item.name === menuItem.name);
//       if (existingItem) {
//         return prevCart.map((item) =>
//           item.name === menuItem.name
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       } else {
//         return [...prevCart, { ...menuItem, quantity: 1 }];
//       }
//     });
//   };

//   const getTotalPrice = () => {
//     return cart.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   if (!food)
//     return (
//       <h2 style={{ textAlign: "center", marginTop: "20px" }}>Loading...</h2>
//     );

//     // Filter menu items based on search query
//   const filteredMenuItems = food.menuItems?.filter((menuItem) =>
//     menuItem.name.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   return (
//     <div
//       style={{display: "flex",width: "90%",padding: "40px 5%", background: "linear-gradient(to right, #87CEFA,rgba(0, 255, 255, 0.72))", 
//         // backgroundImage: "url(https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg)",
//         // backgroundSize: "cover",
//         // backgroundPosition: "center",
//       }}
//     >
//       {/* Left Section */}
//       <div
//         style={{
//           flex: "3",backdropFilter: "blur(10px)",background: "rgba(0, 0, 0, 0.32)",boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",border: "1px solid rgba(255, 255, 255, 0.3)",
//           padding: "20px",borderRadius: "10px",}}>
//         <h1
//           style={{textAlign: "center",color: "white",fontSize: "32px",marginBottom: "20px",}}>
//           {food.title}
//         </h1>
//         <div
//           style={{display: "flex",justifyContent: "center",marginBottom: "20px",}}>
//           <img src={food.image}
//             alt={food.title}
//             style={{ width: "100%", maxWidth: "500px", borderRadius: "10px",boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
//             }}
//           />
//         </div>
//         <p
//           style={{textAlign: "center",fontSize: "18px",color: "white",lineHeight: "1.6",}}>
//           {food.description}
//         </p>

//         {/* Menu Items */}
//         <h2
//           style={{textAlign: "center",marginTop: "30px",color: "white",fontSize: "28px",display: "flex",justifyContent: "center",
//             alignItems: "center",flexDirection: "column",}}>
//           {/* Search Box */}
//        <input
//         type="text" placeholder="Search food..."value={searchQuery}onChange={(e) => setSearchQuery(e.target.value)}
//         style={{width: "60%",padding: "10px",fontSize: "18px",marginBottom: "20px",borderRadius: "5px",border: "1px solid #ddd",}}
//       />
//           Menu Items
//         </h2>
//         {food.menuItems && food.menuItems.length > 0 ? (
//           <div
//             style={{display: "grid",gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",gap: "20px",marginTop: "20px", }}
//           >
//             {filteredMenuItems.map((menuItem, index) => (
//                 <div key={index} style={{backdropFilter: "blur(10px)",background: "rgba(255, 255, 255, 0.32)",boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
//                   border: "1px solid rgba(255, 255, 255, 0.3)",padding: "20px",borderRadius: "8px",textAlign: "center",position: "relative",}}>
//                 <h3
//                   style={{color: "white",fontSize: "20px",marginBottom: "10px",}}
//                 >
//                   {menuItem.name}
//                 </h3>
//                 <p
//                   style={{color: "white",fontSize: "16px",marginBottom: "10px",lineHeight: "1.5",}}
//                 >
//                   {menuItem.description}
//                 </p>
//                 <p
//                   style={{fontWeight: "bold",color: "white",fontSize: "18px",}}
//                 >
//                   ₹{menuItem.price}
//                 </p>
//                 {menuItem.image && (
//                   <img
//                     src={menuItem.image}
//                     alt={menuItem.name}
//                     style={{width: "100%",maxWidth: "200px",borderRadius: "5px",marginTop: "10px",}}
//                   />
//                 )}

//                 {/* Add Button */}
//                 <button
//                   onClick={() => addToCart(menuItem)}
//                   style={{position: "absolute",top: "10px",right: "10px",background: "#e63946",color: "#fff",border: "none",borderRadius: "50%",
//                     width: "35px",height: "35px",cursor: "pointer",}}
//                 >
//                   <FaPlus />
//                 </button>
//               </div>
//             ))}
//           </div>
//         ) : (
//           <p
//             style={{textAlign: "center",color: "white",marginTop: "10px",fontSize: "18px", }}
//           >
//             No menu items added yet.
//           </p>
//         )}
//       </div>

//       {/* Right Section - Cart */}
//       <div className="order"
//         style={{flex: "1",marginLeft: "20px",padding: "20px",backdropFilter: "blur(10px)",background: "rgba(0, 0, 0, 0.32)",
//           boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",border: "1px solid rgba(255, 255, 255, 0.3)",borderRadius: "10px",position: "sticky",
//           top: "20px",height: "fit-content",}}>
//         <h2
//           style={{textAlign: "center",fontSize: "24px",color: "white",marginBottom: "20px",}}
//         >
//           Your Order
//         </h2>
//         {cart.length > 0 ? (
//           <>
//             <ul style={{ listStyle: "none", padding: 0 }}>
//               {cart.map((item, index) => (
//                 <li
//                   key={index}
//                   style={{color:"white",display: "flex",justifyContent: "space-between",padding: "10px 0",borderBottom: "1px solid #ddd",}}
//                 >
//                   <span>
//                     {item.name} ({item.quantity})
//                   </span>
//                   <span>₹{item.price * item.quantity}</span>
//                 </li>
//               ))}
//             </ul>
//             <h3
//               style={{textAlign: "center",color: "white",fontSize: "22px",marginTop: "15px",
//               }}
//             >
//               Total: ₹{getTotalPrice()}
//             </h3>
//           </>
//         ) : (
//           <p style={{ textAlign: "center", color: "#777" }}>
//             No items selected.
//           </p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FoodDetail;





import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const FoodDetail = () => {
  const { id } = useParams();
  const [food, setFood] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [editedName, setEditedName] = useState("");
  const [editedPrice, setEditedPrice] = useState("");

  useEffect(() => {
    const fetchFoodDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/foods/${id}`);
        setFood(response.data);
      } catch (error) {
        console.error("Error fetching food details:", error);
      }
    };
    fetchFoodDetails();
  }, [id]);

  const handleEdit = (menuItem) => {
    setEditingItem(menuItem);
    setEditedName(menuItem.name);
    setEditedPrice(menuItem.price);
  };

  const handleSave = async (menuItem) => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_BASE_URL}/foods/update-menu-item/${id}/${menuItem.name}`,
        { newName: editedName, newPrice: editedPrice }
      );
      if (response.data.success) {
        const updatedItems = food.menuItems.map((item) =>
          item.name === menuItem.name
            ? { ...item, name: editedName, price: editedPrice }
            : item
        );
        setFood({ ...food, menuItems: updatedItems });
        setEditingItem(null);
      }
    } catch (error) {
      console.error("Error updating menu item:", error);
    }
  };

  const handleDelete = async (menuItem) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_API_BASE_URL}/foods/delete-menu-item/${id}/${menuItem.name}`
      );
      if (response.data.success) {
        const updatedItems = food.menuItems.filter(
          (item) => item.name !== menuItem.name
        );
        setFood({ ...food, menuItems: updatedItems });
      }
    } catch (error) {
      console.error("Error deleting menu item:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Food Details</h2>
      {food ? (
        <div style={styles.card}>
          <h3 style={styles.foodName}>{food.name}</h3>
          <img src={food.imageUrl} alt={food.name} style={styles.foodImage} />
          <ul style={styles.list}>
            {food.menuItems.map((menuItem, index) => (
              <li key={index} style={styles.listItem}>
                <div style={styles.textContainer}>
                  <span style={styles.foodText}>{menuItem.name} - ₹{menuItem.price}</span>
                </div>
                <div style={styles.actionContainer}>
                  {editingItem === menuItem ? (
                    <>
                      <input
                        type="text"
                        value={editedName}
                        onChange={(e) => setEditedName(e.target.value)}
                        style={styles.input}
                      />
                      <input
                        type="number"
                        value={editedPrice}
                        onChange={(e) => setEditedPrice(e.target.value)}
                        style={styles.input}
                      />
                      <button onClick={() => handleSave(menuItem)} style={styles.saveButton}>Save</button>
                      <button onClick={() => setEditingItem(null)} style={styles.cancelButton}>Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEdit(menuItem)} style={styles.editButton}>Edit</button>
                      <button onClick={() => handleDelete(menuItem)} style={styles.deleteButton}>Delete</button>
                    </>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p style={styles.loading}>Loading...</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    padding: "20px",
    fontFamily: "Arial, sans-serif",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    minHeight: "100vh",
    background: "linear-gradient(to right, #87CEFA, #00FFFF)", 
  },
  heading: {
    fontSize: "28px",
    fontWeight: "bold",
    marginBottom: "20px",
    color: "white",
  },
  card: {
    backdropFilter: "blur(10px)",
    background: "rgba(0, 0, 0, 0.32)",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
    padding: "20px",
    width: "80%",
    borderRadius: "10px",
  },
  foodName: {
    fontSize: "22px",
    fontWeight: "bold",
    marginBottom: "15px",
    textAlign: "center",
  },
  foodImage: {
    width: "100%",
    maxWidth: "400px",
    borderRadius: "10px",
    display: "block",
    margin: "0 auto 20px",
  },
  list: {
    listStyle: "none",
    padding: 0,
  },
  listItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px",
    background: "#f9f9f9",
    borderRadius: "8px",
    marginBottom: "10px",
    boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
  },
  textContainer: {
    flex: 1,
    textAlign: "left",
  },
  foodText: {
    fontSize: "16px",
    fontWeight: "500",
    color: "#333",
  },
  actionContainer: {
    display: "flex",
    gap: "10px",
  },
  input: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    width: "80px",
  },
  saveButton: {
    background: "#4CAF50",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  cancelButton: {
    background: "#f44336",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  editButton: {
    background: "#2196F3",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "5px",
  },
  deleteButton: {
    background: "#ff5722",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    cursor: "pointer",
    borderRadius: "5px",
  },
};

export default FoodDetail;

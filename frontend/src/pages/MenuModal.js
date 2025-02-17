import React, { useState } from "react";
import axios from "axios";

const MenuModal = ({ food, onClose }) => {
  const [menuItem, setMenuItem] = useState({ 
    name: "", 
    image: "", 
    price: 0,  // ✅ Set default as number
    description: "" 
  });

  const handleChange = (e) => {
    setMenuItem({ ...menuItem, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!food?._id) {
      alert("Food ID is missing!");
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BASE_URL}/api/foods/${food._id}/menu`, menuItem);
      alert("Menu item added successfully!");
      console.log("Success:", response.data);
      onClose();
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      alert("Failed to add menu item. Please try again.");
    }
  };

  return (
    <div>
      {/* <h1>Add Menu for {food?.title || "this food item"}</h1> */}
      <form onSubmit={handleSubmit}>
      <button style={{ padding: "10px 20px", background: "#ff6347", color: "#fff", border: "none", cursor: "pointer", borderRadius: "5px" }} onClick={onClose}>Close</button>
        <input type="text" name="name" placeholder="Item Name" value={menuItem.name} onChange={handleChange} required style={{ padding: "10px", margin: "5px", width: "250px" }}/>
        <input type="text" name="image" placeholder="Image URL" value={menuItem.image} onChange={handleChange} required style={{ padding: "10px", margin: "5px", width: "250px" }} />
        <input type="number" name="price" placeholder="Price" value={menuItem.price} onChange={handleChange} required style={{ padding: "10px", margin: "5px", width: "250px" }} />
        <input type="text" name="description" placeholder="Description" value={menuItem.description} onChange={handleChange} required style={{ padding: "10px", margin: "5px", width: "250px" }} />
        <button type="submit" style={{ padding: "10px 20px", background: "rgba(47,140,227)", color: "#fff", border: "none", cursor: "pointer", borderRadius: "5px" }}>Add Menu</button>
      </form>
    </div>
  );
};

export default MenuModal;
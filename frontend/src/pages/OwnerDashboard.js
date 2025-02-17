import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MenuModal from "./MenuModal";

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const [foods, setFoods] = useState([]);
  const [newFood, setNewFood] = useState({
    title: "",
    description: "",
    image: "",
  });
  const [editFood, setEditFood] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/foods`).then((res) => setFoods(res.data));
  }, []);

  const handleChange = (e) => {
    setNewFood({ ...newFood, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editFood) {
      axios
        .put(`${process.env.REACT_APP_API_BASE_URL}/foods/${editFood._id}`, newFood)
        .then((res) => {
          setFoods(
            foods.map((food) => (food._id === editFood._id ? res.data : food))
          );
          setNewFood({ title: "", description: "", image: "" });
          setEditFood(null);
        });
    } else {
      axios.post(`${process.env.REACT_APP_API_BASE_URL}/foods`, newFood).then((res) => {
        setFoods([...foods, res.data]);
        setNewFood({ title: "", description: "", image: "" });
      });
    }
  };

  const handleEdit = (food) => {
    setNewFood(food);
    setEditFood(food);
  };

  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_BASE_URL}/foods/${id}`)
      .then(() => {
        setFoods(foods.filter((food) => food._id !== id));
      })
      .catch((error) => {
        console.error(
          "Delete request failed:",
          error.response ? error.response.data : error.message
        );
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleManageMenu = (food) => {
    setSelectedFood(food);
  };

  return (
    <div
      style={{padding: "10px",background: "linear-gradient(to right, #87CEFA, #00FFFF)",height: "100%",textAlign: "center",
        fontFamily: "Arial, sans-serif",
        // backgroundImage:
        //   "url(https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg)",
        // backgroundSize: "cover",
        // backgroundPosition: "center",
      }}
    >
      {/* <h1 style={{ color: "black", position: "fixed",display:"flex", justifyContent: "center",alignItems: "center",width: "100%" }}>Owner Dashboard</h1> */}

      <button
        onClick={handleLogout}
        style={{padding: "10px 20px",position: "fixed",right: "2%",bottom: "3%",background: "#ff6347", zIndex: "2",color: "white",
          border: "none",cursor: "pointer",borderRadius: "5px",}}>
        Logout
      </button>
      <form
        onSubmit={handleSubmit}
        style={{marginTop: "20px",justifyContent: "center",alignItems: "center",width: "100%",position: "fixed",top: "0",zIndex: "2",left: "0",}}
      >
        <input type="text" name="title" placeholder="Title" value={newFood.title}
          onChange={handleChange}
          required
          style={{ padding: "10px", margin: "5px", width: "250px" }}
        />
        <input type="text"name="description"placeholder="Description"value={newFood.description}onChange={handleChange}required
          style={{ padding: "10px", margin: "5px", width: "250px" }}
        />
        <input type="text"name="image"placeholder="Image URL"value={newFood.image}onChange={handleChange}required
          style={{ padding: "10px", margin: "5px", width: "250px" }}
        />
        <button
          style={{padding: "10px 20px",background: "rgba(47,140,227)",color: "#fff",border: "none",cursor: "pointer",borderRadius: "5px",
          }}
          type="submit"
        >
          {editFood ? "Update Shop" : "Add Shop"}
        </button>
      </form>

      <div
        style={{ position: "fixed", width: "100%", bottom: "2%", zIndex: "2" }}
      >
        {selectedFood && (
          <MenuModal
            food={selectedFood}
            onClose={() => setSelectedFood(null)}
          />
        )}
      </div>

      <div
        style={{display: "flex",flexWrap: "wrap",justifyContent: "center",height: "100%",padding: "50px",
        }}
      >
        {foods.map((food) => (
          <div
            key={food._id}
            style={{borderRadius: "10px",padding: "15px",margin: "10px",width: "350px",textAlign: "center",backdropFilter: "blur(10px)",
              background: "rgba(0, 0, 0, 0.32)",boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",border: "1px solid rgba(255, 255, 255, 0.3)",
              transition: "0.3s",cursor: "pointer",}}
          >
            <img
              src={food.image}
              alt={food.title}
              style={{width: "100%",height: "250px",objectFit: "cover",borderRadius: "10px",}}
            />
            <h3 style={{ color: "white", margin: "10px 0" }}>{food.title}</h3>
            <p style={{ color: "white", fontSize: "14px" }}>
              {food.description}
            </p>
            <div style={{ marginTop: "10px" }}>
              <button
                style={{padding: "5px 10px",background: "#dc3545",color: "white",border: "none",cursor: "pointer",borderRadius: "5px",margin: "5px",}}
                onClick={() => handleManageMenu(food)}
              >
                {/* Manage Menu */}
                Add Items
              </button>



              <button
              style={{padding: "5px 10px",background: "#007bff",color: "#fff",border: "none",cursor: "pointer",borderRadius: "5px",marginTop: "10px",
              }}
              onClick={() => navigate(`/food/${food._id}`)} // Navigate to FoodDetail page
            >
              {/* View More */}
              Edit Items
            </button>


              <button
                onClick={() => handleEdit(food)}
                style={{padding: "5px 10px",background: "#ffc107",color: "white",border: "none",cursor: "pointer",borderRadius: "5px",margin: "5px",}}>
                {/* Edit */}
                Edit Shop
              </button>


              <button
                onClick={() => handleDelete(food._id)}
                style={{padding: "5px 10px",background: "#dc3545",color: "#fff",border: "none",cursor: "pointer",borderRadius: "5px",margin: "5px",
                }}
              >
                Delete Shop
              </button>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OwnerDashboard;

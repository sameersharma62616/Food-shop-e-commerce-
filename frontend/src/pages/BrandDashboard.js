import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BrandDashboard = () => {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_BASE_URL}/foods`).then((res) => setFoods(res.data));
  }, []);


  
  return (
    <div
      style={{
        textAlign: "center",background: "linear-gradient(to right, #87CEFA,rgba(0, 255, 255, 0.72))", height: "100%",padding: "50px",fontFamily: "Arial, sans-serif",

        // backgroundImage:
        //   "url(https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg)",
        // backgroundSize: "cover",
        // backgroundPosition: "center",
      }}
    >
      {/* <h1 style={{ color: "black" }}>Food Shop</h1> */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        {foods.map((food) => (
          <div
            key={food._id}
            style={{borderRadius: "10px",padding: "15px",margin: "10px",width: "350px",textAlign: "center",backdropFilter: "blur(10px)",background: "rgba(0, 0, 0, 0.32)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",border: "1px solid rgba(255, 255, 255, 0.3)",transition: "0.3s",cursor: "pointer",}}>

            <img src={food.image} alt={food.title}
              style={{width: "100%",height: "250px",objectFit: "cover",borderRadius: "10px",}}/>
            <h3 style={{ color: "white", margin: "10px 0" }}>{food.title}</h3>
            <p style={{ color: "white", fontSize: "14px" }}>
              {food.description}
            </p>
            <button
              style={{padding: "10px 15px",background: "#007bff",color: "#fff",border: "none",cursor: "pointer",borderRadius: "5px",marginTop: "10px",
              }}
              onClick={() => navigate(`/branddashboard2/${food._id}`)} // Navigate to FoodDetail page
            >
              View More
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BrandDashboard;

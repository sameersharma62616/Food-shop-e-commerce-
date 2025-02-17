import React, { useEffect, useState } from "react";
import axios from "axios";

const FoodList = () => {
    const [foods, setFoods] = useState([]);
    const [editFood, setEditFood] = useState(null);
    const [formData, setFormData] = useState({ name: "", description: "", price: "" });

    useEffect(() => {
        fetchFoodItems();
    }, []);

    const fetchFoodItems = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}/api/foods`); // Replace with your API
            setFoods(response.data);
        } catch (error) {
            console.error("Error fetching food items:", error);
        }
    };

    const handleEditClick = (food) => {
        setEditFood(food._id);
        setFormData({ name: food.name, description: food.description, price: food.price });
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSave = async () => {
        try {
            await axios.put(`${process.env.REACT_APP_API_BASE_URL}/api/foods/update/${editFood}`, formData);
            fetchFoodItems();
            setEditFood(null);
        } catch (error) {
            console.error("Error updating food item:", error);
        }
    };

    return (
        <div>
            <h2>Food Items</h2>
            {foods.map((food) => (
                <div key={food._id} className="food-item">
                    {editFood === food._id ? (
                        <div>
                            <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                            <input type="text" name="description" value={formData.description} onChange={handleInputChange} />
                            <input type="number" name="price" value={formData.price} onChange={handleInputChange} />
                            <button onClick={handleSave}>Save</button>
                        </div>
                    ) : (
                        <div>
                            <h3>{food.name}</h3>
                            <p>{food.description}</p>
                            <p>Price: ₹{food.price}</p>
                            <button onClick={() => handleEditClick(food)}>Edit</button>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default FoodList;

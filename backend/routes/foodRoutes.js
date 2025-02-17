const express = require("express");
const router = express.Router();
const Food = require("../models/Food");

// ✅ Fetch all foods
router.get("/foods", async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Add new food item
router.post("/foods", async (req, res) => {
  const { title, description, image } = req.body;
  
  const food = new Food({
    title,
    description,
    image,
    menuItems: [], // ✅ Ensure menuItems is initialized
  });

  try {
    const newFood = await food.save();
    res.status(201).json(newFood);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ✅ Add Menu Item to a Food
router.post("/foods/:id/menu", async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food not found" });

    // ✅ Fix: Ensure menuItems exists
    if (!food.menuItems) {
      food.menuItems = [];
    }

    food.menuItems.push(req.body);
    await food.save();
    
    res.json({ message: "Menu item added successfully!", food });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get Menu Items of a Food
router.get("/foods/:id/menu", async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food not found" });

    res.json(food.menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;


// ✅ Fetch a single food item along with menu items
router.get("/foods/:id", async (req, res) => {
    try {
      const food = await Food.findById(req.params.id);
      if (!food) return res.status(404).json({ message: "Food not found" });
  
      res.json(food); // ✅ Send menuItems along with food details
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  

  // Update Menu Item
router.put("/update-menu-item/:foodId/:menuItemName", async (req, res) => {
  try {
    const { foodId, menuItemName } = req.params;
    const { newName, newPrice } = req.body;

    const food = await Food.findById(foodId);
    if (!food) return res.status(404).json({ message: "Food item not found" });

    // Update the menu item
    const menuItem = food.menuItems.find((item) => item.name === menuItemName);
    if (!menuItem) return res.status(404).json({ message: "Menu item not found" });

    menuItem.name = newName;
    menuItem.price = newPrice;

    await food.save(); // Save to MongoDB
    res.json({ success: true, message: "Menu item updated", food });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});


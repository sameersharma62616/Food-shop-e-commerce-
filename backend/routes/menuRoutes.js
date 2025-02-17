const express = require("express");
const router = express.Router();
const Food = require("../models/Food");

// ✅ Add Menu Item
router.post("/foods/:id/menu", async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food not found" });

    food.menuItems.push(req.body);
    await food.save();
    res.json(food);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get Menu Items
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

const mongoose = require("mongoose");

const FoodSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  menuItems: [
    {
      name: String,
      image: String,
      price: Number,
      description: String,
    },
  ],
});

module.exports = mongoose.model("Food", FoodSchema);

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const twilio = require("twilio");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const menuRoutes = require("./routes/menuRoutes"); // ✅ Add this line

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/auth", authRoutes);
app.use("/api", menuRoutes); // ✅ Add this line
app.use(express.urlencoded({ extended: true }));

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioNumber = process.env.TWILIO_NUMBER;

const client = twilio(accountSid, authToken);

const FoodSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
});

const Food = require("./models/Food"); // ✅ Ensure single import

// GET API
app.get("/foods", async (req, res) => {
  const foods = await Food.find();
  res.json(foods);
});

app.get("/menus/:id", async (req, res) => {
  try {
    const menuItems = await Menu.find({ shopId: req.params.id });
    res.json(menuItems);
  } catch (error) {
    res.status(500).json({ message: "Error fetching menu" });
  }
});

app.put("/foods/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const updatedFood = await Food.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedFood) {
      return res.status(404).json({ message: "Food not found" });
    }
    res.json(updatedFood);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

app.get("/foods/:id", async (req, res) => {
  try {
    const food = await Food.findById(req.params.id);
    if (!food) return res.status(404).json({ message: "Food not found" });
    res.json(food);
  } catch (error) {
    res.status(500).json({ message: "Error fetching food", error });
  }
});

// ye hai edit or save karne ke liye(fruits names,price example)
app.put("/foods/update-menu-item/:id/:name", async (req, res) => {
  const { id, name } = req.params;
  const { newName, newPrice } = req.body;

  try {
    const food = await Food.findById(id);
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });
    }

    const itemIndex = food.menuItems.findIndex((item) => item.name === name);
    if (itemIndex === -1) {
      return res
        .status(404)
        .json({ success: false, message: "Menu item not found" });
    }

    // Update the item
    food.menuItems[itemIndex].name = newName;
    food.menuItems[itemIndex].price = newPrice;

    // Save to database
    await food.save();

    res.json({ success: true, message: "Item updated successfully" });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ye hai menu ke jo items he vo delete karne ke liye(fruits names example)
app.delete("/foods/delete-menu-item/:id/:name", async (req, res) => {
  const { id, name } = req.params;

  try {
    const food = await Food.findById(id);
    if (!food) {
      return res
        .status(404)
        .json({ success: false, message: "Food not found" });
    }

    // Filter out the menu item to be deleted
    const updatedMenuItems = food.menuItems.filter(
      (item) => item.name !== name
    );

    // If no changes were made, return an error
    if (updatedMenuItems.length === food.menuItems.length) {
      return res
        .status(404)
        .json({ success: false, message: "Menu item not found" });
    }

    // Update the menuItems array
    food.menuItems = updatedMenuItems;

    // Save the updated document
    await food.save();

    res.json({ success: true, message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// POST API
app.post("/foods", async (req, res) => {
  const food = new Food(req.body);
  await food.save();
  res.json(food);
});

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.delete("/foods/:id", async (req, res) => {
  try {
    const foodId = req.params.id;
    const deletedFood = await Food.findByIdAndDelete(foodId);

    if (!deletedFood) {
      return res.status(404).json({ message: "Food item not found" });
    }

    res.json({ message: "Food item deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting food item", error });
  }
});


// twilio
app.post("/send-sms", async (req, res) => {
  const { mobile, cart, totalAmount } = req.body;

  if (!mobile || cart.length === 0) {
    return res.status(400).json({ message: "Invalid order details" });
  }

  const orderSummary = cart.map((item) => `${item.name} x ${item.quantity} - ₹${item.price * item.quantity}`).join("\n");
  const messageBody = `Your Order:\n${orderSummary}\nTotal: ₹${totalAmount}\nThank you for ordering!`;

  try {
    await client.messages.create({
      body: messageBody,
      from: twilioNumber,
      to: `+91${mobile}`,
    });

    res.json({ message: "Order details sent successfully!" });
  } catch (error) {
    console.error("SMS Error:", error);
    res.status(500).json({ message: "Failed to send SMS" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

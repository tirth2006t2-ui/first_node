const express = require('express');
const router = express.Router();
const Menu = require('../Model/Menu.js');

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenu = new Menu(data);
    await newMenu.save();
    res.status(200).json(newMenu);
  } catch (err) {
    res.status(500).send("Error creating menu item: " + err.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const menuItems = await Menu.find();
    res.status(200).json(menuItems);
  } catch (err) {
    res.status(500).send("Error fetching menu items: " + err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id; // Correctly getting ID from URL
    const data = req.body;
    const response = await Menu.findByIdAndUpdate(id, data, {
      new: true, // Returns the updated document
      runValidators: true // Ensures the update follows Schema rules
    }); 
    if (!response) {
      return res.status(404).send("Menu item not found");
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send("Error updating menu item: " + err.message);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id; 
    const response = await Menu.findByIdAndDelete(id);
    if (!response) {
      return res.status(404).send("Menu item not found");
    }
    res.status(200).json(response);
  } catch (err) {
    res.status(500).send("Error deleting menu item: " + err.message);
  }
});

module.exports = router;
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

module.exports = router;
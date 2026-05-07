const express = require('express');
const router = express.Router();
const Person = require('../Model/Person.js');

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const person = new Person(data);
    await person.save();
    res.status(200).send("Person saved successfully");
  } catch (err) {
    res.status(500).send("Error saving person: " + err.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const people = await Person.find();
    res.status(200).json(people);
  } catch (err) {
    res.status(500).send("Error fetching people: " + err.message);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id; // Correctly getting ID from URL
    const data = req.body;

    const response = await Person.findByIdAndUpdate(id, data, {
      new: true, // Returns the updated document
      runValidators: true // Ensures the update follows Schema rules
    });

    if (!response) {
      return res.status(404).send("Person not found");
    }

    // --- ADD THIS LINE ---
    res.status(200).json(response); 
    
  } catch (err) {
    res.status(500).send("Error updating person: " + err.message);
  }
});

module.exports = router;
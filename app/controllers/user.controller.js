exports.allAccess = (req, res) => {
    res.status(200).send("Public Content.");
  };
  
  exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
  };
  
  exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
  };
  
  exports.moderatorBoard = (req, res) => {
    res.status(200).send("Moderator Content.");
  };
  
  // Fetch all users for admin or testing purposes
  exports.getAllUsers = async (req, res) => {
    const db = require("../models");
    try {
      const users = await db.user.findAll();
      res.status(200).send(users);
    } catch (error) {
      res.status(500).send({ message: "Unable to fetch users.", error: error.message });
    }
  };
  
  // Fetch user by ID
  exports.getUserById = async (req, res) => {
    const db = require("../models");
    try {
      const user = await db.user.findByPk(req.params.id);
      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send({ message: "Unable to fetch user.", error: error.message });
    }
  };
  
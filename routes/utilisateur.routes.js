const express = require("express")
const utilisateur_routes = express.Router("")
const utilisateur_controller = require("../controllers/utilisateur.controller")

utilisateur_routes.post("/add_user", utilisateur_controller.createUser)



module.exports = utilisateur_routes
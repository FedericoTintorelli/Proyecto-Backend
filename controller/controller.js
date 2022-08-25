const { axios } = require("axios");
const { check, validationResult, body } = require("express-validator");
const { User } = require("../models/users");

const controllers = {
  myIndex(req, res) {
    res.render("index", { title: "Express" });
  },
  myUser(req, res) {
    res.json({
      name: "Federico",
      age: 34,
    });
  },
  newUser: async (req, res) => {
    try {
      const error = validationResult(req);
      if (error.isEmpty()) {
        const user = new User(req.body);
        await user.save();
        res.status(201).json({ user, msg: "se ha guardado correctamente" });
      } else {
        res.status(501).json(error);
      }
    } catch (err) {
      res.status(501).json({
        msg: "No se puede guardar en la DB",
        err,
      });
    }
  },
  verUser: async (req, res) => {
    const user = await User.findById(req.params.id);
    res.json({ user });
  },
  verTodosUser: async (req, res) => {
    const users = await User.find();
    res.json({ users });
  },
  editarUsuario: async (req, res) => {
    try {
      const error = validationResult(req);
      if (error.isEmpty()) {
        const { id } = req.params;
        const update = await User.findByIdAndUpdate(id, req.body);
        res.status(202).json({ name: req.body.name, update });
      } else {
        res.status(501).json(error);
      }
    } catch (error) {
      res.status(501).json({ msg: "Este usuario ya existe" });
    }
  },

  borrarUsuario: async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      res.json({ msg: "Adios", user });
    } catch (error) {
      res.status(400).json({ msg: "Problemas a la hora de borrar el usuario" });
    }
  },
  consultaAxios: async () => {
    try {
      const resp = await axios.get(
        "https://jsonplaceholder.typicode.com/users" + req.params.name
      );
      res.json({ status: resp.status, data: resp.data });
    } catch (error) {
      res.json({ status: error.response.status, data: error.status.data });
    }
  },
};

module.exports = controllers;

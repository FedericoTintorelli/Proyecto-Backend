const { User } = require("../models/users");

const validarID = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (user !== null) {
    next();
  } else {
    res.json({ msg: "El ID es inválido" });
  }
};

module.exports = { validarID };

const express = require("express");
const controllers = require("../controller/controller");
const { validarID } = require("../middleware/validarId");
const { check, validationResult, body } = require("express-validator");
const router = express.Router();

/* GET users listing. */
router.get("/", controllers.myUser);
router.get("/verUsuario/:id", controllers.verUser);
router.get("/verTodos", controllers.verTodosUser);
router.get("/consultaAxios", controllers.consultaAxios);
router.post(
  "/crearUsuario",
  [
    check("name")
      .not()
      .isEmpty()
      .withMessage("El campo esta vacio")
      .isLength({
        min: 3,
        max: 12,
      })
      .withMessage(
        "El nombre debe tener un minimo de 3 carcateres y un maximo de 12"
      ),
    check("email").not().isEmpty().isEmail().withMessage("El campo esta vacio"),
    check("age").not().isEmpty().isNumeric()
  ],
  controllers.newUser
);

router.put(
  "/editarUsuario/:id",
  [
    check("name")
      .not()
      .isEmpty()
      .withMessage("El campo esta vacio")
      .isLength({
        min: 3,
        max: 12,
      })
      .withMessage(
        "El nombre debe tener un minimo de 3 carcateres y un maximo de 12"
      ),
    check("email").not().isEmpty().isEmail().withMessage("El campo esta vacio"),
    check("age").not().isEmpty().isNumeric(),
  ],
  validarID,
  controllers.editarUsuario
);
router.delete("/borrarUsuario/:id", validarID, controllers.borrarUsuario);

module.exports = router;

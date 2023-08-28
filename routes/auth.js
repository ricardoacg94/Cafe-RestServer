const { Router } = require("express");
const { check } = require("express-validator");
const { login } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar-campos");
const router = Router();

router.post(
  "/login",
  check("correo", "el correo es oblogatorio").isEmail(),
  check("password", "el password es obligatorio").notEmpty(),
  validarCampos,
  login
);

module.exports = router;

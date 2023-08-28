const { generarJWT } = require("../helpers/generarJWT");
const Usario = require("../models/usuario");
const bcryptjs = require("bcryptjs");

const login = async (req, res) => {
  const { correo, password } = req.body;

  try {
    // verificar si el email existe
    const usuario = await Usario.findOne({ correo });
    if (!usuario) {
      return res.status(400).json({
        msg: "Usuario/ Password no son correctos-correo",
      });
    }
    // verificar si el usuario esta activo
    if (!usuario.estado) {
      return res.status(400).json({
        msg: "Usuario/ Password no son correctos-correo-estado:inactivo",
      });
    }

    //verificar la contrasenia

    const passwordValidation = bcryptjs.compareSync(password, usuario.password);
    if (!passwordValidation) {
      return res.status(400).json({
        msg: "Usuario/ Password no son correctos-correo- password incorrecto",
      });
    }

    // generar JWT

    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "hable con el administrador" });
  }
};

module.exports = { login };

const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");
const validarJWT = async (req, res, next) => {
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      msg: "No hay token en la peticion",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    usuarioAutenticado = await Usuario.findById(uid);

    if (!usuarioAutenticado) {
      return res.status(401).json({
        msg: "Token no valido- usuario no existe en DB",
      });
    }

    // verificar si el uid tiene estado true
    if (!usuarioAutenticado.estado) {
      return res.status(401).json({
        msg: "Token no valido- usuario con estado: false",
      });
    }

    req.usuario = usuarioAutenticado;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: "Token no valido",
    });
  }
};

module.exports = {
  validarJWT,
};

const { response } = require("express");

const esAdminRole = (req, res = response, next) => {
  if (!req.usuario) {
    return res.status(500).json({
      msg: " se quiere verificar el rol sin validar el token primero",
    });
  }
  const { role, nombre } = req.usuario;

  if (role !== "ADMIN_ROLE") {
    return res.status(401).json({
      msg: `${nombre} no es administrador - no puede realizar la accion`,
    });
  }

  next();
};

module.exports = {
  esAdminRole,
};

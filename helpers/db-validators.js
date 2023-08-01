const Role = require("../models/role");
const Usuario = require("../models/usuario");

const esRoleValido = async (role = "") => {
  const existeRol = await Role.findOne({ role });
  if (!existeRol) {
    throw new Error(`El role ${role} no está registrado en la BD`);
  }
};

const correoExiste = async (correo) => {
  const ExisteCorreo = await Usuario.findOne({ correo });
  if (ExisteCorreo) {
    throw new Error(`el correo ${correo} ya existe en la BD`);
  }
};

const existeUsuarioPorId = async (id) => {
  // Verificar si el correo existe
  const existeUsuario = await Usuario.findById(id);
  if (!existeUsuario) {
    throw new Error(`El id no existe ${id}`);
  }
};

module.exports = {
  esRoleValido,
  correoExiste,
  existeUsuarioPorId,
};

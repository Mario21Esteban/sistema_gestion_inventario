const express = require("express");
const router = express.Router();
const {
  getPersonas,
  createPersona,
  getHistorialPorPersona,
  registrarUsuario,
  login,
  eliminarPersona,
  cambiarRolPersona,
  reactivarPersona,
  cambiarContraseña,
} = require("../controllers/persona.controller");

router.put("/:id/cambiar-rol", cambiarRolPersona);
router.delete("/:id", eliminarPersona);
router.get("/:id/historial", getHistorialPorPersona);
router.put("/:id/reactivar", reactivarPersona);
router.get("/", getPersonas);
router.post("/", createPersona);
router.post("/registro", registrarUsuario);
router.post("/login", login);
router.put("/:id/cambiar-contraseña", cambiarContraseña);

module.exports = router;

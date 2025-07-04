// 📍 backend/repararAdmin.js

const db = require("./config/db");  // Asegúrate que esta ruta sea correcta
const bcrypt = require("bcryptjs");

// Configura aquí los datos del admin
const correoAdmin = "mario@example.com";  // Cambia al correo real del admin
const nuevaContraseña = "mario123";     // Nueva contraseña segura

async function repararAdmin() {
  try {
    const hash = await bcrypt.hash(nuevaContraseña, 10);
    const sql = `
      UPDATE persona
      SET contraseña = ?, activo = 1
      WHERE correo = ? AND rol_id = 1
    `;

    db.query(sql, [hash, correoAdmin], (err, result) => {
      if (err) {
        console.error("Error al actualizar contraseña:", err);
        process.exit(1);
      }

      if (result.affectedRows === 0) {
        console.log("⚠️ No se encontró un usuario administrador con ese correo.");
      } else {
        console.log("✅ Contraseña de administrador restablecida correctamente.");
        console.log(`Nuevo usuario admin: ${correoAdmin}`);
        console.log(`Nueva contraseña: ${nuevaContraseña}`);
      }

      db.end(); // Cierra conexión
    });
  } catch (error) {
    console.error("Error al cifrar contraseña:", error);
    process.exit(1);
  }
}

repararAdmin();

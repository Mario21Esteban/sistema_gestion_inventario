const db = require('./config/db');

// Script para modificar la estructura de la tabla activos
// Cambiar el campo foto a LONGTEXT para soportar imágenes base64 grandes

const alterTableQuery = `
  ALTER TABLE activos 
  MODIFY COLUMN foto LONGTEXT;
`;

const describeTableQuery = `
  DESCRIBE activos;
`;

console.log('🔄 Modificando la estructura de la tabla activos...');

db.query(alterTableQuery, (err, result) => {
  if (err) {
    console.error('❌ Error al modificar la tabla:', err);
    return;
  }
  
  console.log('✅ Tabla activos modificada exitosamente');
  
  // Verificar los cambios
  db.query(describeTableQuery, (err, results) => {
    if (err) {
      console.error('❌ Error al verificar la tabla:', err);
      return;
    }
    
    console.log('📋 Estructura actual de la tabla activos:');
    console.table(results);
    
    // Buscar el campo foto específicamente
    const fotoField = results.find(field => field.Field === 'foto');
    if (fotoField) {
      console.log(`📸 Campo foto: ${fotoField.Type}`);
    }
    
    process.exit(0);
  });
});

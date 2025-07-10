-- Script alternativo para modificar el campo foto
-- Usar MEDIUMTEXT si LONGTEXT causa problemas

USE inventario_db;

-- Opción 1: LONGTEXT (hasta 4GB)
ALTER TABLE activos MODIFY COLUMN foto LONGTEXT;

-- Opción 2: MEDIUMTEXT (hasta 16MB) - descomenta esta línea si prefieres esta opción
-- ALTER TABLE activos MODIFY COLUMN foto MEDIUMTEXT;

-- Verificar los cambios
DESCRIBE activos;

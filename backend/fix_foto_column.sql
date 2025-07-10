-- Script para modificar el campo foto en la tabla activos
-- Cambiar de VARCHAR a LONGTEXT para soportar imágenes base64 grandes

USE inventario_db;

-- Modificar el tipo de datos del campo foto
ALTER TABLE activos MODIFY COLUMN foto LONGTEXT;

-- Verificar la estructura de la tabla
DESCRIBE activos;

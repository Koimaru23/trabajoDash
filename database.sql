CREATE DATABASE IF NOT EXISTS entregable_crud;
USE entregable_crud;

DROP TABLE IF EXISTS registros;

CREATE TABLE registros (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nombre TEXT NOT NULL,       
    username TEXT NOT NULL,     
    password TEXT NOT NULL,     
    categoria TEXT NOT NULL,
    estado TEXT NOT NULL,   -- Esto es para la categoria y es activo o inactivo
    create_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- Fecha de creacion
    update_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Fecha Actualizacion
);

-- Insertamos los usuarios de prueba
INSERT INTO registros (nombre, username, password, categoria, estado) 
VALUES 
('Hector ', 'hrcm2', '123', 'Administrador', 'Activo'),
('Pedro', 'pedo', '234', 'Soporte', 'Pendiente'),
('Ana ', 'anitadev', '2026', 'Desarrollo', 'Inactivo');

SELECT * FROM registros;

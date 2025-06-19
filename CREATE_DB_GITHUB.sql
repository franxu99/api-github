-- Crear la base de datos
CREATE DATABASE IF NOT EXISTS ticketingithub;
USE ticketingithub;

-- Crear la tabla ESTADOS
CREATE TABLE ESTADOS (
    id_estado INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(100) NOT NULL
);

-- Inserts ESTADOS
INSERT INTO `ticketingithub`.`ESTADOS` (`id_estado`, `descripcion`) VALUES ('1', 'Listo');
INSERT INTO `ticketingithub`.`ESTADOS` (`id_estado`, `descripcion`) VALUES ('2', 'Pendiente de subir a producción');
INSERT INTO `ticketingithub`.`ESTADOS` (`id_estado`, `descripcion`) VALUES ('3', 'Pruebas');
INSERT INTO `ticketingithub`.`ESTADOS` (`id_estado`, `descripcion`) VALUES ('4', 'En desarrollo');
INSERT INTO `ticketingithub`.`ESTADOS` (`id_estado`, `descripcion`) VALUES ('5', 'Paralizado');
INSERT INTO `ticketingithub`.`ESTADOS` (`id_estado`, `descripcion`) VALUES ('6', 'Pendiente');

-- Crear la tabla TIPOSTICKET
CREATE TABLE TIPOSTICKET (
    id_tipo_ticket INT AUTO_INCREMENT PRIMARY KEY,
    descripcion VARCHAR(100) NOT NULL
);

-- Inserts TIPOSTICKETS
INSERT INTO TIPOSTICKET (descripcion) VALUES ('Bug');
INSERT INTO TIPOSTICKET (descripcion) VALUES ('Nueva característica');
INSERT INTO TIPOSTICKET (descripcion) VALUES ('Documentación');
INSERT INTO TIPOSTICKET (descripcion) VALUES ('Soporte');
INSERT INTO TIPOSTICKET (descripcion) VALUES ('Mejora/modificación');



-- Crear la tabla TICKETS
CREATE TABLE TICKETS (
    id_ticket INT AUTO_INCREMENT PRIMARY KEY,
    encabezado VARCHAR(255) NOT NULL,
    descripcion TEXT,
    idf_tipo_ticket INT,
    idf_tipo_estado INT,
    repositorio VARCHAR(255),
    owner VARCHAR(100),
    FOREIGN KEY (idf_tipo_ticket) REFERENCES TIPOSTICKET(id_tipo_ticket),
    FOREIGN KEY (idf_tipo_estado) REFERENCES ESTADOS(id_estado)
);

INSERT INTO `ticketingithub`.`tickets`
(`id_ticket`, `encabezado`, `descripcion`, `idf_tipo_ticket`, `idf_tipo_estado`, `repositorio`, `owner`)
VALUES
(1, 'Error al obtener issues', 'El sistema no puede recuperar los issues del repositorio.', 2, 1, 'https://api.github.com/repos/franxu99/api-github', 'franxu99'),

(2, 'Mejora en el filtrado', 'Agregar filtros por fecha y estado en la búsqueda de tickets.', 3, 2, 'https://api.github.com/repos/franxu99/api-github', 'Manteca-Daniel'),

(3, 'Feature: exportar tickets a CSV', 'Se solicita una opción para exportar los tickets a formato CSV.', 1, 1, 'https://api.github.com/repos/franxu99/api-github', 'franxu99'),

(4, 'Bug: estado incorrecto', 'Al cerrar un ticket, su estado no se actualiza correctamente.', 2, 3, 'https://api.github.com/repos/franxu99/api-github', 'Manteca-Daniel'),

(5, 'Incluir validaciones en formulario', 'Faltan validaciones para los campos obligatorios al crear ticket.', 3, 1, 'https://api.github.com/repos/franxu99/api-github', 'franxu99'),

(6, 'Feature: etiquetas en tickets', 'Se necesita agregar etiquetas para clasificar los tickets.', 1, 2, 'https://api.github.com/repos/franxu99/api-github', 'Manteca-Daniel'),

(7, 'Error 404 en detalles del ticket', 'No se encuentra la ruta al acceder a los detalles de un ticket.', 2, 1, 'https://api.github.com/repos/franxu99/api-github', 'franxu99'),

(8, 'Optimización de carga', 'Reducir el tiempo de carga de la lista de tickets.', 3, 2, 'https://api.github.com/repos/franxu99/api-github', 'Manteca-Daniel'),

(9, 'Bug: no se pueden eliminar tickets', 'El botón de eliminar no ejecuta ninguna acción.', 2, 1, 'https://api.github.com/repos/franxu99/api-github', 'franxu99'),

(10, 'Feature: notificaciones push', 'Agregar notificaciones en tiempo real cuando se actualiza un ticket.', 1, 1, 'https://api.github.com/repos/franxu99/api-github', 'Manteca-Daniel');




-- Este script SQL crea y llena una base de datos llamada `trailerflix` con varias tablas relacionadas con actores, categorías, contenidos y géneros.
-- 
-- Estructura de las tablas:
-- 
-- 1. `actores`: Contiene información sobre los actores, con columnas para el ID del actor y su nombre.
-- 2. `categoria`: Contiene información sobre las categorías de contenido, con columnas para el ID de la categoría y su nombre.
-- 3. `contenido`: Contiene información sobre los contenidos (películas y series), con columnas para el ID, póster, título, categoría, género, resumen, temporadas, duración, reparto y trailer.
-- 4. `contenido_actores`: Relaciona los contenidos con los actores, con columnas para el ID del reparto, ID del contenido y ID del actor.
-- 5. `genero`: Contiene información sobre los géneros de contenido, con columnas para el ID del género y su nombre.
-- 
-- El script incluye comandos para crear las tablas, insertar datos en ellas y establecer las relaciones necesarias entre las tablas.
-- 
-- Además, se incluyen configuraciones específicas para el conjunto de caracteres y la colación, así como comandos para deshabilitar y habilitar claves únicas y de clave foránea durante la inserción de datos.
-- 

CREATE DATABASE IF NOT EXISTS `trailerflix`
  /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci */
  /*!80016 DEFAULT ENCRYPTION='N' */;
USE `trailerflix`;

-- Configuración inicial
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

-- Tabla `actores`
DROP TABLE IF EXISTS `actores`;
CREATE TABLE `actores` (
  `id_actor` int NOT NULL AUTO_INCREMENT,
  `nombre_actor` varchar(255) NOT NULL,
  PRIMARY KEY (`id_actor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Datos para la tabla `actores`
INSERT INTO `actores` VALUES 
(1,'Pedro Pascal'),(2,'Carl Weathers'),(3,'Misty Rosas'),(4,'Chris Bartlett'),(5,'Rio Hackford'),(6,'Giancarlo Esposito'),(7,'Joaquin Phoenix'),(8,'Robert De Niro'),(9,'Zazie Beetz'),(10,'Frances Conroy');

-- Tabla `categoria`
DROP TABLE IF EXISTS `categoria`;
CREATE TABLE `categoria` (
  `id_categoria` int NOT NULL AUTO_INCREMENT,
  `nombre_categoria` char(20) NOT NULL,
  PRIMARY KEY (`id_categoria`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Datos para la tabla `categoria`
INSERT INTO `categoria` VALUES (1,'Pelicula'),(2,'Serie');

-- Tabla `genero`
DROP TABLE IF EXISTS `genero`;
CREATE TABLE `genero` (
  `id_genero` int NOT NULL AUTO_INCREMENT,
  `nombre_genero` varchar(255) NOT NULL,
  PRIMARY KEY (`id_genero`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Datos para la tabla `genero`
INSERT INTO `genero` VALUES (1,'Acción'),(2,'Comedia'),(3,'Drama'),(4,'Fantasía'),(5,'Ciencia Ficción');

-- Tabla `contenido`
DROP TABLE IF EXISTS `contenido`;
CREATE TABLE `contenido` (
  `id` int NOT NULL AUTO_INCREMENT,
  `poster` varchar(255) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `categoria` varchar(255) NOT NULL,
  `gen` varchar(255) NOT NULL,
  `genero` varchar(255) NOT NULL,
  `busqueda` text NOT NULL,
  `resumen` text,
  `temporadas` int,
  `duracion` varchar(255),
  `reparto` text,
  `trailer` varchar(255),
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Datos para la tabla `contenido`
INSERT INTO `contenido` VALUES 
(1, './posters/1.jpg', 'The Crown', 'Serie', 'Suceso Real', 'Drama, Suceso Real', 'The Crown, Drama, Suceso Real, Claire Fox, Olivia Colman, Matt Smith, Tobias Menzies, Vanesa Kirby, Helena Bonham Carter', 'Este drama narra las rivalidades políticas y el romance de la reina Isabel II, así como los sucesos que moldearon la segunda mitad del siglo XX.', 4, NULL, 'Claire Fox, Olivia Colman, Matt Smith, Tobias Menzies, Vanesa Kirby, Helena Bonham Carter', 'https://www.youtube.com/embed/JWtnJjn6ng0');

-- Tabla `contenido_actores`
DROP TABLE IF EXISTS `contenido_actores`;
CREATE TABLE `contenido_actores` (
  `id_reparto` int NOT NULL AUTO_INCREMENT,
  `id_contenido` int DEFAULT NULL,
  `id_actor` int NOT NULL,
  PRIMARY KEY (`id_reparto`),
  UNIQUE KEY `contenido_actores_id_actor_id_contenido_unique` (`id_contenido`,`id_actor`),
  KEY `id_actor` (`id_actor`),
  CONSTRAINT `contenido_actores_ibfk_1` FOREIGN KEY (`id_contenido`) REFERENCES `contenido` (`id`),
  CONSTRAINT `contenido_actores_ibfk_2` FOREIGN KEY (`id_actor`) REFERENCES `actores` (`id_actor`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Datos para la tabla `contenido_actores`
INSERT INTO `contenido_actores` VALUES 
(1,1,1),(2,1,2),(3,1,3),(4,1,4),(5,1,5),(6,1,6);

-- Restaurar configuraciones iniciales
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

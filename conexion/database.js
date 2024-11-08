import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

// Configuración de entorno
const ENV = process.env.NODE_ENV || 'local';
dotenv.config({ path: `.env.${ENV}` });

// Variables de entorno
const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
  DB_DIALECT = 'mysql'
} = process.env;

// Creación de la instancia de Sequelize
/**
 * Configuración de la instancia de Sequelize para la conexión a la base de datos.
 *
 * @constant
 * @type {Sequelize}
 * @param {string} DB_NAME - Nombre de la base de datos.
 * @param {string} DB_USER - Usuario de la base de datos.
 * @param {string} DB_PASSWORD - Contraseña del usuario de la base de datos.
 * @param {Object} options - Opciones de configuración para Sequelize.
 * @param {string} options.host - Dirección del host de la base de datos.
 * @param {string} options.dialect - Dialecto de la base de datos (por ejemplo, 'mysql', 'postgres').
 * @param {number} options.port - Puerto de la base de datos.
 * @param {Object} options.pool - Configuración del pool de conexiones.
 * @param {number} options.pool.max - Número máximo de conexiones en el pool.
 * @param {number} options.pool.min - Número mínimo de conexiones en el pool.
 * @param {number} options.pool.acquire - Tiempo máximo, en milisegundos, que Sequelize intentará obtener una conexión antes de lanzar un error.
 * @param {number} options.pool.idle - Tiempo máximo, en milisegundos, que una conexión puede estar inactiva antes de ser liberada.
 * @param {Object} options.dialectOptions - Opciones específicas del dialecto.
 * @param {number} options.dialectOptions.connectTimeout - Tiempo máximo, en milisegundos, para establecer una conexión.
 * @param {Function} options.logging - Función de registro para la salida de logs (por defecto, `console.log`).
 */
const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  port: DB_PORT,
  pool: {
    max: 5,
    min: 0,
    acquire: 100000,
    idle: 10000
  },
  dialectOptions: {
    connectTimeout: 100000
  },
  logging: console.log
});

// Autenticación con la base de datos
sequelize.authenticate()
  .then(() => console.log('Conectado a la base de datos de MySQL'))
  .catch((err) => console.error('No se pudo conectar a la base de datos:', err));

// Exportación de la instancia de Sequelize
export default sequelize;
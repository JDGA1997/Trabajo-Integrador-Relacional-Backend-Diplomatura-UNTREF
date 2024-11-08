import { DataTypes } from 'sequelize';
import sequelize from '../conexion/database.js';

/**
 * Modelo de datos para la entidad Actor.
 * 
 * @typedef {Object} Actor
 * @property {number} id - Identificador único del actor, autoincremental y no nulo.
 * @property {string} nombre - Nombre del actor, no nulo, con validaciones de longitud y formato.
 * @property {string} apellido - Apellido del actor, no nulo, con validaciones de longitud.
 * 
 * @property {Object} options - Opciones del modelo.
 * @property {string} options.tableName - Nombre de la tabla en la base de datos.
 * @property {boolean} options.timestamps - Indica si se deben usar timestamps.
 * @property {string} options.charset - Conjunto de caracteres utilizado.
 * @property {string} options.collate - Cotejamiento utilizado.
 * @property {Array<Object>} options.indexes - Índices definidos para la tabla.
 * @property {boolean} options.indexes[].unique - Indica si el índice es único.
 * @property {Array<string>} options.indexes[].fields - Campos incluidos en el índice.
 */
const Actor = sequelize.define('Actor', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El nombre del actor no puede estar vacío',
      },
      len: {
        args: [1, 255],
        msg: 'El nombre del actor debe tener entre 1 y 255 caracteres',
      },
      is: {
        args: /^[a-zA-Z\s]+$/i,
        msg: 'El nombre solo puede contener letras y espacios',
      },
    },
  },
  apellido: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
      notEmpty: {
        msg: 'El apellido del actor no puede estar vacío',
      },
      len: {
        args: [1, 255],
        msg: 'El apellido del actor debe tener entre 1 y 255 caracteres',
      },
    },
  }
}, {
  tableName: 'actores',
  timestamps: false,
  charset: 'utf8mb4',
  collate: 'utf8mb4_unicode_ci',
  indexes: [
    { unique: true, fields: ['nombre', 'apellido'] }
  ]
});

export default Actor;

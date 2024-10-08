import { DataTypes, Model } from 'sequelize';
import sequelize from '../conexion/database.js';

/**
 * Clase que representa el modelo de Genero.
 * 
 * @class Genero
 * @extends Model
 */
class Genero extends Model {}

Genero.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: {
        msg: 'El género debe ser único'
      },
      validate: {
        notEmpty: {
          msg: 'El nombre del género no puede estar vacío'
        },
        len: {
          args: [3, 100],
          msg: 'El nombre del género debe tener entre 3 y 100 caracteres'
        },
        isAlpha: {
          msg: 'El nombre del género solo puede contener letras'
        }
      }
    }
  },
  {
    sequelize,
    modelName: 'Genero',
    tableName: 'generos',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci'
  }
);

export default Genero;

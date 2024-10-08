import { DataTypes, Model } from 'sequelize';
import sequelize from '../conexion/database.js'; // Asegúrese de que esta ruta es correcta y de que la instancia de Sequelize está correctamente configurada

/**
 * Clase que representa una categoría en el modelo.
 * 
 * @class Categoria
 * @extends Model
 */
class Categoria extends Model {}

Categoria.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      unique: true,
    },
    nombre: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'El nombre de la categoría no puede estar vacío',
        },
        len: {
          args: [1, 255],
          msg: 'El nombre de la categoría debe tener entre 1 y 255 caracteres',
        },
        is: {
          args: /^[a-zA-Z\s]+$/i,
          msg: 'El nombre de la categoría solo puede contener letras y espacios',
        },
      },
    },
  },
  {
    sequelize,
    modelName: 'Categoria',
    tableName: 'categorias',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
  }
);

export default Categoria;

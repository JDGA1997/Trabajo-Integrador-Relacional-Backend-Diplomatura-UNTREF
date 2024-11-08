import { DataTypes } from 'sequelize';
import sequelize from '../conexion/database';
import Contenido from './contenido';
import Genero from './genero';

// Garantizar que los modelos Contenido y Genero estén correctamente definidos e importados.

/**
 * Modelo que representa la relación entre contenido y géneros en la base de datos.
 * 
 * @typedef {Object} ContenidoGeneros
 * @property {number} contenido_id - ID del contenido, referencia a la tabla Contenido.
 * @property {number} genero_id - ID del género, referencia a la tabla Genero.
 * 
 * @param {import('sequelize').Sequelize} sequelize - La instancia de Sequelize.
 * @param {import('sequelize').DataTypes} DataTypes - Los tipos de datos de Sequelize.
 * @returns {import('sequelize').Model} El modelo de ContenidoGeneros.
 */
const ContenidoGeneros = sequelize.define('ContenidoGeneros', {
    contenido_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Contenido,
            key: 'id',
        },
        allowNull: false,
    },
    genero_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Genero,
            key: 'id',
        },
        allowNull: false,
    },
}, {
    tableName: 'contenido_generos',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
});

export default ContenidoGeneros;

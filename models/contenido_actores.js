import { DataTypes } from 'sequelize';
import sequelize from '../conexion/database.js';
import Contenido from './contenido';
import Actor from './actor';

/**
 * Modelo que representa la relación entre contenidos y actores.
 * 
 * @typedef {Object} ContenidoActores
 * @property {number} contenido_id - ID del contenido, referencia a la tabla Contenido.
 * @property {number} actor_id - ID del actor, referencia a la tabla Actor.
 * 
 * @param {import('sequelize').Sequelize} sequelize - La instancia de Sequelize.
 * @param {import('sequelize').DataTypes} DataTypes - Los tipos de datos de Sequelize.
 * 
 * @returns {import('sequelize').Model} ContenidoActores - El modelo de la tabla contenido_actores.
 */
const ContenidoActores = sequelize.define('ContenidoActores', {
    contenido_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Contenido,
            key: 'id',
        },
        allowNull: false,
    },
    actor_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Actor,
            key: 'id',
        },
        allowNull: false,
    },
}, {
    tableName: 'contenido_actores',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
});

export default ContenidoActores;

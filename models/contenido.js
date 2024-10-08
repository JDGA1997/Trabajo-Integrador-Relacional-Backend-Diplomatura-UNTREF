import { DataTypes } from 'sequelize';
import sequelize from '../conexion/database';
import Categoria from './categoria';
import Genero from './genero';
import Actor from './actor';
import ContenidoActores from './contenido_actores';
import ContenidoGeneros from './contenido_generos';

/**
 * Modelo de Sequelize para la tabla 'contenido'.
 * 
 * @typedef {Object} Contenido
 * @property {number} id - Identificador único del contenido, clave primaria, autoincremental y no nulo.
 * @property {string} titulo - Título del contenido, no nulo, longitud entre 2 y 255 caracteres.
 * @property {string} poster - URL del póster del contenido, no nulo y debe ser una URL válida.
 * @property {string} resumen - Resumen del contenido, no nulo, longitud entre 10 y 5000 caracteres.
 * @property {number} [temporadas=1] - Número de temporadas del contenido, opcional, valor por defecto 1, debe ser un entero mayor o igual a 0.
 * @property {string} trailer - URL del tráiler del contenido, no nulo y debe ser una URL válida.
 * @property {string} [duracion] - Duración del contenido, opcional.
 * @property {number} categoria_id - Identificador de la categoría, no nulo, referencia a la tabla 'Categoria'.
 * @property {number} gen_id - Identificador del género, no nulo, referencia a la tabla 'Genero'.
 * @property {string} [busqueda] - Campo de búsqueda, opcional, longitud máxima de 250 caracteres.
 * @property {number} [calificacion] - Calificación del contenido, opcional.
 */
const Contenido = sequelize.define('Contenido', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    titulo: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [2, 255],
        },
    },
    poster: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            isUrl: true,
            notEmpty: true,
        },
    },
    resumen: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [10, 5000],
        },
    },
    temporadas: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: 1,
        validate: {
            isInt: true,
            min: 0,
        },
    },
    trailer: {
        type: DataTypes.STRING(255),
        allowNull: false,
        validate: {
            isUrl: true,
            notEmpty: true,
        },
    },
    duracion: {
        type: DataTypes.STRING(50),
        allowNull: true,
    },
    categoria_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Categoria,
            key: 'id',
        },
        allowNull: false,
        validate: {
            isInt: true,
            notNull: { msg: 'La categoría es obligatoria' },
        },
    },
    gen_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Genero,
            key: 'id',
        },
        allowNull: false,
        validate: {
            isInt: true,
        },
    },
    busqueda: {
        type: DataTypes.STRING(250),
        allowNull: true,
        validate: {
            len: [0, 250],
        },
    },
    calificacion: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
}, {
    tableName: 'contenidos',
    timestamps: false,
    charset: 'utf8mb4',
    collate: 'utf8mb4_unicode_ci',
});

// Relaciones
Contenido.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'categoria' });
Categoria.hasMany(Contenido, { foreignKey: 'categoria_id' });

Contenido.belongsTo(Genero, { foreignKey: 'generoId', as: 'gen' });
Genero.hasMany(Contenido, { foreignKey: 'gen_id' });

Contenido.belongsToMany(Actor, {
    through: ContenidoActores,
    foreignKey: 'contenidoId',
});
Actor.belongsToMany(Contenido, {
    through: ContenidoActores,
    foreignKey: 'actor_id',
});

Contenido.belongsToMany(Genero, {
    through: ContenidoGeneros,
    foreignKey: 'contenido_id',
});
Genero.belongsToMany(Contenido, {
    through: ContenidoGeneros,
    foreignKey: 'gen_id',
});

export default Contenido;

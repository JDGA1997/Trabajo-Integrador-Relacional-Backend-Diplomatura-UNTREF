import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

/**
 * Opciones de configuración para Swagger.
 * 
 * @type {Object}
 * @property {Object} swaggerDefinition - Definición de Swagger.
 * @property {string} swaggerDefinition.openapi - Versión de OpenAPI.
 * @property {Object} swaggerDefinition.info - Información de la API.
 * @property {string} swaggerDefinition.info.title - Título de la API.
 * @property {string} swaggerDefinition.info.version - Versión de la API.
 * @property {string} swaggerDefinition.info.description - Descripción de la API.
 * @property {Object} swaggerDefinition.info.contact - Información de contacto del creador de la API.
 * @property {string} swaggerDefinition.info.contact.name - Nombre del creador.
 * @property {string} swaggerDefinition.info.contact.email - Correo electrónico del creador.
 * @property {string} swaggerDefinition.info.contact.url - URL del perfil del creador.
 * @property {Object[]} swaggerDefinition.info.servers - Lista de servidores donde se aloja la API.
 * @property {string} swaggerDefinition.info.servers.url - URL del servidor.
 * @property {string} swaggerDefinition.info.servers.description - Descripción del servidor.
 * @property {string[]} apis - Rutas de los archivos que contienen las definiciones de los endpoints.
 */
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'TrailerFlix API',
      version: '1.0.0',
      description: 'API para gestionar contenidos de TrailerFlix',
      contact: {
        name: 'Juan Diego',
        email: 'juandi19972008@gmail.com',
        url: 'https://github.com/JDGA1997'
      },
      servers: [
        {
          url: 'http://localhost:3000',
          description: 'Servidor local'
        }
      ]
    }
  },
  apis: ['./routes/*.js']
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export { swaggerUi, swaggerDocs };

import 'dotenv/config';
import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import { sequelize } from './conexion/database.js';
import { swaggerUi, swaggerDocs } from './utils/swaggerConfig.js';

// Importar rutas
const contenidoRoutes = require('./routes/contenidoRoutes');
const actorRoutes = require('./routes/actorRoutes');
const contenidoActorRoutes = require('./routes/contenidoActorRoutes');
const contenidoGeneroRoutes = require('./routes/contenidoGeneroRoutes');
const contenidoBusquedaRoutes = require('./routes/contenidoBusquedaRoutes');
const busquedaRoutes = require('./routes/busquedaRoutes');
const categoriaRoutes = require('./routes/categoriaRoutes');
const genRoutes = require('./routes/genRoutes');
const generoRoutes = require('./routes/generoRoutes');
const posterRoutes = require('./routes/posterRoutes');
const actor_contenidoRoutes = require('./routes/actor_contenidoRoutes');
const genero_contenidoRoutes = require('./routes/genero_contenidoRoutes');
const RTid = require('./routes/id.routes');
const RTfiltrar = require('./routes/filtrar.routes');

// Inicializar la aplicación
const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(bodyParser.json());

// Swagger Config
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware para verificar la conexión a la base de datos
app.use(async (req, res, next) => {
  try {
    await sequelize.authenticate();
    console.log('Conexión establecida con éxito!');
    next();
  } catch (error) {
    res.status(500).json({ error: 'Error en el servidor', description: error.message });
  }
});

// Rutas
app.use('/contenido', contenidoRoutes);
app.use('/actor', actorRoutes);
app.use('/contenidoActor', contenidoActorRoutes);
app.use('/contenidoGenero', contenidoGeneroRoutes);
app.use('/contenidoBusqueda', contenidoBusquedaRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/categoria', categoriaRoutes);
app.use('/gen', genRoutes);
app.use('/genero', generoRoutes);
app.use('/poster', posterRoutes);
app.use('/actor-contenido', actor_contenidoRoutes);
app.use('/genero-contenido', genero_contenidoRoutes);
app.use('', RTid);
app.use('', RTfiltrar);

// Ruta de bienvenida
app.get('/', (req, res) => {
  res.send('Bienvenido a TrailerFlix!');
});

// Middleware para rutas no encontradas 404
app.use((req, res) => {
  res.status(404).json({ message: '404 página no encontrada upps! =(' });
});

// Sincronizar modelos y levantar el servidor
const startServer = async () => {
  try {
    await sequelize.sync();
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
      console.log(`Api documentación running on http://localhost:${PORT}/api-docs`);
    });
  } catch (error) {
    console.error('Error al iniciar el servidor:', error);
  }
};

startServer();

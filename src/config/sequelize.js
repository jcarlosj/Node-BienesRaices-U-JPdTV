import Sequelize from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize( process.env.DB_NAME, process.env.DB_USER ?? 'root', process.env.DB_PASS ?? '', {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'mysql',       // ? Sequelize soporta varios motores de bases de datos
    // ! Habilita campos
    define: {
        timestamps: true,   // ? Agrega dos campos extra a un registro (fecha creacion, fecha actualizacion)
    },
    // ! Configura el comportamiento de conexiones nuevas a la BD
    pool: {     
        min: 0,             // ? Minimo de conexiones
        max: 5,             // ? Maximo de conexiones
        acquire: 30000,     // ? 30000ms = 30s - (Tiempo antes de marcar un error de conexion)
        idle: 10000         // ? 10000ms = 10s - (Tiempo que debe transcurrir para finalizar una conexion)
    },
    operatorAliases: false  // ? Funcionalidades disponibles de Sequelize que estan obsoletas que no deseamos utilizar
});

export default sequelize;
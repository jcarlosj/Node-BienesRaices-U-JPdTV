import express from 'express';

import db from './src/config/sequelize.js';
import userRoutes from './src/routes/user.routes.js';

const
    PORT = 4000,
    app = express();

// * Implementa conexion de MySQL usando Sequelize
try {
    await db.authenticate();
    console.log( 'Sequelize connected to MySQL' );
}
catch( error ) {
    console.error( error );
}

app.set( 'view engine', 'pug' );        // ! Habilita pug como motor de plantillas
app.set( 'views', './src/views' );      // ! Habilita directorio de las vistas

app.use( express.static( 'public' ) );  // ! Habilita directorio para archivos publicos

// * Routing
app.use( '/auth', userRoutes );

app.listen( PORT, () => {
    console.log( `Listening on port ${ PORT }` );
});


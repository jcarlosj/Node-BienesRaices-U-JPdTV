import express from 'express';
import dotenv from 'dotenv';
import csrf from 'csurf';
import cookieParser from 'cookie-parser';

import db from './src/config/sequelize.js';

import authRoutes from './src/routes/auth.routes.js';
import realEstateRoutes from './src/routes/real-estate.routes.js';
import appRoutes from './src/routes/app.routes.js';

dotenv.config({ path: '.env' });

const
    PORT = process.env.PORT || 4000,
    app = express();

app.use( express.urlencoded({ extended: true }) );  // ! Habilita analisis los datos codificados en URL (permite una experiencia similar a JSON con codificación URL)
app.use( cookieParser() );                          // ! Habilita CookieParser
app.use( csrf({ cookie: true }) );                  // ! Habilita CSRF con uso de cookies

// * Implementa conexion de MySQL usando Sequelize
try {
    await db.authenticate();
    db.sync();                          // ! Habilita sincronizacion de los modelos con la base de datos (operacion destructiva)
    
    console.log( 'Sequelize connected to MySQL' );
}
catch( error ) {
    console.error( error );
}

app.set( 'view engine', 'pug' );        // ! Habilita pug como motor de plantillas
app.set( 'views', './src/views' );      // ! Habilita directorio de las vistas

app.use( express.static( 'public' ) );  // ! Habilita directorio para archivos publicos

// * Routing
app.use( '/', appRoutes );
app.use( '/auth', authRoutes );
app.use( '/', realEstateRoutes );

app.listen( PORT, () => {
    console.log( `Listening on port ${ PORT }` );
});


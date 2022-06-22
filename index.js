import express from 'express';

import userRoutes from './src/routes/user.routes.js';

const
    PORT = 4000,
    app = express();

app.set( 'view engine', 'pug' );        // ! Habilita pug como motor de plantillas
app.set( 'views', './src/views' );      // ! Habilita directorio de las vistas

// * Routing
app.use( '/auth', userRoutes );

app.listen( PORT, () => {
    console.log( `Listening on port ${ PORT }` );
});


const
    PORT = 4000,
    express = require( 'express' )
    app = express();

// * Routing
app.get( '/', ( request, response ) => {
    response.send( '<h1>Bienes Raices</h1>' );
});

app.get( '/about-us', ( request, response ) => {
    response.send( '<h1>Nosotros</h1>' );
});

app.listen( PORT, () => {
    console.log( `Listening on port ${ PORT }` );
});


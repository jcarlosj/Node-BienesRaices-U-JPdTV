import express from 'express';

import userRoutes from './src/routes/user.routes.js';

const
    PORT = 4000,
    app = express();

// * Routing
app.use( '/', userRoutes );

app.listen( PORT, () => {
    console.log( `Listening on port ${ PORT }` );
});


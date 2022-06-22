import express from 'express';

const router = express.Router();


// ? Agrupa acciones HTTP sobre la misma ruta
router.route( '/' )
    .get( ( request, response ) => {
        response.json({ path: '/', method: 'GET' });
    })
    .post( ( request, response ) => {
        response.json({ path: '/', method: 'POST' });
    });

router.get( '/about-us', ( request, response ) => {
    response.send( '<h1>Nosotros</h1>' );
});


export default router;
import express from 'express';

const router = express.Router();


// ? Agrupa acciones HTTP sobre la misma ruta
router.route( '/login' )
    .get( ( request, response ) => {
        response.render( './auth/login' );
    });

router.route( '/register' )
    .get( ( request, response ) => {
        response.render( './auth/register' );
    });


export default router;
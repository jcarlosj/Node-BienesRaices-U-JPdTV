import express from 'express';

const router = express.Router();


router.get( '/', ( request, response ) => {
    response.send( '<h1>Bienes Raices</h1>' );
});

router.get( '/about-us', ( request, response ) => {
    response.send( '<h1>Nosotros</h1>' );
});


export default router;
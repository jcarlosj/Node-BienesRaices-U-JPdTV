import express from 'express';

import { validateFormCreate } from '../middlewares/validators/real-state.js';
import protectRoute from '../middlewares/protect-route.js';

import { admin, formCreate, registerRealestate, addRealestateImage } from '../controllers/real-estate.controller.js';

const router = express.Router();

router.get( '/real-estate', 
    protectRoute, 
    admin 
);

router.route( '/real-estate/create' )
    .get( 
        protectRoute, 
        formCreate 
    )
    .post( 
        protectRoute, 
        validateFormCreate,     
        registerRealestate 
    );

router.get( 
    '/real-estate/add-image/:id', 
    protectRoute,
    addRealestateImage 
);


export default router;
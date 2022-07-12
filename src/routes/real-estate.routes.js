import express from 'express';

import { validateFormCreate } from '../middlewares/validators/real-state.js';

import { admin, formCreate, registerRealestate } from '../controllers/real-estate.controller.js';

const router = express.Router();

router.get( '/real-estate', admin );

router.route( '/real-estate/create' )
    .get( formCreate )
    .post( validateFormCreate, registerRealestate );


export default router;
import express from 'express';

import { admin, formCreate } from '../controllers/real-estate.controller.js';

const router = express.Router();

router.get( '/real-estate', admin );

router.get( '/real-estate/create', formCreate );


export default router;
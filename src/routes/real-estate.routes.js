import express from 'express';

import { admin } from '../controllers/real-estate.controller.js';

const router = express.Router();

router.get( '/real-estate', admin );


export default router;
import express from 'express';

const router = express.Router();

import { getAllRealestate } from '../controllers/api.controller.js';


router.get( '/realestate', getAllRealestate );


export default router;
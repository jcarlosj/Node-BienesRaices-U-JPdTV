import express from 'express';

import { homePage, categoriesPage, searchEnginePage, notFoundPage } from '../controllers/app.controller.js';

const router = express.Router();


router.get( '/', homePage );

router.get( '/categories/:id', categoriesPage );

router.get( '/search', searchEnginePage );

router.get( '/404', notFoundPage );


export default router;
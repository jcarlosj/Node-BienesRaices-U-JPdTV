import express from 'express';

import { homePage, categoriesPage, searchEnginePage, notFoundPage } from '../controllers/app.controller.js';
import { isValidCategory } from '../middlewares/category.js';

const router = express.Router();


router.get( '/', homePage );

router.get( 
    '/categories/:id', 
    isValidCategory, 
    categoriesPage 
);

router.get( '/search', searchEnginePage );

router.get( '/404', notFoundPage );


export default router;
import express from 'express';

import { validateFormCreate } from '../middlewares/validators/real-state.js';
import protectRoute from '../middlewares/protect-route.js';
import uploadImage from '../middlewares/upload-image.js';
import { canMakeChanges } from '../middlewares/real-estate.js';

import { admin, formCreate, registerRealestate, addRealestateImage, saveImage, formEdit } from '../controllers/real-estate.controller.js';

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
router.post(
    '/real-estate/add-image/:id', 
    [
        protectRoute,
        uploadImage.single( 'imagerealestate' )
    ],
    saveImage
);
// ! NOTA: 
//      uploadImage.single( 'img-realestate' );       // ? Indica que sube una imagen (single) y pasamos el nombre del parametro en la configuracion de Dropzone
//      uploadImage.array( 'img-realestate' );        // ? Indica que sube multiples imagenes (array) y pasamos el nombre del parametro en la configuracion de Dropzone (hay que habilitar maxFiles en la configuracion de Dropzone)

router.get(
    '/real-estate/edit/:id',
    [ protectRoute, canMakeChanges ],
    formEdit 
);

export default router;
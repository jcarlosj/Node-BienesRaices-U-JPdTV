import express from 'express';

import { validateFormCreate, validateFormEdit } from '../middlewares/validators/real-state.js';
import { validateFormMessageToOwner } from '../middlewares/validators/message.js';
import protectRoute from '../middlewares/protect-route.js';
import uploadImage from '../middlewares/upload-image.js';
import { canMakeChanges, canRegister, canShow } from '../middlewares/real-estate.js';
import { isAuthenticated } from '../middlewares/user.js';

import { 
    admin, 
    formCreate, 
    registerRealestate, 
    addRealestateImage, 
    saveImage, 
    formEdit, 
    registerChanges, 
    deteleRegister, 
    showRealestate,
    sendMessageToOwner
} from '../controllers/real-estate.controller.js';


const router = express.Router();

// ********* RUTAS DE ACCESO PRIVADO *********
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
        [ protectRoute, validateFormCreate ],     
        registerRealestate 
    );

router.get( 
    '/real-estate/add-image/:id', 
    [ protectRoute, canRegister ],
    addRealestateImage 
);
router.post(
    '/real-estate/add-image/:id', 
    [
        protectRoute,
        canRegister,
        uploadImage.single( 'imagerealestate' )
    ],
    saveImage
);
// ! NOTA: 
//      uploadImage.single( 'img-realestate' );       // ? Indica que sube una imagen (single) y pasamos el nombre del parametro en la configuracion de Dropzone
//      uploadImage.array( 'img-realestate' );        // ? Indica que sube multiples imagenes (array) y pasamos el nombre del parametro en la configuracion de Dropzone (hay que habilitar maxFiles en la configuracion de Dropzone)

router.route( '/real-estate/edit/:id' )
    .get(
        [ protectRoute, canMakeChanges ],
        formEdit 
    )
    .post(
        [ protectRoute, validateFormEdit, canMakeChanges ],
        registerChanges
    );

router.post( 
    '/real-estate/delete/:id',
    [ protectRoute, canMakeChanges ],
    deteleRegister
);

// ********* RUTAS DE ACCESO PUBLICO *********
router.route( '/real-estate/:id' )
    .get( 
        isAuthenticated,
        canShow,
        showRealestate
    )
    .post(
        isAuthenticated,
        canShow,
        validateFormMessageToOwner,
        sendMessageToOwner
    );


export default router;
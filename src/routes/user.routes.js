import express from 'express';

import { 
    formLogin, 
    formRegister, registerUser,
    formRecoverPassword 
} from '../controllers/user.controller.js';

const router = express.Router();


router.get( '/login', formLogin );

router.route( '/register' )
    .get( formRegister )
    .post( registerUser );

router.get( '/recover-password', formRecoverPassword );


export default router;
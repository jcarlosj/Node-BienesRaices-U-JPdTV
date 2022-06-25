import express from 'express';

import { validateRegisterUser } from '../validators/user.js';

import { 
    formLogin, 
    formRegister, registerUser,
    formRecoverPassword 
} from '../controllers/user.controller.js';

const router = express.Router();


router.get( '/login', formLogin );

router.route( '/register' )
    .get( formRegister )
    .post( validateRegisterUser, registerUser );

router.get( '/recover-password', formRecoverPassword );


export default router;
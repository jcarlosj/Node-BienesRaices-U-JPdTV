import express from 'express';

import { validateRegisterUser } from '../validators/user.js';
import { verifyConfirmationToken } from '../middlewares/verifyConfirmationToken.js';

import { 
    formLogin, 
    formRegister, registerUser,
    formRecoverPassword,
    confirmAccount
} from '../controllers/user.controller.js';

const router = express.Router();


router.get( '/login', formLogin );

router.route( '/register' )
    .get( formRegister )
    .post( validateRegisterUser, registerUser );

router.get( '/recover-password', formRecoverPassword );

router.get( 
    '/confirm-account/:token', 
    verifyConfirmationToken,
    confirmAccount 
);

export default router;
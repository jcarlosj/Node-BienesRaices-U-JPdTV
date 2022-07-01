import express from 'express';

import { validateFormRegister, validateFormRecoverPassword, validateFormChangePassword, validateLoginUser } from '../middlewares/validators/auth.js';
import { isValidToken } from '../middlewares/token.js';
import { isConfirmedEmail, isValidPassword } from '../middlewares/user.js';

import { 
    formLogin, signIn, 
    formRegister, registerUser,
    formRecoverPassword, resetPassword,
    confirmAccount,
    formChangePassword, changePassword
} from '../controllers/user.controller.js';

const router = express.Router();


router.route( '/login' )
    .get( formLogin )
    .post( 
        validateLoginUser, 
        isConfirmedEmail, 
        isValidPassword, 
        signIn
    );

router.route( '/register' )
    .get( formRegister )
    .post( validateFormRegister, registerUser );

router.route( '/recover-password' )
    .get( formRecoverPassword )
    .post( validateFormRecoverPassword, resetPassword );

router.route( '/recover-password/:token' )
    .get( isValidToken, formChangePassword )
    .post( validateFormChangePassword, changePassword );

router.get( 
    '/confirm-account/:token', 
    isValidToken,
    confirmAccount 
);

export default router;
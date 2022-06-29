import express from 'express';

import { validateRegisterUser, validateResetPassword, validateChangePassword } from '../middlewares/validators/user.js';
import { verifyConfirmationToken } from '../middlewares/verifyConfirmationToken.js';

import { 
    formLogin, 
    formRegister, registerUser,
    formRecoverPassword, resetPassword,
    confirmAccount,
    formChangePassword, generateNewPassword
} from '../controllers/user.controller.js';

const router = express.Router();


router.get( '/login', formLogin );

router.route( '/register' )
    .get( formRegister )
    .post( validateRegisterUser, registerUser );

router.route( '/recover-password' )
    .get( formRecoverPassword )
    .post( validateResetPassword, resetPassword );

router.route( '/recover-password/:token' )
    .get( verifyConfirmationToken, formChangePassword )
    .post( validateChangePassword, generateNewPassword );

router.get( 
    '/confirm-account/:token', 
    verifyConfirmationToken,
    confirmAccount 
);

export default router;
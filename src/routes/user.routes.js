import express from 'express';

import { formLogin, formRegister, formRecoverPassword } from '../controllers/user.controller.js';

const router = express.Router();


router.get( '/login', formLogin );
router.get( '/register', formRegister );
router.get( '/recover-password', formRecoverPassword );


export default router;
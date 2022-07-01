import { check } from 'express-validator';
import { validateResult } from '../../helpers/validate.helper.js';

import { userRegisterErrors, resetPasswordErrors, changePasswordErrors, loginErrors } from '../../controllers/user.controller.js';
import User from '../../models/User.js';


// ! Validaciones: Formulario registro de usuario
const validateRegisterUser = [
    check( 'name' )
        .exists()           // ! Valida si existe el campo
        .notEmpty()         // ! Otra forma:    .not().isEmpty()
            .withMessage( 'Name is required' ),
    check( 'email' )
        .exists()
        .not().isEmpty()   // ! Otra forma: .notEmpty()
            .withMessage( 'Email is required' )
        .isEmail()
            .withMessage( 'Invalid email format' )
        .custom( async value => {
            const user = await User.findOne({ where: { email: value } });
            
            if ( user ) throw new Error( 'E-mail already in use' );
        }),
    check( 'password' )
        .exists()
        .not().isEmpty()   // ! Otra forma: .notEmpty()
            .withMessage( 'Password is required' )
        .isLength({ min: 6, max: 12 })
            .withMessage( 'Password must be between 6 and 12 characters long' ),
    check( 'confirm_password' )
        .custom( ( value, { req } ) => {

            console.log( value, ' : ', req.body.password );

            if ( value !== req.body.password ) {
                throw new Error( 'Password confirmation is incorrect' );
            }

            return true;
        }),
    ( request, response, next ) => {
        const errors = validateResult( request, response, next );

        console.log( errors );

        if( errors )
            userRegisterErrors( request, response, errors );
    }
];


// ! Validaciones: Formulario recuperar contraseña
const validateResetPassword = [
    check( 'email' )
        .exists()
        .not().isEmpty()   // ! Otra forma: .notEmpty()
            .withMessage( 'Email is required' )
        .isEmail()
            .withMessage( 'Invalid email format' )
        .custom( async ( value, { req  } ) => {
            const user = await User.findOne({ where: { email: value } });
            
            if ( ! user )
                throw new Error( 'Unregistered email' );
            else
                req.user = user;

            return true;
        }),
    ( request, response, next ) => {
        const errors = validateResult( request, response, next );

        console.log( errors );
        // console.log( response );

        if( errors )
            resetPasswordErrors( request, response, errors );            
    }
];


// ! Validaciones: Formulario cambiar contraseña
const validateChangePassword = [
    check( 'new_password' )
        .exists()
        .not().isEmpty()   // ! Otra forma: .notEmpty()
            .withMessage( 'Password is required' )
        .isLength({ min: 6, max: 12 })
            .withMessage( 'Password must be between 6 and 12 characters long' ),
    check( 'confirm_new_password' )
        .custom( ( value, { req } ) => {

            console.log( value, ' : ', req.body.password );

            if ( value !== req.body.new_password ) {
                throw new Error( 'Password confirmation is incorrect' );
            }

            return true;
        }),
    ( request, response, next ) => {
        const errors = validateResult( request, response, next );

        console.log( errors );

        if( errors )
            changePasswordErrors( request, response, errors );
    }
];

// ! Validaciones: Formulario de Login
const validateLoginUser = [
    check( 'email' )
        .exists()
        .not().isEmpty()   // ! Otra forma: .notEmpty()
            .withMessage( 'Email is required' )
        .isEmail()
            .withMessage( 'Invalid email format' )
        .custom( async ( value, { req } ) => {
            const user = await User.findOne({ where: { email: value } });
            
            if ( ! user )
                throw new Error( 'Unregistered email' );
            else
                req.user = user;
        }),
    check( 'password' )
        .exists()
        .not().isEmpty()   // ! Otra forma: .notEmpty()
            .withMessage( 'Password is required' ),
    ( request, response, next ) => {
        const errors = validateResult( request, response, next );

        console.log( errors );

        if( errors )
            loginErrors( request, response, errors );
    }
];



export {
    validateRegisterUser,
    validateResetPassword,
    validateChangePassword,
    validateLoginUser
}
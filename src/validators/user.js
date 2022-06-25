import { check } from 'express-validator';
import { validateResult } from '../helpers/validate.helper.js';

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
            .withMessage( 'Invalid email format' ),
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
        validateResult( request, response, next );
    }
];

export {
    validateRegisterUser
}
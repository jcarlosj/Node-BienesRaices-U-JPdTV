import { check } from 'express-validator';
import { validateResult } from '../../helpers/validate.helper.js';

import { formMessageToOwnerWithErrors } from '../../controllers/real-estate.controller.js';


// ! Validaciones: Formulario registro de propiedades
const validateFormMessageToOwner = [
    check( 'message' )
        .exists()           // ! Valida si existe el campo
        .notEmpty()         // ! Otra forma:    .not().isEmpty()
            .withMessage( 'Message is required' )
        .isLength({ min: 20 })
            .withMessage( 'Message is very short' )
        .isLength({ max: 280 })
            .withMessage( 'Message is too long, it supports 280 characters, be brief' ),
    ( request, response, next ) => {
        const errors = validateResult( request, response, next );

        console.log( errors );

        if( errors )
            formMessageToOwnerWithErrors( request, response, errors );
    }
];

export {
    validateFormMessageToOwner
}
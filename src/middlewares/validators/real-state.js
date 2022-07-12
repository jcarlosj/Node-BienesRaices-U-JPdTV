import { check } from 'express-validator';
import { validateResult } from '../../helpers/validate.helper.js';

import { formCreateWithErrors } from '../../controllers/real-estate.controller.js';
import { RealEstate } from '../../models/index.js';


// ! Validaciones: Formulario registro de propiedades
const validateFormCreate = [
    check( 'ad_title' )
        .exists()           // ! Valida si existe el campo
        .notEmpty()         // ! Otra forma:    .not().isEmpty()
            .withMessage( 'Ad title is required' ),
    check( 'description' )
        .exists()           // ! Valida si existe el campo
        .notEmpty()         // ! Otra forma:    .not().isEmpty()
            .withMessage( 'Description is required' )
        .isLength({ max: 140 })
            .withMessage( 'Description is too long, be brief' ),
    check( 'category' )
        .exists()
        .isNumeric()
            .withMessage( 'Select a category' ),
    check( 'price' )
        .exists()
        .isNumeric()
            .withMessage( 'Select a price range' ),
    check( 'bedrooms' )
        .exists()
        .isNumeric()
            .withMessage( 'Select a number of rooms' ),
    check( 'parking_lot' )
        .exists()
        .isNumeric()
            .withMessage( 'Select a number of parking spaces' ),
    check( 'wc' )
        .exists()
        .isNumeric()
            .withMessage( 'Select a number of bathrooms' ),
    check( 'lat' )
        .exists()
        .isNumeric()
            .withMessage( 'Indicate the location where the property is located is required' ),
    ( request, response, next ) => {
        const errors = validateResult( request, response, next );

        console.log( errors );

        if( errors )
            formCreateWithErrors( request, response, errors );
    }
];


export {
    validateFormCreate
}
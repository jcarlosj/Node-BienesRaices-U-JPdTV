import { validationResult } from 'express-validator';

const validateResult = ( request, response, next ) => {
    try {
        // ! Si tiene errores, este método arrojará una excepción decorada con la misma API de resultados de validación
        validationResult( request ).throw();    

        return next();      // ! Ejecuta siguiente accion si no hay errores.
    }
    catch( error ) {
        // ! La existencia de errores lanzan la excepción
        response.status( 403 ).send({ errors: error.array() });
    }
}

export {
    validateResult
}
import { User } from '../models/index.js';

import { validateJWT } from '../helpers/token.helper.js';

const protectRoute = async ( request, response , next ) => {
    const { _token } = request.cookies;

    // ! Verifica si nuesta cookie NO contiene un token valido (Usuario NO logueado)
    if( ! _token ) {
        return response.redirect( '/auth/login' );
    }

    try {
        const decoded = validateJWT( _token );
        const foundUser = await User
            .scope( 'noPasswordConfirmationToken' )     // ? Nombre del scope que excluye consulta al modelo
            .findByPk( decoded.id );                    // ? Consulta al Modelo

        console.log( 'Middleware protectRoute', foundUser );

        if( ! foundUser ) {
            return response.redirect( '/auth/login' );
        }

        request.user = foundUser;
        
        return next();
    } 
    catch( error ) {
        console.error( error );
        response.clearCookie( '_token' ).redirect( '/auth/login' );
    }
}

export default protectRoute;
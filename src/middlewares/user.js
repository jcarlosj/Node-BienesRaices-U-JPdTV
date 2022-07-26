import { User } from '../models/index.js';

import { validateJWT } from '../helpers/token.helper.js';


const isConfirmedEmail = async ( request, response, next ) => {
    const { body: { email, password } } = request;

    const user = await User.findOne({
        where: { email }
    });

    // console.log( user );

    if( ! user.confirmed ) {
        return response.render( './auth/form-login', {
            name_page: 'Login',
            csrf_token: request.csrfToken(),
            errors: [{
                msg: 'Your account has not been confirmed'
            }],
            user: { email, password }
        });
    }

    response.locals.user = user;
    next();
}

const isValidPassword = ( request, response, next ) => {
    const { body: { email, password }, user } = request;
    
    console.log({ email, password });
    console.log( user );

    // ! Verifica si la contraseña no es cohincidente (o esta errada)
    if( ! user.verifyPassword( password ) ) {
        return response.render( './auth/form-login', {
            name_page: 'Login',
            csrf_token: request.csrfToken(),
            errors: [{
                msg: 'Check your credentials and enter them again'
            }],
            user: { email, password }
        });
    }

    next();
}

const isAuthenticated = async ( request, response, next ) => {
    const { _token } = request.cookies;

    // ! Verifica si nuesta cookie NO contiene un token valido (Usuario NO logueado)
    if( ! _token ) {
        request.auth_user = null;
        return next();
    }

    // ! Verifica la autenticacion del usuario en el sistema
    try {
        const decoded = validateJWT( _token );
        const foundUser = await User
            .scope( 'noPasswordConfirmationToken' )     // ? Nombre del scope que excluye consulta al modelo
            .findByPk( decoded.id );                    // ? Consulta al Modelo

        console.log( 'Middleware protectRoute', foundUser );

        request.auth_user = foundUser;
        return next();
    }
    catch( error ) {
        console.log( error );
        return response.clearCookie( '_token' ).redirect( '/auth/login' );
    }
}


export {
    isConfirmedEmail,
    isValidPassword,
    isAuthenticated
}
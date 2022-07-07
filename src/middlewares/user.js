import { User } from '../models/index.js';


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


export {
    isConfirmedEmail,
    isValidPassword
}
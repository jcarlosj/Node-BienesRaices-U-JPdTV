import { User } from '../models/index.js';


const isValidToken = async ( request, response, next ) => {
    const { params: { token } } = request;

    const user = await User.findOne({
        where: { token }
    });

    // console.log( user );

    if( ! user ) {
        return response.render( './auth/page-confirmation-message', {
            name_page: 'Error al confirma cuenta',
            message: 'Hubo un error al intentar confirmar tu cuenta, intenta de nuevo.',
            error: true
        });
    }

    response.locals.user = user;
    next();
}


export {
    isValidToken
}
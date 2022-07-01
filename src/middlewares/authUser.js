import User from '../models/User.js';


const verifyConfirmedUser = async ( request, response, next ) => {
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


export {
    verifyConfirmedUser
}
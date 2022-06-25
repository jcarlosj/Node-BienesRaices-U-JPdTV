import User from '../models/User.js';


const formLogin = ( request, response ) => {
    response.render( './auth/login', {
        name_page: 'Login'
    });
}

const formRegister = ( request, response ) => {
    response.render( './auth/register', {
        name_page: 'Registro'
    });
}

const userRegisterErrors = ( request, response, errors ) => {
    const { body: { name, email, password, confirm_password } } = request;

    response.render( './auth/register', {
        name_page: 'Registro',
        errors,
        user: { name, email, password, confirm_password }
    });
}

const registerUser = async ( request, response ) => {
    const user = await User.create( request.body );

    response.json( user );
}

const formRecoverPassword = ( request, response ) => {
    response.render( './auth/recover-password', {
        name_page: 'Recuperar contraseña'
    });
}

export {
    formLogin,
    formRegister, userRegisterErrors, registerUser,
    formRecoverPassword
}
import User from '../models/User.js';
import { generateRandomString } from '../helpers/generate.token.js';
import { sendConfirmationEmail } from '../helpers/emails.helper.js';


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
    const { body: { name, email, password } } = request;

    const user = await User.create({ 
        name, 
        email, 
        password, 
        token: generateRandomString()
    });

    // response.json( user );
    sendConfirmationEmail({
        name: user.name,
        email: user.email,
        token: user.token
    });

    response.render( './auth/register-confirmation', {
        name_page: 'Registro Exitoso!',
        message: 'Hemos enviado un e-mail de confirmación, presiona en el enlace.'
    });
}

const formRecoverPassword = ( request, response ) => {
    response.render( './auth/recover-password', {
        name_page: 'Recuperar contraseña'
    });
}

const confirmAccount = ( request, response ) => {
    const { params: { token } } = request;

    console.log( token );
}

export {
    formLogin,
    formRegister, userRegisterErrors, registerUser,
    formRecoverPassword,
    confirmAccount
}
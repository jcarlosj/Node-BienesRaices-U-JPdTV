import User from '../models/User.js';
import { generateRandomString } from '../helpers/generate.token.js';
import { sendConfirmationEmail, sendPasswordChangeConfirmation } from '../helpers/emails.helper.js';

// ! Formulario: Login
const formLogin = ( request, response ) => {
    response.render( './auth/form-login', {
        name_page: 'Login',
        csrf_token: request.csrfToken()
    });
}

// ! Formulario: Login (Errores)
const loginErrors = ( request, response, errors ) => {
    const { body: { email, password } } = request;

    response.render( './auth/form-login', {
        name_page: 'Login',
        csrf_token: request.csrfToken(),
        errors,
        user: { email, password }
    });
}

// ! Formulario: Login exitoso
const signIn = ( request, response ) => {
    
    console.log( 'Usuario logueado... ' );
    response.send( 'Usuario logueado... ' );
}

// ! Formulario: Registro de usuario
const formRegister = ( request, response ) => {
    // console.log( 'CSRF: ', request.csrfToken() );

    response.render( './auth/form-register-user', {
        name_page: 'Registro',
        csrf_token: request.csrfToken()
    });
}

// ! Formulario: Registro de usuario (Errores) 
const userRegisterErrors = ( request, response, errors ) => {
    const { body: { name, email, password, confirm_password } } = request;

    response.render( './auth/form-register-user', {
        name_page: 'Registro',
        csrf_token: request.csrfToken(),
        errors,
        user: { name, email, password, confirm_password }
    });
}

// ! Formulario: Registro de usuario exitoso
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

    response.render( './auth/page-register-confirmation', {
        name_page: 'Registro Exitoso!',
        message: 'Hemos enviado un e-mail de confirmación, presiona en el enlace.'
    });
}

// ! Formulario: Recuperar contraseña
const formRecoverPassword = ( request, response ) => {
    response.render( './auth/form-recover-password', {
        name_page: 'Recuperar contraseña',
        csrf_token: request.csrfToken()
    });
}

// ! Formulario: Recuperar contraseña (Errores)
const resetPasswordErrors = ( request, response, errors ) => {
    const { body: { email } } = request;

    response.render( './auth/form-recover-password', {
        name_page: 'Registro',
        csrf_token: request.csrfToken(),
        errors,
        user: { email }
    });
}

// ! Formulario: Recupera contraseña exitosamente
const resetPassword = async ( request, response ) => {
    const { body: { email }, user } = request;

    console.log( email );
    console.log( user );

     /** Registramos cambios al confirmar la existencia del correo registrado */
    user.token = generateRandomString();
    await user.save();

    // response.json( user );
    sendPasswordChangeConfirmation({
        name: user.name,
        email: user.email,
        token: user.token
    });

    response.render( './auth/page-register-confirmation', {
        name_page: 'Recupera tu contraseña',
        message: 'Hemos enviado un e-mail de confirmación, presiona en el enlace para cambiar tu contraseña.'
    });
}

// ! Formulario: Cambiar contraseña
const formChangePassword = ( request, response ) => {
    const { params: { token } } = request;

    response.render( './auth/form-new-password', {
        name_page: 'Cambiar contraseña',
        csrf_token: request.csrfToken(),
        data: { token }
    });
}

// ! Formulario: Cambiar contraseña (Errores) 
const changePasswordErrors = ( request, response, errors ) => {
    const
        { body: { new_password, confirm_new_password } } = request,
        { params: { token } } = request;

    response.render( './auth/form-new-password', {
        name_page: 'Registro',
        csrf_token: request.csrfToken(),
        errors,
        data: { token, new_password, confirm_new_password }
    });
}

// ! Página: Confirmacion de cambio de contraseña
const changePassword = async ( request, response ) => {
    const { params: { token }, body: { new_password } } = request;

    const user = await User.findOne({
        where: { token }
    });

    /** Registramos cambios al confirmar la existencia del token del usuario */
    user.password = await user.hashPassword( new_password );
    user.token = null;
    await user.save();

    return response.render( './auth/page-confirmation-message', {
        name_page: 'Contraseña reestablecida',
        message: 'Ya puedes ingresar al sistema con tu nueva contraseña.'
    });
}

// ! Página: Confirmacion de cuenta registrada
const confirmAccount = async ( request, response ) => {
    const { locals: { user } } = response;

    /** Registramos cambios al confirmar la valides del token */
    user.token = null;
    user.confirmed = true;
    await user.save();

    return response.render( './auth/page-confirmation-message', {
        name_page: 'Cuenta confirmada',
        message: 'Hemos confirmado tu cuenta correctamente. Ya puedes ingresar al sistema.'
    });
}

export {
    formLogin, loginErrors, signIn,
    formRegister, userRegisterErrors, registerUser,
    formRecoverPassword, resetPasswordErrors, resetPassword,
    confirmAccount,
    formChangePassword, changePasswordErrors, changePassword
}
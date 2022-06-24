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

const registerUser = ( request, response ) => {
    console.log( 'Registrando usuario...' );
    return;
}

const formRecoverPassword = ( request, response ) => {
    response.render( './auth/recover-password', {
        name_page: 'Recuperar contraseña'
    });
}

export {
    formLogin,
    formRegister,
    registerUser,
    formRecoverPassword
}
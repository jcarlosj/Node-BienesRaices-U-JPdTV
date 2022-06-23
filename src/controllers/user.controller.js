const formLogin = ( request, response ) => {
    response.render( './auth/login', {
        name_page: 'Login page'
    });
}

const formRegister = ( request, response ) => {
    response.render( './auth/register', {
        name_page: 'Register page'
    });
}

export {
    formLogin,
    formRegister
}
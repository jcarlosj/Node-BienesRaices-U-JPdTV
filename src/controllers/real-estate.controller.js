const admin = ( request, response ) => {
    response.render( 'real-estate/admin', {
        name_page: 'Mis propiedades',
        isLoggedIn: true
    } );
}

const formCreate = ( request, response ) => {
    response.render( 'real-estate/form-create', {
        name_page: 'Crear propiedad', 
        isLoggedIn: true
    });
}


export {
    admin,
    formCreate
}
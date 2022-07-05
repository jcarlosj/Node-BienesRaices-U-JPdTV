const admin = ( request, response ) => {
    response.render( 'real-estate/admin', {
        name_page: 'Mis propiedades'
    } );
}


export {
    admin
}
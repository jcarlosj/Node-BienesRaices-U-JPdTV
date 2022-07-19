const homePage = ( request, response ) => {
    // TODO: Pagina de inicio
    response.send( 'Home Page' );
}

const categoriesPage = ( request, response ) => {
    // TODO: Pagina de categorias
    response.send( 'Categories Page' );
}

const searchEnginePage = ( request, response ) => {
    // TODO: Pagina Buscador
    response.send( 'Search Page' );
}

const notFoundPage = ( request, response ) => {
    // TODO: Pagina 404
    response.send( 'Not Found Page' );
}


export {
    homePage,
    categoriesPage,
    searchEnginePage,
    notFoundPage
}
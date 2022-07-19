import { Category } from '../models/index.js';


const homePage = async ( request, response ) => {

    const categories = await Category.findAll();

    console.log( categories );

    // TODO: Pagina de inicio
    response.render( 'homePage', {
        name_page: 'Home Page',
        categories
    });
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
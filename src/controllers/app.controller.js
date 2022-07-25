import { RealEstate, Category, Price } from '../models/index.js';


const homePage = async ( request, response ) => {

        // ! Obtenemos los datos de la BD para desplegar en los elementos select del formulario
    const [ categories, prices, houses, apartments ] = await Promise.all([
        Category.findAll({ raw: true }),
        Price.findAll({ raw: true }),
        RealEstate.findAll({
            limit: 3,                   // ? Solo 3 registros
            where: {
                category_id: 1,         // ? Casas
            },
            include: [
                {   model: Price }      // ? Unir resultados con la tabla precios
            ],
            order: [
                [ 'createdAt', 'DESC' ] // ? Las ultimas creadas
            ]
        }),
        RealEstate.findAll({
            limit: 3,                   // ? Solo 3 registros
            where: {
                category_id: 2,         // ? Apartamentos
            },
            include: [
                {   model: Price }      // ? Unir resultados con la tabla precios
            ],
            order: [
                [ 'createdAt', 'DESC' ] // ? Las ultimas creadas
            ]
        })
    ]);

    // console.log( categories, prices );

    // TODO: Pagina de inicio
    response.render( 'homePage', {
        name_page: 'Home Page',
        categories,
        prices,
        houses,
        apartments
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
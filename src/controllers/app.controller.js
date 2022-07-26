import { Sequelize } from 'sequelize';

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

    response.render( 'homePage', {
        name_page: 'Home Page',
        csrf_token: request.csrfToken(),
        categories,
        prices,
        houses,
        apartments
    });
}

const categoriesPage = async ( request, response ) => {
    const
        { params: { id } } = request,
        { locals: { category_name } } = response;

    const [ categories, realestate ] = await Promise.all([
        Category.findAll({ raw: true }),
        RealEstate.findAll({
            where: {
                category_id: id
            },
            include: [
                { model: Price }
            ]
        })
    ]);

    response.render( 'categoryPage', {
        name_page: `${ category_name } en venta`,
        csrf_token: request.csrfToken(),
        realestate,
        categories
    });
}

const searchEnginePage = async ( request, response ) => {
    const { body: { term } } = request;

    console.log( term );

    // ! Validamos que el termino no venga vacio
    if( ! term.trim() )
        return response.redirect( 'back' );

    const [ categories, realestate ] = await Promise.all([
        Category.findAll({ raw: true }),
        RealEstate.findAll({
            where: {
                ad_title: {
                    [Sequelize.Op.like]: '%' + term + '%'
                }
            },
            include: [
                { model: Price }
            ]
        })
    ]);

    // console.log( realestate );

    response.render( 'searchPage', {
        name_page: 'Resultados de la búsqueda',
        csrf_token: request.csrfToken(),
        categories,
        realestate
    });
}

const notFoundPage = async ( request, response ) => {
    const categories = await Category.findAll({ raw: true });

    response.render( '404Page', {
        name_page: 'Página no encontrada',
        csrf_token: request.csrfToken(),
        categories
    });
}


export {
    homePage,
    categoriesPage,
    searchEnginePage,
    notFoundPage
}
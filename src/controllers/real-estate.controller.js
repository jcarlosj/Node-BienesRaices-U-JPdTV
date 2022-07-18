import { unlink } from 'node:fs/promises';

import { Category, Price, RealEstate } from '../models/index.js';


// ********* CONTROLLERS DE ACCESO PRIVADO *********

// ! Pagina de administracion de propiedades
const admin = async ( request, response ) => {
    const { 
            user: { id: user_id },
            query: { page: currentPage }
        } = request;

    const regexp = /^[1-9]$/

    if( ! regexp.test( currentPage ) ) {
        response.redirect( '/real-estate?page=1' );
    }

    // Limites y Offset (Paginador)
    const
        limit = 5,
        offset = ( currentPage * limit ) - limit;

    console.log( currentPage );

    try {
        const [ realestate, total ] = await Promise.all([
            RealEstate.findAll({
                limit,
                offset,
                where: {
                    user_id
                },
                include: [
                    { model: Category, as: 'category' },        // ? Equivale a un join entre tablas relacionadas
                    { model: Price }                            // ? Equivale a un join entre tablas relacionadas
                ]
            }),
            RealEstate.count({
                where: {
                    user_id
                }
            })
        ]);

        response.render( 'real-estate/admin', {
            name_page: 'Mis propiedades',
            csrf_token: request.csrfToken(),
            realestate,
            pages: Math.ceil( total / limit ),
            currentPage: Number( currentPage ),
            total,
            limit,
            offset
        });

    }
    catch( error ) {
        console.log( error );
    }
    
}

// ! Formulario: Agregar propiedad
const formCreate = async ( request, response ) => {

    // ! Obtenemos los datos de la BD para desplegar en los elementos select del formulario
    const [ categories, prices ] = await Promise.all([
        Category.findAll(),
        Price.findAll()
    ]);

    response.render( 'real-estate/form-create', {
        name_page: 'Crear propiedad', 
        csrf_token: request.csrfToken(),
        data: {},
        categories,
        prices
    });
}

// ! Formulario: Registro de propiedad (Errores) 
const formCreateWithErrors = async ( request, response, errors ) => {

    console.log( '***', request.body );

    // ! Obtenemos los datos de la BD para desplegar en los elementos select del formulario
    const [ categories, prices ] = await Promise.all([
        Category.findAll(),
        Price.findAll()
    ]);

    response.render( 'real-estate/form-create', {
        name_page: 'Registro de la propiedad',
        csrf_token: request.csrfToken(),
        errors,
        data: request.body,
        categories,
        prices
    });
}

// ! Formulario: Registro de propiedad exitoso
const registerRealestate = async ( request, response ) => {
    
    const { 
        body: {
            ad_title,
            description,
            bedrooms,
            parking_lot,
            wc,
            street_name,
            lat,
            lng,
            category: category_id,
            price: price_id
        },
        user: { id: user_id }
    } =  request;
    
    try {
        const newRealestate = await RealEstate.create({
            ad_title,
            description,
            bedrooms,
            parking_lot,
            wc,
            street_name,
            lat,
            lng,
            image: '',      // TODO: Registrar imagen de la propiedad
            category_id,    // ? Se obtiene del Select del Formulario
            price_id,       // ? Se obtiene del Select del Formulario
            user_id         // ? Se obtiene request asignado en el Middleware
        });

        console.log( 'Propiedad registrada', newRealestate );

        const { id } = newRealestate;

        response.redirect( `/real-estate/add-image/${ id }` );
    }
    catch( err ) {
        console.log( err );
    }

}

// ! Formulario (Dropzone): Agregar imagen a la propiedad
const addRealestateImage = async ( request, response ) => {
    const { realestate } = request;

    console.log( realestate );

    response.render( 'real-estate/form-add-image', {
        name_page: `Agregar imagen: ${ realestate.ad_title }`,
        csrf_token: request.csrfToken(),
        realestate
    });
}

// ! Guarda el archivo en disco
const saveImage = async ( request, response, next ) => {

    const { realestate, file: { filename } } = request;

    try {
        realestate.image = filename;
        realestate.published = 1;

        console.log( 'Subio imagen: ', filename );

        await realestate.save();

        // response.redirect( '/real/estate' );     // ? Esta redireccion ya no va a estar operativa pues se le ha pasado todo el control a Dropzone en el FrontEnd
        next();                                     // ? A la espera de la redireccion del FrontEnd para finalizar el controlador
    }
    catch( error ) {
        console.error( error );
    }

}

// ! Formulario: Editar propiedad
const formEdit = async ( request, response ) => {

    const { realestate } = request;

    console.log( realestate );

    // ! Obtenemos los datos de la BD para desplegar en los elementos select del formulario
    const [ categories, prices ] = await Promise.all([
        Category.findAll(),
        Price.findAll()
    ]);

    response.render( 'real-estate/form-edit', {
        name_page: `Editar propiedad: ${ realestate.ad_title }`, 
        csrf_token: request.csrfToken(),
        data: realestate,
        categories,
        prices
    });

}

// ! Formulario: Editar de propiedad (Errores) 
const formEditWithErrors = async ( request, response, errors ) => {

    const { body: { category, price } } = request;
    // console.log( '***', request.body );
    console.log( category, price );

    // ! Obtenemos los datos de la BD para desplegar en los elementos select del formulario
    const [ categories, prices ] = await Promise.all([
        Category.findAll(),
        Price.findAll()
    ]);

    response.render( 'real-estate/form-edit', {
        name_page: `Editar propiedad`,
        csrf_token: request.csrfToken(),
        errors,
        data: request.body,
        categories,
        prices
    });
}

// ! Formulario: Actualizacion de propiedad exitoso
const registerChanges = async ( request, response ) => {

    const { 
        realestate,
        body: {
            ad_title,
            description,
            bedrooms,
            parking_lot,
            wc,
            street_name,
            lat,
            lng,
            category: category_id,
            price: price_id
        }
    } = request;
    
    try {
        // ! Tomamos la entidad y actualizamos los datos usando la propiedad set de Sequelize
        realestate.set({
            ad_title,
            description,
            bedrooms,
            parking_lot,
            wc,
            street_name,
            lat,
            lng,
            category_id,
            price_id
        });

        await realestate.save();                // ? Guarda los cambios realizados en la base de datos
        response.redirect( '/real-estate' );    // ? Redireccionamos
    }
    catch( error ) {
        console.error( error );
    }
    
}

// ! Formulario: Eliminar de propiedad
const deteleRegister = async ( request, response ) => {
    const { realestate } = request;

    const message = `Elimina: ${ realestate.ad_title } y el archivo de imagen ${ realestate.image }`;

    // ! Elimina imagen asociada a la propiedad y datos de la misma en la base de datos
    await unlink( `public/uploads/${ realestate.image }` );     // ? unlink: Se utiliza para eliminar un archivo o enlace simbólico del sistema de archivos
    await realestate.destroy();
    console.log( message );

    response.redirect( '/real-estate' );
}

// ********* CONTROLLERS DE ACCESO PUBLICO *********
const showRealestate = async ( request, response ) => {
    const { realestate } = request;


    response.render( 'real-estate/public/show', {
        name_page: realestate.ad_title,
        realestate
    });
}


export {
    admin,
    formCreate, formCreateWithErrors, registerRealestate,
    addRealestateImage, saveImage, registerChanges, 
    formEdit, formEditWithErrors, 
    deteleRegister,
    showRealestate
}
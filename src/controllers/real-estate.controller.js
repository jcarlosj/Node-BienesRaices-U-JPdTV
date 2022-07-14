import { Category, Price, RealEstate } from '../models/index.js';

// ! Pagina de administracion de propiedades
const admin = async ( request, response ) => {
    const { user: { id: user_id } } = request;

    const realestate = await RealEstate.findAll({
        where: {
            user_id
        },
        include: [
            { model: Category, as: 'category' },        // ? Equivale a un join entre tablas relacionadas
            { model: Price }                            // ? Equivale a un join entre tablas relacionadas
        ]
    });


    response.render( 'real-estate/admin', {
        name_page: 'Mis propiedades',
        realestate
    } );
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

const registerChanges = async ( request, response ) => {

    console.log( request.body ); 

    response.send( 'Guardando cambios...' );
}

export {
    admin,
    formCreate, formCreateWithErrors, registerRealestate,
    addRealestateImage, saveImage, registerChanges, 
    formEdit, formEditWithErrors
}
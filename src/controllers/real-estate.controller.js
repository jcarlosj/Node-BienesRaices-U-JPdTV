import { Category, Price, RealEstate } from '../models/index.js';


const admin = ( request, response ) => {
    response.render( 'real-estate/admin', {
        name_page: 'Mis propiedades'
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
    const { params: { id }, user } = request;

    // ! Verifica que la propiedad exista
    const found_realestate = await RealEstate.findByPk( id );

    // ! Si no existe redirecciona
    if( ! found_realestate )
        return response.redirect( '/real-estate' );

    // ! Si esta publicada redirecciona
    if( found_realestate.published )
        return response.redirect( '/real-estate' );

    // ! Si la publicacion no le pertenece al mismo usuario logueado redirecciona
    if( found_realestate.user_id !== user.id )
        return response.redirect( '/real-estate' );

    response.render( 'real-estate/form-add-image', {
        name_page: `Agregar imagen: ${ found_realestate.ad_title }`,
        csrf_token: request.csrfToken(),
        realestate: found_realestate
    });
}

// ! Guarda el archivo en disco
const saveImage = async ( request, response, next ) => {

    const { params: { id }, user, file: { filename } } = request;

    // ! Verifica que la propiedad exista
    const found_realestate = await RealEstate.findByPk( id );

    // ! Si no existe redirecciona
    if( ! found_realestate )
        return response.redirect( '/real-estate' );

    // ! Si esta publicada redirecciona
    if( found_realestate.published )
        return response.redirect( '/real-estate' );

    // ! Si la publicacion no le pertenece al mismo usuario logueado redirecciona
    if( found_realestate.user_id !== user.id )
        return response.redirect( '/real-estate' );

    try {
        found_realestate.image = filename;
        found_realestate.published = 1;

        console.log( 'Subio imagen: ', filename );

        await found_realestate.save();

        // response.redirect( '/real/estate' );     // ? Esta redireccion ya no va a estar operativa pues se le ha pasado todo el control a Dropzone en el FrontEnd
        next();                                     // ? A la espera de la redireccion del FrontEnd para finalizar el controlador
    }
    catch( error ) {
        console.error( error );
    }

}

export {
    admin,
    formCreate, formCreateWithErrors, registerRealestate,
    addRealestateImage, saveImage
}
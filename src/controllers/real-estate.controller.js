import { Category, Price } from '../models/index.js';


const admin = ( request, response ) => {
    response.render( 'real-estate/admin', {
        name_page: 'Mis propiedades',
        isLoggedIn: true
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
        isLoggedIn: true,
        categories,
        prices
    });
}

// ! Formulario: Registro de propiedad (Errores) 
const formCreateWithErrors = async ( request, response, errors ) => {
    const { body: { title, description, category, price, bedrooms, parking_lot, wc, street_name, lat, log } } = request;

        // ! Obtenemos los datos de la BD para desplegar en los elementos select del formulario
        const [ categories, prices ] = await Promise.all([
            Category.findAll(),
            Price.findAll()
        ]);

    response.render( 'real-estate/form-create', {
        name_page: 'Registro de la propiedad',
        csrf_token: request.csrfToken(),
        errors,
        realestate: { title, description, category, price, bedrooms, parking_lot, wc, street_name, lat, log },
        isLoggedIn: true,
        categories,
        prices
    });
}

// ! Formulario: Registro de propiedad exitoso
const registerRealestate = () => {
    console.log( 'Propiedad registrada exitosamente' );
}

export {
    admin,
    formCreate, formCreateWithErrors, registerRealestate
}
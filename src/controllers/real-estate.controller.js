import { Category, Price, RealEstate } from '../models/index.js';


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
        data: {},
        isLoggedIn: true,
        categories,
        prices
    });
}

// ! Formulario: Registro de propiedad (Errores) 
const formCreateWithErrors = async ( request, response, errors ) => {

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
        isLoggedIn: true,
        categories,
        prices
    });
}

// ! Formulario: Registro de propiedad exitoso
const registerRealestate = ( request, response ) => {
    
    console.log( 'Propiedad registrada exitosamente' );
}

export {
    admin,
    formCreate, formCreateWithErrors, registerRealestate
}
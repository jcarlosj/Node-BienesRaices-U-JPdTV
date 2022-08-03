import { RealEstate, Category, Price, Message, User } from '../models/index.js';


// ********* ACCESO PRIVADO *********
// ! Verifica si el usuario autenticado puede hacer cambios sobre una propiedad
const canMakeChanges = async ( request, response, next ) => {
    const {
        params: { id }, 
        user: { id: user_id } 
    } = request;

    // ! Verifica que la propiedad exista
    const found_realestate = await RealEstate.findByPk( id, {
        include: [
            { model: Message,           // ? Puebla los mensajes de la propiedad
                include: [              // ? Realiza un join para obtener el nombre del user_id de la entidad Message
                    { model: User, 
                        attributes: {   
                            exclude: [ 'password', 'token', 'confirmed', 'updatedAt' ]     // ? Excluya los datos de los campos incluidos en el array
                        }
                    }
                ]
            }
        ]
    });

    // ! Si no existe
    if( ! found_realestate )
        return response.redirect( '/real-estate' );

    // ! Si la publicacion no le pertenece al mismo usuario logueado
    if( found_realestate.user_id !== user_id )
        return response.redirect( '/real-estate' );

    request.realestate = found_realestate;
    next();
}

// ! Verifica si el usuario autenticado puede registrar propiedad
const canRegister = async ( request, response, next ) => {
    const {
        params: { id }, 
        user: { id: user_id } 
    } = request;

    // ! Verifica que la propiedad exista
    const found_realestate = await RealEstate.findByPk( id );

    // ! Si no existe
    if( ! found_realestate )
        return response.redirect( '/real-estate' );

    // ! Si esta publicada
    if( found_realestate.published )
        return response.redirect( '/real-estate' );

    // ! Si la publicacion no le pertenece al mismo usuario logueado
    if( found_realestate.user_id !== user_id )
        return response.redirect( '/real-estate' );

    request.realestate = found_realestate;
    next();
}


// ********* ACCESO PUBLICO *********
// ! Verifica si existe la  propiedad para mostrarla
const canShow = async ( request, response, next ) => {
    const { params: { id } } = request;

    // ! Verifica que la propiedad exista
    const found_realestate = await RealEstate.findByPk( id, {
        include: [
            { model: Category, as: 'category' },        // ? Equivale a un join entre tablas relacionadas
            { model: Price }                            // ? Equivale a un join entre tablas relacionadas
        ]
    });

    // ! Si no existe
    if( ! found_realestate )
        return response.redirect( '/404' );

    request.realestate = found_realestate;
    next();
}


export {
    canMakeChanges,
    canRegister,
    canShow
}
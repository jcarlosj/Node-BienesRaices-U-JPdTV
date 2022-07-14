import RealEstate from '../models/RealEstate.js';


// ! Verifica si el usuario autenticado puede hacer cambios sobre una propiedad
const canMakeChanges = async ( request, response, next ) => {
    const {
        params: { id }, 
        user: { id: user_id } 
    } = request;

    // ! Verifica que la propiedad exista
    const found_realestate = await RealEstate.findByPk( id );

    // ! Si no existe
    if( ! found_realestate )
        return response.redirect( '/real-estate' );

    // ! Si la publicacion no le pertenece al mismo usuario logueado
    if( found_realestate.user_id !== user_id )
        return response.redirect( '/real-estate' );

    request.realestate = found_realestate;
    next();
}


export {
    canMakeChanges
}
import { Category } from '../models/index.js';


const isValidCategory = async ( request, response, next ) => {
    const { params: { id } } = request;

    const found_category = await Category.findByPk( id );

    if( ! found_category )
        return response.redirect( '/404' );

    response.locals.category_name = found_category.name;
    next();
}


export {
    isValidCategory
}
import { RealEstate, Category, Price } from '../models/index.js';


const getAllRealestate = async ( request, response ) => {
    const realestate = await RealEstate.findAll({
        limit: 20,
        include: [
            { model: Category },
            { model: Price }
        ]
    });

    response.json({
        realestate,
        total: realestate.length
    });
}


export {
    getAllRealestate
} 
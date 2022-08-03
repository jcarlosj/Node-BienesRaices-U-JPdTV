import User from './User.js';
import RealEstate from './RealEstate.js';
import Category from './Category.js'; 
import Price from './Price.js';
import Message from './Message.js';


// ! Relationship between 1 a 1 (RealEstate & User): 
// *    FORMA 1: Leerla de derecha a izquierda (FK queda en la entidad de la derecha)
// User.hasOne( RealEstate );       // ? FK (default): <table-name>Id -> categoryId sobre RealEstate

// User.hasOne( RealEstate, {
//     foreignKey: 'user_id',       // ? Establece nombre de la columna FK (RealEstate)
//     sourceKey: 'id'                  // ? Indica el nombre de la columna PK de la entidad o tabla con la que se relaciona (User)
// });

// *     FORMA 2: Leerla de izquierda a derecha (FK queda en la entidad de la izquierda)
// RealEstate.belongsTo( User );    // ? FK (default): <table-name>Id -> priceId sobre RealEstate

RealEstate.belongsTo( User, {
    foreignKey: 'user_id',          // ? Establece nombre de la columna FK (RealEstate)
    sourceKey: 'id'                     // ? Indica el nombre de la columna PK de la entidad o tabla con la que se relaciona (User)
}); 


// ! Relationship between 1 a 1 (RealEstate & Category): 
// *    FORMA 1: Leerla de derecha a izquierda (FK queda en la entidad de la derecha)
// Category.hasOne( RealEstate );       // ? FK (default): <table-name>Id -> categoryId sobre RealEstate

// Category.hasOne( RealEstate, {
//     foreignKey: 'category_id',       // ? Establece nombre de la columna FK (RealEstate)
//     sourceKey: 'id'                  // ? Indica el nombre de la columna PK de la entidad o tabla con la que se relaciona (Category)
// });

// *     FORMA 2: Leerla de izquierda a derecha (FK queda en la entidad de la izquierda)
// RealEstate.belongsTo( Category );    // ? FK (default): <table-name>Id -> priceId sobre RealEstate

RealEstate.belongsTo( Category, {
    foreignKey: 'category_id',          // ? Establece nombre de la columna FK (RealEstate)
    sourceKey: 'id'                     // ? Indica el nombre de la columna PK de la entidad o tabla con la que se relaciona (Category)
});


// ! Relationship between 1 a 1 (RealEstate & Price): 
// *    FORMA 1: Leerla de derecha a izquierda (FK queda en la entidad de la derecha)
// Price.hasOne( RealEstate );          // ? FK (default): <table-name>Id -> priceId sobre RealEstate

// Price.hasOne( RealEstate, {
//     foreignKey: 'price_id',          // ? Establece nombre de la columna FK (RealEstate)
//     sourceKey: 'id'                  // ? Indica el nombre de la columna PK de la entidad o tabla con la que se relaciona (Price)
// });

// *    FORMA 2: Leerla de izquierda a derecha (FK queda en la entidad de la izquierda)
// RealEstate.belongsTo( Price );       // ? FK (default): <table-name>Id -> priceId sobre RealEstate

RealEstate.belongsTo( Price, {
    foreignKey: 'price_id',             // ? Establece nombre de la columna FK (RealEstate)
    sourceKey: 'id'                     // ? Indica el nombre de la columna PK de la entidad o tabla con la que se relaciona (Price)
});
// Una propiedad tiene multiples mensajes (1 a N)
RealEstate.hasMany( Message, {
    foreignKey: 'realestate_id'         // ? Establece nombre de la columna FK (RealEstate)
});


Message.belongsTo( User, {
    foreignKey: 'user_id', // ? Establece nombre de la columna FK (User)
});
Message.belongsTo( RealEstate, {
    foreignKey: 'realestate_id',    // ? Establece nombre de la columna FK (RealEstate)
});


export {
    User,
    RealEstate,
    Category,
    Price,
    Message
}
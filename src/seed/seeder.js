import { exit } from 'node:process';

import db from '../config/sequelize.js';

import Category from '../models/Category.js';
import Price from '../models/Price.js';

import categories from './categories.js';
import prices from './prices.js';


// ! Inserta Categorias establecidas por defecto
const categorySeeder = async () => {
    try {
        await db.authenticate();                    // ? Autenticacion Sequelize (Inicia la conexion con la BD)
        await db.sync();                            // ? Establese una sincronizacion (Genera la estructura de datos)
        await Category.bulkCreate( categories );    // ? Inserta los datos

        console.log( 'Categorias sembradas correctamente!' );

        exit();                                     // ? Finaliza proceso exitosamente
    }
    catch( error ) {
        console.log( error );
        exit( 1 );              // ? Finaliza proceso al ocurrir un error
    }
}

// ! Inserta Precios establecidos por defecto
const priceSeeder = async () => {
    try {
        await db.authenticate();                    // ? Autenticacion Sequelize (Inicia la conexion con la BD)
        await db.sync();                            // ? Establese una sincronizacion (Genera la estructura de datos)
        await Price.bulkCreate( prices );           // ? Inserta los datos

        console.log( 'Precios sembradas correctamente!' );

        exit();                                     // ? Finaliza proceso exitosamente
    }
    catch( error ) {
        console.log( error );
        exit( 1 );              // ? Finaliza proceso al ocurrir un error
    }
}


// ! Comando definido en el script db:seed [ 'node', ' ./src/seed/seeder.js', '-i' ] en el package.json
if( process.argv[ 2 ] === '-i' ) {
    categorySeeder();
    priceSeeder();
}
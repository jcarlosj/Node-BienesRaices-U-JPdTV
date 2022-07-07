import { exit } from 'node:process';

import db from '../config/sequelize.js';

import Category from '../models/Category.js';
import Price from '../models/Price.js';

import categories from './categories.js';
import prices from './prices.js';


// ! Inserta semillas de datos en la base de datos
const dataSeeder = async () => {
    try {
        await db.authenticate();                    // ? Autenticacion Sequelize (Inicia la conexion con la BD)
        await db.sync();                            // ? Establese una sincronizacion (Genera la estructura de datos)

        await Promise.all([                            // ? Inserta los datos
            Category.bulkCreate( categories ),      // ! Inserta Categorias establecidas por defecto
            Price.bulkCreate( prices )              // ! Inserta Precios establecidos por defecto
        ]);

        console.log( 'Datos sembrados correctamente!' );

        exit();                                     // ? Finaliza proceso exitosamente
    }
    catch( error ) {
        console.log( error );
        exit( 1 );              // ? Finaliza proceso al ocurrir un error
    }
}


// ! Comando definido en el script db:seed [ 'node', ' ./src/seed/seeder.js', '-i' ] en el package.json
if( process.argv[ 2 ] === '-i' ) {
    dataSeeder();
}
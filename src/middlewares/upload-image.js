import multer from 'multer';
import path from 'path';

import { generateRandomString } from '../helpers/token.helper.js';


const storage = multer.diskStorage({
    destination: function( req, file, cb ) {
        // ! cb: Este Callback se invoca cuando las operaciones se han realizado exitosamente
        cb(
            null,               /** Mensaje de Error */
            './public/uploads'  /** Directorio donde se van a guardar las imagenes (uploads no se crea automaticamente lo que puede ser problematico) */
        );
    },
    filename: function( req, file, cb ) {
        // console.log( req );

        // ! cb: Este Callback se invoca cuando las operaciones se han realizado exitosamente
        cb(
            null,               /** Mensaje de Error */
            generateRandomString() + path.extname( file.originalname )  /** Nombre del archivo */
        );
    }
});

const upload = multer({ storage });


export default upload;
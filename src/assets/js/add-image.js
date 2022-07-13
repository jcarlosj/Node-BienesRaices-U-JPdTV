import { Dropzone } from 'dropzone';

const token = document.querySelector( 'meta[name="csrf-token"]' ).getAttribute( 'content' );  // ? Obtiene el token del meta en la cabecera

console.log( 'CSRF-Token:', token );

// ! Configuracion de Dropzone
Dropzone.options.realestateImage = {
    dictDefaultMessage: 'Arrastra tus imagenes aquí',       /** ? Cambia mensaje por defecto de formulario  */
    acceptedFiles: '.png, .jpg, .jpeg',                     /** ? Extensiones aceptadas en este formulario  */
    maxFilesize: 5,                                         /** ? Número máximo de MB permitidos  */
    maxFiles: 1,                                            /** ? Número máximo de archivos permitidos  */
    parallelUploads: 1,                                     /** ? Habilita la cantidad de subidas paralelas que se van a permitir (generalmente puede ser el mismo # de archivos permitidos, siempre que no sean muchos)  */
    autoProcessQueue: true,                                 /** ? Por defecto los archivos suben automaticamente, esto cancela esta opción.  */
    addRemoveLinks: true,                                   /** ? Habilita enlace para eliminar archivos agregados  */
    dictRemoveFile: 'Quitar archivo',                       /** ? Cambia mensaje por defecto de la propiedad 'addRemoveLinks'  */
    dictMaxFilesExceeded: 'No puedes subir más archivos.',  /** ? Cambia mensaje de error por defecto de la propiedad 'maxFiles'  */
    dictCancelUpload: 'Cancelar carga',                     /** ? Cambia mensaje enlace 'upload cancel'  */
    headers: {                                              /** ? Las cabeceras se envian primero antes de enviar cualquier dato antes (al recargar la pagina)  */
        'CSRF-Token': token
    }
};
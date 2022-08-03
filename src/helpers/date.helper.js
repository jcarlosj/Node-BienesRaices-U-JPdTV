const formatDate = date => {
    const
        stringDate = new Date( date ).toISOString().slice( 0, 10 ),     // ? Convierte un objeto fecha a un string y toma solo la porcion que involucra anio-mes-dia
        options = {             // ? Opciones de configuracion para el metodo toLocateDateString
            year: 'numeric',
            month: 'long',
            weekday: 'long',
            day: 'numeric'
        };

    // console.log( date, stringDate );

    return new Date( stringDate ).toLocaleDateString( 'es-ES', options );   // ? Convertimos a formato fecha para acceder a los metodos del Objeto Date
}


export {
    formatDate
}
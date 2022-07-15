// IIFE (Immediately Invoked Function Expression).
( function() {
    const
        elCoords = document.querySelector( '#coords' ),
        coords = [ elCoords.dataset.lat, elCoords.dataset.lng ],
        street_name = elCoords.textContent,
        zoom = 15;

    const
        mapa = L.map( 'map' ).setView( coords, zoom ),       // ? Instancia del mapa en el ID #map en el FrontEnd con la informacion requerida
        geocodeService = L.esri.Geocoding.geocodeService();   // ? Provider & Geocoding

    // ! Creditos, sin ellos no funciona la libreria
    L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo( mapa );

    // ! Posiciona el Pin sobre el mapa
    let marker = L.marker( coords, {       // ? Crea el pin sobre las coordenadas establecidas aqui
        draggable: false,                        // ? Permite que el pin pueda moverse sobre el mapa
        autoPan: true                            // ? Permite que se mueva el panel del mapa junto con el pin
    }).addTo( mapa )                             // ? Asignamos el mapa sobre el que se desplegará el pin
    .bindPopup( `Ubicación: \n ${ street_name }` );  // ? Popup al pin con un mensaje


} )();
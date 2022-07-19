( function(){
    const
        lat = 4.7101416,
        lng = -74.0720851,
        zoom = 15;

    const
        mapa = L.map( 'home-map' ).setView([ lat, lng ], zoom ),       // ? Instancia del mapa en el ID #map en el FrontEnd con la informacion requerida
        geocodeService = L.esri.Geocoding.geocodeService();   // ? Provider & Geocoding

    // ! Creditos, sin ellos no funciona la libreria
    L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo( mapa );
})();
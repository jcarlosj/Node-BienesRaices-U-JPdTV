( function() {
    const lat = 4.7101416;
    const lng = -74.0720851;
    const mapa = L.map( 'map' ).setView([ lat, lng ], 16 );
    

    L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo( mapa );

})();
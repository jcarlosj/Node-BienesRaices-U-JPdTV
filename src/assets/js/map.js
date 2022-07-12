( function() {
    const
        lat = document.querySelector( '#lat ').value || 4.7101416,
        lng = document.querySelector( '#lng ').value || -74.0720851,
        zoom = 15;

    const
        mapa = L.map( 'map' ).setView([ lat, lng ], zoom ),       // ? Instancia del mapa en el ID #map en el FrontEnd con la informacion requerida
        geocodeService = L.esri.Geocoding.geocodeService();   // ? Provider & Geocoding

    // ! Creditos, sin ellos no funciona la libreria
    L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo( mapa );

    // ! Posiciona el Pin sobre el mapa
    let marker = L.marker([ lat, lng ], {       // ? Crea el pin sobre las coordenadas establecidas aqui
            draggable: true,                        // ? Permite que el pin pueda moverse sobre el mapa
            autoPan: true                           // ? Permite que se mueva el panel del mapa junto con el pin
        }).addTo( mapa )                            // ? Asignamos el mapa sobre el que se desplegará el pin
        .bindPopup( "Ubicación de tu propiedad" );  // ? Popup al pin con un mensaje

    // ! Detectamos el movimiento del Pin sobre el mapa
    marker.on( 'moveend', function( event ){
        marker = event.target;                                  // ? Obtenemos el marker al finalizar el movimiento

        const coords = marker.getLatLng();                      // ? Obtenemos las coordenadas del marker
        console.log( coords );

        mapa.panTo( new L.LatLng( coords.lat, coords.lng ) );     // ? Centra el mapa a las nuevas coordenadas

        // ! Obtenemos informacion detallada de las coordenadas (como puede ser el nombre de la calle)
        geocodeService.reverse().latlng( coords, zoom ).run( function( err, result ){
            if( err ) {
                console.log( err );
                return;
            }

            marker.bindPopup( `Ubicación: \n ${ result.address.LongLabel }` );  // ? Popup al pin con un mensaje
            console.log( result );

            document.querySelector( '.street-name' ).textContent = result?.address?.Address ?? '';
            document.querySelector( '#street-name' ).value = result?.address?.Address ?? '';
            document.querySelector( '#lat' ).value = result?.latlng?.lat ?? '';
            document.querySelector( '#lng' ).value = result?.latlng?.lng ?? '';
        });
    });

})();
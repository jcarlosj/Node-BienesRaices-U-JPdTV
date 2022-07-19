( function(){
    const
        lat = 4.7101416,
        lng = -74.0720851,
        zoom = 13;

    const
        mapa = L.map( 'home-map' ).setView([ lat, lng ], zoom ),       // ? Instancia del mapa en el ID #map en el FrontEnd con la informacion requerida
        geocodeService = L.esri.Geocoding.geocodeService();   // ? Provider & Geocoding

    // ! Creditos, sin ellos no funciona la libreria
    L.tileLayer( 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo( mapa );

    // ! Definimos un grupo de markers
    let markers = new L.FeatureGroup().addTo( mapa );

    // ! Obtiene las propiedades a traves del API
    const getAllRealestateAPI = async () => {
        const url = '/api/realestate';

        try {
            const
                response = await fetch( url ),
                data = await response.json();

            // console.log( data );
            showPinRealestate( data.realestate )
        } 
        catch( error ) {
            console.error( error );
        }
    }

    getAllRealestateAPI();

    const showPinRealestate = ( data ) => {

        console.log( data );

        data.forEach( realestate => {

            // ! Posiciona el Pin sobre el mapa
            let marker = new L.marker([ realestate?.lat, realestate?.lng ], {       // ? Crea el pin sobre las coordenadas establecidas aqui
                draggable: false,                        // ? Permite que el pin pueda moverse sobre el mapa
                autoPan: true                            // ? Permite que se mueva el panel del mapa junto con el pin
            })
            .addTo( mapa )                            // ? Asignamos el mapa sobre el que se desplegará el pin
            .bindPopup( `
                <div class="flex justify-center items-center h-screen bg-blue-lightest">
                    <div id="app" class="bg-white w-128 h-60 flex card text-grey-darkest">
                        <img style="width: 90px; object-fit: cover;" class="w-1/2" src="/uploads/${ realestate?.image }" alt="Miniatura: ${ realestate.ad_title }">
                        <div class="w-full flex flex-col">
                            <div class="p-2 pb-0 flex-1">
                                <h3 class="font-bold mb-1 text-grey-darkest">${ realestate?.ad_title }</h3>
                                <div class="text-xs flex items-center mb-4">
                                    <i class="fas fa-map-marker-alt mr-1 text-grey-dark"></i>
                                    ${ realestate?.category?.name }
                                </div>
                                <span class="text-5xl text-grey-darkest">${ realestate?.price?.range }<span class="text-lg"></span></span>
                                <div class="flex items-center mt-4">
                                    <div class="pr-2 text-xs">
                                        <a href="/real-estate/${ realestate?.id }">ver más</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ` );  // ? Popup al pin con un mensaje

            markers.addLayer( marker );     // ? Permitira en el futuro aplicar filtros a los pines que se muestran en el mapa
        });

    }


})();


( function() {
    const
        allButtons = document.querySelectorAll( '.change-state' ),
        token = document.querySelector( 'meta[name="csrf-token"]' ).getAttribute( 'content' );

    allButtons.forEach( button => {
        button.addEventListener( 'click', changePostStatus );
    });

    async function changePostStatus ( event ) {
        const
            { target: { dataset: { propertyId } } } = event,
            url = `/real-estate/${ propertyId }`;

        // console.log( propertyId );

        try {
            const
                response = await fetch( url, {
                    method: 'PUT',
                    headers: {
                        'CSRF-Token': token
                    }
                }),
                data = await response.json();

            // console.log( data );
            if( data ) {
                if( event.target.classList.contains( 'bg-yellow-100' ) ) {
                    event.target.classList.remove( 'bg-yellow-100', 'text-yellow-800' );
                    event.target.classList.add( 'bg-green-100', 'text-green-800' );
                    event.target.textContent = 'Publicado';
                }
                else {
                    event.target.classList.remove( 'bg-green-100', 'text-green-800' );
                    event.target.classList.add( 'bg-yellow-100', 'text-yellow-800' );
                    event.target.textContent = 'No publicado';
                }
            }

        } 
        catch( error ) {
            console.error( error );
        }

    }

})();
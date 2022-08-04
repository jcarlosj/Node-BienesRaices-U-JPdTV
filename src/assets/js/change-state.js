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

        console.log( propertyId );

        try {
            const response = await fetch( url, {
                method: 'PUT',
                headers: {
                    'CSRF-Token': token
                }
            });

            console.log( response );
        } 
        catch( error ) {
            console.error( error );
        }

    }

})();
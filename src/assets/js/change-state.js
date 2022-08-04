( function() {
    const allButtons = document.querySelectorAll( '.change-state' );

    allButtons.forEach( button => {
        button.addEventListener( 'click', changePostStatus );
    });

    async function changePostStatus ( event ) {
        const
            { target: { dataset: { propertyId } } } = event,
            url = `/real-estate/${ propertyId }`;

        // console.log( propertyId );

        try {
            const response = await fetch( url, {
                method: 'PUT'
            });

            console.log( response );
        } 
        catch( error ) {
            console.error( error );
        }

    }

})();
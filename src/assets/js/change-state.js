( function() {
    const allButtons = document.querySelectorAll( '.change-state' );

    allButtons.forEach( button => {
        button.addEventListener( 'click', changePostStatus );
    });

    function changePostStatus ( event ) {
        const { target: { dataset: { propertyId } } } = event;

        console.log( propertyId );
    }

})();
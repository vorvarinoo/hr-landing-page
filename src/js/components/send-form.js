function sendForm( evt ) {
  const formData = new FormData( evt );
  fetch( 'mail.php', {
      method: 'POST',
      body: formData
    } )
    .then( ( data ) => {
      if ( data.status === 200 ) {
        // do something
      }
    } )
    .catch( error => {
      console.log( error.message );
    } );
}

function formHandler( evt ) {
  sendForm( evt.target );
  evt.target.reset();
}

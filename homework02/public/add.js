$( document ).ready(function() {
	$( 'form' ).submit(function( event ) {
		event.preventDefault();

		var form = $( this );

		$.ajax({
			type: 'POST',
			url: '/people',
			data: form.serialize(),
			dataType: 'json',
			success: function( resp ) {
				console.log( resp );
			}
		});
	});
});

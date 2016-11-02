var newPar = $( "<p>no data yet...</p>" );
newPar.addClass("data");

$( document ).ready(function() {
	$( 'form' ).submit(function( event ) {
		event.preventDefault();

		var form = $( this );

		$.ajax({
			type: 'POST',
			url: '/searchform',
			data: form.serialize(),
			dataType: 'json',
			success: function( result ) {
				$(newPar).text(result);
			}
		});

		$(this).after(newPar);
	});
});

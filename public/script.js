var newPar = $( "<p>no data yet...</p>" );
newPar.addClass("data");	

$( document ).ready(function() {
	$( "a" ).click(function( event ) {
		alert( "The link will no longer take you to jquery.com" );
		event.preventDefault();
	});
});

$( "a" ).addClass( "test" );

$( "a" ).click(function( event ) {
	event.preventDefault();
	$( this ).hide( "slow" );
});

$( function() {
    $( ".widget input[type=submit], .widget a, .widget button" ).button();
    $( "button, input, a" ).click( function( event ) {
	//event.preventDefault();
	
	$.ajax({url: "/fetch", success:
		function(result){
			//console.log(result);	//Testing to see if the ajax function was working correctly
			$(newPar).text("Hello, " + result + "!");
	}});

	$(this).after(newPar);
    });
});
	

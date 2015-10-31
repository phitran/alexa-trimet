var _get = require( 'lodash/object/get' ),
    trimet = require( './trimet' ),
    helper = require( './helper.js' );

function LambdaFimction( event, context ) {
    try {
        if ( event.session.application.applicationId !== process.env.ALEXA_APP_ID ) {
            context.fail( "Invalid Application ID" );
        }

        var requestType = _get( event, 'request.type' );
        if ( requestType === 'LaunchRequest' ) {

        }

        if ( requestType === 'IntentRequest' ) {
            //console.log( event.request );
            //console.log( event.session );

            var speachResponse = helper.buildSpeechletResponse();
            var response = helper.buildResponse( {}, speachResponse );

            //trimet.getVehicleLocations( function( data ) {
            //    context.succeed( response );
            //} );

            trimet.getRoutes( function( data ) {

            } );
        }

        if ( requestType === 'SessionEndedRequest' ) {

        }

    } catch ( e ) {
        context.fail( "Exception: " + e );
    }
}

exports.handler = LambdaFimction;
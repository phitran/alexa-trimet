var _get = require( 'lodash/object/get' ),
    service = require( './service' ),
    alexaHelper = require( './alexaHelper.js' );

function LambdaFunction( event, context ) {
    try {
        if ( event.session.application.applicationId !== 'gulp.env.ALEXA_APP_ID' ) {
            context.fail( "Invalid Application ID" );
        }

        var requestType = _get( event, 'request.type' );
        if ( requestType === 'LaunchRequest' ) {

        }

        if ( requestType === 'IntentRequest' ) {
            //console.log( event.request );
            //console.log( event.session );
            //console.log( _get( event, 'session.user.userId' ) );

            //setTimeout( function () {
            //    service.getRoutes().then( success, fail );
            //    //service.getVehicleLocations().then( success, fail );
            //}, 2000 );

            service.getRoutes().then( success, fail );

            function success( response ) {
                //console.log( response );

                var speachResponse = alexaHelper.buildSpeechletResponse( 'Trimet Test', 'This is a test, ' + _get( event, 'request.intent.name' ), null, true );
                var response = alexaHelper.buildResponse( {}, speachResponse );

                context.succeed( response );
            }

            function fail( reason ) {
                context.fail( reason );
            }
        }

        if ( requestType === 'SessionEndedRequest' ) {

        }

    } catch ( e ) {
        context.fail( "Exception: " + e );
    }
}

exports.handler = LambdaFunction;



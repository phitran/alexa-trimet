var request = require( 'request' ),
    helper = require( './helper.js' );

function getVehicleLocations( cb ) {
    var baseUrl = 'https://developer.trimet.org/ws/v2/vehicles',
        parameters = {
            routes: 'fpp',
            blocks: 'fp',
            ids: 'foo'
        },
        url = helper.buildRequestURL( baseUrl, parameters );

    console.log( url );
    request.get( url, {}, function(error, response, body) {
        if ( response.statusCode === 200 ) {
            console.log( 'response', body );
        } else {
            console.log( 'error', error, body  );
        }
    } )
}

module.exports =  getVehicleLocations;
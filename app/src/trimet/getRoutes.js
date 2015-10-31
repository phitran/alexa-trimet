var request = require( 'request' ),
    helper = require( './helper.js' );

function getRoutes() {
    var baseUrl = 'https://developer.trimet.org/ws/V1/routeConfig',
        parameters = {
            json: true
            //routes: '',
            //dir: '',
            //stops: '',
            //tp: '',
            //starSeq: '',
            //endSeq: ''
        },
        url = helper.buildRequestURL( baseUrl, parameters );

    return new Promise( function ( resolve, reject ) {
        request.get( url, {}, function ( error, response, body ) {
            if ( response.statusCode === 200 ) {
                resolve( JSON.parse( body ) );
            } else {
                reject( body );
            }
        } )
    } );
}

module.exports = getRoutes;
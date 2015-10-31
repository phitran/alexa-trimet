var request = require( 'request' ),
    _forOwn = require( 'lodash/object/forown' ),
    _merge = require( 'lodash/object/merge' );

//https://developer.trimet.org/ws/V1/arrivals?locIDs=6849,6850&appID=0000000000000000000000000

function getVehicleLocations( cb ) {
    var baseUrl = 'https://developer.trimet.org/ws/v2/vehicles',
        parameters = {
            routes: 'fpp',
            blocks: 'fp',
            ids: 'foo'
        },
        url = buildRequestURL( baseUrl, parameters );

    console.log( url );
    request.get( url, {}, function(error, response, body) {
       if ( response.statusCode === 200 ) {
           console.log( 'response', body );
       } else {
           console.log( 'error', error, body  );
       }
    } )
}

function getRoutes( cb ) {
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
        url = buildRequestURL( baseUrl, parameters );

    console.log( url );
    request.get( url, {}, function(error, response, body) {
        if ( response.statusCode === 200 ) {
            console.log( 'response', body );
        } else {
            console.log( 'error', error, body  );
        }
    } )
}

function buildRequestURL( baseUrl, paramsObject ) {
    var params = [];
    var url = baseUrl + "?";

    _merge( paramsObject, { appID: process.env.TRIMET_APP_ID }  );
    _forOwn( paramsObject, function ( value, key ) {
        params.push( key + '=' + value );
    } );

    return url + params.join('&');
}

module.exports = {
    getVehicleLocations: getVehicleLocations,
    getRoutes: getRoutes
};
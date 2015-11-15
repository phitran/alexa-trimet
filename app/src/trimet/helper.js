var Promise = require( 'bluebird' ),
    request = require( 'request' ),
    lodash = require( 'lodash' );

function buildRequestURL( baseUrl, paramsObject ) {
    var params = [];
    var url = baseUrl + "?";

    lodash.merge( paramsObject, { appID: process.env.TRIMET_APP_ID } );
    lodash.forOwn( paramsObject, function ( value, key ) {
        params.push( key + '=' + value );
    } );

    return url + params.join( '&' );
}

function getRequest( basaeUrl, paramsObject ) {
    var url = buildRequestURL( basaeUrl, paramsObject );

    return new Promise( function( resolve, reject ) {
        request.get( url, {}, function ( error, response, body ) {
            if ( response.statusCode === 200 ) {
                resolve( JSON.parse( body ) );
            } else {
                reject( body );
            }
        } );
    } );
}

module.exports.getRequest = getRequest;
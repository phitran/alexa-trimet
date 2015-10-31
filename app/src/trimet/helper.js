var request = require( 'request' ),
    _forOwn = require( 'lodash/object/forown' ),
    _merge = require( 'lodash/object/merge' );

function buildRequestURL( baseUrl, paramsObject ) {
    var params = [];
    var url = baseUrl + "?";

    _merge( paramsObject, { appID: process.env.TRIMET_APP_ID } );
    _forOwn( paramsObject, function ( value, key ) {
        params.push( key + '=' + value );
    } );

    return url + params.join( '&' );
}

function getRequest( basaeUrl, paramsObject ) {
    var url = buildRequestURL( basaeUrl, paramsObject );

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

module.exports.getRequest = getRequest;
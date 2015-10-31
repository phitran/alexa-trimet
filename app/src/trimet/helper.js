var _forOwn = require( 'lodash/object/forown' ),
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

module.exports.buildRequestURL = buildRequestURL;
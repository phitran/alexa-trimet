var cache = require( './cache' ),
    trimet = require( './trimet' );

init();

// on instantiation populate cache
function init() {
    getRoutes();
}

function getRoutes() {
    var data = cache.getRoutesCache();

    return new Promise( function ( resolve, reject ) {
        if ( !data ) {
            // get routes from service
            trimet.getRoutes().then( success, fail );

            function success( response ) {
                cache.setRoutesCache( response );
                resolve( response );
            }

            function fail( reason ) {
                reject( reason );
            }
        } else {
            // return routes from cache
            resolve( cache.getRoutesCache() );
        }
    } );

}

module.exports = {
    getRoutes: getRoutes
};
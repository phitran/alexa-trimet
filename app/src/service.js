var cache = require( './cache' ),
    trimet = require( './trimet' ),
    _sortBy = require( 'lodash/collection/sortBy' );

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
                var cacheData = { route: _sortBy( response.resultSet.route, 'route' ) };

                cache.setRoutesCache( cacheData );
                resolve( cacheData );
            }

            function fail( reason ) {
                console.error( new Error( reason ) );
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
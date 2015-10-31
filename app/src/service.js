var cache = require( './cache' ),
    trimet = require( './trimet' ),
    _sortBy = require( 'lodash/collection/sortBy' );

init();

// on instantiation populate cache
function init() {
    getRoutes();
    getVehicleLocations();
}

function getRoutes() {
    var cacheType = 'routes',
        data = cache.getCache( cacheType );

    return new Promise( function ( resolve, reject ) {
        if ( !data ) {
            // get routes from service
            trimet.getRoutes().then( success, fail );

            function success( response ) {
                var cacheData = { route: _sortBy( response.resultSet.route, 'route' ) };

                cache.setCache( cacheType, cacheData );
                resolve( cacheData );
            }

            function fail( reason ) {
                console.error( new Error( reason ) );
                reject( reason );
            }
        } else {
            // return routes from cache
            resolve( cache.getCache( cacheType ) );
        }
    } );
}

function getVehicleLocations() {
    var cacheType = 'vehicleLocations',
        data = cache.getCache( cacheType );

    return new Promise( function ( resolve, reject ) {
        if ( !data ) {
            // get routes from service
            trimet.getVehicleLocations().then( success, fail );

            function success( response ) {
                var cacheData = { vehicle: _sortBy( response.resultSet.vehicle, 'vehicle' ) };

                cache.setCache( cacheType, cacheData );
                resolve( cacheData );
            }

            function fail( reason ) {
                console.error( new Error( reason ) );
                reject( reason );
            }
        } else {
            // return routes from cache
            resolve( cache.getCache( cacheType ) );
        }
    } );
}

module.exports = {
    getRoutes: getRoutes,
    getVehicleLocations: getVehicleLocations
};
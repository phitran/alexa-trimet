var Q = require("q" ),
    cacheService = require( './cache' ),
    trimetService = require( './trimet' ),
    _sortBy = require( 'lodash/collection/sortBy' );

init();

// on instantiation populate cache
function init() {
    getRoutes();
    getVehicleLocations();
}

function getRoutes() {
    var cacheType = 'routes',
        data = cacheService.getCache( cacheType ),
        deferred = Q.defer();

    if ( !data ) {
        // get trimet routes from service
        trimetService.getRoutes().then( success, fail );

        function success( response ) {
            console.info( 'Populating cache with Trimet Routes' );
            var cacheData = { route: _sortBy( response.resultSet.route, 'route' ) };

            cacheService.setCache( cacheType, cacheData );
            deferred.resolve( cacheData );
        }

        function fail( reason ) {
            console.error( new Error( reason ) );
            deferred.reject( reason );
        }
    } else {
        // return routes from cache
        console.info( 'Retrieving Trimet Routes from cache' );
        deferred.resolve( cacheService.getCache( cacheType ) );
    }

    return deferred.promise;
}

function getVehicleLocations() {
    var cacheType = 'vehicleLocations',
        data = cacheService.getCache( cacheType ),
        deferred = Q.defer();

    if ( !data ) {
        // get vehicle infomation from service
        trimetService.getVehicleLocations().then( success, fail );

        function success( response ) {
            console.info( 'Populating cache with Trimet Vehicle information' );
            var cacheData = { vehicle: _sortBy( response.resultSet.vehicle, 'vehicle' ) };

            cacheService.setCache( cacheType, cacheData );
            deferred.resolve( cacheData );
        }

        function fail( reason ) {
            console.error( new Error( reason ) );
            deferred.reject( reason );
        }
    } else {
        // return vehicle infomation from cache
        console.info( 'Retrieving Trimet Vehicle Infomation from cache' );
        deferred.resolve( cacheService.getCache( cacheType ) );
    }

    return deferred.promise;
}

module.exports = {
    getRoutes: getRoutes,
    getVehicleLocations: getVehicleLocations
};
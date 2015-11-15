var Promise = require( 'bluebird' ),
    trimetService = require( './trimet' ),
    lodash = require( 'lodash' );

function getRoutes() {
    return new Promise( function( resolve, reject ) {
        trimetService.getRoutes().then( success, fail );

        function success( response ) {
            console.info( 'Populating cache with Trimet Routes' );
            resolve( lodash.sortBy( response.resultSet.route ) );
        }

        function fail( reason ) {
            console.error( new Error( reason ) );
            reject( reason );
        }
    } );
}

function getVehicleLocations() {
    return new Promise( function( resolve, reject ) {
        // get vehicle infomation from service
        trimetService.getVehicleLocations().then( success, fail );

        function success( response ) {
            console.info( 'Populating cache with Trimet Vehicle information' );
            resolve( lodash.sortBy( response.resultSet.vehicle ) );
        }

        function fail( reason ) {
            console.error( new Error( reason ) );
            reject( reason );
        }
    } );
}

module.exports = {
    getRoutes: getRoutes,
    getVehicleLocations: getVehicleLocations
};
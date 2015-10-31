var helper = require( './helper.js' );

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
        };

    return helper.getRequest( baseUrl, parameters );
}

function getVehicleLocations() {
    var baseUrl = 'https://developer.trimet.org/ws/v2/vehicles',
        parameters = {
            routes: 'fpp',
            blocks: 'fp',
            ids: 'foo'
        };

    return helper.getRequest( baseUrl, parameters );
}

module.exports = {
    getRoutes: getRoutes,
    getVehicleLocations: getVehicleLocations
};
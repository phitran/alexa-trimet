var nodeCache = new require( "node-cache" ),
    cacheOptions = { stdTTL: 100, checkperiod: 120 };

var routesCache = new nodeCache( cacheOptions );

function setRoutesCache( data ) {
    routesCache.set( "routes", data );
}

function getRoutesCache() {
    return routesCache.get( 'routes' )
}

module.exports = {
    setRoutesCache: setRoutesCache,
    getRoutesCache: getRoutesCache
};
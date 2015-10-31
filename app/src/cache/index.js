var nodeCache = new require( "node-cache" ),
    cacheOptions = { stdTTL: 100, checkperiod: 120 },
    trimetCache = new nodeCache( cacheOptions );

function setCache( type, data ) {
    trimetCache.set( type, data );
}

function getCache( type ) {
    return trimetCache.get( type )
}

module.exports = {
    setCache: setCache,
    getCache: getCache
};
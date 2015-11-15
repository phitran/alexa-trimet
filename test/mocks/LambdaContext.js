var context = {
    succeed: function ( result ) {
        console.log( 'succeed: ' + JSON.stringify( result ) );
        process.exit( 0 );
    },
    fail: function ( error ) {
        console.log( 'fail: ' + error );
        process.exit( -1 );
    },
    done: function () {
        process.exit( 0 );
    }
};

module.exports = context;
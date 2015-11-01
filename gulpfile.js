var gulp = require( 'gulp' ),
    zip = require( 'gulp-zip' ),
    clean = require( 'gulp-clean' );

var event = {
        "session": {
            "sessionId": "SessionId.eada5122-2209-451a-930d-88d0fe3db50c",
            "application": {
                "applicationId": process.env.ALEXA_APP_ID
            },
            "attributes": null,
            "user": {
                "userId": "amzn1.account.AHX66MBOY3PKIUOMYJVX5LYT3DNA",
                "accessToken": null
            },
            "new": true
        },
        "request": {
            "type": "IntentRequest",
            "requestId": "EdwRequestId.fcf2fe49-1345-457e-8ed3-9ab439f1b2f5",
            "timestamp": 1446336138472,
            "intent": {
                "name": "SetUserLocation",
                "slots": {}
            },
            "reason": null
        }
    },
    context = {
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

gulp.task( 'run', function () {
    var lamdaFunction = require( './app/src/index.js' );
    lamdaFunction.handler( event, context );
    //process.exit( 0 );
} );

gulp.task( 'zip', function () {
    return gulp.src( [ 'app/src/*', 'node_modules' ] )
        .pipe( zip( 'lamda.zip' ) )
        .pipe( gulp.dest( 'dist' ) )
} );

gulp.task( 'clean', function () {
    gulp.src( 'dist' )
        .pipe( clean( { force: true } ) )
} );

gulp.task( 'watch', function () {
    gulp.watch( [ 'app/src/**/*.js' ], [ 'run' ] );
} );

gulp.task( 'default', [ 'watch', 'run' ] );
gulp.task( 'deploy', [ 'clean', 'zip' ] );
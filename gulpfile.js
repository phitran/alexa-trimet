var gulp = require( 'gulp' ),
    zip = require( 'gulp-zip' ),
    del = require( 'del' ),
    lambdaFunction = require( './app/index.js' );

var event = {
        "session": {
            "new": false,
            "sessionId": "session1234",
            "attributes": {},
            "user": {
                "userId": null
            },
            "application": {
                "applicationId": process.env.ALEXA_APP_ID
            }
        },
        "version": "1.0",
        "request": {
            "intent": {
                "slots": {
                    "Color": {
                        "name": "Color",
                        "value": "blue"
                    }
                },
                "name": "MyColorIsIntent"
            },
            "type": "IntentRequest",
            "requestId": "request5678"
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
    lambdaFunction.handler( event, context );
} );

gulp.task( 'zip', function () {
    gulp.src( 'app/*' )
        .pipe( zip( 'lamda.zip' ) )
        .pipe( gulp.dest( 'dist' ) );
} );

gulp.task( 'clean', function () {
    del( [ 'dist' ] );
} );

gulp.task( 'watch', function () {
    gulp.watch( [ 'app/**/*.js' ], [ 'run' ] );
} );

gulp.task( 'default', [ 'watch', 'run' ] );
gulp.task( 'deploy', [ 'clean', 'zip' ] );
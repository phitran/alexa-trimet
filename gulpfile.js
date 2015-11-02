var gulp = require( 'gulp' ),
    AWS = require( 'aws-sdk' ),
    zip = require( 'gulp-zip' ),
    fs = require( "fs" ),
    del = require( 'del' ),
    _forOwn = require( 'lodash/object/forOwn' );

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

var appDir = './app/src';
var buildDir = './dist/build';
var dependenciesPaths = [];

gulp.task( 'run', function () {
    var lamdaFunction = require( appDir + '/index.js' );
    lamdaFunction.handler( event, context );
    //process.exit( 0 );
} );

gulp.task( 'get-modules-paths', [ 'clean' ], function ( cb ) {
    fs.readFile( "./package.json", "utf-8", function ( err, data ) {
        var packageJSON = JSON.parse( data );

        _forOwn( packageJSON.dependencies, function ( value, key ) {
            dependenciesPaths.push( 'node_modules/' + key + '/**' );
        } );

        cb();
    } )
} );

gulp.task( 'copy-modules', [ 'get-modules-paths' ], function () {
    return gulp.src( dependenciesPaths, { base: 'node_modules' } )
        .pipe( gulp.dest( buildDir + '/node_modules' ) )
} );

gulp.task( 'copy-app', [ 'clean' ], function () {
    return gulp.src( appDir + '/**' )
        .pipe( gulp.dest( buildDir ) )
} );

gulp.task( 'zip', [ 'copy-app', 'copy-modules' ], function () {
    return gulp.src( [ buildDir + '/**' ] )
        .pipe( zip( 'alexa-trimet.zip' ) )
        .pipe( gulp.dest( './dist/' ) )
} );

gulp.task( 'deploy-lambda', function ( cb ) {
    var lambda = new AWS.Lambda( {
        apiVersion: '2015-03-31',
        region: 'us-east-1',
        accessKeyId: process.env.AWS_DEPLOY_SECRET,
        secretAccessKey: process.env.AWS_DEPLOY_KEY
    } );


    fs.readFile( buildDir + '/alexa-trimet.zip', { encoding: 'base64' }, function ( err, file ) {

        var params = {
            FunctionName: 'AlexaTrimet',
            Publish: false,
            S3Bucket: 'alexa-trimet-lambda-deploy',
            S3Key: 'alexa-trimet.zip',
            //S3ObjectVersion: 'STRING_VALUE',
            ZipFile: file
        };

        lambda.updateFunctionCode( params, function ( err, data ) {
            console.log( err, data );
            cb()
        } );
    } );
} );

gulp.task( 'clean', function () {
    return del( [ './dist/' ] );
} );

gulp.task( 'watch', function () {
    gulp.watch( [ appDir + '/**/*.js' ], [ 'run' ] );
} );

gulp.task( 'default', [ 'watch', 'run' ] );
gulp.task( 'package', [ 'clean', 'get-modules-paths', 'copy-modules', 'copy-app', 'zip' ] );
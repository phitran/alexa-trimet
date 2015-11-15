var gulp = require( 'gulp' ),
    AWS = require( 'aws-sdk' ),
    zip = require( 'gulp-zip' ),
    replace = require( 'gulp-replace-task' ),
    fs = require( "fs" ),
    del = require( 'del' ),
    _forOwn = require( 'lodash/object/forOwn' ),
    _merge = require( 'lodash/object/merge' );

var appDir = './app/src',
    buildDir = './dist/build',
    dependenciesPaths = [];

// mock run Lambda Function
gulp.task( 'run', [ 'copy-app' ], function() {
    var lambdaFunction = require( buildDir + '/index.js' ),
        lambdaContext = require( './test/mocks/LambdaContext' ),
        mockRequest = fs.readFileSync( __dirname + '/test/fixtures/SetUserLocation.json', 'utf8' );

    lambdaFunction.handler( JSON.parse( mockRequest ), lambdaContext );
} );

// find npm dependencies(non dev) paths
gulp.task( 'get-modules-paths', [ 'clean' ], function( cb ) {
    fs.readFile( "./package.json", "utf-8", function( err, data ) {
        var packageJSON = JSON.parse( data );

        _forOwn( packageJSON.dependencies, function( value, key ) {
            dependenciesPaths.push( 'node_modules/' + key + '/**' );
        } );

        cb();
    } )
} );

// copy npm dependencies to dist
gulp.task( 'copy-modules', [ 'get-modules-paths' ], function() {
    return gulp.src( dependenciesPaths, { base: 'node_modules' } )
        .pipe( gulp.dest( buildDir + '/node_modules' ) )
} );

// replace private values that match gulp.env.[key] & copy app files to dist
gulp.task( 'copy-app', [ 'clean' ], function() {
    var gulpEnv = process.env,
        devEnv = {
            ALEXA_APP_ID: 'dev'
        };

    if ( !!process.env.dev ) {
        _merge( gulpEnv, devEnv );
    }

    return gulp.src( appDir + '/**' )
        .pipe( replace( {
            prefix: 'gulp.env.',
            patterns: [
                {
                    json: gulpEnv
                }
            ]
        } ) )
        .pipe( gulp.dest( buildDir ) );
} );

// zip dist/build files
gulp.task( 'zip', [ 'copy-app', 'copy-modules' ], function() {
    return gulp.src( [ buildDir + '/**' ] )
        .pipe( zip( 'alexa-trimet.zip' ) )
        .pipe( gulp.dest( './dist/' ) )
} );

// deploy zip to aws lambda
gulp.task( 'deploy-lambda', function( cb ) {
    var lambda = new AWS.Lambda( {
        apiVersion: '2015-03-31',
        region: 'us-east-1',
        accessKeyId: process.env.AWS_DEPLOY_SECRET,
        secretAccessKey: process.env.AWS_DEPLOY_KEY
    } );


    fs.readFile( buildDir + '/alexa-trimet.zip', { encoding: 'base64' }, function( err, file ) {

        var params = {
            FunctionName: 'AlexaTrimet',
            Publish: false,
            S3Bucket: 'alexa-trimet-lambda-deploy',
            S3Key: 'alexa-trimet.zip',
            //S3ObjectVersion: 'STRING_VALUE',
            ZipFile: file
        };

        lambda.updateFunctionCode( params, function( err, data ) {
            console.log( err, data );
            cb()
        } );
    } );
} );


// clean dist folder
gulp.task( 'clean', function() {
    return del( [ './dist/' ] );
} );

gulp.task( 'default', [ 'clean', 'copy-app', 'run' ] );
gulp.task( 'package', [ 'clean', 'get-modules-paths', 'copy-modules', 'copy-app', 'zip' ] );
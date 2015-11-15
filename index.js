var fs = require( 'fs' );

// call
var lambda = require( './app/src/index.js' ),
    lambdaContext = require( './test/mocks/LambdaContext' ),
    mockRequest = fs.readFileSync( __dirname + '/test/fixtures/SetUserLocation.json', 'utf8' );

lambda.handler( JSON.parse( mockRequest ), lambdaContext );
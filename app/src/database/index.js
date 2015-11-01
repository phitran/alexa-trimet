var AWS = require( 'aws-sdk' ),
    dynamodbOptions = {
        apiVersion: '2012-08-10',
        endpoint: 'http://localhost:8000',
        region: 'us-east-1',
        accessKeyId: process.env.AWS_DYNAMO_SECRET,
        secretAccessKey: process.env.AWS_DYNAMO_KEY
    },
    dynamodb = new AWS.DynamoDB( dynamodbOptions );

dynamodb.listTables( {}, function ( err, data ) {
    console.log( err, data );
} );

//var params = {
//    Item: {
//        Route: {
//            N: "1"
//        }
//    },
//    TableName: 'Alexa-Trimet-Routes',
//    ReturnConsumedCapacity: 'TOTAL',
//    ReturnItemCollectionMetrics: 'SIZE',
//    ReturnValues: 'NONE'
//};
//dynamodb.putItem( params, function ( err, data ) {
//    console.log( err, data );
//} );


//var params = {
//    Key: {
//        Route: {
//            N: "1"
//        }
//    },
//    TableName: 'Alexa-Trimet-Routes', /* required */
//    ConsistentRead: false,
//    //ProjectionExpression: 'Route',
//    ReturnConsumedCapacity: 'TOTAL'
//};
//dynamodb.getItem(params, function(err, data) {
//    console.log( err, data );
//});

var params = {
    TableName: 'Alexa-Trimet-Routes',
    ConsistentRead: false,
    //ExclusiveStartKey: {
    //    Route: {
    //        N: "1"
    //    }
    //},
    //ProjectionExpression: '',
    //FilterExpression: 'STRING_VALUE',
    KeyConditionExpression: 'Route = :hashval',
    ExpressionAttributeValues: {
        ':hashval': {
            N: "1"
        }
    },
    Limit: 2,
    ReturnConsumedCapacity: 'TOTAL',
    ScanIndexForward: false,
    Select: 'ALL_ATTRIBUTES'
};
dynamodb.query( params, function ( err, data ) {
    console.log( err, data );
} );
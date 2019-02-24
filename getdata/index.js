module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const mongodb = require('mongodb');
    mongodb.MongoClient.connect('mongodb://compliance:passw0rd@ds249035.mlab.com:49035/compliance', function(error, client) {
        if (error) {
          context.log('Failed to connect');
          context.res = { status: 500, body: res.stack }
          return context.done();
        }
        context.log('Connected');
    
        client.db('compliance').collection('users').find().toArray(function(error, docs) {
          if (error) {
            context.log('Error running query');
            context.res = { status: 500, body: res.stack }
            return context.done();
          }
    
          context.log('Success!');
          context.res = {
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ res: docs })
          };
          context.done();     
        });
      });
};
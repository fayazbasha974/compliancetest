module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    if (req.query.name || (req.body && req.body.name)) {
        var mongoose = require('mongoose');
        mongoose.connect('mongodb://compliance:passw0rd@ds249035.mlab.com:49035/compliance');
        const Schema = mongoose.Schema;
        var User = require('../models/user');
        const user = new User({
            name: req.body.name,
            age: req.body.age,
            city: req.body.city
        });
        user.save(function(err, res){
            if(err){
                console.log(err);
            } else{
                var request = require('request'); 
                request.post(
                    'https://prod-11.centralus.logic.azure.com:443/workflows/e878b22fc5c144698b4551ebb03f4378/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=a9KD4sz0IqTUZVlFZdlKJtmEwyqWQNBoRvgHV7A8Cxo',
                    { json: { name: 'fayaz' } },
                    function (error, response, body) {
                        if (!error && response.statusCode == 200) {
                            console.log(body)
                        }
                        context.res = response;
                    }   
                );
                context.res = res;
            }
        })
    }
    else {
        context.res = {
            status: 400,
            body: "Please pass a name on the query string or in the request body"
        };
    }
    context.done();
};
module.exports = function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://compliance:passw0rd@ds249035.mlab.com:49035/compliance');
    var User = require('../models/user');
    User.find({}, function(err, res){
        if(err) {
            console.log(err);
        } else {
            console.log('jkj',res);
            context.res = {
                body: res
            };
        }
    })
    context.done();
};
var mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: {type: String},
    age: {type: Number},
    city: {type: String}
});


module.exports= mongoose.model('Users', UserSchema);

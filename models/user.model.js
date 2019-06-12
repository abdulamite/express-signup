const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    username: {type: String, required: true, max: 100},
    hash: {type: String, required: true},
    email: {type: String, required:false}
});


// Export the model
module.exports = mongoose.model('user', UserSchema);
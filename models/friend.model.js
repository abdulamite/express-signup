const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let FriendSchema = new Schema({
    name: {type: String, required: true, max: 100},
    age: {type: Number, required: true},
    email: {type: String, required:false}
});


// Export the model
module.exports = mongoose.model('friend', FriendSchema);
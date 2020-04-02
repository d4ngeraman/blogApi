// importing mongoose module
const mongoose = require('mongoose')
// import schema 
const Schema = mongoose.Schema;

let userSchema = new Schema(
    {
        userId: {
            type: String,
            unique: true
        },
        firstName: {
            type: String,
            default: ''
        },
        lastName: {
            type: String,
            default: ''
        },
        email: {
            type: String,
            default: ''
        }
    }
)

mongoose.model('User', userSchema);

module.exports = mongoose.model('User', userSchema)
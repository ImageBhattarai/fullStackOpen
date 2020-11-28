const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const URL = process.env.MONGODB_URI


mongoose.connect(URL, {useFindAndModify:false, useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true,})

const phoneSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    number: {
        type: String,
        required: true
    },
    id: Number
})
phoneSchema.plugin(uniqueValidator)


module.exports = mongoose.model('Phone', phoneSchema)
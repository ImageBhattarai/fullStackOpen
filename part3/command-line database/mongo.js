const mongoose = require('mongoose')

if (process.argv.length < 3) {
    console.log('Please enter a valid password: node mongo <password>')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://maskedninja:${password}@cluster0.9grdk.mongodb.net/phonebook-app?retryWrites=true&w=majority`

mongoose.connect(url, {useFindAndModify: false, useCreateIndex:true, useNewUrlParser:true, useUnifiedTopology:true})

const phoneSchema = new mongoose.Schema({
    name: String,
    number: String,
    id: Number,
}) 

// Phone collection = phones
const Phone = mongoose.model('Phone', phoneSchema)

const phone = new Phone({
    name: process.argv[3],
    number: process.argv[4],
    id: 9
})

if (process.argv.length > 3) {
    phone.save().then(result => {
        console.log(`Added ${result.name} number ${result.number} to phonebook`)
        mongoose.connection.close()
    })
}

Phone.find({}).then(result => {
    result.forEach(info => {
        console.log(info.name, info.number)
    })
    mongoose.connection.close()
})
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const Phone = require('./models/persons') 


const app = express()
// express.static is used to display static content (ie js & css) from frontend(build dir)
app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())


app.get('', (request, response) => {
    response.send('<h1>Hellowwwwww ETE TEHET</h1>')
})

app.get('/api/persons',(request, response) => {
    Phone.find({}).then(phones => {
        response.json(phones.map(phone => phone.toJSON()))
    }) 
})

// app.get('/api/persons/:id', (request, response) => {
//     Phone.findById(request.params.id).then(phones => {
//         response.json(phone.toJSON())
//     })
// })

app.post('/api/persons', (request, response, next) => {
    const body = request.body
    
    const phone = new Phone({
        name: body.name,
        number: body.number,
        id: Math.floor(Math.random()*6),
    })
        
    phone.save().then(savedPhone => {
        return savedPhone.toJSON()
    })
        .then(savedFormattedPhone => {
            response.json(savedFormattedPhone)
        })
        .catch(error => next(error))
   
})

app.delete('/api/persons/:id', (request, response, next) => {
    Phone.findByIdAndRemove(request.params.id).then(result => {
        response.status(204).end()
    }).catch(error => next(error))
})

const errorHandler = (error, request, response ,next) => {
    console.error(error.message)
    if (error.name === 'CastError') {
        return response.status(400).send({error: 'malformatted id'})
    } else if (error.name === 'ValidationError') {
        return response.status(400).send({error: error.message})
    }
    next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
})

const express = require('express')
const path = require('path')

// include and initialize the rollbar library with your access token
const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: 'd7512014cc01427caa5e921d853ec516',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

let students = []

const app = express()

app.use(express.json())


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file served successfully.')
})

app.post('/api/student', (req, res) =>{
    let {name} = req.body
    name = name.trim()
    
    students.push(name)
    
    rollbar.log('student added successfully', {author: "Bryce", type: "manual entry"})
    
    res.status(200).send(students)
})

app.use(rollbar.errorHandler())
const port = process.env.PORT || 4545

app.listen(port, () => console.log(`take us to warp ${port}!`))
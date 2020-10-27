// Load libraries
const express = require('express')
const handlebars = require('express-handlebars')

// Configure port
const argv = process.argv
const PORT = argv[2] ? parseInt(argv[2]) : 3000 

// Create an instance of the express application
const app = express()

// configure handlebars
app.engine('hbs',
    handlebars({ defaultLayout: 'default.hbs'})
)
app.set('view engine', 'hbs')

app.get('/', (req, res) => {
    res.status(200)
    res.type('text/html')
    res.render('default')
})

// Configure application
app.use(
    express.static(__dirname + '/static')
)

// Start express
app.listen(
    PORT, // Port number
    () => { // Callback function, to execute after express has started
        console.info(`Application has started on port ${PORT} at ${new Date()}`)
})
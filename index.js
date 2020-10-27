// Load libraries
const express = require('express')
const handlebars = require('express-handlebars')

// Configure port
const PORT = process.argv[2] ? parseInt(process.argv[2]) : 3000 

// Create an instance of the express application
const app = express()

// Random number generators
const MIN = 1
const MAX = 6
const IMG_PREFIX = 'dice'
const IMG_EXT = '.png'
let randomValue

// A function that generates an array that consists of two random dice images to be displayed
diceImg = () => {

    // Generate two random numbers to get different images of dices
    const diceImgArray = []

    for (i = 0; i < 2; i++) {
        // To get a random value between 1 and 6 inclusive
        randomValue = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN
        diceImgArray.push(IMG_PREFIX.concat(randomValue.toString(), IMG_EXT))
    }   

    return diceImgArray
}

// View engine setup to handle file with hbs extension
app.engine('hbs',
    handlebars({ defaultLayout: 'default.hbs'})
)
app.set('view engine', 'hbs')

// The index page
// Using the GET / method
app.get('/', (req, res) => {
    console.info(res.status)
    res.status(200)
    res.type('text/html')
    res.render('dice')
})

// The page that displays two random dice
// Using the GET /random method
app.get('/random', (req, res) => {
    res.status(200)
    res.type('text/html')
    res.render('random', {
        imgArray: diceImg(),
    })
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
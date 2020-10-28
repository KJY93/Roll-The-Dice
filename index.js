// Load libraries
const express = require('express')
const handlebars = require('express-handlebars')

// Configure port
const PORT = process.argv[2] ? parseInt(process.argv[2]) : 3000 

// Create an instance of the express application
const app = express()

// Load static files
app.use(
    express.static(__dirname + '/static')
)

// Constants to use for the random dice image generators
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
// Can use array to pass in multiple resource
app.get(['/', '/index.html'], (req, res) => {
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

// Handling errors
app.get('*', function(req, res, next) {
    let err = new Error(`${req.ip} tried to reach ${req.originalUrl}`); // Tells us which IP tried to reach a particular URL
    err.statusCode = 404;
    err.shouldRedirect = true; //New property on err so that our middleware will redirect
    next(err);
  });
  

app.use(function(err, req, res, next) {
    console.error(err.message);
    if (!err.statusCode) err.statusCode = 500; // Sets a generic server error status code if none is part of the err

    if (err.shouldRedirect) {
        res.redirect('/') // Redirect user back to main page
    } else {
        res.status(err.statusCode).send(err.message); // If shouldRedirect is not defined in our error, sends our original err data
    }
});

// Start express
app.listen(
    PORT, // Port number
    () => { // Callback function, to execute after express has started
        console.info(`Application has started on port ${PORT} at ${new Date()}`)
})
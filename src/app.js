// DOcumentation
// http://expressjs.com/en/4x/api.html

const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public/index.html'))

const app = express()
const port = process.env.PORT　|| 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, './templates/views')
const partialsPath = path.join(__dirname, './templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Takahiro Takamuku'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'HELP ME!!!!',
        helpText: 'HHHHEEEEELP.',
        name: 'WHO ARE YOU???'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Yumi Choi'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a address key.'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {} ) => {
        if (error) {
            return res.send({ error })
        }

        // res.send({
        //     latitude: data.latitude,
        //     longitude: data.longitude,
        //     location: data.location
        // })
        forecast(latitude, longitude, (error, foreData) => {
            if (error) {
                if (error) {
                    return res.send({ error })
                }
            }

            res.send({
                forecast: foreData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search key.'
        })
    }

    console.log(req.query)
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'Help article not found.',
        name: 'ERROR MAN'
    })
})

// Error Page
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMsg: 'ERROR!! Page Not Found.',
        name: 'ERROR MAN'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

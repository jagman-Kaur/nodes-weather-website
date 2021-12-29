const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const getWeather = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectorypath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectorypath))

app.get('', (req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Jagman'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Jagman'
    })
})

app.get('/help' , (req, res) => {
    res.render('help', {
        helpText: 'Helpful text',
        title: 'HELP',
        name: 'jagman'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude} = {}) => {
        if(error)
            return res.send({
                error
            })
        getWeather(latitude, longitude , (error, forecastData) => {
            if (error)
                return res.send({
                    error
                })
            res.send({
                description: forecastData.description,
                currentTemp: forecastData.currentTemp,
                feelsLikeTemp: forecastData.feelsLikeTemp,
                windSpeed: forecastData.windSpeed,
                address: req.query.address

            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Jagman'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Jagman'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
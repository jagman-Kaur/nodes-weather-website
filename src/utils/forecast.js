const request = require('request')

const getWeather = (lat, long, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5a3c2d6228249cf79387a70c4a0c7663&query=' + lat + ',' + long
    request({url, json: true}, (error, {body} = {}) => {
        if(error)
            callback('unable to connect to service', undefined)
        else if(body.error)
            callback('location not found', undefined)
        else{
            callback(undefined, {
                description: body.current.weather_descriptions[0],
                currentTemp: body.current.temperature,
                feelsLikeTemp: body.current.feelslike,
                windSpeed: body.current.wind_speed
            })
        }
    })
}

module.exports = getWeather
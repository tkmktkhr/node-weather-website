const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/b8438c95c8616d90266a82f2ee6de3c3/' + latitude + ','+ longitude + '?units=si&lang=ja'
    console.log(url)

    request( { url, json: true }, (error, { body } ) => {
        if (error) {
            // console.log('Unable to connect to weather service!')
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            // console.log('Unable to find location.')
            callback('Unable to find location.', undefined)
        } else {
            // console.log('It is currently ' + response.body.currently.temperature + ' degress out. There is a ' + response.body.currently.precipProbability + ' % chance of rain.')
            // console.log(response.body.daily.data[0].summary)
            callback(undefined, {
                result: 'It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + ' % chance of rain.',
                message: body.daily.data[0].summary,
                humidity: body.currently.humidity * 100,
                pressure: body.currently.pressure
            })
        }
    })
}

module.exports = forecast
const axios = require('axios')

class WeatherController {
    
    static meta(req,res,next){
        axios.get('https://www.metaweather.com/api/location/1047378/')
        .then(function (response){
            res.status(200).json(response)
            console.log(response)
        })
        .catch(function (err){
            console.log(err)
        })
    }
}

module.exports = WeatherController
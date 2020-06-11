'use strict'

const axios = require('axios');
const API_KEY = process.env.API_KEY

class DataController {
  static fetchRestaurant(req, res, next) {
    let restaurantList = [];
    axios.get('https://developers.zomato.com/api/v2.1/search?count=30&lat=-6.260674&lon=106.781618&radius=3000&sort=real_distance', {
      headers: {
        'user-key': API_KEY
      }
    })
      .then(result => {
        let data = result.data.restaurants;
        // console.log(data)
        for (let i = 0; i < data.length; i++) {
          let temp = {
            name: data[i].restaurant.name,
            address: data[i].restaurant.location.address,
            img: data[i].restaurant.featured_image,
            type: data[i].restaurant.cuisines,
            timings: data[i].restaurant.timings,
            averagePrice: data[i].restaurant.average_cost_for_two,
            ratings: data[i].restaurant.user_rating,
            etc: data[i].restaurant.highlights,
          }
          restaurantList.push(temp);
        }
        console.log(result.data)
        res.status(200).json({restaurant: restaurantList})
      })
      .catch(err => {
        next(err)
      })
  }

  static fetchWeather(req, res, next) {
    axios.get('https://www.metaweather.com/api/location/1047378/')
      .then(result => {
        console.log(result.data)
        res.status(200).json({weather: result.data.consolidated_weather[0]})
      })
      .catch(err => {
        next(err)
      })
  }
}

module.exports = DataController
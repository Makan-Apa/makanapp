const axios = require('axios')

class MenuController{
    static randomMenu(req, res, next){
        axios.get('https://www.themealdb.com/api/json/v1/1/random.php')
          .then(food=>{
            // res.status(200).json(food.data)
            res.status(200).json({
              name: food.data.meals[0].strMeal,
              category: food.data.meals[0].strCategory,
              area: food.data.meals[0].strArea,
              imgUrl: food.data.meals[0].strMealThumb,
              ytubeUrl: food.data.meals[0].strYoutube
            })
          })
              
          .catch(err=> next(err))
      }
}

module.exports = MenuController
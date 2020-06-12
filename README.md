# Makan Apa API Documentation

```
Guides: 
- Login: Default landing page, after login user will redirect to the Main Page where it will shows all ToDo lists that were created by current user.
- Register: If user doesn't have account, they can create the account, after register's complete, user will be automatically directed to login page.
```

## USER

### USER REGISTER 

#### URL 
/register 


#### Method 
  > POST

#### URL Parameter 
None

#### Data Parameter 
 - email=[string]
 - password=[string] (minimum length 6)

#### Success Response 
- Code: 201
- Content: 
    ```
    {
      "User": "<your email>"
    }
    ```

#### Error Response 
- Code: 400 
- Content: 
    ```
    {
      "message": "Validation error: Must be an email"
    }
    ```

#### Sample Call 
- http://localhost:3000/register 

====================================================================================

### USER LOGIN

#### URL 
/login

#### Method 
  > POST

#### URL Parameter 
None

#### Data Parameter 
- email=[string]
- password=[string] (minimum length 6, max length 25)

#### Success Response 
- Code: 200
- Content: 
    ```
    {
      "token": "<your token access>"
    }
    ```

#### Error Response 
- Code: 401 
- Content: 
    ```
    { 
      code: 401, 
      message: 'Email/Password incorrect' 
    }
    ```

> OR 

- Code: 404 
- Content: 
    ```
    { 
      code: 404, 
      message: 'User email is not registered' 
    }
    ```

#### Sample Call 
- http://localhost:3000/login

====================================================================================

## DATA

### GET ALL RESTAURANT 

#### URL 
/data/restaurant

#### Headers
  ```
  {
    "token": "<your access token>"
  }
  ```

#### Method 
  > GET

#### URL Parameter 
None

#### Data Parameter 
None

#### Success Response 
- Code: 200 
- Content: 
    ```
    {
      "restaurant": [
        {
            "name": "MARKOBAR",
            "address": "Jl. Sultan Iskandar Muda, Pondok Indah, Jakarta",
            "img": "",
            "type": "Street Food, Martabak",
            "timings": "12 Noon to 11 PM",
            "averagePrice": 100000,
            "ratings": {
                "aggregate_rating": "3.1",
                "rating_text": "Average",
                "rating_color": "CDD614",
                "rating_obj": {
                    "title": {
                        "text": "3.1"
                    },
                    "bg_color": {
                        "type": "lime",
                        "tint": "500"
                    }
                },
                "votes": "6"
            },
            "etc": [
                "Debit Card",
                "Lunch",
                "Cash",
                "No Alcohol Available",
                "Dinner",
                "Takeaway Available",
                "Indoor Seating",
                "Desserts and Bakes"
            ]
        },
      ]
    } 
    ```

#### Error Response 
- Code: 401 
- Content: 
    ```
    {
        "error": "jwt must be provided"
    } 
    ```

> OR

- Code: 500 
- Content: 
    ```
    {
        "error": 
        "Internal Server Error"
    } 
    ```

#### Sample Call 
- http://localhost:3000/data/restaurant 

====================================================================================

### GET RANDOM MENU

#### URL 
/data/whats-your-menu

#### Method 
  > GET

#### URL Parameter 
None

#### Headers
  ```
  {
    "token": "<your access token>"
  }
  ```

#### Data Parameter 
None

#### Succes Response 
- Code: 200 
- Content: 
    ```
    {
      "name": "Chakchouka ",
      "category": "Miscellaneous",
      "area": "Tunisian",
      "imgUrl": "https://www.themealdb.com/images/media/meals/gpz67p1560458984.jpg",
      "ytubeUrl": "https://www.youtube.com/watch?v=EHKNu93MSx4"
    }
    ```

#### Error Response 
- Code: 401 
- Content: 
    ```
    {
        "error": "jwt must be provided"
    } 
    ```

> OR

- Code: 500 
- Content: 
    ```
    {
        "error": 
        "Internal Server Error"
    } 
    ``` 

#### Sample Call 
- http://localhost:3000/data/whats-your-menu

====================================================================================
​
### GET WEATHER 
​
#### URL 
data/weather
​
#### Method 
  > GET
​
#### URL Parameter 
None
​
#### Headers
  ```
  {
    "token": "<your access token>"
  }
  ```
​
#### Data Parameter 
None
​
#### Succes Response 
- Code: 200 
- Content: 
    ```
    {
    "weather": {
        "id": 5985818978025472,
        "weather_state_name": "Light Rain",
        "weather_state_abbr": "lr",
        "wind_direction_compass": "E",
        "created": "2020-06-12T06:27:10.762327Z",
        "applicable_date": "2020-06-12",
        "min_temp": 26.884999999999998,
        "max_temp": 33.09,
        "the_temp": 32.255,
        "wind_speed": 4.904499283149076,
        "wind_direction": 86.24873451718413,
        "air_pressure": 1008.5,
        "humidity": 65,
        "visibility": 9.922676568837986,
        "predictability": 75
      }
    }
    ```
​
#### Error Response 
​
- Code: 500 
- Content: 
    ```
    {
        "error": 
        "Internal Server Error"
    } 
    ```

#### Sample Call 
- http://localhost:3000/data/weather

====================================================================================

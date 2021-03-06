const baseUrl = "http://localhost:3000"
let restoran = []

$(document).ready(function(){
    console.log("massuk")
    auth()
    $('#myModal').on('shown.bs.modal', function () {
        $('#restoran-name').text('focus')
      })
})

function auth() {
    if (localStorage.token)  {
      $('.random-menu').remove()
      $('#weather-content').remove();
      $('#register-page').hide();
      $('#login-page').hide();
      $('.notlogged-in').hide();
      $('.logged-in').show();
      $('#homepage').show();
      $('#random-menu').show();
      randomMenu()
      weather()
      fetchresto()

    } else {
      $('#login-page').show();
      $('#register-page').hide();
      $('#homepage').hide();
      $('.notlogged-in').show();
      $('.logged-in').hide();
    //   $('#random-menu').hide()
    }
  }

  function showLogin(e) {
    event.preventDefault();
    $('#login-page').show();
    $('#register-page').hide();
  }

  function showRegister(e) {
    event.preventDefault();
    $('#login-page').hide();
    $('#register-page').show();
  }

  function showDashboard(e) {
    e.preventDefault();
    $('#homepage').show();
    $('#login-page').hide()
    $('#register-page').hide()
    auth()
  }

function login(event){
    event.preventDefault()
    let email = $('#email-login').val()
    let password = $('#password-login').val()
    console.log(email,password)

    $.ajax({
        method: 'post',
        url: baseUrl + '/login',
        data:{email,password}
    })
    .done((data) =>{
        console.log(data,'ini data')
        localStorage.setItem('token',data.token)
        auth()
    })
    .fail(err =>{
        console.log(err.responseJSON)
        alert(err.responseJSON)
    })
    .always(_=>{
        $('#email-login').val('')
        $('#password-login').val('')
    })
}

function register(event){
    event.preventDefault()
    let email = $('#email-register').val()
    let password = $('#password-register').val()
    console.log(email,password)

    $.ajax({
        method: 'post',
        url: baseUrl + '/register',
        data:{email,password}
    })
    .done((data) =>{
        console.log(data,'ini data')
        $('#register-page').append(
            `<p style="color: green;">Register Success, Please Login</p>`
          );
        $('#login-page').show()
        $('#register-page').hide();
    })
    .fail(err =>{
        console.log(err.responseJSON)
        alert(err.responseJSON)
    })
    .always(_=>{
        $('#email-register').val('')
        $('#password-login').val('')
    })
}

function onSignIn(googleUser) {
    let google_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        method: 'post',
        url: baseUrl + '/google-login',
        headers:{ google_token}
    })
    .done(data =>{
        localStorage.setItem('token',data.token)
        auth()
    })
    .fail(err =>{
        console.log(err.responseJSON)
        alert(err.responseJSON)
    })
  }

function logout(){
    localStorage.clear()
    auth()
    let auth2 = gapi.auth2.getAuthInstance();
            auth2.disconnect();
}

function randomMenu(){
    // console.log('massuk eko')
    $.ajax({
        method: 'get',
        url: baseUrl + '/whats-your-menu',
        headers:{
            token: localStorage.token
        }
    })
        .done(data=>{
            console.log(data)
            $('#random-menu').empty();
            let randomMenu = `
                <div class="container mt-3 p-4 random-menu">
                    <h1 style="text-align: left;">${data.name}</h1>
                    <div class="row">
                        <div class="col-md-6">
                            category : ${data.category}
                        </div>
                        <div class="col-md-3">
                            <a href = '${data.ytubeUrl}' target=_blank><img style="height:100%; width: 100%; float:right;" src="${data.imgUrl}" alt="image-menu"></a>       
                        </div>    
                    </div>    
                </div>
                `
            $('#random-menu').append(randomMenu)
        })
        .fail(err=>{
            console.log(err.responseJSON)
        })
}

function weather(){
    $.ajax({
        method: 'get',
        url: baseUrl + '/data/weather',
        headers:{
            token: localStorage.token
        }
    })
        .done(cuaca=>{
            $('#weather').empty();
            let html = `
            <div id = "weather-content">
                <div class="card-body grey lighten-5 rounded-bottom">
                    <div class="card grey lighten-2" style="background-color: antiquewhite">
                        <div style="width:100%;" class="card-body pb-0">
                            <img style="width:80px" class="pb-2 align-items-center" src = "https://www.metaweather.com/static/img/weather/png/64/${cuaca.weather.weather_state_abbr}.png" />
                            <div class="d-flex justify-content-between">
                                <p class="mb-0 h5" style="color:">${cuaca.weather.the_temp}&deg;</p>
                                <p class="mb-0 hour">${cuaca.weather.applicable_date}</p>
                        </div>
                    </div>
                    <hr>
                    <div class="card-body pt-0">
                        <h6 class="font-weight-bold mb-1">Jakarta</h6>
                        <p class="mb-0">${cuaca.weather.weather_state_name}</p>
                    </div>    
                </div>
            </div>
            `
            $('#weather').append(html)
        })
        .fail(err=>{
            console.log(err.responseJSON)
        })
} 

function showdetail(index){
    console.log(index)
    $('#restoran-name').text(restoran[index].name)
    $('#restoran-address').text(restoran[index].address)
    $('#restoran-timings').text(restoran[index].timings)
    $('#restoran-price').text(restoran[index].averagePrice)
    $('#restoran-ratings').text(restoran[index].ratings.aggregate_rating)
    $('#restoran-etc').text(restoran[index].etc)
}

function fetchresto(){
    $.ajax({
        method: 'get',
        url: baseUrl + "/data/restaurant",
        headers:{
            token: localStorage.token
        }
    })
    .done(data =>{
        console.log(data)
        let elmresto = $('#kartu')
        let html = ``
        restoran = data.restaurant
        data.restaurant.forEach((val , index) => {
            html += `
                <div class="col-xl-4">
                    <div class="card" style="background-color: antiquewhite;">
                        <div style="max-height: 150px; min-heigth: 150px; overflow: hidden">
                            <img src="${val.img ? val.img : 'resto.jpg'}" style="object-fit: cover; height: 150px; width: 300px"  class="card-img-top" alt="...">
                        </div>
                        <div class="card-body">
                            <p class="card-text">${val.name}</p>
                            <button onclick="showdetail(${index})" type="button" data-toggle="modal"  data-target="#exampleModal" class="btn btn-primary">Show Detail</button>
                        </div>
                    </div>
                </div>  
              `
        });
        elmresto.append(html)
    })
    .fail(err => {
        console.log(err.responseJSON)
    })
}


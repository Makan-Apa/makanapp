const baseUrl = "http://localhost:3000"

$(document).ready(function(){
    console.log("massuk")
    auth()
})

function auth() {
    if (localStorage.token)  {
      $('#register-page').hide();
      $('#login-page').hide();
      $('.notlogged-in').hide();
      $('.logged-in').show();
      $('#homepage').show();
    } else {
      $('#login-page').show();
      $('#register-page').hide();
      $('#homepage').hide();
      $('.notlogged-in').show();
      $('.logged-in').hide();
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
        $('#username').val('')
        $('#password').val('')
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
    })
    .fail(err =>{
        console.log(err.responseJSON)
        alert(err.responseJSON)
    })
    .always(_=>{
        $('#username').val('')
        $('#password').val('')
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
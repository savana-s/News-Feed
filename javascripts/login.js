function login(){
    var location = window.location.href;
    var directoryPath = location.substring(0, location.lastIndexOf("/")+1);

    var user = $(".login-name").val();
    var pass = $(".login-password").val();

    if(user == "" || pass == ""){
        $(".login-alert").removeClass("hidden");
        $(".login-alert").html("Please Fill Out all Fields!");
        return;
    }

    user_obj = JSON.parse(window.localStorage.getItem(user));
    console.log(user_obj);
    if(user_obj != null){
        if (user_obj.password == pass){
            window.localStorage.setItem("current_user", JSON.stringify(user_obj));
            window.location.href = directoryPath + "home.html";
        }
    }
    else{
        $(".login-alert").removeClass("hidden");
        $(".login-alert").html("Incorrect Username or Password");
    }
}

function signup(){
    var location = window.location.href;
    var directoryPath = location.substring(0, location.lastIndexOf("/")+1);

    var user = $(".signup-name").val();
    var pass = $(".signup-password").val();

    if(user == "" || pass == ""){
        $(".signup-alert").removeClass("hidden");
        $(".signup-alert").html("Please Fill Out all Fields!");
        return;
    }

    user_obj = window.localStorage.getItem(user);

    if(user_obj != null){
        $(".signup-alert").removeClass("hidden");
        $(".signup-alert").html("User with that name already exists!");
        return; 
    }

    window.localStorage.setItem(user, JSON.stringify({"user": user, "password": pass, "favorites": [], "last_login": "This is your first time here!"}));
    window.localStorage.setItem("current_user", JSON.stringify({"user": user, "password": pass, "favorites": [], "last_login": "This is your first time here!"}));

    window.location.href = directoryPath + "home.html";
}

$(document).ready(function() {
    if (window.localStorage.getItem("current_user") != null){
        var location = window.location.href;
        var directoryPath = location.substring(0, location.lastIndexOf("/")+1);
        window.location.href = (directoryPath + "home.html");
    }
    $(".login").click(login);
    $(".signup").click(signup);
    $(".signup-form").keypress(function (e) {
      if (e.which == 13) {
        signup();
        return false;    //<---- Add this line
      }
    }); 
    $(".login-form").keypress(function (e) {
      if (e.which == 13) {
        login();
        return false;    //<---- Add this line
      }
    });  
});

$('#login-button').click(function(){
  $('#login-button').fadeOut("slow",function(){
    $("#container").fadeIn();
    TweenMax.from("#container", .4, { scale: 0, ease:Sine.easeInOut});
    TweenMax.to("#container", .4, { scale: 1, ease:Sine.easeInOut});
  });
});

$(".close-btn").click(function(){
  TweenMax.from("#container", .4, { scale: 1, ease:Sine.easeInOut});
  TweenMax.to("#container", .4, { left:"0px", scale: 0, ease:Sine.easeInOut});
  $("#container, #forgotten-container").fadeOut(800, function(){
    $("#login-button").fadeIn(800);
  });
});

/* Forgotten Password */
$('#forgotten').click(function(){
  $("#container").fadeOut(function(){
    $("#forgotten-container").fadeIn();
  });
});

/* Logueo Facebook */
 window.fbAsyncInit = function() {
    FB.init({
      appId      : '1597812100526722',
      xfbml      : true,
      version    : 'v2.8'
    });
  };

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));




function onSuccess(googleUser) {
     var profile = googleUser.getBasicProfile();
    // gapi.client.load('plus', 'v1', function () {
    //     var request = gapi.client.plus.people.get({
    //         'userId': 'me'
    //     });
    //     //Display the user details
    //     request.execute(function (resp) {
            var profileHTML = '<div class="profile"><div class="head">Welcome '+profile.getGivenName()+'! <a href="javascript:void(0);" onclick="signOut();">Sign out</a></div>';
            profileHTML += '<img src="'+profile.getImageUrl()+'"/><div class="proDetails"><p>'+profile.getName()+'</p><p>'+
            profile.getEmail()+'</p></div></div>';
            $('.userContent').html(profileHTML);
            $('#gSignIn').slideUp('slow');
    //     });
    // });
}
function onFailure(error) {
    alert(error);
}
function renderButton() {
    gapi.signin2.render('gSignIn', {
        'scope': 'profile email',
        'width': 240,
        'height': 50,
        'longtitle': true,
        'theme': 'dark',
        'onsuccess': onSuccess,
        'onfailure': onFailure
    });
}
function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
        $('.userContent').html('');
        $('#gSignIn').slideDown('slow');
    });
}
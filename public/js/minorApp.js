var app = angular.module('minorApp', ['ngRoute']).run(function($rootScope){
  $rootScope.authenticated = false;
  $rootScope.current_user = "";

  $rootScope.value = "";
  $rootScope.name = "";
  $rootScope.signout = function(){
    $http.get('/auth/signout');

     $rootScope.authenticated = false;
     $rootScope.current_user = ""
  };
});

app.config(function($routeProvider, $locationProvider){
  $locationProvider.html5Mode(true);
  $routeProvider
    .when('/', {
      templateUrl: 'main.html',
      controller:'mainController'
    })
    .when('/signup',{
      templateUrl: 'signup.html',
      controller: 'signupController'
    })
    .when('/nikmin',{
      templateUrl: 'nikmin.html',
      controller: 'mainController'
    })
    .when('/nikinvestor',{
      templateUrl: 'investor.html',
      controller: 'mainController'
    })
    .when('/register', {
      templateUrl: 'register.html',
      controller: 'authController'
    })
    .when('/signin', {
      templateUrl: 'register.html',
      controller: 'authController'
    })
    .when('/profile', {
      templateUrl: 'enterpreneurprofile.html',
      controller: 'headerController'
    })
    .when('/investor_register', {
      templateUrl: 'investor_register.html',
      controller: 'investor_authController'
    })
    .when('/browser', {
      templateUrl: 'browse.html',
      controller: 'browseController'
    })
    .when('/startup', {
      templateUrl: 'browsestartup.html',
      controller: 'browseController'
    })
    .when('/investor', {
      templateUrl: 'searchcompany.html',
      controller: 'investorController'
    })
    .when('/follower', {
      templateUrl: 'follower.html',
      controller: 'headerController'
    })
});


app.controller('mainController',function($scope, $rootScope, $location, $http){

  $scope.browse_delhi = function() {
    $http.get('api/browse_delhi').success(function(response){
      $rootScope.value = response;
      $rootScope.name = "location Delhi";
      $location.path('/browser');
    })
  }

  $scope.browse_noida = function() {
    $http.get('api/browse_noida').success(function(response){
      $rootScope.value = response;
      $rootScope.name = "location Noida";
      $location.path('/browser');
    })
  }

  $scope.browse_mumbai = function() {
    $http.get('api/browse_mumbai').success(function(response){
      $rootScope.value = response;
      $rootScope.name = "location Mumbai";
      $location.path('/browser');
    })
  }

  $scope.browse_bangalore = function() {
    $http.get('api/browse_bangalore').success(function(response){
      $rootScope.value = response;
      $rootScope.name = "location Bangalore";
      $location.path('/browser');
    })
  }

  $scope.browse_web = function() {
    $http.get('api/browse_web').success(function(response){
      $rootScope.value = response;
      $rootScope.name = "Web Services industry";
      $location.path('/browser');
    })
  }

  $scope.browse_food = function() {
    $http.get('api/browse_food').success(function(response){
      $rootScope.value = response;
      $rootScope.name = "Food Services industry";
      $location.path('/browser');
    })
  }

  $scope.browse_health = function() {
      $http.get('api/browse_health').success(function(response){
        $rootScope.value = response;
        $rootScope.name = "Health Services industry";
        $location.path('/browser');
      })
    }

  $scope.browse_consumer = function() {
      $http.get('api/browse_consumer').success(function(response){
        $rootScope.value = response;
        $rootScope.name = "Consumer Services industry";
        $location.path('/browser');
      })
    }

  $scope.browse_media = function() {
      $http.get('api/browse_media').success(function(response){
        $rootScope.value = response;
        $rootScope.name = "Media Services industry";
        $location.path('/browser');
      })
    }

});

app.controller('headerController', function($scope, $rootScope, $http, $location){

  $scope.init = function() {
    $scope.current_user = $rootScope.current_user;
    $scope.follower = $rootScope.value;
  }
  $scope.init();
  $scope.browse = function() {
    $http.get('api/browse').success(function(response){
      $rootScope.value = response;
      $rootScope.name = "All";
      $location.path('/browser');
    })
  }
  $scope.lookfollow = function() {

    alert($rootScope.current_user);
    $http.get('api/lookfollow/' + $rootScope.current_user).success(function(data){
      $rootScope.value = data;
      $location.path('/follower');
    })
  }

   $scope.upload = function(){
     alert('something');
     alert($scope.file);
     $http.post('api/upload', $scope.file).success(function(data){

       console.log('whats happening');

     })
   };

});

app.controller('browseController', function($scope, $rootScope, $location, $http){
  $scope.init = function() {
    $scope.startups = $rootScope.value;
    $scope.id = $rootScope.name;
    $scope.companies = $rootScope.value;
  }
  $scope.init();


  $scope.search = function(id, url){

    alert(id);
    //only investor has url
    if(url){
      $http.get('api/browse_investor/' + id).success(function(response){
        $rootScope.value = response;
        $rootScope.name = id;
        $location.path('/investor');
      })
    }

    else {
      $http.get('api/browse_startup/' + id).success(function(response){
        $rootScope.value = response;
        $rootScope.name = id;
        $location.path('/startup');
    //    $scope.init();
      })
    }
  }

  $scope.browse_startup = function() {

    $http.get('api/browse_startup').success(function(response){
      $rootScope.value = response;
      $rootScope.name = "Enterpreneurs";
      //$location.path('/browse_startup');
      $scope.init();
    })
  }
  $scope.browse_investor = function() {

    $http.get('api/browse_investor').success(function(response){
      $rootScope.value = response;
      $rootScope.name = "Investing Organizations";
      $scope.init();
    })
  }

})

app.controller('investorController', function($scope, $rootScope, $location, $http){

  $scope.init = function() {
    $scope.investors = $rootScope.value;
    $scope.id = $rootScope.name;
  }
  $scope.init();

//$rootScope.value has the entire company to be followed
//$rootScope.name has the company name to be followed
  $scope.follow = function() {

      if($rootScope.current_user == "")
      {
        alert('Sign up And Follow As Many Angel Investors')
        $location.path('/signup');
      }
      else
      {

          $http.get('/api/follow/' + $rootScope.name +'/'+ $rootScope.current_user).success(function(data){
            console.log('in minorApp');
            $scope.id = "Following";
            $location.path('/browser');
          });

        }

      }
})


app.controller('signupController',function($scope, $rootScope , $location, $http){
  $scope.register = function() {
    $location.path('/register');
  }
  $scope.signin = function() {
    $location.path('/signin');
  }
  $scope.investor_register = function() {
    $location.path('/investor_register');
  }

    $scope.user = {username: '', email: '', company: '', loc: '', industry: '', password: '', pitch_line: ''};
    $scope.error_message = '';

    $scope.signin = function(){
      $http.post('/auth/login', $scope.user).success(function(data){
        if(data.state == 'success') {
          console.log('In success state');
           $rootScope.authenticated = true;
          $rootScope.current_user = data.user.username;
          $location.path('/profile');
        } else {
          $scope.error_message = 'login request for ' + $scope.user.username;
        }
      })
    };

    $scope.signup = function(){

      alert('are you here');
      console.log('are you here');

      //placeholder until authentication is implemented
      $http.post('/auth/signup', $scope.user).success(function(data){
        if(data.state == 'success'){
          $rootScope.authenticated = true;
          $rootScope.current_user = data.user.username;
          $location.path('/profile');
        } else {
            $scope.error_message = data.message;
        }

      })

});

app.controller('authController', function($scope, $rootScope , $location, $http){

  $scope.user = {username: '', email: '', company: '', loc: '', industry: '', password: '', pitch_line: ''};
  $scope.error_message = '';

  //postService.getAll().success(function(data){
   // $scope.posts = data
  //});


  $scope.login = function() {
    $location.path('/signin');
  }

  $scope.signin = function(){
    $http.post('/auth/login', $scope.user).success(function(data){
      if(data.state == 'success') {
        console.log('In success state');
         $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/profile');
      } else {
        $scope.error_message = 'login request for ' + $scope.user.username;
      }
    })
  };

  $scope.signup = function(){

    //placeholder until authentication is implemented
    $http.post('/auth/signup', $scope.user).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.user.username;
        $location.path('/profile');
      } else {
          $scope.error_message = data.message;
      }

    })
  };

})
app.controller('investor_authController', function($scope, $rootScope , $location, $http){

  $scope.investor = {username: '', email: '', company: '', password: '', industry: '', website_url: '', employees: '', loc: '', desc: ''};
  $scope.error_message = '';

  //postService.getAll().success(function(data){
   // $scope.posts = data
  //});

  $scope.investor_signin = function(){
    $http.post('/auth/investor_login', $scope.investor).success(function(data){
      if(data.state == 'success') {
        console.log('In success state');
         $rootScope.authenticated = true;
        $rootScope.current_user = data.investor.username;
        $location.path('/');
      } else {
        $scope.error_message = 'login request for ' + $scope.investor.username;
      }
    })
  };

  $scope.investor_signup = function(){
    //placeholder until authentication is implemented
    $http.post('/auth/investor_signup', $scope.investor).success(function(data){
      if(data.state == 'success'){
        $rootScope.authenticated = true;
        $rootScope.current_user = data.investor.username;
        $location.path('/profile');
      } else {
          $scope.error_message = data.message;
      }

    })
  };

})

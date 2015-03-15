// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var db = null;
var loaduserid=null;
angular.module('starter', ['ionic', 'ngCordova'])




.config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('signin', {
          url: "/signin",
          templateUrl: "signin.html",
          controller: 'SignInCtrl'
        })

    
        .state('welcome', {
          url: "/welcome",
          templateUrl: "welcome.html",
		   controller: 'welcomeCtrl'
		  
        })
		
	
    
    $urlRouterProvider.otherwise("/signin");
})



 .controller('SignInCtrl', function($scope, $state, $http, $rootScope,$ionicLoading,$filter,$ionicPopup, $timeout,$cordovaSQLite) {
// $scope.user = { uname:'era@mybank.com'};
 
 document.addEventListener('deviceready', function () {
	db = $cordovaSQLite.openDB({ name: "bankasiadb.db" });
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS useridinfo (user_id text)");
 //alert("Deviec Ready"+db);
	     var query = "SELECT user_id FROM useridinfo";
        $cordovaSQLite.execute(db, query).then(function(res) {
            if(res.rows.length > 0) {
			
                //console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
			//alert("user ID :"+res.rows.item(0).user_id);
				//$scope.setloaduserid = res.rows.item(0).user_id;
					//$scope.user = { uname:	res.rows.item(0).user_id};
					//alert("user ID :"+loaduserid);	
					$scope.user = { uname:res.rows.item(0).user_id};
					//alert("User:"+$scope.user);
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });
 })
 
 

	
		
		
 	$scope.login= function (user) {
		
	alert("Loing In Controller :"+loaduserid);
		
		 var query = "SELECT user_id FROM useridinfo where user_id=?";
		  $cordovaSQLite.execute(db, query,[user.uname]).then(function(res) {
            if(res.rows.length > 0) {			
				for(var i=0; i<res.rows.length; i++){
					
				//$scope.branch_code_values=	res.rows.item(i).branch_code;				
				// $scope.results.push(res.rows.items(i));

				} 
				
            } else {
				
				
             
						//Begin Else Query
						var queryUserID = "SELECT user_id FROM useridinfo";
				 
					$cordovaSQLite.execute(db, queryUserID).then(function(res) {
						if(res.rows.length > 0) {			
							for(var i=0; i<res.rows.length; i++){
							var uid=res.rows.item(i).user_id;
							
							//Begin Update
							 var queryUserIDUpdate = "UPDATE useridinfo set user_id=? where user_id=?";
								 $cordovaSQLite.execute(db, queryUserIDUpdate,[user.uname,uid]).then(function(res) {
								  alert("Updated Successfully");								
								}, function (err) {
								   // console.error(err);
									 alert("Error Method");
								});
							//End Update

							} 
							
						} else {
						 
							//Begin For Insert
								var insertqQuery = "INSERT INTO useridinfo (user_id) VALUES (?)";
									 $cordovaSQLite.execute(db, insertqQuery,[user.uname]).then(function(res) {
								alert("Insert successfully !");
								
								}, function (err) {
								   // console.error(err);
									 alert("Error Method");
								});
							//End For Inser
						}
					}, function (err) {
					   // console.error(err);
						 alert("Error Method");
					});
					//End Else Query
            }
        }, function (err) {
           // console.error(err);
			 alert("Error Method");
        });
	}
 
 })
 .controller('welcomeCtrl', function($scope, $state, $http,$ionicLoading) {})
 
 
.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
/*	db = $cordovaSQLite.openDB({ name: "bankasiadb.db" });
    $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS useridinfo (user_id text)");
	
	       var query = "SELECT user_id FROM useridinfo";
        $cordovaSQLite.execute(db, query).then(function(res) {
            if(res.rows.length > 0) {
                //console.log("SELECTED -> " + res.rows.item(0).firstname + " " + res.rows.item(0).lastname);
				//alert("user ID :"+res.rows.item(0).user_id);
				loaduserid = res.rows.item(0).user_id;
					//$scope.user = { uname:	res.rows.item(0).user_id};
					//alert("user ID :"+loaduserid);	
            } else {
                console.log("No results found");
            }
        }, function (err) {
            console.error(err);
        });*/
		
		//alert("Run Deviec");
		
  });
})



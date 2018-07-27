
var app=angular.module('appRoutes',['ngRoute'])
.config(function($routeProvider,$locationProvider)
{
					$routeProvider
					.when('/login',{
									templateUrl:'app/views/pages/users/login.html',
										controller:'mainCtrl',
										controllerAs:'login'
								})
								.when('/',{
									templateUrl:'app/views/pages/home.html'
								})
								.when('/Management',{
									templateUrl:'app/views/pages/adminDashboardPage.html',
										controller:'AdminCtrl',
										controllerAs:'AdminDash' ,
										authenticated:true,
										permission:'admin'
								})
								.when('/',{
									templateUrl:'app/views/pages/home.html'
								})
					.when('/aboutus',{
										templateUrl:'app/views/pages/aboutus.html',
										controller:'aboutCtrl',
										controllerAs:'about'
									})
					.when('/contactus',{
										templateUrl:'app/views/pages/ContactUs.html'
										
										
									})
					.when('/view',{
										templateUrl:'app/views/pages/solardatapage.html',
										controller:'searchCtrl',
										controllerAs:'SearchAll'
									})

					.when('/register',{
										templateUrl:'app/views/pages/users/register.html',
										controller:'regCtrl',
										controllerAs:'register'
									})
					.when('/dashboard',{
										templateUrl:'app/views/pages/dashboard.html',
										controller:'dashboardCtrl',

										controllerAs:'SolarAll'
										
									})
					.when('/report',{
										templateUrl:'app/views/pages/reportPage.html',
										controller:'reportCtrl',
										controllerAs:'Search'
									})
					.when('/solar',{
										templateUrl:'app/views/pages/SolarPage.html',
										controller:'soarCtrl',
										controllerAs:'add'
									})
					.when('/userDashboard',{
										templateUrl:'app/views/pages/userDashboard.html',
										controller:'userDashboardCtrl',
										controllerAs:'userDashboard'
										
									})
									.when('/userReport',{
										templateUrl:'app/views/pages/reportUaerPage.html',
										controller:'reportUserCtrl',
										controllerAs:'reportUser'
										
									})
									.when('/userSingle',{
										templateUrl:'app/views/pages/userSingle.html',
										controller:'userSingleCtrl',
										controllerAs:'userSingle'
										
									})
					
					.when('/viewsolar/:id',{
												templateUrl:'app/views/pages/solarsingle.html',
												controller:'solarDataCtrl',
												controllerAs:'SearchAll'
											})

					.when('/logout',{
										templateUrl:'app/views/pages/users/logout.html'
									})
					.when('/profile',{
											templateUrl:'app/views/pages/users/profile.html'
									 })

					.otherwise({redirectTo:'/'});
					$locationProvider.html5Mode({
													enabled:true,
													requireBase:false
      											});
					
});  
app.run(['$rootScope','Auth','$location','User',function($rootScope,Auth,$location,User)
{
	$rootScope.$on('$routeChangeStart',function(event,next){
		if(next.$$route !== undefined)
		{
			if(next.$$route.authenticated === true)
			{
				if(!Auth.isLoggedIn())
				{
					event.preventDefault();
					$location.path('/');
	
				}
				
					
	
				
			}
			else if(next.$$route.authenticated === false)
			{
				if(!Auth.isLoggedIn())
				{
					event.preventDefault();
					$location.path('/profile');
	
				}	
			}
	
		}
		
	});

}]);

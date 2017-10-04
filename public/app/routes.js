angular.module('appRoutes',['ngRoute']).config(function($routeProvider,$locationProvider)
{
					$routeProvider
					.when('/',{
									templateUrl:'app/views/pages/users/login.html',
										controller:'mainCtrl',
										controllerAs:'login'
								})

					.when('/aboutus',{
										templateUrl:'app/views/pages/aboutus.html'
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
					.when('/admin',{
										templateUrl:'app/views/pages/adminPage.html',
										controller:'adminCtrl',
										controllerAs:'login1'
										
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

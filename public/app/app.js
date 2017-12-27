angular.module('userApp',['appRoutes','ngTable','ui.bootstrap',
	         			  'userControllers',
	         			  'userServices',
	         			  'reportControllers',
	         			  'ngAnimate',
	         			  'mainControllers',
	         			  'authServices',
	         			  'searchControllers',
	         			  'solarControllers',
	         			  'solarServices',
	         			  'solardataControllers',
	         			  'solarDataServices',
	         			  'dashboardControllers','aboutControllers'
	         			  ])
.config(function($httpProvider)
{
	$httpProvider.interceptors.push('AuthInterceptors');

})
.filter('startFrom',function()
{
	return function(data,start)
	{
		return data.slice(start);
	}
});

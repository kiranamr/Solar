angular.module('userApp',['appRoutes','ngTable','ui.bootstrap','ui.grid',
'ui.grid.exporter', 'ui.grid.pagination', 'ui.grid.selection',
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
	         			  'dashboardControllers','aboutControllers','UserDashboardControllers','UserSingleControllers','UserReportControllers'
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

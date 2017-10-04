angular.module('solarServices',[])
	.factory('Solar',function($http)
	{
			var solarFactory={};


					solarFactory.create=function(addSolarData)
					{
							return $http.post('/api/solarin',addSolarData);

					};
					
				    solarFactory.getUsers=function()
					 {
					 		return $http.get('/api/solarin');
					 		
					 };

					
					solarFactory.SolarAll=function(addSolarAll)
					{
					
					return $http.post('/api/CheckSolarAll',addSolarAll);

					};
			return solarFactory;

	}); 


  
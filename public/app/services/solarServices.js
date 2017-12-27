angular.module('solarServices',[])
	.factory('Solar',function($http)
	{
			var solarFactory={};


					solarFactory.create=function(addSolarData)
					{
							return $http.post('/api/solarsUser',addSolarData);

					};
					
				    solarFactory.getUsers=function()
					 {
					 		return $http.get('/api/solarsUser');
					 		
					 };

					
					solarFactory.SolarAll=function(addSolarAll)
					{
					
					return $http.post('/api/CheckSolarAll',addSolarAll);

					};
					 solarFactory.SearchAllByIddeleteSolar=function(deleteSolarDatas)
						 {
							
							return $http.post('/api/deleteByIdsolar',deleteSolarDatas);

						 };
						 solarFactory.solarDataDeleteAllSolar=function()
						 {
						 		   return $http.delete('/api/managedeletesolar');
						 };
						  solarFactory.solarDataDeleteAllSolardata=function()
						 {
						 		   return $http.delete('/api/managedeletesolardata');
						 };
						
			return solarFactory;

	}); 


  
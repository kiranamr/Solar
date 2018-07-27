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
					 solarFactory.getUserDashboard=function()
					 {
					 		return $http.get('/api/solarsUserDashboard');
					 		
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
						 solarFactory.removeSolarUsers=function(id)
							{
							console.log('id is' +id);
          					   return $http.delete('/api/manageUsers/'+id);
							};
							solarFactory.removeSolarUserDatas=function(id)
							{
							console.log('id is' +id);
          					   return $http.delete('/api/manageUsersData/'+id);
							};
						
			return solarFactory;

	}); 


  
angular.module('solarDataServices',[])
		.factory('SolarData',function($http,$routeParams)
		{
			var solardataFactory={};
				console.log('solardataFactory'+$routeParams.id);

						solardataFactory.create=function(addSolarData)
						{
							return $http.post('/api/solarsUserdata',addSolarData);

						};	

					    solardataFactory.getUsers=function()
						 {
						 		return $http.get('/api/solarsUserdata');
						 		
						 };
						 	 
						solardataFactory.checkinSearch=function(addCheckindate)
						{
							
							return $http.post('/api/CheckIndate',addCheckindate);

						};

						solardataFactory.getRadiocheckindate=function()
						 {
						 		return $http.get('/api/CheckIndateSearch');
						 };

						 solardataFactory.SearchAll=function(addSearchAll)
						 {
							
							return $http.post('/api/CheckSearchAll',addSearchAll);

						 };
												
						 solardataFactory.getSolarsAll=function()
						 {
						 		return $http.get('api/viewsolarvalues/'+$routeParams.id);
						 };

						  solardataFactory.getSearchAll=function()
						 {
						 		return $http.get('api/viewsolar/'+$routeParams.id);
						 };
       						
       						solardataFactory.removeSolars=function(id)
							{
							console.log('id is' +id);
          					   return $http.delete('/api/manage/'+id);
							};

							solardataFactory.SerarchTag=function()
							{
							console.log('id is' +id);
          					   return $http.delete('/api/managedelete');
							};
						 solardataFactory.getRadioSearchAll=function()
						 {
						 		return $http.get('/api/SearchALL');
						 };

						 solardataFactory.getRadio1SearchAll=function()
						 {
						 		return $http.get('/api/SearchALL');
						 };

						  solardataFactory.getRadioSearchAll=function()
						 {
						 		return $http.get('/viewsolar/:id');
						 };
						  solardataFactory.SearchAllByIds=function(SearchSolarData)
						 {
							
							return $http.post('/api/SerchByIdAndDate',SearchSolarData);

						 };
						  solardataFactory.SearchAllByIddelete=function(deleteSolarData)
						 {
							
							return $http.post('/api/deleteById',deleteSolarData);

						 };
						 


						 
						  solardataFactory.getRadio2SearchAll=function()
						 {
						 		return $http.get('/api/SerchByIdAndDate');
						 };
						  solardataFactory.solarDataDeleteAll=function()
						 {
						 		   return $http.delete('/api/managedelete');
						 };
						 
                          solardataFactory.solarDataDeleteAllsolardata=function()
						 {
						 		   return $http.delete('/api/managedeletesolardata');
						 };
						 solardataFactory.SearchSolarAll=function()
							{		
								return $http.get('/api/solarreport');

							};

						 
						
						 
			return solardataFactory;

		}); 


		  
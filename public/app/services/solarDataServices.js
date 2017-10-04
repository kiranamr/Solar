angular.module('solarDataServices',[])
		.factory('SolarData',function($http,$routeParams)
		{
			var solardataFactory={};
				console.log('solardataFactory'+$routeParams.id);

						solardataFactory.create=function(addSolarData)
						{
							return $http.post('/api/solarsdatain',addSolarData);

						};	

					    solardataFactory.getUsers=function()
						 {
						 		return $http.get('/api/solarsdatain');
						 		
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
						  solardataFactory.getRadio2SearchAll=function()
						 {
						 		return $http.get('/api/SerchByIdAndDate');
						 };

						 		 solardataFactory.SearchSolarAll=function()
					{
						
						return $http.get('/api/solarreport');

					};

						 
						
						 
			return solardataFactory;

		}); 


		  
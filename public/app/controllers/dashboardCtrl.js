angular.module('dashboardControllers',[])
		.controller('dashboardCtrl',function($scope,Solar,$http,SolarData)
		{
		 		 $scope.solars={};
		 		 console.log($scope.solars);
			   	 var app=this;
		     	 app.loading=true;
		    	 app.errorMsg=false;
		         app.successMsg=false;
		 

		  function getSolars()
      {
        
				 Solar.getUsers().then(function(data)
				 {
				   		console.log(data); 
				        $scope.solars=data.data;			      
				        console.log($scope.solars);
				 }); 
        };
     getSolars();
   
 app.SerarchTags=function(deleteSolarDatas)
                 {  
                      console.log('form submitted');
            
                      Solar.SearchAllByIddeleteSolar(app.deleteSolarDatas).then(function(data) 
                        {
                           console.log(data); 
                        });

                      Solar.solarDataDeleteAllSolar().then(function(data) 
                        {           
                           $scope.solar=data.data;
                        });
                     Solar.solarDataDeleteAllSolardata().then(function(data) 
                        {           
                           $scope.solar=data.data;
                        });
            
                 getSolars();

                   };

				 $scope.onRowHover = function(row) {
				 console.log(row);
		}
});

       
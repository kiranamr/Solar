angular.module('dashboardControllers',[])
		.controller('dashboardCtrl',function($scope,Solar,$http,SolarData,$timeout,$location)
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
                      if (confirm('Are you sure you want to delete this?')) {
                      Solar.SearchAllByIddeleteSolar(app.deleteSolarDatas).then(function(data) 
                        {
                           console.log(data.data.success);
               				console.log(data.data.message);
               				if(data.data.success)
              				 {

               	  				  
                   					 app.successMsg=alert(data.data.message);               
          
             			  } 
             			  else
              			 {
               	    				app.loading=false;
                   					 app.errorMsg=data.data.message;
                    
                   
               			}

                        });

         


                      Solar.solarDataDeleteAllSolar().then(function(data) 
                        {           
                           $scope.solar=data.data;
                        });
                     Solar.solarDataDeleteAllSolardata().then(function(data) 
                        {           
                           $scope.solar=data.data;
                        });

                   $scope.SolarAll=null;
                   $timeout(function(){$location.path('/dashboard');
				             	window.location.reload(true);
				              	app.successMsg=false;},2000);
            
                 getSolars();


                   };
               }

                    app.removeSolarUser=function(id){ 
          console.log('id is'+id);
            if (confirm('Are you sure you want to delete this?')) {
         
    
          Solar.removeSolarUsers(id).then(function(data){
            if(data.data.success)
            {
            	app.successMsg=alert(data.data.message);
              getSolars();
            }
            else
            {
              app.errMsg=alert(data.data.message);
            }
          });
           SolarData.removeSolarUserDatas(id).then(function(data){
           console.log('deleted ');
          });
        };
    }
  

				 $scope.onRowHover = function(row) {
				 console.log(row);
		}
});

       
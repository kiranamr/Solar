
angular.module('UserDashboardControllers',[])
		.controller('userDashboardCtrl',function($scope,Auth,Solar,$http,SolarData,$timeout,$location)
		{
          $scope.solars=[];
          $scope.pageSize=5;
         $scope.currentPage=1;
         $scope.userid='';
         console.log($scope.userid);
		 		 console.log($scope.solars);
			   	 var app=this;
		     	 app.loading=true;
		    	 app.errorMsg=false;
		         app.successMsg=false;
             Auth.getUser().then(function(data)
             {
               console.log(data);
               console.log(data.data.email);
             
               app.useremail=data.data.email;
               app.usermobile=data.data.mobile;
               app.userfirstname=data.data.firstname;
               app.userlastname=data.data.lastname;
               app.isAdmin=data.data.isAdmin;
               app.S_id=data.data.S_id;
               userid=data.data.S_id;
               app.loadme=true; 
               console.log(userid);
             });
            
		  function getSolars()
      {
        
				 Solar.getUserDashboard().then(function(data)
				 {
				   		console.log(data); 
				        $scope.solars=data.data;			      
				        console.log($scope.solars);
				 }); 
        };
     getSolars();
     
  $scope.column = 'slno';
        // sort ordering (Ascending or Descending). Set true for desending
 $scope.reverse = false; 
 
 // called on header click
 $scope.sortColumn = function(col){
  $scope.column = col;
  if($scope.reverse){
   $scope.reverse = false;
   $scope.reverseclass = 'arrow-up';
  }else{
   $scope.reverse = true;
   $scope.reverseclass = 'arrow-down';
  }
 };
 
 // remove and change class
 $scope.sortClass = function(col){
  if($scope.column == col ){
   if($scope.reverse){
    return 'arrow-down'; 
   }else{
    return 'arrow-up';
   }
  }else{
   return '';
  }
 } 
     
        
    
        
    
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

       
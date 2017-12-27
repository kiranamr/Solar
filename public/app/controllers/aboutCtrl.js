angular.module('aboutControllers',[])
		.controller('aboutCtrl',function($scope,User,$http)
		{
		 		 $scope.users={};
		 		 console.log($scope.solars);
			   	 var app=this;
		     	 app.loading=true;
		    	 app.errorMsg=false;
		         app.successMsg=false;
		 

		  function getSolars()
      {
        
				 User.getUsers().then(function(data)
				 {
				   		console.log(data); 
				        $scope.users=data.data;			      
				        console.log($scope.users);
				 }); 
        };
     getSolars();
   
 app.removeUser=function(id){ 
          console.log('id is'+id);
          User.removeUsers(id).then(function(data){
            if(data.data.success)
            {
              getSolars();
            }
            else
            {
              app.errMsg=alert(data.data.message);
            }
          });
        };
});

       
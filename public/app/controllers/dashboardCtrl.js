angular.module('dashboardControllers',[])
		.controller('dashboardCtrl',function($scope,Solar,$http)
		{
		 		 $scope.solars={};
		 		 console.log($scope.solars);
			   	 var app=this;
		     	 app.loading=true;
		    	 app.errorMsg=false;
		         app.successMsg=false;
		 
				 Solar.getUsers().then(function(data)
				 {
				   		console.log(data); 
				        $scope.solars=data.data;			      
				        console.log($scope.solars);
				 });
				 $scope.onRowHover = function(row) {
				 console.log(row);
		}
});

       
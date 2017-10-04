angular.module('solarControllers',['solarServices'])
.controller('soarCtrl',function($timeout,$location,$scope,$http,Solar)
{
	     var app=this;
	     app.addTag=function(addSolarData)
      	{  
        		app.loading=true;
        		app.errorMsg=false;
        		app.successMsg=false;
          	console.log('form submitted')  
      	
      	    Solar.create(app.addSolarData).then(function(data) 
      	    {

               console.log(data.data.success);
               console.log(data.data.message);
               if(data.data.success)
               {
               	    app.loading=false;
                    app.successMsg=data.data.message+'...Redirecting';
                    $timeout(function(){$location.path('/');
                    window.location.reload(true);
                    app.successMsg=false;},3000);
               } 
               else
               {
               	    app.loading=false;
                    app.errorMsg=data.data.message;
                    $timeout(function(){$location.path('/solar');
                    window.location.reload(true);
                    app.errorMsg=false;},3000);
               }

      	   });
        };
});
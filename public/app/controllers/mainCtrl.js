angular.module('mainControllers',['authServices'])
		.controller('mainCtrl',function(Auth,$timeout,$location,$rootScope)
		{
				 var app=this;
		 		 app.loadme=false;

				$rootScope.$on('$routeChangeStart',function()
				{
					if(Auth.isLoggedIn())
					{
						console.log('Success:User is logged in .');
						app.isLoggedIn=true;
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
							app.loadme=true; 
						});
					  
					}
					
					else
					{
						console.log('Failure :User is Not logged in .');
						app.isLoggedIn=false;
						app.email='';
						app.loadme=true;
					}

				});
			
				app.doLogin=function(loginData)
				{  
					app.loading=true;
					app.errorMsg=false;
					app.successMsg=false;
					console.log('form submitted')  
			
					Auth.login(app.loginData).then(function(data) 
					{
						console.log(data);
						console.log(data);
				         console.log(data.data);
				         console.log(data.data.message);
				         if(data.data.success)
				         {
							if(data.data.message=='admin1@gmail.com'||data.data.message=='admin2@gmail.com'||data.data.message=='admin3@gmail.com')
							{
							   app.loading=false;
							   app.successMsg='Redirecting....';
							   $timeout(function(){$location.path('/dashboard');
							  window.location.reload(true);
							   app.successMsg=false;},3000);
						   
							}
							else{
							   app.loading=false;
							   app.successMsg='Redirecting....';
							   $timeout(function(){$location.path('/userDashboard');
							  window.location.reload(true);
							   app.successMsg=false;},3000);
						   
							}
				         } 
				         else
				         {
				         	   app.loading=false;
				               app.errorMsg=data.data.message;
				               $timeout(function(){$location.path('/');
				               window.location.reload(true);
				               app.errorMsg=false;
				              },3000);
				         }

					});
				};
				app.logout=function()
				 {
				 	Auth.logout();
				 	$location.path('/logout');
				 	$timeout(function()
				 	{
				 		$location.path('/');
				 	},2000); 
				 };
});
angular.module('userServices',[])
	.factory('User',function($http)
	{
		var userFactory={};

			userFactory.create=function(regData)
			{
				return $http.post('/api/users',regData);
			};
			
			userFactory.getUsersAll=function()
			 {
			 		return $http.get('/api/checkuser');
			 };
			 userFactory.getUsers=function()
					 {
					 		return $http.get('/api/checkuser');
					 		
					 };
			userFactory.removeUsers=function(id)
							{
							console.log('id is' +id);
          					   return $http.delete('/api/manageemail/'+id);
							};
							userFactory.getPermission=function()
							{
							
          					   return $http.get('/api/permission');
							};


							
						 
		return userFactory;
	});


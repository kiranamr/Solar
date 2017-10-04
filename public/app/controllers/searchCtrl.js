angular.module('searchControllers',[])
    .controller('searchCtrl',function($http,$location,$timeout,SolarData,$scope)
    {
          	     var app=this;
                 $scope.solardatas=[];
                 console.log('scope solardatas'+$scope.solardatas);
                 app.addTagSerachAll=function(addSearchAll)
                 {  

                      app.loading=true;
                      app.errorMsg=false;
                      app.successMsg=false;
                      console.log(addSearchAll);
                      console.log('form submitted');
            
                      SolarData.SearchAll(app.addSearchAll).then(function(data) 
                      {
                           console.log(data); 
                      });
            
                      SolarData.getRadio1SearchAll(app.addSearchAll).then(function(data) 
                      {

                          //console.log('radio solardatas'+data); 
                          $scope.solardatas=data.data;
                
                          //console.log($scope.solardatas);
                  

                      });

                   };
    });
angular.module('reportControllers',[])
    .controller('reportCtrl',function($http,$location,$timeout,Solar,SolarData,$scope)
    {
    	   var app=this;
         $scope.names = [];
         $scope.values = ["Minute", "Hour", "Day","Week","Month","Year"];
         $scope.intervals = ["01", "02", "05","10","15","30","60"];
         $scope.solardatas=[];
         

       
                 console.log('scope solardatas'+$scope.solardatas);
                 app.SerarchTag=function(SearchSolarData)
                 {  

                      app.loading=true;
                      app.errorMsg=false;
                      app.successMsg=false;
                     
                      console.log('form submitted');
            
                      SolarData.SearchAllByIds(app.SearchSolarData).then(function(data) 
                      {
                           console.log(data); 
                      });
            
                    SolarData.getRadio2SearchAll(app.SearchSolarData).then(function(data) 
                      {

                          //console.log('radio solardatas'+data); 
                          $scope.solardatas=data.data;
                
                          //console.log($scope.solardatas);
                  

                      });

                   };
        SolarData.SearchSolarAll().then(function(data) 
        {

             
             $scope.names = data.data;
             
        });
      
});
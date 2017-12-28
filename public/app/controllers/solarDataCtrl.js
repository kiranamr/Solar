angular.module('solardataControllers',[])
.controller('solarDataCtrl',function($http,$location,$timeout,SolarData,$scope, ngTableParams)
{
    var app=this;
    $scope.show = 1;
$scope.solardatas=[];
$scope.pageSize=10;
$scope.currentPage=1;
  var  data=[{"name": "Moroni", "age": 50},
                {"name": "Tiancum", "age": 43},
               ];
    $scope.solarsdata=[];
      function getSolars()
      {
        SolarData.getSearchAll().then(function(data) 
          {        
           $scope.solardatas=data.data;
              console.log($scope.solardatas);
         });
        };
     getSolars();
      console.log(data);
       $scope.tableParams = new ngTableParams({
        page: 1,            // show first page
        count: 10           // count per page
    }, {
        total:data.length, // length of data
        getData: function($defer, params) {
            $defer.resolve(data.slice((params.page() - 1) * params.count(), params.page() * params.count()));
        }
    });
   
 app.SerarchTag=function(deleteSolarData)
                 {  
                      console.log('form submitted');
            
                      SolarData.SearchAllByIddelete(app.deleteSolarData).then(function(data) 
                        {
                           console.log(data); 
                        });

                      SolarData.solarDataDeleteAll().then(function(data) 
                        {           
                           $scope.solardatas=data.data;
                        });

            
                 getSolars();

                   };




     app.removeSolar=function(id){ 
          console.log('id is'+id);
           if (confirm('Are you sure you want to delete this?')) {
          SolarData.removeSolars(id).then(function(data){
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
        };
      };
  
     SolarData.getSolarsAll().then(function(data) 
     {
          $scope.solarsdata=data.data;
          FusionCharts.ready(function(){
          var fusioncharts = new FusionCharts({
                                                type:'zoomline',
                                                renderAt: 'chart-container',
                                                height:'300%',
                                                width: '100%',
                                                dataFormat: 'json',
                                                dataSource: data.data
                                                });
                                          fusioncharts.render();
                                        });
    });


});
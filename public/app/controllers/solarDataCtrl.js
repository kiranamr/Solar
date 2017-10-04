angular.module('solardataControllers',[])
.controller('solarDataCtrl',function($http,$location,$timeout,SolarData,$scope)
{
    var app=this;
    $scope.show = 1;

    $scope.solardatas=[];
    $scope.solarsdata=[];
     SolarData.getSearchAll().then(function(data) 
     {        
          $scope.solardatas=data.data;
          
     });
  
     SolarData.getSolarsAll().then(function(data) 
     {
          $scope.solarsdata=data.data;
          FusionCharts.ready(function(){
          var fusioncharts = new FusionCharts({
                                                type: 'msline',
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
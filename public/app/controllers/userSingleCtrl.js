angular.module('UserSingleControllers',[])
.controller('solarDataCtrl',function($http,$location,$timeout,SolarData,$scope, ngTableParams)
{
    var app=this;
    $scope.show = 1;
$scope.solardatas=[];

$scope.pageSize=5;
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
     
          SolarData.create(app.addSolarData).then(function(data) 
            {
                   console.log("solar data posted values"+ data);
                   console.log(data.data.success); 
                   console.log(data.data.message);
                   if(data.data.success)
                   {
                        app.loading=false;
                        app.successMsg=data.data.message;
						console.log("solar data posted values"+data);
                       

                   } 
                   else 
                   {
                    
                         app.loading=false;
                         app.errorMsg=data.data.message;
                        
                   }

            });


});
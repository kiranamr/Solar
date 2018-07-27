var app=angular.module('reportControllers',[]);

  app.controller('reportCtrl',function($http,$location,$timeout,Solar,SolarData,$scope)
    {
    	   var app=this;
         $scope.show = 1;
         $scope.names = [];
         $scope.namev = [];
         $scope.values = ["Minute", "Hour", "Day","Week","Month","Year"];
         $scope.intervals = ["01", "02", "05","10","15","30","60"];
         $scope.solardatas=[];
         $scope.pageSize=5;
         var rows=[];
$scope.currentPage=1;


function getSolars()
{
  
           Solar.getUsers().then(function(data)
           {
                     console.log(data); 
                  $scope.namev=data.data;			      
                  console.log($scope.namev);
           }); 
  };

  //console.log('solardatas'+$scope.solardatas);
getSolars();
$scope.export = function(){
   // console.log('solardatas'+$scope.solardatas);

    var columns = ["SlNo","S_id", "RtuConnectivity", "RtuLastConnected","DcVolt","OutputVolt","OutputAmpere","OutputPower","TotalPower","VfdSpeed","OutputFrequency","FlowRate","PumprunHour","VfdStatus"];
var res = $.map($scope.solardatas, function(value, index) {
    return [value];});
    var outputData=[];
  //console.log(res);
  var count=1;
  for (var i in res) {
      
    // i is the property name
    outputData.push([count,res[i].S_id,res[i].rtuConnectivity,res[i].rtuLastConnected,res[i].dcVolt,res[i].outputVolt,res[i].outputAmpere,res[i].outputPower,res[i].totalPower,res[i].vfdSpeed,res[i].outputFrequency,res[i].flowRate,res[i].pumprunHour,res[i].vfdStatus]);
      count=count+1;
}
//console.log(outputData);
 
  
  
var doc = new jsPDF('l', 'pt', 'a3');
doc.autoTable(columns,outputData,{columnStyles: {
    0: {columnWidth: 50},
    1: {columnWidth: 80},
    2: {columnWidth: 100},
    3: {columnWidth: 100},
    4: {columnWidth: 60},
    5: {columnWidth: 70},
    6: {columnWidth: 80},
    7: {columnWidth: 80},
    8: {columnWidth: 80},
    9: {columnWidth: 80},
    10: {columnWidth: 100},
    11: {columnWidth: 80},
    12: {columnWidth: 80},
    13: {columnWidth: 80},
    14: {columnWidth: 80}}});
doc.save('table.pdf');
   /* html2canvas(document.getElementById('mytable'), {
        onrendered: function (canvas) {
            var data = canvas.toDataURL();
            var docDefinition = {
                content: [{
                    image: data,
                    width: 500,
                }]
            };
            pdfMake.createPdf(docDefinition).download("test.pdf");
        }
    });*/
 }
 
       
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
                rows=data.data;
                          //console.log($scope.solardatas);
                  

                      });

                   };
        SolarData.SearchSolarAll().then(function(data) 
        {

             
             $scope.names = data.data;
             
        });
      
});

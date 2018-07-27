
var app=angular.module('UserReportControllers',[]);

  app.controller('reportUserCtrl',function($http,$location,$timeout,Solar,SolarData,$scope)
    {
    	   var app=this;
         $scope.show = 1;
         $scope.names = [];
         $scope.namev = [];
         $scope.values = ["Minute", "Hour", "Day","Week","Month","Year"];
         $scope.intervals = ["01", "02", "05","10","15","30","60"];
         $scope.solardatas=[];
         $scope.pageSize=5;
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

getSolars();
$scope.export = function(){
    // console.log('solardatas'+$scope.solardatas);
 
     var columns = ["S_id", "RtuConnectivity", "RtuLastConnected","DcVolt","OutputVolt","OutputAmpere","OutputPower","TotalPower","VfdSpeed","OutputFrequency","FlowRate","PumprunHour","VfdStatus"];
 var res = $.map($scope.solardatas, function(value, index) {
     return [value];});
     var outputData=[];
   //console.log(res);
   for (var i in res) {
     // i is the property name
     outputData.push([res[i].S_id,res[i].rtuConnectivity,res[i].rtuLastConnected,res[i].dcVolt,res[i].outputVolt,res[i].outputAmpere,res[i].outputPower,res[i].totalPower,res[i].vfdSpeed,res[i].outputFrequency,res[i].flowRate,res[i].pumprunHour,res[i].vfdStatus]);
 }
 //console.log(outputData);
  
   
   
 var doc = new jsPDF('l', 'pt', 'a3');
 doc.autoTable(columns,outputData,{columnStyles: {
     0: {columnWidth: 80},
     1: {columnWidth: 100},
     2: {columnWidth: 100},
     3: {columnWidth: 80},
     4: {columnWidth: 80},
     5: {columnWidth: 80},
     6: {columnWidth: 80},
     7: {columnWidth: 80},
     8: {columnWidth: 80},
     9: {columnWidth: 100},
     10: {columnWidth: 80},
     11: {columnWidth: 80},
     12: {columnWidth: 80},
     13: {columnWidth: 80}}});
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
                 app.SearchUserTag=function(SearchUserSolarData)
                 {  

                      app.loading=true;
                      app.errorMsg=false;
                      app.successMsg=false;
                     
                      console.log('form submitted');
            
                      SolarData.SearchAllByUserIds(app.SearchUserSolarData).then(function(data) 
                      {
                           console.log(data); 
                      });
            
                    SolarData.getRadio2SearchUserAll(app.SearchUserSolarData).then(function(data) 
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

var User=require('../models/user');
var json2xls=require('json2xls');
var Solar=require('../models/soalr');

var Sensor=require('../models/SensorValueData')
var SolarData=require('../models/solardatas');
var Admin=require('../models/admin');
var server= require('http');
var jwt=require('jsonwebtoken');
var mongoXlsx = require('mongo-xlsx');
var json2xls=require('json2xls');
var window=require('window');
var fs = require('file-system');
const csvReport = require('csv-report');
var http = require('http');
var json2csv = require('json2csv');
var fs1 = require('fs');
var pdf = require('html-pdf');
var htmlToPdf = require('html-to-pdf');
var html ;
var options = { format: 'Letter' };



//require(lubridate);

//var mongoXlsx = require('mongo-xlsx');
var fieldNames = [  'SolarUserId',
					'Customer',
					 'RTU Connectivity' ,
					 'RTU Last Connected',
					 'DC Volt  (V)',
					 'O/P Volt (V)',
					 'O/P Ampere',
					 'O/P Power (KW)',
					 'Total Power(KW)',
					 'VFD Speed (rpm)',
					 'Output Frequency (Hz)',
					 'Flowrate (LPM)',
					 'Pump Run Hour',
					 'VFD Status/Faults'
					 ];

//var mongoXlsx = require('mongo-xlsx');
var fields = [  'S_id',
				'customer',
				'rtuConnectivity',
				'rtuLastConnected',
				'dcVolt',
				'outputVolt', 
				'outputAmpere', 
				'outputPower',
				'totalPower',
				'vfdSpeed',
				'outputFrequency',
				'flowRate',
				'pumprunHour',
				'vfdStatus'
				];

var fs = require('file-system');
var secret ='kiran';
/*var CheckInDate=new Date();
		var d=CheckInDate.getDate();
		var m=CheckInDate.getMonth()+1;
		var y=CheckInDate.getFullYear();
		if (d < 10) 
		{
  		  d = '0' + d;
        }
        if (m < 10)
        {
          m = '0' + m;
        }
		CheckInDate=y+'-'+m+'-'+d;
var CheckOutDate=new Date();
var cd=CheckOutDate.getDate();
		if(cd<=31)
		{
		 cd=cd+2;
		}
		else 
		{
		cd=1;
		}
		

		var cm=CheckOutDate.getMonth()+1;
		var cy=CheckOutDate.getFullYear();
		if (cd < 10) 
		{
  		   cd = '0' + cd;
        }
        if (cm < 10) 
        {
          cm = '0' + cm;
        }
		CheckOutDate=cy+'-'+cm+'-'+cd;*/

module.exports=function(router)
{
					
					var chartData;
						router.post('/solarsUser',function(req,res)
						{    var solartable=new Solar();
							//var solardatatable=new models.SolarData();
							var date=new Date();
							var monthNames = [
								"Jan", "Feb", "Mar",
								"Apr", "May", "Jun", "Jul",
								"Aug", "Sep", "Oct",
								"Nov", "Dec"
							  ];
							  var day = date.getDate();
							  var monthIndex = date.getMonth();
							  var year = date.getFullYear();
							  var hour=date.getHours();
							  var minute=date.getMinutes();
							
							  console.log( day + '-' + monthNames[monthIndex] + '-' + year+' '+hour+':'+minute);
							solartable.S_id=req.body.S_id;
							solartable.customer=req.body.customer;
							solartable.rtuConnectivity=req.body.rtuConnectivity;
							solartable.rtuLastConnected=day + ' ' + monthNames[monthIndex] + ' ' + year+' '+hour+':'+minute;
							solartable.dcVolt=req.body.dcVolt;
							solartable.outputVolt=req.body.outputVolt;
							solartable.outputAmpere=req.body.outputAmpere;
							solartable.outputPower=req.body.outputPower;
							solartable.totalPower=req.body.totalPower;
							solartable.vfdSpeed=req.body.vfdSpeed;
							solartable.outputFrequency=req.body.outputFrequency;
							solartable.flowRate=req.body.flowRate;
							solartable.pumprunHour=req.body.pumprunHour;
							solartable.vfdStatus=req.body.vfdStatus;
							User.findOne({S_id:req.body.S_id},function(err,users){
								if(err) throw err;
									
								if(!users){
									res.json({ success: false, message: 'customer id not exists  !!!' });
								}
								else{
									Solar.findOne({S_id:req.body.S_id},function(err,solars)
									{
										 if(err) throw err;
										
										if(solars){
															res.json({ success: false, message: 'customer id already exists  !!!' }); // Return an error
														}
														 else 
														 {
															solartable.save(function(err)
															{
	
																if (err) throw err;
																return res.json({success:true, message:'Solar created !'});
																						
								
															 });
														}
	
										
	
	
									});	
								}
							});
								
								
							});
						router.post('/Sensorvalues',function(req,res)
						{   //var solartable=new models.Solar();
							var solardatatable=new Sensor();
							solardatatable.S_id=req.body.S_id;
							//solardatatable.Customer=req.body.Customer;
							var date=new Date();
						     solardatatable.Moisture=req.body.Moisture;
							solardatatable.Temperature=req.body.Temperature;
							solardatatable.TimeStamp=date;
							solardatatable.Parameter1=req.body.Parameter1;
							solardatatable.Parameter2=req.body.Parameter2;
							solardatatable.Parameter3=req.body.Parameter3;
							solardatatable.Parameter4=req.body.Parameter4;
							solardatatable.Parameter5=req.body.Parameter5;
							solardatatable.Parameter6=req.body.Parameter6;
							solardatatable.DigitalAnalog=req.body.DigitalAnalog;
							
							
					                    				solardatatable.save(function(err)
														{

															if (err) throw err;
															return res.json({success:true, message:'Sensor value inseted !'});
																					
							
													     });
					                				

							
							
								
							});

							router.get('/Sensorvalues',function(req,res)
					{
							// get all the users
							console.log('I recived a get request');
							Sensor.find(function(err,sensordatas) {	 
																			if (err)
																	  		res.send(err );
																	  	 	res.json(sensordatas);
																	}); 
					});
							router.post('/solarsUserdata',function(req,res)
							{   //var solartable=new models.Solar();
								var solardatatable=new SolarData();
								solardatatable.S_id=req.body.S_id;
								//solardatatable.Customer=req.body.Customer;
								var date=new Date();
								var monthNames = [
									"Jan", "Feb", "Mar",
									"Apr", "May", "Jun", "Jul",
									"Aug", "Sep", "Oct",
									"Nov", "Dec"
								  ];
								  var day = date.getDate();
								  var monthIndex = date.getMonth();
								  var year = date.getFullYear();
								  var hour=date.getHours();
								  var minute=date.getMinutes();
								solardatatable.rtuConnectivity=req.body.rtuConnectivity;
								solardatatable.rtuLastConnected=day + '-' + monthNames[monthIndex] + '-' + year+' '+hour+':'+minute;
								solardatatable.dcVolt=req.body.dcVolt;
								solardatatable.outputVolt=req.body.outputVolt;
								solardatatable.outputAmpere=req.body.outputAmpere;
								solardatatable.outputPower=req.body.outputPower;
								solardatatable.totalPower=req.body.totalPower;
								solardatatable.vfdSpeed=req.body.vfdSpeed;
								solardatatable.outputFrequency=req.body.outputFrequency;
								solardatatable.flowRate=req.body.flowRate;
								//solardatatable.onTime=req.body.onTime;
								solardatatable.pumprunHour=req.body.pumprunHour;
								solardatatable.vfdStatus=req.body.vfdStatus;
								
									Solar.findOne({S_id:req.body.S_id},function(err,solars)
									{
										 if(err) throw err;
	
											if (!solars){
															res.json({ success: false, message: 'No customers id or name was found' }); // Return an error
														}
														 else 
														 {
															Solar.update({'S_id':req.body.S_id}, {$set:
																 {
																rtuConnectivity:req.body.rtuConnectivity,
																rtuLastConnected:day + '-' + monthNames[monthIndex] + '-' + year+' '+hour+':'+minute,
																dcVolt:req.body.dcVolt,
																outputVolt:req.body.outputVolt,
																outputAmpere:req.body.outputAmpere,
																outputPower:req.body.outputPower,
																totalPower:req.body.totalPower,
																vfdSpeed:req.body.vfdSpeed,
																outputFrequency:req.body.outputFrequency,
																flowRate:req.body.flowRate,
																pumprunHour:req.body.pumprunHour,
																vfdStatus:req.body.vfdStatus}}, {w:1}, function(err, result){
																console.log(result);});
															solardatatable.save(function(err)
															{
	
																if (err) throw err;
																return res.json({success:true, message:'Solar data created !'});
																						
								
															 });
														}
	
									});	
	
								
									
								});
	
                     router.delete('/manage/:id',function(req,res)
                     {
	     						var deleteUser=req.params.id;
	     							console.log('id is'+deleteUser);
	     				SolarData.remove({_id:deleteUser},function(err,solardatas)
	     				{
	     					if(err) throw err;
	     					res.json({success:true,message:'Solar data deleted'});

	     				}) ;

	     			}) ;       


router.delete('/manageUsers/:id',function(req,res)
                     {
	     						var deleteUser=req.params.id;
	     							console.log('id is'+deleteUser);
	     				Solar.remove({S_id:deleteUser},function(err,solars)
	     				{
	     					if(err) throw err;
	     					res.json({success:true,message:'Solar data and Solar userdata deleted'});

	     				}) ;

	     			}) ;  
  router.delete('/manageemails/:id',function(req,res)
                     {
	     						var deleteUsers=req.params.id;
	     							console.log('id is'+deleteUsers);
	     				Solar.remove({customer:deleteUsers},function(err,users)
	     				{
	     					if(err) throw err;
	     					res.json({success:true,message:'Solar data deleted'});

	     				}) ;

	     			}) ;  

router.delete('/manageUsersData/:id',function(req,res)
                     {
	     						var deleteUser=req.params.id;
	     							console.log('id is'+deleteUser);
	     				SolarData.remove({S_id:deleteUser},function(err,solardatas)
	     				{
	     					if(err) throw err;
	     					res.json({success:true,message:'Solar data deleted'});

	     				}) ;

	     			}) ;
	     			  
	     			  router.delete('/manageemail/:id',function(req,res)
                     {
	     						var deleteUsers=req.params.id;
	     							console.log('id is'+deleteUsers);
	     				User.remove({email:deleteUsers},function(err,users)
	     				{
	     					if(err) throw err;
	     					res.json({success:true,message:'User data deleted'});

	     				}) ;

	     			}) ;       



					router.get('/solarsUserdata',function(req,res)
					{
							// get all the users
							console.log('I recived a get request');
							SolarData.find(function(err,solardatas) {	 
																			if (err)
																	  		res.send(err );
																	  	 	res.json(solardatas);
																	}); 
					});
					

					 router.get('/solarreport',function(req,res)
					{
								// get all the users
								console.log('I recived a get request');
								SolarData.find(function(err,solardatas) {
								 
															    if (err)
															  	res.send(err );
															  	res.json(solardatas);
							
																});			 
					});

					var checkin='';

					router.post('/CheckSolarAll',function(req,res)
					{
							
							 checkin=req.body.solarid;
							 SolarData.find({"S_id":checkin},function(err,solardatas)
							 {
									console.log(solardatas);
									res.json(solardatas);
							 });
					});

					var checkinSearch='';

					router.post('/CheckSearchAll',function(req,res)
					{

							 SolarData.find({"S_id":checkinSearch },function(err,solardatas)
							 {
							
							   res.json(solardatas);

							 });
					});

					router.get('/SearchALL',function(req,res)
					{
							//console.log('I recieved a get request search All')						
							//console.log('Checkinserach value is'+checkinSearch);
							 SolarData.find({"S_id":checkinSearch },function(err,solardatas)
							 {
									console.log(solardatas);
									res.json(solardatas);
							 });
					});



						var SearchId='';
						var SearchFromDate='';
						var SearchToDate='';

					router.post('/SerchByIdAndDate',function(req,res)
					{           SearchId=(req.body.selectedId);
								 SearchFromDate=req.body.selectedFromDate;
								 SearchToDate=req.body.selectedToDate;
								 var date=new Date(SearchFromDate);
								 var date1=new Date(SearchToDate);
								 var monthNames = [
									"Jan", "Feb", "Mar",
									"Apr", "May", "Jun", "Jul",
									"Aug", "Sep", "Oct",
									"Nov", "Dec"
								  ];
								  var day = date.getDate();
								  var monthIndex = date.getMonth();
								  var year = date.getFullYear();
								  var hour=date.getHours();
							  var minute=date.getMinutes();
								  
								  var FromDate =day + '-' + monthNames[monthIndex] + '-' + year+' '+hour+':'+minute;
								  var monthNames1 = [
									"Jan", "Feb", "Mar",
									"Apr", "May", "Jun", "Jul",
									"Aug", "Sep", "Oct",
									"Nov", "Dec"
								  ];
								  var day1 = date1.getDate();
								  var monthIndex1 = date1.getMonth();
								  var year1 = date1.getFullYear();
								  var hour1=date1.getHours();
							  var minute1=date1.getMinutes();
								var ToDate =day1 + '-' + monthNames1[monthIndex1] + '-' + year1+' '+hour1+':'+minute1;
								console.log("from date is "+FromDate);
								console.log("to date is "+ToDate);
								 
								 console.log("Sid is "+SearchId);
								 console.log("from date is "+SearchFromDate);
								 console.log("to date is "+SearchToDate);
								  if(SearchId == null||SearchId == '' ){
								  	SolarData.find({"S_id":SearchId,"rtuLastConnected":{$gte:FromDate,$lt:ToDate}},function(err,solardatas)
							 {
							
							   res.json(solardatas);
							   console.log(solardatas);
							  
		 

							 });
								  }
								  else
								  {
								  	 	SolarData.find({"rtuLastConnected":{$gte:FromDate,$lt:ToDate}},function(err,solardatas)
							 {
							
							   res.json(solardatas);
							   console.log(solardatas);
							    

							 });
								  }

							 
					});
					
					var SearchUserId='';
					var SearchUserFromDate='';
					var SearchUserToDate='';

				router.post('/UserSerchByIdAndDate',function(req,res)
				{         
					  SearchUserId=(req.body.selectedUserId);
							 SearchUserFromDate=req.body.selectedUserFromDate;
							 SearchUserToDate=req.body.selectedUserToDate;
						  
							 var date=new Date( SearchUserFromDate);
							 var date1=new Date(SearchUserToDate);
							 var monthNames = [
								"Jan", "Feb", "Mar",
								"Apr", "May", "Jun", "Jul",
								"Aug", "Sep", "Oct",
								"Nov", "Dec"
							  ];
							  var day = date.getDate();
							  var monthIndex = date.getMonth();
							  var year = date.getFullYear();
							  var hour=date.getHours();
							  var minute=date.getMinutes();
							  var FromDate =day + '-' + monthNames[monthIndex] + '-' + year+' '+hour+':'+minute;
							  var monthNames1 = [
								"Jan", "Feb", "Mar",
								"Apr", "May", "Jun", "Jul",
								"Aug", "Sep", "Oct",
								"Nov", "Dec"
							  ];
							  var day1 = date1.getDate();
							  var monthIndex1 = date1.getMonth();
							  var year1 = date1.getFullYear();
							  var hour1=date1.getHours();
							  var minute1=date1.getMinutes();
							  
							var ToDate =day1 + '-' + monthNames1[monthIndex1] + '-' + year1+' '+hour1+':'+minute1;
							console.log("from date is "+FromDate);
							console.log("to date is "+ToDate);
							 
							 console.log("Sid is "+SearchUserId);
							 console.log("from date is "+SearchUserFromDate);
							 console.log("to date is "+SearchUserToDate);
							  if(SearchUserId == null||SearchUserId == '' ){
								  SolarData.find({"S_id":SearchUserId,"rtuLastConnected":{$gte:FromDate,$lt:ToDate}},function(err,solardatas)
						 {
						
						   res.json(solardatas);
						   console.log(solardatas);
						  
	 

						 });
							  }
							  else
							  {
									   SolarData.find({"rtuLastConnected":{$gte:FromDate,$lt:ToDate}},function(err,solardatas)
						 {
						
						   res.json(solardatas);
						   console.log(solardatas);
							

						 });
							  }

						 
				});
					
					var deleteId='';

					router.post('/deleteById',function(req,res)
					{           deleteId=(req.body.selectedId);
							
								 
								 console.log("Sid is "+deleteId);
								  if(deleteId == null||deleteId == '' ){
								  	res.json({success:false,message:'Ensure id should provided!'});
								  }
								  else{
								  	SolarData.find({"S_id":deleteId},function(err,solardatas)
																	 {
							
							 												  res.json(solardatas);
							 												  console.log(solardatas);
								  
		 

																	 });

								        }
								  
					                						  	
					});
								 
							
								  
							

							 
					


					     router.delete('/managedelete',function(req,res)
                     {
	     					console.log(deleteId);
	     					

								  	SolarData.findOne({S_id:deleteId},function(err,solardatas)
									{
					         			if(err) throw err;

					            		if (!solardatas)
					            					 {
					                    				res.json({ success: false, message: 'No customers id was found' }); // Return an error
					                				}
					                				else
					                				{		
	     												SolarData.remove({S_id:deleteId},function(err,solardatas)
	     												{
	     													if(err) throw err;
	     													res.json(solardatas);

	     												}) ;
	     											}

	     						}) ;
	     			 });  


var deleteIdsolar='';

					router.post('/deleteByIdsolar',function(req,res)
					{           deleteIdsolar=(req.body.selectedIds);
							
								 
								 console.log("Sid is "+deleteIdsolar);
								  if(deleteIdsolar == null||deleteIdsolar == '' ){
								  	res.json({success:false,message:'Ensure id should provided!'});


								  		//alert('Ensure id should provided!');

								  }
								  else
								  {
								  	Solar.findOne({S_id:deleteIdsolar},function(err,solars)
								{
					         		if(err) throw err;

					            		if (!solars) {
					                    				res.json({ success: false, message: 'No customers id was found' }); // Return an error
					                				}
					                				else{
					                					 	Solar.find({"S_id":deleteIdsolar},function(err,solardatas)
							 									{
							
							   										res.json(solardatas);
							   									console.log(solardatas);
							  
											 					});
					                				}
								  		 
								  });
								}
							
								  });
							

							 
					
var deleteIdsolardata='';
					router.post('/deleteByIdsolardata',function(req,res)
					{           deleteIdsolar=(req.body.selectedIds);
							
								 
								 console.log("Sid is "+deleteIdsolardata);
								  if(deleteIdsolardata == null||deleteIdsolardata == '' )
								  {
								  	res.json({success:false,message:'Ensure id should provided!'});
								  //	alert('Ensure id should provided!');
								  }
								  else
								  {

								  	SolarData.findOne({S_id:deleteIdsolardata},function(err,solardatas)
									{
					         			if(err) throw err;

					            		if (!solardatas)
					            					 {
					                    				res.json({ success: false, message: 'No customers id was found' }); // Return an error
					                				}
					                				else
					                				{
					                						SolarData.find({"S_id":deleteIdsolardata},function(err,solardatas)
							      							{
							
							   								res.json(solardatas);
							  							 	console.log(solardatas);
							  
		 

							 								});
					                				}
 											  
								  });
								}
							
				   });




	     			    router.delete('/managedeletesolar',function(req,res)
                     {
	     					console.log(deleteIdsolar);
	     							
	     				Solar.remove({S_id:deleteIdsolar},function(err,solars)
	     				{
	     					if(err) throw err;
	     					res.json(solars);

	     				}) ;

	     			}) ;    

					     router.delete('/managedeletesolardata',function(req,res)
                     {
	     					console.log(deleteIdsolar);
	     							
	     				SolarData.remove({S_id:deleteIdsolar},function(err,solardatas)
	     				{
	     					if(err) throw err;
	     					res.json(solardatas);

	     				}) ;

	     			}) ;      
      
					 
					 router.get('/UserSerchByIdAndDate',function(req,res)
					{
							//console.log('I recieved a get request search All')						
							//console.log('Checkinserach value is'+checkinSearch);
							var date=new Date( SearchUserFromDate);
							var date1=new Date(SearchUserToDate);
							var monthNames = [
							   "Jan", "Feb", "Mar",
							   "Apr", "May", "Jun", "Jul",
							   "Aug", "Sep", "Oct",
							   "Nov", "Dec"
							 ];
							 var day = date.getDate();
							 var monthIndex = date.getMonth();
							 var year = date.getFullYear();
							 
							 var FromDate =day + '-' + monthNames[monthIndex] + '-' + year+' ';
							 var monthNames1 = [
							   "Jan", "Feb", "Mar",
							   "Apr", "May", "Jun", "Jul",
							   "Aug", "Sep", "Oct",
							   "Nov", "Dec"
							 ];
							 var day = date1.getDate()+1;
							 var monthIndex = date1.getMonth();
							 var year = date1.getFullYear();
							 
						   var ToDate =day + '-' + monthNames1[monthIndex] + '-' + year;
						   console.log("from date is "+FromDate);
						   console.log("to date is "+ToDate);
							console.log('user id is '+SearchUserId)
							 if(SearchUserId == null||SearchUserId == '' ){
								  	SolarData.find({"S_id":SearchUserId,"rtuLastConnected":{$gte:FromDate,$lt:ToDate}},function(err,solardatas)
							 {
							
							  
							  
								var csv = json2csv({ data: solardatas, fields: fields ,fieldNames: fieldNames});
  							res.json(solardatas);
        
								fs1.writeFile('file.csv', csv, function(err) {
  										if (err) throw err;
  								console.log('file saved');
										});
							 });
								  }
								  else{
								  	 	SolarData.find({"S_id":SearchUserId,"rtuLastConnected":{$gte:FromDate,$lt:ToDate}},function(err,solardatas)
							 {

							  
							   	console.log(solardatas);
									var csv = json2csv({ data: solardatas, fields: fields ,fieldNames: fieldNames});
	 								 res.json(solardatas);
	
	   /*res.sendFile(__dirname + '/businesscard.html', {
		   info: info,
	   },
	  pdf.create(fs.readFileSync('app/routes/businesscard.html', 'utf8'), options).toFile('businesscard.pdf', function(err, res) {
		if (err) return console.log(err);
		console.log(res); // { filename: '/app/businesscard.pdf' }
	  })
	);*/
	 
						fs1.writeFile('file.csv', csv, function(err) {
 								 if (err) throw err;
 							 console.log('file saved');
								});

 


							 });
								  }

					});

					router.get('/SerchByIdAndDate',function(req,res)
					{
						var date=new Date( SearchFromDate);
						var date1=new Date(SearchToDate);
						var monthNames = [
						   "Jan", "Feb", "Mar",
						   "Apr", "May", "Jun", "Jul",
						   "Aug", "Sep", "Oct",
						   "Nov", "Dec"
						 ];
						 var day = date.getDate();
						 var monthIndex = date.getMonth();
						 var year = date.getFullYear();
						 
						 var FromDate =day + '-' + monthNames[monthIndex] + '-' + year+' ';
						 var monthNames1 = [
						   "Jan", "Feb", "Mar",
						   "Apr", "May", "Jun", "Jul",
						   "Aug", "Sep", "Oct",
						   "Nov", "Dec"
						 ];
						 var day = date1.getDate()+1;
						 var monthIndex = date1.getMonth();
						 var year = date1.getFullYear();
						 
					   var ToDate =day + '-' + monthNames1[monthIndex] + '-' + year;
					   console.log("from date is "+FromDate);
					   console.log("to date is "+ToDate);
							//console.log('I recieved a get request search All')						
							//console.log('Checkinserach value is'+checkinSearch);
							 if(SearchId == null||SearchId == '' ){
								  	SolarData.find({"rtuLastConnected":{$gte:FromDate,$lt:ToDate}},function(err,solardatas)
							 {
							
							  
							  
								var csv = json2csv({ data: solardatas, fields: fields ,fieldNames: fieldNames});
  							res.json(solardatas);
        
								fs1.writeFile('file.csv', csv, function(err) {
  										if (err) throw err;
  								console.log('file saved');
										});
							 });
								  }
								  else{
								  	 	SolarData.find({"S_id":SearchId,"rtuLastConnected":{$gte:FromDate,$lt:ToDate}},function(err,solardatas)
							 {

							  
							   	console.log(solardatas);
									var csv = json2csv({ data: solardatas, fields: fields ,fieldNames: fieldNames});
	 								 res.json(solardatas);
	
	   /*res.sendFile(__dirname + '/businesscard.html', {
		   info: info,
	   },
	  pdf.create(fs.readFileSync('app/routes/businesscard.html', 'utf8'), options).toFile('businesscard.pdf', function(err, res) {
		if (err) return console.log(err);
		console.log(res); // { filename: '/app/businesscard.pdf' }
	  })
	);*/
	 
						fs1.writeFile('file.csv', csv, function(err) {
 								 if (err) throw err;
 							 console.log('file saved');
								});

 


							 });
								  }

					});
router.get('/downloads', function(req, res)
					{
						   		var path = require('path');
								var mime = require('mime');
							  var file = "file.csv";

							  var filename = path.basename(file);
							  var mimetype = mime.lookup(file);

							  res.setHeader('Content-disposition', 'attachment; filename=' + filename);
							  res.setHeader('Content-type', mimetype);


							  var filestream = fs.createReadStream(file);
							  filestream.pipe(res);
					});
					router.get('/downloadsPdf', function(req, res)
					{
						var pdf = require('html-pdf');
						pdf.create(html).toFile([filepath, ],function(err, res){
						  console.log(res.filename);
						});
						 
						pdf.create(html).toStream(function(err, stream){
						  stream.pipe(fs.createWriteStream('./foo.pdf'));
						});
						 
						pdf.create(html).toBuffer(function(err, buffer){
						  console.log('This is a buffer:', Buffer.isBuffer(buffer));
						});
						 
						 
						// for backwards compatibility
						// alias to pdf.create(html[, options]).toBuffer(callback)
						pdf.create(html [  options], function(err, buffer){});
					});
				

					var sid='';

					router.get('/viewsolar',function(req,res)
					{
							console.log('I recieved a get request parms search All')
	    			         console.log('Checkinserach value is'+sid);
							 SolarData.find({"S_id":sid},function(err,solardatas)
							 {
								console.log(solardatas);
								res.json(solardatas);

							 });
					});

					router.get('/viewsolar/:id',function(req,res)
					{
					    		var sid1=req.params.id;
							  	sid=sid1;
								console.log('I recieved a get request parms search All')
								console.log('Checkinserach value is'+sid1);

								 SolarData.find({"S_id":sid },function(err,solardatas)
							 	{
									console.log(solardatas);
									res.json(solardatas);
							   });
					});
                   

					router.get('/viewsolarvalues/:id',function(req,res)
					{ 
						var sid2=req.params.id;
					    console.log("sid2"+sid2);
							 SolarData.find({S_id:sid2},function(err,solardatas)
							 {
							 	if(err) throw err;
							 	var month=[];
							 	var volts=[];
							 	var amps=[];
							 	var flows=[];
							 	for(index in solardatas)
							 	{
					              var doc=solardatas[index];
					              var Month=doc['outputFrequency'];
					              var Volts=doc['outputVolt'];
					              var Amps=doc['outputAmpere'];
					              var Flow=doc['flowRate'];
					              var v=""+Flow+""; 
					              flows.push({"label":v});
					              volts.push({"value":Volts});

					              amps.push({"value":Amps});
					              month.push({"value":Month});

							 	}
							 	console.log(month);
							 	console.log(volts);
							    console.log(solardatas);

							    var dataset = [
											      {
											        "seriesname" : "outputVolts",
											        "renderAs": "line",
											        "data" : volts
											      },
											      {
											        "seriesname" : "outputAmpere",
											        "renderAs": "line",
											        "data": amps
											      },
											       {
											        "seriesname" : "outputFrequency",
											        "renderAs": "line",
											        "data": month
											      }
											   ];
								var response = {
													"chart": 
													{
											    "caption": "Solar",
											            "subCaption": "solar pump system",
											            "captionFontSize": "14",
											            "subcaptionFontSize": "14",
											            "subcaptionFontBold": "0",
											            "paletteColors": "#01DF01,#FF0000,#FFFF00",
											            "bgcolor": "#ffffff",
											           "showvalues": "0",
            "compactdatamode": "1",
        "pixelsperpoint": "0",
        "linethickness": "1",
          "tooltipGrayOutColor": "#80bfff",
          "theme": "zune"

										       		 },

												"categories": [{
														            "category":flows
											   		          }],
										        "dataset" : dataset
					     
					    					};
									res.json(response);

							 });
					});

				
					router.get('/SearchALLbyId',function(req,res)
					{
							console.log('I recieved a get request search All')
							console.log('Checkinserach value is'+sid);

							 SolarData.find({"S_id":sid },function(err,solardatas)
							 {
								console.log(solardatas);
								res.json(solardatas);

							 });
					});

					router.get('/solarsUser',function(req,res)
					{
							// get all the users
							console.log('I recived a get request');
							Solar.find(function(err,solars) {
							 
							if (err)
							  	res.send(err);
							  	res.json(solars);
							 
					 
					      });
					});
				

					 router.get('/solardatain',function(req,res)
					{
								// get all the users
								console.log('I recived a get request');

								SolarData.find({}).populate('userdata').exec(function (err,solardatas)
								{
								if (err)
								  	res.send(err);
								  	res.json(solardatas);
								  	console.log(solardatas);
								});
					});

					router.get('/solarsin',function(req,res)
					{
							// get all the users
							console.log('I recived a get request');
							Solar.find(function(err,solars) {
							 
							if (err)
							  	res.send(err );
							  	 	res.json(solars);
							  	  

							});
							 
					});
					 

					
					router.get('/users',function(req,res)
					{
					// get all the users
								console.log('I recived a get request');
								User.find({}, function(err, users) {
								  if (err)
								  	res.send(err);

								  	res.json(users);	 
								});
					});

					router.post('/users',function(req,res)
						{
							var user=new User({username: req.body.username});
							user.firstname=req.body.fname;
							user.lastname=req.body.lname;
							
							user.password=req.body.password;
							user.mobile=req.body.mobile;
							user.email=req.body.email;
							user.S_id=req.body.S_id;
							
							
    
    if(req.body.adminCode === 'secretcode123') {
      user.isAdmin = true;
    }
							if(req.body.password==null||req.body.password==''||req.body.email==null||req.body.email==''||req.body.S_id==null||req.body.S_id=='')
							{
								res.json({success:false,message:' email,Sid and password  were provided'});

							}
							else
							{

							user.save(function(err)
							{
									if(err)
									{
										if(err.errors != null)
										{
											if(err.errors.firstname)
											{
											return	res.json({success:false,message:err.errors.firstname.message});
											}
											else
											if(err.errors.lastname)
											{
											return	res.json({success:false,message:err.errors.lastname.message});
											}
											else
											if(err.errors.email)
											{
											return	res.json({success:false,message:err.errors.email.message});
											}
											
											else
											if(err.errors.password)
											{
											return	res.json({success:false,message:err.errors.password.message});
											}
											if(err.errors.mobile)
											{
											return	res.json({success:false,message:err.errors.mobile.message});
											}
											else{
											return	res.json({success:false,message:err});
											}
										}
									    
							else if(err)
							{
								if(err.code == 11000)
								{
									return	res.json({success:false, message:' email or phone number already exists  !!!'});					
							 	}			
								else
								{
								return	res.json({success:false, message: err});
								}
								
							}
							
							}
							else
							{
						return	res.json({success:true, message:'user created !'});
						     }
						    });
							}
							
						}); 

						router.post('/admins',function(req,res)
						{
							var admin=new Admin();
							admin.firstname=req.body.fAname;
							admin.lastname=req.body.lAname;
							
							admin.password=req.body.Apassword;
							admin.mobile=req.body.Amobile;
							admin.email=req.body.Aemail;
							if(req.body.Apassword==null||req.body.Apassword==''||req.body.Aemail==null||req.body.Aemail=='')
							{
								res.json({success:false,message:' email and password were provided'});

							}
							else
							{

							admin.save(function(err)
							{
									if(err)
									{
										if(err.errors != null)
										{
											if(err.errors.firstname)
											{
											return	res.json({success:false,message:err.errors.firstname.message});
											}
											else
											if(err.errors.lastname)
											{
											return	res.json({success:false,message:err.errors.lastname.message});
											}
											else
											if(err.errors.email)
											{
											return	res.json({success:false,message:err.errors.email.message});
											}
											
											else
											if(err.errors.password)
											{
											return	res.json({success:false,message:err.errors.password.message});
											}
											if(err.errors.mobile)
											{
											return	res.json({success:false,message:err.errors.mobile.message});
											}
											else{
											return	res.json({success:false,message:err});
											}
										}
									    
							else if(err)
							{
								if(err.code == 11000)
								{					
									return	res.json({success:false, message:'Email or phone number already exists  !!!'});	
							 	}			
								else
								{
								return	res.json({success:false, message: err});
								}
								
							}
							
							}
							else
							{
						return	res.json({success:true, message:'Admin created !'});
						     }
						    });
							}
							
						});
					    // Route to get the current user's permission level
					   
					    router.get('/permission', function(req, res) 
					    {
					        User.findOne({ email: req.decoded.email }, function(err, user) 
					        {
					            
					               if(err) throw err;
					                if (!user) {
					                    res.json({ success: false, message: 'No user was found' }); // Return an error
					                } else {
					                    res.json({ success: true, permission: user.permission }); // Return the user's permission
					                }
					            });
					     });
					    

					router.get('/checkuser',function(req,res)
					{
							// get all the users
							console.log('I recived a get request');
							User.find({}, function(err, users) {
							  if (err)
							  	res.send(err);

							  	res.json(users);	 
								});
					});

					router.get('/checkadmin',function(req,res)
					{
							// get all the users
							console.log('I recived a get request');
							Admin.find({}, function(err, admins) {
							  if (err)
							  	res.send(err);

							  	res.json(admins);			 
								});
					});
					var sid5='';
					var isAdmin='';

					router.post('/authenticate',function(req,res)
					{
							User.findOne({ email:req.body.email}).select('firstname lastname email password mobile isAdmin S_id').exec(function(err,user)
							{
								if(err) throw err;
								if(req.body.email==null||req.body.email==''||req.body.password==null||req.body.password=='')
									{
										res.json({success:false,message:'Ensure email or  password  were provided'});

									}
									else
									{
										if(!user)
										{
											return res.json({success:false,message:'Could not authenticate user . Please register first...'});
										}
										else if(user)
										{
											if(req.body.password)
											{
											var validPassword=user.comparePassword(req.body.password);
										          }
										          else
										          {
										          return	res.json({success:false,message:'No password provded !'});
										          }

											if(!validPassword)
											{
												return res.json({success:false,message:'Could not authenticate password'});
											}else
											{
												 var token= jwt.sign({email:user.email,firstname:user.firstname,lastname:user.lastname,mobile:user.mobile,S_id:user.S_id,isAdmin:user.isAdmin },secret,{ expiresIn:'24h'});
												  sid5=user.S_id;
												isAdmin=user.isAdmin;
												  return res.json({success:true,message:req.body.email,token:token});
											}
										}
									}

							});
					});
					console.log(sid5+'sid');
					router.get('/solarsUser',function(req,res)
					{
							// get all the users
							console.log('I recived a get request');
							Solar.find(function(err,solars) {
							 
							if (err)
							  	res.send(err);
							  	res.json(solars);
							 
					 
					      });
					});
						router.get('/solarsUserDashboard',function(req,res)
					{
							// get all the users

							console.log('I recived a get request from solar');
							console.log('I recived a get request');

							Solar.find({S_id:sid5},function(err,solars) {
							 
							if (err)
							  	res.send(err);
							  	res.json(solars);
							 
					 
					      });
					});
					 router.use(function(req,res,next)
					  {
							  	var token=req.body.token||req.body.query||req.headers['x-access-token'];
							  	if(token)
							  	{
							  		jwt.verify(token,secret,function(err,decoded)
							  		{
							  			if(err)
							  			{
							  				res.json({success:false,message:'Token invalid'});
							  			}
							  			else
							  			{
							  				req.decoded=decoded;
							  				next();
							  			}
							  		});
							  	}
							  	else
							  	{
							  		res.json({success:false,message:'No token provided'});
							  	}

					  });

					  
					  router.post('/me',function(req,res)
					  {
					  	res.send(req.decoded);
					  });

					


return router;
}
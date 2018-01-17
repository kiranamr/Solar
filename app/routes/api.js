var User=require('../models/user');
var json2xls=require('json2xls');
var Solar=require('../models/soalr');
var SolarData=require('../models/solardatas');
var Admin=require('../models/admin');
var server= require('http');
var jwt=require('jsonwebtoken');
var mongoXlsx = require('mongo-xlsx');
var json2xls=require('json2xls');
var fs = require('file-system');
var http = require('http');
var json2csv = require('json2csv');
var fs1 = require('fs');

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
							solartable.S_id=req.body.S_id;
							solartable.customer=req.body.customer;
							solartable.rtuConnectivity=req.body.rtuConnectivity;
							solartable.rtuLastConnected=new Date().toISOString();
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
								
							});
						router.post('/solarsUserdata',function(req,res)
						{   //var solartable=new models.Solar();
							var solardatatable=new SolarData();
							solardatatable.S_id=req.body.S_id;
							//solardatatable.Customer=req.body.Customer;
							solardatatable.rtuConnectivity=req.body.rtuConnectivity;
							solardatatable.rtuLastConnected=new Date().toISOString();
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
						         /* SearchId=(req.body.selectedId);
								var SearchFromDate1=req.body.selectedFromDate;
								var SearchToDate1=req.body.selectedToDate;
								 SearchId=(req.body.selectedId);
								var SearchFromDate1=req.body.selectedFromDate;
								var SearchToDate1=req.body.selectedToDate;
								 var SearchFromDate2=new Date(SearchFromDate1);
								 var  SearchToDate2=new Date(SearchToDate1);
								 SearchFromDate2.setDate(SearchFromDate2.getDate()+1);
								 SearchFromDate2.setHours(0);
								 SearchToDate2.setDate(SearchToDate2.getDate()+1);
								 SearchToDate2.setHours(0);
								 SearchFromDate=new Date(SearchFromDate2).toISOString();
								 SearchToDate=new Date(SearchToDate2).toISOString();*/
								 
								 console.log("Sid is "+SearchId);
								 console.log("from date is "+SearchFromDate);
								 console.log("to date is "+SearchToDate);
								  if(SearchId == null||SearchId == '' ){
								  	SolarData.find({"S_id":SearchId,"rtuLastConnected":{$gte:SearchFromDate,$lt:SearchToDate}},function(err,solardatas)
							 {
							
							   res.json(solardatas);
							   console.log(solardatas);
							  
		 

							 });
								  }
								  else
								  {
								  	 	SolarData.find({"rtuLastConnected":{$gte:SearchFromDate,$lt:SearchToDate}},function(err,solardatas)
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
      


					router.get('/SerchByIdAndDate',function(req,res)
					{
							//console.log('I recieved a get request search All')						
							//console.log('Checkinserach value is'+checkinSearch);
							 if(SearchId == null||SearchId == '' ){
								  	SolarData.find({"rtuLastConnected":{$gte:SearchFromDate,$lt:SearchToDate}},function(err,solardatas)
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
								  	 	SolarData.find({"S_id":SearchId,"rtuLastConnected":{$gte:SearchFromDate,$lt:SearchToDate}},function(err,solardatas)
							 {
							
							  
							   console.log(solardatas);
						var csv = json2csv({ data: solardatas, fields: fields ,fieldNames: fieldNames});
  	res.json(solardatas);
        
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
							var user=new User();
							user.firstname=req.body.fname;
							user.lastname=req.body.lname;
							
							user.password=req.body.password;
							user.mobile=req.body.mobile;
							user.email=req.body.email;
							if(req.body.password==null||req.body.password==''||req.body.email==null||req.body.email=='')
							{
								res.json({success:false,message:' email and password were provided'});

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


					router.post('/authenticate',function(req,res)
					{
							User.findOne({ email:req.body.email}).select('firstname lastname email password mobile').exec(function(err,user)
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
												 var token= jwt.sign({email:user.email,firstname:user.firstname,lastname:user.lastname,mobile:user.mobile },secret,{ expiresIn:'24h'});
												  return res.json({success:true,message:'User authenticated !',token:token});
											}
										}
									}

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
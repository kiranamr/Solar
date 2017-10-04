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
					 'RTU Connectivity' ,
					 'RTU Last Connected',
					 'Panel Volt  (V)',
					 'Panel Amp (A)',
					 'O/P Volt (V)',
					 'O/P Amp',
					 'Frequency  (Hz)',
					 'O/P Power (KW)',
					 'Speed (rpm)',
					 'Energy (KWh)',
					 'Flow (LPM)',
					 'On Time (Hour)',
					 'Pump Run',
					 'Status/Faults'
					 ];

//var mongoXlsx = require('mongo-xlsx');
var fields = [  'S_id',
				'rtuConnectivity',
				'rtuLastConnected',
				'panelVolt',
				'panelAmp',
				'outputVolt', 
				'outputAmp', 
				'frequency',
				'outputPower',
				'speed',
				'energy',
				'flow',
				'onTime',
				'pumpRun',
				'status'
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
						router.post('/solarin',function(req,res)
						{    var solartable=new Solar();
							//var solardatatable=new models.SolarData();
							solartable.S_id=req.body.S_id;
							solartable.customer=req.body.customer;
							solartable.rtuConnectivity=req.body.rtuConnectivity;
							solartable.rtuLastConnected=new Date().toISOString();
							solartable.panelVolt=req.body.panelVolt;
							solartable.panelAmp=req.body.panelAmp;
							solartable.outputVolt=req.body.outputVolt;
							solartable.outputAmp=req.body.outputAmp;
							solartable.frequency=req.body.frequency;
							solartable.outputPower=req.body.outputPower;
							solartable.speed=req.body.speed;
							solartable.energy=req.body.energy;
							solartable.flow=req.body.flow;
							solartable.onTime=req.body.onTime;
							solartable.pumpRun=req.body.pumpRun;
							solartable.status=req.body.status;
							if(req.body.customer==null||req.body.customer==''||req.body.rtuConnectivity==null||req.body.rtuConnectivity==''||req.body.panelVolt==null||req.body.panelVolt==''||req.body.panelAmp==null||req.body.panelAmp==''||req.body.outputVolt==null||req.body.outputVolt==''||req.body.outputAmp==null||req.body.outputAmp==''||req.body.frequency==null||req.body.frequency==''||req.body.outputPower==null||req.body.outputPower==''||req.body.speed==null||req.body.speed==''||req.body.energy==null||req.body.energy==''||req.body.flow==null||req.body.flow==''||req.body.onTime==null||req.body.onTime==''||req.body.pumpRun==null||req.body.pumpRun==''||req.body.status==null||req.body.status=='')
							{
								res.json({success:false,message:'Ensure all fields were provided'});

							}
							else
							{
								solartable.save(function(err){
																if (err) throw err;
															    return res.json({success:true, message:'Solar created !'});
						
						    								});
							}
							
						});
						router.post('/solarsdatain',function(req,res)
						{   //var solartable=new models.Solar();
							var solardatatable=new SolarData();
							solardatatable.S_id=req.body.S_id;
							//solardatatable.customer=req.body.customer;
							solardatatable.rtuConnectivity=req.body.rtuConnectivity;
							solardatatable.rtuLastConnected=new Date().toISOString();
							solardatatable.panelVolt=req.body.panelVolt;
							solardatatable.panelAmp=req.body.panelAmp;
							solardatatable.outputVolt=req.body.outputVolt;
							solardatatable.outputAmp=req.body.outputAmp;
							solardatatable.frequency=req.body.frequency;
							solardatatable.outputPower=req.body.outputPower;
							solardatatable.speed=req.body.speed;
							solardatatable.energy=req.body.energy;
							solardatatable.flow=req.body.flow;
							solardatatable.onTime=req.body.onTime;
							solardatatable.pumpRun=req.body.pumpRun;
							solardatatable.status=req.body.status;	
							if(req.body.rtuConnectivity==null||req.body.rtuConnectivity==''||req.body.panelVolt==null||req.body.panelVolt==''||req.body.panelAmp==null||req.body.panelAmp==''||req.body.outputVolt==null||req.body.outputVolt==''||req.body.outputAmp==null||req.body.outputAmp==''||req.body.frequency==null||req.body.frequency==''||req.body.outputPower==null||req.body.outputPower==''||req.body.speed==null||req.body.speed==''||req.body.energy==null||req.body.energy==''||req.body.flow==null||req.body.flow==''||req.body.onTime==null||req.body.onTime==''||req.body.pumpRun==null||req.body.pumpRun==''||req.body.status==null||req.body.status=='')
							{
								res.json({success:false,message:'Ensure all fields were provided'});

							}
							else
							{	
								Solar.findOne({S_id:req.body.S_id},function(err,solars)
								{
					         		if(err) throw err;

					            		if (!solars) {
					                    				res.json({ success: false, message: 'No customers was found' }); // Return an error
					                				}
					                				 else 
					                			 	{
					                    				solardatatable.save(function(err){

															 						if (err) throw err;
																					return res.json({success:true, message:'Solar data created !'});
							
																			});
					                				}

								});

							
							}
							
						});


					router.get('/solarsdatain',function(req,res)
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
					              var Month=doc['frequency'];
					              var Volts=doc['outputVolt'];
					              var Amps=doc['outputAmp'];
					              var Flow=doc['flow'];
					              var v=""+Flow+""; 
					              flows.push({"label":v},{
					                    "vline": "true",
					                    "lineposition": "0",
					                    "color": "#FA5858",
					                    "labelHAlign": "center",
					                    "labelPosition": "0",
					                   
					                    "dashed": "0"
					                });
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
											        "data" : volts
											      },
											      {
											        "seriesname" : "outputAmps",
											        "data": amps
											      },
											       {
											        "seriesname" : "outputcurent",
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
											            "showBorder": "1",
											            "showShadow": "1",
											            "showCanvasBorder": "0",
											            "usePlotGradientColor": "0",
											            "legendBorderAlpha": "0",
											            "legendShadow": "0",
											            "showAxisLines": "1",
											            "showAlternateHGridColor": "0",
											            "divlineThickness": "1",
											            "divLineIsDashed": "2",
											            "divLineDashLen": "1",
											            "divLineGapLen": "1",
											            "xAxisName": "Speed",
											            "showValues": "0"

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

					router.get('/solarin',function(req,res)
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
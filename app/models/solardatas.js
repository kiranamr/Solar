var mongoose=require('mongoose');

var Schema = mongoose.Schema;


var SolarUserSchema=new Schema({
								S_id:Number,
								
								rtuConnectivity:String,
								rtuLastConnected:String,
								dcVolt:Number,
								outputVolt:Number,
								outputAmpere:Number,
								outputPower:Number,
								totalPower:Number,
								vfdSpeed:Number,
								outputFrequency:Number,
								flowRate:Number,
								pumprunHour:String,
								vfdStatus:String
							
							});
	
	SolarUserSchema.pre('save',function(next)
	{
          next();

	});
module.exports =mongoose.model('SolarData',SolarUserSchema);
    
 
    
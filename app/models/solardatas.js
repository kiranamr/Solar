var mongoose=require('mongoose');

var Schema = mongoose.Schema;


var SolarUserSchema=new Schema({
								S_id:Number,
								rtuConnectivity:String,
								rtuLastConnected:String,
								panelVolt:Number,
								panelAmp:Number,
								outputVolt:Number,
								outputAmp:Number,
								frequency:Number,
								outputPower:Number,
								speed:Number,
								energy:Number,
								flow:Number,
								onTime:Number,
								pumpRun:String,
								status:Number
							
							});
	
	SolarUserSchema.pre('save',function(next)
	{
          next();

	});
module.exports =mongoose.model('SolarData',SolarUserSchema);
    
 
    
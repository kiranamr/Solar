var mongoose=require('mongoose');

var Schema = mongoose.Schema;
var bcrypt=require('bcrypt-nodejs');
var SolarSchema=new Schema({
								S_id:Number,
								customer:String,
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

	SolarSchema.pre('save',function(next)
	{
          next();

	});
module.exports = mongoose.model('Solar',SolarSchema);
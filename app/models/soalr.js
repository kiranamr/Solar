var mongoose=require('mongoose');

var Schema = mongoose.Schema;
var bcrypt=require('bcrypt-nodejs');
var SolarSchema=new Schema({
								S_id:{type:Number,unique:true},
								customer:String,
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

	SolarSchema.pre('save',function(next)
	{
          next();

	});
module.exports = mongoose.model('Solar',SolarSchema);
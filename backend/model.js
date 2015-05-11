var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rainWindDataSchema = new Schema({
    Type: Number,
    Month: Number,
    Day: Number,
    Hour: Number,
    Min: Number,
    Sec: Number,
    Lat: String,
    Long: String,
    WindDirection: Number,
    WindSpped: Number,
    AprsSoft: String,
    WeatherUnit: String,
    Gust: Number,
    Temp: Number,
    RainLastHr: Number,
    RainLast24Hr: Number,
    RainSinceMid: Number,
    Humidity: Number,
    Barometric: Number
});

rainWindDataSchema.statics.findByDate = function (month, day, callback) {
    console.log("find");
    this.find().exec(callback);
    // return this.find({
    //     Day: day,
    //     Month: month 
    // })
    // .sort('-Hour')
    // .sort('-Min')
    // .sort('-Sec')
    // .exec(callback);
}

console.log("Imported");
mongoose.model("WindModel", rainWindDataSchema);

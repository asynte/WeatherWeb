var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rainWindDataSchema = new Schema({
    Type: Number,
    Month: Number,
    Day: String,
    Hour: String,
    Min: String,
    Sec: String,
    Lat: Number,
    Long: Number,
    WindDirection: Number,
    WindSpped: Number,
    AprsSoft: String,
    WeatherUnit: String,
    Gust: String,
    Temp: String,
    RainLastHr: String,
    RainLast24Hr: String,
    RainSinceMid: String,
    Humidity: String,
    Barometric: String
});

rainWindDataSchema.statics.findByDate = function (month, day, callback) {
    return this.find({
        Day: day,
        Month: month 
    })
    .sort('-Hour')
    .sort('-Min')
    .sort('-Sec')
    .exec(callback);
}

mongoose.model("", rainWindDataSchema);

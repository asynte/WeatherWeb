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

rainWindDataSchema.statics.findByLatLong = function (latitude, longitude, month, day, callback) {
    return this.find({
        Day: day,
        Month: month 
    })
    .where('Lat').gt(latitude - 100.0).lt(latitude + 100.0)
    .where('Long').gt(longitude - 100.0).lt(longitude + 100.0)
    .sort('-Hour')
    .sort('-Min')
    .sort('-Sec')
    .exec(callback);
}

mongoose.model("", rainWindDataSchema);

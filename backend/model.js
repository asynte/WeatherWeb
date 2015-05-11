var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var rainWindDataSchema = new Schema({
    // _id: Schema.ObjectId,
    // Type: Number,
    Month: Number,
    Day: Number,
    Hour: Number,
    Min: Number,
    // Sec: Number,
    Lat: Number,
    Long: Number,
    // WindDirection: Number,
    // WindSpped: Number,
    // AprsSoft: String,
    // WeatherUnit: String,
    // Gust: Number,
    Temp: Number,
    // RainLastHr: Number,
    // RainLast24Hr: Number,
    // RainSinceMid: Number,
    // Humidity: Number,
    // Barometric: Number
});

rainWindDataSchema.statics.findByDate = function (month, day, callback) {
    console.log("find");
    this.create({
        Month: 5,
        Day: 10,
        Hour: 12,
        Min: 14,
        // Sec: Number,
        Lat: 120,
        Long: 10,
        // WindDirection: Number,
        // WindSpped: Number,
        // AprsSoft: String,
        // WeatherUnit: String,
        // Gust: Number,
        Temp: 1,

    }).save();
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

mongoose.model("wind", rainWindDataSchema);

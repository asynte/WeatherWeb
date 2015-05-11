var http = require('http'),
    director = require('director');
var mongoose = require('mongoose');

require("./model.js");

var RainWindDataModel = mongoose.model('wind');


mongoose.connect('mongodb://localhost/weather');
const PORT = 1235;

var router = new director.http.Router();
var server = http.createServer(function (req, res) {
    router.dispatch(req, res, function(err) {
        if (err) {
            res.writeHead(404);
            res.end;
        }
    });
}).listen(PORT);

router.get('/data/:month/:day', function (month, day) {
    res = this.res;
    RainWindDataModel.findByDate(month, day, function(err, datas) {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({
                code: 100,
                message: "internal error"
            }));
        }
        console.log(datas);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        mapped_data = datas.map(function (obj) {
            var new_obj = {};
            var Lat = parseFloat(obj.Lat.substring(0, obj.Lat.length - 1));
            var Long = parseFloat(obj.Long.substring(0, obj.Long.length - 1));
            if (obj.Lat.slice(-1) === 'S') {
                Lat = -Lat; 
            }
            if (obj.Long.slice(-1) === 'W') {
                Long = -Long;
            }
            new_obj['pos'] = [Long, Lat];
            new_obj['day'] = obj.Day;
            new_obj['month'] = obj.Month;
            new_obj['hour'] = obj.Hour;
            new_obj['min'] = obj.Min;

            return new_obj;
        });

        return res.end(JSON.stringify({
            code: 0,
            message: "success",
            data: mapped_data
        }));
    })
});

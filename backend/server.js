var http = require('http'),
    director = require('director');
var mongoose = require('mongoose');
var path = require('path');
var fileSystem = require('fs');
var mmm = require('mmmagic'),
    Magic = mmm.Magic;

mongoose.connect('mongodb://localhost/weather');

require("./model.js");

var RainWindDataModel = mongoose.model('WindModel');
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
    var res = this.res;
    RainWindDataModel.findByDate(month, day, function(err, datas) {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({
                code: 100,
                message: "internal error"
            }));
        }
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

router.get('/statics/?((\w|.)*)', function (url) {
    console.log(url);
    url = "../" + url;
    var filePath = path.join(__dirname, url);
    var magic = new Magic(mmm.MAGIC_MIME_TYPE);
    var res = this.res;

    if (fileSystem.existsSync(filePath)) {
        magic.detectFile(filePath, function (err, result) {
            console.log(result);
            var stat = fileSystem.statSync(filePath);
            res.writeHead(200, {
                'Content-Type': result,
                'Content-Length': stat.size
            });
            var readStream = fileSystem.createReadStream(filePath);
            readStream.pipe(res);
        })
    }
    else {
        res.writeHead(404);
        res.end();
    }
});

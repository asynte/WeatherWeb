var http = require('http'),
    director = require('director');
var mongoose = require('mongoose');
var connect = require('connect');

var RainWindDataModel = mongoose.model();


mongoose.connect('mongodb://lolcalhost/');
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
    RainWindDataModel.findByDate(month, day, function(err, datas) {
        if (err) {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            return res.end(JSON.stringify({
                code: 100,
                message: "internal error"
            }));
        }
        res.writeHead(200, { 'Content-Type': 'application/json' });
        return res.end(JSON.stringify({
            code: 0,
            message: "success",
            data: datas
        }));
    })
});

var http = require('http'),
    director = require('director');
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

router.get('/data/:date_time', function (date_time) {
    console.log(date_time);
});

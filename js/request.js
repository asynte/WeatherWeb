var request = {
    getWeatherData = function (date, callback) {
        var path = "/data" + date;
        $.get(
            path,
            function (data, status) {
                if (status == 200) {
                    callback(null, data);
                }
                else {
                    callback("数据加载错误", null);
                }
            }
        );
    },

    refreshData = function (data, callback) {

    }
}

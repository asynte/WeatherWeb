var request = {
    getWeatherData = function (, callback) {
        var path = "/data" + "/" + latitude + "/" + longitude + "/" + month + "/" + day;
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

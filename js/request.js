var request = {
    getWeatherData : function (month, day, callback) {
        var path = "/data" + "/" + month + "/" + day;
        console.log(month);
        $.ajax({
            type: 'get',
            timeout: 5000,
            url: path,
            success: function (data, textStatus, XMLHttpRequest) {
                console.log("Function");
                if (textStatus === 200) {
                    callback(null, data);
                }
                else {
                    callback("数据加载错误", null);
                }
            },
            error: function (xhr,  ajaxOptions, thrownError) {
                callback("数据加载错误", null);
            }
        });
    },
}

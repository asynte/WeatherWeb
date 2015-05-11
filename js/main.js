$(function() {
    $("#datetimepicker1").bind("click", datetimePickerClicked);
    $("#submit").bind("click", submitClicked);
    getMapData();
});

function datetimePickerClicked() {
    console.log('clicked');
}

function submitClicked() {
    $("#fieldError").hide();

    date = $("#datetimepicker1").datepicker('getFormattedDate').split("/");
    day = date[0];
    month = date[1];

    if (isNaN(day) || isNaN(month)) {
        $("#fieldError").show();
    }
    else {
        window.location.href = window.location.origin + "?day=" + day + "&month=" + month;
    }
}

function getMapData() {
    var day = parseInt(getQueryString('day'));
    var month = parseInt(getQueryString('month'));
    if (isNaN(day) || isNaN(month)) {
        var today = new Date();
        console.log(today);
        day = today.getDate();
        month = today.getMonth() + 1;
    }

    request.getWeatherData(month, day, function (err, data) {
        console.log(err);
        if (err) {
            $('#fieldError').text("数据加载错误");
            $('#fieldError').show();
            return ;
        }
        else {
            makeMap(data);
        }
    });
}

function getQueryString(val) {
    var result = null,
        tmp = [];
    location.search
    .substr(1)
        .split("&")
        .forEach(function (item) {
        tmp = item.split("=");
        if (tmp[0] === val) result = decodeURIComponent(tmp[1]);
    });
    return result;
}

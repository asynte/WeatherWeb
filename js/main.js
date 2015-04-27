$(function() {
    $("#datetimepicker1").bind("click", datetimePickerClicked);
    $("#submit").bind("click", submitClicked)
});

function datetimePickerClicked() {
    console.log('clicked');
}

function submitClicked() {
    $("#fieldError").hide();

    date = $("#datetimepicker1").datepicker('getFormattedDate').split("/");
    day = date[0];
    month = date[1];
    longitude = Number($("#longitude").val());
    latitude = Number($("#latitude").val());
    console.log(longitude);
    console.log(typeof longitude);
    console.log(latitude);
    console.log(typeof latitude);

    if (isNaN(day) || isNaN(month) || isNaN(longitude) || isNaN(latitude)) {
        $("#fieldError").show();
    }
    else {
        request.getWeatherData(latitude, longitude, month, day, function (err, data) {
            if (err || data[code] !== 0) {
                $("#fieldError").val("数据加载错误");
                $("#fieldError").show();
            }
            else {

            }
        });
    }
}

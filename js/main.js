$(function() {
    $("#datetimepicker1").bind("click", datetimePickerClicked);
    $("#submit").bind("click", submitClicked)
});

function datetimePickerClicked() {
    console.log('clicked');
}

function submitClicked() {
    date = $("#datetimepicker1").datepicker('getFormattedDate').split("/");
    day = date[0];
    month = date[0];
}

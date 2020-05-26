var baseUrl = "https://localhost:44356";

$(function () {
    //增加网站访问量
    $.ajax({
        url: baseUrl + '/api/Commons/webCount',
        type: 'get',
        contentType: "application/json",
        success: function (res) {

        }

    }) 
})
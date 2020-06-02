var baseUrl = "http://47.92.200.14:5002";

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
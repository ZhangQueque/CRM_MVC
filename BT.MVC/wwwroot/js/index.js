function AlertDetail(id) {
    layer.alert(id);
}
$(function () {
    var index = layer.load();  //展示一个加载图标
    var token = $.cookie("token");


    //获取信息框的值
    $.ajax({
        url: baseUrl + '/api/Commons',
        type: 'get',
        contentType: "application/json",
        headers: { "Authorization": "Bearer " + token },
        success: function (res) {
            layer.close(index);
             $(res).each(function () {
                if (this.type == "Record") {
                    $("#Record").text(this.value);
                }
                if (this.type == "Customer") {
                    $("#Customer").text(this.value);

                }
                if (this.type == "Emp") {
                    $("#Emp").text(this.value);

                }
                if (this.type == "Web") {
                    $("#Web").text(this.value);

                }
            });
        }

    }).fail(function () {
        layer.close(index);
        layer.msg("身份认证已过期！", { icon: 2 }, function () {
            location.href = "/Home/Login";
        });
    })

})


//扇形图
var token = $.cookie("token");
$.ajax({
    url: baseUrl + '/api/Commons/sector',
    type: 'get',
    contentType: "application/json",
    headers: { "Authorization": "Bearer " + token },

    success: function (res) {
        //成功后遍历数据，组成双数组数据
        var arr = [];
        $(res).each(function () {
            if (this.name == "3月") {
                var ziObj = {
                    name: this.name,
                    y: this.value,
                    sliced: true,
                    selected: true
                }
                arr.push(ziObj);
            } else {
                var ziArr = [this.name, this.value];
                arr.push(ziArr);
            }


        });


        var chart = Highcharts.chart('CustomerContainer', {
            chart: {
                type: 'pie',
                options3d: {
                    enabled: true,
                    alpha: 45,
                    beta: 0
                }
            },
            title: {
                text: '2020客户成交比例'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    depth: 35,
                    dataLabels: {
                        enabled: true,
                        format: '{point.name}'
                    }
                }
            },
            series: [{
                type: 'pie',
                name: '客户成交占比',
                data: arr
            }]
        });
    }

})



var inverted = $("#Inverted").val();
var polar = $("#Polar").val();


$("#Style1").click(function () {
    var index = layer.load();
    location.href = "/Home/Index?inverted=false&polar=false";
})
$("#Style2").click(function () {
    var index = layer.load();
    location.href = "/Home/Index?inverted=true&polar=false";

})
$("#Style3").click(function () {
    var index = layer.load();
    location.href = "/Home/Index?inverted=true&polar=true";

})



var token = $.cookie("token");
$.ajax({
    url: baseUrl + '/api/Commons/histogram',
    type: 'get',
    contentType: "application/json",
    headers: { "Authorization": "Bearer " + token },

    success: function (res) {
        var chart = Highcharts.chart('TrackRecordsContainer', {
            title: {
                text: '2020年BossTeam业绩统计'
            },
            subtitle: {
                text: 'BossTeam'
            },
            xAxis: {
                categories: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月']
            },
            chart: {
                inverted: inverted,
                polar: polar
            },
            series: [{
                type: 'column',
                colorByPoint: true,
                data: res,
                showInLegend: false
            }]
        });
    }

})







function getNow() {
    var now = new Date();
    return {
        hours: now.getHours() + now.getMinutes() / 60,
        minutes: now.getMinutes() * 12 / 60 + now.getSeconds() * 12 / 3600,
        seconds: now.getSeconds() * 12 / 60
    };
}
/**
     * Pad numbers
     */
function pad(number, length) {
    // Create an array of the remaining length + 1 and join it with 0's
    return new Array((length || 2) + 1 - String(number).length).join(0) + number;
}
var now = getNow();
// Create the chart
var chart = Highcharts.chart('HourContainer', {
    chart: {
        type: 'gauge',
        plotBackgroundColor: null,
        plotBackgroundImage: null,
        plotBorderWidth: 0,
        plotShadow: false,
        height: 300
    },
    credits: {
        enabled: false
    },
    title: {
        text: '当前时间'
    },
    pane: {
        background: [{
            // default background
        }, {
            // reflex for supported browsers
            backgroundColor: Highcharts.svg ? {
                radialGradient: {
                    cx: 0.5,
                    cy: -0.4,
                    r: 1.9
                },
                stops: [
                    [0.5, 'rgba(255, 255, 255, 0.2)'],
                    [0.5, 'rgba(200, 200, 200, 0.2)']
                ]
            } : null
        }]
    },
    yAxis: {
        labels: {
            distance: -20
        },
        min: 0,
        max: 12,
        lineWidth: 0,
        showFirstLabel: false,
        minorTickInterval: 'auto',
        minorTickWidth: 1,
        minorTickLength: 5,
        minorTickPosition: 'inside',
        minorGridLineWidth: 0,
        minorTickColor: '#666',
        tickInterval: 1,
        tickWidth: 2,
        tickPosition: 'inside',
        tickLength: 10,
        tickColor: '#666',
        title: {
            text: 'Powered by<br/>Highcharts',
            style: {
                color: '#BBB',
                fontWeight: 'normal',
                fontSize: '8px',
                lineHeight: '10px'
            },
            y: 10
        }
    },
    tooltip: {
        formatter: function () {
            return this.series.chart.tooltipText;
        }
    },
    series: [{
        data: [{
            id: 'hour',
            y: now.hours,
            dial: {
                radius: '60%',
                baseWidth: 4,
                baseLength: '95%',
                rearLength: 0
            }
        }, {
            id: 'minute',
            y: now.minutes,
            dial: {
                baseLength: '95%',
                rearLength: 0
            }
        }, {
            id: 'second',
            y: now.seconds,
            dial: {
                radius: '100%',
                baseWidth: 1,
                rearLength: '20%'
            }
        }],
        animation: false,
        dataLabels: {
            enabled: false
        }
    }]
}, function (chart) {
    setInterval(function () {
        now = getNow();
        var hour = chart.get('hour'),
            minute = chart.get('minute'),
            second = chart.get('second'),
            // run animation unless we're wrapping around from 59 to 0
            animation = now.seconds === 0 ?
                false :
                {
                    easing: 'easeOutElastic'
                };
        // Cache the tooltip text
        chart.tooltipText =
            pad(Math.floor(now.hours), 2) + ':' +
            pad(Math.floor(now.minutes * 5), 2) + ':' +
            pad(now.seconds * 5, 2);
        hour.update(now.hours, true, animation);
        minute.update(now.minutes, true, animation);
        second.update(now.seconds, true, animation);
    }, 1000);
});
// Extend jQuery with some easing (copied from jQuery UI)
$.extend($.easing, {
    easeOutElastic: function (x, t, b, c, d) {
        var s = 1.70158; var p = 0; var a = c;
        if (t == 0) return b; if ((t /= d) == 1) return b + c; if (!p) p = d * .3;
        if (a < Math.abs(c)) { a = c; var s = p / 4; }
        else var s = p / (2 * Math.PI) * Math.asin(c / a);
        return a * Math.pow(2, -10 * t) * Math.sin((t * d - s) * (2 * Math.PI) / p) + c + b;
    }
});

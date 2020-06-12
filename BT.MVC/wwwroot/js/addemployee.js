//创建员工
function PostCustomer() {
    var name = $("#Name").val();
    if (name.trim().length == 0) {
        layer.msg("员工姓名不能为空！", { icon: 2 });
        return;
    }

    var password = $("#Password").val();
    if (password.trim().length == 0) {
        layer.msg("员工密码不能为空！", { icon: 2 });
        return;
    }

    var phone = $("#Phone").val();
    if (phone.trim().length == 0) {
        layer.msg("员工手机号不能为空！", { icon: 2 });
        return;
    }

    var regphone = /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/;
    if (!regphone.test(phone)) {

        layer.msg('请输入正确的手机号！', { icon: 5 });
        return;
    }



    var email = $("#Email").val();
    if (email.trim().length == 0) {
        layer.msg("员工邮箱不能为空！", { icon: 2 });
        return;
    }

    var regemail = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    if (!regemail.test(email)) {
        layer.msg('请输入正确的邮箱！', { icon: 5 });
        return;
    }


    //获取表单数据
    var formdata = new FormData($("#CreateEmployeeFrom")[0]);
    var index = layer.load();
    var token = $.cookie("token");
    //创建客户
    $.ajax({
        url: baseUrl + '/api/employees/create',
        type: 'post',
        contentType: false,
        cache: false,
        processData: false,
        data: formdata,
        headers: { "Authorization": "Bearer " + token },
        success: function (res) {
            layer.close(index);
            if (res.code == 1) {
                layer.msg(res.msg, { icon: 2 });
            } else {
                layer.msg(res.msg, { icon: 1 }, function () {   //添加成功后的相关操作

                    layer.confirm("需要清空文本内容吗？", { icon: 3 }, function (index) {
                        location.href = "/Home/Employees";
                        layer.close(index);
                    });


                    ////表格重载
                    //layui.use(['table'], function () {
                    //    var table = layui.table; //where可以传我们像传的任何参数
                    //    table.reload("NoRealCustomer", {
                    //        url: baseUrl + '/api/customers/noreal?status=0', where: {
                    //            headers: { "Authorization": "Bearer " + token }
                    //        }
                    //    });
                    //});


                });//添加成功后的相关操作
            }
        }

    }).fail(function () {
        layer.close(index);

    })

} //创建客户
function Login() {
    var email = $("#Email").val();
    var password = $("#Password").val();
  
    if (email.length==0) {
        layer.msg('邮箱不能为空！', { icon: 2 });
        return;
    }

    var reg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
    if (!reg.test(email)) {

        layer.msg('请输入正确的邮箱！', { icon: 2 });
        return;
    }

    if (password.length == 0) {
        layer.msg('密码不能为空！', { icon: 2 });
        return;
    }

    var index = layer.load();  //展示一个加载图标

    $.ajax({
        url: baseUrl+ '/api/employees',
        type: 'post',
        data: JSON.stringify({ Email: email, Password: password }),
        contentType:"application/json",
        success: function (res) {
            layer.close(index);
            console.log(res);
            layer.msg('登录成功！', { icon: 1 }, function () {
                $.cookie("token", res.token, { path: '/' });
                location.href = "/Home/Index";
            });
           
        }

    }).fail(function () {
        layer.close(index);
        layer.msg('账号密码错误！', { icon: 2 });
    })


     
}
define(['jquery'], function ($) {
    $('#login').click(function () {
        $.ajax({
            type: 'post',
            url: '/api/login',
            data: $('#loginForm').serialize(),
            dataType: 'json',
            success: function (data) {
                if (data.code == 200) {
                    // 登录成功，跳转到主页面
                    location.href = '/main/index'
                } else {
                    alert('用户名或者密码错误');
                }
            }
        });
        return false;
    });
});

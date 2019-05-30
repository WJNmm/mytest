define(['jquery', 'template', 'util'], function ($, template, util) {
    //设置导航菜单选中
    util.setMenu('/main/index');
    //调用后台接口填充表单
    $.ajax({
        type: 'get',
        url: '/api/teacher/profile',
        dataType: 'json',
        success: function (data) {
            console.log(data);
            var html = template('settingsTpl', data.result);
            $('#settingsInfo').html(html);
        }
    });
}); 
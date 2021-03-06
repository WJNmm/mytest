define(['jquery', 'template', 'util', 'bootstrap','state'], function ($, template,util) {
    var ret = util.qs('flag');
    console.log(ret);
    //设置导航菜单选中
    util.setMenu(location.pathname);


    $.ajax({
        type: 'get',
        url: '/api/teacher',
        dataType: 'json',
        success: function (data) {
            //console.log(data);
            var html = template('teacherTpl', {list: data.result});
            $('#teacherInfo').html(html);

            //查看（模态框应用）
            $('.preview').click(function () {
                //获取当前数据id
                var td = $(this).closest('td');
                var tcId = td.attr('data-tcId');
                //console.log(tcId);
                //通过id查询数据
                $.ajax({
                    type: 'get',
                    url: '/api/teacher/view',
                    data: {
                        tc_id: tcId,
                    },
                    dataType: 'json',
                    success: function (data) {
                        //解析数据渲染页面
                        var html = template('modalTpl', data.result);
                        console.log(data);
                        $('#modalInfo').html(html);
                        //显示弹窗
                        $('#teacherModal').modal();
                    }
                });
            });

            //控制启用和注销
            $('.eod').click(function () {
                var td = $(this).closest('td');
                var tcId = td.attr('data-tcId');
                var tcStatus = td.attr('data-status');
                var that = this;
                $.ajax({
                    type: 'post',
                    url: '/api/teacher/handle',
                    data: {
                        tc_id: tcId,
                        tc_status: tcStatus
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data.code == 200) {
                            //修改当前状态
                            td.attr('data-status', data.result.tc_status);
                            //修改文字信息
                            if (data.result.tc_status == 0) {
                                $(that).html('注销');
                            } else {
                                $(that).html('启用');
                            }
                        }
                    }
                });
            });

        }
    });
});
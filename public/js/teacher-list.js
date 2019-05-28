define(['jquery', 'template', 'bootstrap'], function ($, template) {
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
                        var html = template('modalTpl',data.result);
                        //console.log(data);
                        $('#modalInfo').html(html);
                        //显示弹窗
                        $('#teacherModal').modal();
                    }
                });
            });

        }
    });
});
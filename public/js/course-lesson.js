define(['jquery', 'template', 'util', 'bootstrap', 'form'], function ($, template, util) {
    // 设置导航菜单选中
    util.setMenu('/course/list');
    // 获取课程ID
    var csId = util.qs('cs_id');
    // 查询课时数据
    $.ajax({
        type: 'get',
        url: '/api/course/lesson',
        data: {cs_id: csId},
        dataType: 'json',
        success: function (data) {
            // 渲染数据
            var html = template('lessonTpl', data.result);
            $('#lessonInfo').html(html);

            // 处理添加功能
            $('#addBtn').click(function () {
                var html = template('modalTpl', {operate: '添加课时'});
                $('#modalInfo').html(html);
                $('#chapterModal').modal();
                // 添加提交表单
                //submitForm('/api/course/chapter/add');
            });
            // 处理编辑功能
            $('.editLesson').click(function () {
                // 先查询数据
                var ctId = $(this).attr('data-ctId');
                $.ajax({
                    type: 'get',
                    url: '/api/course/chapter/edit',
                    data: {ct_id: ctId},
                    dataType: 'json',
                    success: function (data) {
                        // 渲染模板
                        $('#modalInfo').html(html);
                        // 显示弹窗
                        $('#chapterModal').modal();
                        // 编辑课时提交表单
                        //submitForm('/api/course/chapter/modify', ctId);
                    }
                });
            });
        }
    });
});
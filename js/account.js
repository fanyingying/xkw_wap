/*
  用户相关 account.js
  by fanyy 2016.4.14
 */

$(document).ready(function() {
    /* var common = xkw.common;*/
    var ui = xkw.ui;
    var event = xkw.event;
    xkw.account = {};
    xkw.account.bindEvent = {
        init: function() {
            event.footerMenu();
            this.initEvent();
            //this.initTab(); //tab切换，当只有一个tab时候不需要
        },
        initTab: function() {
            var tab = new fz.Scroll('.ui-tab', {
                role: 'tab',
                autoplay: true,
                interval: 3000
            });
        },
        initEvent: function() {
            // 拓展功能提示
            $('#add-btn').tap(function() {
                ui.tips.init({
                    content: '更多功能敬请期待哦(*^__^*)',
                    stayTime: 2000
                });
            });

            //圆形进度框 
            var myProgress = Circles.create({
                id: 'progressContainer',
                radius: 43,
                value: $('#progressContainer').attr('data-value'),//'data-value属性设置百分比
                maxValue: 100,
                width: 6,
                text: function(value) {
                    return '<span class="text">我的进程</span>'+value + '%';
                },
                colors: ['#8dcbf5', '#fde351'],
                duration: 400,
                wrpClass: 'circles-warp',
                textClass: 'circles-text',
                valueStrokeClass: 'circles-valueStroke',
                maxValueStrokeClass: 'circles-maxValueStroke',
                styleWrapper: true,
                styleText: true
            });

        }
    }



});

/*
  用户相关 login.js
  by fanyy 2016.4.14
 */

$(document).ready(function() {
    var ui = xkw.ui;

    bindEvent = {
        init: function() {
            this.initEvent();
            this.initTab(); //tab切换，当只有一个tab时候不需要
        },
        initTab: function() {
            var tab = new fz.Scroll('.ui-tab', {
                role: 'tab',
                autoplay: false,
                interval: 3000
            });
        },
        initEvent: function() {
            //点击发送验证码
            $('#send-yzma').tap(function() {
                //TODO 验证手机号码


                ui.tips.init({
                    content: '发送成功',
                    stayTime: 2000
                });
            });


            //点击眼睛事件
            $('#eye-btn').tap(function() {
                $('#password').hideShowPassword('toggle');
            }); 
            $('#password').on('passwordShown', function() {
                $('#eye-btn').removeClass('ui-icon2-eyeopen');
                $('#eye-btn').addClass('ui-icon2-eyeclose');

            }).on('passwordHidden', function() { 
                $('#eye-btn').addClass('ui-icon2-eyeopen');
                $('#eye-btn').removeClass('ui-icon2-eyeclose');
            });




        }
    }


    bindEvent.init();

});

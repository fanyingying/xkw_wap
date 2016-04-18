/*
  用户相关 login.js
  by fanyy 2016.4.14
 */

$(document).ready(function() {
    var ui = xkw.ui;

    bindEvent = {
        init: function() {
            this.initEvent();

        },
        initTab: function() {

        },
        initEvent: function() {

            //验证码倒计时
            var countdown = 60; 
            function settime(obj) {
                if (countdown == 0) { 
                    obj.attr("disabled","true");
                    obj.text("获取验证码");
                    countdown = 60;
                    return;
                } else {
                    obj.attr("disabled","false");
                     
                    obj.text("重新发送(" + countdown + ")");
                    countdown--;
                }
                setTimeout(function() {
                    settime(obj)
                }, 1000)
            }

            //点击发送验证码
            $('#send-yzma').tap(function() {
                //TODO 验证手机号码


                settime($(this));


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


            //点击
            $('#password').focus(function() {
                $('#eye-btn').removeClass('hide');
            }).blur(function() {
                if (!$('#password').val()) {
                    $('#eye-btn').addClass('hide');
                }
            });

        }
    }


    bindEvent.init();

});

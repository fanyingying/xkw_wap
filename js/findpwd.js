/*
  用户相关 findpwd.js
  by fanyy 2016.4.15
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
                    obj.attr("disabled", "true");
                    obj.text("获取验证码");
                    obj.removeClass('already');
                    countdown = 60;
                    return;
                } else {
                    obj.attr("disabled", "false");
                    obj.addClass('already');
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


            //点击提交按钮  第1步
            $('#submit-btn1').tap(function() {
                //判断是否为空 
                if (!$.trim($('#mobile').val())|| !$.trim($('#yzma').val())) {
                    ui.tips.init({
                        content: '手机号和验证码不能为空',
                        stayTime: 2000
                    });
                    return;
                }

                //TODO  服务器校验验证码 

                //成功则跳转到第2步
                location.href = '密码找回2.html';
                
                //不成功提示 
                /* ui.tips.init({
                     content: '验证码错误',
                     stayTime: 2000
                 });*/
            });

            //第2步
            //点击提交按钮  
            $('#submit-btn2').tap(function() {
                //判断是否为空 
                if (!$.trim($('#password1').val())|| !$.trim($('#password2').val())) {
                    ui.tips.init({
                        content: '密码不能为空',
                        stayTime: 2000
                    });
                    return;
                }

                //TODO  ajax 服务器校验密码、保存密码 

                //成功则跳转到第3步
                location.href = '密码找回成功.html'; 

                //不成功提示 
                /* ui.tips.init({
                     content: '原密码错误',
                     stayTime: 2000
                 });*/

            });

            //校验密码是否符合规则
            $('#password1').blur(function() {

                ui.tips.init({
                    content: '密码格式不对',
                    stayTime: 2000
                });
            });
            //校验两次密码是否一致
            $('#password2').blur(function() {
                if ($('#password1').val() != $('#password2').val()) {
                    ui.tips.init({
                        content: '两次输入的密码不一致',
                        stayTime: 2000
                    });
                }
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

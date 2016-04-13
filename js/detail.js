/**
 * detail.js
 * 范莹莹 2016.4.1  
 */
 
$(document).ready(function() {
    var errorDialog = $(".error-dialog");
    var commentDialog = $(".comments-dialog"); 
    var fullImageContainer = $('#fullImageContainer');
    
    var paperContent = $('#paper-content');
    var paperContentBox = $('.paper-content-box'); 
    var common = xkw.common;
    var ui = xkw.ui;
    var bindEvent = {
        init: function() {
            //函数拓展
            xkw.system.limitTextarea();
            this.download();
            this.cart();
            this.comment();
            this.collect();
            this.like();
            this.share();

        },
        download: function() {
            $("#download-btn").tap(function() {
                //TODO 判断是否登录
                //

                $(this).addClass('active');
                var dia = $.dialog({
                    title: '下载提示',
                    content: '<span>名称：八年级下学期第一次月考数学试题</span><span>大小：350kb</span>',
                    button: ["取消", "确认"]
                });

                dia.on("dialog:action", function(e) {
                    if (e.index == 1) {
                        //第一个按钮，确定下载
                        //执行下载操作
                        //TODO
                        succeed = false;
                        if (!succeed) {
                            //如果下载失败
                            errorDialog.find('.ui-dialog-bd div').html('<div class="tc">下载异常，请重新点击下载！</div>');
                            $(".error-dialog").dialog("show");
                            $("#download-btn").removeClass('active')
                        }


                    } else {
                        //取消按钮
                        $("#download-btn").removeClass('active')
                    }
                });
            })
        },
        cart: function() {
            $("#cart-btn").tap(function() {
                //加入资源篮操作
                //TODO  

                if (true) {
                    //成功框
                    ui.tips.init({
                        content: '成功加入资源蓝',
                        stayTime: 2000
                    });
                } else {
                    //失败框
                    ui.tips.init({
                        content: '加入资源蓝失败！',
                        stayTime: 2000
                    });
                }

            });
        },
        comment: function() {
            //点击写评论菜单
            $("#comment-btn").tap(function() {
                //TODO:判断是否登录，否则跳转到登录注册页面，登录或者注册成功后跳回当前页面 
                //已经登陆，弹出评论详情，调出键盘 
                commentDialog.dialog("show");
                $('.comments-dialog .txt-area').focus();
            });

            //评论框字数限制
            $('.comments-dialog .txt-area').limitTextarea({
                maxNumber: 180, //允许输入的最大字数   
                infoId: 'comments-num',
            });

            //评论框--发表评论 
            $(".comments-dialog .J_submit").tap(function() {
                $('.comments-dialog .txt-area').blur();
                //判断字数
                if (!$('.comments-dialog .txt-area').val()) {
                    ui.tips.init({
                        content: '请输入评论内容',
                        stayTime: 2000
                    });
                    return;
                }
                if ($('#comments-num').hasClass('error')) {
                    ui.tips.init({
                        content: '字数总不能超过180个',
                        stayTime: 2000
                    });
                    return;
                }

                //TODO ajax

                //成功提示
                ui.tips.init({
                    content: '发表成功',
                    stayTime: 2000
                });
            });


            //关闭评论框
            $(".comments-dialog .J_close").tap(function() {
                commentDialog.dialog("hide");
            });


            //打开评论详情
            $('.like-comments .comments').tap(function() {
                $('.detail-wapper').hide();
                $('.comments-wapper').show();
            });

            //关闭评论详情
            $('.comments-wapper .ui-header .ui-icon-return,.comments-wapper .user-box .title').tap(function() {
                $('.detail-wapper').show();
                $('.comments-wapper').hide();
            });


            //回复评论框字数限制
            $('.comments-wapper .j-UserInput').limitTextarea({
                maxNumber: 180, //允许输入的最大字数   
                infoId: 'reply-num',
            });

            //回复评论操作
            $('.comments-wapper .j-Reply').tap(function() {

                $('.comments-wapper .j-UserInput').blur();
                //判断字数
                if (!$('.comments-wapper .j-UserInput').val()) {
                    ui.tips.init({
                        content: '请输入评论内容',
                        stayTime: 2000
                    });
                    return;
                }
                if ($('#reply-num').hasClass('error')) {
                    ui.tips.init({
                        content: '字数总不能超过180个',
                        stayTime: 2000
                    });
                    return;
                }

                //TODO ajax回复评论

                //成功提示
                ui.tips.init({
                    content: '发表成功',
                    stayTime: 2000
                });
            });

        },
        like: function() {
            //资料点赞操作
            $("#like-btn").tap(function() {
                //TODO:判断当前用户是否已经点赞
                //
                var icon = $(this).find('i');
                if (icon.hasClass('active')) {
                    //已经点过赞
                    return;
                }
                icon.addClass('active');
                // 数量加1 
                var num = $(this).find('.num').html();
                $(this).find('.num').html(Number(num) + 1);

                //ajax操作  TODO 

            });
            //评论点赞操作
            $('.like-comments .like').tap(function() {
                //TODO:判断当前用户是否已经点赞
                var icon = $(this).find('i');
                if (icon.hasClass('active')) {
                    //已经点过赞
                    return;
                }
                icon.addClass('active');
                // 数量加1
                var num = $(this).find('.num').html();
                $(this).find('.num').html(Number(num) + 1);

                //ajax操作  TODO
            });
        },
        collect: function() {
            //收藏 
            $("#collect-btn").tap(function() {
                $(this).addClass('to-uncollect').find('div').html('取消收藏');

                //收藏ajax操作  TODO 
                $.ajax({
                    type: 'POST',
                    url: '/projects',
                    data: {},
                    dataType: 'json',
                    success: function(data, status, xhr) {
                        ui.tips.init({
                            content: '已收藏',
                            stayTime: 2000
                        });
                    },
                    error: function(xhr, errorType, error) {
                        $('#collect-btn').removeClass('to-uncollect').find('div').html('收藏');
                        //收藏失败
                        ui.tips.init({
                            content: '网络连接失败',
                            stayTime: 2000
                        });
                    }
                })
            });
        },
        share: function() {

        },
        paper: function() { 
            //隐藏水印图片
            $('div[style="-aw-headerfooter-type:header-primary"]').addClass('hide');

            //获取屏幕的高度 设置paperContentBox高度
            viewHeght = $(window).height();
            var contentHeight = paperContent.height(); 
            if (contentHeight > viewHeght * 3) {
                paperContentBox.css({
                    height: viewHeght * 3 + "px"
                });
            } else {
                
                paperContentBox.css({
                    height: contentHeight + "px"
                });
                $('.show-more').hide();
            }

            //图片点击方法查看，支持手动放大缩小
            paperContent.delegate("img", "tap", function() {
                new ui.fullImage($(this));
            });

            //点击查看更多
            $(".show-more").tap(function() { 
                paperContentBox.css({
                    height: contentHeight + "px"
                });
                $('.show-more').hide();

            });

        }
    }

    xkw.detail = {
        init: function() {
            bindEvent.init();
        },
        bindEvent: bindEvent
    };



});

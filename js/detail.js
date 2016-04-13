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

    var softData = [];
    var common = xkw.common;
    var ui = xkw.ui;

    var bindEvent = {
        init: function() {
            //函数拓展
            this.soft();
            xkw.system.limitTextarea();
            this.download();
            this.cart();
            this.comment();
            this.collect();
            this.like();
            this.share();

        },
        soft: function() {
            //设置资料预览区最大高度手机屏幕2屏
            viewHeght = $(window).height();
            paperContentBox.css({
                maxHeight: 2 * viewHeght + "px"

            });
            //切换资料事件
            $("#file-box .file-ul").delegate("li", "tap", function() {
                var all = $("#file-box .file-ul li");
                all.removeClass('active');
                $(this).addClass('active');
                var id = $(this).attr('data-id');
                var softInfo = softData[id];
                showData(softInfo);
            });

            //图片点击方法查看，支持手动放大缩小
            paperContent.delegate("img", "tap", function() {
                new ui.fullImage($(this));
            });

            //点击查看更多
            $(".show-more").tap(function() {
                paperContentBox.css({
                    //height: contentHeight + "px"
                    maxHeight: "initial"

                });
                $('.show-more').hide();

            });


            //资料ID
            var softid = 1;

            //获取资料
            $.ajax({
                type: 'POST',
                url: '/soft/preview/softid',
                data: {
                    softid: softid
                },
                dataType: 'json',
                success: function(data, status, xhr) {
                    var data = [
                        { "Type": "word", "MeidaUrl": "", "JPGInnerHtml": "<img src='http://cn.bing.com/th?id=OJ.2WZiXqwDHAYUDQ&pid=MSNJVFeeds&c=8&rs=1'/><img  src='http://oa.zxxk.com/AttachFile/EmpPhoto/HeadDefault.jpg'/>" },
                        { "Type": "pdf", "MeidaUrl": "", "JPGInnerHtml": "<img src='http://cn.bing.com/th?id=OJ.2WZiXqwDHAYUDQ&pid=MSNJVFeeds&c=8&rs=1'/><img  src='http://oa.zxxk.com/AttachFile/EmpPhoto/HeadDefault.jpg'/>" }
                    ]
                    softData = data;
                    successFun(softData);
                },
                error: function(xhr, errorType, error) {
                    //这里用来测试  开始
                    var data = [
                        { "Type": "word", "MeidaUrl": "", "JPGInnerHtml": "<img src='http://cn.bing.com/th?id=OJ.2WZiXqwDHAYUDQ&pid=MSNJVFeeds&c=8&rs=1'/><img  src='http://oa.zxxk.com/AttachFile/EmpPhoto/HeadDefault.jpg'/><img  src='http://oa.zxxk.com/AttachFile/EmpPhoto/HeadDefault.jpg'/><img  src='http://oa.zxxk.com/AttachFile/EmpPhoto/HeadDefault.jpg'/><img  src='http://oa.zxxk.com/AttachFile/EmpPhoto/HeadDefault.jpg'/><img  src='http://oa.zxxk.com/AttachFile/EmpPhoto/HeadDefault.jpg'/><img  src='http://oa.zxxk.com/AttachFile/EmpPhoto/HeadDefault.jpg'/><img  src='http://oa.zxxk.com/AttachFile/EmpPhoto/HeadDefault.jpg'/><img  src='http://oa.zxxk.com/AttachFile/EmpPhoto/HeadDefault.jpg'/><img  src='http://oa.zxxk.com/AttachFile/EmpPhoto/HeadDefault.jpg'/>" },
                        { "Type": "pdf", "MeidaUrl": "", "JPGInnerHtml": "<img src='http://mail.xkw.cn/skins/larry/images/roundcube_logo.png'/><img  src='http://oa.zxxk.com/AttachFile/EmpPhoto/HeadDefault.jpg'/>" },
                        { "Type": "media", "MeidaUrl": "http://baidu.com", "JPGInnerHtml": "" }
                    ];
                    softData = data;
                    successFun(softData);
                    //这里用来测试 结束


                    //失败提示
                    ui.tips.init({
                        content: '网络连接失败',
                        stayTime: 2000
                    });
                }
            })

            /*资料请求成功的回调函数*/
            function successFun(data) {
                //没有数据
                if (!data.length) {
                    ui.tips.init({
                        content: '资源id出错',
                        stayTime: 2000
                    });
                    return;
                }
                //有数据

                var fileBox = $('#file-box');
                var fileStr = '';
                //多条数据 压缩包
                fileStr += '<li class="' + data[0].Type + ' active" data-id="' + 0 + '"></li>'
                for (var i = 1; i < data.length; i++) {
                    fileStr += '<li class="' + data[i].Type + '" data-id="' + i + '"></li>'
                }
                fileBox.find('.total .num').html(data.length);
                $('#file-box .file-ul').html(fileStr);



                fileBox.show();

                showData(data[0]);

                //文件框左右滚动
                $('#file-box .file-ul').width(data.length * $('#file-box .file-ul li').width());
                var fileScroll = new fz.Scroll('#file-box .ui-scroller', {
                    scrollY: false,
                    scrollX: true
                });



            }

            /*展现资料内容函数*/
            function showData(soft) {
                //显示第一条数据
                //判断第一条数据的类型
                switch (soft.Type) {
                    case "media":
                        {
                            paperContent.html('<div id="video-box"></div>');
                            var flashvars = {
                                f: soft.MeidaUrl,
                                c: 0
                            };
                            var params = {
                                bgcolor: '#FFF',
                                allowFullScreen: true,
                                allowScriptAccess: 'always',
                                wmode: 'transparent'
                            };
                            var video = ['http://movie.ks.js.cn/flv/other/1_0.mp4->video/mp4'];
                            CKobject.embed('libs/ckplayer/ckplayer.swf', 'video-box', 'ckplayer_video-box', '100%', '100%', true, flashvars, video, params);
                            break;
                        }

                    default:
                        { $('.show-more').show();
                            paperContent.html(soft.JPGInnerHtml);

                            break;
                        }
                }

            }
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
            $('.comment-area .txt-area').limitTextarea({
                maxNumber: 180, //允许输入的最大字数   
                infoId: 'comments-num',
            });

            //评论框--发表评论 
            $(".comment-area .J_submit").tap(function() {
                var textArea = $('.comment-area .txt-area');
                textArea.blur();
                //判断字数
                if (!textArea.val()) {
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
            //$('div[style="-aw-headerfooter-type:header-primary"]').addClass('hide'); 
            //获取屏幕的高度 设置paperContentBox高度
            viewHeght = $(window).height();

            var contentHeight = paperContent.height();
            if (contentHeight > viewHeght * 3) {
                paperContentBox.css({
                    height: viewHeght * 3 + "px"
                });
            } else {

                /* paperContentBox.css({
                     height: contentHeight + "px"
                 });*/
                $('.show-more').hide();
            }
        }
    }



    bindEvent.init();

});

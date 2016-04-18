/*
  列表相关 list.js
  by fanyy 2016.4.15
 */

$(document).ready(function() {
    var ui = xkw.ui;
    xkw.list = {};
    xkw.list.bindEvent = {
        init: function() {
            this.initEvent();
            this.initMenu();
        },
        initMenu: function() {
            //遍历是否存在孩子节点
            $('#menu-list li').not('#menu-list>li:first-child').each(function() {
                if ($(this).children("ul").length) {
                    $(this).addClass('haschild');
                }
            });

            // 箭头翻转事件 
            $('#menu-list').delegate('li.level-0', 'tap', function() {

                if (!$(this).hasClass('level-0')) {
                    return;
                }
                if ($(this).hasClass('filter')) {
                    $('.button-box').toggleClass('active');
                } else {
                    $('.button-box').removeClass('active');
                }
                $('#menu-list>li.level-0').not(this).removeClass('active');
                $(this).toggleClass('active');
                $('#progess .list-box').addClass('hide');
                if ($(this).hasClass('active')) {
                    $('.ui-bg').addClass('active');
                } else {
                    $('.ui-bg').removeClass('active');
                }
            });

            //选择下拉菜单
            $('#menu-list ul.level-1').delegate('li', 'tap', function(event) {

                //二级菜单
                if ($(this).hasClass('level-1')) {
                    var parent = $(this).parent().parent();
                    var all = parent.find('li.level-1');
                    if (!$(this).hasClass('haschild')) {
                        //没有三级菜单的情况  切换选项
                        all.removeClass('active');
                        $(this).addClass('active');
                        parent.find('h2').html($(this).html());
                        //ajax请求
                        //组装参数 params
                        var params = xkw.list.bindEvent.getParams();
                        xkw.list.bindEvent.getList(params);
                    } else {
                        event.stopPropagation(); // 阻止事件冒泡
                        all.removeClass('active');
                        $(this).addClass('active');
                    }
                }

                //三级菜单
                if ($(this).hasClass('level-2')) {
                    var parent = $(this).parent().parent().parent().parent();
                    var all = parent.find('li.level-2');
                    //特殊处理筛选
                    if ($(parent).hasClass('filter')) {
                        event.stopPropagation();
                        if (!$(this).hasClass('active')) {
                            $(this).addClass('active');
                            //这里pid id 用来唯一标识每一个选项，可以根据情况自定义属性，这里仅仅是一个例子
                            $('.button-box .result-box').append('<span class="ui-label2" data-id="2" data-pid="1">' + $(this).text() + '<i class="ui-icon2-close"></i></span>');
                        }

                    } else {
                        all.removeClass('active');
                        $(this).addClass('active');
                        //截取六个字符
                        var html = $(this).html();
                        html = html.length > 4 ? html.substring(0, 4) + '..' : html;
                        parent.find('h2').html(html);
                        //ajax请求
                        //组装参数 params
                        var params = xkw.list.bindEvent.getParams();
                        xkw.list.bindEvent.getList(params);
                    }




                }

            });


            //筛选功能  --删除已经选择的选项
            $('.button-box').delegate('.result-box i', 'tap', function() {
                var label = $(this).parent();
                var id = label.attr('data-id');
                var pid = label.attr('data-pid');
                $('.filter li.level-2[data-id="' + id + '"][data-pid="' + pid + '"]').removeClass('active');
                label.remove();
            });

            //筛选功能  --选择后点击完成事件
            $('#finish-btn').tap(function() {
                //关闭下拉菜单
                $('#menu-list>li.level-0').removeClass('active');
                $('.ui-bg').removeClass('active');
                $('.button-box').removeClass('active');

                //ajax请求
                //组装参数 params
                var params = xkw.list.bindEvent.getParams();
                xkw.list.bindEvent.getList(params);
            });
            //筛选功能  --重置事件
            $('#reset-btn').tap(function() {
                $('.button-box .result-box').html('');
                $('.filter li.level-2').removeClass('active');
            });
        },
        getParams: function() {
            //组装参数 params
            var params = { id: 111 };
            return params;
        },
        getList: function(params) {
            alert(params.id);
            $.ajax({
                type: 'POST',
                url: '',
                data: params,
                dataType: 'json',
                success: function(data) {
                    var result = '';
                    for (var i = 0; i < data.lists.length; i++) {
                        result += '<a class="item opacity" href="' + data.lists[i].link + '">' + '<img src="' + data.lists[i].pic + '" alt="">' + '<h3>' + data.lists[i].title + '</h3>' + '<span class="date">' + data.lists[i].date + '</span>' + '</a>';
                    }
                },
                error: function(xhr, type) {



                    //alert('Ajax error!'); 
                }
            });
        },
        initEvent: function() {

            // dropload 下拉加载最新
            $('.zl-list ul').dropload({
                scrollArea: window,
                domUp: {
                    domClass: 'dropload-up',
                    domRefresh: '<div class="dropload-refresh">下拉刷新</div>',
                    domUpdate: '<div class="dropload-update">释放更新</div>',
                    domLoad: '<div class="dropload-load"><span class="loading"></span>加载中...</div>'
                },
                domDown: {
                    domClass: 'dropload-down',
                    domRefresh: '<div class="dropload-refresh">↑上拉加载更多-自定义内容</div>',
                    domLoad: '<div class="dropload-load"><span class="loading"></span>加载中-自定义内容...</div>',
                    domNoData: '<div class="dropload-noData">暂无数据-自定义内容</div>'
                },
                loadUpFn: function(me) {
                    $.ajax({
                        type: 'POST',
                        url: '',
                        data: params,
                        dataType: 'json',
                        success: function(data) {
                            var result = '';
                            for (var i = 0; i < data.lists.length; i++) {
                                result += '<a class="item opacity" href="' + data.lists[i].link + '">' + '<img src="' + data.lists[i].pic + '" alt="">' + '<h3>' + data.lists[i].title + '</h3>' + '<span class="date">' + data.lists[i].date + '</span>' + '</a>';
                            }
                            // 为了测试，延迟1秒加载
                            setTimeout(function() {
                                $('.lists').html(result);
                                // 每次数据加载完，必须重置
                                me.resetload();
                            }, 1000);
                        },
                        error: function(xhr, type) {
                            // 为了测试，延迟1秒加载
                            setTimeout(function() {
                                $('.lists').html(result);
                                // 每次数据加载完，必须重置
                                me.resetload();
                            }, 100000);


                            //alert('Ajax error!');
                            // 即使加载出错，也得重置
                            me.resetload();
                        }
                    });

                },
                threshold: 50
            });


            //点击加载更多事件
            $('.view-more').tap(function() {
                //显示loading
                $('.view-more .text').addClass('hide');
                $('.view-more .loading').removeClass('hide');

                //TODO :ajax

                //加载完成之后 隐藏loading
                //$('.view-more .text').removeClass('hide');
                //$('.view-more .ui-loading').addClass('hide');
            });

 

            //我的进度
            $('#choose-btn').tap(function() {
                $('.ui-bg').toggleClass('ui-bg-progess');
                $('.progess').toggleClass('active');
                $('.progess-box').toggleClass('active');
                //显示对应版本的进度
                var versionId = $('.version-list li.current').attr('data-id');
                $('.progess .ui-scroller-box').hide();
                $('.progess .ui-scroller-box[data-pid="' + versionId + '"]').show();

                var scroll = new fz.Scroll('.ui-scroller-box[data-pid="' + versionId + '"]', {
                    scrollY: true
                });
            });

            //点击修改按钮
            $('.version .edit').tap(function() {
                event.stopPropagation(); // 阻止事件冒泡 
                $('.ui-bg-version').toggleClass('hide');
                $('.version-list').toggleClass('hide');


            });
            //修改版本
            $('.version-list').delegate('li', 'tap', function() {
                var all = $('.version-list li').removeClass('current');
                $(this).addClass('current');
                $('.my-version').html($(this).text());


                //显示对应版本的进度
                var versionId = $('.version-list li.current').attr('data-id');
                $('.progess .ui-scroller-box').hide();
                $('.progess .ui-scroller-box[data-pid="' + versionId + '"]').show();
                var scroll = new fz.Scroll('.ui-scroller-box[data-pid="' + versionId + '"]', {
                    scrollY: true
                });

                //关闭框
                $('.ui-bg-version').toggleClass('hide');
                $('.version-list').toggleClass('hide');
            });

        }
    }



});

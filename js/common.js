/**
 * common.js
 * fanyy 2016.4.1  
 */

 
$(document).ready(function() {
    xkw = {
        version: "0.0.1",
        time_stamp: +(new Date),
        system: {},
        cookie: {},
        ui: {},
        event: {}
        //system: {},
        //number: {},
        //date: {},
        //string: {},
        //pages: {}
    };

    /*cookie操作*/
    xkw.cookie = {
        setCookie: function(name, value, hours, path) { //写cookies
            var exp = new Date();
            exp.setTime(exp.getTime() + hours * 60 * 60 * 1000);
            document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString() + ";path=" + path;
        },
        getCookie: function(name) { //读取cookies
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");

            if (arr = document.cookie.match(reg))

                return unescape(arr[2]);
            else
                return null;
        },

        delCookie: function(name) { //删除cookies
            var exp = new Date();
            exp.setTime(exp.getTime() - 1);
            var cval = getCookie(name);
            if (cval != null)
                document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
        }
    }

    /*函数拓展*/
    xkw.system = {
        limitTextarea: function() {
            //字数限制
            $.fn.limitTextarea = function(opts) {
                var defaults = {
                    maxNumber: 140, //允许输入的最大字数  
                    position: '', //提示文字的位置，top：文本框上方，bottom：文本框下方  
                    onOk: function() {}, //输入后，字数未超出时调用的函数  
                    onOver: function() {}, //输入后，字数超出时调用的函数 
                    theme: '',
                    infoStr: '',
                    infoId: 'info'
                }
                var option = $.extend(defaults, opts);
                //处理输入的内容是文字还是字母的函数
                var getLength = function(str) {
                    return String(str).replace(/[^\x00-\xff]/g, 'aa').length;
                };
                this.each(function() {
                    var _this = $(this);
                    var info = '';
                    switch (option.theme) {
                        case 'limit':
                            info = '<div id="' + option.infoId + '" style="text-align:right;">还可以输入<b>' + (option.maxNumber - Math.ceil(getLength(_this.val()) / 2)) + '</b>字</div>';
                            break;
                        case 'tips':
                            info = '<div id="' + option.infoId + '" style="text-align:right;">已经输入<b>' + Math.ceil(getLength(_this.val()) / 2) + '</b>字</div>';
                            break;
                        default:
                            info = '<div id="' + option.infoId + '" style="text-align:right;">已经输入<b>' + Math.ceil(getLength(_this.val()) / 2) + '</b>字</div>';
                            break;
                    }
                    var fn = function() {
                        //Math函数向上取值
                        var alredyNumber = Math.ceil(getLength(_this.val()) / 2);
                        var extraNumber = option.maxNumber - alredyNumber;
                        var $info = $('#' + option.infoId);
                        if (extraNumber >= 0) {
                            switch (option.theme) {
                                case 'limit':
                                    $info.html(option.infoStr + '还可以输入<b>' + extraNumber + '</b>个字');
                                    break;
                                case 'tips':
                                    $info.html(option.infoStr + '已经输入<b>' + alredyNumber + '</b>个字');
                                    break;
                                default:
                                    $info.removeClass('error');
                                    $info.html(extraNumber);
                                    break;
                            }

                            option.onOk();
                        } else {
                            switch (option.theme) {
                                case 'limit':
                                    $info.html('已经超出<b style="color:red;">' + (-extraNumber) + '</b>个字');
                                    break;
                                case 'tips':
                                    $info.html(option.infoStr + '已经输入<b>' + alredyNumber + '</b>个字');
                                    break;
                                default:
                                    $info.addClass('error');
                                    $info.html(extraNumber);
                                    break;
                            }

                            option.onOver();
                        }
                    };
                    switch (option.position) {
                        case 'top':
                            _this.before(info);
                            break;
                        case 'bottom':
                            _this.after(info);
                            break;
                        default:
                            break;
                    }
                    //绑定输入事件监听器  
                    if (window.addEventListener) { //先执行W3C  
                        _this.get(0).addEventListener("input", fn, false);
                    } else {
                        _this.get(0).attachEvent("onpropertychange", fn);
                    }
                    if (window.VBArray && window.addEventListener) { //IE9  
                        _this.get(0).attachEvent("onkeydown", function() {
                            var key = window.event.keyCode;
                            (key == 8 || key == 46) && fn(); //处理回退与删除  
                        });
                        _this.get(0).attachEvent("oncut", fn); //处理粘贴  
                    }
                    //初始化的时候先执行一遍
                    fn();
                });

            }
        }
    }


    /*ui组件*/
    xkw.ui.fullImage = function(t) {
        this.isTouchSet = "ontouchstart" in window,
            this.target = t,
            this.url = t.attr("data-src"),
            this.smallUrl = t.attr("src"),
            this.px = t.offset().left,
            this.py = t.offset().top,
            this._w = 0,
            this._h = 0,
            this.transform = {
                translateX: 0,
                translateY: 0,
                scale: 1
            },
            this.container = $('<div id="fullImageContainer"></div>'),
            this.moving = !1,
            this.init()
    }
    xkw.ui.fullImage.prototype = {
        init: function() {
            this.createContainer(),
                this.cloneImage(),
                this.createFlayer(),
                this.initEvents()
        },
        createContainer: function() {
            $("body").append(this.container),
                this.container.css({
                    position: "fixed",
                    top: 0,
                    left: 0,
                    "z-index": 999
                })
        },
        createFlayer: function() {
            var t = $('<div id="fullImage_flayer"></div>');
            t.css({
                    background: "#000",
                    "z-index": "998",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    opacity: 0,
                    "-webkit-transition": "0.2s linear opacity"
                }),
                this.container.append(t),
                this.updateFlayerLayout(),
                setTimeout(function() {
                    t.css({
                        opacity: .98
                    })
                }, 300)
        },
        updateFlayerLayout: function() {
            var t = window.innerWidth,
                e = window.innerHeight;
            $("#fullImage_flayer").css({
                width: t,
                height: e
            })
        },
        cloneImage: function() {
            var t = this,
                e = new Image;
            e.src = this.smallUrl,
                e.onload = function() {
                    t._w = e.width,
                        t._h = e.height;
                    var a = $('<img id="fullImage">');
                    a.attr("src", t.smallUrl),
                        t.container.append(a),
                        a.css({
                            width: t._w,
                            height: t._h,
                            position: "fixed",
                            left: t.px,
                            top: t.py - window.scrollY,
                            "-webkit-transition": "0.3s all linear",
                            "z-index": 999
                        }),
                        //暂时隐去加载大图
                        //t.loadBigImage(),
                        setTimeout(function() {
                            t.updateImageLayout()
                        }, 20)
                }
        },
        updateImageLayout: function() {
            var t = this,
                e = window.innerWidth,
                a = window.innerHeight;
            $("#fullImage").css(t._w / t._h > e / a ? {
                    width: e,
                    height: e / t._w * t._h,
                    left: 0,
                    top: (a - e / t._w * t._h) / 2
                } : {
                    width: a / t._h * t._w,
                    height: a,
                    left: (e - a / t._h * t._w) / 2,
                    top: 0
                }),
                this.transform = {
                    translateX: 0,
                    translateY: 0,
                    scale: 1
                },
                this.animate()
        },
        loadBigImage: function() {
            var t = this,
                e = new Image;
            e.src = this.url,
                e.onload = function() {
                    $("#fullImage").attr("src", t.url)
                }
        },
        destory: function() {
            var t = this;
            this.px = this.target.offset().left,
                this.py = this.target.offset().top,
                this.container.unbind("touchstart", "touchmove", "touchend"),
                $("#fullImage_flayer").css({
                    opacity: 0
                }),
                $("#fullImage").css({
                    width: t._w,
                    height: t._h,
                    left: t.px,
                    top: t.py - window.scrollY,
                    "-webkit-transform": "translateX(0) translateY(0) scale(1)",
                    "z-index": "8",
                    opacity: .5
                }),
                setTimeout(function() {
                    t.container.remove()
                }, 510),
                $(window).unbind("resize", function() {
                    t.updateFlayerLayout(),
                        t.updateImageLayout()
                })
        },
        initEvents: function() {
            var t = this;
            $(window).bind("resize", function() {
                t.updateFlayerLayout(),
                    t.updateImageLayout()
            });
            var e = [0, 0],
                a = [0, 0],
                n = [0, 0],
                i = [0, 0],
                s = [0, 0],
                o = 1;
            _line = 0,
                timeoutFordestory = null,
                start = function() {};
            var r = "";
            this.isTouchSet ? this.container.bind("touchstart", function(l) {
                var u = $(l.target);
                "fullImage" != u.attr("id") ? r = "" : $("#fullImage").css({
                        "-webkit-transition": "0.05s all linear"
                    }),
                    l.preventDefault(),
                    1 == l.touches.length && "fullImage" == u.attr("id") && (r = "drag",
                        s = [t.transform.translateX, t.transform.translateY]),
                    e = [l.touches[0].pageX, l.touches[0].pageY],
                    a = [l.touches[0].pageX, l.touches[0].pageY],
                    2 == l.touches.length && "fullImage" == u.attr("id") && (r = "pinch",
                        n = [l.touches[1].pageX, l.touches[1].pageY],
                        i = [l.touches[1].pageX, l.touches[1].pageY],
                        _line = t.get_triangle_hypotenuse(Math.abs(i[1] - a[1]), Math.abs(i[0] - a[0])),
                        o = t.transform.scale),
                    _zoom = parseFloat(u.css("zoom"))
            }).bind("touchmove", function(n) {
                n.preventDefault(),
                    a = [n.touches[0].pageX, n.touches[0].pageY],
                    "drag" == r ? t.drag(e, a, s) : "pinch" == r && (i = [n.touches[1].pageX, n.touches[1].pageY],
                        t.pinch(_line, o, i, a))
            }).bind("touchend", function(n) {
                n.preventDefault(),
                    Math.abs(a[0] - e[0]) < 5 && Math.abs(a[1] - e[1]) < 5 ? ($("#fullImage").css({
                            "-webkit-transition": "0.3s all linear"
                        }),
                        null == timeoutFordestory ? timeoutFordestory = setTimeout(function() {
                            t.destory(),
                                timeoutFordestory = null
                        }, 300) : (clearTimeout(timeoutFordestory),
                            timeoutFordestory = null,
                            t.zoom())) : ($("#fullImage").css({
                            "-webkit-transition": "0.1s all linear"
                        }),
                        t.flex())
            }) : this.container.bind("mousedown", function(a) {
                var n = $(a.target);
                e = [a.pageX, a.pageY],
                    "fullImage" == n.attr("id") && (t.moving = !0,
                        s = [t.transform.translateX, t.transform.translateY])
            }).bind("mousemove", function(n) {
                a = [n.pageX, n.pageY],
                    t.moving && ($("#fullImage").css({
                            "-webkit-transition": ""
                        }),
                        t.drag(e, a, s))
            }).bind("mouseup", function() {
                Math.abs(a[0] - e[0]) < 5 && Math.abs(a[1] - e[1]) < 5 ? ($("#fullImage").css({
                            "-webkit-transition": "0.3s all linear"
                        }),
                        null == timeoutFordestory ? timeoutFordestory = setTimeout(function() {
                            t.destory(),
                                timeoutFordestory = null
                        }, 300) : (clearTimeout(timeoutFordestory),
                            timeoutFordestory = null,
                            t.zoom())) : t.flex(),
                    t.moving = !1
            })
        },
        drag: function(t, e, a) {
            this.transform.translateX = e[0] - t[0] + a[0],
                this.transform.translateY = e[1] - t[1] + a[1],
                this.animate()
        },
        pinch: function(t, e, a, n) {
            var i = this.get_triangle_hypotenuse(Math.abs(a[1] - n[1]), Math.abs(a[0] - n[0]));
            this.transform.scale = e + (i - t) / 250,
                this.animate()
        },
        zoom: function() {
            this.transform.scale > 2 ? (this.transform.scale = 1,
                    this.transform.translateX = 0,
                    this.transform.translateY = 0) : this.transform.scale = 3,
                this.animate()
        },
        animate: function() {
            $("#fullImage").css({
                "-webkit-transform": "translateX(" + this.transform.translateX + "px) translateY(" + this.transform.translateY + "px) scale(" + this.transform.scale + ")"
            })
        },
        get_triangle_hypotenuse: function(t, e) {
            return Math.sqrt(t * t + e * e)
        },
        flex: function() {
            var t = this,
                e = (window.innerWidth,
                    window.innerHeight,
                    parseInt($("#fullImage").css("width"))),
                a = parseInt($("#fullImage").css("height")),
                n = (e * t.transform.scale,
                    a * t.transform.scale,
                    e * (t.transform.scale - 1) * .5),
                i = a * (t.transform.scale - 1) * .5;
            t.transform.scale > 3 && (t.transform.scale = 3),
                t.transform.scale < 1 && (t.transform.scale = 1),
                t.transform.translateX < -1 * n && (t.transform.translateX = -1 * n),
                t.transform.translateX > 1 * n && (t.transform.translateX = 1 * n),
                t.transform.translateY < -1 * i && (t.transform.translateY = -1 * i),
                t.transform.translateY > 1 * i && (t.transform.translateY = 1 * i),
                setTimeout(function() {
                    t.animate()
                }, 20)
        }
    }
    xkw.ui.tips = {
        $tips: $('<div class="ui-tips"></div>'),
        init: function(option) {
            this.option = option;
            this.$tips.addClass('ui-poptips-' + option.type);
            this.$tips.html('<div class="ui-tips-cnt">' + '' + option.content + '</div>');
            $('body').append(this.$tips);
            setTimeout(function() {
                xkw.ui.tips.show();
            }, 20);
        },
        show: function() {
            this.$tips.addClass('show');
            if (this.option.stayTime > 0) {
                setTimeout(function() {
                    xkw.ui.tips.hide();
                }, this.option.stayTime)
            }
        },
        hide: function() {
            this.$tips.removeClass('show');
            setTimeout(function() {
                //tips.$tips.remove();
            }, 500)
        }
    }
    xkw.ui.slider = {
        banner: function() {
            banner = new fz.Scroll('.ui-slider', {
                role: 'slider',
                indicator: true,
                autoplay: true,
                interval: 3000
            })
        },
        toutiao: function() {
            toutiao = $('.toutiao .toutiao-content');
            toutiao.currentPage = 0;
            toutiao.count = toutiao.children().length;
            toutiao.itemHeight = toutiao.children().height();
            toutiao.bounceTime = 600;
            toutiao.bounceEasing = 'bounce';
            setInterval(function() {
                toutiao.currentPage = toutiao.currentPage >= toutiao.count - 1 ? 0 : ++toutiao.currentPage;
                toutiao.css({
                    "-webkit-transform": "translateY(-" + toutiao.itemHeight * toutiao.currentPage + "px)"
                });
            }, 3000);
        }
    }

    /*通用事件*/
    xkw.event = {
        searchbar: function() {
            //-----------搜索框效果-------------------
            $('.ui-searchbar').tap(function() {
                $('.ui-searchbar-wrap').addClass('focus');
                $('.ui-searchbar-input input').focus();
            });
            $('.ui-searchbar-cancel').tap(function() {
                $('.ui-searchbar-input input').val('');
                $('.ui-searchbar-wrap').removeClass('focus');
            });
            $('.ui-icon-close').tap(function() {
                $('.ui-searchbar-input input').val('');
            });
        }
    }
 

    xkw.common = {

    };

    window.Q = window.xkw = xkw;
});

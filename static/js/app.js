/**
 * Created with JetBrains WebStorm.
 * User: Devin Chen
 * Date: 13-10-17
 * Time: 下午1:37
 * To change this template use File | Settings | File Templates.
 * Copyright © LexisNexis 2013
 * Version 3.7
 */
$(function(){
    navInit();  //垂直滚动菜单定位、当前栏目高亮
    tabInit();  //首页内容轮播
    topicInit(); //首页topic效果
    splitter();  //详细内容页分割
    simpleSearchInit(); //简单搜索页
    advSearchInit(); //高级搜索
    logicBtnInit(); //逻辑按钮

    function navInit(){
        var $mainNav = $(".main-nav");
        if($mainNav.size() === 0)return;
        var navOffsetTop = $mainNav.offset().top;
        var navMap = {
            "index": 0,
            "search": 1,
            "regulation": 2,
            "cases": 3
        };
        var url = window.top.location.href;
        $(window).scroll(function(){
            if($("html").scrollTop() > navOffsetTop || $("body").scrollTop() > navOffsetTop){
                $mainNav.css("position", "fixed");
            }else{
                $mainNav.css("position", "relative");
            }
        });
        var active = 0;
        for(var name in navMap){
            if(navMap.hasOwnProperty(name) && url.indexOf(name) >= 0){
                active = navMap[name];
                break;
            }

        }
        $mainNav.find(">ul>li").eq(active).addClass("active");
    }

    function tabInit(){
        var $slide = $(".slide");
        var contentSelector = ".tab-content > div";
        var navSelector = ".tab-nav > span";
        var $content = $slide.find(contentSelector);
        var $nav = $slide.find(navSelector);
        var $tabContent = $(".tab-content");
        var stepWidth = $tabContent.width();
        var index = 0;
        var timer = null;
        $content.css("width", stepWidth - parseInt($content.css("padding-right"))).eq(0).fadeIn(500);
        $tabContent.css("width", 9999);
        autoPlay();
        $nav.click(function(){
            clearInterval(timer);
            index = $(this).index(navSelector);
            play(index);
            autoPlay();
        });

        function play(index){
            $slide.find(".active").removeClass("active");
            $nav.eq(index).addClass("active").parent().attr("class", "tab-nav cf active-" + index);
            $tabContent.stop().animate({marginLeft: - index*stepWidth}, 500);
        }

        function autoPlay(){
            timer = setInterval(function(){
                index = ++index % $content.size();
                play(index);
            }, 3000);
        }
    }

    function topicInit(){
        var $topic = $(".topic");
        var $items = $topic.find(".item");
        $topic.find(".btn-expand").click(function(){
            $(this).toggleClass("on");
            var isExpandAll = $(this).hasClass("on");
            $items.each(function(){
                if(isExpandAll && !$(this).hasClass("more-show")){
                    $(this).addClass("more-show");
                }
                if(!isExpandAll){
                    $(this).removeClass("more-show");
                }
            });
        });
        $items.find(".cate-more").click(function(){
            $(this).parent().toggleClass("more-show");
        });
    }

    function splitter(){
        var $leftBtn = $(".splitter-left").find(".splitter-btn");
        $leftBtn.data("data-expand", true);
        $leftBtn.click(function(){
            var isExpand = $(this).data("data-expand");
            if(isExpand){
                colSpan();
                $(this).data("data-expand", false);
            }else{
                expand();
                $(this).data("data-expand", true);
            }
        });

        function colSpan(){
            $(".left")
                .css("width", "10px")
                .find(".toc-bar h4,.toc").css("visibility", "hidden");
            $(".right-content").css("margin-left", "-208px");
        }
        function expand(){
            $(".left")
                .css("width", "240px")
                .find(".toc-bar h4,.toc").css("visibility", "visible");
            $(".right-content").css("margin-left", "18px");
        }
    }

    function simpleSearchInit(){
        var $his = $(".his");
        var $selected = $("#selected");
        var $list = $his.find("ul");
        $his.hover(function(){
            $list.slideDown(100);
        }, function(){
            $list.slideUp(100);
        }).find("a").click(function(){
            $selected.text($(this).text());
        });
    }

    function logicBtnInit(){
        var $logicMap = {
            "AND": " ++ ",
            "OR": " -- ",
            "NOT": " ! "
        };
        $(".logic-btn").find("a").live("click", function(e){
            var type = $(this).attr("title");
            var $clickFor = $("#" + $(this).parent().attr("data-clickFor"));
            var cacheText = $clickFor.val();
            if($logicMap[type]){
                $clickFor.val(cacheText + $logicMap[type]);
            }
        });
    }

    function advSearchInit(){
        var tplDir = "./ajax-tpl/";
        var tplType = ".html";
        var $form = $("#ajax-form-content");
        var $nav = $("#left-nav");
        var defaultForm = $nav.find(".active").find("a").attr("data-tpl");
        if(defaultForm){
            loadTpl(tplDir + defaultForm + tplType);
        }
        $nav.find("a").click(function(){
            $nav.find(".active").removeClass("active");
            var form = $(this).attr("data-tpl");
            loadTpl(tplDir + form + tplType, $(this));
        });
        function loadTpl(url, $target){
            $form.html("Loading ...").load(url, function(){
                $target && $target.parent("li").addClass("active");
                //todo..
            });
        }
    }
});